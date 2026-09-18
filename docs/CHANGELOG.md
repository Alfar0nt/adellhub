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
- Hero section dengan komposisi SVG
- Services section dengan overlay "coming soon"
- Waitlist modal dengan form email
- Portfolio section dengan gambar AI-generated
- Contact & footer section
- Responsive polish & QA

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
