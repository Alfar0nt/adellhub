# adellhub

Landing page satu halaman untuk Adellhub — ekosistem startup IT (Adellwork, Adelltech, Adellbooth). Dibangun dengan Vite + Vanilla JS, desain Bauhaus. Termasuk halaman **link-in-bio** di **`https://adellhub.biz.id/links/`**.

**🔴 Live:** https://adellhub.biz.id (Cloudflare Pages, custom domain).

## Prerequisites

- **Node.js** ≥ 18
- **npm**
- (Opsional) [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) untuk deploy manual via command line

## Setup

```bash
git clone https://github.com/adellhub/adellhub.git
cd adellhub
npm install
```

## Development

```bash
npm run dev        # dev server → http://localhost:3000
npm run dev:pages  # build + uji lokal endpoint serverless (wrangler pages dev dist) → http://localhost:8788
npm run build      # production build → dist/
npm run preview    # preview build → http://localhost:4173
```

---

## Deployment — Cloudflare Pages

Landing page ini statis (SPA + halaman legal + link-in-bio), di-build ke folder `dist/`, dan di-deploy ke **Cloudflare Pages**. **Status: sudah live** di `https://adellhub.biz.id` (Git integration + custom domain). Instruksi di bawah sebagai referensi untuk setup serupa atau re-deploy.

### Via Git Integration (Recommended)

1. Push repo ini ke GitHub atau GitLab.
2. Di **Cloudflare Dashboard** → **Pages** → **Create a project** → hubungkan Git provider.
3. Pilih repo `adellhub`:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/`
   - Environment variables: tidak diperlukan
4. Klik **Save and Deploy** — Cloudflare build & deploy otomatis ke `*.pages.dev`.
5. Setelah deploy pertama, tambahkan **Custom Domain**:
   - Pages → project → **Custom domains** → Add custom domain
   - Masukkan `adellhub.biz.id` — verifikasi DNS otomatis jika domain sudah berada di zona Cloudflare yang sama.

### Via Wrangler CLI (Manual)

```bash
# Install Wrangler jika belum (sekali saja)
npm install -g wrangler

# Buat project Pages (sekali saja)
npx wrangler pages project create adellhub --production-branch main

# Build & deploy
npm run build
npx wrangler pages deploy dist/ --project-name adellhub
```

Setelah deploy, tambahkan custom domain `adellhub.biz.id` di dashboard Cloudflare Pages (lihat langkah 5 di atas).

### Environment Variables (Waitlist → Telegram)

Endpoint serverless `POST /api/waitlist` (Cloudflare Pages Functions) membaca 3 variabel environment untuk mengirim notifikasi ke grup Telegram:

| Variable | Contoh | Peran |
|----------|--------|-------|
| `TELEGRAM_BOT_TOKEN` | `<token dari @BotFather>` | Token bot Telegram (secret) |
| `TELEGRAM_CHAT_ID` | `-1003957917701` | Chat ID grup Telegram bertopik |
| `TELEGRAM_THREAD_ID` | `2` | `message_thread_id` topic/thread tujuan |

- Setel di **Cloudflare Dashboard → Pages → project → Settings → Environment variables** (untuk production).
- Untuk **pengembangan lokal**, isi `.dev.vars` di root proyek (format `KEY=value`, otomatis dibaca `wrangler pages dev`) — pastikan tidak commit: `.dev.vars` sudah ada di `.gitignore`.

### Rate Limiting & Security Hardening

- **Rate limiting:** Maksimal **5 request per menit per IP** (Cloudflare Cache API). Request melebihi batas → HTTP 429.
- **CORS allowed origins:** `https://adellhub.biz.id`, `https://www.adellhub.biz.id`, `*.pages.dev`, dan origin lokal (`localhost`, `127.0.0.1`, LAN IP).
- **CORS strict:** Hanya origin `adellhub.biz.id`, `*.pages.dev`, dan origin lokal (`localhost`, `127.0.0.1`, LAN IP) yang diizinkan.
- **Input validation & sanitization:** HTML stripping, CRLF blocking, panjang karakter ketat, payload max 10KB.
- **HTML escaping:** Semua input di-escape sebelum dikirim ke Telegram (mencegah XSS di notifikasi).

### Test Lokal Endpoint (Wrangler)

```bash
npm run dev:pages
# → http://localhost:8788  (endpoint juga teruji: curl -X POST http://localhost:8788/api/waitlist)
```

`dev:pages` menjalankan build + `wrangler pages dev dist` — memuat `.dev.vars` dan menyajikan Functions (`/api/waitlist`) bersama aset statis.

> **⚠️ Jangan commit secret:** `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` hanya di Cloudflare Dashboard (encrypted) dan `.dev.vars` lokal (ter-ignore) — bukan di kode.

### Headers & Keamanan

- File `public/_headers` di-copy Vite ke `dist/_headers` dan dihormati Cloudflare Pages sebagai response headers untuk semua route.
- **Security headers yang aktif:** CSP, HSTS, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy, Permissions-Policy.
- Tidak perlu konfigurasi tambahan — headers berlaku global begitu deploy selesai.

---

## ✅ Status Launch — Checklist (Selesai)

Semua item verifikasi manual sudah dikerjakan setelah deploy.

### 1. Cloudflare Email Routing — Selesai
Form waitlist (`waitlist@adellhub.biz.id`) dan section kontak (`hello@adellhub.biz.id`) aktif via Cloudflare Email Routing.

- [x] Email Routing diaktifkan di domain `adellhub.biz.id`
- [x] Routing rule `waitlist@` → email pribadi
- [x] Routing rule `hello@` → email pribadi
- [x] Verifikasi email masuk berhasil

### 2. Share Image (og-image.png) — Selesai
- [x] `og-image.png` (1200×630, gaya Bauhaus) dibuat & tersimpan di `public/`
- [x] Live di `https://adellhub.biz.id/og-image.png`; preview social media tampil
- Source SVG: `docs/og-image.svg`

### 3. Verifikasi Browser & Tooling — Selesai
- [x] Halaman dicek di browser (Chrome & Firefox)
- [x] **Lighthouse** — hasil bagus, sesuai target (Performance & Accessibility ≥ 90)
- [x] Uji link (WhatsApp, email, Instagram), form waitlist, modal (backdrop/✕/ESC, tab trap)
- [x] Uji `prefers-reduced-motion`

---

## Project Structure

```
adellhub/
├── .ai/                        # Project documentation (PRD, TECH-STACK, TASKS)
├── docs/                       # CHANGELOG & source og-image.svg
├── public/                     # Static assets (Vite copies to dist/)
│   ├── _headers                # Cloudflare Pages response headers (security)
│   ├── favicon.svg
│   ├── legal.css               # Shared stylesheet untuk halaman legal
│   └── og-image.png            # Social share image 1200×630 (Bauhaus)
├── security/                   # Security audit reports & plans (gitignored)
├── src/
│   ├── main.js                 # Entry point
│   ├── style.css               # Bauhaus design tokens & styles
│   ├── components/             # Komponen modular JS
│   ├── assets/images/          # SVG placeholder Bergaya Bauhaus
│   └── utils/
├── index.html                  # SPA entry
├── privacy-policy.html         # Kebijakan Privasi (static, multi-page)
├── terms-of-service.html       # Syarat & Ketentuan (static, multi-page)
├── links/                      # Link-in-bio → /links/ (Vite entry `links`)
│   ├── index.html
│   ├── styles.css              # Bauhaus (tokens sama dgn halaman utama)
│   └── script.js               # ES module: config LINKS + ikon glyph inline
└── vite.config.js              # Vite config (multi-page input: main, privacy, terms, links)
```

## Tech Stack

- **Build:** Vite 8 (Vanilla JavaScript, Vanilla CSS)
- **Fonts:** Space Grotesk (display) + Inter (body), via Google Fonts
- **Icons:** Inline SVG geometris (kustom)
- **Hosting:** Cloudflare Pages