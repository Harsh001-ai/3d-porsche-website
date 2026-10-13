# Porsche 911 GT3 RS — Cinematic Scroll-Animated Hero Section

A cinematic, scroll-driven interactive automotive website built around the provided 240-frame 1920×1080 Porsche 911 GT3 RS footage.

---

## 🏎 Technical Architecture & Frame Scrubbing Rationale

### Why Canvas Frame-Sequence Scrubbing Over Standard `<video>`?
1. **Zero-Latency Seeking**: HTML5 `<video>` scrubbing on browsers relies on keyframe decoding, introducing 100ms–300ms delays, stutter, and skipped frames during user scrolling (especially reverse scrolling and rapid wheel flicks).
2. **Apple & Automotive Gold Standard**: High-end automotive and hardware product sites (Apple, Porsche, Rimac) use high-performance `<canvas>` rendering driven by `requestAnimationFrame`.
3. **Flawless Bi-Directional Scrubbing**: Forward scrolling advances camera motion; reverse scrolling reverses playback instantaneously at 60–120 FPS.
4. **Retina Display Scaling**: Physical pixel density scaling (`devicePixelRatio`) prevents blurriness while retaining edge-to-edge cinematic framing.

---

## 🚀 How to Run the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛠 Key Features Implemented

1. **Scroll-Driven Canvas Hero (`HeroScrollCanvas.jsx`)**:
   - Pinned 400vh scroll track powered by **GSAP ScrollTrigger**.
   - Scrub smoothing interpolation (`scrub: 0.6`) for fluid mouse-wheel inertia.
   - Non-intrusive art direction: Opening frame 1 preserves the footage's built-in 3D 911 numerals and spec graphics without obstruction.
   - 4 Dynamic Scrollytelling Phases:
     - **Phase 1 (0–18%)**: Pristine lateral profile & heritage specs.
     - **Phase 2 (18–52%)**: Camera push-in into aerodynamic flank, louvres, and center-lock red wheels with active DRS card.
     - **Phase 3 (52–78%)**: Orbit around swan-neck carbon wing with 4.0L atmospheric 9,000 RPM boxer engine stats.
     - **Phase 4 (78–100%)**: Centered rear stance showcasing the 6:49.328 Nürburgring Nordschleife record.
   - Manual interactive timeline scrubber bar (`001` to `240`) and automated "Cinematic Tour" preview button.
2. **Web Audio API Flat-6 Engine Synthesizer (`soundEngine.js`)**:
   - Generates authentic 6-cylinder atmospheric boxer acoustic harmonics.
   - Modulates pitch, filter cutoff, and resonance dynamically with user scroll velocity.
3. **Aerodynamics Section (`AerodynamicsSection.jsx`)**:
   - Deep-dive into 860 kg downforce at 285 km/h, hydraulic DRS, single center-radiator concept, and teardrop aerofoil suspension arms.
4. **Performance Section (`PerformanceSection.jsx`)**:
   - Interactive 9,000 RPM analog-digital tachometer with interactive "Hold to Rev" capability.
   - Metric (PS / km/h) & Imperial (HP / mph) toggle.
5. **Circuit Telemetry (`TelemetrySection.jsx`)**:
   - Official certified lap times (Nürburgring 6:49.328, Road America 2:13.820, Silverstone 2:03.210) and full technical parameters.
6. **Bespoke Visualizer & Configurator (`VisualizerSection.jsx`)**:
   - Exterior paint finishes, wheel finishes, and package switcher with multi-angle previews and consultation reservation modal.
7. **Production Automotive Footer (`Footer.jsx`)**:
   - Official WLTP fuel consumption and emissions compliance disclosure.
