# TASKS — Adellhub Landing Page

**Versi Dokumen:** 1.0.0  
**Terakhir Diperbarui:** 2026-09-18  
**Status Keseluruhan:** 🟡 In Progress (Phase 1 Selesai)

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

- [ ] Buat komponen pre-loader geometris (`src/components/preloader.js`)
  - [ ] Animasi bentuk-bentuk geometris (merah, hitam) berputar/bergerak
  - [ ] Auto-dismiss setelah animasi selesai (min. 1.5s, max. 3s)
  - [ ] Fade-out smooth ke konten utama
- [ ] Buat komponen header (`src/components/header.js`)
  - [ ] Logo wordmark "ADELLHUB" dengan aksen geometris SVG kecil
  - [ ] Navigasi: Layanan · Portofolio · Hubungi Kami
  - [ ] Smooth scroll ke masing-masing section saat link diklik
  - [ ] Sticky behavior saat scroll (tambahkan class saat scroll > 50px)
  - [ ] Hover effect minimal pada nav links
- [ ] Verifikasi pre-loader dan header di mobile & desktop

---

## Phase 3 — Hero Section
**Tujuan:** Membuat first impression yang kuat dengan komposisi Bauhaus.
**Estimasi:** 3 Jam
**Skill Terkait:** `landing-page-generator`, `svg-icon-generator`

- [ ] Generate gambar placeholder composisi geometris Bauhaus via AI (mirip `image.png`)
- [ ] Buat HTML structure Hero section di `index.html`
- [ ] Implementasi layout Hero (tipografi besar di kiri, grafis geometris di kanan)
- [ ] Heading: "ADELLHUB: EKOSISTEM IT MASA DEPAN." (bold, uppercase, 80px+)
- [ ] Sub-heading: "Satu wadah, ribuan solusi teknologi..."
- [ ] Komposisi SVG geometris Bauhaus (lingkaran merah, kotak hitam, setengah lingkaran, grid titik)
- [ ] Animasi slow-float / parallax ringan pada elemen geometris
- [ ] CTA button "Bergabung Waitlist"
- [ ] Verifikasi layout responsif Hero

---

## Phase 4 — Services Section
**Tujuan:** Menampilkan tiga layanan dengan interaksi overlay "coming soon".
**Estimasi:** 3 Jam
**Skill Terkait:** `landing-page-generator`, `find-animation-opportunities`

- [ ] Buat struktur tiga kotak geometris untuk tiga layanan
- [ ] **Kotak 1: Adellwork**
  - [ ] Icon minimalis SVG (laptop/code/mentoring)
  - [ ] Judul: "Adellwork by Adellhub"
  - [ ] Deskripsi: "Bantuan & Mentoring Asisten Tugas IT, Desain, Jaringan"
  - [ ] Tombol "Selengkapnya"
- [ ] **Kotak 2: Adelltech**
  - [ ] Icon minimalis SVG (tools/gear)
  - [ ] Judul: "Adelltech by Adellhub"
  - [ ] Deskripsi: "Service Ringan & Debloating Laptop/Komputer"
  - [ ] Tombol "Selengkapnya"
- [ ] **Kotak 3: Adellbooth**
  - [ ] Icon minimalis SVG (camera/frame)
  - [ ] Judul: "Adellbooth by Adellhub"
  - [ ] Deskripsi: "Platform Software Photobooth All-in-One"
  - [ ] Tombol "Selengkapnya"
- [ ] Buat komponen overlay/modal "Coming Soon" (`src/components/modal.js`)
  - [ ] Pesan: "Layanan ini masih dalam progress pengerjaan. Terima kasih atas antusiasme Anda!"
  - [ ] CTA 1: "Gabung Waitlist via Email" → buka modal form email
  - [ ] CTA 2: "@adellhub via Sosial Media" → link ke Instagram @adellhub
  - [ ] Tombol close overlay (klik backdrop atau tombol X)
  - [ ] Animasi masuk/keluar overlay
- [ ] Verifikasi semua tombol "Selengkapnya" memicu overlay yang benar

---

## Phase 5 — Waitlist Modal & Form
**Tujuan:** Mengimplementasikan form pengumpulan email (tanpa backend).
**Estimasi:** 2 Jam
**Skill Terkait:** `semantic-html-and-seo` (untuk form accessibility)

- [ ] Buat modal form waitlist terpisah dari overlay layanan
- [ ] Field: Nama, Email (wajib)
- [ ] Validasi client-side (email format, field kosong)
- [ ] Submit action: `mailto:` ke email Adellhub dengan data terisi
- [ ] Pesan konfirmasi setelah submit
- [ ] Animasi modal (slide-in dari bawah atau fade-in)
- [ ] Tombol close modal (backdrop click + tombol X)
- [ ] Verifikasi form di mobile

---

## Phase 6 — Portfolio Section
**Tujuan:** Menampilkan rekam jejak dengan gambar artistik bergaya Bauhaus.
**Estimasi:** 2 Jam
**Skill Terkait:** `semantic-html-and-seo` (untuk proper alt text)

- [ ] Generate 3 gambar placeholder artistik bergaya Bauhaus via AI:
  - [ ] `adellbooth-preview.png` — UI mockup software photobooth
  - [ ] `adelltech-preview.png` — Workspace reparasi laptop
  - [ ] `adellwork-preview.png` — Flowchart/diagram mentoring
- [ ] Simpan gambar ke `src/assets/images/`
- [ ] Buat grid geometris bergaya Bauhaus untuk portfolio
- [ ] Judul section: "REKAM JEJAK KAMI"
- [ ] Tampilkan gambar dalam kotak-kotak bersih dengan label
- [ ] Hover effect pada kotak portfolio (slight scale + overlay teks)
- [ ] Verifikasi grid layout di berbagai ukuran layar

---

## Phase 7 — Contact & Footer
**Tujuan:** Membangun bagian kontak dan footer yang bersih.
**Estimasi:** 1 Jam

- [ ] Buat section kontak dengan judul "HUBUNGI KAMI"
- [ ] Email: `[email protected]` (link `mailto:`)
- [ ] WhatsApp: `+62 812-XXXX-XXXX` (link `https://wa.me/62812XXXXXXXX`)
- [ ] Instagram: `@adellhub` (link ke profil Instagram)
- [ ] Tagline: "Untuk update terbaru, ikuti perjalanan kami di sosial media."
- [ ] Icon sosmed minimalis (outline SVG style)
- [ ] Footer bar: Copyright © 2026 Adellhub. All rights reserved.
- [ ] Verifikasi semua link dapat diklik dan berfungsi

---

## Phase 8 — Polish, Responsiveness & QA
**Tujuan:** Memastikan kualitas dan konsistensi di semua perangkat.
**Estimasi:** 3 Jam
**Skill Terkait:** `semantic-html-and-seo`, `find-animation-opportunities`

- [ ] Review semua section di breakpoint: 360px (mobile), 768px (tablet), 1280px+ (desktop)
- [ ] Perbaiki spacing, typography scale di mobile
- [ ] Pastikan semua animasi tidak mengganggu (prefers-reduced-motion)
- [ ] Cek semua link (email, WA, Instagram)
- [ ] Cek form validasi di berbagai browser (Chrome, Firefox)
- [ ] Cek kontrast warna untuk aksesibilitas (WCAG AA)
- [ ] Pastikan heading hierarchy benar (satu H1 per halaman)
- [ ] Validasi HTML dengan W3C checker
- [ ] Cek Lighthouse score (target: Performance > 90, Accessibility > 90)
- [ ] Perbaiki semua isu yang ditemukan

---

## Phase 9 — Build & Deployment Prep
**Tujuan:** Menyiapkan build produksi dan dokumentasi final.
**Estimasi:** 1 Jam

- [ ] Run `npm run build` dan verifikasi output `dist/`
- [ ] Preview build produksi dengan `npm run preview`
- [ ] Update `README.md` dengan instruksi setup & deployment
- [ ] Update `CHANGELOG.md` dengan entry versi `1.0.0`
- [ ] Commit semua perubahan dengan pesan commit yang deskriptif
- [ ] Tag git release: `v1.0.0`

---

## Ringkasan Progress

| Phase | Nama | Status |
|-------|------|--------|
| Phase 0 | Project Initialization | 🟡 Sebagian |
| Phase 1 | Design System & Foundation | 🔴 Belum |
| Phase 2 | Pre-loader & Header | 🔴 Belum |
| Phase 3 | Hero Section | 🔴 Belum |
| Phase 4 | Services Section | 🔴 Belum |
| Phase 5 | Waitlist Modal & Form | 🔴 Belum |
| Phase 6 | Portfolio Section | 🔴 Belum |
| Phase 7 | Contact & Footer | 🔴 Belum |
| Phase 8 | Polish & QA | 🔴 Belum |
| Phase 9 | Build & Deployment | 🔴 Belum |
