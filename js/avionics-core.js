/**
 * ====================================================================
 * NOMAD UNIFIED AVIONICS CORE ("THE BRAIN")
 * 
 * Central Telemetry, Sensor Fusion, AASHTO Corridor, Geocoding & Weather Engine
 * Consolidation of NOMAD RoadTrip (v3), NOMAD Hyperspace (v4), and NOMAD DIGIT
 * 
 * Proprietary & Created by BostonyFX
 * Instagram: https://instagram.com/neurocosm
 * All rights reserved.
 * ====================================================================
 */

// 50 US State Abbreviations Table
export const STATE_ABBREVIATIONS = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
  "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
  "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
  "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
  "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
  "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
  "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};

// Weather WMO Code Dictionary with SVG Icons
export const WEATHER_ICONS = {
  sun: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  cloudSun: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M12 2v2" stroke="#ffcc00"/><path d="m4.93 4.93 1.41 1.41" stroke="#ffcc00"/><path d="M20 12h2" stroke="#ffcc00"/><path d="m19.07 4.93-1.41 1.41" stroke="#ffcc00"/><path d="M15.94 11.23a5 5 0 0 0-8.92 2.12 3.5 3.5 0 0 0 .98 6.65h8a4 4 0 0 0 .94-7.77z" stroke="#cbd5e1"/></svg>`,
  cloud: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M17.5 19H8.5a7 7 0 0 1-1.2-13.8 8 8 0 0 1 14.8 2.3 4.5 4.5 0 0 1-.6 11.5Z"/></svg>`,
  rain: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M16 13v8"/><path d="M8 13v8"/><path d="M12 15v8"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" stroke="#cbd5e1"/></svg>`,
  thunder: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffd54f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  snow: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`
};

export function getWeatherInfo(code) {
  const weatherMap = {
    0: { text: "Clear Sky", icon: WEATHER_ICONS.sun },
    1: { text: "Mainly Clear", icon: WEATHER_ICONS.cloudSun },
    2: { text: "Partly Cloudy", icon: WEATHER_ICONS.cloudSun },
    3: { text: "Overcast", icon: WEATHER_ICONS.cloud },
    45: { text: "Foggy", icon: WEATHER_ICONS.cloud },
    51: { text: "Drizzle", icon: WEATHER_ICONS.rain },
    61: { text: "Slight Rain", icon: WEATHER_ICONS.rain },
    63: { text: "Moderate Rain", icon: WEATHER_ICONS.rain },
    71: { text: "Snow", icon: WEATHER_ICONS.snow },
    80: { text: "Rain Showers", icon: WEATHER_ICONS.rain },
    95: { text: "Thunderstorm", icon: WEATHER_ICONS.thunder }
  };
  return weatherMap[code] || { text: "Fair", icon: WEATHER_ICONS.cloudSun };
}

/**
 * Standardize and abbreviate common road naming components
 */
export function abbreviateStreetName(streetName) {
  if (!streetName) return '';
  return streetName
    .replace(/\b(?:Route|State Route|State Hwy|SR)\s+(\d{1,3}[A-Z]?)\b/gi, '$1')
    .replace(/\bStreet\b/gi, 'St.')
    .replace(/\bAvenue\b/gi, 'Ave.')
    .replace(/\bRoad\b/gi, 'Rd.')
    .replace(/\bBoulevard\b/gi, 'Blvd.')
    .replace(/\bHighway\b/gi, 'Hwy.')
    .replace(/\bParkway\b/gi, 'Pkwy.')
    .replace(/\bDrive\b/gi, 'Dr.')
    .replace(/\bLane\b/gi, 'Ln.')
    .replace(/\bCircle\b/gi, 'Cir.')
    .replace(/\bCourt\b/gi, 'Ct.')
    .replace(/\bTurnpike\b/gi, 'Tpk.');
}

/**
 * Great-circle distance between two coordinate pairs in meters (Haversine formula)
 */
export function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert heading degrees into 8-cardinal compass string
 */
export function getCardinalDirection(angle) {
  if (angle === null || isNaN(angle)) return '--';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(((angle % 360 + 360) % 360) / 45) % 8];
}

/**
 * Convert heading degrees into 16-wind compass string
 */
export function getCardinal16Direction(deg) {
  if (deg === null || isNaN(deg)) return '--';
  const dir = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dir[Math.round(((deg % 360 + 360) % 360) / 22.5) % 16];
}

/**
 * Convert heading to broad 4-quadrant road direction
 */
export function getCardinalRoadDirection(heading) {
  if (heading === null || isNaN(heading)) return '';
  const norm = (heading % 360 + 360) % 360;
  if (norm >= 315 || norm < 45) return 'North';
  if (norm >= 45 && norm < 135) return 'East';
  if (norm >= 135 && norm < 225) return 'South';
  return 'West';
}

/**
 * Validates road route numbers: 1 to 3 digits with optional single letter suffix
 */
export function isValidHighwayRouteNumber(str) {
  if (!str) return false;
  const clean = String(str).trim().toUpperCase();
  if (/^\d{1,3}[A-Z]?$/i.test(clean)) {
    const numVal = parseInt(clean.replace(/\D/g, ''), 10);
    return numVal > 0 && numVal < 1000;
  }
  return false;
}

/**
 * Format route name with "Route " prefix if not already present
 */
export function formatRouteName(str) {
  if (!str) return '';
  const clean = String(str).trim();
  if (/^(?:Route|Rt\.?|SR|State\s*Route|US|I-)\b/i.test(clean)) return clean;
  return `Route ${clean}`;
}

/**
 * AASHTO Highway Corridor Grid Axis Engine:
 * Odd-numbered Interstates & designated N-S routes locked strictly to North or South.
 * Even-numbered Interstates & designated E-W routes locked strictly to East or West.
 */
export function getHighwayCorridorAxis(routeNumber, highwayType = '') {
  if (!routeNumber) return 'any';
  const clean = String(routeNumber).toUpperCase().trim();
  
  const isInterstate = highwayType === 'interstate' || /^I[-\s]?\d+/i.test(clean) || clean === 'INTERSTATE' || clean.includes('INTERSTATE');
  const isUS = highwayType === 'us' || /^US[-\s]?\d+/i.test(clean);
  const isState = highwayType === 'state' || /^(?:RT|ROUTE|SR|MA)[-\s]?\d+/i.test(clean);
  
  const numMatch = clean.match(/\d+/);
  const num = numMatch ? parseInt(numMatch[0], 10) : null;
  
  if (num !== null) {
    // Prominent designated state routes (e.g. Route 128 is officially signed North/South)
    if (num === 128) return 'north-south';
    if ([3, 24, 140, 12, 8, 7, 28, 38].includes(num)) return 'north-south';
    if ([2, 9, 20, 30, 119].includes(num)) return 'east-west';
    
    // Interstate Highway Grid (AASHTO standard: Odd = N/S, Even = E/W)
    if (isInterstate || (!isUS && !isState && [95, 93, 90, 84, 80, 91, 87, 495, 290, 195, 295, 395].includes(num))) {
      const baseNum = num >= 100 ? (num % 100) : num;
      return (baseNum % 2 === 1) ? 'north-south' : 'east-west';
    }
    
    // US Highway Grid (Odd = North/South, Even = East/West)
    if (isUS) {
      return (num % 2 === 1) ? 'north-south' : 'east-west';
    }
    
    // General state route fallback
    if (isState) {
      return (num % 2 === 1) ? 'north-south' : 'east-west';
    }
  }
  
  return 'any';
}

/**
 * Core Avionics Telemetry Controller
 */
export class AvionicsCore {
  constructor() {
    this.state = {
      // Position & Accuracy
      lat: null,
      lon: null,
      accuracyMeters: null,
      altitudeMeters: null,
      altitudeFeet: 0,
      hasRealGpsLock: false,
      isIpEstimate: false,

      // Speed & Velocity (Deadband < 1.8 MPH enforced)
      speedMps: 0,
      speedMph: 0,
      speedKts: 0,
      speedKmh: 0,
      isStopped: true,
      currentSpeedLimitMph: null,
      isOverSpeedLimit: false,
      isNearSpeedLimit: false,

      // Heading & Magnetometer
      heading: null,
      headingSource: 'SEEKING SIGNAL',
      cardinalDirection: '--',
      cardinal16: '--',
      pitch: 0,
      roll: 0,
      yaw: 0,
      screenAngle: 0,
      hasMagnetometerSensor: false,

      // Location & Reverse Geocoding
      roadName: '',
      fullStreetAddress: 'ACQUIRING TELEMETRY...',
      city: '',
      state: '',
      stateCode: '',
      county: '',
      postcode: '',
      country: '',
      latLonString: '--',
      cityStateString: '--',
      countyZipString: '--',

      // Route Shields & AASHTO Corridor
      interstateShield: null,
      routeShield: null,
      secondaryRouteShield: null,
      highwayDirection: '',

      // Atmospheric & Weather
      temperatureF: null,
      temperatureC: null,
      humidityPercent: null,
      pressureHpa: null,
      pressureInHg: null,
      uvIndex: null,
      weatherCode: null,
      weatherText: '--',
      weatherIconSvg: WEATHER_ICONS.cloudSun,
      lastWeatherFetchTime: 0
    };

    // Internal trackers
    this.subscribers = new Set();
    this.eventListeners = new Map();

    this.watchPositionId = null;
    this.ipFallbackTimer = null;
    this.wakeLock = null;
    this.audioCtx = null;
    this.keepAliveOscillator = null;
    this.keepAliveGain = null;

    // Filter & Hysteresis trackers
    this.lastLat = null;
    this.lastLon = null;
    this.lastTimestamp = null;
    this.lastKnownMovingHeading = null;
    this.headingHistory = [];
    this.signedHighwayDirections = {};

    this.stationaryLockActive = false;
    this.stationaryAnchorLat = null;
    this.stationaryAnchorLon = null;
    this.hasInitialGeocode = false;
    this.lastGeocodeTime = 0;
    this.lastGeocodedLat = null;
    this.lastGeocodedLon = null;
    this.lastPositionUpdateLat = null;
    this.lastPositionUpdateLon = null;
    this.travelDistanceOnCurrentRoadMeters = 0;
    this.isHighwayLocked = false;
    this.consecutiveSurfaceReads = 0;
    this.lastValidDisplayTitle = '';
    this.lastValidFullAddress = '';
    this.lastValidInterstate = null;
    this.lastValidRouteShield = null;
    this.pendingCandidateRoad = '';
    this.consecutiveRoadMatches = 0;
    this.lastLoggedRouteSignature = '';

    // Weather caching
    this.weatherTimeIntervalMs = 10 * 60 * 1000; // 10 minutes
    this.weatherDistanceIntervalMiles = 5;
    this.lastWeatherLat = null;
    this.lastWeatherLon = null;

    // Restore cached weather from localStorage
    try {
      const cached = localStorage.getItem('nomad_v4_weather_cache') || localStorage.getItem('nomad_weather_cache');
      if (cached) {
        const d = JSON.parse(cached);
        if (d && d.tempF !== undefined) {
          this.state.temperatureF = d.tempF;
          this.state.temperatureC = Math.round((d.tempF - 32) * 5 / 9);
          this.state.humidityPercent = d.humidity;
          this.state.pressureHpa = d.pressureHpa;
          this.state.pressureInHg = d.pressureHpa ? (d.pressureHpa * 0.02953).toFixed(2) : null;
          this.state.uvIndex = d.uv;
          this.state.weatherCode = d.weatherCode;
          const wInfo = getWeatherInfo(d.weatherCode);
          this.state.weatherText = wInfo.text;
          this.state.weatherIconSvg = wInfo.icon;
          this.state.lastWeatherFetchTime = d.timestamp || 0;
        }
      }
    } catch (_) {}

    this.initOrientationListener();
    this.initVisibilityAndWakeLock();
    this.initAudioPrewarmListeners();
  }

  // Universal Subscription API
  subscribe(fn) {
    this.subscribers.add(fn);
    fn(this.getState());
    return () => this.subscribers.delete(fn);
  }

  on(event, fn) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(fn);
    return () => this.eventListeners.get(event).delete(fn);
  }

  emit(event, payload) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(fn => {
        try { fn(payload); } catch (e) { console.error(`[AvionicsCore Event ${event} error]:`, e); }
      });
    }
  }

  notifySubscribers() {
    const snapshot = this.getState();
    this.subscribers.forEach(fn => {
      try { fn(snapshot); } catch (e) { console.error('[AvionicsCore subscriber error]:', e); }
    });
    this.emit('telemetry', snapshot);
  }

  getState() {
    return Object.freeze({ ...this.state });
  }

  /**
   * System Keep-Alive & Wake Lock
   */
  async requestWakeLock() {
    try {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible' && 'wakeLock' in navigator) {
        if (!this.wakeLock || this.wakeLock.released) {
          this.wakeLock = await navigator.wakeLock.request('screen');
        }
      }
    } catch (err) {}
  }

  initVisibilityAndWakeLock() {
    if (typeof window === 'undefined') return;
    this.requestWakeLock();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.requestWakeLock();
      }
    });
    window.addEventListener('focus', () => this.requestWakeLock());
    setInterval(() => this.requestWakeLock(), 15000);
  }

  /**
   * Web Audio API Hardware Keep-Alive & Avionics Sound Generator
   */
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (AudioCtor) {
        this.audioCtx = new AudioCtor();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    if (this.audioCtx) {
      this.startAudioKeepAlive(this.audioCtx);
    }
    return this.audioCtx;
  }

  startAudioKeepAlive(ctx) {
    try {
      if (!ctx || this.keepAliveOscillator) return;
      // Ultra-low sub-audible carrier (12 Hz at 0.00002 gain) keeping hardware A2DP link alive
      this.keepAliveOscillator = ctx.createOscillator();
      this.keepAliveGain = ctx.createGain();
      this.keepAliveOscillator.type = 'sine';
      this.keepAliveOscillator.frequency.setValueAtTime(12, ctx.currentTime);
      this.keepAliveGain.gain.setValueAtTime(0.00002, ctx.currentTime);
      this.keepAliveOscillator.connect(this.keepAliveGain);
      this.keepAliveGain.connect(ctx.destination);
      this.keepAliveOscillator.start();
    } catch (e) {}
  }

  initAudioPrewarmListeners() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      try {
        const ctx = this.getAudioContext();
        if (ctx) {
          const buffer = ctx.createBuffer(1, 1, 22050);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(0);
        }
      } catch (e) {}
    };
    ['touchstart', 'touchend', 'mousedown', 'keydown', 'pointerdown'].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  playBeep(freq = 880, dur = 0.05) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    } catch (e) {}
  }

  playArcadeSound(isActivation = true) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = isActivation 
        ? [[659.25, 0.045], [880.00, 0.045], [1046.50, 0.045], [1318.51, 0.060]]
        : [[1318.51, 0.045], [987.77, 0.045], [783.99, 0.060]];
      let offset = 0;
      notes.forEach(([freq, dur]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + offset);
        gain.gain.setValueAtTime(0.12, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + dur);
        offset += dur * 0.9;
      });
    } catch (e) {}
  }

  playDixieHorn() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dixieNotes = [
        [392.00, 0.16], [329.63, 0.16], [261.63, 0.22], [261.63, 0.12], 
        [261.63, 0.16], [293.66, 0.16], [329.63, 0.16], [349.23, 0.16], 
        [392.00, 0.24], [392.00, 0.24], [392.00, 0.24], [329.63, 0.45]
      ];
      let offset = 0;
      dixieNotes.forEach(([freq, dur]) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(freq, now + offset);
        osc2.frequency.setValueAtTime(freq * 1.004, now + offset);
        gain.gain.setValueAtTime(0.20, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now + offset);
        osc2.start(now + offset);
        osc1.stop(now + offset + dur);
        osc2.stop(now + offset + dur);
        offset += dur * 0.95;
      });
    } catch (e) {}
  }

  playGalagaLaser() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const salvos = [[0.00, 0.09], [0.32, 0.41], [0.64, 0.73]];
      salvos.forEach(([t1, t2]) => {
        [t1, t2].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(1750, now + delay);
          osc.frequency.exponentialRampToValueAtTime(120, now + delay + 0.075);
          gain.gain.setValueAtTime(0.22, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.075);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.075);
        });
      });
    } catch (e) {}
  }

  /**
   * AASHTO Direction with ±15° Directional Hysteresis
   */
  getHighwayDirection(routeNumber, heading, highwayType = '') {
    if (heading === null || isNaN(heading)) return '';
    const cleanNum = String(routeNumber).toUpperCase().trim();
    const norm = (heading % 360 + 360) % 360;
    const prevDirection = this.signedHighwayDirections[cleanNum] || null;
    const axis = getHighwayCorridorAxis(routeNumber, highwayType);

    let newDirection = '';

    if (axis === 'north-south') {
      // ±15° hysteresis deadband around 90° and 270°
      if (prevDirection === 'North') {
        if (norm > 105 && norm < 255) newDirection = 'South';
        else newDirection = 'North';
      } else if (prevDirection === 'South') {
        if (norm < 75 || norm > 285) newDirection = 'North';
        else newDirection = 'South';
      } else {
        newDirection = (norm >= 90 && norm <= 270) ? 'South' : 'North';
      }
    } else if (axis === 'east-west') {
      // ±15° hysteresis deadband around 0° and 180°
      if (prevDirection === 'East') {
        if (norm > 195 && norm < 345) newDirection = 'West';
        else newDirection = 'East';
      } else if (prevDirection === 'West') {
        if (norm > 15 && norm < 165) newDirection = 'East';
        else newDirection = 'West';
      } else {
        newDirection = (norm >= 0 && norm < 180) ? 'East' : 'West';
      }
    } else {
      // 4-quadrant cardinal fallback with ±12° hysteresis
      if (prevDirection === 'North') {
        if (norm >= 57 && norm <= 135) newDirection = 'East';
        else if (norm > 135 && norm <= 225) newDirection = 'South';
        else if (norm > 225 && norm <= 303) newDirection = 'West';
        else newDirection = 'North';
      } else if (prevDirection === 'East') {
        if (norm <= 33 || norm >= 315) newDirection = 'North';
        else if (norm >= 147 && norm <= 225) newDirection = 'South';
        else if (norm > 225 && norm < 315) newDirection = 'West';
        else newDirection = 'East';
      } else if (prevDirection === 'South') {
        if (norm >= 45 && norm <= 123) newDirection = 'East';
        else if (norm < 45 || norm >= 315) newDirection = 'North';
        else if (norm >= 237 && norm <= 315) newDirection = 'West';
        else newDirection = 'South';
      } else if (prevDirection === 'West') {
        if (norm <= 45 || norm >= 327) newDirection = 'North';
        else if (norm >= 135 && norm <= 213) newDirection = 'South';
        else if (norm > 45 && norm < 135) newDirection = 'East';
        else newDirection = 'West';
      } else {
        if (norm >= 315 || norm < 45) newDirection = 'North';
        else if (norm >= 45 && norm < 135) newDirection = 'East';
        else if (norm >= 135 && norm < 225) newDirection = 'South';
        else newDirection = 'West';
      }
    }

    this.signedHighwayDirections[cleanNum] = newDirection;
    return newDirection;
  }

  /**
   * 3D Tilt-Compensated Magnetometer & Sensor Fusion
   */
  initOrientationListener() {
    if (typeof window === 'undefined') return;
    const handleOrientation = (event) => {
      if (!event) return;
      let trueMagHeading = null;

      if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
        trueMagHeading = (Number(event.webkitCompassHeading) % 360 + 360) % 360;
      } else if (event.alpha !== null && !isNaN(event.alpha)) {
        if (typeof event.beta === 'number' && typeof event.gamma === 'number' && (Math.abs(event.beta) > 6 || Math.abs(event.gamma) > 6)) {
          const degToRad = Math.PI / 180;
          const _x = event.beta * degToRad; // pitch
          const _y = event.gamma * degToRad; // roll
          const _z = event.alpha * degToRad; // yaw
          const cX = Math.cos(_x), cY = Math.cos(_y), cZ = Math.cos(_z);
          const sX = Math.sin(_x), sY = Math.sin(_y), sZ = Math.sin(_z);
          const Vx = -cZ * sY - sZ * sX * cY;
          const Vy = -sZ * sY + cZ * sX * cY;
          let comp = Math.atan2(Vx, Vy) * (180 / Math.PI);
          if (comp < 0) comp += 360;
          const screenAngle = (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number')
            ? window.screen.orientation.angle
            : (window.orientation || 0);
          trueMagHeading = (comp + screenAngle + 360) % 360;
        } else {
          const screenAngle = (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number')
            ? window.screen.orientation.angle
            : (window.orientation || 0);
          trueMagHeading = ((360 - event.alpha) + screenAngle + 360) % 360;
        }
      }

      this.state.pitch = event.beta || 0;
      this.state.roll = event.gamma || 0;
      this.state.yaw = event.alpha || 0;

      if (trueMagHeading !== null && !isNaN(trueMagHeading)) {
        this.state.hasMagnetometerSensor = true;
        // Sensor Fusion: Only use magnetometer when stopped or moving very slow (< 2.5 MPH)
        if (this.state.speedMph <= 2.5) {
          this.state.heading = trueMagHeading;
          this.state.headingSource = '3D MAGNETOMETER';
          this.state.cardinalDirection = getCardinalDirection(trueMagHeading);
          this.state.cardinal16 = getCardinal16Direction(trueMagHeading);
          this.notifySubscribers();
          this.emit('heading', { heading: trueMagHeading, source: '3D MAGNETOMETER' });
        }
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, { passive: true });
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }
  }

  requestOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      return DeviceOrientationEvent.requestPermission()
        .then(res => {
          if (res === 'granted') {
            this.state.hasMagnetometerSensor = true;
            this.notifySubscribers();
          }
          return res;
        });
    }
    return Promise.resolve('granted');
  }

  /**
   * Fast IP Fallback Provider (1500ms parallel lock)
   */
  async fetchIpLocationFallback() {
    if (this.state.hasRealGpsLock || (this.lastLat !== null && this.lastLon !== null)) return;
    try {
      const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        const lat = parseFloat(data.latitude);
        const lon = parseFloat(data.longitude);
        if (!isNaN(lat) && !isNaN(lon) && !this.state.hasRealGpsLock) {
          this.handlePositionUpdate({
            coords: {
              latitude: lat,
              longitude: lon,
              heading: null,
              speed: 0,
              altitude: 0,
              accuracy: 5000
            }
          }, true);
        }
      }
    } catch (e) {}
  }

  /**
   * Multi-Stage GNSS Watcher with Graceful Degradation
   */
  startTracking() {
    if (typeof window === 'undefined') return;

    if (this.ipFallbackTimer) clearTimeout(this.ipFallbackTimer);
    this.ipFallbackTimer = setTimeout(() => {
      if (this.lastLat === null) {
        this.fetchIpLocationFallback();
      }
    }, 1500);

    if (!("geolocation" in navigator)) {
      this.state.fullStreetAddress = "GPS UNAVAILABLE";
      this.fetchIpLocationFallback();
      this.notifySubscribers();
      return;
    }

    // 1. Instant single-shot fix
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (this.ipFallbackTimer) clearTimeout(this.ipFallbackTimer);
        this.handlePositionUpdate(pos, false);
      },
      (err) => {
        this.fetchIpLocationFallback();
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
    );

    // 2. Real-time watchPosition with progressive fallback
    try {
      this.watchPositionId = navigator.geolocation.watchPosition(
        (pos) => {
          if (this.ipFallbackTimer) clearTimeout(this.ipFallbackTimer);
          this.handlePositionUpdate(pos, false);
        },
        (error) => {
          console.warn("AvionicsCore GPS Notice:", error.message);
          // Graceful fallback from high accuracy to standard accuracy if timed out
          if (error.code === 2 || error.code === 3) {
            if (this.watchPositionId !== null) {
              navigator.geolocation.clearWatch(this.watchPositionId);
            }
            this.watchPositionId = navigator.geolocation.watchPosition(
              (lowPos) => {
                if (this.ipFallbackTimer) clearTimeout(this.ipFallbackTimer);
                this.handlePositionUpdate(lowPos, false);
              },
              (lowAccError) => {
                console.warn("AvionicsCore Standard GPS Notice:", lowAccError.message);
                if (this.lastLat === null) this.fetchIpLocationFallback();
              },
              { enableHighAccuracy: false, maximumAge: 5000, timeout: 20000 }
            );
          } else if (error.code === 1) { // PERMISSION_DENIED
            if (this.lastLat === null) this.fetchIpLocationFallback();
          }
        },
        { enableHighAccuracy: true, maximumAge: 1500, timeout: 10000 }
      );
    } catch (e) {
      this.fetchIpLocationFallback();
    }
  }

  stopTracking() {
    if (this.watchPositionId !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchPositionId);
      this.watchPositionId = null;
    }
    if (this.ipFallbackTimer) {
      clearTimeout(this.ipFallbackTimer);
      this.ipFallbackTimer = null;
    }
  }

  /**
   * Primary Telemetry Ingestion with Stationary Noise Filter (< 1.8 MPH Deadband)
   */
  handlePositionUpdate(position, isIp = false) {
    if (!position || !position.coords) return;
    const { latitude, longitude, heading, speed, altitude, accuracy } = position.coords;

    // Real GPS lock guard: coarse IP never overwrites real satellite fix
    if (this.state.hasRealGpsLock && isIp) return;

    const wasIpEstimate = !this.state.hasRealGpsLock;
    if (!isIp) {
      this.state.hasRealGpsLock = true;
      this.state.isIpEstimate = false;
    } else {
      this.state.isIpEstimate = true;
    }

    this.state.lat = latitude;
    this.state.lon = longitude;
    this.state.latLonString = `Lat: ${latitude.toFixed(5)} | Lon: ${longitude.toFixed(5)}`;
    this.state.accuracyMeters = accuracy !== undefined ? accuracy : null;
    this.state.altitudeMeters = altitude !== undefined ? altitude : null;
    this.state.altitudeFeet = altitude ? Math.round(altitude * 3.28084) : 0;

    const positionJumped = (this.lastLat !== null && this.lastLon !== null) && 
      (getDistanceFromLatLonInMeters(this.lastLat, this.lastLon, latitude, longitude) > 35);

    this.lastLat = latitude;
    this.lastLon = longitude;

    // Stationary Noise Filter & Zero-Clamp Deadband (< 1.8 MPH = 0.804 m/s)
    let filteredSpeedMps = speed;
    if (filteredSpeedMps !== null && !isNaN(filteredSpeedMps)) {
      const rawMph = filteredSpeedMps * 2.23694;
      if (rawMph < 1.8) {
        filteredSpeedMps = 0;
      } else if (this.state.accuracyMeters && this.state.accuracyMeters > 20 && rawMph < 2.5) {
        filteredSpeedMps = 0;
      }
    } else {
      filteredSpeedMps = 0;
    }

    this.state.speedMps = filteredSpeedMps;
    this.state.speedMph = Math.round(filteredSpeedMps * 2.23694 * 10) / 10;
    this.state.speedKmh = Math.round(filteredSpeedMps * 3.6 * 10) / 10;
    this.state.speedKts = Math.round(filteredSpeedMps * 1.94384 * 10) / 10;
    this.state.isStopped = this.state.speedMph === 0;

    // Speed limit alerting
    if (this.state.currentSpeedLimitMph && this.state.currentSpeedLimitMph > 0 && this.state.speedMph >= 15) {
      this.state.isOverSpeedLimit = this.state.speedMph > (this.state.currentSpeedLimitMph + 3);
      this.state.isNearSpeedLimit = !this.state.isOverSpeedLimit && this.state.speedMph >= (this.state.currentSpeedLimitMph - 3);
    } else {
      this.state.isOverSpeedLimit = false;
      this.state.isNearSpeedLimit = false;
    }

    // Ground track heading when in motion
    if (heading !== null && !isNaN(heading) && this.state.speedMph > 2.5) {
      this.state.heading = heading;
      this.state.headingSource = 'GNSS COURSE';
      this.state.cardinalDirection = getCardinalDirection(heading);
      this.state.cardinal16 = getCardinal16Direction(heading);
      this.lastKnownMovingHeading = heading;
    } else if (this.state.heading === null) {
      this.state.headingSource = isIp ? 'IP ESTIMATE' : 'SEEKING SIGNAL';
    }

    // Force geocode if transitioning from IP to Satellite or teleported
    const forceGeocode = (wasIpEstimate && !isIp) || positionJumped;
    if (forceGeocode) {
      this.stationaryLockActive = false;
      this.stationaryAnchorLat = null;
      this.stationaryAnchorLon = null;
      this.lastGeocodeTime = 0;
    }

    this.notifySubscribers();
    this.fetchLocationDetails(latitude, longitude, filteredSpeedMps, forceGeocode);
    this.fetchWeatherAndElevation(latitude, longitude);
  }

  /**
   * Universal Road Signage Parser (All 50 States & Dual Concurrent Routes)
   */
  parseUniversalRoadSignage(data) {
    const addr = data.address || {};
    const extra = data.extratags || {};
    const namedetails = data.namedetails || {};

    let interstate = null;
    let usRoute = null;
    let stateRoute = null;
    let secondaryRoute = null;

    const rawRef = extra.ref || extra.official_ref || addr.ref || namedetails.ref || "";
    const rawRoad = addr.road || addr.motorway || addr.trunk || addr.highway || "";
    const rawName = data.name || addr.name || addr.official_name || "";
    const highwayType = addr.highway || extra.highway || "";
    
    const tokens = `${rawRef};${rawRoad};${rawName}`.split(/[;,/|]+/).map(t => t.trim()).filter(Boolean);

    tokens.forEach(token => {
      const iMatch = token.match(/\b(?:I[- ]?|Interstate\s+|IS[- ]?)(\d{1,3})\b/i);
      if (iMatch && !interstate) {
        const num = iMatch[1];
        if (isValidHighwayRouteNumber(num)) interstate = num;
      }

      const usMatch = token.match(/\b(?:US[- ]?|U\.S\.\s*Route\s*|US\s*Route\s*|US\s*Hwy\s*)(\d{1,3}[A-Z]?)\b/i);
      if (usMatch && !usRoute) {
        const num = usMatch[1];
        if (isValidHighwayRouteNumber(num)) usRoute = num;
      }

      const rMatch = token.match(/\b(?:[A-Z]{2}[- ]|Route\s?|Rt\.?\s?|State\s?Hwy\s?|State\s?Route\s?|SR[- ]?)(\d{1,3}[A-Z]?)\b/i);
      if (rMatch) {
        const num = rMatch[1];
        if (isValidHighwayRouteNumber(num) && num !== interstate && num !== usRoute) {
          if (!stateRoute) stateRoute = num;
          else if (!secondaryRoute && num !== stateRoute) secondaryRoute = num;
        }
      }

      const suffixMatch = token.match(/\b(\d{1,3}[A-Z]?)\b/i);
      if (suffixMatch) {
        const cand = suffixMatch[1];
        if (isValidHighwayRouteNumber(cand) && cand !== interstate && cand !== usRoute) {
          if (!stateRoute) stateRoute = cand;
          else if (!secondaryRoute && cand !== stateRoute) secondaryRoute = cand;
        }
      }

      if (isValidHighwayRouteNumber(token) && rawRef.includes(token) && token !== interstate && token !== usRoute) {
        if (!stateRoute) stateRoute = token;
        else if (!secondaryRoute && token !== stateRoute) secondaryRoute = token;
      }
    });

    const isLink = /_link$/i.test(highwayType);
    const isMotorway = /motorway|trunk/i.test(highwayType) || interstate !== null;

    let maxSpeedMph = null;
    const rawMaxSpeed = extra.maxspeed || "";
    if (rawMaxSpeed) {
      if (/mph/i.test(rawMaxSpeed)) {
        maxSpeedMph = parseInt(rawMaxSpeed.replace(/\D/g, ''), 10);
      } else if (/km\/h|kmh/i.test(rawMaxSpeed)) {
        const kmh = parseInt(rawMaxSpeed.replace(/\D/g, ''), 10);
        if (!isNaN(kmh)) maxSpeedMph = Math.round(kmh * 0.621371);
      } else {
        const num = parseInt(rawMaxSpeed, 10);
        if (!isNaN(num)) maxSpeedMph = num;
      }
    }

    if (!maxSpeedMph || isNaN(maxSpeedMph)) {
      if (interstate !== null || isMotorway) {
        maxSpeedMph = 65;
      } else if (usRoute !== null) {
        maxSpeedMph = 55;
      } else if (stateRoute !== null) {
        maxSpeedMph = 50;
      } else if (/primary|secondary/i.test(highwayType)) {
        maxSpeedMph = 40;
      } else if (/tertiary|residential/i.test(highwayType)) {
        maxSpeedMph = 30;
      }
    }

    return { interstate, usRoute, stateRoute, secondaryRoute, rawRoad, rawRef, highwayType, isLink, isMotorway, maxSpeedMph };
  }

  /**
   * Photon Geocoder Secondary Fallback
   */
  async fetchSecondaryReverseGeocode(lat, lon) {
    try {
      const url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const json = await res.json();
      if (json && json.features && json.features.length > 0) {
        const p = json.features[0].properties;
        return {
          street: p.street || p.name || "",
          city: p.city || p.locality || p.district || p.town || "",
          state: p.state || "",
          postcode: p.postcode || "",
          country: p.country || ""
        };
      }
    } catch (e) {
      console.warn("AvionicsCore Secondary Geocode Notice:", e);
    }
    return null;
  }

  /**
   * Throttled Reverse Geocoding with Stationary Lock Engine (< 2.8 MPH)
   */
  async fetchLocationDetails(lat, lon, speed, forceImmediate = false) {
    const now = Date.now();
    const speedMph = (speed !== null && !isNaN(speed)) ? (speed * 2.23694) : 0;

    if (this.lastPositionUpdateLat !== null && this.lastPositionUpdateLon !== null) {
      const stepDist = getDistanceFromLatLonInMeters(this.lastPositionUpdateLat, this.lastPositionUpdateLon, lat, lon);
      this.travelDistanceOnCurrentRoadMeters += stepDist;
    }
    this.lastPositionUpdateLat = lat;
    this.lastPositionUpdateLon = lon;

    // Stationary Lock Engine (eliminates stoplight drift & intersection hopping)
    if (speedMph < 2.8 && !forceImmediate && this.hasInitialGeocode) {
      if (!this.stationaryLockActive) {
        this.stationaryLockActive = true;
        this.stationaryAnchorLat = lat;
        this.stationaryAnchorLon = lon;
      } else if (this.stationaryAnchorLat !== null && this.stationaryAnchorLon !== null) {
        const driftDist = getDistanceFromLatLonInMeters(this.stationaryAnchorLat, this.stationaryAnchorLon, lat, lon);
        if (driftDist < 25) return;
      }
    } else if (speedMph >= 2.8) {
      this.stationaryLockActive = false;
      this.stationaryAnchorLat = null;
      this.stationaryAnchorLon = null;
    }

    if (this.hasInitialGeocode && !forceImmediate) {
      if (now - this.lastGeocodeTime < 3500) return;
      if (this.lastGeocodedLat !== null && this.lastGeocodedLon !== null) {
        const distanceMoved = getDistanceFromLatLonInMeters(this.lastGeocodedLat, this.lastGeocodedLon, lat, lon);
        if (distanceMoved < 15) return;
      }
    }

    this.lastGeocodeTime = now;
    const targetZoom = 18;

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=${targetZoom}&addressdetails=1&extratags=1&namedetails=1`;
      let response = null;
      let data = null;

      try {
        response = await fetch(url, {
          headers: { "User-Agent": "NomadUnifiedCockpitSuite/1.0" }
        });
        if (response.ok) {
          data = await response.json();
        }
      } catch (netErr) {
        console.warn("AvionicsCore Nominatim Error:", netErr);
      }

      let secondaryFallback = null;
      if (!data || !data.address || !data.address.road) {
        secondaryFallback = await this.fetchSecondaryReverseGeocode(lat, lon);
      }

      if ((data && data.address) || secondaryFallback) {
        this.lastGeocodedLat = lat;
        this.lastGeocodedLon = lon;
        this.hasInitialGeocode = true;

        const addr = data ? data.address : {};
        const { interstate, usRoute, stateRoute, secondaryRoute, rawRoad: parsedRoad, isLink, isMotorway, maxSpeedMph } = data ? this.parseUniversalRoadSignage(data) : { interstate: null, usRoute: null, stateRoute: null, secondaryRoute: null, rawRoad: secondaryFallback?.street || "", isLink: false, isMotorway: false, maxSpeedMph: null };
        const rawRoad = parsedRoad || addr.road || addr.residential || addr.pedestrian || addr.footway || secondaryFallback?.street || "";

        if (maxSpeedMph && !isNaN(maxSpeedMph)) {
          this.state.currentSpeedLimitMph = maxSpeedMph;
        }

        const isTrueHighway = isMotorway || interstate !== null;

        if (isTrueHighway && !isLink) {
          this.isHighwayLocked = true;
          this.consecutiveSurfaceReads = 0;
        } else if (this.isHighwayLocked) {
          const isExiting = isLink || speedMph < 35;
          const isUnnamedOrLocal = !rawRoad || /^Unnamed/i.test(rawRoad) || !isTrueHighway;

          if (isExiting || isUnnamedOrLocal) {
            this.consecutiveSurfaceReads++;
            if (this.consecutiveSurfaceReads >= 2) {
              this.isHighwayLocked = false;
              this.lastValidDisplayTitle = "";
              this.lastValidFullAddress = "";
              this.lastValidInterstate = null;
              this.lastValidRouteShield = null;
            }
          } else {
            this.consecutiveSurfaceReads = 0;
          }
        }

        let candidateRoadName = rawRoad;
        const hd = this.state.heading;

        if (this.isHighwayLocked) {
          if (interstate) {
            candidateRoadName = `I-${interstate}`;
            const dir = this.getHighwayDirection(interstate, hd, 'interstate');
            if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
          } else if (usRoute) {
            candidateRoadName = `US-${usRoute}`;
            const dir = this.getHighwayDirection(usRoute, hd, 'us');
            if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
          } else if (stateRoute && isValidHighwayRouteNumber(stateRoute)) {
            candidateRoadName = formatRouteName(stateRoute);
            const dir = this.getHighwayDirection(stateRoute, hd, 'state');
            if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
          } else {
            if (this.lastValidInterstate && (/Yankee Division/i.test(rawRoad) || !rawRoad)) {
              candidateRoadName = `I-${this.lastValidInterstate}`;
              const dir = this.getHighwayDirection(this.lastValidInterstate, hd, 'interstate');
              if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
            } else {
              candidateRoadName = rawRoad || this.lastValidDisplayTitle || "Highway";
            }
          }
        } else if (rawRoad && !/^\d{1,3}[A-Z]?$/i.test(rawRoad.trim()) && !/^Route\s*\d+/i.test(rawRoad) && !/^Unnamed/i.test(rawRoad) && !/Yankee Division/i.test(rawRoad)) {
          candidateRoadName = rawRoad;
          const isExpressway = /\b(Turnpike|Tpk|Expressway|Parkway|Pkwy|Hwy|Highway)\b/i.test(candidateRoadName);
          if (isExpressway && hd !== null && !isNaN(hd)) {
            candidateRoadName = `${candidateRoadName} ${getCardinalRoadDirection(hd)}`;
          }
        } else if (stateRoute && isValidHighwayRouteNumber(stateRoute)) {
          candidateRoadName = formatRouteName(stateRoute);
          const dir = this.getHighwayDirection(stateRoute, hd, 'state');
          if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
        } else if (usRoute) {
          candidateRoadName = `US-${usRoute}`;
          const dir = this.getHighwayDirection(usRoute, hd, 'us');
          if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
        } else if (/^\d{1,3}[A-Z]?$/i.test(rawRoad.trim())) {
          candidateRoadName = formatRouteName(rawRoad.trim());
          const dir = this.getHighwayDirection(rawRoad.trim(), hd, 'state');
          if (dir) candidateRoadName = `${candidateRoadName} ${dir}`;
        } else {
          candidateRoadName = rawRoad || (secondaryFallback ? secondaryFallback.street : "Unnamed Road");
          const isExpressway = /\b(Turnpike|Tpk|Expressway|Parkway|Pkwy|Hwy|Highway)\b/i.test(candidateRoadName);
          if (isExpressway && hd !== null && !isNaN(hd)) {
            candidateRoadName = `${candidateRoadName} ${getCardinalRoadDirection(hd)}`;
          }
        }

        // Trajectory gate
        if (this.lastValidDisplayTitle && candidateRoadName !== this.lastValidDisplayTitle && speedMph > 3) {
          let headingDelta = 0;
          if (this.lastKnownMovingHeading !== null && hd !== null) {
            headingDelta = Math.abs(hd - this.lastKnownMovingHeading);
            if (headingDelta > 180) headingDelta = 360 - headingDelta;
          }
          if (headingDelta < 20 && this.travelDistanceOnCurrentRoadMeters < 45) {
            if (this.pendingCandidateRoad === candidateRoadName) {
              this.consecutiveRoadMatches++;
            } else {
              this.pendingCandidateRoad = candidateRoadName;
              this.consecutiveRoadMatches = 1;
            }
            if (this.consecutiveRoadMatches < 2) {
              candidateRoadName = this.lastValidDisplayTitle;
            } else {
              this.travelDistanceOnCurrentRoadMeters = 0;
            }
          } else {
            this.travelDistanceOnCurrentRoadMeters = 0;
          }
        }

        const isUnnamed = !candidateRoadName || /^Unnamed/i.test(candidateRoadName);
        if (isUnnamed && speedMph > 12 && this.lastValidDisplayTitle) {
          candidateRoadName = this.lastValidDisplayTitle;
        } else if (!isUnnamed) {
          this.lastValidDisplayTitle = candidateRoadName;
        }

        const currentInterstate = this.isHighwayLocked ? (interstate || this.lastValidInterstate) : interstate;
        const currentRoute = usRoute || (stateRoute && isValidHighwayRouteNumber(stateRoute) ? stateRoute : null);
        const currentSecondaryRoute = (secondaryRoute && isValidHighwayRouteNumber(secondaryRoute)) ? secondaryRoute : null;

        if (currentInterstate) this.lastValidInterstate = currentInterstate;
        if (currentRoute) this.lastValidRouteShield = currentRoute;

        this.state.interstateShield = currentInterstate;
        this.state.routeShield = currentRoute;
        this.state.secondaryRouteShield = currentSecondaryRoute;
        this.state.highwayDirection = currentInterstate ? this.getHighwayDirection(currentInterstate, hd, 'interstate') : (currentRoute ? this.getHighwayDirection(currentRoute, hd, 'state') : '');

        let fullStreetAddress = '';
        const isNumbered = this.isHighwayLocked ||
          Boolean(currentInterstate) ||
          Boolean(currentRoute) ||
          Boolean(stateRoute) ||
          Boolean(usRoute) ||
          /^(?:Route|Rt\.?|US[- ]|I[- ]|SR[- ]|State\s*Route|Highway|Hwy)\b/i.test(candidateRoadName) ||
          /^\d{1,3}[A-Z]?$/i.test(candidateRoadName.trim()) ||
          /^\d{1,3}[A-Z]?$/i.test(rawRoad.trim());

        if (isNumbered) {
          fullStreetAddress = candidateRoadName;
        } else {
          const cleanHouseNum = addr.house_number ? addr.house_number.split(';')[0].trim() : '';
          const housePrefix = cleanHouseNum ? `${cleanHouseNum} ` : '';
          fullStreetAddress = abbreviateStreetName(`${housePrefix}${candidateRoadName}`);
        }

        if (isUnnamed && speedMph > 12 && this.lastValidFullAddress) {
          fullStreetAddress = this.lastValidFullAddress;
        } else if (!isUnnamed) {
          this.lastValidFullAddress = fullStreetAddress;
        }

        const city = addr.city || addr.town || addr.village || addr.municipality || secondaryFallback?.city || "";
        const stateFull = addr.state || secondaryFallback?.state || "";
        const county = addr.county || "";
        const postcode = addr.postcode || secondaryFallback?.postcode || "";
        const stateCode = STATE_ABBREVIATIONS[stateFull] || stateFull;

        this.state.roadName = candidateRoadName;
        this.state.fullStreetAddress = fullStreetAddress;
        this.state.city = city;
        this.state.state = stateFull;
        this.state.stateCode = stateCode;
        this.state.county = county;
        this.state.postcode = postcode;
        this.state.country = addr.country || secondaryFallback?.country || "";

        const cityStateText = `${city}${city && stateCode ? ', ' : ''}${stateCode}`.trim();
        const countyZipText = `${county} ${postcode}`.trim();
        this.state.cityStateString = cityStateText || "--";
        this.state.countyZipString = countyZipText || "--";

        // Black box recorder
        if (currentInterstate || currentRoute) {
          const routeSig = `${currentInterstate || ''}_${currentRoute || ''}_${candidateRoadName}`;
          if (routeSig !== this.lastLoggedRouteSignature) {
            this.lastLoggedRouteSignature = routeSig;
            this.recordBlackBoxEntry({
              timestamp: new Date().toISOString(),
              lat: Number(lat.toFixed(5)),
              lon: Number(lon.toFixed(5)),
              roadName: fullStreetAddress,
              interstateShield: currentInterstate || null,
              routeShield: currentRoute || null,
              speedMph: this.state.speedMph,
              heading: `${Math.round(hd || 0)}° ${getCardinalDirection(hd)}`
            });
          }
        }

        this.notifySubscribers();
        this.emit('location', this.state);
      }
    } catch (err) {
      console.warn("AvionicsCore Geocoding Error:", err);
    }
  }

  recordBlackBoxEntry(entry) {
    try {
      const raw = localStorage.getItem('nomad_blackbox_log');
      let logs = raw ? JSON.parse(raw) : [];
      logs.push(entry);
      if (logs.length > 100) logs = logs.slice(logs.length - 100);
      localStorage.setItem('nomad_blackbox_log', JSON.stringify(logs));
    } catch (err) {}
  }

  /**
   * Atmospheric & Weather Engine (Open-Meteo with /api/weather Proxy)
   */
  async fetchWeatherAndElevation(lat, lon, force = false) {
    const now = Date.now();
    let shouldFetch = force;

    if (!shouldFetch) {
      if (this.state.lastWeatherFetchTime === 0 || this.state.humidityPercent === null || this.state.pressureHpa === null || this.state.temperatureF === null) {
        shouldFetch = true;
      } else {
        const timePassed = now - this.state.lastWeatherFetchTime;
        if (timePassed >= this.weatherTimeIntervalMs) shouldFetch = true;
        if (!shouldFetch && this.lastWeatherLat !== null && this.lastWeatherLon !== null) {
          const metersMoved = getDistanceFromLatLonInMeters(this.lastWeatherLat, this.lastWeatherLon, lat, lon);
          const milesMoved = metersMoved * 0.000621371;
          if (milesMoved >= this.weatherDistanceIntervalMiles) shouldFetch = true;
        }
      }
    }

    if (!shouldFetch) return;

    try {
      let data = null;

      // Priority 1: Same-origin backend proxy
      try {
        const serverRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (serverRes.ok) {
          data = await serverRes.json();
        }
      } catch (e) {}

      // Priority 2: Direct Open-Meteo API fallback
      if (!data || !data.current) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,uv_index,surface_pressure,pressure_msl&temperature_unit=fahrenheit&timezone=auto`;
        const res = await fetch(url);
        if (res.ok) {
          data = await res.json();
        }
      }

      if (!data || !data.current) {
        this.state.lastWeatherFetchTime = 0;
        return;
      }

      this.state.lastWeatherFetchTime = now;
      this.lastWeatherLat = lat;
      this.lastWeatherLon = lon;

      if (data.elevation !== undefined && (this.state.altitudeMeters === null || isNaN(this.state.altitudeMeters))) {
        this.state.altitudeMeters = data.elevation;
        this.state.altitudeFeet = Math.round(data.elevation * 3.28084);
      }

      this.state.temperatureF = Math.round(data.current.temperature_2m * 10) / 10;
      this.state.temperatureC = Math.round((data.current.temperature_2m - 32) * 5 / 9 * 10) / 10;

      const press = data.current.pressure_msl !== undefined ? data.current.pressure_msl : data.current.surface_pressure;
      if (press !== undefined && press !== null) {
        this.state.pressureHpa = Math.round(press * 10) / 10;
        this.state.pressureInHg = (press * 0.02953).toFixed(2);
      }

      this.state.humidityPercent = data.current.relative_humidity_2m !== undefined ? Math.round(data.current.relative_humidity_2m) : null;
      this.state.uvIndex = data.current.uv_index !== undefined ? data.current.uv_index : null;
      this.state.weatherCode = data.current.weather_code;

      const wInfo = getWeatherInfo(data.current.weather_code);
      this.state.weatherText = wInfo.text;
      this.state.weatherIconSvg = wInfo.icon;

      // Persist in localStorage
      try {
        localStorage.setItem('nomad_weather_cache', JSON.stringify({
          tempF: this.state.temperatureF,
          humidity: this.state.humidityPercent,
          uv: this.state.uvIndex,
          pressureHpa: this.state.pressureHpa,
          weatherCode: data.current.weather_code,
          timestamp: now,
          lat,
          lon
        }));
      } catch (_) {}

      this.notifySubscribers();
      this.emit('weather', this.state);
    } catch (err) {
      console.warn("AvionicsCore Weather Error:", err);
    }
  }
}

// Singleton Instance
export const avionics = new AvionicsCore();

// Export to global window scope for non-module script tags
if (typeof window !== 'undefined') {
  window.NomadAvionics = avionics;
  window.AvionicsCore = AvionicsCore;
}

export default avionics;
