import { motion } from 'framer-motion';
import { Map, Upload, Sparkles, AlertCircle, SlidersHorizontal, Filter, ArrowUpDown, Download, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../components/MapView';
import LocationCard from '../components/LocationCard';
import LocationModal from '../components/LocationModal';
import CompareModal from '../components/CompareModal';
import { API_ENDPOINTS } from '../config';
import {
  calculateRating,
  saveAddresses,
  loadAddresses,
  saveRadius,
  loadRadius,
  exportToCSV,
  copyToClipboard,
} from '../utils/helpers';

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

type SortOption = 'rating' | 'transport' | 'schools' | 'shops' | 'total';

export default function MapaNemovitosti() {
  const [addresses, setAddresses] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [radius, setRadius] = useState(1000);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [filterPOI, setFilterPOI] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedAddresses = loadAddresses();
    const savedRadius = loadRadius();
    if (savedAddresses) setAddresses(savedAddresses);
    setRadius(savedRadius);
  }, []);

  // Calculate rating for a location (0-10 scale)
  const ratings = locations.map(calculateRating);

  // Get location with rating
  const locationsWithRatings = locations.map((loc, index) => ({
    location: loc,
    rating: ratings[index],
  }));

  // Sort locations
  const sortedLocations = [...locationsWithRatings].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'transport':
        return (b.location.poi_nearby?.transport?.length || 0) - (a.location.poi_nearby?.transport?.length || 0);
      case 'schools':
        return (b.location.poi_nearby?.schools?.length || 0) - (a.location.poi_nearby?.schools?.length || 0);
      case 'shops':
        return (b.location.poi_nearby?.shops?.length || 0) - (a.location.poi_nearby?.shops?.length || 0);
      case 'total':
        const totalA = Object.values(a.location.poi_nearby || {}).reduce((sum, arr) => sum + (arr?.length || 0), 0);
        const totalB = Object.values(b.location.poi_nearby || {}).reduce((sum, arr) => sum + (arr?.length || 0), 0);
        return totalB - totalA;
      default:
        return 0;
    }
  });

  // Filter locations
  const filteredLocations = sortedLocations.filter((item) => {
    if (filterPOI.length === 0) return true;
    return filterPOI.every((filter) => {
      const count = item.location.poi_nearby?.[filter as keyof typeof item.location.poi_nearby]?.length || 0;
      return count > 0;
    });
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setLocations([]);
    setSelectedLocationIndex(null);

    try {
      const addressList = addresses.split('\n').filter((a) => a.trim());

      if (addressList.length === 0) {
        setError('Zadejte alespoň jednu adresu');
        setIsGenerating(false);
        return;
      }

      // Save to localStorage
      saveAddresses(addresses);
      saveRadius(radius);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(API_ENDPOINTS.geocode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: addressList, radius: radius }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Chyba serveru: ${response.status}`);
      }

      const data = await response.json();

      const successfulLocations = data.results
        .filter((r: any) => r.status === 'success')
        .map((r: any) => r.data);

      if (successfulLocations.length === 0) {
        setError('⚠️ Nepodařilo se najít žádnou z adres. Zkontrolujte správnost zadání.');
      } else {
        setLocations(successfulLocations);

        const failedCount = data.results.filter((r: any) => r.status === 'error').length;
        if (failedCount > 0) {
          setError(
            `⚠️ ${failedCount} ${failedCount === 1 ? 'adresa nebyla nalezena' : 'adresy nebyly nalezeny'}. Zobrazeno ${successfulLocations.length} z ${data.results.length}.`
          );
        }
      }
    } catch (err) {
      console.error('[MapaNemovitosti] Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Neznámá chyba';
      setError(`❌ Chyba: ${errorMessage}. Zkuste to znovu nebo kontaktujte podporu.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePOIFilter = (category: string) => {
    setFilterPOI((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6">
            <Map size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Nástroj pro výběr bydlení</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Porovnání Lokalit <span className="text-gradient">AI</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Zadejte adresy bytů a nechte AI vyhodnotit kvalitu infrastruktury v okolí. Porovnejte a
            vyberte nejlepší variantu.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Upload className="mr-2 text-primary" size={24} />
            Zadejte adresy bytů
          </h3>

          {/* Radius Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              🔍 Радиус поиска POI: <span className="text-primary">{radius} м</span>
            </label>
            <div className="text-xs text-text-secondary mb-2">
              💡 <strong>Совет:</strong> Для центра города используйте 500-1000м, для пригорода —
              2000-5000м
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>100 м</span>
              <span>5000 м</span>
            </div>
          </div>

          <textarea
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
            placeholder="Vítězná 1, Praha 1&#10;Karlovo náměstí 13, Praha 2&#10;Wenceslas Square 25, Prague 1"
            className="w-full h-48 bg-dark-bg border border-dark-border rounded-lg p-4 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={!addresses || isGenerating}
            className={`mt-4 w-full btn-primary ${
              !addresses || isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <Sparkles className="animate-spin mr-2" size={20} />
                Analyzuji lokality...
              </span>
            ) : (
              'Analyzovat lokality'
            )}
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 mb-8 flex items-start space-x-3 border border-accent-orange/30"
          >
            <AlertCircle className="text-accent-orange flex-shrink-0 mt-1" size={20} />
            <p className="text-text-secondary text-sm">{error}</p>
          </motion.div>
        )}

        {/* Results Section */}
        {locations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Controls */}
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
                {/* Sort */}
                <div className="flex items-center gap-3">
                  <ArrowUpDown size={20} className="text-primary" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="rating">Seřadit podle: Hodnocení</option>
                    <option value="total">Seřadit podle: Celkem POI</option>
                    <option value="transport">Seřadit podle: Doprava</option>
                    <option value="schools">Seřadit podle: Školy</option>
                    <option value="shops">Seřadit podle: Obchody</option>
                  </select>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">Filtr:</span>
                  {[
                    { key: 'transport', label: '🚇 Doprava' },
                    { key: 'schools', label: '🏫 Školy' },
                    { key: 'shops', label: '🛒 Obchody' },
                    { key: 'hospitals', label: '🏥 Nemocnice' },
                    { key: 'services', label: '🏦 Služby' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => togglePOIFilter(filter.key)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        filterPOI.includes(filter.key)
                          ? 'bg-primary text-white'
                          : 'bg-dark-bg border border-dark-border text-text-secondary hover:border-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Compare Button */}
                <button
                  onClick={() => setShowCompare(true)}
                  className="btn-secondary text-sm py-2 px-6 whitespace-nowrap"
                >
                  <SlidersHorizontal size={16} className="inline mr-2" />
                  Porovnat vše
                </button>
              </div>

              {/* Export Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-dark-border">
                <button
                  onClick={() => exportToCSV(locationsWithRatings)}
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
                >
                  <Download size={14} />
                  Stáhnout CSV
                </button>
                <button
                  onClick={async () => {
                    const success = await copyToClipboard(locationsWithRatings);
                    if (success) {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
                >
                  {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
                  {copied ? 'Zkopírováno!' : 'Kopírovat souhrn'}
                </button>
              </div>
            </div>

            {/* Main Content: Map + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar with Location Cards */}
              <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((item, displayIndex) => {
                    const originalIndex = locations.indexOf(item.location);
                    return (
                      <LocationCard
                        key={originalIndex}
                        location={item.location}
                        index={displayIndex}
                        rating={item.rating}
                        onSelect={() => setSelectedLocationIndex(originalIndex)}
                        isSelected={selectedLocationIndex === originalIndex}
                      />
                    );
                  })
                ) : (
                  <div className="glass rounded-xl p-8 text-center">
                    <Filter className="mx-auto mb-3 text-text-secondary" size={48} />
                    <p className="text-text-secondary">
                      Žádné lokality neodpovídají zvoleným filtrům
                    </p>
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <MapView
                  locations={locations}
                  ratings={ratings}
                  selectedIndex={selectedLocationIndex}
                  onMarkerClick={(index) => setSelectedLocationIndex(index)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* No results message */}
        {locations.length === 0 && !isGenerating && addresses && !error && (
          <div className="text-center py-12 glass rounded-2xl">
            <Map className="mx-auto mb-4 text-text-secondary" size={64} />
            <p className="text-text-secondary">Zadejte adresy a klikněte na "Analyzovat lokality"</p>
          </div>
        )}

        {/* CTA */}
        {locations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-12 text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-4">Začněte porovnávat lokality ještě dnes</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              3 analýzy denně zdarma. Žádná kreditní karta není potřeba.
            </p>
            <Link to="/kontakt" className="btn-primary text-lg px-12 py-4 inline-block">
              Zkuste zdarma →
            </Link>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {selectedLocationIndex !== null && (
        <LocationModal
          location={locations[selectedLocationIndex]}
          rating={ratings[selectedLocationIndex]}
          onClose={() => setSelectedLocationIndex(null)}
          onCompare={() => {
            setSelectedLocationIndex(null);
            setShowCompare(true);
          }}
        />
      )}

      {showCompare && (
        <CompareModal
          locations={locationsWithRatings}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
