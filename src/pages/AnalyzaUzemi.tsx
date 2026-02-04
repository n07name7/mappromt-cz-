import { motion } from 'framer-motion';
import { BarChart3, MapPin, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

export default function AnalyzaUzemi() {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
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
            <BarChart3 size={16} className="text-accent-purple" />
            <span className="text-sm text-text-secondary">Nástroj #2</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Analýza <span className="text-gradient">Území</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Vložte adresu nebo souřadnice a získejte kompletní zprávu o zónování, 
            infrastruktuře, rizicích a demografii za pár vteřin.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              Zkuste zdarma →
            </button>
            <button className="btn-secondary">
              Ukázková zpráva (PDF)
            </button>
          </div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6">Vyzkoušejte si analýzu</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                Adresa nebo souřadnice
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Např: Václavské náměstí, Praha nebo 50.0755, 14.4378"
                className="w-full bg-dark-bg border border-dark-border rounded-lg p-4 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none mb-4"
              />
              
              <button
                onClick={handleAnalyze}
                disabled={!address || isAnalyzing}
                className={`w-full btn-primary ${(!address || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <Sparkles className="animate-spin mr-2" size={20} />
                    Analyzuji území...
                  </span>
                ) : (
                  'Spustit analýzu'
                )}
              </button>
            </div>

            {/* Preview Report */}
            <div className="bg-dark-bg border border-dark-border rounded-lg p-6 overflow-y-auto max-h-96">
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <Sparkles className="animate-spin mx-auto mb-4 text-accent-purple" size={48} />
                  <p className="text-text-secondary">Zpracovávám data z ČÚZK, ČSÚ a OSM...</p>
                </div>
              ) : address ? (
                <div className="space-y-4">
                  <div className="border-b border-dark-border pb-4">
                    <h4 className="font-bold text-lg mb-2">📍 Lokalita</h4>
                    <p className="text-text-secondary text-sm">{address}</p>
                  </div>
                  
                  <div className="border-b border-dark-border pb-4">
                    <h4 className="font-bold mb-2">🏘️ Zónování</h4>
                    <p className="text-accent-green text-sm">Obytná zóna (smíšená)</p>
                  </div>
                  
                  <div className="border-b border-dark-border pb-4">
                    <h4 className="font-bold mb-2">🚇 Infrastruktura (500m)</h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 3 stanice MHD</li>
                      <li>• 2 školy</li>
                      <li>• 5 obchodů</li>
                    </ul>
                  </div>
                  
                  <div className="border-b border-dark-border pb-4">
                    <h4 className="font-bold mb-2 flex items-center">
                      <AlertTriangle size={16} className="text-accent-orange mr-2" />
                      Rizika
                    </h4>
                    <p className="text-text-secondary text-sm">Nízké riziko záplav, mírný hluk z hlavní silnice</p>
                  </div>
                  
                  <button className="btn-secondary w-full text-sm">
                    Stáhnout kompletní zprávu (PDF)
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="mx-auto mb-4 text-text-secondary/30" size={48} />
                  <p className="text-text-secondary">Zadejte adresu pro zobrazení náhledu zprávy</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Co obsahuje analýza?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏘️', title: 'Územní plánování', desc: 'Zónování, stavební omezení' },
              { icon: '🚇', title: 'Doprava', desc: 'MHD, parkoviště, dostupnost' },
              { icon: '🏫', title: 'Občanská vybavenost', desc: 'Školy, zdravotnictví, úřady' },
              { icon: '🛒', title: 'Obchody & služby', desc: 'Supermarkety, restaurace' },
              { icon: '⚠️', title: 'Rizika', desc: 'Povodně, hluk, kontaminace' },
              { icon: '📊', title: 'Demografie', desc: 'Obyvatelstvo, věk, příjmy' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Pro koho je to?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Developeři', desc: 'Vyhodnocení stavebních pozemků před nákupem' },
              { title: 'Realitní agenti', desc: 'Detailní info pro klienty o okolí nemovitosti' },
              { title: 'Architekti', desc: 'Podklady pro projekty a studie proveditelnosti' },
            ].map((use, i) => (
              <div key={i} className="glass rounded-xl p-6 text-center">
                <Check className="mx-auto text-accent-green mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">{use.title}</h3>
                <p className="text-text-secondary text-sm">{use.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Začněte analyzovat ještě dnes</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            1 analýza denně zdarma. Žádná kreditní karta není potřeba.
          </p>
          <button className="btn-primary text-lg px-12 py-4">
            Zkuste zdarma →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
