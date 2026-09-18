/**
 * Bauhaus Hero Section Component
 * High-impact typographic title, Bauhaus geometric SVG composition, value proposition, and CTA.
 */

export function initHero() {
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.className = 'hero-section';

  heroSection.innerHTML = `
    <div class="container hero-container">
      
      <!-- Left Column: Typography & Conversion Flow -->
      <div class="hero-content">
        <div class="hero-eyebrow-wrapper">
          <span class="badge badge-accent">EKOSISTEM STARTUP IT</span>
          <span class="hero-badge-sub">INDONESIA · EST. 2026</span>
        </div>

        <h1 class="hero-title">
          ADELLHUB: EKOSISTEM IT MASA DEPAN.
        </h1>

        <p class="hero-lead">
          Satu wadah, ribuan solusi teknologi. Mengubah ide menjadi realitas digital melalui asistensi tugas IT, perawatan sistem komputasi, dan inovasi platform photobooth modern.
        </p>

        <!-- CTAs -->
        <div class="hero-cta-group">
          <a href="#services" class="btn btn-primary hero-btn-main">
            Bergabung Waitlist
          </a>
          <a href="#services" class="btn btn-outline hero-btn-sub">
            Eksplorasi Layanan
          </a>
        </div>

        <!-- Trust & Value Signals (Restrained & Bauhaus styled) -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">03</span>
            <span class="stat-label">Layanan Terpadu</span>
          </div>
          <div class="stat-separator" aria-hidden="true"></div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Fokus Solusi</span>
          </div>
          <div class="stat-separator" aria-hidden="true"></div>
          <div class="stat-item">
            <span class="stat-badge">BETA</span>
            <span class="stat-label">Early Access</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Bauhaus Geometric Composition -->
      <div class="hero-visual" aria-hidden="true">
        <div class="hero-visual-frame">
          <svg class="hero-composition-svg" viewBox="0 0 540 380" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <!-- Side Dot Column Accent -->
            <g fill="var(--color-dark)" opacity="0.4" class="hero-dots-column">
              <circle cx="20" cy="140" r="3.5" />
              <circle cx="20" cy="165" r="3.5" />
              <circle cx="20" cy="190" r="3.5" />
              <circle cx="20" cy="215" r="3.5" />
              <circle cx="20" cy="240" r="3.5" />
            </g>

            <!-- 1. Top-Left Concentric Red Arcs (Animated pulse) -->
            <g transform="translate(50, 40)" class="hero-layer-arcs">
              <path d="M 10 120 A 110 110 0 0 1 230 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 24 120 A 96 96 0 0 1 216 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 38 120 A 82 82 0 0 1 202 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 52 120 A 68 68 0 0 1 188 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 66 120 A 54 54 0 0 1 174 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 80 120 A 40 40 0 0 1 160 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 94 120 A 26 26 0 0 1 146 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
              <path d="M 108 120 A 12 12 0 0 1 132 120" stroke="var(--color-accent)" stroke-width="4" fill="none" />
            </g>

            <!-- 2. Solid Charcoal Circle (Slow Float) -->
            <circle cx="225" cy="155" r="62" fill="var(--color-dark)" class="hero-float-circle" />

            <!-- 3. Modular Dot Matrix (6x6) -->
            <g transform="translate(305, 95)" fill="var(--color-dark)" class="hero-layer-dots">
              <circle cx="10" cy="10" r="4" /><circle cx="30" cy="10" r="4" /><circle cx="50" cy="10" r="4" /><circle cx="70" cy="10" r="4" /><circle cx="90" cy="10" r="4" /><circle cx="110" cy="10" r="4" />
              <circle cx="10" cy="30" r="4" /><circle cx="30" cy="30" r="4" /><circle cx="50" cy="30" r="4" /><circle cx="70" cy="30" r="4" /><circle cx="90" cy="30" r="4" /><circle cx="110" cy="30" r="4" />
              <circle cx="10" cy="50" r="4" /><circle cx="30" cy="50" r="4" /><circle cx="50" cy="50" r="4" /><circle cx="70" cy="50" r="4" /><circle cx="90" cy="50" r="4" /><circle cx="110" cy="50" r="4" />
              <circle cx="10" cy="70" r="4" /><circle cx="30" cy="70" r="4" /><circle cx="50" cy="70" r="4" /><circle cx="70" cy="70" r="4" /><circle cx="90" cy="70" r="4" /><circle cx="110" cy="70" r="4" />
              <circle cx="10" cy="90" r="4" /><circle cx="30" cy="90" r="4" /><circle cx="50" cy="90" r="4" /><circle cx="70" cy="90" r="4" /><circle cx="90" cy="90" r="4" /><circle cx="110" cy="90" r="4" />
              <circle cx="10" cy="110" r="4" /><circle cx="30" cy="110" r="4" /><circle cx="50" cy="110" r="4" /><circle cx="70" cy="110" r="4" /><circle cx="90" cy="110" r="4" /><circle cx="110" cy="110" r="4" />
            </g>

            <!-- 4. Solid Red Semicircle / Curved Crescent (Slow Float) -->
            <path d="M 430 95 A 60 60 0 0 1 490 155 L 490 215 A 60 60 0 0 1 430 95 Z" fill="var(--color-accent)" class="hero-float-red" />

            <!-- 5. Solid Red Semicircle facing downward -->
            <path d="M 165 215 A 60 60 0 0 1 285 215 Z" fill="var(--color-accent)" class="hero-layer-semi" />

            <!-- 6. Diagonal Parallel Black Hatching Lines -->
            <g transform="translate(285, 215)">
              <clipPath id="heroHatchClip">
                <rect width="120" height="120" />
              </clipPath>
              <g clip-path="url(#heroHatchClip)" stroke="var(--color-dark)" stroke-width="4.5">
                <line x1="-20" y1="20" x2="20" y2="-20" />
                <line x1="-5" y1="35" x2="35" y2="-5" />
                <line x1="10" y1="50" x2="50" y2="10" />
                <line x1="25" y1="65" x2="65" y2="25" />
                <line x1="40" y1="80" x2="80" y2="40" />
                <line x1="55" y1="95" x2="95" y2="55" />
                <line x1="70" y1="110" x2="110" y2="70" />
                <line x1="85" y1="125" x2="125" y2="85" />
                <line x1="100" y1="140" x2="140" y2="100" />
              </g>
            </g>

            <!-- 7. Solid Charcoal Square with Inscribed Cream Cutout Circle -->
            <g transform="translate(405, 215)">
              <rect width="120" height="120" fill="var(--color-dark)" />
              <circle cx="60" cy="60" r="45" fill="var(--color-bg)" />
            </g>

            <!-- Directional Geometric Indicator Arrow -->
            <g transform="translate(470, 275)" stroke="var(--color-dark)" stroke-width="4" stroke-linecap="square">
              <line x1="0" y1="0" x2="24" y2="24" />
              <polyline points="10,24 24,24 24,10" fill="none" />
            </g>

          </svg>
        </div>
      </div>

    </div>
  `;

  // Attach smooth scroll logic for hero CTAs
  heroSection.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 72;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  return heroSection;
}
