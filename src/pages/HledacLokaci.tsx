import { motion } from 'framer-motion';
import { MapPin, Search, TrendingUp, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

export default function HledacLokaci() {
  const [business, setBusiness] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 3000);
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
            <MapPin size={16} className="text-accent-green" />
            <span className="text-sm text-text-secondary">Nástroj #3</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Hledač <span className="text-gradient">Lokací</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Popište váš byznys a AI najde nejlepší místa pro pobočku, 
            investici nebo expanzi na základě analýzy konkurence a demografických dat.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              Zkuste zdarma →
            </button>
            <button className="btn-secondary">
              Případové studie
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
          <h3 className="text-2xl font-bold mb-6">Najděte ideální lokalitu</h3>
          
          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">
                Popište váš byznys
              </label>
              <textarea
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Např: Chci otevřít kavárnu v Praze pro mladé profesionály. Rozpočet 50 000 Kč/měsíc na pronájem. Preferuji centrum nebo Vinohrady."
                className="w-full h-32 bg-dark-bg border border-dark-border rounded-lg p-4 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Město</label>
                <select className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary focus:border-primary focus:outline-none">
                  <option>Praha</option>
                  <option>Brno</option>
                  <option>Ostrava</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Rozpočet (Kč/měsíc)</label>
                <input
                  type="number"
                  placeholder="50 000"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Poloměr (km)</label>
                <input
                  type="number"
                  placeholder="5"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!business || isSearching}
              className={`w-full btn-primary ${(!business || isSearching) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSearching ? (
                <span className="flex items-center justify-center">
                  <Sparkles className="animate-spin mr-2" size={20} />
                  Hledám nejlepší lokality...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Search className="mr-2" size={20} />
                  Najít lokality
                </span>
              )}
            </button>

            {/* Results */}
            {(isSearching || business) && (
              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-lg">🎯 Doporučené lokality:</h4>
                
                {isSearching ? (
                  <div className="text-center py-12">
                    <Sparkles className="animate-spin mx-auto mb-4 text-accent-green" size={48} />
                    <p className="text-text-secondary">Analyzuji konkurenci a demografii...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Vinohrady, Mánesova', score: 95, traffic: 'Vysoký', competition: 'Střední', price: '45 000 Kč' },
                      { name: 'Karlín, Křižíkova', score: 92, traffic: 'Velmi vysoký', competition: 'Vysoká', price: '55 000 Kč' },
                      { name: 'Letná, Milady Horákové', score: 88, traffic: 'Střední', competition: 'Nízká', price: '40 000 Kč' },
                    ].map((loc, i) => (
                      <div key={i} className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-bold">{loc.name}</h5>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="text-accent-green" size={16} />
                            <span className="text-accent-green font-bold">{loc.score}%</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Pěší provoz:</span>
                            <span className="text-text-primary">{loc.traffic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Konkurence:</span>
                            <span className="text-text-primary">{loc.competition}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Pronájem:</span>
                            <span className="text-accent-green font-bold">{loc.price}</span>
                          </div>
                        </div>
                        <button className="mt-4 w-full btn-secondary text-sm py-2">
                          Zobrazit detail
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Analysis Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Co analyzujeme?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👥', title: 'Demografie', desc: 'Věk, příjmy, životní styl' },
              { icon: '🏪', title: 'Konkurence', desc: 'Počet a typ konkurentů' },
              { icon: '🚶', title: 'Pěší provoz', desc: 'Denní průchod lidí' },
              { icon: '💰', title: 'Ceny nemovitostí', desc: 'Pronájem a prodej' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Úspěšné případy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { business: 'Kavárna', result: '+40% tržby', desc: 'Díky výběru správné lokality' },
              { business: 'Fitness', result: '200 členů', desc: 'Za první 3 měsíce' },
              { business: 'Obchod', result: 'ROI 18 měsíců', desc: 'Návratnost investice' },
            ].map((story, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <Check className="text-accent-green mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">{story.business}</h3>
                <div className="text-2xl font-bold text-accent-green mb-2">{story.result}</div>
                <p className="text-text-secondary text-sm">{story.desc}</p>
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
          <h2 className="text-3xl font-bold mb-4">Najděte ideální místo pro váš byznys</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            3 hledání denně zdarma. Začněte hned, bez registrace.
          </p>
          <button className="btn-primary text-lg px-12 py-4">
            Zkuste zdarma →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
