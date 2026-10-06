# PRD — Adellhub Landing Page

**Versi Dokumen:** 1.6.0  
**Tanggal:** 2026-10-06  
**Status:** Live — deploy Cloudflare Pages; mendukung 4 layanan resmi (Adellroute, Adellwork, Adelltech, Adellbooth) + More to Come; serverless waitlist Telegram aktif  
**Author:** Adellhub Team  
**Skills yang Direferensikan:** `frontend-design`, `landing-page-generator`, `semantic-html-and-seo`, `find-animation-opportunities`, `svg-icon-generator`

> **Dokumen terkait:**
> - Design System & Panduan Visual → [DESIGN.md](./DESIGN.md)
> - Technical Requirements → [TRD.md](./TRD.md)
> - Alur Aplikasi → [APP-FLOW.md](./APP-FLOW.md)
> - Tracker Implementasi → [IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md)

---

## 1. Ringkasan Produk

Adellhub adalah ekosistem bisnis startup IT yang berfungsi sebagai payung (holding brand) untuk empat layanan digital unggulan dan inisiatif masa depan. Landing page ini bertujuan untuk:

1. Memperkenalkan brand Adellhub dan empat layanan di bawahnya (Adellroute, Adellwork, Adelltech, Adellbooth) serta visi "More to Come".
2. Menyoroti pengerjaan aktif platform Adellroute sebagai penyedia & router token API AI multi-model hemat biaya.
3. Membangun kredibilitas dan kepercayaan calon pengguna, developer, dan mitra bisnis.
4. Mengumpulkan daftar tunggu (waitlist) dari calon pengguna via Cloudflare Pages Functions + notifikasi otomatis ke grup Telegram tim.
5. Mengarahkan audiens ke kanal sosial media resmi dan halaman rute khusus `/adellroute/`.

---

## 2. Target Pengguna

| Segmen | Deskripsi |
|--------|-----------|
| Developer & AI Builders | Membutuhkan perutean token API AI hemat biaya, latensi rendah, dan kompatibel OpenAI |
| Mahasiswa / Pelajar IT | Mencari bantuan tugas, proyek, atau mentoring teknis |
| Pemilik Bisnis Kecil | Membutuhkan service ringan laptop/komputer |
| Penyelenggara Event | Memerlukan solusi software photobooth |
| Tech Enthusiast | Tertarik dengan ekosistem startup IT lokal |

---

## 3. Layanan yang Ditampilkan

### 3.1 Adellroute by Adellhub (Featured)
- **Kategori:** Gateway & Reseller Token API AI
- **Deskripsi:** Penyedia & Perutean API Token AI Multi-Model (OpenAI, Claude, DeepSeek, Gemini) dengan billing transparan per-token.
- **Status:** Dalam pengerjaan aktif (**Currently Working** / Early Access)
- **Pembeda Visual:** Cobalt Blue `#1E40AF`, border tebal 3px, box-shadow Cobalt Blue 6px, badge *Currently Working*.

### 3.2 Adellwork by Adellhub
- **Kategori:** Asisten & Mentoring IT
- **Deskripsi:** Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan
- **Status:** Dalam pengembangan (Coming Soon)
- **Catatan:** Gunakan kata "Asisten" atau "Mentoring", bukan "joki"

### 3.3 Adelltech by Adellhub
- **Kategori:** Layanan Teknologi / Reparasi
- **Deskripsi:** Service Ringan & Debloating Laptop/Komputer
- **Status:** Dalam pengembangan (Coming Soon)

### 3.4 Adellbooth by Adellhub
- **Kategori:** Software Photobooth
- **Deskripsi:** Platform Software Photobooth All-in-One
- **Status:** Dalam pengembangan (Coming Soon)

### 3.5 More to Come (Adellhub Ecosystem)
- **Kategori:** Inovasi Mendatang
- **Deskripsi:** Kartu penutup geometris putus-putus (*dashed border*) untuk menampung eksplorasi dan usulan ide layanan berikutnya.
- **Status:** Eksplorasi Terbuka (Future Vision)

---

## 4. Arsitektur Halaman

> **📌 Mapping ke Landing Page 5-Step Flow** (dari skill `landing-page-generator`):
> 1. Stop the scroll → Hero Section
> 2. Earn trust → Portofolio & Rekam Jejak
> 3. Explain value → Bagian Layanan
> 4. Remove doubt → Overlay "Coming Soon" + Social proof
> 5. Make the ask → Waitlist CTA + Kontak

### 4.1 Header
- Logo: Wordmark tipografi `ADELLHUB` + aksen geometris kecil (SVG)
- Navigasi: Layanan · Portofolio · Hubungi Kami
- Sticky pada scroll
- **Catatan SEO:** Navigasi minimal — menghapus navigasi berlebih dapat meningkatkan konversi 2–28%

### 4.2 Hero Section (Step 1: Stop the Scroll)
- Judul: **"ADELLHUB: EKOSISTEM IT MASA DEPAN."**
- Sub-judul: *"Satu wadah, ribuan solusi teknologi. Mengubah ide menjadi realitas digital."*
- Grafis Bauhaus: Komposisi geometris SVG (merah & hitam) — meniru style referensi `image.png`
- CTA primer menuju waitlist
- **Target:** Capture attention dalam ~2.6 detik pertama

### 4.3 Bagian Layanan (Step 3: Explain Value)
- Grid layanan responsif (2-kolom desktop):
  - **Adellroute (#1 Featured):** Bentang penuh di baris teratas (`grid-column: 1 / -1`) dengan layout internal 2-kolom, styling Cobalt Blue Bauhaus, dan badge *Currently Working*.
  - **Adellwork (#2), Adelltech (#3), Adellbooth (#4):** Tiga kartu layanan berbalut palet merah Bauhaus eksisting dengan badge *Coming Soon*.
  - **More to Come (#5):** Kartu kelima berdesain minimalis garis putus-putus (*dashed*) dengan tombol usulan ide.
- Tombol "Selengkapnya" → memicu **overlay/modal** detail unit + CTA Waitlist Early Access langsung.

### 4.4 Portofolio & Rekam Jejak (Step 2: Earn Trust)
- Grid geometris bergaya Bauhaus (formasi 2×2 di desktop/tablet, 1-kolom di mobile)
- Judul: **"REKAM JEJAK KAMI"**
- Empat placeholder artistik SVG orisinal berasio 16:10 (400×250):
  - Adellroute: Arsitektur neural router token AI (Cobalt Blue + Bauhaus Matrix)
  - Adellwork: Flowchart mentoring
  - Adelltech: Workspace reparasi laptop
  - Adellbooth: UI mockup software photobooth
- **Semua gambar wajib punya atribut `alt` deskriptif** (dari skill `semantic-html-and-seo`)

### 4.5 Kontak & Footer (Step 5: Make the Ask)
- Label section: **"03. HUBUNGI KAMI"** — judul utama "*MARI TERHUBUNG*" (keputusan tim, menggantikan usulan awal "HUBUNGI KAMI")
- Email: `hello@adellhub.biz.id` (mailto: link) — keputusan tim, konsisten dengan domain & Cloudflare Email Routing
- WhatsApp: `+62 851-7969-7112` (link `https://wa.me/6285179697112`) — nomor asli pemilik
- Instagram: `@adellhub` (link ke profil Instagram)
- Tagline: *"Untuk update terbaru, ikuti perjalanan kami di sosial media."*
- Footer: Copyright © 2026 Adellhub + dua tombol legal **"Kebijakan Privasi"** & **"Syarat & Ketentuan"** yang membuka halaman statis (bahasa Indonesia) di tab baru

---

## 5. Fitur & Interaksi

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| Pre-loader Geometris | Animasi bentuk geometris saat halaman dimuat | P1 |
| Service Overlay | Modal/overlay "coming soon" dengan CTA waitlist | P1 |
| Modal Form Waitlist | Form input Nama & Email; submit via Cloudflare Pages Functions (`POST /api/waitlist`) dengan notifikasi otomatis ke grup Telegram tim | P1 |
| Micro-animations | Animasi CSS halus pada hover, scroll | P2 |
| Sticky Header | Header tetap terlihat saat scroll | P2 |
| Smooth Scroll | Navigasi antar section dengan smooth scroll | P2 |
| Responsive Design | Tampilan optimal di desktop, tablet, mobile | P1 |
| SEO & Open Graph | Meta tags, OG tags untuk social sharing | P1 |
| Structured Data | JSON-LD Organization schema | P2 |
| Accessibility | Semantic HTML, alt texts, focus management | P1 |

### 5.1 Filosofi Animasi (dari skill `find-animation-opportunities`)

> **Prinsip utama: Restraint.** Kadang animasi terbaik adalah tidak ada animasi.

| Elemen | Durasi yang Tepat | Catatan |
|--------|-------------------|--------|
| Press feedback (button) | 100–160ms | `scale(0.97)`, subtle |
| Tooltip / popover | 125–200ms | — |
| Modal / overlay | 200–500ms | Entry & exit simetris |
| Pre-loader (marketing) | Bisa lebih lama | Momen pertama, delight budget |

**Rules:**
- Hanya animate `transform` dan `opacity` (performa optimal)
- Wajib support `prefers-reduced-motion` (kurangi, bukan hilangkan)
- Hover states wajib di-gate dengan `@media (hover: hover)`
- Satu momen bold, sisanya tenang — Chanel principle

---

## 6. Estetika & Desain

> **Design System lengkap ada di [DESIGN.md](./DESIGN.md)** — mencakup palet warna, tipografi, grafis Bauhaus, layout & grid, komponen UI, animasi, aksesibilitas, dan design tokens CSS.

Ringkasan singkat untuk konteks PRD:

- **Referensi Visual:** `image.png` di root repo — Website MOCA Museum bergaya Bauhaus UI
- **Palet:** Off-white `#F5F0E8` (bg) · Arang `#1A1A1A` (teks) · Merah `#D2251C` (aksen, WCAG AA) · Abu `#757575` (sekunder)
- **Font:** Space Grotesk (display) + Inter (body) via Google Fonts
- **Grafis:** Bentuk geometris murni (lingkaran, kotak, grid titik) — merah & arang, tanpa gradien
- **Icon:** Wajib SVG inline — tidak menggunakan emoji (dari skill `svg-icon-generator`)

---

## 7. Tech Stack
> Lihat detail di [TRD.md](./TRD.md) (Technical Requirements Document)

---

## 8. SEO & Metadata (dari skill `semantic-html-and-seo`)

### 8.1 Meta Tags Wajib
- `<title>`: 50–60 karakter, keyword-first. Contoh: `Adellhub — Ekosistem IT Masa Depan | Startup Indonesia`
- `<meta name="description">`: 120–160 karakter
- `<link rel="canonical">`

### 8.2 Open Graph Tags
- `og:title`, `og:description`, `og:image` (1200×630px), `og:url`, `og:type`
- Twitter Card: `summary_large_image`

### 8.3 Structured Data (JSON-LD)
- Schema type: `Organization`
- Fields: name, url, logo, contactPoint, sameAs (sosial media)

### 8.4 Semantic HTML Wajib
- Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Satu `<h1>` per halaman
- Heading hierarchy: h1 → h2 → h3 (jangan skip)
- Semua `<img>` wajib punya `alt` (deskriptif atau `alt=""` untuk dekoratif)
- Semua `<a>` harus punya href yang valid
- Touch targets ≥ 44px pada perangkat sentuh

---

## 9. Batasan & Asumsi

- **Tidak ada backend:** Semua form diarahkan ke mailto:
  - Waitlist form → `waitlist@adellhub.biz.id` (Cloudflare Email Routing)
  - Kontak → `hello@adellhub.biz.id` (Cloudflare Email Routing)
- **Semua layanan Coming Soon:** Tidak ada halaman detail layanan
- **Kontak final (keputusan tim):** WhatsApp `+62 851-7969-7112` & Instagram `@adellhub` — menggantikan placeholder PRD awal
- **Dokumen legal:** Halaman statis `privacy-policy.html` & `terms-of-service.html` (bahasa Indonesia, gaya Bauhaus, dibuka di tab baru dari footer)
- **Single-page application (SPA) + halaman statis legal:** Build via Vite + Vanilla JS; multi-page (Vite `rollupOptions.input`)
- **Bahasa konten:** Bahasa Indonesia (campuran dengan Inggris untuk label teknis)

---

## 11. Riwayat Perubahan

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0.0 | 2026-09-18 | Versi awal PRD |
| 1.1.0 | 2026-09-18 | Sinkronisasi skill referensi & struktur |
| 1.2.0 | 2026-09-18 | Kontak final (email, WA, IG), palet warna kontras AA (`#D2251C`/`#757575`), tambahan dokumen legal (privacy/terms), judul kontak "MARI TERHUBUNG" |
| 1.3.0 | 2026-09-18 | Status **live** di `https://adellhub.biz.id` (Cloudflare Pages); Functional Checklist terverifikasi; Email Routing & og-image aktif |
| 1.4.0 | 2026-09-19 | Waitlist via **Cloudflare Pages Functions** (`POST /api/waitlist`) + otomatis kirim notifikasi ke **Telegram grup** (Topics, `adellhub_waitlist_bot`); anti-spam ringan (honeypot + timestamp <2s + length 10KB); security hardening (CORS strict, HTML escaping, input validation & sanitization); fix: support `www.adellhub.biz.id` origin |
| 1.5.0 | 2026-10-06 | Restrukturisasi dokumentasi `.ai/`: Section 6 (Estetika & Desain) dipindah ke **DESIGN.md**; referensi tech stack diperbarui ke **TRD.md**; tambah link ke **APP-FLOW.md** & **IMPLEMENTATION-PLAN.md** |
| 1.6.0 | 2026-10-06 | Penambahan layanan Adellroute (AI token reseller) & More to Come; Webpage stub `/adellroute/`; Grid portfolio simetris 2×2 (4 kartu SVG); Update kepatuhan UU PDP & AI Acceptable Use Policy di dokumen legal; Optimasi navbar mobile 46px |

---

## 10. Kriteria Keberhasilan

### Core Web Vitals Target
| Metrik | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 3s |

### Functional Checklist
- [x] Landing page load time < 2.5 detik (dari skill `landing-page-generator`)
- [x] Overlay "coming soon" muncul saat tombol layanan diklik
- [x] Form waitlist dapat diisi dan submit via email
- [x] Tampilan responsive di breakpoint: 360px, 480px, 768px, 1024px, 1280px, 1440px
- [x] Pre-loader berjalan saat halaman pertama kali dimuat
- [x] Seluruh navigasi smooth scroll berfungsi
- [x] Semua link (email, WA, Instagram) berfungsi
- [x] `prefers-reduced-motion` dihormati
- [x] Hover states di-gate dengan `@media (hover: hover)`
- [x] Touch targets ≥ 44px pada `@media (pointer: coarse)`
- [x] Images menggunakan `loading="lazy"` untuk below-the-fold
- [x] Open Graph tags lengkap untuk social sharing
- [x] Lighthouse: Performance > 90, Accessibility > 90 — terverifikasi di production (hasil bagus)
