DO NOT CODE ANYTHING IN THE NEW PROJECT UNTIL YOU DISCUSS IT WITH THE USER AND CONFIRM BOTH OF YOU ARE ON THE EXACT SAME PAGE.
Any AI assistant starting up in the new project will see this warning first and must pause, read the ground truth files, present a status assessment, and await your confirmation before writing code.

The Ground Truth Archive Strategy:
Outlines the /ground_truth/ directory structure (roadtrip/, hyperspace/, digit/).
Dictates that all files inside /ground_truth/ are read-only benchmarks that must never be altered.
Instructs the engineer to lift exact HTML markup and CSS directly from those benchmarks rather than reinventing them.

The Shared Avionics Core ("The Brain"):
Multi-stage GNSS watcher with progressive fallback (no freezing).
< 1.8 MPH stationary zero-clamp deadband.
3D tilt-compensated magnetometer / gyro sensor fusion.
AASHTO highway corridor grid axis engine (
 hysteresis deadband).
Throttled reverse geocoding and Open-Meteo weather caching.
Screen wake lock and Web Audio keep-alive.

The Three Pluggable Cockpits:
NOMAD RoadTrip (v3): Structured HUD gauges, speed limit pod, compass rose, route badges.
NOMAD Hyperspace (v4): Edge-to-edge vector map, Newtonian floating kinetic bubbles, custom shapes and physics, vehicle safe-zone deflection.
NOMAD DIGIT: 5-block rounded rectangular stack, 100dvh non-scrolling, high tactical density.

Shared Sensory Consoles & Arcade Screensavers:
Synthomatic PCB circuit, Starfield warp, Ocean aquarium, Stampede, and the 60s countdown die fidget.

The UI Selector & Switcher:
Startup boot modal with "Remember my choice".
Top-header toggle allowing instant switching between the three cockpits on the fly with zero page reload and zero GPS signal interruption.

Branding & Version Registry:
BostonyFX credits (@neurocosm) and US Eastern Time versioning rules.
