<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/Zero_Deps-✅-success?style=for-the-badge" alt="Zero Deps"/>
  <img src="https://img.shields.io/badge/Cards-78-9cf?style=for-the-badge" alt="78 Cards"/>
</p>

<h1 align="center">🔮 tarot</h1>

<p align="center">
  <strong>A beautiful terminal tarot card reader with ASCII art cards, multiple spreads, and detailed interpretations.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Install</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-spreads">Spreads</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

- 🃏 **78 fully detailed cards** — Complete Major Arcana (22) + Minor Arcana (56) with upright & reversed meanings
- 📊 **5 spread types** — Single card, Past/Present/Future, Celtic Cross, Yes/No, Relationship
- 🎨 **Beautiful ANSI output** — Color-coded cards by suit element (Fire 🔥, Water 💧, Air 💨, Earth 🌍)
- 🌟 **Daily card** — Date-seeded daily draw for your morning ritual
- 🔄 **Reversed cards** — Automatic reversed detection with inverted card borders
- 📤 **JSON output** — Machine-readable output with `--json` flag
- 🎲 **Reproducible draws** — Seed-based RNG for consistent readings (`--seed 42`)
- ⚡ **Zero dependencies** — Pure Node.js, no external packages needed

## 📦 Installation

```bash
# Clone and link globally
git clone https://github.com/nadonghuang/tarot.git
cd tarot
npm link

# Or run directly
npx ./tarot
```

## 🚀 Usage

```bash
# Draw a single card
tarot

# Past / Present / Future
tarot three

# Full Celtic Cross reading (10 cards)
tarot celtic

# Get a yes/no answer
tarot yesno

# Relationship insight
tarot relationship

# Today's daily card
tarot daily

# Draw 5 random cards
tarot -n 5

# Reproducible reading
tarot three --seed 42

# JSON output (great for scripts)
tarot celtic --json

# No reversed cards
tarot --no-reverse
```

## 📖 Spreads

| Spread | Cards | Description |
|--------|-------|-------------|
| `single` (default) | 1 | Quick guidance card |
| `three` | 3 | Past → Present → Future |
| `yesno` | 3 | Evidence For / Against + Verdict |
| `relationship` | 5 | You, Partner, Foundation, Challenge, Outcome |
| `celtic` | 10 | The classic deep reading |

## 📁 Project Structure

```
tarot/
├── bin/
│   └── tarot.js        # CLI entry point
├── src/
│   ├── index.js        # Card data & deck logic (78 cards)
│   ├── renderer.js     # ANSI terminal rendering
│   └── spreads.js      # Spread definitions
├── examples/
├── package.json
├── LICENSE
└── README.md
```

## 🎨 Card Elements

Each Minor Arcana suit maps to an element with a unique color:

| Suit | Element | Color | Theme |
|------|---------|-------|-------|
| Wands 🪄 | Fire 🔥 | Red | Creativity, action, passion |
| Cups 🏆 | Water 💧 | Blue | Emotions, relationships |
| Swords ⚔️ | Air 💨 | White | Intellect, truth, conflict |
| Pentacles 🪙 | Earth 🌍 | Green | Material, career, prosperity |

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with 🔮 by <a href="https://github.com/nadonghuang">nadonghuang</a>
  <br/>
  <sub>If you find this mystical, please give it a ⭐!</sub>
</p>
