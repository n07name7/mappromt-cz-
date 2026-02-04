# MapPrompt.cz — Kompletní Web

## ✅ Všechny stránky vytvořeny

### 🏠 Hlavní stránka (/)
- Hero sekce s animacemi
- Přehled 3 nástrojů (Bento Grid)
- Pricing sekce
- Footer

### 🛠️ Nástroje

#### 1. Mapa Nemovitostí AI (/mapa-nemovitosti)
- **Demo:** Textarea pro zadávání adres
- **Output:** Interaktivní náhled výsledku
- **Features:** Seznam všech možností (6 karet)
- **CTA:** Výzva k akci

#### 2. Analýza Území (/analyza-uzemi)
- **Demo:** Input pro adresu/souřadnice
- **Preview:** Náhled zprávy (zónování, infrastruktura, rizika)
- **What's Included:** 6 kategorií analýzy
- **Use Cases:** Pro developery, realitní agenty, architekty

#### 3. Hledač Lokací (/hledac-lokaci)
- **Demo:** Textarea + filtry (město, rozpočet, poloměr)
- **Results:** 3 doporučené lokality se score
- **Analysis Criteria:** 4 kategorie
- **Success Stories:** 3 případy úspěchu

### 📄 Informační stránky

#### O nás (/o-nas)
- Mise a vize
- Naše hodnoty (3 karty)
- Statistiky (4 metriky)
- Tým
- CTA

#### Kontakt (/kontakt)
- Kontaktní informace (email, chat, adresa)
- Kontaktní formulář (jméno, email, předmět, zpráva)
- Link na FAQ

#### Ceny (/pricing)
- Detail všech 3 plánů (Zdarma/Starter/Pro)
- Zvýraznění populárního plánu

---

## 🎨 Design Features

✅ **Dark Theme** — konzistentní napříč všemi stránkami  
✅ **Glassmorphism** — průhledné karty s blur efektem  
✅ **Framer Motion Animations** — fade-in, stagger, hover efekty  
✅ **Responsive Design** — mobile-first přístup  
✅ **Interactive Demos** — funkční formuláře a preview  
✅ **React Router** — plynulá navigace bez reload  
✅ **Dropdown Menu** — navigace v nástrojích (desktop)  

---

## 🚀 Technologie

- **React 19** + **TypeScript**
- **Vite** — bundler
- **Tailwind CSS 3** — styling
- **Framer Motion** — animace
- **React Router** — routing
- **Lucide React** — ikony

---

## 📁 Struktura

```
src/
├── components/
│   ├── Layout.tsx      # Wrapper s Navbar + Footer
│   ├── Navbar.tsx      # Navigace s dropdown menu
│   ├── Hero.tsx        # Hero sekce
│   ├── Tools.tsx       # 3 nástroje (homepage)
│   ├── Pricing.tsx     # Pricing sekce
│   └── Footer.tsx      # Footer
├── pages/
│   ├── Home.tsx             # Hlavní stránka
│   ├── MapaNemovitosti.tsx # Nástroj #1
│   ├── AnalyzaUzemi.tsx    # Nástroj #2
│   ├── HledacLokaci.tsx    # Nástroj #3
│   ├── ONas.tsx            # O nás
│   └── Kontakt.tsx         # Kontakt
└── App.tsx             # Router setup
```

---

## 🔗 Navigace

### Desktop:
- **Nástroje** (dropdown):
  - Mapa Nemovitostí AI
  - Analýza Území
  - Hledač Lokací
- **Ceny**
- **O nás**
- **Kontakt**

### Mobile:
- Hamburger menu se všemi odkazy

---

## 🌐 Live URL

**GitHub Pages:** https://n07name7.github.io/mappromt-cz-/

---

## 💻 Lokální vývoj

```bash
cd /home/ivan/clawd/projects/mapprompt-cz
npm run dev
```

URL: http://localhost:5173/

---

## 📦 Deploy

```bash
npm run build
npm run deploy
```

Automaticky deployuje na GitHub Pages (gh-pages branch).

---

## ✨ Interaktivní Features

### Mapa Nemovitostí:
- ✅ Zadávání adres v textarea
- ✅ Tlačítko "Vytvořit mapu" s animací
- ✅ Preview výsledku
- ✅ Počítadlo zpracovaných adres

### Analýza Území:
- ✅ Input pro adresu/souřadnice
- ✅ Tlačítko "Spustit analýzu"
- ✅ Preview zprávy (zónování, infrastruktura, rizika)
- ✅ Button "Stáhnout PDF"

### Hledač Lokací:
- ✅ Textarea + 3 filtry (město, rozpočet, poloměr)
- ✅ Tlačítko "Najít lokality"
- ✅ 3 výsledky se score a detaily
- ✅ Hover efekty na kartách

### Kontakt:
- ✅ Funkční formulář s validací
- ✅ Tlačítko "Odeslat zprávu" s animací
- ✅ Success message (alert)

---

## 📊 Performance

- **Bundle Size:** ~400 KB JS (gzipped: 124 KB)
- **CSS:** 22 KB (gzipped: 4.4 KB)
- **Total Pages:** 7
- **Components:** 13

---

## 🎯 Co dále?

### Možná vylepšení:
- [ ] FAQ stránka
- [ ] Blog (pokud bude obsah)
- [ ] Privacy Policy / Terms
- [ ] Real backend integrace (Supabase)
- [ ] Auth system (přihlášení/registrace)
- [ ] Real map preview (Mapbox API)
- [ ] SEO optimalizace (meta tags per page)
- [ ] Analytics (Plausible / PostHog)

---

## 📝 Poznámky

- Všechny formuláře jsou **pouze frontend** (žádný backend zatím)
- Mapy a analýzy jsou **mock data** (ukázky)
- Dropdown menu v navigaci funguje na hover (desktop)
- Všechny animace jsou **optimalizované** (Framer Motion)
- **Mobile-first** design — testováno na malých obrazovkách

---

**🚀 Projekt je kompletní a ready pro použití!**

Vytvořeno: **04.02.2026**  
Autor: **Claude Sonnet 4.5** (GitHub Copilot)  
Pro: **Iván** (@h629571540)
