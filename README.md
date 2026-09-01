# 🍴 WhatTheFork

> **Pantry Leftover Recipe Finder & Smart Grocery Planner**

WhatTheFork is a modern web app designed to help you reduce food waste and answer the age-old question: *"What can I make with what I have?"* Simply input the ingredients sitting in your fridge or pantry, and WhatTheFork will generate matching recipes, detail step-by-step cooking instructions, and build a custom grocery list for missing items.

---

## ✨ Features

* **Ingredient Tag System:** Dynamic tag-based input field allowing rapid adding, clearing, and editing of pantry items.
* **Smart Matching:** Displays available ingredients vs. missing ingredients for every recipe match.
* **Instant Grocery List:** One-click transfer of missing recipe ingredients to an interactive, persistent checklist.
* **Full Recipe Drawer:** Step-by-step prep instructions, cooking times, and exact measurements in a modal view.
* **Offline / Mock Mode:** Built-in fallback mock data system ensuring uninterrupted usage even without API credits.
* **Modern Aesthetic:** Styled with **Tailwind CSS**, dynamic glassmorphism UI cards, custom modern typography (*Plus Jakarta Sans* & *Inter*), and a dark slate & amber gold palette.

---

## 🎨 Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Dark Charcoal** | `#0D1419` | Main background & deep contrast elements |
| **Slate Navy** | `#253A4A` | Component cards, containers & structural panels |
| **Amber Gold** | `#E0A840` | Primary buttons, active tags & key highlights |
| **Muted Taupe** | `#CDC6B6` | Secondary text, subtle borders & icon accents |
| **Cream White** | `#F7F4E3` | Primary body text & major headings |

---

## 🛠️ Tech Stack

* **Framework:** [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Fonts:** [Google Fonts](https://fonts.google.com/) (*Plus Jakarta Sans* & *Inter*)
* **API Integration:** [Spoonacular API](https://spoonacular.com/food-api)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16.x or higher)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/what-the-fork.git](https://github.com/YOUR_USERNAME/what-the-fork.git)
   cd what-the-fork