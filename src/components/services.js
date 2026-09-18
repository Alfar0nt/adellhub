/**
 * Bauhaus Services Section Component
 * Displays 3 geometric service cards. Currently executing Kotak 1: Adellwork.
 */

import { openModal } from './modal.js';

export function initServices() {
  const servicesSection = document.createElement('section');
  servicesSection.id = 'services';
  servicesSection.className = 'services-section section-spacing';

  servicesSection.innerHTML = `
    <div class="container">
      
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-header-top">
          <span class="text-label text-muted">01. LAYANAN KAMI</span>
          <div class="section-header-line" aria-hidden="true"></div>
        </div>
        <h2 class="section-title text-h2">TIGA SOLUSI TEKNOLOGI TERPADU.</h2>
        <p class="section-lead text-lead">
          Setiap unit di bawah naungan Adellhub dirancang untuk menjawab tantangan digital secara presisi. Seluruh layanan saat ini berada dalam tahap pengembangan aktif menuju peluncuran.
        </p>
      </div>

      <!-- Services 3-Column Geometric Grid -->
      <div class="services-grid">
        
        <!-- KOTAK 1: ADELLWORK (Executed in Phase 4 Step 1) -->
        <article class="service-card service-card-active" id="card-adellwork">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Monitor / Terminal Geometric Base -->
                <rect x="4" y="6" width="32" height="22" stroke="var(--color-dark)" stroke-width="2.5" fill="var(--color-bg)" />
                <line x1="14" y1="28" x2="26" y2="28" stroke="var(--color-dark)" stroke-width="2.5" />
                <line x1="20" y1="28" x2="20" y2="34" stroke="var(--color-dark)" stroke-width="2.5" />
                <line x1="12" y1="34" x2="28" y2="34" stroke="var(--color-dark)" stroke-width="2.5" />
                <!-- Code Bracket Symbol < /> -->
                <polyline points="13,17 9,20 13,23" stroke="var(--color-dark)" stroke-width="2" stroke-linecap="square" />
                <polyline points="23,17 27,20 23,23" stroke="var(--color-dark)" stroke-width="2" stroke-linecap="square" />
                <!-- Red Bauhaus Accent Dot -->
                <rect x="17" y="10" width="4" height="4" fill="var(--color-accent)" />
              </svg>
            </div>
            <span class="badge badge-accent">Coming Soon</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow">Adellwork by Adellhub</div>
            <h3 class="service-title">Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan</h3>
            <p class="service-desc text-body">
              Layanan asistensi dan mentoring personal terpercaya untuk pelajar, mahasiswa, dan praktisi pemula dalam menyelesaikan tantangan komputasi dan eksplorasi desain kreatif.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Mentoring pemrograman, algoritma & basis data</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Asistensi desain UI/UX & media kreatif</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Konfigurasi jaringan komputer & troubleshooting dasar</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adellwork">
              Selengkapnya
            </button>
          </div>
        </article>

        <!-- KOTAK 2: ADELLTECH (Pending Step 2) -->
        <article class="service-card service-card-placeholder" id="card-adelltech">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="14" stroke="var(--color-dark)" stroke-width="2" stroke-dasharray="3 3" />
                <rect x="15" y="15" width="10" height="10" fill="var(--color-dark)" opacity="0.3" />
              </svg>
            </div>
            <span class="badge">Next in Phase 4</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow text-muted">Adelltech by Adellhub</div>
            <h3 class="service-title text-muted">Service Ringan & Debloating Laptop/Komputer</h3>
            <p class="service-desc text-muted">
              Optimalisasi performa perangkat keras dan pembersihan sistem operasi secara komprehensif.
            </p>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full" disabled style="opacity: 0.6; cursor: not-allowed;">
              Menunggu Instruksi Kotak 2
            </button>
          </div>
        </article>

        <!-- KOTAK 3: ADELLBOOTH (Pending Step 3) -->
        <article class="service-card service-card-placeholder" id="card-adellbooth">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="24" height="24" stroke="var(--color-dark)" stroke-width="2" stroke-dasharray="3 3" />
                <circle cx="20" cy="20" r="6" fill="var(--color-accent)" opacity="0.3" />
              </svg>
            </div>
            <span class="badge">Next in Phase 4</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow text-muted">Adellbooth by Adellhub</div>
            <h3 class="service-title text-muted">Platform Software Photobooth All-in-One</h3>
            <p class="service-desc text-muted">
              Solusi piranti lunak terintegrasi untuk event modern, otomasi capture, dan instant printing.
            </p>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full" disabled style="opacity: 0.6; cursor: not-allowed;">
              Menunggu Instruksi Kotak 3
            </button>
          </div>
        </article>

      </div>

    </div>
  `;

  // Attach event listener to Kotak 1 "Selengkapnya" button
  const adellworkBtn = servicesSection.querySelector('.service-cta-btn[data-service="adellwork"]');
  if (adellworkBtn) {
    adellworkBtn.addEventListener('click', () => {
      openModal({
        title: 'Adellwork by Adellhub',
        subtitle: 'Asisten & Mentoring IT',
        message: 'Layanan Adellwork saat ini masih dalam progress pengerjaan intensif. Terima kasih atas antusiasme Anda! Daftarkan email Anda untuk mendapatkan akses awal saat kami resmi diluncurkan.',
        cta1Text: 'Gabung Waitlist via Email',
        cta2Text: '@adellhub via Sosial Media',
        cta2Url: 'https://instagram.com/adellhub',
      });
    });
  }

  return servicesSection;
}
