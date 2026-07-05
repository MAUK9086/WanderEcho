# WanderEcho

> **Your voice-first AI tour guide.** Talk, explore, and discover the world around you — no downloads, no logins, no limits.

🌐 **Live Demo:** [wanderecho.vercel.app](https://wanderecho.vercel.app)

---

## The Problem

Traveling to a new city means juggling Google Maps, Wikipedia tabs, travel blogs, and audio tour apps — none of which talk to each other, none of which know where you're standing, and none of which feel human. Traditional audio guides are scripted, static, and expensive. Most tourists miss 80% of what makes a place worth visiting.

## The Solution

WanderEcho replaces the stack with a single voice conversation. Stand anywhere in the world, tap a button, and ask — *"What happened here?"*, *"What should I eat nearby?"*, *"Tell me the story of this building like a local would."* The AI answers in real time, in your language, in whichever personality you choose.

Group travel is supported too: create a shared room, invite your travel companions with a 6-character code, and everyone can share discoveries, chat, and listen to the same AI guide together — live.

---

## Business Case

| Metric | Context |
|--------|---------|
| **$7.6B** | Global audio tour market size (2024) |
| **1.4B+** | International tourist arrivals per year |
| **0 downloads** | WanderEcho runs fully in the browser |
| **<2s** | Time from tap to AI voice response |
| **Free to start** | No account, no credit card, no app store |

**Target users:** Independent travelers, museum visitors, school trip organisers, travel influencers, tour operators looking to augment their offerings.

**Monetisation paths:** Freemium (premium personalities + offline mode), white-label for tourism boards, B2B API for hotel concierge integrations.

---

## Features

### 🎙️ Voice Tour Guide
Real-time AI conversation via WebRTC. Ask anything about your surroundings — history, culture, food, architecture — and get a spoken response instantly. No typing required.

### 🧭 Guide Personalities
Choose the voice that fits your vibe:
| Personality | Style |
|-------------|-------|
| 🧠 **Historian** | Deep dives into dates, events, and historical context |
| 🎭 **Storyteller** | Vivid narratives, legends, and human drama |
| 🧭 **Explorer** | Adventure angles, off-the-beaten-path recommendations |
| 🏡 **Local Guide** | Neighbourhood tips, hidden gems, food spots |

### 📍 Live Map with Nearby POIs
Interactive map centred on your current location. Colour-coded markers for tourist attractions, historic sites, restaurants, and cafés sourced live from OpenStreetMap. Tap any marker to get details and jump straight into a voice tour about that specific place.

### 👥 Real-Time Group Rooms
Create a room in one tap and share a 6-character code with your group. Everyone in the same room sees live messages, shares discoveries, and can run their own voice guide session — all in sync. Built on Firebase Realtime Database.

### ✨ Gamified Experience
XP points and daily streaks tracked in the navbar. Every message sent or call completed earns XP — making exploration feel rewarding.

### 🌐 Multilingual
Telnyx AI adapts to the language you speak in naturally.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (React)                    │
│                                                      │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  Home /  │  │ Voice Tour│  │   Group Rooms     │  │
│  │  Map     │  │  (Chat)   │  │  (Lobby + Room)   │  │
│  └──────────┘  └─────┬─────┘  └────────┬─────────┘  │
│                      │                 │             │
│              ┌───────▼──────┐  ┌───────▼──────────┐ │
│              │ useTelnyx    │  │   useRoom         │ │
│              │ (WebRTC hook)│  │ (Firebase hook)   │ │
│              └───────┬──────┘  └───────┬──────────┘ │
└──────────────────────┼─────────────────┼────────────┘
                       │                 │
          ┌────────────▼───┐    ┌────────▼────────────┐
          │  Telnyx WebRTC │    │  Firebase Realtime  │
          │  AI Assistant  │    │     Database        │
          │  (Voice + AI)  │    │  (rooms/messages)   │
          └────────────────┘    └─────────────────────┘
                       │
          ┌────────────▼───────────────────┐
          │      OpenStreetMap /           │
          │      Overpass API (POIs)       │
          └────────────────────────────────┘
```

**Key design decisions:**
- **No custom backend** — all real-time logic is handled by Telnyx (voice AI) and Firebase (group chat), eliminating server maintenance cost
- **Anonymous auth** — Firebase signs users in anonymously on first load; no account friction
- **Edge-deployed frontend** — Vercel CDN distributes the static build globally with <50ms TTFB

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 18 + Vite | Component rendering, fast HMR |
| **Styling** | Tailwind CSS 3 | Utility-first, Duolingo-inspired design system |
| **Font** | Nunito (Google Fonts) | Rounded, playful — matches gamified UX |
| **Voice / AI** | Telnyx WebRTC SDK | Real-time audio call to AI assistant |
| **Map** | React Leaflet + OpenStreetMap | Interactive map, no API key required |
| **POI Data** | Overpass API | Live nearby places within 1km radius |
| **Group Chat** | Firebase Realtime Database | Sub-100ms message delivery |
| **Auth** | Firebase Anonymous Auth | Zero-friction session identity |
| **Routing** | React Router v6 | SPA navigation including `/room/:code` |
| **Hosting** | Vercel | Auto-deploy from GitHub, global CDN |
| **Container** | Docker + Nginx | Optional self-hosted deployment |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Realtime Database + Anonymous Auth enabled (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/MAUK9086/WanderEcho.git
cd WanderEcho

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Group Rooms** work out of the box — Firebase config is already embedded. Voice calls require a Telnyx account with an AI Assistant configured.

### Production Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

### Docker

```bash
# Build image
docker build -t wanderecho .

# Run on port 8080
docker run -p 8080:80 wanderecho
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import this repo
3. Vercel auto-detects Vite — no config needed
4. Click **Deploy**

The `vercel.json` in the repo handles SPA routing so deep links like `/room/ABC123` work correctly.

---

## Project Structure

```
WanderEcho/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Sticky nav with XP + streak badges
│   ├── hooks/
│   │   ├── useTelnyx.js        # WebRTC voice call logic
│   │   ├── useRoom.js          # Firebase group room logic
│   │   └── useXP.js            # Gamification (XP + streaks)
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Chat.jsx            # Voice tour + text chat
│   │   ├── Map.jsx             # Live map with POIs
│   │   ├── Groupchat.jsx       # Room lobby (create / join)
│   │   ├── Room.jsx            # Live group room chat
│   │   ├── MicButton.jsx       # Animated voice call button
│   │   └── PS.jsx              # Personality selector
│   ├── firebase.js             # Firebase initialisation
│   ├── App.jsx                 # Router + layout
│   └── index.css               # Tailwind + Duolingo design tokens
├── Dockerfile                  # Two-stage Docker build
├── nginx.conf                  # SPA routing for Docker/Nginx
├── vercel.json                 # Vercel SPA rewrite rule
├── FIREBASE_SETUP.md           # Firebase project setup guide
└── .env.example                # Environment variable template
```

---

## Roadmap

- [ ] Voice transcription display (show what the AI said as text)
- [ ] Landmark-triggered narration (auto-start when entering a geofence)
- [ ] Offline mode with cached tour content
- [ ] User profiles and saved tour history
- [ ] Premium personalities with distinct voice styles
- [ ] Tour rating and community reviews

---

## Credits

Built for **TADHack Global 2025** — a 48-hour hackathon. This project did not place; it's shared here as a complete, shipped example of end-to-end product work (voice AI integration, real-time backend, mapping) built under time pressure.

**Team:** Paradox  
**Developer:** Ahmadullah  
**Contact:** maukhan9086@gmail.com

---

<div align="center">
  <sub>Made with ❤️ for curious travelers everywhere.</sub>
</div>
