# TASKS — Link-in-Bio (folder `links/`) — Adellhub

**Versi Dokumen:** 1.8.0  
**Terakhir Diperbarui:** 2026-09-19  
**Status Keseluruhan:** 🟢 Seluruh phase selesai — menunggu verifikasi visual user di `/links/`  
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

- [x] **(AI)** Baca skill `frontend-design` sebelum implementasi CSS
- [x] Ganti seluruh `styles.css` (hapus theme dark glassmorphism, ganti design tokens Bauhaus): `--color-bg #F5F0E8`, `--color-dark #1A1A1A`, `--color-accent #D2251C`, tokens spacing 8px & motion (`--duration-fast`, `--duration-base`), sesuai PRD Adellhub
- [x] Font: Space Grotesk (display) + Inter (body) via Google Fonts (preconnect + stylesheet — pola sama dengan `index.html` utama)
- [x] Restrukturisasi `links/index.html`: semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), satu `<h1>`, meta title/description/OG/twitter/canonical `https://adellhub.biz.id/links/`, `lang="id"` (placeholder — sesuaikan di L-6)
- [x] Hapus markup & aset background video (`video-container`, `#bg-video`, `letter-bg.mp4`, overlay)
- [x] Latar statis Bauhaus: geometris off-white (dot grid / arcs / square aksen — `.geo-bg`, `position: fixed`, `aria-hidden`)

**Hasil Phase L-1 (2026-09-19):**
- `links/index.html` ditulis ulang: wordmark ADELLHUB (konfirmasi user), profil dgn framing geometris (persegi + kotak merah pojok + ring), kartu link `bauhaus-card`, footer copyright — **placeholder** jelas utk L-6
- `links/styles.css` ditulis ulang: tokens dari design system utama, `.geo-bg` statis, `.btn` outline Bauhaus, hover gated `(hover:hover) (pointer:fine)`, `contain: content` pada kartu, `prefers-reduced-motion` global
- `letter-bg.mp4` dihapus; markup `<video>` hilang (verifikasi: tidak ada `video/letter-bg/bg-video`)
- Verifikasi: dev server `/links/` 200 (HTML/CSS/JS/profile.jpg), `npm run build` tetap hijau (sit main tak terganggu)
- `script.js` **belum diubah** (rewrite Vite-compatible di Phase L-2) — `initBackgroundVideo` kini no-op (elemen `#bg-video` tidak ada)

---

## Phase L-2 — Komponen Profil & Link Cards

**Tujuan:** Membangun ulang profil & kartu link bergaya Bauhaus.
**Skill:** `svg-icon-generator`, `find-animation-opportunities`

- [x] Rewrite `script.js` menjadi setup yang kompatibel Vite (data config links terpisah/terpusat — mudah diedit saat konten final datang)
- [x] Profile section: avatar dengan framing geometris Bauhaus, nama, deskripsi, tombol kontak email (outline/accent, bukan pill glass) — **dibangun di Phase L-1**
- [x] Kartu link bergaya `bauhaus-card` (border 2px charcoal, hard shadow, label **uppercase + bullet merah 6px** — konfirmasi user, aksen merah kecil) — ikuti pola kartu layanan/portfolio halaman utama Adellhub
- [x] Ikon link: inline SVG geometris/generik + brand SVG lokal yang relevan (pertahankan `linkedin.svg`, `github.svg`, `instagram.svg`, `spotify.svg`, `youtube.svg`); ikuti allowlist seperti `safeExternalUrl` (hanya skema http/https)

**Hasil Phase L-2 (2026-09-19):**
- `links/script.js` ditulis ulang → **ES module kompatibel Vite** (pola `src/components/portfolio.js`):
  - Ikon brand di-import: `import linkedinIcon from './images/linkedin.svg'` dst → URL asset ditangani Vite, aman di build
  - `LINKS` config terpusat di atas (placeholder — konten final di L-6); ikon `image` (import) / `svgIcon` (inline) dibedakan
  - `safeExternalUrl` allowlist `^https?:` (fallback `#`) + `escapeHtml` — pola `modal.js`
  - Pertahankan: DocumentFragment single-reflow, stagger 60ms, `will-change` sementara (skip mobile <480px), `rel="noopener noreferrer"`
  - `initBackgroundVideo()` **dihapus total** (video sudah tidak ada)
- `links/index.html`: `<script>` → `type="module"`
- `links/styles.css`: judul kartu **uppercase** (Space Grotesk 700) + `.link-head` flex dengan `.link-bullet` merah 6px (pola `feature-bullet` halaman utama)
- Verifikasi dev server: index 200 + modul ter-transform (`import … /links/images/*.svg?import`), 5 SVG 200 — semua wiring OK; build produksi penuh diverifikasi di Phase L-5 (butuh entry vite.config)

---

## Phase L-3 — Interaksi & Animasi (Restraint)

**Tujuan:** Micro-interaction halus sesuai filosofi animasi PRD — hanya `transform` & `opacity`.
**Skill:** `find-animation-opportunities`

- [x] Hover efek kartu: gated `@media (hover: hover) and (pointer: fine)` — kartu naik (translateY) + hard shadow, aksen merah, tanpa repaint (transisi hanya transform/opacity/color) — **sejak L-1; dirapikan di L-3**
- [x] `prefers-reduced-motion`: matikan animasi stagger & transisi (ganti CSS + cek JS) — **CSS global sejak L-1; guard JS ditambah di L-3**
- [x] Fokus state `:focus-visible` kontras tinggi di semua tombol/link — **base rule 2px arang offset 3px sejak L-1**
- [x] Pertahankan praktik performa dari kode lama yang masih relevan: `will-change` sementara saat animasi, DocumentFragment single-reflow untuk render links, `loading="lazy"` untuk gambar di bawah fold

**Hasil Phase L-3 (2026-09-19):**
- Audit animasi skill `find-animation-opportunities`: stagger 60ms (rare/first-load, boleh) + hover near-imperceptible 240ms (tens/day) + press feedback 160ms — dipertahankan; **tidak ada tambahan animasi baru** (restraint; halaman tanpa modal/toggle/list dinamis)
- JS `renderLinks()`: cek `prefers-reduced-motion` → **skip stagger delay + `will-change`** bila aktif; ikon kartu ditambah `loading="lazy"` + `decoding="async"`
- CSS: transisi `.link-card` dirapikan dari 3 properti → `transform` + `box-shadow` saja (hapus `background-color` yang tidak dipakai)
- Verifikasi dev: script.js 200, guard reduced-motion & lazy terlihat di modul ter-transform

---

## Phase L-4 — Aksesibilitas, SEO & Responsiveness

**Tujuan:** Lolos WCAG AA dan rapi di semua layar — standar PRD Adellhub.
**Skill:** `semantic-html-and-seo`

- [x] Kontras teks utama ≥ 4.5:1 (token warna Bauhaus sudah dirancang kontras AA) — **verified sejak awal**
- [x] Touch targets ≥ 44px pada pointer coarse; `mobile-nav`-style tap highlight dihilangkan
- [x] Alt text deskriptif, `aria-label` pada tiap link, heading hierarchy valid
- [x] Responsive: breakpoint 360px, 480px, 768px, 1280px — container max-width ~680px tetap, padding rapi
- [x] Meta OG/twitter/JSON-LD lengkap; canonical mengarah `https://adellhub.biz.id/links/`

**Hasil Phase L-4 (2026-09-19):**
- JSON-LD `Person` ditambahkan di `<head>`: name `Nama Anda` (PLACEHOLDER), url `/links/`, `sameAs` = 6 tautan sosial/Wiki (mengikuti konten final L-6)
- `script.js`: ikon `<img alt="">` (dekoratif — judul terlihat di sebelahnya), tiap kartu dgn `aria-label="{judul} — buka di tab baru"` (eksplisit utk pembaca layar)
- `styles.css` `@media (pointer: coarse)`: wordmark `min-height:44px`, `-webkit-tap-highlight-color: transparent` untuk kartu/tombol/wordmark; breakpoint `360px` tambahan (padding 16px, gap kartu 8px, desc 12px)
- Meta description & OG/twitter desc diperpanjang → **133 karakter** (120–160)
- Heading hierarchy valid: h1 (nama) → h2 sr-only (Tautan) → h3 (judul kartu); kontras token AA; 480/768/1280 sudah terpenuhi layout fluid
- Verifikasi dev: JSON-LD, description, canonical, alt="", aria-label, lazy — semua OK di output ter-transform

---

## Phase L-5 — Integrasi Vite & QA Build

**Tujuan:** Memastikan `/links/` ikut ter-build dan ter-deploy dengan benar.
**Skill:** — (setup)

- [x] Tambah `links/index.html` ke `rollupOptions.input` di `vite.config.js`
- [x] Pastikan aset (profile image, ikon SVG, CSS) ter-resolve Vite tanpa error; bersihkan file tidak terpakai dari `links/`
- [x] `npm run build` → verifikasi output `dist/links/index.html` + aset (dan halaman utama tetap utuh)
- [x] `npm run preview` → smoke test: `/links/` HTTP 200, konten render (JS jalan), tampilan responsive
- [x] `npm audit` — pastikan tetap 0 vulnerabilities (seharusnya tanpa dependency baru)

**Hasil Phase L-5 (2026-09-19):**
- `vite.config.js` (+1 line): `links: fileURLToPath(new URL('./links/index.html', import.meta.url))`
- CLI build OK: `dist/links/index.html` (6.0 kB), `dist/assets/profile-*.jpg`, `dist/assets/links-*.css`, `dist/assets/links-*.js`; **5 brand SVG ter-inline jadi data URI** (di bawah `assetsInlineLimit`) → tanpa request tambahan; halaman utama (index/privacy/terms) tetap ter-build
- Preview smoke (`vite preview`, port 4173): `/`, `/links/`, legal pages, `/favicon.svg` — semua **200**; asset ref di HTML ter-rewrite ke path hashed (`assets/links-*.js/css`, `assets/profile-*.jpg`); JSON-LD/canonical/OG/title dipertahankan
- `npm audit`: **0 vulnerabilities**
- Catatan: render kartu (runtime JS) tidak bisa diverifikasi via curl — dicek visual oleh user di `/links/` (dev/preview); audite akhir L-6

---

## Phase L-6 — Input Konten Final 🟢 Selesai

**Tujuan:** Mengganti placeholder dengan konten asli.
**Skill:** `svg-icon-generator` (ikom TikTok baru)

- [x] Isi data profil: nama **Adellhub**, role **Startup Indonesia**, deskripsi **"Ekosistem bisnis startup IT: Adellwork, Adelltech, dan Adellbooth."** — foto `profile.jpg` dipertahankan
- [x] Isi daftar link (3, dari user): **Situs Resmi** (globe inline → `https://adellhub.biz.id`), **Instagram** (`@adellhub` → `instagram.com/adellhub`), **TikTok** (`@adellhub` → `tiktok.com/@adellhub`)
- [x] Hapus konten lama sepenuhnya: LinkedIn/CV/Wiki/GitHub/IG pribadi/YouTube/Spotify dari `LINKS`; ikon inline `fileIcon`/`bookIcon` dibuang; SVG tak terpakai dihapus (`linkedin/github/youtube/spotify.svg`) → `links/images/` kini `instagram.svg` + `tiktok.svg` (baru)
- [x] JSON-LD: `Person` → **`Organization`** (konsisten halaman utama), name Adellhub, url `/links/`, `sameAs` = Instagram + TikTok — placeholder meta/komentar dihapus
- [ ] (Opsional, butuh konfirmasi) tambah tombol/link dari halaman utama `index.html` menuju `/links/` — **belum dikonfirmasi user**

**Hasil Phase L-6 (2026-09-19):**
- Konten final terpasang; build & preview: `/links/` 200, `<h1>Adellhub`, tagline, JSON-LD Organization, `sameAs` IG+TikTok, `mailto:` intact; TikTok + Instagram SVG ter-inline di bundle JS (`.data:image/svg+xml`); halaman utama 200; `npm audit` 0
- 3 kartu ter-render via `LINKS` (JS runtime) — **audit visual final oleh user di `/links/`**

**Revisi pasca-L-6 (umpan balik visual user, 2026-09-19):**
- Ikon kartu Instagram & TikTok tak lagi `<img>` brand berwarna (terlihat seperti "foto default" memenuhi tile 48×48) → diganti **glyph kanonik monokrom filled** (`fill="currentColor"`, charcoal 24px via CSS tile) — seragam dengan globe Situs Resmi di tile Bauhaus yang sama
- `links/images/` dihapus (folder kini kosong); seluruh ikon murni string inline (`svgIcon`)
- Verifikasi build/preview: bundle `links-BWatV58D.js` 5.51 kB, **tanpa `data:image/svg+xml`**, path glyph IG (`M12 0C8.74`) & TikTok (`M12.525.02`) ter-inline; halaman utama & legal 200

---

## Ringkasan Progress

| Phase | Nama | Status |
|-------|------|--------|
| Phase L-0 | Analisis, Audit & Persiapan | 🟢 Selesai |
| Phase L-1 | Design System Bauhaus & Struktur HTML | 🟢 Selesai |
| Phase L-2 | Komponen Profil & Link Cards | 🟢 Selesai |
| Phase L-3 | Interaksi & Animasi | 🟢 Selesai |
| Phase L-4 | Aksesibilitas, SEO & Responsiveness | 🟢 Selesai |
| Phase L-5 | Integrasi Vite & QA Build | 🟢 Selesai |
| Phase L-6 | Input Konten Final | 🟢 Selesai |

**Sisa setalah seluruh phase:** push user → deploy → verifikasi visual `/links/` (render 3 kartu, responsive 360–1280, reduced-motion, kontras) → (opsional) tombol `/links/` dari halaman utama.