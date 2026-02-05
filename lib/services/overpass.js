import axios from 'axios';

// Fallback endpoints для Overpass API
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

const MAX_RETRIES = 2; // Уменьшил до 2 для скорости

// In-memory кэш
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetryAndFallback(query) {
  let lastError = null;

  for (let endpointIndex = 0; endpointIndex < OVERPASS_ENDPOINTS.length; endpointIndex++) {
    const endpoint = OVERPASS_ENDPOINTS[endpointIndex];
    
    for (let retry = 0; retry < MAX_RETRIES; retry++) {
      try {
        const response = await axios.post(endpoint, query, {
          headers: { 'Content-Type': 'text/plain' },
          timeout: 8000 // 8 сек таймаут
        });

        if (response.status === 200 && response.data) {
          return response.data;
        }
      } catch (error) {
        lastError = error;
        const isRetryable = error.code === 'ECONNABORTED' || error.code === 'ECONNRESET' || error.response?.status >= 500;

        if (retry < MAX_RETRIES - 1 && isRetryable) {
          await sleep(500 * Math.pow(2, retry));
          continue;
        }
        break;
      }
    }
  }
  throw lastError || new Error('All Overpass endpoints failed');
}

export async function getPOINearby(lat, lon, radius = 1000) {
  const cacheKey = `osm_${lat.toFixed(4)},${lon.toFixed(4)},${radius}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`[OSM Cache HIT] ${cacheKey}`);
    return cached.data;
  }

  // Запрашиваем транспорт и школы
  const query = `
    [out:json][timeout:5];
    (
      node["public_transport"="stop_position"](around:${radius},${lat},${lon});
      node["highway"="bus_stop"](around:${radius},${lat},${lon});
      node["railway"="tram_stop"](around:${radius},${lat},${lon});
      node["amenity"="school"](around:${radius},${lat},${lon});
      node["amenity"="kindergarten"](around:${radius},${lat},${lon});
      node["amenity"="university"](around:${radius},${lat},${lon});
    );
    out body;
  `;

  try {
    const data = await fetchWithRetryAndFallback(query);
    const elements = data.elements || [];
    
    const result = {
      transport: extractPOI(elements, lat, lon, ['public_transport', 'highway', 'railway']),
      schools: extractPOI(elements, lat, lon, ['amenity'], ['school', 'kindergarten', 'university']),
      shops: [] // Магазины берем из Foursquare
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (error) {
    console.error('[Overpass] Error:', error.message);
    return { transport: [], schools: [], shops: [] };
  }
}

function extractPOI(elements, centerLat, centerLon, keys, values = []) {
  return elements
    .filter(el => {
      if (!el.tags) return false;
      
      const hasKey = keys.some(key => {
        if (!el.tags[key]) return false;
        if (values.length > 0) return values.includes(el.tags[key]);
        return true;
      });
      
      return hasKey;
    })
    .map(el => ({
      name: el.tags.name || el.tags.ref || 'Без названия',
      type: el.tags.amenity || el.tags.public_transport || el.tags.highway || 'other',
      distance: Math.round(calculateDistance(centerLat, centerLon, el.lat, el.lon))
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
