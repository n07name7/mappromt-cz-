import { motion } from 'framer-motion';
import { Target, Users, Zap, Heart } from 'lucide-react';

export default function ONas() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            O <span className="text-gradient">MapPrompt</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Naším cílem je demokratizovat přístup k GIS nástrojům a zpřístupnit 
            geografické analýzy každému podnikateli v České republice.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div className="glass rounded-2xl p-8">
            <Target className="text-primary mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">Naše mise</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Profesionální GIS nástroje jako ArcGIS stojí tisíce korun měsíčně 
              a vyžadují týdny školení. Google My Maps je příliš jednoduchý. 
            </p>
            <p className="text-text-secondary leading-relaxed">
              <strong className="text-text-primary">MapPrompt</strong> kombinuje 
              sílu AI s otevřenými geodaty, aby každý mohl vytvářet profesionální 
              mapy a analýzy za zlomek ceny a času.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <Zap className="text-accent-purple mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">Proč existujeme</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Viděli jsme, jak malé firmy platí geodezy tisíce korun za základní 
              mapy. Jak realitní agenti ručně kreslí trasy v Paintu.
            </p>
            <p className="text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Chtěli jsme to změnit.</strong> Dnes 
              může každý vytvořit profesionální mapu za 30 vteřin, místo 3 hodin.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Naše hodnoty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Jednoduchost',
                desc: 'Nástroje musí být intuitivní. Pokud to vyžaduje manuál, není to dost jednoduché.',
              },
              {
                icon: Zap,
                title: 'Rychlost',
                desc: 'Čas jsou peníze. Náš cíl: Výsledek za 30 vteřin, ne 3 hodiny.',
              },
              {
                icon: Users,
                title: 'Dostupnost',
                desc: 'GIS nástroje by neměly být luxus. Každý má právo na geografická data.',
              },
            ].map((value, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center">
                <value.icon className="mx-auto text-primary mb-4" size={48} />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Naše čísla</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Spokojených klientů' },
              { value: '5 000+', label: 'Vytvořených map' },
              { value: '< 30s', label: 'Průměrný čas' },
              { value: '98%', label: 'Spokojenost' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Náš tým</h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Jsme malý tým zaměřený na vytváření nástrojů, které opravdu pomáhají. 
            Žádný corporate bullshit, jen poctivá práce.
          </p>
          <div className="text-center">
            <div className="inline-block glass rounded-2xl p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent-purple rounded-full mx-auto mb-4" />
              <h3 className="font-bold text-lg">Zatím malý tým</h3>
              <p className="text-text-secondary text-sm mt-2">Ale s velkými ambicemi 🚀</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Připojte se k nám</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Staňte se součástí revoluce v českých GIS nástrojích. Začněte ještě dnes.
          </p>
          <button className="btn-primary text-lg px-12 py-4">
            Zkuste MapPrompt zdarma →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
