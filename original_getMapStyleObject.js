async function getMapStyleObject(theme) {
      if (theme.url) return theme.url;

      // 1. Natural Light Navigation: Crisp white roads, mint green parks, vibrant sky-blue waterways, and soft slate-blue buildings
      if (theme.type === 'blueprint-light') {
        if (cachedPositronStyle) return cachedPositronStyle;
        try {
          const res = await fetch('https://tiles.openfreemap.org/styles/liberty');
          if (!res.ok) throw new Error('Failed to fetch base style: ' + res.status);
          const s = await res.json();
          s.layers.forEach(l => {
            if (!l.paint) l.paint = {};
            // Background
            if (l.type === 'background') {
              l.paint['background-color'] = '#f1f5f9';
            }
            // Shaded relief raster
            if (l.type === 'raster') {
              l.paint['raster-opacity'] = 0.2;
            }
            // Vibrant sky-blue water bodies
            if (l.type === 'fill' && (l['source-layer'] === 'water' || l.id === 'water')) {
              l.paint['fill-color'] = '#7dd3fc';
              l.paint['fill-opacity'] = 0.95;
            }
            // Clear sky-blue river streams
            if (l.type === 'line' && (l['source-layer'] === 'waterway' || l.id.includes('waterway'))) {
              l.paint['line-color'] = '#38bdf8';
              if (!l.paint['line-width']) l.paint['line-width'] = 2.5;
            }
            // Lush spring mint green parks, forests, and nature reserves
            if (l.type === 'fill' && (l.id.includes('park') || l.id.includes('wood') || l.id.includes('grass') || l['source-layer'] === 'park' || l['source-layer'] === 'landcover')) {
              l.paint['fill-color'] = '#bbf7d0';
              l.paint['fill-opacity'] = 0.85;
              if (l.paint['fill-outline-color']) l.paint['fill-outline-color'] = '#86efac';
            }
            if (l.type === 'line' && l.id === 'park_outline') {
              l.paint['line-color'] = '#86efac';
            }
            // Clean road border casings
            if (l.type === 'line' && l.id.includes('casing')) {
              l.paint['line-color'] = '#cbd5e1';
            }
            // Crisp white road pavement surfaces
            if (l.type === 'line' && l['source-layer'] === 'transportation' && !l.id.includes('casing')) {
              l.paint['line-color'] = '#ffffff';
            }
            // Soft slate-blue buildings
            if (l.type === 'fill' && l.id === 'building') {
              l.paint['fill-color'] = '#c4ccd8';
              l.paint['fill-outline-color'] = '#94a3b8';
            }
            if (l.type === 'fill-extrusion' && l.id === 'building-3d') {
              l.paint['fill-extrusion-color'] = '#c4ccd8';
              l.paint['fill-extrusion-opacity'] = 0.85;
            }
            // Street Names & Road Labels (High-legibility enlarged lettering with bold halos)
            if (l.type === 'symbol' && l['source-layer'] === 'transportation_name' && l.layout && l.layout['text-field']) {
              if (!l.layout) l.layout = {};
              l.layout['text-size'] = [
                'interpolate', ['linear'], ['zoom'],
                12, 12,
                14, 15,
                16, 17,
                18, 20
              ];
              l.paint['text-color'] = '#0f172a';
              l.paint['text-halo-color'] = '#ffffff';
              l.paint['text-halo-width'] = 2.5;
              l.paint['text-halo-blur'] = 0.5;
            } else if (l.type === 'symbol' && l.paint) {
              if (l.paint['text-color'] !== undefined) l.paint['text-color'] = '#1e293b';
              if (l.paint['text-halo-color'] !== undefined) l.paint['text-halo-color'] = '#ffffff';
            }
          });
          cachedPositronStyle = s;
          return cachedPositronStyle;
        } catch(e) {
          console.warn('NOMAD: Falling back to OpenFreeMap Bright style URL', e);
          return 'https://tiles.openfreemap.org/styles/bright';
        }
      }

      // 2. Natural Dark Navigation: Midnight canvas, glowing electric cyan waterways, deep emerald pine forests, glowing white road outlines
      if (cachedDarkMatterStyle) return cachedDarkMatterStyle;
      try {
        const res = await fetch('https://tiles.openfreemap.org/styles/liberty');
        if (!res.ok) throw new Error('Failed to fetch base style: ' + res.status);
        const s = await res.json();
        s.layers.forEach(l => {
          if (!l.paint) l.paint = {};
          // Background
          if (l.type === 'background') {
            l.paint['background-color'] = '#070b14';
          }
          // Shaded relief raster
          if (l.type === 'raster') {
            l.paint['raster-opacity'] = 0.05;
          }
          // Deep midnight water bodies
          if (l.type === 'fill' && (l['source-layer'] === 'water' || l.id === 'water')) {
            l.paint['fill-color'] = '#0a2238';
            l.paint['fill-opacity'] = 0.95;
          }
          // Luminous electric cyan river/stream veins
          if (l.type === 'line' && (l['source-layer'] === 'waterway' || l.id.includes('waterway'))) {
            l.paint['line-color'] = '#00d4ff';
            if (!l.paint['line-width']) l.paint['line-width'] = 2.5;
          }
          // Deep pine emerald green nature reserves & forests
          if (l.type === 'fill' && (l.id.includes('park') || l.id.includes('wood') || l.id.includes('grass') || l['source-layer'] === 'park' || l['source-layer'] === 'landcover')) {
            l.paint['fill-color'] = '#073b22';
            l.paint['fill-opacity'] = 0.85;
            if (l.paint['fill-outline-color']) l.paint['fill-outline-color'] = '#0d5c36';
          }
          if (l.type === 'line' && l.id === 'park_outline') {
            l.paint['line-color'] = '#0d5c36';
          }
          // High-visibility glowing white road outline casings
          if (l.type === 'line' && l.id.includes('casing')) {
            l.paint['line-color'] = '#f8fafc';
            if (l.paint['line-opacity'] !== undefined) l.paint['line-opacity'] = 1;
          }
          // Dark charcoal-navy road bed fills
          if (l.type === 'line' && l['source-layer'] === 'transportation' && !l.id.includes('casing')) {
            l.paint['line-color'] = '#0f172a';
          }
          // Midnight slate-navy buildings with crisp borders
          if (l.type === 'fill' && l.id === 'building') {
            l.paint['fill-color'] = '#182436';
            l.paint['fill-outline-color'] = '#334155';
          }
          if (l.type === 'fill-extrusion' && l.id === 'building-3d') {
            l.paint['fill-extrusion-color'] = '#182436';
            l.paint['fill-extrusion-opacity'] = 0.85;
          }
          // Street Names & Road Labels (High-legibility enlarged lettering with bold halos)
          if (l.type === 'symbol' && l['source-layer'] === 'transportation_name' && l.layout && l.layout['text-field']) {
            if (!l.layout) l.layout = {};
            l.layout['text-size'] = [
              'interpolate', ['linear'], ['zoom'],
              12, 12,
              14, 15,
              16, 17,
              18, 20
            ];
            l.paint['text-color'] = '#f8fafc';
            l.paint['text-halo-color'] = '#030712';
            l.paint['text-halo-width'] = 2.5;
            l.paint['text-halo-blur'] = 0.5;
          } else if (l.type === 'symbol' && l.paint) {
            if (l.paint['text-color'] !== undefined) l.paint['text-color'] = '#cbd5e1';
            if (l.paint['text-halo-color'] !== undefined) l.paint['text-halo-color'] = '#070b14';
          }
        });
        cachedDarkMatterStyle = s;
        return cachedDarkMatterStyle;
      } catch(e) {
        console.warn('NOMAD: Falling back to OpenFreeMap Dark style URL', e);
        return 'https://tiles.openfreemap.org/styles/dark';
      }
    }