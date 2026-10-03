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
