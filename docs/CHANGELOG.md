# CHANGELOG — Adellhub Landing Page

Semua perubahan penting pada proyek ini didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
dan proyek ini menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Format Semantic Versioning

```
MAJOR.MINOR.PATCH

MAJOR — Perubahan breaking (redesign besar, perubahan struktur fundamental)
MINOR — Fitur baru yang backward-compatible (section baru, komponen baru)
PATCH — Bug fix, perbaikan kecil, perubahan teks
```

---

## ✅ Checklist Verifikasi Launch (Selesai)

Semua item manual sudah dikerjakan setelah deploy (detail juga tersedia di `README.md`).

### 1. Konfigurasi Cloudflare Email Routing — Selesai
Form waitlist mengirim ke **`waitlist@adellhub.biz.id`** dan section kontak ke **`hello@adellhub.biz.id`** — keduanya aktif via Cloudflare Email Routing.

- [x] Email Routing diaktifkan di domain `adellhub.biz.id`
- [x] Routing rule `waitlist@` → email pribadi
- [x] Routing rule `hello@` → email pribadi (section kontak)
- [x] Verifikasi email masuk berhasil

### 2. Share Image (og-image.png) — Selesai
- [x] `og-image.png` (1200×630, gaya Bauhaus) dibuat & tersimpan di `public/` (source: `docs/og-image.svg`)
- [x] Live di `https://adellhub.biz.id/og-image.png`, preview social media tampil

### 3. Verifikasi Browser & Tooling — Selesai
- [x] Halaman dicek di Chrome & Firefox
- [x] **Lighthouse** — hasil bagus, sesuai target (Performance ≥ 90, Accessibility ≥ 90)
- [x] Uji semua link (WhatsApp, email, Instagram), form waitlist, modal (backdrop/✕/ESC, tab trap)
- [x] Uji `prefers-reduced-motion`

---

## [Unreleased]

## [1.0.1] — 2026-09-18

### Changed
- **Header mobile lebih ramping + auto-hide:** tinggi `.header-inner` mobile diturunkan 56px → **48px**. Header kini **menghilang saat user scroll ke bawah** (slide-out via `translateY(-100%)` setelah melewati 120px) dan **muncul kembali saat scroll ke atas** — konten tidak tertutup header saat membaca di mobile. Header tidak pernah disembunyikan saat menu mobile terbuka, dan auto-hide hanya aktif di `max-width: 768px` (desktop tidak berubah). Target sentuh hamburger tetap ≥44px; transisi slide dihormati `prefers-reduced-motion`

## [1.0.0] — 2026-09-18

Rilis pertama — Adellhub landing page siap deploy ke **Cloudflare Pages**.

### Security
- **Security hardening (audit `vibe-check/AI-CHECKLIST.md`, 17 kategori):** tanpa temuan CRITICAL/HIGH. Perbaikan diterapkan: security headers via `public/_headers` (Cloudflare Pages), hardening XSS `safeExternalUrl()` di `src/components/modal.js`, aturan `.gitignore` untuk `.env` & `vibe-check/`, vite dipin eksak `8.3.0` (`npm audit` = 0 vulnerabilities), perbaikan meta `twitter:url` → `adellhub.biz.id`. Hasil lengkap: `security/reports/*`, `security/plans/*`, `security/AUDIT_SUMMARY.md`

### Added
- **Instruksi deployment lengkap** di `README.md`: setup & development commands, deployment **Cloudflare Pages** (Git Integration & Wrangler CLI), custom domain `adellhub.biz.id`, penjelasan `_headers` yang aktif otomatis, project structure & tech stack

### Changed
- **Build & deployment verified:** `npm run build` sukses (multi-page: `index.html`, `privacy-policy.html`, `terms-of-service.html`); semua asset & `_headers` ter-copy ke `dist/`; smoke test `vite preview` HTTP 200 untuk seluruh route (HTML/CSS/JS/favicon)

### Docs
- PRD → **1.2.0**, TECH-STACK → **1.2.0**, TASKS → **1.6.0** (seluruh phase selesai; commit + tag `v1.0.0` dilakukan manual)

---

## [0.10.0] — 2026-09-18

### Added
- **Accessibility — kontras WCAG AA:** `--color-accent` #E63329 → **#D2251C** (teks di white 5.22:1, di bg 4.60:1, ≥3:1 untuk grafis di latar gelap). `--color-gray-light` #888888 → **#757575** (placeholder ~4.6:1)
- **Accessibility — manajemen fokus modal** (`src/components/modal.js`): dialog mendapat `tabindex="-1"` dan fokus dipindah ke dalam dialog saat dibuka; fokus di-trap di dalam modal (Tab/Shift+Tab siklus); fokus dikembalikan ke elemen pemicu saat ditutup (WCAG 2.4.3)
- **Dialog sukses waitlist:** `<h3>` diberi `id="waitlist-success-title"` dan `aria-labelledby` dialog diperbarui agar accessible name tetap valid setelah konten diganti; fokus pindah ke tombol "Selesai"; hapus atribut `aria-describedby` yang menunjuk ke elemen tidak ada di input email
- **Reduced motion untuk smooth scroll JS:** `scrollTo({ behavior })` di header & hero memilih `'auto'` saat `prefers-reduced-motion: reduce` (CSS sudah menangani animasi/transisi)
- **Anchor clearance:** `section[id] { scroll-margin-top: 88px }` agar navigasi hash (URL langsung/`scrollIntoView`) tidak tertutup header sticky
- **Animasi buka/tutup menu mobile:** drawer kini transisi smooth `grid-template-rows: 0fr → 1fr` + fade opacity + visibility (buka & tutup), menggantikan lompatan `display: none → block`. Border-top & padding dipindah ke `.mobile-nav-list` agar collapse sempurna; `visibility` tertunda saat menutup sehingga animasi collapse terlihat penuh. Ikon hamburger (2 garis → X) tetap bertransisi. Hormati `prefers-reduced-motion` (+ reset `transition-delay: 0s`)
- **Header mobile lebih kompak:** tinggi `.header-inner` diturunkan 72px → **56px** hanya di `@media (max-width: 768px)` sehingga jarak kosong di bawah logo & tombol hamburger hilang; target sentuh tombol tetap ≥44px. Desktop tidak berubah. Offset smooth-scroll memakai `header.offsetHeight` dinamis sehingga pergeseran anchor tetap akurat
- **Halaman Kebijakan Privasi & Syarat Ketentuan:** dua halaman statis bahasa Indonesia (`privacy-policy.html`, `terms-of-service.html`) dengan gaya Bauhaus yang konsisten (top bar logo + tombol kembali, section bernomor 01–09/10, kotak kontak, footer). Memakai stylesheet bersama `public/legal.css`; terindeks (index, follow); dimasukkan ke input build Vite (multi-page) sehingga ikut terdeploy
- **Link legal di footer:** tombol outline "Kebijakan Privasi" & "Syarat &amp; Ketentuan" di `.footer-legal` membuka halaman masing-masing di **tab baru** (`target="_blank" rel="noopener noreferrer"`), target sentuh ≥44px, invert warna saat hover, stack rapi di mobile ≤960px
- **Audit PRD vs implementasi (pra-Phase 9):** sempurnakan gating `:hover` arcs hero (`@media (prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)`); seluruh 17 rule `:hover` kini memenuhi aturan PRD. Sinkronisasi dokumen: PRD → **1.2.0**, TECH-STACK → **1.2.0** (warna `#D2251C`/`#757575`, kontak final, legal pages, struktur proyek). Keputusan hosting: **Cloudflare Pages**
- **Security hardening (audit `vibe-check/AI-CHECKLIST.md`, 17 kategori):** tanpa temuan CRITICAL/HIGH. Fix diterapkan: (1) **security headers** via `public/_headers` (Cloudflare Pages) — CSP self+Google Fonts+inline SVG, HSTS, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy; (2) **XSS hardening** `safeExternalUrl()` di `src/components/modal.js` (allowlist skema http/https/mailto + escape atribut pada `cta2Url`); (3) **`.gitignore`** + aturan `.env`/`.env.*`/`!.env.example` dan `vibe-check/`; (4) **vite dipin eksak `8.3.0`** (tanpa `^`), `npm audit` = 0 vulnerabilities; (5) perbaikan `twitter:url` meta → `adellhub.biz.id`. Kategori N/A (tanpa backend/DB/auth/payment/upload) terdokumentasi. Hasil lengkap: `security/reports/*` + `security/plans/*` + `security/AUDIT_SUMMARY.md`. Verifikasi manual pasca-deploy: header via `curl -I`, CSP smoke test, XSS form test (lihat AUDIT_SUMMARY)
- **Performa:** hapus `@import` font ganda di CSS (font dimuat tunggal via `<link>` di `index.html` dengan preconnect)

### Changed
- **CTA "Gabung Waitlist"** (hero + header desktop/mobile) kini **membuka form waitlist modal** langsung (keputusan tim; sebelumnya hanya scroll ke `#services`). Elemen diubah dari `<a>` menjadi `<button>`
- **Domain SEO/social** `index.html`: `adellhub.com` → **`adellhub.biz.id`** untuk canonical, og:url, og:image, twitter:image, dan JSON-LD (konsisten dengan email & Cloudflare)
- Logo footer kini memakai `var(--color-accent)` (terdahulu hardcode `#E63329`) agar selaras dengan token baru

### Docs
- **Checklist "Sebelum Launch"** di `README.md` + `docs/CHANGELOG.md` berisi 3 aksi manual (Cloudflare Email Routing, `og-image.png`, verifikasi browser/Lighthouse/W3C) dalam format checkbox agar tidak terlupakan saat release

### Verified
- `npm run build` sukses; smoke test `vite preview` HTTP 200 untuk HTML/JS/CSS
- Kontras teks utama ≥4.5:1 (dihitung, bukan perkiraan)
- Treeshaking heading: 1× H1, H2 per section, H3 kartu/modal

---

## [0.9.0] — 2026-09-18

### Added
- Komponen Contact & Footer (`src/components/contact.js`):
  - Section kontak judul "MARI TERHUBUNG" dengan label "03. Hubungi Kami"
  - 3 kartu channel kontak (grid responsif 3 → 1 kolom) yang dapat diklik:
    - **Email** — `mailto:hello@adellhub.biz.id`
    - **WhatsApp** — `https://wa.me/6285179697112` (`+62 851-7969-7112`, `target="_blank"` + `rel="noopener noreferrer"`)
    - **Instagram** — `https://instagram.com/adellhub` (`@adellhub`, `target="_blank"` + `rel="noopener noreferrer"`)
  - Tagline: "Untuk update terbaru, ikuti perjalanan kami di sosial media."
  - Icon sosmed minimalis outline SVG (envelope, chat bubble, kamera/instagram) — `stroke="currentColor"` agar mengikuti warna hover
  - `aria-label` deskriptif di setiap kartu link
  - Hover effect kartu kontak: card diangkat + bayangan keras, latar berbalik hitam dan teks putih
- Footer bar (`initFooter`):
  - Logo geometris Adellhub (versi terang untuk latar gelap) + teks "ADELLHUB"
  - Copyright: "© 2026 Adellhub. All rights reserved."
  - Footer berlatarbelakang `--color-dark`, responsif (flex-wrap, center pada mobile)
- Wiring ke `src/main.js`: placeholder kontak diganti implementasi penuh; urutan DOM sekarang Header → Hero → Services → Portfolio → Contact → Footer

### Changed
- Catatan Tim Cloudflare: `hello@adellhub.biz.id` kini wajib dibuatkan routing rule (digunakan di section kontak)

---

## [0.8.0] — 2026-09-18

### Added
- Komponen Portfolio Section (`src/components/portfolio.js`):
  - Judul "REKAM JEJAK KAMI" dengan label "02. Rekam Jejak" dan lead section
  - Grid geometris 3 kolom (responsif 3 → 2 → 1 kolom)
  - Cards menggunakan `<figure>` + `<figcaption>`: gambar artistik, eyebrow, judul, dan deskripsi
  - Hover effect: card naik + bayangan keras, gambar subtle scale, dan overlay teks gelap dengan aksen merah (gated `@media (hover: hover)`)
  - `alt` deskriptif per item dan `loading="lazy"` + `width`/`height` untuk stabilitas layout
- 3 gambar placeholder artistik bergaya Bauhaus sebagai komposisi SVG (`src/assets/images/`):
  - `adellwork-preview.svg` — flowchart mentoring (satu titik pusat → tiga titik bimbingan, garis koneksi ortho)
  - `adelltech-preview.svg` — workspace reparasi laptop (laptop terbuka, bar progress, roda gigi, kotak cutout)
  - `adellbooth-preview.svg` — UI photobooth (layar siluet pelanggan, hitung mundur, tombol capture, strip foto)
- Wiring ke `src/main.js`: section portfolio menggantikan placeholder, urutan Hero → Services → Portfolio → (Contact placeholder)

### Changed
- Placeholder "Portofolio & Eksplorasi" diganti implementasi penuh sesuai TASKS.md
- Gambar placeholder dibuat sebagai SVG geometris (keputusan tim) menggantikan rencana "AI-generated PNG" yang semula di TASKS.md

---

## [0.7.0] — 2026-09-18

### Added
- Komponen Modal Form Waitlist (`openWaitlistForm` di `src/components/modal.js`):
  - Modal terpisah dari overlay layanan ("Coming Soon")
  - Field form: Nama & Email (wajib) dengan label aksesibel dan mark `*`
  - Validasi client-side (field kosong, format email) dengan pesan error inline & `aria-invalid`
  - Submit action `mailto:` ke `waitlist@adellhub.biz.id` dengan body berisi Nama, Email, dan layanan yang diminati
  - State konfirmasi sukses setelah submit (ikon geometris Bauhaus + pesan terima kasih) dengan tombol "Selesai"
  - Animasi masuk slide-up dari bawah (`.waitlist-backdrop`)
  - Penutupan via tombol X, klik backdrop, dan tombol Escape (ESC)
- Integrasi CTA layanan → form waitlist: tombol "Gabung Waitlist via Email" pada overlay Adellwork, Adelltech, dan Adellbooth kini membuka form waitlist dengan konteks layanan masing-masing (`src/components/services.js`)
- Konstanta `WAITLIST_EMAIL` di `src/components/modal.js` untuk email tujuan terpusat

### Changed
- Email tujuan waitlist diperbarui dari placeholder `waitlist@adellhub.com` menjadi `waitlist@adellhub.biz.id` (domain web aktif via Cloudflare Email Routing)
- Refactor manajemen modal: handler ESC kini dibersihkan saat modal ditutup (memperbaiki kebocoran event listener), teks dinamis di-escape (`escapeHtml`) untuk keamanan

---

## [0.6.0] — 2026-09-18

### Added
- **Kotak 2: Adelltech by Adellhub** (`src/components/services.js`):
  - Icon SVG minimalis bertema tools/gear: obeng diagonal (hitam), cincin aksen merah (dashed ring), dan pusat kotak merah
  - Judul: "Service Ringan & Debloating Laptop/Komputer"
  - Deskripsi optimasi performa perangkat & pembersihan sistem operasi
  - Poin keunggulan (service maintenance ringan, upgrade SSD & RAM, repasta thermal paste & pembersihan menyeluruh)
  - Tombol "Selengkapnya" aktif yang terhubung ke dialog modal "Coming Soon"
- **Kotak 3: Adellbooth by Adellhub** (`src/components/services.js`):
  - Icon SVG minimalis bertema camera/frame: badan kamera, viewfinder bump, lensa dengan inti merah, dan tripod
  - Judul: "Platform Software Photobooth All-in-One"
  - Deskripsi solusi piranti lunak terintegrasi untuk event modern
  - Poin keunggulan (kompatibilitas kamera & printer, pembayaran QRIS otomatis, filter wajah & upload otomatis ke Google Drive)
  - Tombol "Selengkapnya" aktif yang terhubung ke dialog modal "Coming Soon"
- Refactor handler tombol layanan menjadi satu peta konfigurasi (`serviceModalConfig`) yang mencakup ketiga layanan (Adellwork, Adelltech, Adellbooth) dengan pesan & CTA waitlist masing-masing

### Changed
- Kotak 2 & 3 beralih dari status placeholder (`service-card-placeholder`, tombol disabled) menjadi card aktif (`service-card-active`) dengan badge "Coming Soon"
- Original content preserved: judul dan deskripsi placeholder dipertahankan sesuai spec minimal TASKS.md

---

## [0.5.1] — 2026-09-18

### Added
- Struktur grid section Layanan (`src/components/services.js`) dengan layout 3-kolom geometris
- **Kotak 1: Adellwork by Adellhub**:
  - Icon SVG arsitektural kustom (simbol terminal / monitor dengan code brackets `< />` dan aksen merah)
  - Judul: "Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan"
  - Deskripsi dan poin keunggulan (mentoring coding, desain UI/UX, konfigurasi jaringan)
  - Tombol aksi "Selengkapnya" yang terhubung langsung ke dialog modal "Coming Soon"
- Komponen Dialog Modal / Overlay Bauhaus (`src/components/modal.js`):
  - Pesan antusiasme dan status dalam progres pengerjaan
  - Dua aksi interaktif: "Gabung Waitlist via Email" (mailto langsung) dan "@adellhub via Sosial Media" (Instagram)
  - Aksesibilitas ARIA dialog, penanganan tombol Escape (ESC), dan penutupan melalui klik backdrop

---

## [0.5.0] — 2026-09-18

### Added
- Komponen Hero Section Bauhaus (`src/components/hero.js`):
  - Headline berani dan terstruktur: "ADELLHUB: EKOSISTEM IT MASA DEPAN." dengan skala tipografi Space Grotesk responsif
  - Sub-heading value proposition: "Satu wadah, ribuan solusi teknologi. Mengubah ide menjadi realitas digital..."
  - Komposisi grafis geometris Bauhaus SVG (`src/assets/images/bauhaus-hero-composition.svg`) terinspirasi gaya referensi MOCA (`image.png`):
    - Busur lengkung konsentris merah (concentric red arcs)
    - Lingkaran solid arang gelap dengan animasi slow-float
    - Grid matriks titik modular (dot matrix 6×6)
    - Setengah lingkaran aksen merah melayang halus
    - Arsiran diagonal geometris 45 derajat (architectural hatching)
    - Bujur sangkar hitam berbingkai lingkaran cutout off-white
    - Indikator panah geometris directional
  - Metrik nilai dan kepercayaan (3 Layanan Terpadu, 100% Fokus Solusi, Beta Early Access)
  - CTA ganda: "Bergabung Waitlist" (primer) dan "Eksplorasi Layanan" (sekunder) dengan smooth scroll
  - Desain layout responsif: 2 kolom asimetris di desktop, single-column rapi di tablet & smartphone

---

## [0.4.0] — 2026-09-18

### Added
- Komponen Pre-loader Geometris Bauhaus (`src/components/preloader.js`):
  - Animasi SVG geometris: lingkaran orbit berputar, setengah lingkaran charcoal, dan kotak aksen merah bergerak
  - Progress track arsitektural dengan animasi durasi terukur (1.8s)
  - Auto-dismiss mulus dengan efek fade-out transisi 400ms dan pembersihan elemen dari DOM
  - Dukungan aksesibilitas ARIA status dan mode `prefers-reduced-motion`
- Komponen Header Navigasi Bauhaus (`src/components/header.js`):
  - Wordmark tipografi "ADELLHUB" dengan aksen geometris SVG khusus
  - Navigasi utama (Layanan, Portofolio, Hubungi Kami) dan tombol CTA "Gabung Waitlist"
  - Interaksi smooth-scroll ke masing-masing target ID dengan offset header otomatis
  - Navigasi sticky dengan deteksi scroll (`.header-scrolled`) dan efek backdrop blur
  - Animasi garis aksen merah minimal pada hover nav link
  - Drawer menu navigasi mobile responsif dengan tombol hamburger geometris

---

## [0.3.0] — 2026-09-18

### Added
- Implementasi lengkap Bauhaus Design System di `src/style.css`
- Design tokens CSS Custom Properties:
  - Palet Bauhaus: Off-white canvas (`#F5F0E8`), Dark charcoal (`#1A1A1A`), Crimson accent (`#E63329`), Pure white, dan Neutral gray
  - Skala Spacing modular berbasis 8px (`--space-1` hingga `--space-32`)
  - Motion tokens terkontrol (`--duration-fast: 160ms`, `--ease-out`, `--duration-base: 240ms`)
- Integrasi typography Space Grotesk (Heading & display) dan Inter (Body & UI text) dengan fluid clamp scaling
- Utility layout modular: Grid sistem responsif, Flexbox helpers, dan Divider arsitektural
- Geometric Bauhaus shape utilities: `.geo-circle`, `.geo-semicircle-*`, `.geo-square`, `.geo-pattern-lines` (arsitektur hatching), dan `.geo-pattern-dots`
- UI primitives: Buttons (`.btn-primary`, `.btn-accent`, `.btn-outline`) dengan feedback scale 160ms, Badges, dan `.bauhaus-card`
- Aksesibilitas: Outline `:focus-visible` kontras tinggi, `.sr-only` utility, dan full support `@media (prefers-reduced-motion: reduce)`

---

## [0.2.0] — 2026-09-18

### Added
- Inisiasi proyek frontend menggunakan Vite 8 (Vanilla JavaScript & Vanilla CSS)
- Konfigurasi `vite.config.js` dengan dev server port 3000
- File `.gitignore` komprehensif untuk project Node / Vite
- Struktur direktori modular `src/` (`components/`, `utils/`, `assets/images/`)
- Entry point `src/main.js` dan base styling `src/style.css`
- Favicon geometris SVG bergaya Bauhaus (`public/favicon.svg`)
- File `index.html` lengkap dengan:
  - Meta tags SEO keyword-first & deskripsi terstruktur
  - Open Graph dan Twitter Card metadata
  - Structured Data JSON-LD (`Organization`)
  - Google Fonts preconnect (`Space Grotesk` & `Inter`)

---

## [0.1.0] — 2026-09-18

### Added
- Inisiasi repository GitHub `adellhub`
- Folder `.ai/` dengan dokumen proyek:
  - `PRD.md` — Product Requirements Document
  - `TECH-STACK.md` — Dokumentasi tech stack
  - `TASKS.md` — Rencana kerja per phase dengan checklist
- Folder `docs/` dengan `CHANGELOG.md`
- File `image.png` sebagai referensi visual Bauhaus UI (MOCA Museum)
- `README.md` awal

---

<!-- Template untuk entry berikutnya:

## [X.Y.Z] — YYYY-MM-DD

### Added
- Deskripsi fitur/komponen baru

### Changed
- Deskripsi perubahan pada fitur yang sudah ada

### Fixed
- Deskripsi bug yang diperbaiki

### Removed
- Deskripsi hal yang dihapus

### Security
- Deskripsi perbaikan keamanan (jika ada)

-->
