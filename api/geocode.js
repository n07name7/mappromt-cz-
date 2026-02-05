import { geocodeAddress } from '../lib/services/nominatim.js';
import { getFoursquarePOI } from '../lib/services/foursquare.js';
import { getPOINearby } from '../lib/services/overpass.js';

export default async function handler(req, res) {
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

    if (addresses.length > 20) {
      return res.status(400).json({ error: 'Максимум 20 адресов за раз' });
    }

    const results = [];

    // Обрабатываем адреса последовательно (геокодинг имеет rate limit)
    // Но POI можно параллелить внутри каждого
    for (const address of addresses) {
      const geocodeResult = await geocodeAddress(address);

      if (geocodeResult.status === 'success') {
        const { lat, lon } = geocodeResult.data;

        // Параллельный запрос к источникам данных
        // Используем Promise.allSettled чтобы ошибка одного не валила всё
        const [foursquareResult, osmResult] = await Promise.allSettled([
          getFoursquarePOI(lat, lon, radius),
          getPOINearby(lat, lon, radius)
        ]);

        const foursquarePOI = foursquareResult.status === 'fulfilled' ? foursquareResult.value : { shops: [], hospitals: [], services: [] };
        const osmPOI = osmResult.status === 'fulfilled' ? osmResult.value : { transport: [], schools: [] };

        const poi = {
          transport: osmPOI.transport || [],
          schools: osmPOI.schools || [],
          shops: foursquarePOI.shops || [],
          hospitals: foursquarePOI.hospitals || [],
          services: foursquarePOI.services || []
        };

        const hasPOI = 
          poi.transport.length > 0 ||
          poi.schools.length > 0 ||
          poi.shops.length > 0 ||
          poi.hospitals.length > 0 ||
          poi.services.length > 0;

        results.push({
          address,
          status: 'success',
          data: {
            ...geocodeResult.data,
            search_radius: radius,
            poi_nearby: hasPOI ? poi : null,
            poi_status: hasPOI ? 'available' : 'unavailable'
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
