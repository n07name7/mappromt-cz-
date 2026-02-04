import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  address: string;
  lat: number;
  lon: number;
  display_name: string;
  search_radius?: number;
  poi_nearby?: {
    transport?: Array<{ name: string; distance: number }>;
    schools?: Array<{ name: string; distance: number }>;
    shops?: Array<{ name: string; distance: number }>;
  };
}

interface MapViewProps {
  locations: Location[];
}

export default function MapView({ locations }: MapViewProps) {
  // Calculate map center (average of all coordinates)
  const center = locations.reduce(
    (acc, loc) => {
      acc.lat += loc.lat;
      acc.lon += loc.lon;
      return acc;
    },
    { lat: 0, lon: 0 }
  );

  center.lat /= locations.length;
  center.lon /= locations.length;

  // Calculate appropriate zoom level based on bounds
  const calculateZoom = () => {
    if (locations.length === 1) return 13;

    const lats = locations.map((l) => l.lat);
    const lons = locations.map((l) => l.lon);

    const latDiff = Math.max(...lats) - Math.min(...lats);
    const lonDiff = Math.max(...lons) - Math.min(...lons);
    const maxDiff = Math.max(latDiff, lonDiff);

    if (maxDiff > 1) return 10;
    if (maxDiff > 0.5) return 11;
    if (maxDiff > 0.1) return 12;
    return 13;
  };

  const zoom = calculateZoom();

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-primary/30">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <>
            {/* Visual radius circle */}
            <Circle
              key={`circle-${index}`}
              center={[location.lat, location.lon]}
              radius={location.search_radius || 1000}
              pathOptions={{ 
                color: 'blue', 
                fillColor: 'blue', 
                fillOpacity: 0.1,
                weight: 1,
                dashArray: '5, 10'
              }}
            />
            
            <Marker key={`marker-${index}`} position={[location.lat, location.lon]}>
              <Popup maxWidth={350}>
                <div className="p-2">
                  {/* Address */}
                  <h3 className="font-bold text-lg mb-1">{location.address}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    📍 {location.lat.toFixed(5)}, {location.lon.toFixed(5)}
                  </p>
                  
                  {/* Radius info */}
                  <div className="text-xs text-blue-500 mb-3 border-b border-gray-300 pb-2">
                    🔍 Доступність в радіусі: <span className="font-semibold">{location.search_radius || 1000} м</span>
                  </div>

                  {/* POI Information */}
                  {location.poi_nearby && Object.keys(location.poi_nearby).length > 0 ? (
                    <div className="space-y-3">
                      {/* Transport */}
                      {location.poi_nearby.transport && location.poi_nearby.transport.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1 flex items-center">
                            🚇 Doprava
                          </h4>
                          <ul className="text-xs space-y-1">
                            {location.poi_nearby.transport.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex justify-between pl-4">
                                <span>• {item.name}</span>
                                <span className="text-gray-500">({item.distance}m)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Schools */}
                      {location.poi_nearby.schools && location.poi_nearby.schools.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1 flex items-center">
                            🏫 Školy
                          </h4>
                          <ul className="text-xs space-y-1">
                            {location.poi_nearby.schools.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex justify-between pl-4">
                                <span>• {item.name}</span>
                                <span className="text-gray-500">({item.distance}m)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Shops */}
                      {location.poi_nearby.shops && location.poi_nearby.shops.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1 flex items-center">
                            🛒 Obchody
                          </h4>
                          <ul className="text-xs space-y-1">
                            {location.poi_nearby.shops.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex justify-between pl-4">
                                <span>• {item.name}</span>
                                <span className="text-gray-500">({item.distance}m)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-yellow-600 italic">
                      ⚠️ POI данные недоступны для этого адреса
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          </>
        ))}
      </MapContainer>
    </div>
  );
}
