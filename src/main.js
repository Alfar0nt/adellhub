import './style.css';
import { initPreloader } from './components/preloader.js';
import { initHeader } from './components/header.js';

// Initialize Preloader (1.8s duration)
initPreloader(1800);

const app = document.querySelector('#app');

if (app) {
  // Clear any placeholder
  app.innerHTML = '';

  // Initialize and mount Header
  const header = initHeader();
  app.appendChild(header);

  // Main container with semantic sections for smooth scroll targets
  const main = document.createElement('main');
  main.id = 'main-content';
  main.innerHTML = `
    <!-- Temporary Hero & Showcase Section (Will be fully implemented in Phase 3) -->
    <section id="hero" class="container section-spacing" style="min-height: 70vh; display: flex; flex-direction: column; justify-content: center; border-bottom: var(--border-width) solid var(--color-border);">
      <div style="display: flex; flex-direction: column; gap: var(--space-4); max-width: 800px;">
        <span class="badge badge-accent" style="align-self: flex-start;">Startup IT Ecosystem</span>
        <h1 class="text-h1">ADELLHUB: EKOSISTEM IT MASA DEPAN.</h1>
        <p class="text-lead">
          Satu wadah, ribuan solusi teknologi. Mengubah ide menjadi realitas digital melalui asistensi tugas IT, perawatan perangkat keras, dan platform photobooth modern.
        </p>
        <div style="display: flex; gap: var(--space-4); margin-top: var(--space-4); flex-wrap: wrap;">
          <a href="#services" class="btn btn-primary">Jelajahi Layanan</a>
          <a href="#contact" class="btn btn-outline">Hubungi Kami</a>
        </div>
      </div>
    </section>

    <!-- Target Section: Layanan (To be fully built in Phase 4) -->
    <section id="services" class="container section-spacing" style="min-height: 60vh; border-bottom: var(--border-width) solid var(--color-border);">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">01. Layanan Kami</span>
        <h2 class="text-h2">Tiga Solusi Digital Terpadu</h2>
        <p class="text-body text-muted">
          Adellwork (Asisten & Mentoring IT) · Adelltech (Service Laptop & Debloating) · Adellbooth (Software Photobooth).
        </p>
      </div>
    </section>

    <!-- Target Section: Portofolio (To be fully built in Phase 5) -->
    <section id="portfolio" class="container section-spacing" style="min-height: 60vh; border-bottom: var(--border-width) solid var(--color-border);">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">02. Rekam Jejak</span>
        <h2 class="text-h2">Portofolio & Eksplorasi</h2>
        <p class="text-body text-muted">
          Dokumentasi proyek, standar mutu teknis, dan inovasi yang sedang kami kembangkan.
        </p>
      </div>
    </section>

    <!-- Target Section: Hubungi Kami (To be fully built in Phase 6) -->
    <section id="contact" class="container section-spacing" style="min-height: 60vh;">
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">03. Hubungi Kami</span>
        <h2 class="text-h2">Mari Terhubung</h2>
        <p class="text-body text-muted">
          Tertarik bermitra atau ingin bergabung dalam daftar tunggu peluncuran? Hubungi tim kami via Instagram @adellhub.
        </p>
      </div>
    </section>
  `;

  app.appendChild(main);
}
