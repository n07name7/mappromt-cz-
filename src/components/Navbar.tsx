import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg" />
            <span className="text-xl font-bold">MapPrompt</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#nastroje" className="text-text-secondary hover:text-text-primary transition-colors">
              Nástroje
            </a>
            <a href="#ceny" className="text-text-secondary hover:text-text-primary transition-colors">
              Ceny
            </a>
            <a href="#blog" className="text-text-secondary hover:text-text-primary transition-colors">
              Blog
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              Přihlásit se
            </button>
            <button className="btn-primary">
              Zkuste zdarma
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-dark-border"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#nastroje" className="block text-text-secondary hover:text-text-primary transition-colors">
                Nástroje
              </a>
              <a href="#ceny" className="block text-text-secondary hover:text-text-primary transition-colors">
                Ceny
              </a>
              <a href="#blog" className="block text-text-secondary hover:text-text-primary transition-colors">
                Blog
              </a>
              <div className="pt-4 space-y-2">
                <button className="w-full btn-secondary">
                  Přihlásit se
                </button>
                <button className="w-full btn-primary">
                  Zkuste zdarma
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
