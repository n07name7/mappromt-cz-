const { geocodeAddress } = require('../lib/services/nominatim');
const { getFoursquarePOI } = require('../lib/services/foursquare');

export default async function handler(req, res) {
  // CORS headers handled by Vercel config or manual
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { addresses, radius = 1000 } = req.body || {};

    if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
      return res.status(400).json({ error: 'Требуется массив addresses' });
    }

    if (addresses.length > 10) {
      return res.status(400).json({ error: 'Максимум 10 адресов за раз' });
    }

    const results = [];

    for (const address of addresses) {
      // 1. Geocoding
      const geocodeResult = await geocodeAddress(address);

      if (geocodeResult.status === 'success') {
        const { lat, lon } = geocodeResult.data;

        // 2. Foursquare POI
        // Используем только Foursquare для скорости
        const foursquarePOI = await getFoursquarePOI(lat, lon, radius);

        const poi = {
          transport: [], // Отключено для скорости, можно включить Overpass если нужно
          schools: [],
          shops: foursquarePOI.shops || [],
          hospitals: foursquarePOI.hospitals || [],
          services: foursquarePOI.services || []
        };

        const hasPOI = 
          poi.shops.length > 0 ||
          poi.hospitals.length > 0 ||
          poi.services.length > 0;

        const poiStatus = hasPOI ? 'available' : 'unavailable';

        results.push({
          address,
          status: 'success',
          data: {
            ...geocodeResult.data,
            search_radius: radius,
            poi_nearby: hasPOI ? poi : null,
            poi_status: poiStatus
          }
        });
      } else {
        results.push({
          address,
          status: geocodeResult.status,
          message: geocodeResult.message
        });
      }
    }

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({
      error: 'Внутренняя ошибка сервера',
      message: error.message
    });
  }
}
