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

## 📌 Catatan Tim — Aksi yang Perlu Dilakukan

### 1. Konfigurasi Cloudflare Email Routing (SEBELUM LAUNCH)
Form waitlist (Phase 5) mengirim email ke **`waitlist@adellhub.biz.id`**. Alamat ini belum berfungsi sampai Email Routing diaktifkan di Cloudflare.

**Langkah yang harus dilakukan (manual, di luar kode):**
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com) → pilih domain **`adellhub.biz.id`**
2. Buka menu **Email → Email Routing**
3. Klik **Get started / Enable** (Cloudflare otomatis menambahkan record `MX` dan `TXT` yang diperlukan di DNS)
4. Verifikasi alamat tujuan (email pribadi Anda) lewat email konfirmasi
5. Buat **Routing rule**: `waitlist@` → email pribadi Anda
6. Opsional: aktifkan **Catch-all** atau tambahkan rule `hello@` untuk kebutuhan lain

**Jika tidak sempat konfigurasi:** ganti nilai konstanta `WAITLIST_EMAIL` di `src/components/modal.js` ke alamat email lain.

---

## [Unreleased]

### Planned
- Contact & footer section
- Responsive polish & QA

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
