import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    hospitals?: Array<{ name: string; distance: number }>;
    services?: Array<{ name: string; distance: number }>;
  };
}

interface MapViewProps {
  locations: Location[];
  ratings: number[];
  selectedIndex: number | null;
  onMarkerClick: (index: number) => void;
}

// Create custom icon based on rating
const createCustomIcon = (rating: number, isSelected: boolean) => {
  const size = isSelected ? 40 : 32;
  const color = rating >= 8 ? '#10b981' : rating >= 6 ? '#f59e0b' : '#ef4444';
  
  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: ${isSelected ? '4px' : '3px'} solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: 900;
          font-size: ${size * 0.4}px;
          line-height: 1;
        ">${rating.toFixed(1)}</span>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

export default function MapView({ locations, ratings, selectedIndex, onMarkerClick }: MapViewProps) {
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
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-primary/30 shadow-xl">
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

        {locations.map((location, index) => {
          const rating = ratings[index];
          const isSelected = selectedIndex === index;
          
          return (
            <div key={`location-${index}`}>
              {/* Visual radius circle */}
              <Circle
                center={[location.lat, location.lon]}
                radius={location.search_radius || 1000}
                pathOptions={{
                  color: isSelected ? '#00d9ff' : '#3b82f6',
                  fillColor: isSelected ? '#00d9ff' : '#3b82f6',
                  fillOpacity: isSelected ? 0.15 : 0.08,
                  weight: isSelected ? 2 : 1,
                  dashArray: '5, 10',
                }}
              />

              <Marker
                position={[location.lat, location.lon]}
                icon={createCustomIcon(rating, isSelected)}
                eventHandlers={{
                  click: () => onMarkerClick(index),
                }}
              >
                <Popup maxWidth={350} className="custom-popup">
                  <div className="p-3">
                    {/* Address */}
                    <h3 className="font-bold text-lg mb-1">{location.address}</h3>
                    
                    {/* Rating Badge */}
                    <div className="inline-flex items-center gap-2 mb-2 bg-gray-100 px-3 py-1 rounded-lg">
                      <span className="text-2xl font-black" style={{ 
                        color: rating >= 8 ? '#10b981' : rating >= 6 ? '#f59e0b' : '#ef4444' 
                      }}>
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">/ 10</span>
                    </div>

                    {/* Quick POI Summary */}
                    <div className="grid grid-cols-5 gap-2 mt-3 mb-3">
                      {[
                        { emoji: '🚇', count: location.poi_nearby?.transport?.length || 0 },
                        { emoji: '🏫', count: location.poi_nearby?.schools?.length || 0 },
                        { emoji: '🛒', count: location.poi_nearby?.shops?.length || 0 },
                        { emoji: '🏥', count: location.poi_nearby?.hospitals?.length || 0 },
                        { emoji: '🏦', count: location.poi_nearby?.services?.length || 0 },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center bg-gray-50 rounded p-2"
                        >
                          <span className="text-lg">{item.emoji}</span>
                          <span className="text-xs font-bold">{item.count}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onMarkerClick(index)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Zobrazit detail →
                    </button>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      {/* Custom CSS for popup */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
