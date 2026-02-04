import { motion } from 'framer-motion';
import { Map, BarChart3, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    icon: Map,
    title: 'Mapa Nemovitostí AI',
    description: 'Zadejte adresy → AI vytvoří interaktivní mapu s infrastrukturou a analýzou',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1,
    link: '/mapa-nemovitosti',
  },
  {
    icon: BarChart3,
    title: 'Analýza Území',
    description: 'Vložte souřadnice → Získejte kompletní zprávu o zónování, rizicích a demografii',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2,
    link: '/analyza-uzemi',
  },
  {
    icon: MapPin,
    title: 'Hledač Lokací',
    description: 'Popište byznys → AI najde nejlepší místa pro vaši pobočku či investici',
    color: 'from-emerald-500 to-teal-500',
    delay: 0.3,
    link: '/hledac-lokaci',
  },
];

export default function Tools() {
  return (
    <section id="nastroje" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tři nástroje. Nekonečné možnosti.
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Všechno co potřebujete pro práci s geodaty. Jednoduché, rychlé, přesné.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: tool.delay, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-8 card-hover group relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} p-3 mb-6`}
              >
                <tool.icon className="w-full h-full text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                {tool.title}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* CTA Link */}
              <Link 
                to={tool.link}
                className="inline-flex items-center space-x-2 text-primary group-hover:text-accent-purple transition-colors"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <span className="font-medium">Vyzkoušet</span>
                  <ArrowRight size={16} />
                </motion.div>
              </Link>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            Všechny nástroje dostupné v jednom plánu
          </p>
          <button className="btn-primary">
            Začít zdarma →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
