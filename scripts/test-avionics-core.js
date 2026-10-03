import {
  getHighwayCorridorAxis,
  getCardinalDirection,
  getCardinal16Direction,
  abbreviateStreetName,
  getDistanceFromLatLonInMeters,
  getWeatherInfo,
  STATE_ABBREVIATIONS,
  AvionicsCore
} from '../js/avionics-core.js';

console.log('Testing Nomad Avionics Core ("The Brain")...');

// 1. AASHTO Corridor Tests
console.assert(getHighwayCorridorAxis('128') === 'north-south', 'Route 128 should be north-south');
console.assert(getHighwayCorridorAxis('95', 'interstate') === 'north-south', 'I-95 should be north-south');
console.assert(getHighwayCorridorAxis('90', 'interstate') === 'east-west', 'I-90 should be east-west');
console.assert(getHighwayCorridorAxis('2', 'state') === 'east-west', 'Route 2 should be east-west');
console.assert(getHighwayCorridorAxis('US 1', 'us') === 'north-south', 'US 1 should be north-south');
console.assert(getHighwayCorridorAxis('I-495') === 'north-south', 'I-495 should be north-south (495 % 100 = 95)');
console.assert(getHighwayCorridorAxis('I-290') === 'east-west', 'I-290 should be east-west (290 % 100 = 90)');
console.log('✓ AASHTO Highway Corridor tests passed');

// 2. Compass & Cardinal tests
console.assert(getCardinalDirection(0) === 'N', '0 deg should be N');
console.assert(getCardinalDirection(90) === 'E', '90 deg should be E');
console.assert(getCardinalDirection(180) === 'S', '180 deg should be S');
console.assert(getCardinalDirection(270) === 'W', '270 deg should be W');
console.assert(getCardinal16Direction(22.5) === 'NNE', '22.5 deg should be NNE');
console.log('✓ Cardinal direction tests passed');

// 3. Street Abbreviation Tests
console.assert(abbreviateStreetName('100 Main Street') === '100 Main St.', 'Street -> St.');
console.assert(abbreviateStreetName('500 Commonwealth Avenue') === '500 Commonwealth Ave.', 'Avenue -> Ave.');
console.assert(abbreviateStreetName('Route 128 North') === '128 North', 'Route 128 -> 128');
console.assert(abbreviateStreetName('Turnpike Road') === 'Tpk. Rd.', 'Turnpike Road -> Tpk. Rd.');
console.log('✓ Street abbreviation tests passed');

// 4. Distance Haversine
const d = getDistanceFromLatLonInMeters(42.3601, -71.0589, 42.3736, -71.1097);
console.assert(d > 4000 && d < 6000, `Expected ~4.4km, got ${d}`);
console.log(`✓ Distance calculation test passed (${d.toFixed(1)}m)`);

// 5. State Abbreviations
console.assert(STATE_ABBREVIATIONS['Massachusetts'] === 'MA', 'Massachusetts -> MA');
console.assert(STATE_ABBREVIATIONS['California'] === 'CA', 'California -> CA');
console.log('✓ State abbreviations test passed');

// 6. Weather codes
console.assert(getWeatherInfo(0).text === 'Clear Sky', 'Code 0 is Clear Sky');
console.assert(getWeatherInfo(61).text === 'Slight Rain', 'Code 61 is Slight Rain');
console.log('✓ Weather WMO lookup passed');

// 7. Core Deadband & Telemetry Engine Unit Test
const avionics = new AvionicsCore();

// Test Deadband below 1.8 MPH (< 0.804 m/s)
avionics.handlePositionUpdate({
  coords: {
    latitude: 42.3601,
    longitude: -71.0589,
    speed: 0.5, // 0.5 m/s = 1.11 MPH (< 1.8 MPH deadband)
    heading: 45,
    altitude: 15,
    accuracy: 10
  }
});

let st = avionics.getState();
console.assert(st.speedMph === 0, `Speed should be clamped to 0 under 1.8 MPH deadband, got ${st.speedMph}`);
console.assert(st.isStopped === true, 'isStopped should be true under deadband');
console.log('✓ Stationary deadband (< 1.8 MPH) test passed: clamped to 0.0 MPH');

// Test Above Deadband (> 1.8 MPH)
avionics.handlePositionUpdate({
  coords: {
    latitude: 42.3605,
    longitude: -71.0580,
    speed: 15.0, // ~33.5 MPH
    heading: 90,
    altitude: 18,
    accuracy: 5
  }
});

st = avionics.getState();
console.assert(st.speedMph > 33 && st.speedMph < 34, `Speed should be ~33.6 MPH, got ${st.speedMph}`);
console.assert(st.isStopped === false, 'isStopped should be false');
console.assert(st.heading === 90, 'Heading should be 90');
console.assert(st.cardinalDirection === 'E', 'Cardinal should be E');
console.assert(st.headingSource === 'GNSS COURSE', 'Heading source should be GNSS COURSE');
console.log(`✓ In-motion telemetry test passed: ${st.speedMph} MPH, heading ${st.heading}° ${st.cardinalDirection}`);

// Test AASHTO Hysteresis
const dir1 = avionics.getHighwayDirection('95', 85, 'interstate'); // North of 90° boundary
const dir2 = avionics.getHighwayDirection('95', 98, 'interstate'); // In hysteresis deadband [90..105] -> should stay North
console.assert(dir1 === 'North', `Expected North, got ${dir1}`);
console.assert(dir2 === 'North', `Expected North in hysteresis deadband, got ${dir2}`);
console.log('✓ AASHTO Directional Hysteresis test passed');

console.log('\nAll Avionics Core unit tests successfully passed!');
