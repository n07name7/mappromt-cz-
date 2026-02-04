# MapPrompt.cz — Design Brief 2026

## Тренды веб-дизайна 2026 (применяем)

### ✅ UI/UX Trends:
1. **Liquid Glass / Glassmorphism** — прозрачность, размытие, глубина (Apple-inspired)
2. **Bento Grid Layout** — модульная структура, как японский ланч-бокс
3. **Minimal UI с акцентом на контент** — меньше декораций, больше четкости
4. **Dark Mode as Default** — темная тема как стандарт (с переключением)
5. **Micro-interactions** — анимации на hover, subtle motion
6. **Scroll Storytelling** — прогрессивное раскрытие информации при скролле
7. **AI-Generated Gradients** — мягкие переходы цветов (не кислотные!)
8. **3D Elements (subtle)** — легкие 3D эффекты для глубины
9. **Trust Signals Upfront** — социальные доказательства сразу видны
10. **Mobile-First, Always** — дизайн начинается с мобильной версии

### ✅ Landing Page Best Practices 2026:
1. **Clear Value Proposition Above the Fold** — понятно за 3 секунды
2. **Single Clear CTA** — один главный Call-to-Action
3. **Fast Load Speed** — до 2 секунд (Core Web Vitals)
4. **Conversational Copy** — пишем как человек, не как робот
5. **Visual Hierarchy** — глаза движутся по заданному маршруту
6. **Social Proof** — логотипы, отзывы, статистика
7. **Sticky CTA** — кнопка всегда доступна (sticky header)

---

## Цветовая палитра

### Primary (AI/Tech Vibe):
- **Primary Blue:** #3B82F6 (современный tech blue)
- **Primary Dark:** #1E40AF
- **Accent Purple:** #8B5CF6 (AI associations)

### Neutrals (Dark Theme):
- **Background:** #0F172A (deep navy, не чистый черный)
- **Surface:** #1E293B (карточки)
- **Border:** #334155 (subtle borders)
- **Text Primary:** #F1F5F9 (почти белый, читабельный)
- **Text Secondary:** #94A3B8 (приглушенный)

### Accent/CTA:
- **Success Green:** #10B981 (для CTA "Zkuste zdarma")
- **Warning Orange:** #F59E0B (для urgency)

### Glassmorphism:
- **Glass BG:** rgba(30, 41, 59, 0.6) + backdrop-blur
- **Glass Border:** rgba(148, 163, 184, 0.1)

---

## Типографика

### Fonts:
- **Headlines:** Inter (900 weight) — чистая, современная
- **Body:** Inter (400/500) — читабельная на всех размерах
- **Code/Tech:** JetBrains Mono — для технических акцентов

### Sizes (mobile-first):
```css
/* Mobile */
h1: 2.5rem (40px) — Hero headline
h2: 1.875rem (30px) — Section headers
h3: 1.5rem (24px) — Cards
body: 1rem (16px)
small: 0.875rem (14px)

/* Desktop */
h1: 4rem (64px)
h2: 3rem (48px)
h3: 2rem (32px)
```

---

## Layout Structure (Bento Grid + Scroll Storytelling)

### Section 1: Hero (100vh)
- **Layout:** Full-screen, centered
- **Content:**
  - H1: "Vytváříte mapy pomocí AI za 30 vteřin"
  - Subtitle: "GIS nástroje pro české podnikatele. Bez složitého softwaru."
  - CTA: "Zkuste zdarma" (Green button, prominent)
  - Visual: Animated map preview (gradient mesh background)
- **Animation:** Fade-in + gentle float

### Section 2: Social Proof Bar
- **Layout:** Horizontal scroll (mobile), 3-column (desktop)
- **Content:** "Důvěřuje nám 200+ realitních agentur"
- **Animation:** Scroll-triggered counter

### Section 3: Tools (Bento Grid)
- **Layout:** 3 cards, glassmorphism style
- **Card Structure:**
  1. Icon (animated on hover)
  2. Heading
  3. Short description
  4. "Vyzkoušet →" link
- **Animation:** Stagger-in on scroll

### Section 4: Features (2-Column Alternating)
- **Layout:** Image left, text right → flip → repeat
- **Content:** Screenshots + benefits
- **Animation:** Parallax scroll (subtle)

### Section 5: Pricing (Bento Grid)
- **Layout:** 3 cards (Zdarma/Starter/Pro)
- **Highlight:** "Pro" card elevated (scale 1.05, glow)
- **Animation:** Hover → scale + glow

### Section 6: CTA (Full-width)
- **Layout:** Centered, dark gradient background
- **Content:** "Začněte tvořit mapy dnes" + CTA button
- **Animation:** Button pulse (subtle)

### Section 7: Footer
- **Layout:** 3-column (Odkazy/Nástroje/Kontakt)
- **Style:** Minimal, dark

---

## Animations & Micro-interactions

### Page Load:
1. Hero fades in (0.5s delay)
2. Text slides up (stagger 0.1s per element)
3. CTA button pulse (infinite, 2s interval)

### Scroll:
1. Sections fade in when 20% visible
2. Cards stagger (0.1s delay each)
3. Parallax bg (move 0.5x scroll speed)

### Hover:
1. Buttons: scale(1.05) + glow shadow
2. Cards: lift (translateY(-8px)) + border glow
3. Links: color shift + underline slide-in

### Click:
1. Button: scale(0.95) → scale(1) (100ms)
2. Ripple effect from click point

---

## Components to Build

### 1. Navbar (Sticky)
- Logo (left)
- Links: Nástroje / Ceny / Blog (center)
- CTA: "Přihlásit se" / "Zkuste zdarma" (right)
- Mobile: Hamburger menu

### 2. Hero Section
- Headline (animated gradient text)
- Subtitle (fade-in)
- CTA Button (glow on hover)
- Background: Animated gradient mesh

### 3. Tool Card
- Glassmorphism style
- Icon (Lucide React)
- Hover: lift + glow

### 4. Pricing Card
- Border gradient (animated)
- Feature list (checkmarks)
- CTA button

### 5. Footer
- 3-column layout
- Social links (icons)
- Copyright

---

## Technical Stack

**Framework:** React + TypeScript + Vite  
**Styling:** Tailwind CSS  
**Animations:** Framer Motion  
**Icons:** Lucide React  
**Fonts:** Google Fonts (Inter)  

---

## Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3s

---

## Mobile-First Breakpoints

```css
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

---

## Key Differentiators (Design Choices)

✅ **Not Generic SaaS:** Custom illustrations, not stock photos  
✅ **Czech-First:** All copy in Czech, local references  
✅ **Trust-First:** Social proof above the fold  
✅ **Clarity > Flashiness:** Every animation serves a purpose  
✅ **Dark Theme:** Matches tech/GIS industry aesthetic  

---

## Inspiration References (from research)

- **CARTO** — clean GIS interface
- **Stripe** — clarity & trust signals
- **Linear** — minimal UI + dark theme
- **Notion** — Bento grid layout
- **Vercel** — gradient effects

---

**Next Step:** Build components in /src/components/
