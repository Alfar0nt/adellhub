import './style.css';
import { initPreloader } from './components/preloader.js';
import { initHeader } from './components/header.js';
import { initHero } from './components/hero.js';
import { initServices } from './components/services.js';

// Initialize Preloader (1.8s duration)
initPreloader(1800);

const app = document.querySelector('#app');

if (app) {
  // Clear container
  app.innerHTML = '';

  // Initialize and mount Header
  const header = initHeader();
  app.appendChild(header);

  // Main container
  const main = document.createElement('main');
  main.id = 'main-content';

  // 1. Mount Hero Section (Phase 3)
  const hero = initHero();
  main.appendChild(hero);

  // 2. Mount Services Section (Phase 4 - Kotak 1: Adellwork Active)
  const services = initServices();
  main.appendChild(services);

  // 3. Placeholder for Target Sections (To be completed in upcoming phases)
  const subsequentSections = document.createElement('div');
  subsequentSections.innerHTML = `
    <!-- Target Section: Portofolio (Phase 5) -->
    <section id="portfolio" class="container section-spacing" style="min-height: 50vh; border-bottom: var(--border-width) solid var(--color-border);">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">02. Rekam Jejak</span>
        <h2 class="text-h2">Portofolio & Eksplorasi</h2>
        <p class="text-body text-muted">
          Dokumentasi proyek, standar mutu teknis, dan inovasi yang sedang kami kembangkan.
        </p>
      </div>
    </section>

    <!-- Target Section: Hubungi Kami (Phase 6) -->
    <section id="contact" class="container section-spacing" style="min-height: 50vh;">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">03. Hubungi Kami</span>
        <h2 class="text-h2">Mari Terhubung</h2>
        <p class="text-body text-muted">
          Tertarik bermitra atau ingin bergabung dalam daftar tunggu peluncuran? Hubungi tim kami via Instagram @adellhub.
        </p>
      </div>
    </section>
  `;

  main.appendChild(subsequentSections);
  app.appendChild(main);
}
