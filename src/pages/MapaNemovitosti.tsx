import { motion } from 'framer-motion';
import { Map, Upload, Download, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

export default function MapaNemovitosti() {
  const [addresses, setAddresses] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
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
            Zadejte seznam adres a AI vytvoří profesionální interaktivní mapu 
            s analýzou infrastruktury za 30 vteřin.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              Zkuste zdarma →
            </button>
            <button className="btn-secondary">
              Podívejte se na demo
            </button>
          </div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Input */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Upload className="mr-2 text-primary" size={24} />
              Zadejte adresy
            </h3>
            <textarea
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              placeholder="Vítězná 1, Praha 1&#10;Karlovo náměstí 13, Praha 2&#10;Wenceslas Square 25, Prague 1"
              className="w-full h-64 bg-dark-bg border border-dark-border rounded-lg p-4 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!addresses || isGenerating}
              className={`mt-4 w-full btn-primary ${(!addresses || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <Sparkles className="animate-spin mr-2" size={20} />
                  Generování...
                </span>
              ) : (
                'Vytvořit mapu'
              )}
            </button>
          </div>

          {/* Output */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Download className="mr-2 text-accent-green" size={24} />
              Výsledek
            </h3>
            <div className="w-full h-64 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <Sparkles className="animate-spin mx-auto mb-2 text-primary" size={48} />
                  <p className="text-text-secondary">Vytváříme vaši mapu...</p>
                </div>
              ) : addresses ? (
                <div className="text-center p-8">
                  <Map className="mx-auto mb-4 text-accent-green" size={64} />
                  <p className="text-text-primary font-semibold mb-2">Mapa připravena!</p>
                  <p className="text-text-secondary text-sm mb-4">
                    {addresses.split('\n').filter(a => a.trim()).length} adres zpracováno
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="btn-secondary text-sm py-2 px-4">Stáhnout PNG</button>
                    <button className="btn-secondary text-sm py-2 px-4">Stáhnout PDF</button>
                  </div>
                </div>
              ) : (
                <p className="text-text-secondary">Zadejte adresy a klikněte na "Vytvořit mapu"</p>
              )}
            </div>
          </div>
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
          <button className="btn-primary text-lg px-12 py-4">
            Zkuste zdarma →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
