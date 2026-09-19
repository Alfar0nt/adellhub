# TECH-STACK — Adellhub Landing Page

**Versi Dokumen:** 1.2.0  
**Tanggal:** 2026-09-18

---

## 1. Framework & Build Tool

| Layer | Teknologi | Versi | Alasan |
|-------|-----------|-------|--------|
| Build Tool | **Vite** | 8.3.0 (pinned) | Fast HMR, zero-config, output optimal |
| Base Language | **Vanilla JavaScript** | ES2022+ | Ringan, tidak perlu framework berat untuk SPA sederhana |
| Markup | **HTML5** | - | Semantic & accessible |
| Styling | **Vanilla CSS** | CSS3 | Kontrol penuh untuk Bauhaus geometry & animasi |

---

## 2. Font & Assets

| Aset | Sumber | Keterangan |
|------|--------|------------|
| Font Display | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Heading, bold, Bauhaus feel |
| Font Body | [Inter](https://fonts.google.com/specimen/Inter) | Body text, readability |
| Icons | Inline SVG | Custom geometris, tidak ada dependensi icon library |
| Gambar Portfolio | Handcrafted SVG (keputusan tim) | 3 placeholder artistik Bauhaus (`adellwork/adelltech/adellbooth-preview.svg`) — **bukan** AI-generated |
| Favicon | `public/favicon.svg` | Logo geometris Adellhub |
| Stylesheet Legal | `public/legal.css` | Style bersama halaman privacy-policy & terms-of-service |
| Share Image | `public/og-image.png` | 1200×630, gaya Bauhaus (source: `docs/og-image.svg`) |
| Security Headers | `public/_headers` | Headers keamanan untuk Cloudflare Pages (CSP, HSTS, dll) |

---

## 3. Struktur Proyek

```
adellhub/
├── .ai/                    # Dokumentasi proyek (PRD, Tasks, dll)
│   ├── PRD.md
│   ├── TECH-STACK.md
│   └── TASKS.md
├── docs/                   # Changelog & release notes
│   └── CHANGELOG.md
├── public/                 # Static files (di-copy langsung ke dist/)
│   ├── _headers            # Headers keamanan (Cloudflare Pages)
│   ├── favicon.svg
│   ├── legal.css           # Stylesheet bersama halaman legal
│   └── og-image.png        # Social share image 1200×630
├── src/                    # Source code (setelah init Vite)
│   ├── main.js             # Entry point JS
│   ├── style.css           # Global styles & design tokens
│   ├── components/         # Komponen JS modular
│   │   ├── preloader.js
│   │   ├── header.js
│   │   ├── hero.js
│   │   ├── services.js
│   │   ├── portfolio.js
│   │   ├── contact.js
│   │   └── modal.js
│   ├── utils/              # Helper functions (smooth scroll, observer)
│   └── assets/             # Gambar & SVG statis
│       └── images/
├── index.html              # Entry point SPA utama
├── privacy-policy.html     # Halaman statis Kebijakan Privasi (multi-page entry)
├── terms-of-service.html   # Halaman statis Syarat & Ketentuan (multi-page entry)
├── vite.config.js          # Konfigurasi Vite (rollupOptions.input untuk multi-page)
├── package.json
└── README.md
```

---

## 4. Styling & Design System

### Design Tokens (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-bg:      #F5F0E8;   /* Off-white / krem */
  --color-dark:    #1A1A1A;   /* Hitam arang */
  --color-accent:  #D2251C;   /* Merah Bauhaus (kontras WCAG AA) */
  --color-white:   #FFFFFF;
  --color-gray:    #757575;   /* Teks sekunder (kontras AA) */

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* Spacing */
  --spacing-unit: 8px;

  /* Transitions */
  --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 5. Dependensi

### Dependencies (runtime)
> Tidak ada — pure Vanilla JS, tidak butuh library runtime

### DevDependencies
| Package | Versi | Fungsi |
|---------|-------|--------|
| `vite` | 8.3.0 (pinned, tanpa `^`) | Build tool & dev server — version pinning agar `npm audit` bersih |

---

## 5.1. Installed AI Agent Skills

Daftar skills yang harus digunakan AI Agent selama pengerjaan:

| Skill | Tujuan Penggunaan |
|-------|-------------------|
| `frontend-design` | Guideline tipografi, layout, styling khusus agar desain terasa otentik (Bauhaus) |
| `landing-page-generator` | Struktur flow konversi 5-step, letak elemen trust, dan optimasi copy |
| `semantic-html-and-seo` | Standar tag HTML5, alt text gambar, meta tags, dan Open Graph (OG) |
| `find-animation-opportunities`| Prinsip "restraint" (menahan diri) pada animasi; memastikan animasi fungsional |
| `svg-icon-generator` | Pembuatan bentuk geometris SVG (lingkaran, kotak, dll) tanpa external library |

---

## 6. Hosting & Deployment

| Aspek | Detail |
|-------|--------|
| Status | **LIVE** di `https://adellhub.biz.id` (Cloudflare Pages, custom domain) |
| Platform | **Cloudflare Pages** — Git integration (push ke `main` → auto deploy) |
| Build Command | `npm run build` |
| Output Dir | `dist/` |
| Dev Command | `npm run dev` |
| Build Config | Multi-page: `index.html` + `privacy-policy.html` + `terms-of-service.html` (`vite.config.js` → `rollupOptions.input`) |
| Security Headers | `public/_headers` → otomatis diterapkan Cloudflare Pages ke seluruh route |
| Email | Cloudflare Email Routing **aktif**: `waitlist@adellhub.biz.id` & `hello@adellhub.biz.id` → email pribadi |

---

## 7. Browser Support

| Browser | Versi Minimum |
|---------|---------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

> **Mobile:** iOS Safari 14+, Chrome Android 90+

---

## 8. Performance Target

| Metrik | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
