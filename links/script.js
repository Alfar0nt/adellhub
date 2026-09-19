/**
 * Adellhub Links — Konfigurasi & Render Kartu Link
 *
 * ES module kompatibel Vite (pola sama dengan `src/components/portfolio.js`):
 * ikon brand di-import sebagai modul → Vite yang menangani URL asset,
 * sehingga path ikon tidak pernah patah di build produksi.
 *
 * ── KONFIGURASI KONTEN ─────────────────────────────────────────────────
 * Ubah `LINKS` di bawah (title, description, url, dan ikon).
 * Ikon per link:
 *   svgIcon  — string SVG inline (zero network request) — DIREKOMENDASIKAN
 *   image    — hasil ES import dari file SVG; folder `./images/` perlu
 *              dibuat ulang jika fitur ini dipakai lagi
 * ────────────────────────────────────────────────────────────────────────
 */

/* ── Ikon inline (tanpa file) ─────────────────────────────────────────── */
const globeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="2" y1="12" x2="22" y2="12"></line>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
</svg>`;

/* Glyph brand monokrom — filled, `currentColor` (charcoal sejalan globe) */
const instagramGlyph = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
</svg>`;

const tiktokGlyph = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
</svg>`;

const externalIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
</svg>`;

const arrowIcon = `
<svg class="share-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  <polyline points="15 3 21 3 21 9"></polyline>
  <line x1="10" y1="14" x2="21" y2="3"></line>
</svg>`;

/* ── Data link (konten final — Phase L-6) ──────────────────────────────── */
const LINKS = [
  {
    title: 'Situs Resmi',
    description: 'Jelajahi website resmi Adellhub.',
    url: 'https://adellhub.biz.id',
    svgIcon: globeIcon,
  },
  {
    title: 'Instagram',
    description: '@adellhub',
    url: 'https://instagram.com/adellhub',
    svgIcon: instagramGlyph,
  },
  {
    title: 'TikTok',
    description: '@adellhub',
    url: 'https://tiktok.com/@adellhub',
    svgIcon: tiktokGlyph,
  },
];

/* ── Keamanan: hanya izinkan skema http/https (pola `safeExternalUrl` di
   `src/components/modal.js`) ──────────────────────────────────────────── */
const ALLOWED_SCHEMES = /^https?:/;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

const safeExternalUrl = (url) => {
  const candidate = String(url || '').trim();
  return ALLOWED_SCHEMES.test(candidate) ? candidate : '#';
};

/* ── Render kartu link ────────────────────────────────────────────────── */
function resolveMediaContent(link) {
  if (link.image) {
    // alt="" dekoratif: judul link terbaca sebagai teks di sebelahnya.
    return `<img
              src="${escapeHtml(link.image)}"
              alt=""
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
            >`;
  }
  if (link.svgIcon) {
    return link.svgIcon;
  }
  return externalIcon;
}

/**
 * DocumentFragment → semua kartu dibangun di balik layar, satu reflow
 * saat fragment di-append (praktik performa dipertahankan dari kode lama).
 */
function renderLinks() {
  const linksContainer = document.getElementById('links-container');
  if (!linksContainer) return;

  // Skip akan-change promotion di layar kecil untuk hemat GPU memory.
  const isMobile = window.matchMedia('(max-width: 480px)').matches;
  // Hemat CPU/baterai: tanpa stagger & will-change saat user minta reduced motion.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fragment = document.createDocumentFragment();

  LINKS.forEach((link, index) => {
    const linkEl = document.createElement('a');
    linkEl.href = safeExternalUrl(link.url);
    linkEl.className = 'link-card';
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    // Nama aksesibel eksplisit — memberi tahu pembaca layar bahwa link dibuka di tab baru.
    linkEl.setAttribute('aria-label', `${escapeHtml(link.title)} — buka di tab baru`);

    // Stagger entri kartu — 60ms per kartu (satu momen, tidak diblokir interaksi).
    // Dimatikan saat prefers-reduced-motion (CSS juga menonaktifkan durasi animasi).
    if (!prefersReducedMotion) {
      linkEl.style.animationDelay = `${0.1 + index * 0.06}s`;

      if (!isMobile) {
        linkEl.style.willChange = 'transform';
        linkEl.addEventListener('animationend', () => {
          linkEl.style.willChange = 'auto';
        }, { once: true });
      }
    }

    linkEl.innerHTML = `
      <div class="link-icon-container">
        ${resolveMediaContent(link)}
      </div>
      <div class="link-content">
        <div class="link-head">
          <span class="link-bullet" aria-hidden="true"></span>
          <h3 class="link-title">${escapeHtml(link.title)}</h3>
        </div>
        <p class="link-desc">${escapeHtml(link.description)}</p>
      </div>
      ${arrowIcon}
    `;

    fragment.appendChild(linkEl);
  });

  linksContainer.appendChild(fragment);
}

// Module dieksekusi setelah HTML selesai diparsing (modul = deferred secara implisit).
renderLinks();