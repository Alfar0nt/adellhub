/**
 * Adellhub Links — Konfigurasi & Render Kartu Link
 *
 * ES module kompatibel Vite (pola sama dengan `src/components/portfolio.js`):
 * ikon brand di-import sebagai modul → Vite yang menangani URL asset,
 * sehingga path ikon tidak pernah patah di build produksi.
 *
 * ── KONFIGURASI KONTEN ─────────────────────────────────────────────────
 * Isi `LINKS` di bawah adalah PLACEHOLDER — ganti di Phase L-6 dengan
 * konten final dari user (title, description, url, dan ikon).
 * Ikon per link:
 *   image    — hasil ES import dari `./images/*.svg`
 *   svgIcon  — string SVG inline (zero network request)
 * ────────────────────────────────────────────────────────────────────────
 */

import linkedinIcon from './images/linkedin.svg';
import githubIcon from './images/github.svg';
import instagramIcon from './images/instagram.svg';
import youtubeIcon from './images/youtube.svg';
import spotifyIcon from './images/spotify.svg';

/* ── Ikon inline (tanpa file) ─────────────────────────────────────────── */
const fileIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="16" y1="13" x2="8" y2="13"></line>
  <line x1="16" y1="17" x2="8" y2="17"></line>
  <polyline points="10 9 9 9 8 9"></polyline>
</svg>`;

const bookIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
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

/* ── Data link (placeholder — konten final dari user di Phase L-6) ────── */
const LINKS = [
  {
    title: 'LinkedIn',
    description: 'Terhubung secara profesional.',
    url: 'https://www.linkedin.com/in/dhiaurrahman-rh/',
    image: linkedinIcon,
  },
  {
    title: 'Curriculum Vitae',
    description: 'Curriculum vitae / resume pribadi.',
    url: 'https://drive.google.com/file/d/1ZFVtF6Rs13ihJ0W-xy1Q6tcHSO65xzvH/view?usp=sharing',
    svgIcon: fileIcon,
  },
  {
    title: 'Personal Wiki & Blog',
    description: 'Dokumentasi karya, proyek, dan pemikiran.',
    url: 'https://wiki.dhiar.my.id',
    svgIcon: bookIcon,
  },
  {
    title: 'GitHub',
    description: 'Proyek pribadi dan open-source.',
    url: 'https://github.com/Alfar0nt/',
    image: githubIcon,
  },
  {
    title: 'Instagram',
    description: 'Dokumentasi pribadi.',
    url: 'https://instagram.com/dhiarharianto',
    image: instagramIcon,
  },
  {
    title: 'YouTube',
    description: 'Mayoritas proyek kampus.',
    url: 'https://www.youtube.com/@dhiarharianto/',
    image: youtubeIcon,
  },
  {
    title: 'Spotify',
    description: 'Lagu favorit.',
    url: 'https://open.spotify.com/user/8kdkeoxc1li5pzujpuy8n7ie6?si=5c04c94b6a704489',
    image: spotifyIcon,
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
    return `<img
              src="${escapeHtml(link.image)}"
              alt="${escapeHtml(link.title)} icon"
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

  // Skip will-change promotion di layar kecil untuk hemat GPU memory.
  const isMobile = window.matchMedia('(max-width: 480px)').matches;

  const fragment = document.createDocumentFragment();

  LINKS.forEach((link, index) => {
    const linkEl = document.createElement('a');
    linkEl.href = safeExternalUrl(link.url);
    linkEl.className = 'link-card';
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';

    // Stagger entri kartu — 60ms per kartu (satu momen, tidak diblokir interaksi).
    linkEl.style.animationDelay = `${0.1 + index * 0.06}s`;

    if (!isMobile) {
      linkEl.style.willChange = 'transform';
      linkEl.addEventListener('animationend', () => {
        linkEl.style.willChange = 'auto';
      }, { once: true });
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