# PRD — Adellhub Landing Page

**Versi Dokumen:** 1.4.0  
**Tanggal:** 2026-09-19  
**Status:** Live — deploy Cloudflare Pages, seluruh checklist terverifikasi; waitlist via serverless function + notifikasi Telegram  
**Author:** Adellhub Team  
**Skills yang Direferensikan:** `frontend-design`, `landing-page-generator`, `semantic-html-and-seo`, `find-animation-opportunities`, `svg-icon-generator`

---

## 1. Ringkasan Produk

Adellhub adalah ekosistem bisnis startup IT yang berfungsi sebagai payung (holding brand) untuk tiga layanan digital yang saat ini masih dalam tahap pengembangan. Landing page ini bertujuan untuk:

1. Memperkenalkan brand Adellhub dan tiga layanan di bawahnya.
2. Membangun kredibilitas dan kepercayaan calon pengguna.
3. Mengumpulkan daftar tunggu (waitlist) dari calon pengguna via Cloudflare Pages Functions + notifikasi otomatis ke grup Telegram tim.
4. Mengarahkan audiens ke kanal sosial media resmi.

---

## 2. Target Pengguna

| Segmen | Deskripsi |
|--------|-----------|
| Mahasiswa / Pelajar IT | Mencari bantuan tugas, proyek, atau mentoring teknis |
| Pemilik Bisnis Kecil | Membutuhkan service ringan laptop/komputer |
| Penyelenggara Event | Memerlukan solusi software photobooth |
| Tech Enthusiast | Tertarik dengan ekosistem startup IT lokal |

---

## 3. Layanan yang Ditampilkan

### 3.1 Adellwork by Adellhub
- **Kategori:** Asisten & Mentoring IT
- **Deskripsi:** Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan
- **Status:** Dalam pengembangan (Coming Soon)
- **Catatan:** Gunakan kata "Asisten" atau "Mentoring", bukan "joki"

### 3.2 Adelltech by Adellhub
- **Kategori:** Layanan Teknologi / Reparasi
- **Deskripsi:** Service Ringan & Debloating Laptop/Komputer
- **Status:** Dalam pengembangan (Coming Soon)

### 3.3 Adellbooth by Adellhub
- **Kategori:** Software Photobooth
- **Deskripsi:** Platform Software Photobooth All-in-One
- **Status:** Dalam pengembangan (Coming Soon)

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
- Tiga kotak geometris: Adellwork, Adelltech, Adellbooth
- Tombol "Selengkapnya" → memicu **overlay/modal** (bukan navigasi halaman baru)
- Isi overlay: Pesan "Layanan ini masih dalam progress" + dua CTA:
  - **Gabung Waitlist via Email** → membuka modal form email
  - **@adellhub via Sosial Media** → link Instagram `@adellhub`
- **CTA copy:** Gunakan value-focused copy ("Gabung Waitlist" bukan "Submit")

### 4.4 Portofolio & Rekam Jejak (Step 2: Earn Trust)
- Grid geometris bergaya Bauhaus
- Judul: **"REKAM JEJAK KAMI"**
- Gambar: Placeholder artistik bergaya Bauhaus yang di-generate untuk setiap layanan
  - Adellbooth: UI mockup software photobooth
  - Adelltech: Workspace reparasi
  - Adellwork: Flowchart mentoring
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

### 6.1 Referensi Visual
File: `image.png` (ada di root repo) — Website MOCA Museum dengan Bauhaus UI.

### 6.2 Palet Warna
| Token | Nilai | Keterangan |
|-------|-------|------------|
| `--color-bg` | `#F5F0E8` | Off-white / krem latar belakang |
| `--color-dark` | `#1A1A1A` | Hitam arang untuk teks & bentuk gelap |
| `--color-accent` | `#D2251C` | Merah Bauhaus — diturunkan dari `#E63329` agar lolos kontras WCAG AA (teks di white 5.22:1, di bg 4.60:1) |
| `--color-white` | `#FFFFFF` | Putih murni |
| `--color-gray` | `#757575` | Teks sekunder — diturunkan dari `#888888` (~4.6:1 rasio kontras placeholder) |

### 6.3 Tipografi
- **Font:** `Space Grotesk` (Google Fonts) — primary display
- **Font Alt:** `Inter` (Google Fonts) — body text
- **Fallback Stack:** `'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Heading 1:** 72–96px, weight 800, uppercase
- **Heading 2:** 40–56px, weight 700
- **Body:** 16–18px, weight 400
- **Nav/Label:** 12–14px, weight 500, letter-spacing lebar
- **Line length:** Maksimal 80 karakter per baris (dari skill `frontend-design`)

> **⚠️ Anti-pattern dari skill `frontend-design` — HINDARI:**
> - Jangan aksen satu kata saja di headline dengan warna/italic berbeda
> - Jangan gunakan ALL CAPS untuk semua label (hanya untuk heading utama sesuai Bauhaus)
> - Jangan gunakan numbered markers (01/02/03) kecuali konten benar-benar berurutan

### 6.4 Grafis Bauhaus
- Bentuk murni: lingkaran, setengah lingkaran, kotak, garis-garis sejajar, grid titik
- Hanya merah dan hitam/arang (tidak ada gradien, tidak ada shadow berlebihan)
- Implementasi via SVG inline atau CSS shapes
- **Icon wajib SVG** — tidak menggunakan emoji sebagai icon (dari skill `landing-page-generator`)

---

## 7. Tech Stack
> Lihat detail di [TECH-STACK.md](./TECH-STACK.md)

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
| 1.4.0 | 2026-09-19 | Waitlist via **Cloudflare Pages Functions** (`POST /api/waitlist`) + otomatis kirim notifikasi ke **Telegram grup** (Topics, `adellhub_waitlist_bot`); anti-spam ringan (honeypot + timestamp <2s + length 10KB); security hardening (CORS strict, HTML escaping, rate limiting 5 req/min, input validation & sanitization); fix: support `www.adellhub.biz.id` origin |

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
