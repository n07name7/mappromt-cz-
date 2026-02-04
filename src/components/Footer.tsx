import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-dark-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg" />
              <span className="text-xl font-bold">MapPrompt</span>
            </Link>
            <p className="text-text-secondary text-sm mb-4">
              AI-powered GIS nástroje pro českou republiku
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" className="text-text-secondary hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-text-secondary hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:ahoj@mapprompt.cz" className="text-text-secondary hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Nástroje */}
          <div>
            <h4 className="font-semibold mb-4">Nástroje</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/mapa-nemovitosti" className="text-text-secondary hover:text-text-primary transition-colors">
                  Mapa Nemovitostí AI
                </Link>
              </li>
              <li>
                <Link to="/analyza-uzemi" className="text-text-secondary hover:text-text-primary transition-colors">
                  Analýza Území
                </Link>
              </li>
              <li>
                <Link to="/hledac-lokaci" className="text-text-secondary hover:text-text-primary transition-colors">
                  Hledač Lokací
                </Link>
              </li>
            </ul>
          </div>

          {/* Firma */}
          <div>
            <h4 className="font-semibold mb-4">Firma</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/o-nas" className="text-text-secondary hover:text-text-primary transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-text-secondary hover:text-text-primary transition-colors">
                  Ceny
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-text-secondary hover:text-text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Právní */}
          <div>
            <h4 className="font-semibold mb-4">Právní</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/kontakt" className="text-text-secondary hover:text-text-primary transition-colors">
                  Ochrana osobních údajů
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-text-secondary hover:text-text-primary transition-colors">
                  Podmínky použití
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-text-secondary hover:text-text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-border mt-8 pt-8 text-center">
          <p className="text-text-secondary text-sm">
            © {currentYear} MapPrompt.cz — Vytvořeno s ❤️ v České republice
          </p>
        </div>
      </div>
    </footer>
  );
}
