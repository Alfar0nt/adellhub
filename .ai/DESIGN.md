# DESIGN — Adellhub Design System & Brand Guide

**Versi Dokumen:** 1.1.0  
**Tanggal:** 2026-10-06  
**Status:** Aktif — berlaku untuk seluruh proyek dalam ekosistem Adellhub  
**Author:** Adellhub Team  
**Skills yang Direferensikan:** `frontend-design`, `find-animation-opportunities`, `svg-icon-generator`

> **Catatan:** Dokumen ini adalah **sumber tunggal kebenaran (single source of truth)** untuk panduan desain dan visual brand Adellhub. Dokumen ini berlaku lintas proyek — dapat digunakan untuk landing page utama, link-in-bio, kampanye, maupun produk Adellhub lainnya (Adellwork, Adelltech, Adellbooth).

---

## 1. Filosofi Desain

Desain Adellhub diinspirasi oleh gerakan seni **Bauhaus** — estetika fungsional, geometris, dan minimalis yang mengedepankan kejelasan atas dekorasi. Prinsip utama:

1. **Bentuk mengikuti fungsi** — Setiap elemen visual ada karena alasan fungsional.
2. **Ketegasan geometris** — Lingkaran, setengah lingkaran, kotak, dan garis sejajar sebagai kosakata visual utama.
3. **Palet terbatas** — Maksimal tiga warna dominan (putih krem, arang, merah aksen) tanpa gradien berlebihan.
4. **Tipografi tebal dan berani** — Heading besar, uppercase, berbobot tinggi.
5. **Restraint dalam animasi** — Satu momen bold, sisanya tenang (Chanel principle).

**Referensi Visual:** `image.png` di root repo — Website MOCA Museum bergaya Bauhaus UI.

---

## 2. Palet Warna

### 2.1 Token Warna Utama

| Token CSS | Nilai Hex | Keterangan |
|-----------|-----------|------------|
| `--color-bg` | `#F5F0E8` | Off-white / krem — latar belakang utama |
| `--color-dark` | `#1A1A1A` | Hitam arang — teks utama, shape gelap, border |
| `--color-accent` | `#D2251C` | Merah Bauhaus — aksen, CTA, highlight geometris |
| `--color-white` | `#FFFFFF` | Putih murni — latar kartu, teks di atas dark/accent |
| `--color-gray` | `#757575` | Abu-abu — teks sekunder, placeholder, caption |
| `--color-adellroute` | `#1E40AF` | Cobalt Blue Bauhaus — aksen khusus layanan Adellroute (AI token router) |
| `--color-adellroute-dark` | `#172554` | Deep Cobalt — border penegas & elemen kontras Adellroute |
| `--color-adellroute-subtle` | `rgba(30, 64, 175, 0.08)` | Biru kobalt transparan — latar hover & subtle badge |

### 2.2 Aksesibilitas & Kontras (WCAG AA)

| Kombinasi | Rasio Kontras | Status |
|-----------|---------------|--------|
| `--color-accent` (#D2251C) di `--color-white` | 5.22:1 | ✅ AA (teks normal & besar) |
| `--color-accent` (#D2251C) di `--color-bg` | 4.60:1 | ✅ AA (teks normal) |
| `--color-dark` (#1A1A1A) di `--color-bg` | ~16:1 | ✅ AAA |
| `--color-gray` (#757575) di `--color-white` | 4.60:1 | ✅ AA |
| `--color-white` di `--color-dark` | ~16:1 | ✅ AAA |

> ⚠️ **Anti-pattern:** Jangan gunakan `#E63329` (terlalu terang, gagal AA di beberapa kombinasi). Selalu gunakan `#D2251C` untuk teks/ikon aksen.

### 2.3 Panduan Penggunaan Warna

- **Latar halaman:** `--color-bg` (#F5F0E8)
- **Teks utama:** `--color-dark` (#1A1A1A)
- **Aksen & CTA:** `--color-accent` (#D2251C) — gunakan hemat, hanya pada elemen yang perlu perhatian
- **Border & hard shadow:** `--color-dark` (#1A1A1A) — tebal 2px, no softening
- **Kartu/komponen:** `--color-white` (#FFFFFF) dengan border charcoal 2px
- **Tidak ada gradien:** Dilarang menggunakan gradien linear/radial kecuali kebutuhan khusus yang disetujui

---

## 3. Tipografi

### 3.1 Font Family

| Peran | Font | Sumber | CSS Variable |
|-------|------|--------|--------------|
| Display / Heading | **Space Grotesk** | Google Fonts | `--font-display` |
| Body / Deskripsi | **Inter** | Google Fonts | `--font-body` |

**Fallback Stack:**
```css
--font-display: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

**Import Google Fonts (preconnect pattern):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### 3.2 Skala Tipografi

| Elemen | Ukuran | Weight | Case | Catatan |
|--------|--------|--------|------|---------|
| Heading 1 (Hero) | 72–96px (`clamp`) | 800 | UPPERCASE | Satu per halaman |
| Heading 2 (Section) | 40–56px (`clamp`) | 700 | UPPERCASE | Label section |
| Heading 3 (Card) | 20–24px | 700 | Title Case | Judul kartu/komponen |
| Body | 16–18px | 400 | Sentence case | Paragraf & deskripsi |
| Label / Nav | 12–14px | 500 | UPPERCASE | Letter-spacing lebar (`0.08em`–`0.12em`) |
| Caption | 12px | 400 | Sentence case | Alt text visual, metadata |

**Line length:** Maksimal **80 karakter per baris** untuk body text (dari skill `frontend-design`).

### 3.3 Anti-pattern Tipografi

> ⚠️ **Hindari hal-hal berikut:**
> - Aksen satu kata saja di headline dengan warna/italic berbeda
> - ALL CAPS untuk semua teks body (hanya untuk heading utama, label nav, sesuai konteks Bauhaus)
> - Numbered markers (01/02/03) kecuali konten benar-benar berurutan secara logis
> - Font size di bawah 12px untuk teks yang dibaca
> - Lebih dari 2 font family dalam satu halaman

---

## 4. Grafis Bauhaus

### 4.1 Kosakata Bentuk

Adellhub menggunakan **bentuk geometris murni** sebagai elemen dekoratif dan struktural:

| Bentuk | Penggunaan |
|--------|------------|
| Lingkaran penuh | Elemen floating, aksen dekoratif |
| Setengah lingkaran | Aksen geometris, pembatas visual |
| Kotak / persegi | Framing, kartu, grid |
| Grid titik (`dot grid`) | Latar tekstur dekoratif |
| Garis sejajar / hatching diagonal | Tekstur, pembatas seksi |

### 4.2 Aturan Grafis

- **Warna shape:** Hanya merah (`#D2251C`) dan hitam/arang (`#1A1A1A`) — tidak ada warna lain untuk shape dekoratif
- **Tidak ada shadow berlebihan:** Gunakan **hard shadow** (offset langsung, tanpa blur) jika perlu bayangan — `box-shadow: 4px 4px 0 #1A1A1A`
- **Tidak ada gradien:** Shape flat tanpa efek gradien
- **Implementasi:** Via **SVG inline** atau **CSS shapes** — tidak menggunakan emoji sebagai icon
- **Icon wajib SVG:** Semua icon harus SVG (inline atau file `.svg`) — bukan emoji, bukan font icon library (dari skill `svg-icon-generator`)

### 4.3 Penggunaan SVG

```html
<!-- Contoh: Icon outline dengan stroke -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="2" y="2" width="20" height="20" stroke="currentColor" stroke-width="2"/>
</svg>

<!-- Contoh: Shape dekoratif Bauhaus -->
<svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
  <circle cx="60" cy="60" r="60" fill="#D2251C"/>
</svg>
```

---

## 5. Layout & Grid

### 5.1 Spacing System

Semua spacing menggunakan kelipatan **8px**:

```css
--spacing-unit: 8px;

/* Referensi cepat */
/* 4px  = 0.5 unit  (margin kecil, padding icon) */
/* 8px  = 1 unit    (gap elemen dalam komponen) */
/* 16px = 2 unit    (padding internal card) */
/* 24px = 3 unit    (gap antar komponen) */
/* 32px = 4 unit    (margin section kecil) */
/* 48px = 6 unit    (section padding vertikal mobile) */
/* 64px = 8 unit    (section padding vertikal desktop) */
/* 96px = 12 unit   (antar section besar) */
```

### 5.2 Breakpoint

| Breakpoint | Nilai | Perangkat |
|------------|-------|-----------|
| Mobile S | 360px | Ponsel kecil |
| Mobile M | 480px | Ponsel standar |
| Tablet | 768px | Tablet portrait |
| Desktop S | 1024px | Laptop kecil |
| Desktop M | 1280px | Laptop standar |
| Desktop L | 1440px | Monitor lebar |

### 5.3 Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(16px, 5vw, 80px);
}
```

### 5.4 Grid System

- **Landing page sections:** 2-kolom desktop (hero: konten kiri + grafis kanan), 1-kolom mobile
- **Service cards:** 3-kolom desktop → 2-kolom tablet → 1-kolom mobile
- **Portfolio grid:** 3-kolom desktop → 2-kolom tablet → 1-kolom mobile
- **Link-in-bio:** Single column, max-width ~680px, centered

---

## 6. Komponen UI

### 6.1 Tombol (Button)

**Primary Button (Solid):**
```css
.btn-primary {
  background: var(--color-dark);
  color: var(--color-white);
  border: 2px solid var(--color-dark);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base);
}

@media (hover: hover) {
  .btn-primary:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
  }
}
```

**Outline Button (Secondary):**
```css
.btn-outline {
  background: transparent;
  color: var(--color-dark);
  border: 2px solid var(--color-dark);
  /* ... sama dengan primary, ganti background */
}
```

### 6.2 Kartu (Card)

```css
.card {
  background: var(--color-white);
  border: 2px solid var(--color-dark);
  padding: 24px;
  /* Hard shadow Bauhaus */
  box-shadow: 4px 4px 0 var(--color-dark);
}
```

### 6.3 Varian Kartu Khusus

1. **Highlight Card (`.service-card-highlight` — Adellroute):**
   - Menggunakan border tebal 3px Cobalt Blue (`#1E40AF`)
   - Hard shadow tebal 6px Cobalt Blue: `box-shadow: 6px 6px 0 var(--color-adellroute)`
   - Badge status: `.badge-route` berlatar belakang Cobalt Blue dengan teks putih
   - Digunakan untuk menandai layanan yang sedang aktif dikerjakan (**Currently Working**)

2. **Dashed Card (`.service-card-upcoming` — More to Come):**
   - Border garis putus-putus: `border: 2px dashed var(--color-border)`
   - Latar belakang lembut transparan
   - Ikon geometris tanda tambah `+` (simbol ekspansi masa depan)
   - Tombol outline untuk mengundang saran ide layanan dari komunitas/pengguna

### 6.3 Hard Shadow

Hard shadow adalah elemen khas desain Bauhaus — gunakan konsisten di seluruh kartu dan CTA yang elevated:

```css
/* Standar */
box-shadow: 4px 4px 0 var(--color-dark);

/* Hover state (lebih besar) */
@media (hover: hover) {
  .card:hover {
    box-shadow: 6px 6px 0 var(--color-dark);
    transform: translate(-2px, -2px);
  }
}
```

---

## 7. Animasi & Micro-interaction

### 7.1 Filosofi (dari skill `find-animation-opportunities`)

> **Prinsip utama: Restraint.** Kadang animasi terbaik adalah tidak ada animasi.

**Satu momen bold, sisanya tenang — Chanel principle.**

### 7.2 Durasi Standar

| Elemen | Durasi | Easing | Catatan |
|--------|--------|--------|---------|
| Press feedback (button click) | 100–160ms | ease-out | `scale(0.97)`, subtle |
| Hover state (link, card) | 200–300ms | ease | Perubahan warna/shadow |
| Tooltip / popover | 125–200ms | ease | — |
| Modal / overlay (masuk) | 200–300ms | cubic-bezier(0.4, 0, 0.2, 1) | Fade + slide |
| Modal / overlay (keluar) | 150–200ms | ease-in | Lebih cepat dari masuk |
| Pre-loader | Bebas lebih lama | — | Momen pertama, delight budget |
| Scroll-triggered entrance | 400–600ms | ease | `opacity` + `translateY(20px)` |

**Token CSS Transition:**
```css
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-fast: 0.15s ease-out;
```

### 7.3 Aturan Animasi

1. **Hanya animate `transform` dan `opacity`** — properti ini berjalan di GPU tanpa layout reflow (performa optimal)
2. **Wajib support `prefers-reduced-motion`:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **Hover states wajib di-gate dengan `@media (hover: hover)`** — menghindari stuck hover di touchscreen:
   ```css
   @media (hover: hover) and (pointer: fine) {
     .element:hover { /* ... */ }
   }
   ```
4. **Jangan blokir interaksi:** Animasi tidak boleh menghalangi klik atau navigasi

---

## 8. Aksesibilitas (Accessibility)

### 8.1 Touch Targets

- Touch target minimum: **44×44px** (`@media (pointer: coarse)`)
- Tombol dan link navigasi di mobile wajib memenuhi target ini

### 8.2 Fokus State

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

### 8.3 Warna & Kontras

- Semua teks harus memenuhi **WCAG AA minimum** (4.5:1 untuk teks normal, 3:1 untuk teks besar/ikon)
- Lihat tabel kontras di Section 2.2

### 8.4 Icon & Gambar

- Icon dekoratif: `aria-hidden="true"`
- Icon informatif: tambahkan `aria-label` atau teks visible
- Gambar: `alt` deskriptif atau `alt=""` untuk dekoratif murni

---

## 9. Design Tokens (CSS Custom Properties)

Implementasi lengkap semua token desain:

```css
:root {
  /* === Colors === */
  --color-bg:      #F5F0E8;   /* Off-white / krem */
  --color-dark:    #1A1A1A;   /* Hitam arang */
  --color-accent:  #D2251C;   /* Merah Bauhaus (WCAG AA compliant) */
  --color-white:   #FFFFFF;
  --color-gray:    #757575;   /* Teks sekunder (WCAG AA compliant) */
  --color-adellroute: #1E40AF; /* Cobalt Blue Bauhaus */
  --color-adellroute-dark: #172554;
  --color-adellroute-subtle: rgba(30, 64, 175, 0.08);

  /* === Typography === */
  --font-display: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

  /* === Spacing === */
  --spacing-unit: 8px;

  /* === Transitions === */
  --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 0.15s ease-out;

  /* === Animation Durations === */
  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   500ms;

  /* === Shadows === */
  --shadow-hard:  4px 4px 0 var(--color-dark);
  --shadow-hard-lg: 6px 6px 0 var(--color-dark);
}
```

---

## 10. Panduan Per Proyek Adellhub

### 10.1 Landing Page Utama (`adellhub.biz.id`)

- Style file: `src/style.css`
- Ikuti token di atas sepenuhnya
- Lihat detail di [PRD.md](./PRD.md) untuk arsitektur halaman

### 10.2 Link-in-Bio (`adellhub.biz.id/links/`)

- Style file: `links/styles.css`
- Gunakan token yang **sama persis** — tidak ada divergensi palet/font
- Layout: single column, max-width ~680px
- Lihat [IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md) Section Links untuk riwayat implementasi

### 10.3 Halaman Legal (Privacy Policy, Terms of Service)

- Style file: `public/legal.css` (shared)
- Ikuti tipografi dan warna yang sama, layout dokumen sederhana (1-kolom, readable)

### 10.4 Webpage Stub Adellroute (`adellhub.biz.id/adellroute/`)

- Style file: `adellroute/styles.css`
- Menerapkan triad warna primer Bauhaus dengan dominasi Cobalt Blue `#1E40AF`
- Layout teaser minimalis, hero section, grid model AI (4 kartu), arsitektur (3 kartu), dan form waitlist terintegrasi

### 10.5 Proyek Baru dalam Ekosistem Adellhub

Saat membuat proyek baru (kampanye landing page, sub-produk, dll):
1. Copy token dari Section 9 ke file CSS utama proyek
2. Import Google Fonts yang sama (Space Grotesk + Inter)
3. Ikuti panduan tipografi Section 3
4. Ikuti panduan warna Section 2
5. Ikuti panduan animasi Section 7

---

## 11. Riwayat Perubahan

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0.0 | 2026-10-06 | Dokumen awal — dipindahkan dari PRD.md v1.4.0 Section 6 (Estetika & Desain). Ditambah: Layout System, Komponen UI, panduan per proyek |
| 1.1.0 | 2026-10-06 | Tambah token warna Cobalt Blue (`#1E40AF`), varian kartu khusus (Highlight Card Adellroute & Dashed Card More to Come), panduan styling webpage stub Adellroute |
