# TASKS — Link-in-Bio (folder `links/`) — Adellhub

**Versi Dokumen:** 1.1.0  
**Terakhir Diperbarui:** 2026-09-19  
**Status Keseluruhan:** 🟡 Phase L-0 selesai — menunggu instruksi lanjut Phase L-1 + konten final dari user  
**Branch:** `develop`

> **Instruksi untuk AI Agent:**
> - Tandai task dengan `[/]` saat mulai mengerjakan
> - Tandai task dengan `[x]` saat selesai dan terverifikasi
> - Update field "Terakhir Diperbarui" setiap kali ada perubahan
> - Jangan lewati phase — selesaikan satu phase sebelum pindah ke berikutnya
> - Setelah menyelesaikan seluruh phase, update `docs/CHANGELOG.md`

---

## Latar Belakang

Folder `links/` berisi proyek **link-in-bio** (portfolio personal) yang lama — dark glassmorphism + background video. Untuk proyek ini, seluruh **design style** dan **isi link** akan diganti.

**Keputusan tim:**
- **Design style baru:** Bauhaus Adellhub sesuai `.ai/PRD.md` (bg off-white `#F5F0E8`, charcoal `#1A1A1A`, accent `#D2251C`, font Space Grotesk + Inter, bentuk geometris SVG, hard shadow, tanpa gradien/glassmorphism)
- **Deployment:** integrasi ke build Vite Adellhub → diakses di path **`/links/`** pada domain yang sama (bukan subfolder statis terpisah)
- **Background video & glassmorphism:** dihapus → diganti latar geometris statis Bauhaus
- **Isi konten (profil + daftar link):** diberikan oleh user (belum tersedia; dipakai placeholder sampai disediakan)

---

## Phase L-0 — Analisis, Audit & Persiapan

**Tujuan:** Memetakan kondisi `links/` saat ini dan menyiapkan kebutuhan sebelum ngoding.
**Skill:** — (read-only)

- [x] Audit inventaris file `links/` (index.html, script.js, styles.css, images/, profile.jpg, letter-bg.mp4, test.md) dan referensi antar file
- [x] Tandai file tak terpakai untuk dihapus: 10 file terverifikasi 0 referensi → **dihapus setelah konfirmasi user** (`test.md`, `resume.png`, `resume-v2.png`, `wiki.png`, `wordpress.png`, `dev.png`, `amazon.svg`, `facebook.svg`, `google.svg`, `twitter.svg`)
- [x] Tentukan struktur Vite multi-page: tambah `links/index.html` sebagai entry baru → output `dist/links/index.html` → URL `/links/`
- [x] Catat kebutuhan konten yang belum ada: nama profil, deskripsi, daftar link (title/URL/ikon) — **menunggu user**

**Hasil audit L-0 (2026-09-19):**
- File dipakai: `index.html`, `styles.css`, `script.js`, `profile.jpg`, `letter-bg.mp4` (video, dibuang di L-1), `images/{linkedin,github,instagram,youtube,spotify}.svg`
- File dihapus, 10 item (lihat di atas) — setelah konfirmasi user
- Catatan Vite untuk L-2: path ikon sebagai string di `script.js` (`./images/x.svg`) **tidak diproses Vite** → solusi: inline SVG / ES import / pindah ke `public/`. `profile.jpg` (direferensikan di HTML) akan ter-resolve otomatis.
- Entry Vite (L-5): `links: fileURLToPath(new URL('./links/index.html', import.meta.url))`

---

## Phase L-1 — Design System Bauhaus & Struktur HTML

**Tujuan:** Membangun fondasi visual Bauhaus dan struktur halaman yang sesuai PRD.
**Skill:** `frontend-design`, `semantic-html-and-seo`, `svg-icon-generator`

- [ ] **(AI)** Baca skill `frontend-design` sebelum implementasi CSS
- [ ] Ganti seluruh `styles.css` (hapus theme dark glassmorphism, ganti design tokens Bauhaus): `--color-bg #F5F0E8`, `--color-dark #1A1A1A`, `--color-accent #D2251C`, tokens spacing 8px & motion (`--duration-fast`, `--duration-base`), sesuai PRD Adellhub
- [ ] Font: Space Grotesk (display) + Inter (body) via Google Fonts (preconnect + preload, pola optimal dari `index.html` utama)
- [ ] Restrukturisasi `links/index.html`: semantic landmarks (`<main>`, `<header>`, `<section>`, `<footer>`), satu `<h1>`, meta title/description/OG/twitter/canonical `https://adellhub.biz.id/links/`, `lang` sesuai konten final
- [ ] Hapus markup & aset background video (`video-container`, `#bg-video`, `letter-bg.mp4`, overlay)
- [ ] Latar statis Bauhaus: geometris off-white (dot grid / arcs / square aksen — SVG inline)

---

## Phase L-2 — Komponen Profil & Link Cards

**Tujuan:** Membangun ulang profil & kartu link bergaya Bauhaus.
**Skill:** `svg-icon-generator`, `find-animation-opportunities`

- [ ] Rewrite `script.js` menjadi setup yang kompatibel Vite (data config links terpisah/terpusat — mudah diedit saat konten final datang)
- [ ] Profile section: avatar dengan framing geometris Bauhaus (bukan lingkaran glass), nama, deskripsi, tombol kontak email (outline/accent, bukan pill glass)
- [ ] Kartu link bergaya `bauhaus-card` (border 2px charcoal, hard shadow, label uppercase, aksen merah kecil) — ikuti pola kartu layanan/portfolio halaman utama Adellhub
- [ ] Ikon link: inline SVG geometris/generik + brand SVG lokal yang relevan (pertahankan `linkedin.svg`, `github.svg`, `instagram.svg`, `spotify.svg`, `youtube.svg`); ikuti allowlist seperti `safeExternalUrl` (hanya skema http/https)

---

## Phase L-3 — Interaksi & Animasi (Restraint)

**Tujuan:** Micro-interaction halus sesuai filosofi animasi PRD — hanya `transform` & `opacity`.
**Skill:** `find-animation-opportunities`

- [ ] Hover efek kartu: gated `@media (hover: hover) and (pointer: fine)` — kartu naik (translateY) + hard shadow, aksen merah, tanpa repaint (transisi hanya transform/opacity/color)
- [ ] `prefers-reduced-motion`: matikan animasi stagger & transisi (ganti CSS + cek JS)
- [ ] Fokus state `:focus-visible` kontras tinggi di semua tombol/link
- [ ] Pertahankan praktik performa dari kode lama yang masih relevan: `will-change` sementara saat animasi, DocumentFragment single-reflow untuk render links, `loading="lazy"` untuk gambar di bawah fold

---

## Phase L-4 — Aksesibilitas, SEO & Responsiveness

**Tujuan:** Lolos WCAG AA dan rapi di semua layar — standar PRD Adellhub.
**Skill:** `semantic-html-and-seo`

- [ ] Kontras teks utama ≥ 4.5:1 (token warna Bauhaus sudah dirancang kontras AA)
- [ ] Touch targets ≥ 44px pada pointer coarse; `mobile-nav`-style tap highlight dihilangkan
- [ ] Alt text deskriptif, `aria-label` pada tiap link, heading hierarchy valid
- [ ] Responsive: breakpoint 360px, 480px, 768px, 1280px — container max-width ~680px tetap, padding rapi
- [ ] Meta OG/twitter/JSON-LD lengkap; canonical mengarah `https://adellhub.biz.id/links/`

---

## Phase L-5 — Integrasi Vite & QA Build

**Tujuan:** Memastikan `/links/` ikut ter-build dan ter-deploy dengan benar.
**Skill:** — (setup)

- [ ] Tambah `links/index.html` ke `rollupOptions.input` di `vite.config.js`
- [ ] Pastikan aset (profile image, ikon SVG, CSS) ter-resolve Vite tanpa error; bersihkan file tidak terpakai dari `links/`
- [ ] `npm run build` → verifikasi output `dist/links/index.html` + aset (dan halaman utama tetap utuh)
- [ ] `npm run preview` → smoke test: `/links/` HTTP 200, konten render (JS jalan), tampilan responsive
- [ ] `npm audit` — pastikan tetap 0 vulnerabilities (seharusnya tanpa dependency baru)

---

## Phase L-6 — Input Konten Final (menunggu user)

**Tujuan:** Mengganti placeholder dengan konten asli.
**Skill:** —

- [ ] Isi data profil: nama, deskripsi, foto (dari user)
- [ ] Isi daftar link: title, URL, deskripsi, ikon (dari user)
- [ ] Update meta title/description/Language sesuai konten final
- [ ] (Opsional, butuh konfirmasi) tambah tombol/link dari halaman utama `index.html` menuju `/links/`

---

## Ringkasan Progress

| Phase | Nama | Status |
|-------|------|--------|
| Phase L-0 | Analisis, Audit & Persiapan | 🟢 Selesai |
| Phase L-1 | Design System Bauhaus & Struktur HTML | 🔴 Belum |
| Phase L-2 | Komponen Profil & Link Cards | 🔴 Belum |
| Phase L-3 | Interaksi & Animasi | 🔴 Belum |
| Phase L-4 | Aksesibilitas, SEO & Responsiveness | 🔴 Belum |
| Phase L-5 | Integrasi Vite & QA Build | 🔴 Belum |
| Phase L-6 | Input Konten Final | 🔴 Belum (tergantung user) |