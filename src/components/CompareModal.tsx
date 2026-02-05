import { X, TrendingUp, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

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

interface CompareModalProps {
  locations: Array<{ location: Location; rating: number }>;
  onClose: () => void;
}

const POI_CATEGORIES = [
  { key: 'transport', label: 'Doprava', emoji: '🚇' },
  { key: 'schools', label: 'Školy', emoji: '🏫' },
  { key: 'shops', label: 'Obchody', emoji: '🛒' },
  { key: 'hospitals', label: 'Nemocnice', emoji: '🏥' },
  { key: 'services', label: 'Služby', emoji: '🏦' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function CompareModal({ locations, onClose }: CompareModalProps) {
  if (locations.length === 0) return null;

  // Prepare radar chart data
  const radarData = POI_CATEGORIES.map((category) => {
    const dataPoint: any = { category: category.label };
    
    locations.forEach((loc, index) => {
      const count = loc.location.poi_nearby?.[category.key as keyof typeof loc.location.poi_nearby]?.length || 0;
      dataPoint[`location${index}`] = count;
    });
    
    return dataPoint;
  });

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-500/10 border-green-500/30';
    if (rating >= 6) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-orange-500/10 border-orange-500/30';
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
          className="bg-dark-card border border-dark-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-dark-card border-b border-dark-border p-6 flex items-start justify-between z-10">
            <div>
              <h2 className="text-2xl font-black mb-2">Porovnání lokalit</h2>
              <p className="text-sm text-text-secondary">
                Porovnání {locations.length} {locations.length === 1 ? 'lokality' : 'lokalit'} podle dostupnosti infrastruktury
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-dark-bg rounded-lg transition-colors"
            >
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Radar Chart */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Graf porovnání</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#2d3748" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#a0aec0', fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 'auto']} tick={{ fill: '#a0aec0' }} />
                  {locations.map((loc, index) => (
                    <Radar
                      key={index}
                      name={loc.location.address}
                      dataKey={`location${index}`}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend
                    wrapperStyle={{ fontSize: '12px' }}
                    iconType="circle"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1b26',
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison Table */}
            <div className="glass rounded-xl p-6 overflow-x-auto">
              <h3 className="text-lg font-bold mb-4">Detailní srovnání</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 px-2 font-semibold">Kategorie</th>
                    {locations.map((loc, index) => (
                      <th key={index} className="text-center py-3 px-2">
                        <div className="flex flex-col items-center gap-1">
                          <MapPin size={14} style={{ color: COLORS[index % COLORS.length] }} />
                          <div className="font-semibold text-xs line-clamp-1 max-w-[150px]">
                            {loc.location.address}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Rating Row */}
                  <tr className="border-b border-dark-border bg-dark-bg/30">
                    <td className="py-3 px-2 font-semibold flex items-center gap-2">
                      <Star size={16} className="text-primary" />
                      Celkové hodnocení
                    </td>
                    {locations.map((loc, index) => (
                      <td key={index} className="text-center py-3 px-2">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border ${getRatingBg(loc.rating)}`}>
                          <span className={`text-lg font-black ${getRatingColor(loc.rating)}`}>
                            {loc.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-text-secondary">/ 10</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* POI Categories */}
                  {POI_CATEGORIES.map((category) => {
                    const counts = locations.map(
                      (loc) => loc.location.poi_nearby?.[category.key as keyof typeof loc.location.poi_nearby]?.length || 0
                    );
                    const maxCount = Math.max(...counts);

                    return (
                      <tr key={category.key} className="border-b border-dark-border hover:bg-dark-bg/20 transition-colors">
                        <td className="py-3 px-2 font-medium flex items-center gap-2">
                          <span className="text-lg">{category.emoji}</span>
                          {category.label}
                        </td>
                        {counts.map((count, index) => (
                          <td key={index} className="text-center py-3 px-2">
                            <div className="flex flex-col items-center gap-1">
                              <span className={`text-lg font-bold ${count === maxCount && count > 0 ? 'text-accent-green' : 'text-text-primary'}`}>
                                {count}
                              </span>
                              {count === maxCount && count > 0 && (
                                <TrendingUp size={14} className="text-accent-green" />
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* Total POI Row */}
                  <tr className="bg-dark-bg/30 font-semibold">
                    <td className="py-3 px-2">Celkem POI</td>
                    {locations.map((loc, index) => {
                      const total = Object.values(loc.location.poi_nearby || {}).reduce(
                        (sum, arr) => sum + (arr?.length || 0),
                        0
                      );
                      const maxTotal = Math.max(
                        ...locations.map((l) =>
                          Object.values(l.location.poi_nearby || {}).reduce(
                            (sum, arr) => sum + (arr?.length || 0),
                            0
                          )
                        )
                      );
                      return (
                        <td key={index} className="text-center py-3 px-2">
                          <span className={`text-xl font-black ${total === maxTotal && total > 0 ? 'text-accent-green' : 'text-text-primary'}`}>
                            {total}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Export Button */}
            <div className="flex justify-center">
              <button
                onClick={() => alert('Export do PDF bude dostupný brzy!')}
                className="btn-primary px-8 py-3"
              >
                Stáhnout porovnání jako PDF
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
