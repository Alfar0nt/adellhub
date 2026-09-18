/**
 * Bauhaus Portfolio Section Component
 * Rekam jejak dalam grid geometris dengan placeholder artistik bergaya Bauhaus.
 */

import adellworkPreview from '../assets/images/adellwork-preview.svg';
import adelltechPreview from '../assets/images/adelltech-preview.svg';
import adellboothPreview from '../assets/images/adellbooth-preview.svg';

const portfolioItems = [
  {
    id: 'adellwork',
    eyebrow: 'Adellwork by Adellhub',
    title: 'Asisten & Mentoring IT',
    desc: 'Alur mentoring personal untuk pelajar, mahasiswa, dan praktisi pemula.',
    image: adellworkPreview,
    alt: 'Komposisi geometris Bauhaus merepresentasikan alur mentoring Adellwork: satu titik pusat terhubung ke tiga titik bimbingan.',
  },
  {
    id: 'adelltech',
    eyebrow: 'Adelltech by Adellhub',
    title: 'Service & Optimasi Perangkat',
    desc: 'Workspace perawatan laptop: service ringan, upgrade, dan debloating.',
    image: adelltechPreview,
    alt: 'Komposisi geometris Bauhaus merepresentasikan workspace reparasi laptop Adelltech: laptop terbuka, bar progress, dan roda gigi.',
  },
  {
    id: 'adellbooth',
    eyebrow: 'Adellbooth by Adellhub',
    title: 'Software Photobooth',
    desc: 'Antarmuka photobooth all-in-one untuk event modern.',
    image: adellboothPreview,
    alt: 'Komposisi geometris Bauhaus merepresentasikan antarmuka photobooth Adellbooth: layar, hitung mundur, tombol capture, dan strip foto.',
  },
];

export function initPortfolio() {
  const portfolioSection = document.createElement('section');
  portfolioSection.id = 'portfolio';
  portfolioSection.className = 'portfolio-section section-spacing';

  portfolioSection.innerHTML = `
    <div class="container">

      <!-- Section Header -->
      <div class="section-header">
        <div class="section-header-top">
          <span class="text-label text-muted">02. REKAM JEJAK</span>
          <div class="section-header-line" aria-hidden="true"></div>
        </div>
        <h2 class="section-title text-h2">REKAM JEJAK KAMI</h2>
        <p class="section-lead text-lead">
          Dokumentasi proyek, standar mutu teknis, dan inovasi yang sedang kami kembangkan.
        </p>
      </div>

      <!-- Portfolio 3-Column Geometric Grid -->
      <div class="portfolio-grid">
        ${portfolioItems.map((item) => `
          <figure class="portfolio-card">
            <div class="portfolio-frame">
              <img
                class="portfolio-image"
                src="${item.image}"
                alt="${item.alt}"
                loading="lazy"
                width="400"
                height="250"
              />
              <div class="portfolio-overlay" aria-hidden="true">
                <span class="portfolio-overlay-label">${item.title}</span>
              </div>
            </div>
            <figcaption class="portfolio-caption">
              <span class="portfolio-eyebrow">${item.eyebrow}</span>
              <h3 class="portfolio-title">${item.title}</h3>
              <p class="portfolio-desc">${item.desc}</p>
            </figcaption>
          </figure>
        `).join('')}
      </div>

    </div>
  `;

  return portfolioSection;
}