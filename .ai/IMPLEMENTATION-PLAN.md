# IMPLEMENTATION PLAN — Adellhub

**Versi Dokumen:** 1.0.0  
**Tanggal:** 2026-10-06  
**Status Keseluruhan:** 🟢 **LIVE** di `https://adellhub.biz.id` — Semua fitur utama selesai; beberapa item deployment & cleanup masih pending manual tim

> **Dokumen ini menggabungkan:** `TASKS.md`, `TASKS-LINKS.md`, `TASKS-TELEGRAM.md`

---

## Instruksi untuk AI Agent

- Tandai task dengan `[/]` saat mulai mengerjakan
- Tandai task dengan `[x]` saat selesai dan terverifikasi
- Update field "Terakhir Diperbarui" setiap kali ada perubahan
- Jangan lewati phase — selesaikan satu phase sebelum pindah ke berikutnya
- Setelah menyelesaikan seluruh phase, update `docs/CHANGELOG.md`
- **PENTING:** Bot Token & Chat ID adalah **secret** — JANGAN di-commit ke repo; gunakan Cloudflare environment variables

---

## Ringkasan Status

| Modul | Phase | Status |
|-------|-------|--------|
| **Landing Page** | Phase 0–9 + Post-Launch | ✅ Selesai |
| **Link-in-Bio** | Phase L-0 – L-6 | ✅ Selesai |
| **Telegram Waitlist** | Phase T-0 – T-6 | 🟡 Sebagian pending manual |
| **Dokumentasi** | Revisi .ai/ | ✅ Selesai (2026-10-06) |

---

## 🔴 Open Tasks (Belum Dikerjakan / Pending)

Tasks yang belum selesai, urut dari prioritas tertinggi:

### Telegram — Deployment & E2E Production (dari Phase T-5)

- [ ] **Deploy ke Cloudflare Pages (production):**
  - [ ] Push ke branch `develop` → merge ke `main`
  - [ ] Verifikasi environment variables di Cloudflare Dashboard sudah ter-set:
    - `TELEGRAM_BOT_TOKEN` (encrypted)
    - `TELEGRAM_CHAT_ID` = `-1003957917701` (encrypted)
    - `TELEGRAM_THREAD_ID` = `2` (encrypted)
  - [ ] Verifikasi deployment preview URL berfungsi
- [ ] **Test end-to-end di production:**
  - [ ] Buka `https://adellhub.biz.id`
  - [ ] Klik "Bergabung Waitlist" → isi form → submit
  - [ ] Verifikasi notifikasi Telegram masuk di grup dengan format yang benar
  - [ ] Verifikasi pesan sukses tampil di modal
  - [ ] Verifikasi di mobile (responsive, touch targets)
  - [ ] Verifikasi `prefers-reduced-motion` dihormati (loading spinner)
- [ ] **Test network error (manual browser):** Matikan jaringan → cek fallback `mailto:` tampil di modal
- [ ] **Merge ke `main`** setelah semua test pass

### Telegram — Dokumentasi Cleanup (dari Phase T-6)

- [ ] Hapus referensi `mailto:` yang tidak terpakai lagi di kode (kecuali fallback text)
- [ ] Verifikasi tidak ada secret/token yang ter-commit ke repo

### Landing Page — Git Release (dari Phase 9)

- [ ] **Commit semua perubahan** dengan pesan commit yang deskriptif — **dilakukan manual oleh tim**
- [ ] **Tag git release: `v1.0.0`** — **dilakukan manual oleh tim**

---

## ✅ Completed Tasks

Tasks yang sudah selesai, **diurutkan dari yang paling baru ke paling lama** (terbaru di atas).

---

### 🗂️ Dokumentasi .ai/ — Revisi Struktur ✅
**Tanggal:** 2026-10-06

- [x] Buat `DESIGN.md` — design system & brand guide (dipindahkan dari PRD.md Section 6)
- [x] Rename `TECH-STACK.md` → `TRD.md` (Technical Requirements Document); bagian design tokens dipindah ke DESIGN.md
- [x] Buat `APP-FLOW.md` — alur aplikasi user & dev (Landing Page, Link-in-Bio, Legal, Backend, Build & Deploy)
- [x] Update `PRD.md` — hapus section design, tambah referensi ke DESIGN.md & TRD.md
- [x] Gabungkan `TASKS.md` + `TASKS-LINKS.md` + `TASKS-TELEGRAM.md` → `IMPLEMENTATION-PLAN.md`
- [x] Update `docs/CHANGELOG.md` dengan entry revisi dokumentasi
- [x] Update `README.md` dengan referensi file `.ai/` yang baru

---

### 🔗 Link-in-Bio: Phase L-6 — Revisi Pasca-Visual ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] **Revisi pasca-L-6 #2 — latar statis anti-glitch:**
  - Gejala: di mobile, ring, kotak merah, dot kanan-atas ikut naik/turun saat scroll (glitch repaint `position: fixed`)
  - `.geo-bg` di-promote ke layer kompositor: `transform: translateZ(0)` + `will-change: transform`
  - `overflow: hidden` dihapus → dekorasi benar-benar statis tanpa repaint saat scroll
- [x] **Revisi pasca-L-6 — ikon monokrom:**
  - Ikon Instagram & TikTok dari `<img>` brand berwarna → glyph kanonik monokrom `fill="currentColor"` (charcoal 24px)
  - `links/images/` dihapus (folder kosong); seluruh ikon murni string inline (`svgIcon`)
  - Build/preview: bundle `links-BWatV58D.js` 5.51 kB, tanpa `data:image/svg+xml`

---

### 🔗 Link-in-Bio: Phase L-6 — Input Konten Final ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Isi data profil: nama **Adellhub**, role **Startup Indonesia**, deskripsi
- [x] Isi daftar link (3): **Situs Resmi**, **Instagram**, **TikTok**
- [x] Hapus konten lama: LinkedIn/CV/Wiki/GitHub/IG pribadi/YouTube/Spotify dari `LINKS`
- [x] JSON-LD: `Person` → **`Organization`** (name Adellhub, url `/links/`, `sameAs` IG+TikTok)
- [x] Build & preview: `/links/` 200, konten final terpasang, `npm audit` 0

---

### 📱 Telegram Waitlist — Phase T-6: Dokumentasi & Cleanup ✅ (Sebagian)
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Update `PRD.md` (Versi 1.4.0) — Section 5 & 9 mencerminkan arsitektur Cloudflare Functions + Telegram
- [x] Update `TRD.md` (ex TECH-STACK.md) — tambah serverless layer, wrangler devDependency
- [x] Update `README.md` — tambah section Environment Variables & Wrangler setup

---

### 📱 Telegram Waitlist — Phase T-5: Testing & Build ✅ (Batch Lokal)
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Test lokal dengan Wrangler (`npm run build && npx wrangler pages dev dist --port 8788`)
- [x] Test submit form valid → notifikasi Telegram masuk di grup topic ✅
- [x] Test validasi error (nama kosong, email invalid, CRLF, content-type salah → 415, payload >10KB → 413, origin asing → 403)
- [x] Test honeypot — curl dengan field `website` terisi → HTTP 200 silent ✅
- [x] `npm run build` → output `dist/` utuh (semua halaman terverifikasi)
- [x] Verifikasi `functions/api/waitlist.js` ter-include Cloudflare Pages (route `POST /api/waitlist` aktif)
- [x] Update `docs/CHANGELOG.md` dengan entry versi baru

---

### 📱 Telegram Waitlist — Phase T-4: Anti-Spam & Rate Limiting ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] **Honeypot field:** Hidden input `website`, bot yang mengisi → silent success tanpa Telegram
- [x] **Timestamp check:** Submit < 2 detik → silent success (bot detection)
- [x] **Input length limits:** Payload max 10KB, nama ≤ 100 karakter, email valid format
- [x] Rate limiting level KV/D1: **ditunda** (tidak diperlukan untuk MVP)
- [x] Verifikasi: form submit instan ditolak via `wrangler pages dev` + curl ✅
- [x] Verifikasi: honeypot menangkap bot submission ✅

---

### 📱 Telegram Waitlist — Phase T-3: Security (CSP, CORS, Sanitization) ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Update `public/_headers` — perbarui `connect-src` dengan domain produksi eksplisit
- [x] Strict CORS di `functions/api/waitlist.js` — block origin asing → 403
- [x] Input sanitization: `stripHtmlTags()`, escape HTML, CRLF blocking, length validation
- [x] Pastikan `.dev.vars` ada di `.gitignore` ✅
- [x] Verifikasi request origin asing di-reject 403 (unit test) ✅
- [x] Verifikasi HTML injection ter-strip & ter-escape di pesan Telegram ✅

---

### 📱 Telegram Waitlist — Phase T-2: Refactor Frontend (mailto → fetch) ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Refactor `openWaitlistForm()` di `src/components/modal.js` → `fetch('/api/waitlist', { method: 'POST' })`
- [x] Loading state: disable button+input, teks "Mengirim...", spinner Bauhaus rotating square
- [x] Handle sukses → `showSuccess(name)`
- [x] Handle error → alert container `role="alert"` + fallback `mailto:` link
- [x] Handle network error → fallback graceful dengan mailto link
- [x] Pertahankan validasi client-side (name & email)
- [x] Refactor `openModal()` CTA1 → langsung buka waitlist form
- [x] Tambah CSS loading spinner & global error di `src/style.css`
- [x] Verifikasi build: `npm run build` sukses 100% ✅
- [x] Verifikasi aksesibilitas: `aria-busy`, `role="alert"`, `tabindex="-1"` honeypot ✅

---

### 📱 Telegram Waitlist — Phase T-1: Cloudflare Pages Functions ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Buat `functions/api/waitlist.js` dengan `onRequestPost(context)` handler
- [x] Parse body JSON, validasi server-side (name, email, service, timestamp, userAgent)
- [x] Baca env vars `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_THREAD_ID` dari `context.env`
- [x] Parsing `TELEGRAM_THREAD_ID` eksplisit ke integer
- [x] Sanitasi & escape karakter HTML untuk Telegram HTML parse mode
- [x] Format pesan notifikasi Telegram (HTML parse mode)
- [x] Kirim pesan via `fetch()` dengan `message_thread_id` (numeric)
- [x] Handle response sukses & error Telegram API (HTTP 502 jika Telegram error)
- [x] CORS headers untuk produksi + dev origins + `*.pages.dev`
- [x] Anti-spam: honeypot & timestamp check terintegrasi
- [x] Handler `onRequestOptions` untuk preflight CORS
- [x] Verifikasi syntax & logic test ✅

---

### 📱 Telegram Waitlist — Phase T-0: Setup Bot Telegram ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.2.0

- [x] Buat bot Telegram via @BotFather (`Adellhub Waitlist Bot`)
- [x] Dapatkan Bot Token (tersimpan aman sebagai env var)
- [x] Buat/siapkan grup Telegram dengan fitur Topics
- [x] Tambahkan bot ke grup
- [x] Dapatkan Chat ID grup (`-1003957917701`)
- [x] Dapatkan Thread ID (`message_thread_id: 2`)
- [x] Set environment variables di Cloudflare Pages Dashboard (dikonfirmasi user)
- [x] Buat `.dev.vars` lokal & masukkan ke `.gitignore`
- [x] Verifikasi bot mengirim pesan ke topic yang benar via curl ✅

---

### 🔗 Link-in-Bio: Phase L-5 — Integrasi Vite & QA Build ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Tambah `links/index.html` ke `rollupOptions.input` di `vite.config.js`
- [x] Aset ter-resolve Vite tanpa error; file tidak terpakai dibersihkan
- [x] `npm run build` → `dist/links/index.html` + aset (halaman utama tetap utuh)
- [x] `npm run preview` → smoke test: `/links/` HTTP 200, konten render, responsive ✅
- [x] `npm audit` — **0 vulnerabilities** ✅

---

### 🔗 Link-in-Bio: Phase L-4 — Aksesibilitas, SEO & Responsiveness ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Kontras teks utama ≥ 4.5:1 (token Bauhaus sudah kontras AA)
- [x] Touch targets ≥ 44px pada pointer coarse
- [x] Alt text deskriptif, `aria-label` tiap link, heading hierarchy valid
- [x] Responsive: 360px, 480px, 768px, 1280px
- [x] JSON-LD `Person` ditambahkan, meta OG/twitter/canonical lengkap
- [x] `script.js`: ikon `<img alt="">` dekoratif, kartu dengan `aria-label`
- [x] Verifikasi dev: JSON-LD, description, canonical, alt, aria-label, lazy ✅

---

### 🔗 Link-in-Bio: Phase L-3 — Interaksi & Animasi ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Hover efek kartu gated `@media (hover: hover) and (pointer: fine)` — translateY + hard shadow
- [x] `prefers-reduced-motion`: CSS global + guard JS (skip stagger delay + `will-change`)
- [x] Focus state `:focus-visible` kontras tinggi (2px arang, offset 3px)
- [x] `will-change` sementara saat animasi; DocumentFragment single-reflow; `loading="lazy"` gambar
- [x] Audit animasi: stagger 60ms + hover 240ms + press 160ms — dipertahankan (restraint)
- [x] Verifikasi dev: reduced-motion guard & lazy terlihat di modul ✅

---

### 🔗 Link-in-Bio: Phase L-2 — Komponen Profil & Link Cards ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Rewrite `links/script.js` → ES module kompatibel Vite, `LINKS` config terpusat
- [x] Import brand SVG via Vite (`import linkedinIcon from './images/linkedin.svg'`)
- [x] `safeExternalUrl` allowlist `^https?:` + `escapeHtml` — pola `modal.js`
- [x] Profile section: avatar Bauhaus, nama, deskripsi, tombol kontak
- [x] Kartu `bauhaus-card` (border 2px charcoal, hard shadow, label uppercase + bullet merah 6px)
- [x] `links/index.html`: `<script>` → `type="module"`
- [x] Verifikasi dev server: script.js 200, modul ter-transform ✅

---

### 🔗 Link-in-Bio: Phase L-1 — Design System Bauhaus & Struktur HTML ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Baca skill `frontend-design` sebelum implementasi CSS
- [x] Ganti `styles.css` — hapus dark glassmorphism → design tokens Bauhaus
- [x] Font: Space Grotesk + Inter via Google Fonts (preconnect + stylesheet)
- [x] Restrukturisasi `links/index.html`: semantic landmarks, satu `<h1>`, meta/OG/canonical lengkap
- [x] Hapus markup & aset background video (`letter-bg.mp4`, overlay)
- [x] Latar statis Bauhaus: `.geo-bg` (dot grid / arcs / square aksen, `position: fixed`, `aria-hidden`)
- [x] Verifikasi dev server `/links/` 200, `npm run build` tetap hijau ✅

---

### 🔗 Link-in-Bio: Phase L-0 — Analisis, Audit & Persiapan ✅
**Tanggal:** 2026-09-19 | **Versi:** v1.1.0

- [x] Audit inventaris file `links/` — semua file diperiksa referensinya
- [x] Tandai & hapus 10 file tak terpakai: `test.md`, `resume.png`, `resume-v2.png`, `wiki.png`, `wordpress.png`, `dev.png`, `amazon.svg`, `facebook.svg`, `google.svg`, `twitter.svg`
- [x] Tentukan struktur Vite multi-page: `links/index.html` sebagai entry baru → output `dist/links/index.html`
- [x] Catat kebutuhan konten yang belum ada (nama profil, deskripsi, daftar link)

---

### 🌐 Landing Page — Post-Launch Tasks ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.x

- [x] **Fix mobile view top navbar makan space** — header 72px → 56px → 48px + auto-hide: saat scroll >120px ke bawah slide out (`translateY(-100%)`), muncul saat scroll ke atas. Tidak hidden saat mobile menu terbuka. Touch target ≥44px tetap terpenuhi
- [x] **Smooth scroll tiap section** — sudah terpasang: `html { scroll-behavior: smooth }` + handler JS dengan offset dinamis + `prefers-reduced-motion` support. Tidak perlu perubahan kode
- [x] **Verifikasi pasca-deploy** — Cloudflare Email Routing aktif (`waitlist@` & `hello@`); `og-image.png` live; Lighthouse ≥90; dicek Chrome & Firefox

---

### 🌐 Landing Page — Phase 9: Build & Deployment ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Run `npm run build` — sukses (vite 8.3.0, 17 modules); `dist/` berisi semua file
- [x] Preview build produksi `npm run preview` — smoke test HTTP 200 seluruh route ✅
- [x] Update `README.md` dengan instruksi setup & deployment (target Cloudflare Pages)
- [x] Update `CHANGELOG.md` dengan entry versi `1.0.0`

---

### 🌐 Landing Page — Phase 8: Polish, Responsiveness & QA ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Review semua section di breakpoint: 360px, 768px, 1280px+ — grid services/portfolio 3→2→1, kontak 3→1, hero stack, stats rapat
- [x] Typography scale fluid (`clamp`) di semua heading/section
- [x] Animasi: `prefers-reduced-motion` dihormati — CSS global override + JS `scrollTo({behavior:'auto'})` + preloader pendek
- [x] Semua link (email, WA, Instagram) terverifikasi di `src/components/contact.js`
- [x] Form validasi: regex + `novalidate` + `type="email"`/`required`
- [x] Kontras warna WCAG AA: `--color-accent` #E63329 → **#D2251C** (5.22:1), `--color-gray` #888 → **#757575** (4.6:1)
- [x] Heading hierarchy: 1× `<h1>` (hero), `<h2>` tiap section, `<h3>` kartu/modal ✅

---

### 🌐 Landing Page — Phase 7: Contact & Footer ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Section kontak judul "MARI TERHUBUNG" (label "03. Hubungi Kami")
- [x] Email: `hello@adellhub.biz.id` (link `mailto:`)
- [x] WhatsApp: `+62 851-7969-7112` (link `https://wa.me/6285179697112`)
- [x] Instagram: `@adellhub` (link ke profil Instagram)
- [x] Tagline & icon sosmed minimalis (outline SVG, stroke currentColor)
- [x] Footer bar: Copyright © 2026 Adellhub. All rights reserved.
- [x] Verifikasi semua link dapat diklik ✅

---

### 🌐 Landing Page — Phase 6: Portfolio Section ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] 3 gambar placeholder artistik Bauhaus (handcrafted SVG, not AI-generated):
  - `adellbooth-preview.svg` — UI mockup software photobooth
  - `adelltech-preview.svg` — Workspace reparasi laptop
  - `adellwork-preview.svg` — Flowchart/diagram mentoring
- [x] Grid geometris Bauhaus untuk portfolio (`src/components/portfolio.js`)
- [x] Judul section: "REKAM JEJAK KAMI"
- [x] Gambar dalam `<figure>` + `<figcaption>`, `alt` deskriptif, `loading="lazy"`
- [x] Hover effect: slight scale + overlay teks
- [x] Grid 3→2→1 kolom di berbagai ukuran layar ✅

---

### 🌐 Landing Page — Phase 5: Waitlist Modal & Form ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Modal form waitlist terpisah (`openWaitlistForm` di `src/components/modal.js`)
- [x] Field: Nama, Email (wajib)
- [x] Validasi client-side (email format, field kosong)
- [x] Submit action: `mailto:` ke `waitlist@adellhub.biz.id` (fase awal, sebelum Telegram)
- [x] Pesan konfirmasi setelah submit
- [x] Animasi modal (fade-in)
- [x] Tombol close (backdrop click + tombol X)
- [x] Verifikasi form di mobile (responsive, touch target ≥ 48px) ✅

---

### 🌐 Landing Page — Phase 4: Services Section ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Tiga kotak geometris layanan (`src/components/services.js`)
- [x] **Adellwork:** Icon SVG, judul, deskripsi, tombol "Selengkapnya"
- [x] **Adelltech:** Icon SVG, judul, deskripsi, tombol "Selengkapnya"
- [x] **Adellbooth:** Icon SVG, judul, deskripsi, tombol "Selengkapnya"
- [x] Overlay/modal "Coming Soon" (`src/components/modal.js`)
  - Pesan "masih dalam progress"
  - CTA 1: "Gabung Waitlist via Email" → modal form email
  - CTA 2: "@adellhub via Sosial Media" → Instagram @adellhub
  - Tombol close (backdrop + X)
  - Animasi masuk/keluar
- [x] Verifikasi semua tombol "Selengkapnya" memicu overlay yang benar ✅

---

### 🌐 Landing Page — Phase 3: Hero Section ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Asset komposisi geometris Bauhaus SVG (`src/assets/images/bauhaus-hero-composition.svg`)
- [x] Component Hero section (`src/components/hero.js`)
- [x] Layout: tipografi besar kiri, grafis geometris kanan
- [x] Heading: "ADELLHUB: EKOSISTEM IT MASA DEPAN." (bold, uppercase, responsive clamp)
- [x] Sub-heading tagline
- [x] Komposisi SVG (lingkaran merah, kotak hitam, setengah lingkaran, grid titik, hatching diagonal)
- [x] Animasi slow-float / parallax ringan (`hero-float-circle`, `hero-float-red`)
- [x] CTA: "Bergabung Waitlist" & "Eksplorasi Layanan"
- [x] Layout responsif: 2-kolom desktop, stacked tablet & mobile ✅

---

### 🌐 Landing Page — Phase 2: Pre-loader & Header ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Pre-loader geometris (`src/components/preloader.js`)
  - Animasi bentuk geometris Bauhaus
  - Auto-dismiss (min 1.5s, max 3s)
  - Fade-out smooth ke konten utama
- [x] Header (`src/components/header.js`)
  - Logo wordmark "ADELLHUB" + aksen geometris SVG kecil
  - Navigasi: Layanan · Portofolio · Hubungi Kami
  - Smooth scroll ke masing-masing section (offset header dinamis)
  - Sticky behavior (class saat scroll > 50px)
  - Hover effect minimal pada nav links (gated `@media (hover: hover)`)
- [x] Verifikasi pre-loader dan header di mobile & desktop ✅

---

### 🌐 Landing Page — Phase 1: Design System & Foundation ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Baca guideline dari skill `frontend-design` sebelum implementasi CSS
- [x] Definisikan semua CSS Custom Properties (design tokens) di `src/style.css`
- [x] Import Google Fonts: Space Grotesk + Inter
- [x] CSS base reset & typography scale
- [x] CSS utility classes untuk layout (grid, flex)
- [x] CSS classes untuk bentuk geometris Bauhaus (lingkaran, setengah lingkaran, kotak, grid titik, garis sejajar)
- [x] CSS animasi micro-interaction (hover states, transitions)
- [x] Verifikasi design tokens tampil konsisten di browser ✅

---

### 🌐 Landing Page — Phase 0: Project Initialization ✅
**Tanggal:** 2026-09-18 | **Versi:** v1.0.0

- [x] Buat folder `.ai/` dengan dokumen PRD, TECH-STACK, TASKS
- [x] Buat folder `docs/` dengan CHANGELOG.md
- [x] Inisiasi proyek Vite (`npx create-vite@latest`) dengan template Vanilla JS
- [x] Verifikasi dev server berjalan (`npm run dev`)
- [x] Buat struktur folder `src/` sesuai TRD.md
- [x] Setup `index.html` dengan meta tags SEO, Google Fonts link

---

## Catatan Teknis Referensi

### Environment Variables (Telegram Waitlist)

| Variable | Contoh | Peran |
|----------|--------|-------|
| `TELEGRAM_BOT_TOKEN` | `<token dari @BotFather>` | Token bot Telegram (secret) |
| `TELEGRAM_CHAT_ID` | `-1003957917701` | Chat ID grup Telegram |
| `TELEGRAM_THREAD_ID` | `2` | `message_thread_id` topic/thread tujuan |

> **⚠️ Jangan commit secret:** Hanya di Cloudflare Dashboard (encrypted) dan `.dev.vars` lokal (ter-ignore).

### Format Pesan Telegram

```
🔔 Pendaftaran Waitlist Baru!

👤 Nama: John Doe
📧 Email: john@example.com
🏷️ Layanan: Adellwork by Adellhub
🕐 Waktu: 2026-09-19 16:00 WIB
📱 Device: Chrome 120 / Windows 10

#waitlist #adellhub
```
