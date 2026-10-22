/**
 * CARD BODIRA — MODERN FOOTWEAR ATELIER
 * INTERACTIVE CLIENT ENGINE
 * Features:
 *  - Full-Page Expanding Product Experience with Staggered Element Morph
 *  - Fluid Sliding Indicator for Floating Navbar & Filter Tabs
 *  - Hero Shoe Thumbnail Switcher Dock
 *  - Scroll-Driven Physics (Hero Scrub, Kinetic Marquee, Parallax)
 *  - Fully Interactive Footer Drawers & Protocols
 *  - Zero Slashes, Zero AI Slop
 */

(function () {
  'use strict';

  /* --- 8 ISOLATED FOOTWEAR MODELS (PORTFOLIO ARCHIVE) --- */
  const SHOES = [
    {
      id: 'cb-01',
      title: 'Bodira Monolith',
      category: 'runners',
      categoryLabel: 'Architectural Runner',
      materials: 'Full-Grain Tuscan Calfskin',
      sole: 'Segmented Bio-Circular EVA Outsole',
      construction: 'Hand-Beveled Blake Welt',
      image: 'assets/shoes/shoe1.png'
    },
    {
      id: 'cb-02',
      title: 'Bodira Aether Low',
      category: 'lows',
      categoryLabel: 'Minimalist Low Top',
      materials: 'Supple Italian Nappa Leather',
      sole: 'Cast Natural Amber Gum',
      construction: 'Seamless Strobel Assembly',
      image: 'assets/shoes/shoe6.png'
    },
    {
      id: 'cb-03',
      title: 'Bodira Strata High',
      category: 'highs',
      categoryLabel: 'Technical High Top',
      materials: 'Water-Repellent Oiled Nubuck',
      sole: 'Sculpted Vibram Megagrip Tread',
      construction: 'Double-Waxed Protective Welt',
      image: 'assets/shoes/shoe3.png'
    },
    {
      id: 'cb-04',
      title: 'Bodira Kanso Trainer',
      category: 'lows',
      categoryLabel: 'Canvas Trainer',
      materials: 'Heavy Organic Canvas & Calf Piping',
      sole: 'Cast Natural Latex Platform',
      construction: 'Discreet Reinforced Hand Stitch',
      image: 'assets/shoes/shoe2.png'
    },
    {
      id: 'cb-05',
      title: 'Bodira Apex Hybrid',
      category: 'hybrids',
      categoryLabel: 'Derby Running Hybrid',
      materials: 'Aniline Calfskin & High-Density Mesh',
      sole: 'Kinetic Rebound Platform',
      construction: 'Goodyear Welt Hybrid Assembly',
      image: 'assets/shoes/shoe5.png'
    },
    {
      id: 'cb-06',
      title: 'Bodira Studio Slide',
      category: 'hybrids',
      categoryLabel: 'Sculpted Slide',
      materials: 'Pressure-Molded Bio-Foam',
      sole: 'Continuous Ergonomic Bed',
      construction: 'Monolithic Pressure Cast',
      image: 'assets/shoes/shoe4.png'
    },
    {
      id: 'cb-07',
      title: 'Bodira Veloce Track',
      category: 'runners',
      categoryLabel: 'Featherweight Track',
      materials: 'Engineered Monofilament & Suede',
      sole: 'Carbon Composite Propulsion Plate',
      construction: 'Heat-Welded Bonded Welt',
      image: 'assets/shoes/shoe7.png'
    },
    {
      id: 'cb-08',
      title: 'Bodira Element Trail',
      category: 'highs',
      categoryLabel: 'All-Terrain Boot',
      materials: 'Waxed Suede & Cordura Ballistic',
      sole: 'Deep Lug Vibram Compound',
      construction: 'Storm-Welt Reinforced',
      image: 'assets/shoes/shoe8.png'
    }
  ];

  /* --- DOM REFERENCES --- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const heroShoeWrapper = document.getElementById('heroShoeWrapper');
  const heroShoePhoto = document.getElementById('heroShoePhoto');
  const heroBrandTitle = document.getElementById('heroBrandTitle');
  const heroLeadText = document.getElementById('heroLeadText');
  const kineticTrack = document.getElementById('kineticTrack');
  const lookbookPhotos = document.querySelectorAll('.lookbook-photo');
  const shoesGrid = document.getElementById('shoesGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterSliderIndicator = document.getElementById('filterSliderIndicator');
  const navLinks = document.querySelectorAll('.nav-pill-link');
  const navSliderIndicator = document.getElementById('navSliderIndicator');
  const heroThumbnails = document.querySelectorAll('.hero-thumb-btn');

  // Full-page Modal
  const fullpageOverlay = document.getElementById('fullpageOverlay');
  const fullpageCloseBtn = document.getElementById('fullpageCloseBtn');
  const fullpageHeroImg = document.getElementById('fullpageHeroImg');
  const fullpageCategory = document.getElementById('fullpageCategory');
  const fullpageTitle = document.getElementById('fullpageTitle');
  const fullpageMaterials = document.getElementById('fullpageMaterials');
  const fullpageSole = document.getElementById('fullpageSole');
  const fullpageConstruction = document.getElementById('fullpageConstruction');

  // Info Drawer
  const infoDrawerBackdrop = document.getElementById('infoDrawerBackdrop');
  const infoDrawerCloseBtn = document.getElementById('infoDrawerCloseBtn');
  const infoDrawerTitle = document.getElementById('infoDrawerTitle');
  const infoDrawerBody = document.getElementById('infoDrawerBody');

  /* =========================================================================
     1. FLUID SLIDING INDICATORS (NAVBAR & FILTER TABS)
     ========================================================================= */
  function updateNavIndicator(activeEl) {
    if (!activeEl || !navSliderIndicator) return;
    navSliderIndicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
    navSliderIndicator.style.width = `${activeEl.offsetWidth}px`;
  }

  function updateFilterIndicator(activeEl) {
    if (!activeEl || !filterSliderIndicator) return;
    filterSliderIndicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
    filterSliderIndicator.style.width = `${activeEl.offsetWidth}px`;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavIndicator(link);
    });
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateFilterIndicator(btn);
      renderShoes(btn.dataset.category);
    });
  });

  /* =========================================================================
     2. HERO SHOE THUMBNAIL SWITCHER DOCK
     ========================================================================= */
  const HERO_DATA = {
    'cb-01': {
      image: 'assets/shoes/shoe1.png'
    },
    'cb-02': {
      image: 'assets/shoes/shoe6.png'
    },
    'cb-03': {
      image: 'assets/shoes/shoe3.png'
    },
    'cb-04': {
      image: 'assets/shoes/shoe2.png'
    }
  };

  heroThumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      heroThumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const data = HERO_DATA[thumb.dataset.id];
      if (data && heroShoePhoto) {
        heroShoePhoto.style.opacity = '0';
        heroShoePhoto.style.transform = 'scale(0.96)';

        setTimeout(() => {
          heroShoePhoto.src = data.image;
          heroShoePhoto.style.opacity = '1';
          heroShoePhoto.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  /* =========================================================================
     3. RENDER SHOE COLLECTION (NO PRICE, NO DESCRIPTION, PURE PORTFOLIO)
     ========================================================================= */
  function renderShoes(category = 'all') {
    if (!shoesGrid) return;

    const filtered = category === 'all'
      ? SHOES
      : SHOES.filter(s => s.category === category);

    shoesGrid.innerHTML = filtered.map(shoe => `
      <article class="shoe-item" data-id="${shoe.id}">
        <div class="shoe-image-wrapper">
          <img src="${shoe.image}" alt="${shoe.title}" class="shoe-single-photo" loading="lazy">
        </div>
        <div class="shoe-meta-block">
          <div class="shoe-title-row">
            <h3 class="shoe-title">${shoe.title}</h3>
          </div>
          <span class="shoe-inspect-link">View Silhouette →</span>
        </div>
      </article>
    `).join('');

    // Attach click to open full-page expanding view
    shoesGrid.querySelectorAll('.shoe-item').forEach(item => {
      item.addEventListener('click', () => {
        openFullPageProduct(item.dataset.id);
      });
    });
  }

  /* =========================================================================
     4. FULL-PAGE EXPANDING PRODUCT EXPERIENCE (NO PRICES, NO COMMERCIAL TEXT)
     ========================================================================= */
  function openFullPageProduct(id) {
    const item = SHOES.find(s => s.id === id);
    if (!item || !fullpageOverlay) return;

    fullpageHeroImg.src = item.image;
    fullpageHeroImg.alt = item.title;
    if (fullpageCategory) fullpageCategory.textContent = item.categoryLabel;
    if (fullpageTitle) fullpageTitle.textContent = item.title;
    if (fullpageMaterials) fullpageMaterials.textContent = item.materials;
    if (fullpageSole) fullpageSole.textContent = item.sole;
    if (fullpageConstruction) fullpageConstruction.textContent = item.construction;

    fullpageOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFullPageProduct() {
    if (!fullpageOverlay) return;
    fullpageOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (fullpageCloseBtn) {
    fullpageCloseBtn.addEventListener('click', closeFullPageProduct);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (fullpageOverlay && fullpageOverlay.classList.contains('active')) {
        closeFullPageProduct();
      }
      if (infoDrawerBackdrop && infoDrawerBackdrop.classList.contains('active')) {
        closeInfoDrawer();
      }
    }
  });

  /* =========================================================================
     5. INTERACTIVE FOOTER DRAWERS & PROTOCOLS
     ========================================================================= */
  const DRAWER_CONTENT = {
    'civitanova': {
      title: 'Civitanova Marche Atelier',
      body: '<p>Located along the Adriatic coastline of Le Marche, our founding workshop houses master patternmakers, wooden last sculptors, and hand-welt cobblers.</p><p style="margin-top: 14px;">Via dell’Artigianato 18, 62012 Civitanova Marche (MC), Italy<br>Private visits by appointment only.</p>'
    },
    'paris': {
      title: 'Paris Atelier Studio',
      body: '<p>Our Marais consultation space serves as the primary European design archive and bespoke fitting suite.</p><p style="margin-top: 14px;">24 Rue de Turenne, 75003 Paris, France<br>Tuesday to Saturday, 11:00 – 19:00.</p>'
    },
    'tokyo': {
      title: 'Tokyo Studio Suite',
      body: '<p>Situated in tranquil Aoyama, offering intimate seasonal previews and personalized foot measurement consultations.</p><p style="margin-top: 14px;">5-7-22 Minamiaoyama, Minato-ku, Tokyo, Japan<br>Private client appointments via concierge.</p>'
    },
    'newyork': {
      title: 'New York SoHo Studio',
      body: '<p>A quiet loft sanctuary overlooking Wooster Street, exhibiting current silhouettes and archive prototypes.</p><p style="margin-top: 14px;">98 Wooster Street, New York, NY 10012, USA<br>Wednesday to Sunday, 12:00 – 18:00.</p>'
    },
    'bespoke': {
      title: 'Bespoke Sizing & Fitting',
      body: '<p>Every Card Bodira silhouette is sculpted around our proprietary anatomical wooden last. We offer complimentary half-size adjustments, orthotic insole accommodation, and personalized fitting consultations.</p><p style="margin-top: 14px;">Contact our master fitter at concierge@cardbodira.com for global courier fitting kits.</p>'
    },
    'care': {
      title: 'Lifetime Care & Resole',
      body: '<p>Because our footwear utilizes Blake and Goodyear welt constructions, every pair is designed to be fully resoleable for decades of continuous wear.</p><p style="margin-top: 14px;">We provide organic beeswax conditioning cream, replacement cotton laces, and comprehensive workshop resole services.</p>'
    },
    'provenance': {
      title: 'Materials & Provenance',
      body: '<p>100% of our leathers are vegetable-tanned in Santa Croce sull’Arno, Tuscany, utilizing mimosa and chestnut extracts with zero toxic chromium.</p><p style="margin-top: 14px;">All outsole foams are circular bio-polymers blended with natural rubber harvested sustainably.</p>'
    },
    'inquiry': {
      title: 'Private Client Inquiries',
      body: '<p>For press appointments, custom last sculpting, or private studio viewings, our studio liaison is available directly.</p><p style="margin-top: 14px;">atelier@cardbodira.com<br>Direct Line: +39 0733 812900</p>'
    }
  };

  function openInfoDrawer(key) {
    const content = DRAWER_CONTENT[key];
    if (!content || !infoDrawerBackdrop) return;

    infoDrawerTitle.textContent = content.title;
    infoDrawerBody.innerHTML = content.body;
    infoDrawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeInfoDrawer() {
    if (!infoDrawerBackdrop) return;
    infoDrawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (infoDrawerCloseBtn) {
    infoDrawerCloseBtn.addEventListener('click', closeInfoDrawer);
  }

  if (infoDrawerBackdrop) {
    infoDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === infoDrawerBackdrop) closeInfoDrawer();
    });
  }

  // Bind footer interactive links
  document.querySelectorAll('.footer-interactive-link[data-drawer]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openInfoDrawer(link.dataset.drawer);
    });
  });

  /* =========================================================================
     6. SCROLL PHYSICS ENGINE (SCRUBBING ON SCROLL)
     ========================================================================= */
  let latestScrollY = 0;
  let isTicking = false;

  function onScroll() {
    latestScrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (!isTicking) {
      window.requestAnimationFrame(updateScrollPhysics);
      isTicking = true;
    }
  }

  function updateScrollPhysics() {
    const scrollY = latestScrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Top progress hairline
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Hero Shoe Motion Scrub
    if (heroShoeWrapper && scrollY < window.innerHeight * 1.5) {
      const translateY = scrollY * 0.22;
      const rotateDeg = scrollY * 0.012;
      heroShoeWrapper.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotateDeg}deg)`;
    }

    // Kinetic Marquee Scrub (Glides horizontally on scroll)
    if (kineticTrack) {
      const shift = scrollY * 0.52;
      kineticTrack.style.transform = `translate3d(-${shift % 1800}px, 0, 0)`;
    }

    // Lookbook Multi-Plane Parallax Scrub
    if (lookbookPhotos.length > 0) {
      lookbookPhotos.forEach((img, idx) => {
        const rect = img.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = idx === 0 ? 0.10 : 0.20;
          const offset = (rect.top - window.innerHeight / 2) * speed;
          img.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    }

    // Active Section Tracking for Nav Pill
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            if (!link.classList.contains('active')) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
              updateNavIndicator(link);
            }
          }
        });
      }
    });

    isTicking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* =========================================================================
     7. INITIALIZATION
     ========================================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    renderShoes('all');
    updateScrollPhysics();

    // Initial positioning of indicators
    const activeNav = document.querySelector('.nav-pill-link.active');
    if (activeNav) updateNavIndicator(activeNav);

    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) updateFilterIndicator(activeFilter);
  });

  window.addEventListener('resize', () => {
    const activeNav = document.querySelector('.nav-pill-link.active');
    if (activeNav) updateNavIndicator(activeNav);

    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) updateFilterIndicator(activeFilter);
  });

})();
