import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert('Zpráva odeslána! Ozveme se vám do 24 hodin.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

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
            Kontaktujte <span className="text-gradient">nás</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Máte otázky? Napište nám a my se vám ozveme do 24 hodin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <Mail className="text-primary mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-text-secondary text-sm mb-4">
                Odpovídáme do 24 hodin
              </p>
              <a href="mailto:ahoj@mapprompt.cz" className="text-primary hover:underline">
                ahoj@mapprompt.cz
              </a>
            </div>

            <div className="glass rounded-2xl p-8">
              <MessageSquare className="text-accent-purple mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Live chat</h3>
              <p className="text-text-secondary text-sm mb-4">
                Po–Pá, 9:00–17:00
              </p>
              <button className="btn-secondary w-full">
                Spustit chat
              </button>
            </div>

            <div className="glass rounded-2xl p-8">
              <MapPin className="text-accent-green mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Adresa</h3>
              <p className="text-text-secondary text-sm">
                MapPrompt s.r.o.<br />
                Praha, Česká republika
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Napište nám</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Jméno *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary focus:border-primary focus:outline-none"
                      placeholder="Jan Novák"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-secondary">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary focus:border-primary focus:outline-none"
                      placeholder="jan@example.cz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Předmět *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary focus:border-primary focus:outline-none"
                    placeholder="Dotaz ohledně..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Zpráva *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-text-primary focus:border-primary focus:outline-none resize-none"
                    placeholder="Napište nám vaši zprávu..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full btn-primary ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <Send className="animate-pulse mr-2" size={20} />
                      Odesílám...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2" size={20} />
                      Odeslat zprávu
                    </span>
                  )}
                </button>

                <p className="text-text-secondary text-sm text-center">
                  Odesláním souhlasíte s našimi{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    zásadami ochrany osobních údajů
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Hledáte rychlou odpověď?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Možná najdete odpověď v našich často kladených otázkách
          </p>
          <Link to="/kontakt" className="btn-secondary">
            Přejít na FAQ →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
