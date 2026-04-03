// tarot 🔮 — 塔罗牌核心数据与逻辑
// 包含完整的78张塔罗牌数据：22张大阿卡纳 + 56张小阿卡纳

'use strict';

// ==================== 大阿卡纳 (Major Arcana) ====================
const MAJOR_ARCANA = [
  { id: 0, name: 'The Fool', zh: '愚者', keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    upright: 'A fresh start, new adventure, taking a leap of faith. Embrace the unknown with childlike wonder.',
    reversed: 'Recklessness, risk-taking without thinking. Hold on, pause and reconsider your path.' },
  { id: 1, name: 'The Magician', zh: '魔术师', keywords: ['manifestation', 'power', 'action', 'concentration'],
    upright: 'You have all the tools you need. Channel your willpower and make things happen.',
    reversed: 'Manipulation, poor planning, untapped talents. Don\'t waste your gifts.' },
  { id: 2, name: 'The High Priestess', zh: '女祭司', keywords: ['intuition', 'mystery', 'subconscious', 'wisdom'],
    upright: 'Trust your intuition. The answers lie within — quiet your mind and listen.',
    reversed: 'Secrets, withdrawn energy, silence your inner voice. Stop overthinking.' },
  { id: 3, name: 'The Empress', zh: '皇后', keywords: ['fertility', 'nature', 'abundance', 'nurturing'],
    upright: 'Abundance and nurturing energy. Create, grow, and enjoy life\'s pleasures.',
    reversed: 'Creative block, dependence, smothering. Find balance between giving and receiving.' },
  { id: 4, name: 'The Emperor', zh: '皇帝', keywords: ['authority', 'structure', 'control', 'fatherhood'],
    upright: 'Structure, authority, and leadership. Take charge and build solid foundations.',
    reversed: 'Domination, rigidity, inflexibility. Loosen your grip — control is an illusion.' },
  { id: 5, name: 'The Hierophant', zh: '教皇', keywords: ['tradition', 'conformity', 'education', 'spirituality'],
    upright: 'Seek guidance from tradition or a mentor. Spiritual wisdom through established paths.',
    reversed: 'Rebellion, breaking free from convention. Trust your own inner guidance system.' },
  { id: 6, name: 'The Lovers', zh: '恋人', keywords: ['love', 'harmony', 'relationships', 'values'],
    upright: 'A meaningful choice or deep connection. Follow your heart, but use your head too.',
    reversed: 'Disharmony, imbalance, misalignment. Reconnect with what truly matters.' },
  { id: 7, name: 'The Chariot', zh: '战车', keywords: ['determination', 'willpower', 'victory', 'assertiveness'],
    upright: 'Victory through determination. Charge forward with confidence and focus.',
    reversed: 'Lack of direction, aggression, no control. Realign before moving forward.' },
  { id: 8, name: 'Strength', zh: '力量', keywords: ['courage', 'patience', 'compassion', 'inner strength'],
    upright: 'Inner strength and courage. Face challenges with grace, not force.',
    reversed: 'Self-doubt, weakness, insecurity. Remember your own power.' },
  { id: 9, name: 'The Hermit', zh: '隐者', keywords: ['introspection', 'solitude', 'guidance', 'reflection'],
    upright: 'Time for solitude and reflection. Your inner light will guide the way.',
    reversed: 'Isolation, loneliness, withdrawal. Don\'t cut yourself off from the world.' },
  { id: 10, name: 'Wheel of Fortune', zh: '命运之轮', keywords: ['cycles', 'destiny', 'turning point', 'luck'],
    upright: 'A turning point. The wheel turns in your favor — embrace the change.',
    reversed: 'Bad luck, resistance to change, breaking cycles. What goes down must come up.' },
  { id: 11, name: 'Justice', zh: '正义', keywords: ['fairness', 'truth', 'cause-effect', 'law'],
    upright: 'Justice and fairness prevail. Honesty leads to the right outcome.',
    reversed: 'Unfairness, dishonesty, lack of accountability. Restore balance.' },
  { id: 12, name: 'The Hanged Man', zh: '倒吊人', keywords: ['surrender', 'new perspective', 'letting go', 'pause'],
    upright: 'Surrender and gain a new perspective. Sometimes doing nothing is doing everything.',
    reversed: 'Delays, resistance, stalling. Stop fighting the current.' },
  { id: 13, name: 'Death', zh: '死神', keywords: ['transformation', 'endings', 'change', 'transition'],
    upright: 'Transformation and new beginnings. Endings clear the path for fresh starts.',
    reversed: 'Resistance to change, fear of endings. Embrace transformation — it\'s natural.' },
  { id: 14, name: 'Temperance', zh: '节制', keywords: ['balance', 'moderation', 'patience', 'purpose'],
    upright: 'Balance and moderation. Find your middle path and walk it with patience.',
    reversed: 'Imbalance, excess, lack of long-term vision. Recalibrate your life.' },
  { id: 15, name: 'The Devil', zh: '恶魔', keywords: ['shadow', 'attachment', 'addiction', 'materialism'],
    upright: 'Examine your shadow side. What binds you? Awareness is the first step to freedom.',
    reversed: 'Release, freedom, breaking free. You have the power to unchain yourself.' },
  { id: 16, name: 'The Tower', zh: '塔', keywords: ['upheaval', 'revelation', 'awakening', 'change'],
    upright: 'Sudden change and upheaval. Sometimes structures must fall to build something better.',
    reversed: 'Avoidance of disaster, fear of change. Face the truth — it will set you free.' },
  { id: 17, name: 'The Star', zh: '星星', keywords: ['hope', 'inspiration', 'serenity', 'renewal'],
    upright: 'Hope and inspiration after the storm. Trust — the universe is guiding you.',
    reversed: 'Despair, lack of faith, disconnection. Look up — the stars still shine.' },
  { id: 18, name: 'The Moon', zh: '月亮', keywords: ['illusion', 'fear', 'subconscious', 'intuition'],
    upright: 'Not everything is as it seems. Trust your intuition through the darkness.',
    reversed: 'Release of fear, repressed emotions coming to light. Face the shadows.' },
  { id: 19, name: 'The Sun', zh: '太阳', keywords: ['joy', 'success', 'vitality', 'positivity'],
    upright: 'Joy, success, and vitality! Everything is illuminated — enjoy this radiant energy.',
    reversed: 'Temporary depression, overly optimistic, inner child needs attention.' },
  { id: 20, name: 'Judgement', zh: '审判', keywords: ['judgement', 'rebirth', 'absolution', 'reflection'],
    upright: 'A call to rise up and answer your higher purpose. Self-evaluation leads to renewal.',
    reversed: 'Self-doubt, ignoring the call, poor judgement. Listen to your awakening.' },
  { id: 21, name: 'The World', zh: '世界', keywords: ['completion', 'accomplishment', 'travel', 'harmony'],
    upright: 'Completion and accomplishment. You\'ve come full circle — celebrate your journey.',
    reversed: 'Incompletion, shortcuts, delays. Don\'t rush — finish what you started.' },
];

// ==================== 小阿卡纳 (Minor Arcana) ====================
const SUITS = {
  wands: { name: 'Wands', zh: '权杖', element: 'Fire 🔥', theme: 'creativity, action, passion' },
  cups: { name: 'Cups', zh: '圣杯', element: 'Water 💧', theme: 'emotions, relationships, intuition' },
  swords: { name: 'Swords', zh: '宝剑', element: 'Air 💨', theme: 'intellect, conflict, truth' },
  pentacles: { name: 'Pentacles', zh: '星币', element: 'Earth 🌍', theme: 'material, career, prosperity' },
};

// 数字牌的含义模板
const NUMBER_MEANINGS = {
  ace: {
    upright: 'New opportunity and potential. A gift from the suit\'s domain awaits.',
    reversed: 'Missed chance, blocked energy. Don\'t let this opportunity slip away.',
  },
  2: { upright: 'A decision or partnership. Balance two paths before choosing.', reversed: 'Indecision, imbalance. Trust yourself to make the call.' },
  3: { upright: 'Collaboration and growth. Working together brings success.', reversed: 'Delays, lack of teamwork. Communication is key.' },
  4: { upright: 'Stability and security. A solid foundation has been built.', reversed: 'Stagnation, possessiveness. Don\'t hold too tightly.' },
  5: { upright: 'Conflict and challenge. Growth comes through adversity.', reversed: 'Recovery from loss, moving past hardship.' },
  6: { upright: 'Harmony and generosity. Give and receive with grace.', reversed: 'Unequal exchange, conditional giving.' },
  7: { upright: 'Reflection and assessment. Reevaluate your path and choices.', reversed: 'Confusion, dishonesty. See things as they truly are.' },
  8: { upright: 'Movement and progress. Things are accelerating — stay focused.', reversed: 'Delays, frustration. Patience will be rewarded.' },
  9: { upright: 'Abundance and wish fulfillment. Your efforts are bearing fruit.', reversed: 'Disappointment, wishful thinking. Stay grounded.' },
  10: { upright: 'Completion and responsibility. Carrying the weight of success.', reversed: 'Burden, inability to delegate. Share the load.' },
};

// 宫廷牌的含义
const COURT_MEANINGS = {
  page: {
    upright: 'A messenger or new beginnings in the suit\'s energy. Curiosity and learning.',
    reversed: 'Immaturity, lack of direction. Focus your youthful energy.',
  },
  knight: {
    upright: 'Action and pursuit. Charging forward with the suit\'s energy. A quest begins.',
    reversed: 'Impulsiveness, recklessness. Slow down and think before you act.',
  },
  queen: {
    upright: 'Nurturing mastery of the suit\'s energy. Compassion, empathy, and inner strength.',
    reversed: 'Insecurity, emotional manipulation. Connect with your inner sovereignty.',
  },
  king: {
    upright: 'Mastery and authority over the suit\'s energy. Leadership and vision.',
    reversed: 'Domination, tyranny. Lead with wisdom, not ego.',
  },
};

// 生成小阿卡纳牌
function generateMinorArcana() {
  const cards = [];
  const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king'];

  for (const [suitKey, suit] of Object.entries(SUITS)) {
    for (const rank of ranks) {
      const rankNum = ranks.indexOf(rank);
      const isCourt = rankNum >= 10;
      const isAce = rank === 'ace';
      const isNumber = !isCourt && !isAce;

      let upright, reversed;

      if (isCourt) {
        upright = COURT_MEANINGS[rank].upright.replace("the suit's energy", suit.theme);
        reversed = COURT_MEANINGS[rank].reversed;
      } else if (isAce) {
        upright = NUMBER_MEANINGS.ace.upright;
        reversed = NUMBER_MEANINGS.ace.reversed;
      } else {
        upright = NUMBER_MEANINGS[rank].upright;
        reversed = NUMBER_MEANINGS[rank].reversed;
      }

      const displayName = rank === 'ace'
        ? `Ace of ${suit.name}`
        : `${rank.charAt(0).toUpperCase() + rank.slice(1)} of ${suit.name}`;

      cards.push({
        id: 22 + cards.length,
        name: displayName,
        zh: `${rank === 'ace' ? 'A' : rank.charAt(0).toUpperCase() + rank.slice(1)}${suit.zh}`,
        suit: suitKey,
        rank: rank,
        element: suit.element,
        keywords: suit.theme.split(', '),
        upright,
        reversed,
      });
    }
  }
  return cards;
}

// ==================== Card 类 ====================
class TarotCard {
  constructor(data, isReversed = false) {
    Object.assign(this, data);
    this.isReversed = isReversed;
  }

  get displayname() {
    return this.isReversed ? `${this.name} (Reversed)` : this.name;
  }

  get meaning() {
    return this.isReversed ? this.reversed : this.upright;
  }

  toJSON() {
    return {
      name: this.name,
      zh: this.zh,
      reversed: this.isReversed,
      meaning: this.meaning,
      element: this.element || null,
      keywords: this.keywords,
    };
  }
}

// ==================== 简单伪随机数生成器 (Mulberry32) ====================
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ==================== Deck 类 ====================
class TarotDeck {
  constructor(options = {}) {
    this.allowReversed = options.allowReversed !== false;
    const seed = options.seed ?? Date.now();
    this.rng = mulberry32(seed);
    // 构建完整的78张牌
    this.allCards = [...MAJOR_ARCANA, ...generateMinorArcana()];
  }

  // Fisher-Yates 洗牌
  shuffle() {
    const arr = [...this.allCards];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 抽取指定数量的牌
  draw(count = 1) {
    const shuffled = this.shuffle();
    return shuffled.slice(0, count).map(cardData => {
      const isReversed = this.allowReversed && this.rng() > 0.55;
      return new TarotCard(cardData, isReversed);
    });
  }
}

module.exports = { TarotDeck, TarotCard, MAJOR_ARCANA, SUITS };
