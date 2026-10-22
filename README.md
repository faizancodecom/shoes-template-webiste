# Card Bodira — Modern Footwear Atelier

Card Bodira is an editorial footwear atelier website template built with a zero-dependency vanilla web stack. The design language emphasizes quiet luxury, architectural minimalism, and restrained typographic hierarchy, utilizing a Fibonacci-proportioned spacing scale and smooth client-side interactions.

---

## Architecture and Technical Highlights

- Zero External Dependencies: Built entirely with vanilla HTML5, CSS3, and modern ES6+ JavaScript. No build step, bundler, or heavy framework required.
- Mathematical Design Tokens: Spacing, layout containers, and proportional scales derived from the golden ratio (1.618) and a curated monochromatic palette.
- Scroll Physics Engine: Viewport scroll scrubbing coordinated via passive event listeners and `requestAnimationFrame` for hardware-accelerated transforms without frame drops.
- Fluid Sliding Pill Indicators: Dynamic bounding-box calculation for active tabs in both the floating navigation bar and catalog filter dock.
- State-Driven Modal and Drawer Engines: Accessible full-page product expansion views and slide-out information drawers with keyboard escape listening and body scroll locking.

---

## Core Features

### Floating Navigation Bar
- Pill-shaped floating header with an animated background slider indicator.
- Automatically calculates active element width and offset position during interaction, page resize, and scroll-spy section crossing.

### Hero Showcase and Thumbnail Dock
- Frameless floating footwear presentation featuring a synchronized contact shadow.
- Interactive dock enabling instant silhouette swapping with smooth opacity and scale transitions.

### Kinetic Typography Marquee
- Horizontal ticker track linked directly to page scroll offset for a tactile, scroll-driven scrubbing effect.

### Interactive Footwear Catalog
- Dynamic client-side rendering from an isolated data structure.
- Instant category filtering across four distinct categories (Runners, Low Tops, High Tops, Hybrids) with sliding indicator transitions.
- Fully responsive grid layout accommodating variable screen densities.

### Full-Page Expanding Product View
- High-fidelity product inspection overlay triggered on silhouette selection.
- Displays comprehensive technical specifications: Upper Leather Provenance, Outsole Chassis, Welt Assembly Construction, and interactive EU sizing chips.
- Focus-safe modal behavior with Escape key dismissal and background interaction prevention.

### Editorial Lookbook and Workshop Section
- Dual-column editorial layout pairing architectural photography with multi-plane parallax depth.
- Atelier narrative section detailing leather craftsmanship in Civitanova Marche, Italy.

### Interactive Off-Canvas Info Drawers
- Dedicated slide-out drawer architecture handling atelier studio details (Civitanova Marche, Paris, Tokyo, New York) and craft protocols (Bespoke Sizing, Lifetime Care and Resole, Materials Provenance, Private Inquiries).

---

## Project Structure

```
shoes-template-webiste/
│
├── .gitignore               # Ignored system files, caches, and IDE artifacts
├── .gitattributes          # Line ending configurations
├── README.md                # Project documentation
├── index.html               # Semantic HTML5 markup and structural skeleton
│
├── assets/
│   └── shoes/               # Footwear assets
│       ├── shoe1.png        # Bodira Monolith
│       ├── shoe2.png        # Bodira Kanso Trainer
│       ├── shoe3.png        # Bodira Strata High
│       ├── shoe4.png        # Bodira Studio Slide
│       ├── shoe5.png        # Bodira Apex Hybrid
│       ├── shoe6.png        # Bodira Aether Low
│       ├── shoe7.png        # Bodira Veloce Track
│       └── shoe8.png        # Bodira Element Trail
│
├── css/
│   └── style.css            # Modular design system, variables, and typography
│
└── js/
    └── app.js               # Application runtime, catalog data, and interaction engines
```

---

## Getting Started

Because Card Bodira uses standard web technologies without compilation steps, it can be served using any local web server.

### Option 1: Python Static Server
Run from the root directory:
```bash
# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Node.js (via npx)
```bash
npx serve .
```

### Option 3: Direct File Execution
You can also open `index.html` directly in any modern browser for immediate evaluation.

---

## Data Configuration and Schema

All footwear items, hero thumbnails, and studio drawer contents are defined centrally in `js/app.js`.

### Adding or Modifying Products

Locate the `SHOES` array in `js/app.js` and extend or update items according to the following schema:

```javascript
{
  id: 'cb-09',
  title: 'Bodira Meridian',
  category: 'lows',                     // Filter category: 'runners' | 'lows' | 'highs' | 'hybrids'
  categoryLabel: 'Architectural Oxford', // Display label in product overlay
  materials: 'Waxed Vegetable Calfskin', // Upper material specification
  sole: 'Molded Natural Crepe Rubber',   // Sole compound specification
  construction: 'Blake Rapid Stitch',    // Welt and assembly method
  image: 'assets/shoes/shoe9.png'        // Relative or absolute path to image asset
}
```

### Modifying the Hero Showcase

The thumbnail dock switcher maps specific IDs to corresponding showcase assets via `HERO_DATA`:

```javascript
const HERO_DATA = {
  'cb-01': { image: 'assets/shoes/shoe1.png' },
  'cb-02': { image: 'assets/shoes/shoe6.png' },
  'cb-03': { image: 'assets/shoes/shoe3.png' },
  'cb-04': { image: 'assets/shoes/shoe2.png' }
};
```

### Modifying Atelier Drawer Entries

Drawer entries are stored in `DRAWER_CONTENT` with arbitrary HTML support:

```javascript
'civitanova': {
  title: 'Civitanova Marche Atelier',
  body: '<p>Studio description and address information.</p>'
}
```

Trigger drawers from any HTML element using the `data-drawer` attribute:
```html
<button class="footer-interactive-link" data-drawer="civitanova">Civitanova Marche</button>
```

---

## Design System and Customization

Global styling variables are declared in `css/style.css` under the `:root` pseudo-class.

### Core CSS Variables

```css
:root {
  /* Fibonacci Spacing System */
  --space-2xs: 5px;
  --space-xs: 8px;
  --space-sm: 13px;
  --space-md: 21px;
  --space-lg: 34px;
  --space-xl: 55px;
  --space-2xl: 89px;
  --space-3xl: 144px;

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Monochromatic Color System */
  --bg-pure: #ffffff;
  --bg-subtle: #fcfcfd;
  --bg-warm: #f7f7f8;
  --text-main: #121214;
  --text-secondary: #52535a;
  --text-muted: #8e9098;
  --border-hairline: rgba(18, 18, 20, 0.08);
  --border-active: rgba(18, 18, 20, 0.22);

  /* Animation Easing Curves */
  --ease-lux: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.25, 1, 0.5, 1);
  --transition-fast: 0.25s var(--ease-lux);
  --transition-smooth: 0.5s var(--ease-lux);
}
```

---

## Browser Compatibility

- Google Chrome / Chromium (Current and previous major releases)
- Mozilla Firefox (Current and previous major releases)
- Apple Safari (Version 14 and newer)
- Microsoft Edge (Chromium-based)

---

## License

This project is open-source and available under the terms of the MIT License.
