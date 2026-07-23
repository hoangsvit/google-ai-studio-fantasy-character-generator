# 🃏 Fantasy Character Generator & Player Card Deck

An interactive fantasy player card generator powered by React, TypeScript, Tailwind CSS, and Google Gemini AI for generating custom cartoon hero portraits and dramatic character origin stories.

---

## 📖 Overview

**Fantasy Character Generator** allows tabletop RPG players, worldbuilders, and gamers to create high-quality fantasy character cards complete with randomized core survival stats, abilities, lore quotes, AI-generated cartoon video game portraits, and AI-generated backstories.

### ✨ Key Features

- 🃏 **Bordered Player Card UI**: Metallic frame layout with class-themed glowing aura accents and corner badges.
- 📊 **Prominent Core Stats**: Each player card features randomized primary RPG stats: **Health (HP)**, **Mana (MP)**, and **Strength (STR)** alongside primary attribute modifiers.
- 🎨 **AI Cartoon Portrait Generator**: Generates 2D cartoon video-game style hero portraits tailored to the character's Class & Race using Google Gemini (`gemini-3.1-flash-lite-image`) with automatic fallback support.
- 📜 **AI Backstory Generator**: Creates a unique, dramatic 1 to 2 sentence origin story with the "Generate Backstory" button powered by Google Gemini (`gemini-2.5-flash`).
- 🎴 **"My Deck" Collection System**: Save generated characters directly to your personal deck ("Save to Deck"), view your saved cards, and export your deck as a text summary.
- 🎲 **Interactive Dice Roller & Audio**: Web Audio API sound effects paired with animated 3D-style dice rolls (d4, d6, d8, d10, d12, d20).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Motion (`motion/react`), Lucide React.
- **Backend**: Node.js, Express, `esbuild`, `tsx`.
- **AI Integration**: `@google/genai` (Google Gen AI SDK) accessing Gemini models server-side.

---

## 🚀 Setup & Installation

### 1. Prerequisites
- **Node.js**: Version 18.0.0 or higher.
- **npm**: Included with Node.js.

### 2. Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### 3. Environment Variable Setup
Copy the example environment file to create your local `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your Google Gemini API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> **Note**: If `GEMINI_API_KEY` is not provided, the application will automatically fallback to procedural portrait generation and procedural story composition so all features remain functional.

---

## 🏃‍♂️ Running the Application

### Development Mode
Runs the local dev server with hot reload at `http://localhost:3000`:
```bash
npm run dev
```

### Production Build & Launch
Compiles the application and backend server into `dist/`, then launches the standalone server:
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
.
├── server.ts                 # Express backend server (Gemini AI API proxy & static file server)
├── src/
│   ├── App.tsx               # Main application entry component
│   ├── components/           # UI Components (CharacterCard, PortraitGenerator, PartyDrawer, etc.)
│   ├── data/                 # Fantasy Classes, Races, and Equipment dataset
│   ├── utils/                # Character generator algorithms & Web Audio synthesizers
│   └── types.ts              # TypeScript interfaces for characters and stats
├── package.json              # Dependency declarations and scripts
└── README.md                 # Project documentation
```
