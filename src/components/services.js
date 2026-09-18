/**
 * Bauhaus Services Section Component
 * Displays 3 geometric service cards. Currently executing Kotak 1: Adellwork.
 */

import { openModal, openWaitlistForm } from './modal.js';

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

        <!-- KOTAK 2: ADELLTECH -->
        <article class="service-card service-card-active" id="card-adelltech">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Diagonal Screwdriver Tool -->
                <g transform="rotate(45 20 20)">
                  <rect x="17.5" y="4" width="5" height="18" fill="var(--color-dark)" />
                  <rect x="16.5" y="22" width="7" height="4" fill="var(--color-dark)" />
                  <rect x="17.5" y="26" width="5" height="5" fill="var(--color-dark)" />
                </g>
                <!-- Bauhaus Gear Accent Ring -->
                <circle cx="20" cy="20" r="10" stroke="var(--color-accent)" stroke-width="2" stroke-dasharray="4 3" />
                <!-- Red Accent Center -->
                <rect x="18" y="18" width="4" height="4" fill="var(--color-accent)" />
              </svg>
            </div>
            <span class="badge badge-accent">Coming Soon</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow">Adelltech by Adellhub</div>
            <h3 class="service-title">Service Ringan & Debloating Laptop/Komputer</h3>
            <p class="service-desc text-body">
              Optimalisasi performa perangkat keras dan pembersihan sistem operasi secara komprehensif.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Service ringan & maintenance laptop/komputer</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Upgrade SSD & RAM</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Repasta thermal paste & pembersihan menyeluruh</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adelltech">
              Selengkapnya
            </button>
          </div>
        </article>

        <!-- KOTAK 3: ADELLBOOTH -->
        <article class="service-card service-card-active" id="card-adellbooth">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Camera Body -->
                <rect x="4" y="13" width="32" height="19" stroke="var(--color-dark)" stroke-width="2.5" fill="var(--color-bg)" />
                <!-- Viewfinder Bump -->
                <rect x="10" y="9" width="10" height="5" fill="var(--color-dark)" />
                <!-- Shutter Accent -->
                <rect x="28" y="16" width="5" height="2" fill="var(--color-dark)" />
                <!-- Lens Circle -->
                <circle cx="20" cy="22.5" r="6.5" stroke="var(--color-dark)" stroke-width="2.5" />
                <!-- Lens Core -->
                <circle cx="20" cy="22.5" r="2.75" fill="var(--color-accent)" />
                <!-- Tripod Stand -->
                <line x1="20" y1="32" x2="20" y2="37" stroke="var(--color-dark)" stroke-width="2.5" />
                <line x1="14" y1="37" x2="26" y2="37" stroke="var(--color-dark)" stroke-width="2.5" />
              </svg>
            </div>
            <span class="badge badge-accent">Coming Soon</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow">Adellbooth by Adellhub</div>
            <h3 class="service-title">Platform Software Photobooth All-in-One</h3>
            <p class="service-desc text-body">
              Solusi piranti lunak terintegrasi untuk event modern, otomasi capture, dan instant printing.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Kompatibel dengan hampir semua kamera & printer</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Pembayaran QRIS otomatis via payment gateway</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Filter wajah & upload otomatis ke Google Drive</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adellbooth">
              Selengkapnya
            </button>
          </div>
        </article>

      </div>

    </div>
  `;

  // Attach event listeners to all "Selengkapnya" buttons
  const serviceModalConfig = {
    adellwork: {
      title: 'Adellwork by Adellhub',
      subtitle: 'Asisten & Mentoring IT',
      message: 'Layanan Adellwork saat ini masih dalam progress pengerjaan intensif. Terima kasih atas antusiasme Anda! Daftarkan email Anda untuk mendapatkan akses awal saat kami resmi diluncurkan.',
      cta1Text: 'Gabung Waitlist via Email',
      cta1Action: () => openWaitlistForm({ service: 'Adellwork' }),
      cta2Text: '@adellhub via Sosial Media',
      cta2Url: 'https://instagram.com/adellhub',
    },
    adelltech: {
      title: 'Adelltech by Adellhub',
      subtitle: 'Reparasi & Optimasi Teknologi',
      message: 'Layanan Adelltech saat ini masih dalam progress pengerjaan intensif. Solusi optimasi performa perangkat dan pembersihan sistem akan segera hadir. Terima kasih atas antusiasme Anda! Daftarkan email Anda untuk mendapatkan akses awal saat kami resmi diluncurkan.',
      cta1Text: 'Gabung Waitlist via Email',
      cta1Action: () => openWaitlistForm({ service: 'Adelltech' }),
      cta2Text: '@adellhub via Sosial Media',
      cta2Url: 'https://instagram.com/adellhub',
    },
    adellbooth: {
      title: 'Adellbooth by Adellhub',
      subtitle: 'Platform Photobooth Digital',
      message: 'Layanan Adellbooth saat ini masih dalam progress pengerjaan intensif. Platform photobooth all-in-one untuk event modern akan segera hadir. Terima kasih atas antusiasme Anda! Daftarkan email Anda untuk mendapatkan akses awal saat kami resmi diluncurkan.',
      cta1Text: 'Gabung Waitlist via Email',
      cta1Action: () => openWaitlistForm({ service: 'Adellbooth' }),
      cta2Text: '@adellhub via Sosial Media',
      cta2Url: 'https://instagram.com/adellhub',
    },
  };

  servicesSection.querySelectorAll('.service-cta-btn[data-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const config = serviceModalConfig[btn.dataset.service];
      if (config) openModal(config);
    });
  });

  return servicesSection;
}
