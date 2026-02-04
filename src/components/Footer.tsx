import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-dark-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg" />
              <span className="text-xl font-bold">MapPrompt</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              AI-powered GIS nástroje pro českou republiku
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Nástroje */}
          <div>
            <h4 className="font-semibold mb-4">Nástroje</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Mapa Nemovitostí AI
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Analýza Území
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Hledač Lokací
                </a>
              </li>
            </ul>
          </div>

          {/* Firma */}
          <div>
            <h4 className="font-semibold mb-4">Firma</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  O nás
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Kariéra
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Právní */}
          <div>
            <h4 className="font-semibold mb-4">Právní</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Ochrana osobních údajů
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Podmínky použití
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Cookies
                </a>
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
