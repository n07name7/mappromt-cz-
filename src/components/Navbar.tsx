import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg" />
              <span className="text-xl font-bold">MapPrompt</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-text-secondary hover:text-text-primary transition-colors">
                Nástroje
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 glass rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/mapa-nemovitosti" className="block px-4 py-3 hover:bg-dark-bg/50 rounded-lg">
                  <div className="font-medium text-text-primary">Mapa Nemovitostí AI</div>
                  <div className="text-xs text-text-secondary">Adresy → mapa</div>
                </Link>
                <Link to="/analyza-uzemi" className="block px-4 py-3 hover:bg-dark-bg/50 rounded-lg">
                  <div className="font-medium text-text-primary">Analýza Území</div>
                  <div className="text-xs text-text-secondary">Kompletní zpráva</div>
                </Link>
                <Link to="/hledac-lokaci" className="block px-4 py-3 hover:bg-dark-bg/50 rounded-lg">
                  <div className="font-medium text-text-primary">Hledač Lokací</div>
                  <div className="text-xs text-text-secondary">Najděte místo pro byznys</div>
                </Link>
              </div>
            </div>
            <Link 
              to="/pricing" 
              className={`transition-colors ${isActive('/pricing') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Ceny
            </Link>
            <Link 
              to="/o-nas" 
              className={`transition-colors ${isActive('/o-nas') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              O nás
            </Link>
            <Link 
              to="/kontakt" 
              className={`transition-colors ${isActive('/kontakt') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Kontakt
            </Link>
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
              <Link to="/mapa-nemovitosti" className="block text-text-secondary hover:text-text-primary transition-colors">
                Mapa Nemovitostí AI
              </Link>
              <Link to="/analyza-uzemi" className="block text-text-secondary hover:text-text-primary transition-colors">
                Analýza Území
              </Link>
              <Link to="/hledac-lokaci" className="block text-text-secondary hover:text-text-primary transition-colors">
                Hledač Lokací
              </Link>
              <Link to="/pricing" className="block text-text-secondary hover:text-text-primary transition-colors">
                Ceny
              </Link>
              <Link to="/o-nas" className="block text-text-secondary hover:text-text-primary transition-colors">
                O nás
              </Link>
              <Link to="/kontakt" className="block text-text-secondary hover:text-text-primary transition-colors">
                Kontakt
              </Link>
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
