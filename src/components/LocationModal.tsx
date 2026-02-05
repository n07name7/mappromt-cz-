import { X, MapPin, Star, Navigation, TrendingUp, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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

interface LocationModalProps {
  location: Location | null;
  rating: number;
  onClose: () => void;
  onCompare: () => void;
}

const POI_COLORS = {
  transport: '#3b82f6', // blue
  schools: '#10b981', // green
  shops: '#f59e0b', // orange
  hospitals: '#ef4444', // red
  services: '#8b5cf6', // purple
};

const POI_ICONS: Record<string, string> = {
  transport: '🚇',
  schools: '🏫',
  shops: '🛒',
  hospitals: '🏥',
  services: '🏦',
};

const POI_LABELS: Record<string, string> = {
  transport: 'Doprava',
  schools: 'Školy',
  shops: 'Obchody',
  hospitals: 'Nemocnice',
  services: 'Služby',
};

export default function LocationModal({ location, rating, onClose, onCompare }: LocationModalProps) {
  if (!location) return null;

  // Calculate POI data for chart
  const poiData = [
    { name: 'Doprava', value: location.poi_nearby?.transport?.length || 0, color: POI_COLORS.transport },
    { name: 'Školy', value: location.poi_nearby?.schools?.length || 0, color: POI_COLORS.schools },
    { name: 'Obchody', value: location.poi_nearby?.shops?.length || 0, color: POI_COLORS.shops },
    { name: 'Nemocnice', value: location.poi_nearby?.hospitals?.length || 0, color: POI_COLORS.hospitals },
    { name: 'Služby', value: location.poi_nearby?.services?.length || 0, color: POI_COLORS.services },
  ].filter(item => item.value > 0);

  const totalPOI = poiData.reduce((sum, item) => sum + item.value, 0);

  // Get all POI with categories
  const allPOI: Array<{ category: string; name: string; distance: number }> = [];
  
  Object.entries(location.poi_nearby || {}).forEach(([category, items]) => {
    items?.forEach((item: { name: string; distance: number }) => {
      allPOI.push({ category, name: item.name, distance: item.distance });
    });
  });

  // Sort by distance
  allPOI.sort((a, b) => a.distance - b.distance);

  // Rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-500/20 border-green-500';
    if (rating >= 6) return 'bg-yellow-500/20 border-yellow-500';
    return 'bg-orange-500/20 border-orange-500';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 8) return 'Výborná lokalita';
    if (rating >= 6) return 'Dobrá lokalita';
    return 'Průměrná lokalita';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-card border border-dark-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-dark-card border-b border-dark-border p-6 flex items-start justify-between z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-primary" size={24} />
                <h2 className="text-2xl font-black">{location.address}</h2>
              </div>
              <p className="text-sm text-text-secondary">{location.display_name}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-dark-bg rounded-lg transition-colors"
            >
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Rating Section */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">Hodnocení lokality</h3>
                  <p className="text-sm text-text-secondary">
                    Založeno na dostupnosti infrastruktury v okruhu {location.search_radius || 1000}m
                  </p>
                </div>
                <div className={`flex flex-col items-center px-6 py-4 rounded-xl border-2 ${getRatingBg(rating)}`}>
                  <div className={`text-5xl font-black ${getRatingColor(rating)}`}>
                    {rating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={rating >= (i + 1) * 2 ? getRatingColor(rating) : 'text-gray-600'}
                        fill={rating >= (i + 1) * 2 ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary mt-1">{getRatingLabel(rating)}</span>
                </div>
              </div>

              {/* Chart and Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                {poiData.length > 0 && (
                  <div className="bg-dark-bg/50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 size={16} className="text-primary" />
                      Rozložení POI
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={poiData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {poiData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1b26',
                            border: '1px solid #2d3748',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Summary Stats */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-accent-green" />
                    Statistiky
                  </h4>
                  {Object.entries(POI_LABELS).map(([key, label]) => {
                    const count = location.poi_nearby?.[key as keyof typeof location.poi_nearby]?.length || 0;
                    const percentage = totalPOI > 0 ? ((count / totalPOI) * 100).toFixed(0) : 0;
                    return (
                      <div key={key} className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{POI_ICONS[key]}</span>
                          <span className="text-sm font-medium">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-sm font-bold">{count}</div>
                            <div className="text-xs text-text-secondary">{percentage}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* POI List */}
            {allPOI.length > 0 && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Navigation size={20} className="text-primary" />
                  Nejbližší místa ({allPOI.length})
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {allPOI.map((poi, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-dark-bg/50 hover:bg-dark-bg transition-colors rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0">{POI_ICONS[poi.category]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{poi.name}</div>
                          <div className="text-xs text-text-secondary">
                            {POI_LABELS[poi.category]}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <div className="text-right">
                          <div className="text-sm font-bold text-accent-green">{poi.distance}m</div>
                          <div className="text-xs text-text-secondary">
                            {(poi.distance / 1000).toFixed(1)} km
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No POI Message */}
            {allPOI.length === 0 && (
              <div className="glass rounded-xl p-12 text-center">
                <Navigation size={48} className="mx-auto mb-4 text-text-secondary/50" />
                <p className="text-text-secondary">
                  V okruhu {location.search_radius || 1000}m nebyly nalezeny žádné POI
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onCompare}
                className="btn-primary flex-1 py-3"
              >
                Porovnat s ostatními
              </button>
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`, '_blank')}
                className="btn-secondary py-3 px-6"
              >
                Otevřít v Google Maps
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
