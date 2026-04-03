// tarot 🔮 — 牌阵定义
// 包含多种经典塔罗牌阵

'use strict';

const spreads = {
  single: {
    name: '✨ Single Card',
    description: 'A single card to guide your day',
    positions: [
      { name: 'Your Card', description: 'The energy surrounding you right now' },
    ],
  },

  three: {
    name: '🕒 Three Card Spread',
    description: 'Past / Present / Future — the flow of your journey',
    positions: [
      { name: '📜 Past', description: 'What has led you here' },
      { name: '📍 Present', description: 'Where you are now' },
      { name: '🔮 Future', description: 'What lies ahead' },
    ],
  },

  yesno: {
    name: '✅ Yes / No Reading',
    description: 'A quick answer drawn from three cards',
    positions: [
      { name: '🟢 For', description: 'Evidence pointing to Yes' },
      { name: '🔴 Against', description: 'Evidence pointing to No' },
      { name: '⚖️ Verdict', description: 'The deciding factor' },
    ],
  },

  relationship: {
    name: '💕 Relationship Spread',
    description: 'Insight into a relationship dynamic',
    positions: [
      { name: '🅰️ You', description: 'Your energy in the relationship' },
      { name: '🅱️ Partner', description: 'Their energy in the relationship' },
      { name: '🌉 Foundation', description: 'What connects you both' },
      { name: '⚠️ Challenge', description: 'The obstacle to overcome' },
      { name: '🌈 Outcome', description: 'Where this is heading' },
    ],
  },

  celtic: {
    name: '✝️ Celtic Cross',
    description: 'The classic 10-card deep reading',
    positions: [
      { name: '🎯 Present', description: 'Your current situation' },
      { name: '🚧 Challenge', description: 'The obstacle you face' },
      { name: '🏛️ Foundation', description: 'The root cause, deep past' },
      { name: '📅 Recent Past', description: 'What recently transpired' },
      { name: '👑 Best Outcome', description: 'What you can achieve' },
      { name: '🔜 Near Future', description: 'What is coming soon' },
      { name: '🧑 Self', description: 'How you see yourself' },
      { name: '🌍 Environment', description: 'External influences' },
      { name: '😈 Hopes & Fears', description: 'What drives or scares you' },
      { name: '🎬 Final Outcome', description: 'The ultimate resolution' },
    ],
  },
};

module.exports = { spreads };
