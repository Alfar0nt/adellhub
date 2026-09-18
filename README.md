# adellhub

Landing page satu halaman untuk Adellhub — ekosistem startup IT (Adellwork, Adelltech, Adellbooth). Dibangun dengan Vite + Vanilla JS, desain Bauhaus.

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

Landing page ini statis (SPA + halaman legal), di-build ke folder `dist/`, dan di-deploy ke **Cloudflare Pages**.

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

## ⚠️ Sebelum Launch — Checklist

Operasi manual ini **tidak bisa dilakukan oleh agent** dan wajib dicek sebelum deploy. Centang saat sudah selesai.

### 1. Cloudflare Email Routing
Form waitlist (`waitlist@adellhub.biz.id`) dan section kontak (`hello@adellhub.biz.id`) mengirim email ke **alamat yang belum aktif** sampai Email Routing diaktifkan di Cloudflare.

- [ ] Login ke [Cloudflare Dashboard](https://dash.cloudflare.com) → pilih domain `adellhub.biz.id`
- [ ] Buka **Email → Email Routing** → klik **Enable**
- [ ] Verifikasi alamat tujuan (email pribadi) lewat email konfirmasi
- [ ] Buat routing rule: `waitlist@` → email pribadi
- [ ] Buat routing rule: `hello@` → email pribadi

**Fallback:** ganti `WAITLIST_EMAIL` di `src/components/modal.js` dan `CONTACT_EMAIL` di `src/components/contact.js` ke alamat lain.

### 2. Buat Share Image (og-image.png)
Meta `og:image` / `twitter:image` menunjuk ke `https://adellhub.biz.id/og-image.png`. File ini belum ada — social media preview akan hilang tanpanya.

- [ ] Siapkan gambar 1200×630 px (PNG atau JPG, ≤ 8 MB)
- [ ] Simpan sebagai `og-image.png` di `public/`
- [ ] `npm run build` (Vite akan copy ke `dist/og-image.png`)

### 3. Verifikasi Browser & Tooling
Agent tidak punya Chrome — berikut wajib dicek di browser lokal.

- [ ] Jalankan `npm run dev`, buka di Chrome & Firefox
- [ ] Jalankan **Lighthouse** (Chrome DevTools → Lighthouse tab) — target: Performance ≥ 90, Accessibility ≥ 90
- [ ] Jalankan [W3C HTML Validator](https://validator.w3.org/) pada URL dev server
- [ ] Uji semua link: klien WhatsApp (`wa.me/6285179697112`), email (`mailto:hello@adellhub.biz.id`), Instagram (`@adellhub`)
- [ ] Uji form waitlist: input kosong, email salah, submit
- [ ] Uji modal tutup: klik backdrop, klik ✕, tekan Escape
- [ ] Uji keyboard navigation (Tab/Shift+Tab) di dalam modal — fokus tidak boleh keluar
- [ ] Uji `prefers-reduced-motion` di Chrome DevTools → Rendering → Emulate CSS media = `prefers-reduced-motion: reduce`

---

## Project Structure

```
adellhub/
├── .ai/                        # Project documentation (PRD, TECH-STACK, TASKS)
├── docs/                       # CHANGELOG
├── public/                     # Static assets (Vite copies to dist/)
│   ├── _headers                # Cloudflare Pages response headers (security)
│   ├── favicon.svg
│   └── legal.css               # Shared stylesheet untuk halaman legal
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