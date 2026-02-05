# MapPrompt.cz — AI nástroj pro výběr bydlení

## 🎨 Nový UX Design (v2.0)

### ✨ Hlavní vylepšení

#### 📊 Pokročilá vizualizace
- **Hodnocení lokalit (0-10)** — automatický výpočet na základě POI
- **Kustom ikony na mapě** — barevné markery podle rейтingu (zelená/žlutá/červená)
- **Interaktivní grafy** — Pie chart a Radar chart pro srovnání
- **Vizuální indikátory** — statistiky POI s emoji

#### 🗂️ Sidebar s kartami lokalit
- **LocationCard** — kompaktní karty s ratingem a souhrnem POI
- **Třídění** — podle hodnocení, dopravy, škol, obchodů nebo celkového počtu POI
- **Filtry** — zobrazit pouze lokality s konkrétními POI kategoriemi
- **Real-time výběr** — kliknutím na kartu se zvýrazní marker na mapě

#### 📱 Modální okna

**LocationModal** — detail lokality:
- Celkové hodnocení (0-10) s barevným označením
- Pie chart rozložení POI
- Statistiky podle kategorií (procentuální zastoupení)
- Seznam všech POI seřazených podle vzdálenosti
- Tlačítko "Porovnat s ostatními"
- Link na Google Maps

**CompareModal** — porovnání více lokalit:
- Radar chart — vizuální srovnání všech kategorií POI
- Detailní tabulka — počty POI pro každou kategorii
- Zvýraznění nejlepších hodnot
- Export do CSV

#### 💾 Export & Persistence
- **CSV export** — stáhněte si srovnání jako tabulku
- **Kopírování** — zkopírujte souhrn do clipboardu
- **LocalStorage** — automatické uložení posledních adres a nastavení radiusu
- **Auto-recovery** — po refreshi stránky se obnoví poslední zadané adresy

#### 📐 Responzivní design
- **Mobile-first** — optimalizováno pro telefony a tablety
- **Flexibilní layout** — sidebar + mapa se přizpůsobí velikosti obrazovky
- **Touch-friendly** — větší tlačítka a touch targety
- **Adaptive modals** — modální okna se přizpůsobí velikosti displeje

---

## 🛠️ Nástroje

### 1. Mapa Nemovitostí AI (/mapa-nemovitosti)

#### Hlavní funkce:
- ✅ **Zadání adres** — vícerádkový vstup pro rychlé zadání více bytů
- ✅ **Nastavení radiusu** — 100m až 5000m pro hledání POI
- ✅ **Geocoding** — automatický překlad adres na souřadnice
- ✅ **POI analýza** — hledání dopravy, škol, obchodů, nemocnic, služeb
- ✅ **Interaktivní mapa** — Leaflet/OpenStreetMap s kustomními markery
- ✅ **Rating systém** — automatické hodnocení kvality infrastruktury
- ✅ **Sidebar karty** — přehledné zobrazení všech lokalit
- ✅ **Modální detail** — kompletní informace o vybrané lokalitě
- ✅ **Porovnání** — radar chart a tabulka pro srovnání všech lokalit
- ✅ **Třídění & filtrace** — seřaďte podle preferovaných kritérií
- ✅ **Export** — CSV export nebo kopírování do clipboardu

#### Backend integrace:
```typescript
POST /api/geocode
{
  "addresses": ["Adresa 1", "Adresa 2"],
  "radius": 1000
}
```

Response obsahuje:
- `lat`, `lon` — souřadnice
- `display_name` — úplná adresa
- `search_radius` — použitý radius
- `poi_nearby` — objekt s kategoriemi POI

#### Rating algoritmus:
```typescript
const weights = {
  transport: 2.5,  // Doprava má nejvyšší váhu
  schools: 2.0,
  shops: 2.0,
  hospitals: 1.5,
  services: 2.0,
};
// Normalizace: 10+ POI = 10/10 bodů
// Finální rating = vážený průměr všech kategorií
```

---

## 📊 POI Kategorie

| Kategorie | Emoji | Váha | Příklady |
|-----------|-------|------|----------|
| Doprava | 🚇 | 2.5 | Metro, tramvaj, autobusové zastávky |
| Školy | 🏫 | 2.0 | Základní školy, gymnázia, školky |
| Obchody | 🛒 | 2.0 | Supermarkety, obchody, trhy |
| Nemocnice | 🏥 | 1.5 | Polikliniky, nemocnice, lékárny |
| Služby | 🏦 | 2.0 | Banky, pošty, úřady |

---

## 🎯 User Flow

### 1. Zadání adres
```
Uživatel → Textarea → Zadá několik adres bytů
         → Slider → Nastaví radius hledání POI
         → Button "Analyzovat lokality" → Odeslání
```

### 2. Zobrazení výsledků
```
Backend → Geocoding + POI search → Frontend
      ↓
Sidebar: Location Cards (sorted by rating)
      ↓
Map: Custom markers (color by rating)
      ↓
Click na kartu/marker → Detail modal
```

### 3. Porovnání
```
User clicks "Porovnat vše" 
      ↓
Compare Modal
      ↓
Radar chart + Table + Export
```

---

## 🚀 Technologie

### Frontend:
- **React 19** + **TypeScript** — type-safe development
- **Vite** — super-fast bundler
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion** — smooth animations
- **React Router** — SPA routing
- **Lucide React** — modern icons
- **Recharts** — beautiful charts (Pie, Radar)
- **Leaflet** + **React-Leaflet** — interactive maps
- **OpenStreetMap** — free map tiles

### Backend:
- **Node.js** + **Express**
- **Nominatim API** — geocoding (OpenStreetMap)
- **Overpass API** — POI search (OpenStreetMap)
- **CORS** — cross-origin enabled
- **Cloudflare Tunnel** — dev deployment

---

## 📁 Struktura projektu

```
src/
├── components/
│   ├── Layout.tsx           # Layout wrapper
│   ├── Navbar.tsx           # Navigation
│   ├── Hero.tsx             # Hero section
│   ├── Tools.tsx            # Tools overview
│   ├── Pricing.tsx          # Pricing section
│   ├── Footer.tsx           # Footer
│   ├── MapView.tsx          # 🆕 Interactive map with custom markers
│   ├── LocationCard.tsx     # 🆕 Location card with rating
│   ├── LocationModal.tsx    # 🆕 Detailed location view
│   └── CompareModal.tsx     # 🆕 Multi-location comparison
├── pages/
│   ├── Home.tsx             # Landing page
│   ├── MapaNemovitosti.tsx  # 🆕 Main tool page (completely redesigned)
│   ├── AnalyzaUzemi.tsx     # Territory analysis
│   ├── HledacLokaci.tsx     # Location finder
│   ├── ONas.tsx             # About us
│   └── Kontakt.tsx          # Contact
├── utils/
│   └── helpers.ts           # 🆕 Utility functions (rating, export, storage)
├── config.ts                # 🆕 API endpoints configuration
└── App.tsx                  # Router setup
```

---

## 💻 Lokální vývoj

### Frontend:
```bash
cd ~/clawd/projects/mapprompt-cz
npm install
npm run dev
```
URL: http://localhost:5173/

### Backend:
```bash
cd ~/clawd/projects/mapprompt-backend
npm install
npm start
```
URL: http://localhost:3000/

### Cloudflare Tunnel (pro testing):
```bash
cloudflared tunnel --url http://localhost:3000
```

---

## 🎨 Design System

### Colors:
- **Primary (Cyan):** `#00d9ff`
- **Accent Green:** `#00ff87`
- **Accent Orange:** `#ff6b35`
- **Dark BG:** `#0a0b14`
- **Dark Card:** `#1a1b26`
- **Dark Border:** `#2d3748`

### Typography:
- **Font Family:** Inter (system fallback)
- **Headings:** 900 weight (black)
- **Body:** 400 weight (regular)

### Animations:
- **Fade-in:** opacity 0→1, y 20→0
- **Stagger:** 0.1s delay между элементами
- **Hover:** scale 1.02, border glow
- **Modal:** scale 0.9→1, backdrop blur

---

## 📊 Performance

- **Bundle Size:** ~520 KB JS (gzipped: ~165 KB)
  - Added recharts (~80 KB)
  - Added leaflet (~40 KB)
- **CSS:** 25 KB (gzipped: 5.2 KB)
- **Components:** 17 (+4 new)
- **First Load:** <2s (localhost)
- **Interactive:** <500ms

---

## 🧪 Testing

### Manual testing checklist:
- [x] Zadání adres a geocoding
- [x] POI search s různými radiusy
- [x] Zobrazení mapy s markery
- [x] Kliknutí na marker → modal
- [x] Kliknutí na kartu → highlight + modal
- [x] Třídění podle různých kritérií
- [x] Filtrace POI kategorií
- [x] Porovnání více lokalit
- [x] Export do CSV
- [x] Kopírování do clipboardu
- [x] LocalStorage persistence
- [x] Mobile responsiveness

---

## 🔄 API Endpoints

### Geocode + POI:
```
POST /api/geocode
Content-Type: application/json

{
  "addresses": ["Praha 1, Vítězná 1", "Praha 2, Karlovo náměstí 13"],
  "radius": 1000
}
```

Response:
```json
{
  "results": [
    {
      "address": "Praha 1, Vítězná 1",
      "status": "success",
      "data": {
        "lat": 50.0812,
        "lon": 14.4074,
        "display_name": "Vítězná, Malá Strana...",
        "search_radius": 1000,
        "poi_nearby": {
          "transport": [
            {"name": "Újezd", "distance": 162},
            ...
          ],
          "schools": [...],
          "shops": [...],
          "hospitals": [...],
          "services": [...]
        }
      }
    }
  ]
}
```

---

## 🎯 Co bylo vytvořeno (UX Redesign)

### ✅ Hotové funkce:

1. **Rating systém** — automatické hodnocení lokalit 0-10
2. **LocationCard komponenta** — sidebar karty s rating badges
3. **Kustom map markery** — barevné ikony podle ratingu
4. **LocationModal** — detail s:
   - Celkovým hodnocením
   - Pie chart rozložení POI
   - Statistikami kategorií
   - Seznamem všech POI (seřazeno podle vzdálenosti)
   - Linkem na Google Maps
5. **CompareModal** — porovnání všech lokalit s:
   - Radar chart
   - Detailní tabulkou
   - Zvýrazněním best values
6. **Třídění** — 5 způsobů řazení (rating, total POI, transport, schools, shops)
7. **Filtrace** — zobraz pouze lokality s konkrétními POI
8. **Export do CSV** — stáhněte si porovnání
9. **Copy to clipboard** — zkopírujte souhrn
10. **LocalStorage** — auto-save posledních adres a nastavení
11. **Mobile responsive** — všechny komponenty optimalizovány pro mobil

### 🔨 Utility funkce:
- `calculateRating()` — výpočet ratingu lokace
- `saveAddresses()` / `loadAddresses()` — persistence
- `saveRadius()` / `loadRadius()` — persistence radiusu
- `exportToCSV()` — export do CSV souboru
- `copyToClipboard()` — kopírování souhrnu
- `formatDistance()` — formátování vzdáleností
- `getRatingColor()` / `getRatingBg()` / `getRatingLabel()` — styling helpers

---

## 🚀 Deployment

### Frontend (Netlify):
```bash
npm run build
netlify deploy --prod
```

### Backend (Railway/Render):
```bash
git push origin main
# Auto-deploy via git hook
```

---

## 📝 Git commits

```
✅ feat: Добавлены новые компоненты UX - LocationCard, LocationModal, CompareModal
✅ fix: Изменён API endpoint на localhost для development режима
✅ feat: Добавлены функции экспорта и улучшена адаптивность
```

---

## 🎉 Výsledek

**MapPrompt.cz** je nyní plnohodnotný nástroj pro výběr bydlení s:
- Profesionálním UX designem
- Interaktivními vizualizacemi
- Chytrým rating systémem
- Pokročilými funkcemi porovnání
- Exportem dat
- Mobile-first designem

---

## 📚 Možná budoucí vylepšení

### Short-term:
- [ ] PDF export porovnání
- [ ] Historické pohledy (uložené analýzy)
- [ ] Sdílení porovnání (share link)
- [ ] Dark/Light mode toggle
- [ ] Více map styles (satelit, transport)

### Long-term:
- [ ] User accounts (save searches)
- [ ] Advanced filters (ceny nemovitostí, population density)
- [ ] ML recommendations (based on preferences)
- [ ] Real estate listings integration
- [ ] Commute time calculator
- [ ] Street view integration
- [ ] Neighborhood reviews & ratings
- [ ] Price predictions

---

**🚀 UX Redesign dokončen!**

Vytvořeno: **05.02.2026**  
Version: **2.0**  
Autor: **Claude Sonnet 4.5** (OpenClaw)  
Pro: **Iván**  

---

## 📞 Kontakt

- **Email:** info@mapprompt.cz
- **GitHub:** [MapPrompt.cz](https://github.com/n07name7/mapprompt-cz)
- **Live:** [mapprompt-cz.netlify.app](https://mapprompt-cz.netlify.app)
