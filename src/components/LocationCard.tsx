import { MapPin, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface LocationCardProps {
  location: Location;
  index: number;
  rating: number;
  onSelect: () => void;
  isSelected: boolean;
}

export default function LocationCard({ location, index, rating, onSelect, isSelected }: LocationCardProps) {
  // Calculate POI counts
  const poiCounts = {
    transport: location.poi_nearby?.transport?.length || 0,
    schools: location.poi_nearby?.schools?.length || 0,
    shops: location.poi_nearby?.shops?.length || 0,
    hospitals: location.poi_nearby?.hospitals?.length || 0,
    services: location.poi_nearby?.services?.length || 0,
  };

  const totalPOI = Object.values(poiCounts).reduce((a, b) => a + b, 0);

  // Rating color based on score
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
      className={`glass rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] hover:border-primary ${
        isSelected ? 'border-2 border-primary shadow-lg shadow-primary/20' : 'border border-dark-border'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <h3 className="font-bold text-sm line-clamp-1">{location.address}</h3>
          </div>
          <p className="text-xs text-text-secondary line-clamp-1">{location.display_name}</p>
        </div>

        {/* Rating Badge */}
        <div className={`flex flex-col items-center ml-2 px-3 py-2 rounded-lg border ${getRatingBg(rating)}`}>
          <div className={`text-2xl font-black ${getRatingColor(rating)}`}>
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center gap-0.5">
            <Star size={10} className={getRatingColor(rating)} fill="currentColor" />
            <span className="text-[10px] text-text-secondary">/ 10</span>
          </div>
        </div>
      </div>

      {/* POI Summary */}
      <div className="grid grid-cols-5 gap-1 mb-3">
        {[
          { emoji: '🚇', count: poiCounts.transport, label: 'Doprava' },
          { emoji: '🏫', count: poiCounts.schools, label: 'Školy' },
          { emoji: '🛒', count: poiCounts.shops, label: 'Obchody' },
          { emoji: '🏥', count: poiCounts.hospitals, label: 'Nemocnice' },
          { emoji: '🏦', count: poiCounts.services, label: 'Služby' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-dark-bg/50 rounded-lg p-1.5"
            title={item.label}
          >
            <span className="text-sm">{item.emoji}</span>
            <span className={`text-xs font-bold ${item.count > 0 ? 'text-accent-green' : 'text-text-secondary/50'}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-border">
        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <TrendingUp size={12} className="text-accent-green" />
          <span>{totalPOI} POI celkem</span>
        </div>
        <button className="text-xs text-primary hover:text-primary/80 font-medium">
          Detail →
        </button>
      </div>
    </motion.div>
  );
}
