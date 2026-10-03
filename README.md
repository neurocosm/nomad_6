# NOMAD: Unified Cockpit Suite
**Created by BostonyFX ([@neurocosm](https://instagram.com/neurocosm))**

A high-performance, unified GPS navigation, telemetry avionics, and kinetic HUD cockpit suite. NOMAD unifies three distinct driving views into a single, seamless, zero-reload application powered by a shared underlying avionics engine.

---

## 🚀 The Three Driving Cockpits

### 1. 🚗 NOMAD RoadTrip (v3) (`/roadtrip.html`)
- **Structured HUD Layout**: Deep charcoal (`#16161e`) cockpit cards arranged in a tactical grid (`grid-template-rows: 27fr 45fr 28fr`).
- **Tactical Compass Rose**: 360° rotating azimuth ring with cardinal pointers and digital heading readout.
- **MUTCD Speed Limit Pod**: Dynamic road speed ceiling shield with overspeed visual alerts.
- **Framed Vector Map**: MapLibre vector map framed cleanly within the central display.
- **Classic Sensory Audio**: General Lee Dixie horn chime and Galaga laser salvo triggers.

### 2. 🚀 NOMAD Hyperspace (v4) (`/hyperspace.html`)
- **Edge-to-Edge Vector Map**: Full-bleed dark matter cartography with dynamic 3D building perspective and heading auto-rotation.
- **Newtonian Kinetic Bubbles**: Draggable, flingable telemetry bubbles with spring physics, momentum damping, and velocity snapping.
- **Vehicle Safe-Zone Forcefield**: Speed-adaptive deflection field around the vehicle marker preventing bubbles from obstructing the driver's forward sightline.
- **Sensory Starfield Consoles**: Interactive mini-games and tactile fidget consoles (KITT scanner, Disco beat, Visualizer, Slamdance, Festival).

### 3. 📟 NOMAD DIGIT (`/digit.html`)
- **100dvh Non-Scrolling Stack**: 5 rounded horizontal rectangular blocks designed for high tactical density and night driving.
  - **01 // LOCATION & COORDS**: Live street name, city/state, county/zip, AASHTO corridor badge, tap-to-copy coordinates.
  - **02 // MOTION & AVIONICS**: Numerical speed with `< 1.8 MPH` clamp badge, 16-wind bearing + sensor fusion source, altimeter in FT/M MSL.
  - **03 // WEATHER & ATMOSPHERE**: Open-Meteo weather badge, temp (°F/°C), humidity, UV index, barometer (inHg/hPa).
  - **04 // CHRONOMETRY & TIMEGRID**: Synchronized clock, day/date, DAMON Time countdown seconds to New Year, NOMAD elapsed annual seconds, UNIX epoch.
  - **05 // COGNITION & PERSPECTIVE**: Daily philosophy quotes engine with dynamic character-density geometry auto-fit pass.
- **4 Visual Themes**: Vivid Cyan Neon, Relaxed 256-Gray (Matte Titanium Slate), Apollo Heritage (R-W-B Chalk), and Arizona Dusk (Obsidian & Canyon Terracotta).

---

## ⚡ The Shared Avionics Core Engine (`/js/avionics-core.js`)

All cockpits and the Master Shell share a single source of truth: `window.NomadAvionics`:

1. **Multi-Stage GNSS Watcher**: High-accuracy `watchPosition` with automatic graceful fallback to standard accuracy and IP triangulation on network stalls (never freezes).
2. **Stationary Noise Filter (< 1.8 MPH Zero-Clamp)**: Clamps micro-jitter from multipath indoor reflections to `0.0 MPH` when vehicle is stopped.
3. **3D Tilt-Compensated Sensor Fusion**: Real-time fusion combining W3C DeviceOrientation (pitch, roll, yaw), iOS `webkitCompassHeading`, and GPS course over ground.
4. **AASHTO Highway Corridor Grid Axis**: Evaluates roadway trajectory against Interstate and US Highway numbering conventions with a $\pm 15^\circ$ directional hysteresis deadband around quadrant boundaries.
5. **Throttled Geocoding & Open-Meteo Weather**: Reverse geocoding throttled to $> 35\text{m}$ displacement and cached weather fetching.
6. **Keep-Alive Subsystems**: Screen Wake Lock API and a continuous 12 Hz inaudible Web Audio carrier oscillator preventing mobile Bluetooth A2DP audio stacks from sleeping.
7. **Black Box Flight Recorder**: Rolling telemetry buffer recording position, velocity, and bearing.

---

## 🧭 Master Shell & Instant Cockpit Switcher (`/index.html`)

- **Startup Boot Chooser Modal**: On launch, drivers select their preferred cockpit with a `"Remember my choice"` option.
- **Zero-Reload Instant Mode Switcher**: Permanent top navigation header allows switching between **RoadTrip**, **Hyperspace**, **DIGIT**, and the **Avionics Telemetry Hub** on the fly.
- **Zero GPS Reconnect**: Switching cockpits is an instantaneous DOM view transition. The underlying GNSS tracking, satellite lock, and sensor fusion never pause or reconnect.
- **Live HUD Ticker Strip**: Real-time ticker bar across the top displaying velocity, heading, location, AASHTO corridor, temperature, and elevation at all times.

---

## 🛠️ Verification & Compliance

- **Ground Truth Integrity**: Original benchmarks in `/ground_truth/` remain pristine and unmodified.
- **Responsive Viewport**: Tested across mobile (100dvh safe-area insets) and widescreen landscape displays.
- **Build & Quality**: Clean TypeScript/ESM compilation (`npm run build`), zero lint errors (`npm run lint`), and PWA offline manifest compliance.
