/**
 * Bauhaus Services Section Component
 * Displays 4 core geometric service cards + 1 upcoming service teaser.
 * Features Adellroute as the currently working (#1 highlighted) service.
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
        <h2 class="section-title text-h2">SOLUSI TEKNOLOGI TERPADU &amp; TERDEPAN.</h2>
        <p class="section-lead text-lead">
          Setiap unit di bawah naungan Adellhub dirancang untuk menjawab tantangan komputasi dan bisnis digital secara presisi. Adellroute saat ini sedang dalam tahap pengerjaan aktif menuju peluncuran awal, didukung rangkaian layanan inovatif lainnya.
        </p>
      </div>

      <!-- Services Geometric Grid (Featured Highlight + Core & Upcoming Cards) -->
      <div class="services-grid">
        
        <!-- KOTAK 1: ADELLROUTE (Currently Working / Highlighted - Cobalt Blue) -->
        <article class="service-card service-card-active service-card-highlight" id="card-adellroute">
          <div class="service-card-highlight-inner">
            <div class="service-card-highlight-main">
              <div class="service-card-top">
                <div class="service-icon-wrapper" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Central AI Router Core (Cobalt Blue) -->
                    <rect x="14" y="14" width="12" height="12" stroke="var(--color-adellroute)" stroke-width="2.5" fill="var(--color-bg)" />
                    <rect x="17" y="17" width="6" height="6" fill="var(--color-adellroute)" />
                    <!-- Input Node (Left) -->
                    <circle cx="6" cy="20" r="3.5" stroke="var(--color-dark)" stroke-width="2" fill="var(--color-bg)" />
                    <line x1="9.5" y1="20" x2="14" y2="20" stroke="var(--color-dark)" stroke-width="2" />
                    <!-- Output Node (Right) -->
                    <circle cx="34" cy="20" r="3.5" stroke="var(--color-dark)" stroke-width="2" fill="var(--color-bg)" />
                    <line x1="26" y1="20" x2="30.5" y2="20" stroke="var(--color-dark)" stroke-width="2" />
                    <!-- Model Nodes (Top & Bottom Branches) -->
                    <circle cx="20" cy="6" r="3" stroke="var(--color-dark)" stroke-width="2" fill="var(--color-bg)" />
                    <line x1="20" y1="9" x2="20" y2="14" stroke="var(--color-dark)" stroke-width="2" />
                    <circle cx="20" cy="34" r="3" stroke="var(--color-dark)" stroke-width="2" fill="var(--color-bg)" />
                    <line x1="20" y1="26" x2="20" y2="31" stroke="var(--color-dark)" stroke-width="2" />
                    <!-- Red Bauhaus Signature Accent -->
                    <rect x="29" y="8" width="4" height="4" fill="var(--color-accent)" />
                  </svg>
                </div>
                <span class="badge badge-route">Currently Working</span>
              </div>

              <div class="service-card-body">
                <div class="service-eyebrow eyebrow-route">Adellroute by Adellhub</div>
                <h3 class="service-title">Penyedia &amp; Perutean API Token AI Multi-Model</h3>
                <p class="service-desc text-body">
                  Layanan reseller dan router API token AI terpadu. Memberikan akses instan ke berbagai model AI kelas dunia dengan sistem penetapan harga per sejuta token yang transparan dan terukur untuk input maupun output.
                </p>
              </div>
            </div>

            <div class="service-card-highlight-side">
              <ul class="service-features">
                <li class="service-feature-item">
                  <span class="feature-bullet feature-bullet-route" aria-hidden="true"></span>
                  <span>Multi-model terkemuka: OpenAI, Claude, DeepSeek, &amp; Gemini</span>
                </li>
                <li class="service-feature-item">
                  <span class="feature-bullet feature-bullet-route" aria-hidden="true"></span>
                  <span>Billing token fleksibel &amp; terpisah antara input dan output</span>
                </li>
                <li class="service-feature-item">
                  <span class="feature-bullet feature-bullet-route" aria-hidden="true"></span>
                  <span>Endpoint OpenAI-compatible, latensi rendah &amp; kuota real-time</span>
                </li>
              </ul>

              <div class="service-card-footer">
                <button type="button" class="btn btn-primary btn-route w-full service-cta-btn" data-service="adellroute">
                  Selengkapnya
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- KOTAK 2: ADELLWORK -->
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
            <h3 class="service-title">Bantuan &amp; Mentoring Asisten Tugas IT, Desain, Jaringan</h3>
            <p class="service-desc text-body">
              Layanan asistensi dan mentoring personal terpercaya untuk pelajar, mahasiswa, dan praktisi pemula dalam menyelesaikan tantangan komputasi dan eksplorasi desain kreatif.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Mentoring pemrograman, algoritma &amp; basis data</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Asistensi desain UI/UX &amp; media kreatif</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Konfigurasi jaringan komputer &amp; troubleshooting dasar</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adellwork">
              Selengkapnya
            </button>
          </div>
        </article>

        <!-- KOTAK 3: ADELLTECH -->
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
            <h3 class="service-title">Service Ringan &amp; Debloating Laptop/Komputer</h3>
            <p class="service-desc text-body">
              Optimalisasi performa perangkat keras dan pembersihan sistem operasi secara komprehensif untuk produktivitas maksimal.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Service ringan &amp; maintenance laptop/komputer</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Upgrade SSD &amp; RAM</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Repasta thermal paste &amp; pembersihan menyeluruh</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adelltech">
              Selengkapnya
            </button>
          </div>
        </article>

        <!-- KOTAK 4: ADELLBOOTH -->
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
                <span>Kompatibel dengan hampir semua kamera &amp; printer</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Pembayaran QRIS otomatis via payment gateway</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Filter wajah &amp; upload otomatis ke Google Drive</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="adellbooth">
              Selengkapnya
            </button>
          </div>
        </article>

        <!-- KOTAK 5: MORE TO COME (Upcoming Services Teaser) -->
        <article class="service-card service-card-upcoming" id="card-more-to-come">
          <div class="service-card-top">
            <div class="service-icon-wrapper" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Dashed Circular Perimeter -->
                <circle cx="20" cy="20" r="14" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="4 3" />
                <!-- Bauhaus Plus Cross -->
                <line x1="20" y1="11" x2="20" y2="29" stroke="var(--color-dark)" stroke-width="2.5" stroke-linecap="square" />
                <line x1="11" y1="20" x2="29" y2="20" stroke="var(--color-dark)" stroke-width="2.5" stroke-linecap="square" />
                <!-- Accent Square Center -->
                <rect x="18" y="18" width="4" height="4" fill="var(--color-accent)" />
              </svg>
            </div>
            <span class="badge badge-muted">Future Vision</span>
          </div>

          <div class="service-card-body">
            <div class="service-eyebrow">Adellhub Ecosystem</div>
            <h3 class="service-title">Layanan Mendatang (More to Come)</h3>
            <p class="service-desc text-body">
              Ekosistem Adellhub terus berevolusi menghadirkan solusi teknologi mutakhir. Berbagai produk baru sedang kami riset untuk melengkapi kebutuhan digital Anda di masa mendatang.
            </p>

            <ul class="service-features">
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Riset berkelanjutan produk &amp; otomasi perangkat lunak</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Pengembangan tools berbasis kebutuhan komunitas &amp; industri</span>
              </li>
              <li class="service-feature-item">
                <span class="feature-bullet" aria-hidden="true"></span>
                <span>Kolaborasi terbuka untuk integrasi teknologi baru</span>
              </li>
            </ul>
          </div>

          <div class="service-card-footer">
            <button type="button" class="btn btn-outline w-full service-cta-btn" data-service="more-to-come">
              Usulkan Ide / Layanan
            </button>
          </div>
        </article>

      </div>

    </div>
  `;

  // Attach event listeners to all "Selengkapnya" buttons
  const serviceModalConfig = {
    adellroute: {
      title: 'Adellroute by Adellhub',
      subtitle: 'Penyedia & Gateway API Token AI',
      message: 'Platform perutean API token AI multi-model saat ini sedang dalam tahap pengerjaan aktif (Currently Working). Kami sedang mempersiapkan infrastruktur router berlatensi rendah dengan sistem tagihan token yang transparan untuk model OpenAI, Claude, DeepSeek, dan Gemini. Daftarkan email Anda untuk mendapatkan akses awal & kuota uji coba eksklusif saat kami membuka fase beta.',
      cta1Text: 'Gabung Waitlist Early Access',
      cta1Action: () => openWaitlistForm({ service: 'Adellroute' }),
      cta2Text: '@adellhub via Sosial Media',
      cta2Url: 'https://instagram.com/adellhub',
    },
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
    'more-to-come': {
      title: 'More to Come — Adellhub',
      subtitle: 'Inovasi & Layanan Masa Depan',
      message: 'Adellhub berkomitmen membangun ekosistem teknologi yang lengkap. Punya kebutuhan spesifik, ide perangkat lunak, atau ingin berkolaborasi untuk unit bisnis berikutnya? Beritahu tim kami!',
      cta1Text: 'Kirim Usulan via Waitlist',
      cta1Action: () => openWaitlistForm({ service: 'Ide Layanan Baru' }),
      cta2Text: 'Hubungi via WhatsApp',
      cta2Url: 'https://wa.me/6285179697112',
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
