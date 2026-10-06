# TRD — Technical Requirements Document

**Nama Dokumen:** Technical Requirements Document (TRD)  
**Versi Dokumen:** 2.0.0  
**Tanggal:** 2026-10-06  
**Sebelumnya:** `TECH-STACK.md` v1.3.0  
**Author:** Adellhub Team

> **Design System & Panduan Visual** → Lihat [DESIGN.md](./DESIGN.md)

---

## 1. Framework & Build Tool

| Layer | Teknologi | Versi | Alasan |
|-------|-----------|-------|--------|
| Build Tool | **Vite** | 8.3.0 (pinned) | Fast HMR, zero-config, output optimal |
| Base Language | **Vanilla JavaScript** | ES2022+ | Ringan, tidak perlu framework berat untuk SPA sederhana |
| Serverless Layer | **Cloudflare Pages Functions** | `functions/` (root, auto-detect) | Endpoint `POST /api/waitlist` + notifikasi Telegram tanpa backend/database |
| Markup | **HTML5** | — | Semantic & accessible |
| Styling | **Vanilla CSS** | CSS3 | Kontrol penuh untuk Bauhaus geometry & animasi |

---

## 2. Font & Assets

| Aset | Sumber | Keterangan |
|------|--------|------------|
| Font Display | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Heading, bold, Bauhaus feel |
| Font Body | [Inter](https://fonts.google.com/specimen/Inter) | Body text, readability |
| Icons | Inline SVG | Custom geometris, tidak ada dependensi icon library |
| Gambar Portfolio | Handcrafted SVG (keputusan tim) | 3 placeholder artistik Bauhaus (`adellwork/adelltech/adellbooth-preview.svg`) |
| Favicon | `public/favicon.svg` | Logo geometris Adellhub |
| Stylesheet Legal | `public/legal.css` | Style bersama halaman privacy-policy & terms-of-service |
| Share Image | `public/og-image.png` | 1200×630, gaya Bauhaus (source: `docs/og-image.svg`) |
| Security Headers | `public/_headers` | Headers keamanan untuk Cloudflare Pages (CSP, HSTS, dll) |

---

## 3. Struktur Proyek

```
adellhub/
├── .ai/                    # Dokumentasi proyek
│   ├── PRD.md              # Product Requirements Document
│   ├── TRD.md              # Technical Requirements Document (ini)
│   ├── DESIGN.md           # Design System & Brand Guide
│   ├── APP-FLOW.md         # Alur aplikasi (user & dev)
│   └── IMPLEMENTATION-PLAN.md # Tracker implementasi & to-do list
├── docs/                   # Changelog & release notes
│   └── CHANGELOG.md
├── functions/              # Cloudflare Pages Functions (serverless layer)
│   └── api/
│       └── waitlist.js     # Endpoint `POST /api/waitlist` → validasi + kirim ke Telegram
├── public/                 # Static files (di-copy langsung ke dist/)
│   ├── _headers            # Headers keamanan (Cloudflare Pages)
│   ├── favicon.svg
│   ├── legal.css           # Stylesheet bersama halaman legal
│   └── og-image.png        # Social share image 1200×630
├── src/                    # Source code (Vite)
│   ├── main.js             # Entry point JS
│   ├── style.css           # Global styles & design tokens (ikuti DESIGN.md)
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
├── links/                  # Link-in-bio → /links/ (multi-page entry `links`)
│   ├── index.html          # Profil + kartu link (rendered via script.js)
│   ├── styles.css          # Bauhaus — tokens sama dgn halaman utama (ikuti DESIGN.md)
│   └── script.js           # ES module: config LINKS + ikon glyph inline
├── vite.config.js          # Konfigurasi Vite (rollupOptions.input untuk multi-page)
├── package.json
└── README.md
```

---

## 4. Design Tokens

> Design tokens lengkap (warna, tipografi, spacing, animasi) ada di **[DESIGN.md → Section 9](./DESIGN.md#9-design-tokens-css-custom-properties)**.

Ringkasan token utama untuk referensi cepat:

```css
:root {
  --color-bg:      #F5F0E8;
  --color-dark:    #1A1A1A;
  --color-accent:  #D2251C;
  --color-white:   #FFFFFF;
  --color-gray:    #757575;

  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;

  --spacing-unit: 8px;
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
| `wrangler` | 4.135.0 (pinned eksak, tanpa `^`) | Dev tool Cloudflare Pages — test lokal endpoint & Functions via `wrangler pages dev` |

---

## 5.1 Installed AI Agent Skills

Daftar skills yang digunakan AI Agent selama pengerjaan:

| Skill | Tujuan Penggunaan |
|-------|-------------------|
| `frontend-design` | Guideline tipografi, layout, styling khusus agar desain terasa otentik (Bauhaus) |
| `landing-page-generator` | Struktur flow konversi 5-step, letak elemen trust, dan optimasi copy |
| `semantic-html-and-seo` | Standar tag HTML5, alt text gambar, meta tags, dan Open Graph (OG) |
| `find-animation-opportunities` | Prinsip "restraint" pada animasi; memastikan animasi fungsional |
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
| Dev + Serverless | `npm run dev:pages` (build + `wrangler pages dev dist`) |
| Build Config | Multi-page: `index.html` + `privacy-policy.html` + `terms-of-service.html` + `links/index.html` |
| Security Headers | `public/_headers` → otomatis diterapkan Cloudflare Pages ke seluruh route |
| Email | Cloudflare Email Routing **aktif**: `waitlist@adellhub.biz.id` & `hello@adellhub.biz.id` → email pribadi |

---

## 7. Serverless Architecture

### Endpoint: `POST /api/waitlist`

**File:** `functions/api/waitlist.js`

```
┌──────────────┐    POST /api/waitlist    ┌──────────────────────┐
│  Frontend    │ ──────────────────────>  │  Cloudflare Pages    │
│  (modal.js)  │  { name, email,          │  Functions           │
│              │    service, meta }        │  (functions/api/     │
│              │ <──────────────────────  │   waitlist.js)       │
│  ← JSON resp │                          └──────────┬───────────┘
└──────────────┘                                     │
                                                     │ Telegram Bot API
                                                     ▼
                                           ┌──────────────────────┐
                                           │  Telegram Group      │
                                           │  (Topics, thread 2)  │
                                           └──────────────────────┘
```

### Environment Variables (Secrets)

| Variable | Lokasi | Keterangan |
|----------|--------|------------|
| `TELEGRAM_BOT_TOKEN` | Cloudflare Dashboard → Pages → Settings → Environment Variables | Token dari @BotFather — **encrypted**, jangan commit |
| `TELEGRAM_CHAT_ID` | Cloudflare Dashboard (encrypted) | `-1003957917701` — Chat ID grup Telegram |
| `TELEGRAM_THREAD_ID` | Cloudflare Dashboard (encrypted) | `2` — ID topic/thread dalam grup (Topics) |

> Untuk **pengembangan lokal:** isi `.dev.vars` di root proyek (otomatis dibaca `wrangler pages dev`) — `.dev.vars` sudah ada di `.gitignore`.

### Security Features

| Fitur | Implementasi |
|-------|-------------|
| CORS strict | Hanya `adellhub.biz.id`, `www.adellhub.biz.id`, `*.pages.dev`, origin lokal |
| Input validation | HTML stripping, CRLF blocking, length limits (name≤100, email≤254, service≤100) |
| Payload limit | Max 10KB → HTTP 413 |
| Honeypot anti-bot | Field tersembunyi; jika terisi → silent success tanpa notifikasi |
| Timestamp check | Submit < 2 detik → silent success (bot detection) |
| HTML escaping | Semua input di-escape sebelum dikirim ke Telegram |

---

## 8. Browser Support

| Browser | Versi Minimum |
|---------|---------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

> **Mobile:** iOS Safari 14+, Chrome Android 90+

---

## 9. Performance Target

| Metrik | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ Verified |
| FID (First Input Delay) | < 100ms | ✅ Verified |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ Verified |
| First Contentful Paint | < 1.5s | ✅ Verified |
| Time to Interactive | < 3s | ✅ Verified |
| Lighthouse Performance | > 90 | ✅ Verified |
| Lighthouse Accessibility | > 90 | ✅ Verified |

---

## 10. Riwayat Perubahan

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0.0 | 2026-09-18 | Versi awal TECH-STACK.md |
| 1.1.0 | 2026-09-18 | Sinkronisasi skills & warna WCAG AA |
| 1.2.0 | 2026-09-18 | Tambah legal pages, multi-page Vite config |
| 1.3.0 | 2026-09-19 | Tambah wrangler devDependency, script dev:pages, serverless architecture |
| 2.0.0 | 2026-10-06 | Rename TECH-STACK.md → TRD.md; bagian Design Tokens dipindah ke DESIGN.md; tambah seksi Serverless Architecture, Security Features |
