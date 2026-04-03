#!/usr/bin/env node
// tarot 🔮 — 终端塔罗牌阅读器 CLI 入口
const { TarotDeck } = require('../src/index');
const { renderCard, renderSpread, renderDaily } = require('../src/renderer');
const { spreads } = require('../src/spreads');

// 解析命令行参数
const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, ...rest] = arg.slice(2).split('=');
    flags[key] = rest.length ? rest.join('=') : true;
  } else if (arg.startsWith('-')) {
    const letters = arg.slice(1).split('');
    for (const l of letters) {
      flags[l] = true;
    }
  } else {
    positional.push(arg);
  }
}

// 显示帮助信息
if (flags.help || flags.h) {
  console.log(`
🔮 tarot — Terminal Tarot Card Reader

USAGE
  tarot [spread] [options]

SPREADS
  (default)     Single card draw
  three         Past / Present / Future
  celtic        Celtic Cross (10 cards)
  yesno         Yes/No reading (3 cards)
  relationship  Relationship spread (5 cards)
  daily         Daily card (date-seeded)

OPTIONS
  --json          Output as JSON
  --no-reverse    Don't allow reversed cards
  --seed <num>    Use specific seed for reproducible draws
  -n, --num <n>   Draw N cards (1-78)
  -h, --help      Show this help message

EXAMPLES
  tarot                     Draw a single card
  tarot three               Past / Present / Future
  tarot celtic              Full Celtic Cross reading
  tarot yesno               Get a yes/no answer
  tarot daily               Today's card
  tarot --json              JSON output
  tarot -n 5                Draw 5 random cards
  tarot --seed 42           Reproducible draw
`);
  process.exit(0);
}

// 主逻辑
const deck = new TarotDeck({
  allowReversed: flags['no-reverse'] ? false : true,
  seed: flags.seed ? parseInt(flags.seed) : undefined,
});

const spreadName = positional[0] || 'single';
const asJson = flags.json || false;
const numCards = flags.n || flags.num ? parseInt(flags.n || flags.num) : null;

// 每日牌使用日期作为种子
if (spreadName === 'daily') {
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const dailyDeck = new TarotDeck({ allowReversed: true, seed: dateSeed });
  const card = dailyDeck.draw(1)[0];
  
  if (asJson) {
    console.log(JSON.stringify({ type: 'daily', date: today.toISOString().split('T')[0], card: card.toJSON() }, null, 2));
  } else {
    console.log(renderDaily(card, today));
  }
  process.exit(0);
}

// 自定义数量抽牌
if (numCards) {
  const count = Math.max(1, Math.min(78, numCards));
  const cards = deck.draw(count);
  
  if (asJson) {
    console.log(JSON.stringify({ type: 'custom', count, cards: cards.map(c => c.toJSON()) }, null, 2));
  } else {
    console.log(renderSpread('custom', cards, null));
  }
  process.exit(0);
}

// 使用预设牌阵
const spread = spreads[spreadName];
if (!spread) {
  console.error(`❌ Unknown spread: "${spreadName}"`);
  console.error(`Available: ${Object.keys(spreads).join(', ')}`);
  process.exit(1);
}

const cards = deck.draw(spread.positions.length);

if (asJson) {
  const result = {
    type: spreadName,
    spread: spread.name,
    positions: spread.positions.map((p, i) => ({
      position: p.name,
      description: p.description,
      card: cards[i].toJSON(),
    })),
  };
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(renderSpread(spreadName, cards, spread));
}
