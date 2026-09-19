# adellhub

Landing page satu halaman untuk Adellhub — ekosistem startup IT (Adellwork, Adelltech, Adellbooth). Dibangun dengan Vite + Vanilla JS, desain Bauhaus.

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
npm run dev      # dev server → http://localhost:3000
npm run build    # production build → dist/
npm run preview  # preview build → http://localhost:4173
```

---

## Deployment — Cloudflare Pages

Landing page ini statis (SPA + halaman legal), di-build ke folder `dist/`, dan di-deploy ke **Cloudflare Pages**. **Status: sudah live** di `https://adellhub.biz.id` (Git integration + custom domain). Instruksi di bawah sebagai referensi untuk setup serupa atau re-deploy.

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
└── vite.config.js              # Vite config (multi-page input)
```

## Tech Stack

- **Build:** Vite 8 (Vanilla JavaScript, Vanilla CSS)
- **Fonts:** Space Grotesk (display) + Inter (body), via Google Fonts
- **Icons:** Inline SVG geometris (kustom)
- **Hosting:** Cloudflare Pages