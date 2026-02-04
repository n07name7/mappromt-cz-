import { motion } from 'framer-motion';
import { Map, Upload, Download, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../components/MapView';

interface Location {
  address: string;
  lat: number;
  lon: number;
  display_name: string;
  poi_nearby?: {
    transport?: Array<{ name: string; distance: number }>;
    schools?: Array<{ name: string; distance: number }>;
    shops?: Array<{ name: string; distance: number }>;
  };
}

export default function MapaNemovitosti() {
  const [addresses, setAddresses] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setLocations([]);

    try {
      const addressList = addresses.split('\n').filter((a) => a.trim());

      if (addressList.length === 0) {
        setError('Zadejte alespoň jednu adresu');
        setIsGenerating(false);
        return;
      }

      const response = await fetch('https://mapprompt-backend1.vercel.app/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: addressList }),
      });

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

        // Show warning if some addresses failed
        const failedCount = data.results.filter((r: any) => r.status === 'error').length;
        if (failedCount > 0) {
          setError(
            `⚠️ ${failedCount} ${failedCount === 1 ? 'adresa nebyla nalezena' : 'adresy nebyly nalezeny'}. Zobrazeno ${successfulLocations.length} z ${data.results.length}.`
          );
        }
      }
    } catch (err) {
      console.error('Error geocoding:', err);
      setError(
        'Nepodařilo se spojit s API. Je backend spuštěný? (Zkontrolujte http://localhost:3000)'
      );
    } finally {
      setIsGenerating(false);
    }
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
            <span className="text-sm text-text-secondary">Nástroj #1</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Mapa Nemovitostí <span className="text-gradient">AI</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Zadejte seznam adres a AI vytvoří profesionální interaktivní mapu s analýzou
            infrastruktury za 30 vteřin.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontakt" className="btn-primary">
              Zkuste zdarma →
            </Link>
            <button className="btn-secondary">Podívejte se na demo</button>
          </div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          {/* Input Section */}
          <div className="glass rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Upload className="mr-2 text-primary" size={24} />
              Zadejte adresy
            </h3>
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
                  Vytváříme mapu...
                </span>
              ) : (
                'Vytvořit mapu'
              )}
            </button>
          </div>

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

          {/* Map Display */}
          {locations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold flex items-center">
                  <Download className="mr-2 text-accent-green" size={24} />
                  Vaše mapa
                </h3>
                <div className="text-sm text-text-secondary">
                  {locations.length} {locations.length === 1 ? 'adresa' : 'adresy'} zobrazeno
                </div>
              </div>

              <MapView locations={locations} />

              {/* Export buttons (placeholders for now) */}
              <div className="flex gap-3 justify-center mt-6">
                <button
                  className="btn-secondary text-sm py-2 px-6"
                  onClick={() => alert('Export do PNG bude dostupný brzy!')}
                >
                  Stáhnout PNG
                </button>
                <button
                  className="btn-secondary text-sm py-2 px-6"
                  onClick={() => alert('Export do PDF bude dostupný brzy!')}
                >
                  Stáhnout PDF
                </button>
              </div>
            </motion.div>
          )}

          {/* No results message */}
          {locations.length === 0 && !isGenerating && addresses && !error && (
            <div className="text-center py-12 glass rounded-2xl">
              <Map className="mx-auto mb-4 text-text-secondary" size={64} />
              <p className="text-text-secondary">Zadejte adresy a klikněte na "Vytvořit mapu"</p>
            </div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Co všechno mapa obsahuje?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Přesné značky', desc: 'Všechny adresy přesně umístěné na mapě' },
              { title: 'Okolní infrastruktura', desc: 'MHD, školy, obchody v okolí' },
              { title: 'Interaktivní', desc: 'Klikatelné markery s detaily' },
              { title: 'Export do PDF/PNG', desc: 'Stáhněte si v libovolném formátu' },
              { title: 'Vlastní branding', desc: 'Přidejte logo vaší firmy (Pro plan)' },
              { title: 'GeoJSON export', desc: 'Pro další použití v GIS nástrojích' },
            ].map((feature, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <Check className="text-accent-green mb-3" size={24} />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Začněte tvořit mapy ještě dnes</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            3 generace denně zdarma. Žádná kreditní karta není potřeba.
          </p>
          <Link to="/kontakt" className="btn-primary text-lg px-12 py-4 inline-block">
            Zkuste zdarma →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
