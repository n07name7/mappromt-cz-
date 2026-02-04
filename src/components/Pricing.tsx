import { motion } from 'framer-motion';
import { Check, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Zdarma',
    price: '0',
    period: 'navždy',
    description: 'Pro vyzkoušení',
    features: [
      '3 generace denně',
      'Základní mapy',
      'Export PNG',
      'Email podpora',
    ],
    cta: 'Začít zdarma',
    popular: false,
    icon: Zap,
  },
  {
    name: 'Starter',
    price: '249',
    period: 'měsíčně',
    description: 'Pro malé agentury',
    features: [
      '50 adres / 10 analýz',
      'Pokročilé mapy',
      'Export PDF + GeoJSON',
      'Prioritní podpora',
      'Bez loga MapPrompt',
    ],
    cta: 'Vyzkoušet 14 dní zdarma',
    popular: true,
    icon: Crown,
  },
  {
    name: 'Pro',
    price: '499',
    period: 'měsíčně',
    description: 'Pro profesionály',
    features: [
      'Neomezené generace',
      'Vlastní branding',
      'API přístup',
      'Dedikovaný účet manažer',
      'SLA 99.9%',
    ],
    cta: 'Kontaktovat prodej',
    popular: false,
    icon: Crown,
  },
];

export default function Pricing() {
  return (
    <section id="ceny" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Transparentní ceny
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Žádné skryté poplatky. Můžete kdykoli zrušit.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`
                glass rounded-2xl p-8 relative
                ${plan.popular ? 'md:scale-105 border-2 border-primary/50 shadow-2xl shadow-primary/20' : 'border border-dark-border'}
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent-purple px-6 py-2 rounded-full text-sm font-semibold">
                    Nejpopulárnější
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                <plan.icon className={`w-10 h-10 ${plan.popular ? 'text-primary' : 'text-text-secondary'}`} />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-text-secondary mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-text-secondary ml-2">Kč</span>
                </div>
                <div className="text-text-secondary text-sm mt-1">
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`
                  w-full py-3 rounded-lg font-medium transition-all
                  ${plan.popular 
                    ? 'btn-primary' 
                    : 'btn-secondary'}
                `}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-text-secondary"
        >
          <p>Potřebujete více? Kontaktujte nás pro Enterprise řešení</p>
        </motion.div>
      </div>
    </section>
  );
}
