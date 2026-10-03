/**
 * ====================================================================
 * NOMAD Unified Cockpit Suite Server
 * 
 * Proprietary & Created by BostonyFX
 * Instagram: https://instagram.com/neurocosm
 * All rights reserved.
 * ====================================================================
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'NOMAD: Unified Cockpit Suite' });
});

// In-memory geocode cache (1 hour TTL)
const geocodeCache = new Map();

// Reverse Geocoding Proxy Endpoint
// Proxies Nominatim and Photon requests to bypass browser CORS, rate limits, and User-Agent restrictions
app.get('/api/geocode', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const cacheKey = `${lat.toFixed(4)}_${lon.toFixed(4)}`;
    const cached = geocodeCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < 3600000)) {
      return res.json(cached.data);
    }

    let result = null;

    // 1. Primary: Nominatim with custom User-Agent
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&extratags=1&namedetails=1`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const resp = await fetch(url, {
        headers: {
          'User-Agent': 'NomadUnifiedCockpitSuite/1.0 (neurocosm@gmail.com)',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const d = await resp.json();
        if (d && d.address) {
          result = {
            provider: 'nominatim',
            address: d.address,
            name: d.name || d.display_name || '',
            extratags: d.extratags || {},
            namedetails: d.namedetails || {}
          };
        }
      }
    } catch (err) {
      console.warn('Server Nominatim error:', err.message);
    }

    // 2. Secondary fallback: Photon (Komoot)
    if (!result) {
      try {
        const pUrl = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);
        const resp = await fetch(pUrl, {
          headers: {
            'User-Agent': 'NomadUnifiedCockpitSuite/1.0 (neurocosm@gmail.com)',
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const json = await resp.json();
          if (json && json.features && json.features.length > 0) {
            const p = json.features[0].properties;
            result = {
              provider: 'photon',
              address: {
                road: p.street || p.name || '',
                house_number: p.housenumber || '',
                city: p.city || p.locality || p.district || p.town || '',
                county: p.county || '',
                state: p.state || '',
                postcode: p.postcode || '',
                country: p.country || ''
              },
              name: p.name || p.street || '',
              extratags: {},
              namedetails: {}
            };
          }
        }
      } catch (err) {
        console.warn('Server Photon fallback error:', err.message);
      }
    }

    if (result) {
      geocodeCache.set(cacheKey, { timestamp: Date.now(), data: result });
      return res.json(result);
    }

    res.status(502).json({ error: 'Geocoding unavailable' });
  } catch (err) {
    res.status(500).json({ error: 'Internal geocode error', message: err.message });
  }
});

// Atmospheric & Weather Telemetry Proxy Endpoint
// Proxies Open-Meteo requests to bypass client ad-blockers, tracking prevention, and iframe restrictions
app.get('/api/weather', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || 42.3765;
    const lon = parseFloat(req.query.lon) || -71.2356;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,uv_index,surface_pressure,pressure_msl&temperature_unit=fahrenheit&timezone=auto`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Open-Meteo returned status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.warn('Server weather proxy warning:', err.message);
    res.status(502).json({ error: 'Failed to fetch atmospheric telemetry', message: err.message });
  }
});

// Serve static assets with html extension support
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Root fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for HTML navigation requests
app.use((req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'index.html'));
    return;
  }
  res.status(404).send('Not found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NOMAD: Unified Cockpit Suite server running on http://0.0.0.0:${PORT}`);
});
