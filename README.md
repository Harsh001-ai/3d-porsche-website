# Porsche 911 GT3 RS (Type 992) — Dark Cinematic Luxury Automotive Experience

> **🌐 Live Deployment**: [https://harsh001-ai.github.io/3d-porsche-website/](https://harsh001-ai.github.io/3d-porsche-website/)

A dark cinematic luxury automotive web experience built around the Porsche 911 GT3 RS (Type 992). The application combines a 240-frame 4K/1080p scroll-driven canvas sequence with verified Weissach engineering, an interactive 360° vehicle turntable, driver cockpit rotary dials, Nordschleife sector telemetry, and an allocation consultation desk.

---

## 🏎 Live Architecture & Design System

- **Hero Canvas (`HeroScrollCanvas.jsx`)**:
  - High-performance 240-frame `<canvas>` scrubbed with **GSAP ScrollTrigger** (`scrub: 0.6`).
  - Native pixel ratio scaling (`devicePixelRatio`) and bidirectional inertial playback at 60–120 FPS.
  - Interactive timeline scrubber (`001` to `240`) and automated cinematic tour preview.

- **Dark Cinematic Luxury Design System**:
  - **Obsidian Black (`#050505`)**: Clean deep ground with zero muddy grey tones.
  - **Graphite (`#111318`)**: Restrained hairline panels (`border-white/10`) with zero generic glassmorphism blobs.
  - **Warm Ivory (`#E8E6E1`)**: Editorial typography via **Syncopate** and **Space Grotesk**.
  - **Muted Technical Grey (`#9A9FA8`)**: Technical data and coordinates in **JetBrains Mono**.
  - **Motorsport Red (`#DC2626` / `#EF4444`)**: Focused aerodynamic active indicators.

- **Web Audio Flat-6 Synthesizer (`soundEngine.js`)**:
  - Web Audio API procedural synthesis of an atmospheric 4.0L Boxer-6 engine with dynamic pitch and resonance linked to user scroll speed.

---

## 🏁 Experience Flow (Scenes A – G)

1. **Scene A — The Transition Bridge (`TransitionBridge.jsx`)**: Seamless architectural exit from the 3D hero into Weissach development telemetry.
2. **Scene B — The Signature Specification (`SignatureShowcase.jsx`)**: Asymmetrical vehicle stage with instant camera focus vectors (Swan-Neck DRS Wing, Front Louvres, Pyro Red Magnesium Wheels, Aero Stance & Central Diffuser).
3. **Scene C — Performance Dossier (`EngineeringNarrative.jsx`)**: 3-chapter verified breakdown:
   - 4.0L Atmospheric Flat-6 @ 9,000 RPM (525 PS / 465 Nm).
   - Single Central Radiator concept (-15 kg structural weight reduction).
   - Continuous Variable Downforce (860 kg @ 285 km/h).
4. **Scene D — Exterior Craftsmanship Gallery (`CraftsmanshipGallery.jsx`)**: Asymmetrical 5-tile editorial inspection with high-res modals.
5. **Interactive 360° Vehicle Exploration (`InteractiveOrbitalViewer.jsx`)**: Horizontal drag-to-rotate canvas turntable with camera vector presets (0°, 45°, 90°, 135°, 180°), zoom, and reset.
6. **Design Manifesto (`DesignPhilosophy.jsx`)**: Andreas Preuninger principles ("No styling lines. Every surface exists solely because the air demands it.").
7. **Scene E — Cockpit Ergonomics (`CockpitExperience.jsx`)**: Interactive 4-rotary dial steering wheel workstation: DRS, PASM suspension damping, PTV+ differential lock, and ESC/TC 7-stage slip control.
8. **Scene F — Nordschleife Telemetry & Cinematic Moment (`TrackTelemetry.jsx` & `CinematicMoment.jsx`)**: Sector breakdown of the official 6:49.328 lap record followed by a full-bleed downforce stance visual.
9. **Scene G — Allocation Desk & Legal Footer (`FinalCTA.jsx` & `Footer.jsx`)**: Request consultation modal dialog, direct JSON technical dossier export, and official WLTP fuel consumption disclosures.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Harsh001-ai/3d-porsche-website.git

# Navigate into project directory
cd 3d-porsche-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📋 Technology Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation & Scrollytelling**: GSAP 3 + ScrollTrigger
- **Audio Engine**: Web Audio API Procedural Synthesizer
- **Icons**: Lucide React
- **Typography**: Syncopate, Space Grotesk, JetBrains Mono
