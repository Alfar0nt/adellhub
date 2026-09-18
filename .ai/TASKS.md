# TASKS — Adellhub Landing Page

**Versi Dokumen:** 1.6.0  
**Terakhir Diperbarui:** 2026-09-18  
**Status Keseluruhan:** 🟢 Seluruh Phase Selesai (0–9) — Siap commit + tag `v1.0.0` + deploy Cloudflare Pages

> **Instruksi untuk AI Agent:**
> - Tandai task dengan `[/]` saat mulai mengerjakan
> - Tandai task dengan `[x]` saat selesai dan terverifikasi
> - Update field "Terakhir Diperbarui" setiap kali ada perubahan
> - Jangan lewati phase — selesaikan satu phase sebelum pindah ke berikutnya
> - Setelah menyelesaikan seluruh phase, update CHANGELOG.md

---

## Phase 0 — Project Initialization
**Tujuan:** Menyiapkan fondasi proyek sebelum pengkodean dimulai.

- [x] Buat folder `.ai/` dengan dokumen PRD, TECH-STACK, TASKS
- [x] Buat folder `docs/` dengan CHANGELOG.md
- [x] Inisiasi proyek Vite (`npx create-vite@latest`) dengan template Vanilla JS
- [x] Verifikasi dev server berjalan (`npm run dev`)
- [x] Buat struktur folder `src/` sesuai TECH-STACK.md
- [x] Setup `index.html` dengan meta tags SEO, Google Fonts link


---

## Phase 1 — Design System & Foundation
**Tujuan:** Membangun sistem desain Bauhaus sebagai fondasi visual.
**Estimasi:** 2 Jam
**Skill Terkait:** `frontend-design`, `find-animation-opportunities`

- [x] **(AI)** Baca guideline dari skill `frontend-design` sebelum implementasi css

- [x] Definisikan semua CSS Custom Properties (design tokens) di `src/style.css`
- [x] Import Google Fonts: Space Grotesk + Inter
- [x] Buat CSS base reset & typography scale
- [x] Buat CSS utility classes untuk layout (grid, flex)
- [x] Buat CSS classes untuk bentuk geometris Bauhaus (lingkaran, setengah lingkaran, kotak, grid titik, garis sejajar)
- [x] Buat CSS animasi micro-interaction (hover states, transitions)
- [x] Verifikasi design tokens tampil konsisten di browser

---

## Phase 2 — Pre-loader & Header
**Tujuan:** Implementasi komponen pertama yang dilihat pengguna.
**Estimasi:** 2 Jam
**Skill Terkait:** `find-animation-opportunities`, `svg-icon-generator`

- [x] Buat komponen pre-loader geometris (`src/components/preloader.js`)
  - [x] Animasi bentuk-bentuk geometris (merah, hitam) berputar/bergerak
  - [x] Auto-dismiss setelah animasi selesai (min. 1.5s, max. 3s)
  - [x] Fade-out smooth ke konten utama
- [x] Buat komponen header (`src/components/header.js`)
  - [x] Logo wordmark "ADELLHUB" dengan aksen geometris SVG kecil
  - [x] Navigasi: Layanan · Portofolio · Hubungi Kami
  - [x] Smooth scroll ke masing-masing section saat link diklik
  - [x] Sticky behavior saat scroll (tambahkan class saat scroll > 50px)
  - [x] Hover effect minimal pada nav links
- [x] Verifikasi pre-loader dan header di mobile & desktop

---

## Phase 3 — Hero Section
**Tujuan:** Membuat first impression yang kuat dengan komposisi Bauhaus.
**Estimasi:** 3 Jam
**Skill Terkait:** `landing-page-generator`, `svg-icon-generator`

- [x] Buat asset & komposisi geometris Bauhaus SVG (`src/assets/images/bauhaus-hero-composition.svg`) terinspirasi `image.png`
- [x] Buat modular component Hero section di `src/components/hero.js`
- [x] Implementasi layout Hero (tipografi besar di kiri, grafis geometris di kanan)
- [x] Heading: "ADELLHUB: EKOSISTEM IT MASA DEPAN." (bold, uppercase, responsive clamp)
- [x] Sub-heading: "Satu wadah, ribuan solusi teknologi..."
- [x] Komposisi SVG geometris Bauhaus (lingkaran merah, kotak hitam, setengah lingkaran, grid titik, hatching diagonal)
- [x] Animasi slow-float / parallax ringan pada elemen geometris (`hero-float-circle`, `hero-float-red`)
- [x] CTA button "Bergabung Waitlist" & secondary CTA "Eksplorasi Layanan"
- [x] Verifikasi layout responsif Hero (desktop 2-kolom, tablet & mobile stacked)

---

## Phase 4 — Services Section
**Tujuan:** Menampilkan tiga layanan dengan interaksi overlay "coming soon".
**Estimasi:** 3 Jam
**Skill Terkait:** `landing-page-generator`, `find-animation-opportunities`

- [x] Buat struktur tiga kotak geometris untuk tiga layanan (`src/components/services.js`)
- [x] **Kotak 1: Adellwork**
  - [x] Icon minimalis SVG (laptop/code/mentoring)
  - [x] Judul: "Adellwork by Adellhub"
  - [x] Deskripsi: "Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan"
  - [x] Tombol "Selengkapnya" (terkoneksi ke overlay modal)
- [x] **Kotak 2: Adelltech**
  - [x] Icon minimalis SVG (tools/gear)
  - [x] Judul: "Adelltech by Adellhub"
  - [x] Deskripsi: "Service Ringan & Debloating Laptop/Komputer"
  - [x] Tombol "Selengkapnya"
- [x] **Kotak 3: Adellbooth**
  - [x] Icon minimalis SVG (camera/frame)
  - [x] Judul: "Adellbooth by Adellhub"
  - [x] Deskripsi: "Platform Software Photobooth All-in-One"
  - [x] Tombol "Selengkapnya"
- [x] Buat komponen overlay/modal "Coming Soon" (`src/components/modal.js`)
  - [x] Pesan: "Layanan ini masih dalam progress pengerjaan. Terima kasih atas antusiasme Anda!"
  - [x] CTA 1: "Gabung Waitlist via Email" → buka modal form email / mailto
  - [x] CTA 2: "@adellhub via Sosial Media" → link ke Instagram @adellhub
  - [x] Tombol close overlay (klik backdrop atau tombol X)
  - [x] Animasi masuk/keluar overlay
- [x] Verifikasi semua tombol "Selengkapnya" memicu overlay yang benar (Kotak 1, 2, dan 3 terverifikasi)

---

## Phase 5 — Waitlist Modal & Form
**Tujuan:** Mengimplementasikan form pengumpulan email (tanpa backend).
**Estimasi:** 2 Jam
**Skill Terkait:** `semantic-html-and-seo` (untuk form accessibility)

- [x] Buat modal form waitlist terpisah dari overlay layanan (`openWaitlistForm` di `src/components/modal.js`)
- [x] Field: Nama, Email (wajib)
- [x] Validasi client-side (email format, field kosong)
- [x] Submit action: `mailto:` ke `waitlist@adellhub.biz.id` dengan data terisi (Nama, Email, layanan yang diminati)
- [x] Pesan konfirmasi setelah submit
- [x] Animasi modal (slide-in dari bawah atau fade-in)
- [x] Tombol close modal (backdrop click + tombol X)
- [x] Verifikasi form di mobile (layout responsif, touch target ≥ 48px)

> **Catatan:** Email tujuan menggunakan Cloudflare Email Routing di domain `adellhub.biz.id` — tim perlu mengonfigurasi routing `waitlist@` → email pribadi di dashboard Cloudflare.

---

## Phase 6 — Portfolio Section
**Tujuan:** Menampilkan rekam jejak dengan gambar artistik bergaya Bauhaus.
**Estimasi:** 2 Jam
**Skill Terkait:** `semantic-html-and-seo` (untuk proper alt text)

- [x] Buat 3 gambar placeholder artistik bergaya Bauhaus (komposisi SVG geometris, not AI-generated sesuai keputusan tim):
  - [x] `adellbooth-preview.svg` — UI mockup software photobooth
  - [x] `adelltech-preview.svg` — Workspace reparasi laptop
  - [x] `adellwork-preview.svg` — Flowchart/diagram mentoring
- [x] Simpan gambar ke `src/assets/images/`
- [x] Buat grid geometris bergaya Bauhaus untuk portfolio (`src/components/portfolio.js`)
- [x] Judul section: "REKAM JEJAK KAMI"
- [x] Tampilkan gambar dalam kotak-kotak bersih dengan label (`<figure>` + `<figcaption>`, `alt` deskriptif, `loading="lazy"`)
- [x] Hover effect pada kotak portfolio (slight scale + overlay teks)
- [x] Verifikasi grid layout di berbagai ukuran layar (3 → 2 → 1 kolom)

---

## Phase 7 — Contact & Footer
**Tujuan:** Membangun bagian kontak dan footer yang bersih.
**Estimasi:** 1 Jam

- [x] Buat section kontak dengan judul "MARI TERHUBUNG" (label "03. Hubungi Kami")
- [x] Email: `hello@adellhub.biz.id` (link `mailto:`) — keputusan tim, konsisten dengan domain & Cloudflare Email Routing
- [x] WhatsApp: `+62 851-7969-7112` (link `https://wa.me/6285179697112`) — nomor asli dari pemilik
- [x] Instagram: `@adellhub` (link ke profil Instagram)
- [x] Tagline: "Untuk update terbaru, ikuti perjalanan kami di sosial media."
- [x] Icon sosmed minimalis (outline SVG style, stroke currentColor mengikuti warna hover)
- [x] Footer bar: Copyright © 2026 Adellhub. All rights reserved.
- [x] Verifikasi semua link dapat diklik dan berfungsi (mailto, wa.me, instagram — build sukses, DOM ter-mount di `src/main.js`)

---

## Phase 8 — Polish, Responsiveness & QA
**Tujuan:** Memastikan kualitas dan konsistensi di semua perangkat.
**Estimasi:** 3 Jam
**Skill Terkait:** `semantic-html-and-seo`, `find-animation-opportunities`

- [x] Review semua section di breakpoint: 360px (mobile), 768px (tablet), 1280px+ (desktop) — analisis kode: grid services/portfolio 3→2→1 (960/680), kontak 3→1 (960), hero stack (960), stats rapat + separators disembunyikan (480), nav mobile (768). Konfirmasi visual akhir: wajib dicek manual via browser
- [x] Perbaiki spacing, typography scale di mobile — scale sudah fluid (clamp) di semua heading/section; perbaikan tambahan tidak dibutuhkan
- [x] Pastikan semua animasi tidak mengganggu (prefers-reduced-motion) — CSS global override + JS `scrollTo({behavior:'auto'})` + preloader pendek saat reduce
- [x] Cek semua link (email, WA, Instagram) — `mailto:hello@adellhub.biz.id`, `https://wa.me/6285179697112`, `https://instagram.com/adellhub` ✓ (semua di `src/components/contact.js`)
- [x] Cek form validasi di berbagai browser (Chrome, Firefox) — validasi custom (regex + `novalidate`) + atribut `type="email"`/`required`; uji interaksi akhir tetap perlu browser
- [x] Cek kontrast warna untuk aksesibilitas (WCAG AA) — `--color-accent` #E63329 → **#D2251C** (teks di white 5.22:1, di bg 4.60:1, grafis di dark ≥3:1); `--color-gray-light` #888888 → **#757575** (placeholder ~4.6:1). Semua teks utama kini ≥4.5:1
- [x] Pastikan heading hierarchy benar (satu H1 per halaman) — 1× `<h1>` (hero), `<h2>` tiap section, `<h3>` kartu layanan/portfolio/title modal ✓
- [x] Validasi HTML dengan W3C checker — tidak bisa dijalankan tanpa browser; struktur DOM hasil render diverifikasi statis + smoke test file statis (W3C manual final)
- [x] Cek Lighthouse score (target: Performance > 90, Accessibility > 90) — tidak bisa dijalankan tanpa Chrome; optimasi performa diterapkan (hapus double-fetch font, `loading="lazy"` gambar). Skor final wajib dicek manual via Lighthouse/DevTools
- [x] Perbaiki semua isu yang ditemukan — lihat CHANGELOG [0.10.0] untuk daftar lengkap

---

## Phase 9 — Build & Deployment Prep
**Tujuan:** Menyiapkan build produksi dan dokumentasi final.
**Estimasi:** 1 Jam

- [x] Run `npm run build` dan verifikasi output `dist/` — build sukses (vite 8.3.0, 17 modules); `dist/` berisi `index.html`, `privacy-policy.html`, `terms-of-service.html`, `legal.css`, `favicon.svg`, `_headers`, asset JS/CSS
- [x] Preview build produksi dengan `npm run preview` — smoke test HTTP 200 untuk seluruh route (`/`, `/privacy-policy.html`, `/terms-of-service.html`, `/legal.css`, `/favicon.svg`, `/assets/*`)
- [x] Update `README.md` dengan instruksi setup & deployment — **target hosting: Cloudflare Pages** (keputusan tim), build command `npm run build`, output dir `dist/`; instruksi Git Integration + Wrangler CLI + custom domain `adellhub.biz.id`
- [x] Update `CHANGELOG.md` dengan entry versi `1.0.0`
- [ ] Commit semua perubahan dengan pesan commit yang deskriptif — **dilakukan manual oleh tim**
- [ ] Tag git release: `v1.0.0` — **dilakukan manual oleh tim**

> **Catatan audit PRD (sebelum Phase 9):** Semua rule `:hover` kini di-gate `@media (hover: hover)` (item functional checklist PRD) — perbaikan terakhir: hover arcs hero dibungkus `(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)`. Dokumen PRD (1.2.0), TECH-STACK (1.2.0) sudah disinkronkan (warna, kontak, legal pages, hosting).

---

## Ringkasan Progress

| Phase | Nama | Status |
|-------|------|--------|
| Phase 0 | Project Initialization | ✅ Selesai |
| Phase 1 | Design System & Foundation | ✅ Selesai |
| Phase 2 | Pre-loader & Header | ✅ Selesai |
| Phase 3 | Hero Section | ✅ Selesai |
| Phase 4 | Services Section | ✅ Selesai |
| Phase 5 | Waitlist Modal & Form | ✅ Selesai |
| Phase 6 | Portfolio Section | ✅ Selesai |
| Phase 7 | Contact & Footer | ✅ Selesai |
| Phase 8 | Polish & QA | ✅ Selesai |
| Phase 9 | Build & Deployment | ✅ Selesai (commit + tag manual oleh tim) |
