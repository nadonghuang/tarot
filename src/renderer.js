// tarot 🔮 — 终端渲染器
// 负责将塔罗牌和牌阵渲染为漂亮的 ANSI 终端输出

'use strict';

// ==================== ANSI 颜色工具 ====================
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const ITALIC = '\x1b[3m';
const UNDERLINE = '\x1b[4m';

const c = {
  red: s => `\x1b[31m${s}${RESET}`,
  green: s => `\x1b[32m${s}${RESET}`,
  yellow: s => `\x1b[33m${s}${RESET}`,
  blue: s => `\x1b[34m${s}${RESET}`,
  magenta: s => `\x1b[35m${s}${RESET}`,
  cyan: s => `\x1b[36m${s}${RESET}`,
  white: s => `\x1b[37m${s}${RESET}`,
  gray: s => `\x1b[90m${s}${RESET}`,
  bold: s => `${BOLD}${s}${RESET}`,
  dim: s => `${DIM}${s}${RESET}`,
  italic: s => `${ITALIC}${s}${RESET}`,
  underline: s => `${UNDERLINE}${s}${RESET}`,
  bg: {
    red: s => `\x1b[41m${s}${RESET}`,
    blue: s => `\x1b[44m${s}${RESET}`,
    magenta: s => `\x1b[45m${s}${RESET}`,
  },
};

// 牌面元素对应颜色
const ELEMENT_COLORS = {
  wands: c.red,
  cups: c.blue,
  swords: s => c.bold(c.white(s)),
  pentacles: c.green,
};

// 获取卡牌对应的装饰符号
function getCardSymbol(card) {
  const symbols = {
    wands: '🪄', cups: '🏆', swords: '⚔️', pentacles: '🪙',
  };
  // 大阿卡纳使用罗马数字
  if (card.id < 22) {
    const roman = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return roman[card.id];
  }
  return symbols[card.suit] || '✦';
}

// ==================== ASCII 卡牌艺术 ====================
function renderCardArt(card) {
  const reversed = card.isReversed;
  const symbol = getCardSymbol(card);
  const name = card.name;
  const zhName = card.zh || '';

  // 截断长名称
  const maxLen = 26;
  const displayName = name.length > maxLen ? name.slice(0, maxLen - 1) + '…' : name;
  const padName = displayName.padEnd(maxLen);
  const padZh = zhName.padEnd(Math.max(0, Math.floor((maxLen - getDisplayWidth(zhName)) / 2) * 2));

  const topLine = reversed ? '╚══════════════════════════╗' : '╔══════════════════════════╗';
  const bottomLine = reversed ? '╔══════════════════════════╗' : '╚══════════════════════════╝';
  const leftEdge = reversed ? '║' : '║';
  const rightEdge = reversed ? '║' : '║';

  // 根据牌的类型选择边框颜色
  let borderFn = c.magenta;
  if (card.suit) {
    borderFn = ELEMENT_COLORS[card.suit] || c.magenta;
  }

  // 生成ASCII卡面
  const lines = [
    borderFn(topLine),
    `${borderFn(leftEdge)}  ${c.bold(c.cyan(symbol))}                       ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}                          ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}   ${c.bold(padName)}    ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}   ${c.dim(padZh)}       ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}                          ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}   ${c.yellow('✦ ✦ ✦ ✦ ✦')}              ${borderFn(rightEdge)}`,
    `${borderFn(leftEdge)}                          ${borderFn(rightEdge)}`,
    borderFn(bottomLine),
  ];

  return lines.join('\n');
}

// 处理中文字符宽度
function getDisplayWidth(str) {
  let width = 0;
  for (const ch of str) {
    width += ch.charCodeAt(0) > 0x7f ? 2 : 1;
  }
  return width;
}

// ==================== 渲染单张卡牌（含解释） ====================
function renderCard(card, position = null) {
  const parts = [];

  // 位置标题
  if (position) {
    parts.push(c.bold(c.yellow(`\n  ${position.name}`)));
    parts.push(c.dim(`  ${position.description}`));
    parts.push('');
  }

  // 卡牌艺术
  parts.push(renderCardArt(card));

  // 卡牌名称
  const reversedTag = card.isReversed ? ` ${c.red('↻ REVERSED')}` : '';
  parts.push(`\n  ${c.bold(card.name)}${reversedTag}`);
  if (card.zh) parts.push(c.dim(`  ${card.zh}`));
  if (card.element) parts.push(c.dim(`  Element: ${card.element}`));

  // 关键词
  if (card.keywords && card.keywords.length) {
    parts.push(`  ${c.cyan('Keywords:')} ${card.keywords.map(k => c.italic(k)).join(', ')}`);
  }

  // 含义
  parts.push(`\n  ${c.bold('📖 Meaning:')}`);
  // 自动换行
  const meaning = card.meaning;
  const wrapped = wrapText(meaning, 60);
  parts.push(`  ${c.italic(wrapped)}`);

  return parts.join('\n');
}

// 简单文本换行
function wrapText(text, width) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else {
      line += (line ? ' ' : '') + word;
    }
  }
  if (line) lines.push(line);
  return lines.join('\n  ');
}

// ==================== 渲染牌阵 ====================
function renderSpread(spreadName, cards, spread) {
  const parts = [];

  // 如果没有传入 spread 定义（自定义数量模式）
  if (!spread) {
    parts.push(c.bold(c.magenta('\n🔮 Your Cards\n')));
    cards.forEach((card, i) => {
      parts.push(`\n  ${c.bold(`Card ${i + 1}`)}`);
      parts.push(renderCard(card));
    });
    return parts.join('\n');
  }

  // 标题
  parts.push('');
  parts.push(c.bold(c.magenta(`  ═══ ${spread.name} ═══`)));
  parts.push(c.dim(`  ${spread.description}`));
  parts.push(c.gray('  ' + '─'.repeat(40)));
  parts.push('');

  // 每张牌
  cards.forEach((card, i) => {
    if (i < spread.positions.length) {
      parts.push(renderCard(card, spread.positions[i]));
    }
  });

  // 牌阵分析
  parts.push('');
  parts.push(c.gray('  ' + '─'.repeat(40)));

  // 统计元素分布
  const elements = {};
  let majorCount = 0;
  let reversedCount = 0;
  for (const card of cards) {
    if (card.element) elements[card.element] = (elements[card.element] || 0) + 1;
    if (card.id < 22) majorCount++;
    if (card.isReversed) reversedCount++;
  }

  parts.push(c.bold('  📊 Reading Summary'));
  parts.push(`  Major Arcana: ${c.bold(majorCount)} | Reversed: ${c.bold(reversedCount)}`);
  const elemStr = Object.entries(elements)
    .map(([e, n]) => `${e} ×${n}`)
    .join(', ');
  if (elemStr) parts.push(`  Elements: ${elemStr}`);

  // yes/no 牌阵特殊处理
  if (spreadName === 'yesno') {
    const verdict = cards[2];
    const yesWeight = (cards[0].isReversed ? -1 : 1) + (cards[1].isReversed ? 1 : -1);
    const answer = yesWeight >= 0;
    parts.push('');
    parts.push(`  ${c.bold(c.bg[answer ? 'blue' : 'red'](answer ? ' ✅ YES ' : ' ❌ NO '))}`);
    parts.push(`  ${c.italic(verdict.meaning)}`);
  }

  // 关系牌阵的建议
  if (spreadName === 'relationship') {
    parts.push('');
    parts.push(c.bold('  💡 Advice'));
    const challenge = cards[3];
    const outcome = cards[4];
    parts.push(`  Focus on overcoming: ${c.yellow(challenge.name)}`);
    parts.push(`  The path leads to: ${c.green(outcome.name)}`);
  }

  parts.push('');
  return parts.join('\n');
}

// ==================== 渲染每日牌 ====================
function renderDaily(card, date) {
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const parts = [];
  parts.push('');
  parts.push(c.bold(c.yellow('  ☀️ Daily Tarot Card')));
  parts.push(c.dim(`  ${dateStr}`));
  parts.push(c.gray('  ' + '─'.repeat(40)));
  parts.push(renderCard(card));
  parts.push('');

  return parts.join('\n');
}

module.exports = { renderCard, renderSpread, renderDaily, renderCardArt };
