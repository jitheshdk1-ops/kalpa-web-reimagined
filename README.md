# Kalpa Media — React.js + Vite Application

Modern, modular, production-ready React.js implementation of the **Kalpa Media — The Smart Design Agency** website.

## 🚀 Technology Stack

- **React.js 18** (Functional components, React Hooks)
- **Vite** (Next-generation lightning-fast build tool)
- **GSAP & @gsap/react** (High-performance animations)
- **IntersectionObserver** (Scroll-triggered entrance reveals)
- **HTML5 Canvas** (190-frame scroll-bound sequence scrubbing)
- **CSS3 / Modular Styles** (Theme variables, 3D perspective transforms, animations)

---

## 📁 Project Structure

```text
kalpa-media/
│
├── public/
│   └── assets/
│       └── images/
│           ├── clients/       # 12 trusted partner logos
│           ├── portfolio/     # 11 creative project showcase mockups
│           ├── slides/        # 190 pre-rendered canvas scrub frames
│           └── ...            # Brand logos, review badges, SVG mockups
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx     # Fixed responsive navbar with active link indicator
│   │   │   └── Footer.jsx     # Centered brand mark & legal navigation bar
│   │   │
│   │   └── sections/
│   │       ├── Hero.jsx            # Scroll-bound canvas sequence + glassmorphic review card
│   │       ├── TrustedPartners.jsx # Continuous infinite horizontal logo marquee
│   │       ├── ValueProposition.jsx # "About Studio" typography & storytelling
│   │       ├── BentoGrid.jsx       # 4-card bento grid with custom SVG icons & hover glow
│   │       ├── Services.jsx        # Sticky 2-column layout with 4 service deliverables
│   │       └── Portfolio.jsx       # 3D curved cylinder arc carousel + 4 process areas
│   │
│   ├── hooks/
│   │   ├── useHeroCanvas.js     # DPI-scaled 2D canvas frame preloader & scroll scrubber
│   │   └── useScrollAnimation.js # Standardized intersection-observer entrance reveals
│   │
│   ├── pages/
│   │   └── Home.jsx           # Main page orchestrator
│   │
│   ├── styles/
│   │   └── main.css           # Complete styling, design tokens, and media queries
│   │
│   ├── App.jsx                # Application root
│   └── main.jsx               # React DOM entry point
│
├── _backup_vanilla/           # Full backup of the original vanilla HTML/CSS/JS files
├── index.html                 # Vite HTML entry point with Google Fonts
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:3000` (or next available port).

### 3. Production Build
```bash
npm run build
```
Compiles and bundles the application into optimized production assets inside `/dist`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Key Features & Animations Preserved

1. **Hero Video Canvas Sequence Scrubbing:**
   - 190 frames preloaded with DPI scaling.
   - Smooth requestAnimationFrame scrub loop mapping scroll progress to animation frames.
2. **Our Trusted Partners Horizontal Marquee:**
   - Pure black canvas extending seamlessly from the hero section.
   - Continuous, smooth CSS `@keyframes partnersAutoScroll` right-to-left infinite loop with quad-duplicated logo sets and edge-feathering masks.
3. **Bento Grid Cards:**
   - Custom SVG vector icons, dark theme styling, ambient glowing shapes, and 0.8s hover morph transitions.
4. **Services Sticky Stack ("Our Expertise"):**
   - Sticky left title & pill; right-column stack of 4 service cards with yellow square bullets and SVG mockups.
5. **Behind The Creative Work (3D Cylindrical Arc Carousel):**
   - 10X expanded circular trajectory ($R \approx 5000\text{px} - 7500\text{px}$).
   - Deep 3D Z-depth, dynamic direction-based $\pm 25^\circ$ Y-axis tilt, concave vertical smile arch, depth scaling ($0.90 \to 1.20$), strictly constant velocity ($72\text{ px/s}$), and interactive drag/swipe scrubbing.
6. **Universal Scroll-Triggered Reveals:**
   - High-performance `IntersectionObserver` with smooth `cubic-bezier(0.25, 1, 0.5, 1)` easing and progressive child stagger delays.
