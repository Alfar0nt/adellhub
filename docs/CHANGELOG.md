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

## [Unreleased]

### Planned
- Phase 4: Kotak 2 (Adelltech) & Kotak 3 (Adellbooth)
- Waitlist modal dengan form email terintegrasi
- Portfolio section dengan gambar AI-generated
- Contact & footer section
- Responsive polish & QA

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
