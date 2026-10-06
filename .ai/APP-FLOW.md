# APP-FLOW — Alur Aplikasi Adellhub

**Versi Dokumen:** 1.1.0  
**Tanggal:** 2026-10-06  
**Status:** Aktif  
**Author:** Adellhub Team

> Dokumen ini mendeskripsikan alur aplikasi dari sudut pandang **pengguna (User Flow)** dan **pengembang (Dev Flow)**. Mencakup seluruh halaman dalam ekosistem `adellhub.biz.id`.

---

## 1. Peta Halaman (Sitemap)

```
adellhub.biz.id/
├── /                          → Landing Page Utama (SPA)
│   ├── #hero                  → Hero Section
│   ├── #services              → Section Layanan (Adellroute, Adellwork, Adelltech, Adellbooth, More to Come)
│   ├── #portfolio             → Section Portofolio (4 kartu geometris)
│   └── #contact               → Section Kontak & Footer
│
├── /links/                    → Link-in-Bio (halaman terpisah)
├── /adellroute/               → Webpage Stub Teaser Adellroute (halaman terpisah)
│
├── /privacy-policy.html       → Kebijakan Privasi (halaman statis)
├── /terms-of-service.html     → Syarat & Ketentuan (halaman statis)
│
└── /api/waitlist              → Serverless Endpoint (POST only)
                                  ↳ Cloudflare Pages Functions
```

---

## 2. Alur Pengguna (User Flow)

### 2.1 Landing Page Utama (`/`)

#### 2.1.1 First Visit Flow

```
Pengguna buka adellhub.biz.id
        │
        ▼
[Pre-loader Geometris]
  - Animasi bentuk Bauhaus (1.5–3 detik)
  - Fade-out ke konten utama
        │
        ▼
[Header Sticky muncul]
  - Logo ADELLHUB
  - Navigasi: Layanan · Portofolio · Hubungi Kami
        │
        ▼
[Hero Section]
  - Heading: "ADELLHUB: EKOSISTEM IT MASA DEPAN."
  - Sub-heading tagline
  - Dua CTA:
    ├── [Bergabung Waitlist] ──────────────────────→ Buka Modal Waitlist Form
    └── [Eksplorasi Layanan] ─────────────────────→ Smooth scroll ke #services
        │
        ▼
[Section Layanan — #services]
        │
        ▼
[Section Portofolio — #portfolio]
        │
        ▼
[Section Kontak & Footer — #contact]
```

#### 2.1.2 Alur Navigasi Header

```
[Klik nav link di Header]
        │
        ├── "Layanan"      → Smooth scroll ke #services
        ├── "Portofolio"   → Smooth scroll ke #portfolio
        └── "Hubungi Kami" → Smooth scroll ke #contact
```

#### 2.1.3 Alur Service Overlay (Coming Soon)

```
[Section Layanan]
        │
        ├── Klik "Selengkapnya" pada Adellroute (#1 Featured)
        │       └── Buka modal detail Adellroute → [Gabung Waitlist Early Access]
        ├── Klik "Selengkapnya" pada Adellwork (#2)
        │       └── Buka modal "Coming Soon" → [Gabung Waitlist via Email]
        ├── Klik "Selengkapnya" pada Adelltech (#3)
        │       └── Buka modal "Coming Soon" → [Gabung Waitlist via Email]
        ├── Klik "Selengkapnya" pada Adellbooth (#4)
        │       └── Buka modal "Coming Soon" → [Gabung Waitlist via Email]
        └── Klik "Usulkan Ide / Layanan" pada More to Come (#5)
                └── Buka modal waitlist dengan konteks usulan layanan baru
```

#### 2.1.4 Alur Waitlist Form

```
[Modal Waitlist Form terbuka]
        │
        ▼
[User mengisi form]
  - Field: Nama (wajib)
  - Field: Email (wajib, validasi format)
  - Hidden: Layanan yang diminati (dari konteks)
  - Hidden (honeypot): website (tidak terlihat user)
        │
        ├── [Klik Submit]
        │       │
        │       ├── Validasi Client-side gagal
        │       │       └── Tampilkan pesan error di bawah field
        │       │
        │       └── Validasi lolos
        │               │
        │               ▼
        │       [Loading State]
        │         - Tombol berubah jadi "Mengirim..."
        │         - Input dinonaktifkan
        │         - Spinner Bauhaus muncul
        │               │
        │       [POST /api/waitlist]
        │               │
        │       ┌───────┴──────────────┐
        │       ▼                      ▼
        │   [Sukses]               [Gagal/Error]
        │   Tampilkan pesan        Tampilkan error message
        │   "Terima kasih!"        + link fallback mailto:
        │
        └── [X / Klik backdrop / Tekan ESC] → Tutup modal
```

#### 2.1.5 Alur Kontak & Footer

```
[Section Kontak]
        │
        ├── Klik Email (mailto:hello@adellhub.biz.id)
        │       └── Buka email client user
        │
        ├── Klik WhatsApp (+62 851-7969-7112)
        │       └── Buka wa.me/6285179697112 di tab baru
        │
        ├── Klik Instagram (@adellhub)
        │       └── Buka instagram.com/adellhub di tab baru
        │
        └── [Footer]
                ├── Klik "Kebijakan Privasi" → Buka /privacy-policy.html di tab baru
                └── Klik "Syarat & Ketentuan" → Buka /terms-of-service.html di tab baru
```

---

### 2.2 Link-in-Bio (`/links/`)

#### 2.2.1 Alur Halaman Link-in-Bio

```
Pengguna buka adellhub.biz.id/links/
        │
        ▼
[Halaman Link-in-Bio dimuat]
  - Header: Wordmark ADELLHUB
  - Latar: Dekorasi geometris Bauhaus statis
  - Profil: Logo + nama "Adellhub" + tagline
        │
        ▼
[Daftar Kartu Link (render via JS)]
  - Kartu 1: Situs Resmi → https://adellhub.biz.id
  - Kartu 2: Instagram   → https://instagram.com/adellhub
  - Kartu 3: TikTok      → https://tiktok.com/@adellhub
        │
        ├── Klik kartu link apapun
        │       └── Buka URL di tab baru (rel="noopener noreferrer")
        │
        └── Footer: Copyright © Adellhub
```

---

### 2.3 Halaman Legal

#### 2.3.1 Kebijakan Privasi & Syarat Ketentuan

```
Pengguna klik link di footer landing page
        │
        ▼
[Halaman legal dibuka di tab baru]
  - Header: Logo Adellhub
  - Konten: Teks legal (satu kolom, mudah dibaca)
  - Footer: Back link ke halaman utama
        │
        ▼
[Pengguna selesai membaca]
  - Tutup tab → kembali ke landing page
```

---

## 3. Alur Backend / Serverless (Dev Flow)

### 3.1 Alur Submit Waitlist (`POST /api/waitlist`)

```
[Frontend: modal.js]
  form.submit → fetch('/api/waitlist', { method: 'POST', body: JSON })
        │
        │  Payload:
        │  {
        │    name: "...",
        │    email: "...",
        │    service: "Adellwork by Adellhub",
        │    userAgent: navigator.userAgent,
        │    timestamp: "2026-10-06T01:00:00.000Z",
        │    formOpenedAt: 1728169200000,
        │    website: ""  // honeypot — harus kosong
        │  }
        │
        ▼
[Cloudflare Pages Functions: functions/api/waitlist.js]

1. CORS Check
   ├── Origin ada di allowlist? → lanjut
   └── Origin asing → 403 Forbidden

2. Method Check
   ├── OPTIONS → 204 (preflight)
   ├── POST → lanjut
   └── Other → 405 Method Not Allowed

3. Content-Type Check
   ├── application/json → lanjut
   └── Lainnya → 415 Unsupported Media Type

4. Payload Size Check
   ├── ≤ 10KB → lanjut
   └── > 10KB → 413 Payload Too Large

5. Anti-Spam: Honeypot Check
   ├── Field `website` kosong → lanjut
   └── Field `website` terisi → 200 Silent (palsu, tidak kirim Telegram)

6. Anti-Spam: Timestamp Check
   ├── formOpenedAt tidak ada → lanjut
   ├── Waktu pengisian ≥ 2 detik → lanjut
   └── Waktu pengisian < 2 detik → 200 Silent

7. Input Validation
   ├── name: wajib, non-empty, ≤ 100 karakter
   ├── email: wajib, format valid (regex), ≤ 254 karakter, no CRLF
   └── Gagal → 400 Bad Request

8. Input Sanitization
   └── stripHtmlTags() + escapeHtml() → nama/email/service bersih

9. Kirim ke Telegram Bot API
   └── fetch('https://api.telegram.org/bot{TOKEN}/sendMessage', {
         chat_id: TELEGRAM_CHAT_ID,
         message_thread_id: TELEGRAM_THREAD_ID (int),
         text: pesan terformat HTML,
         parse_mode: "HTML"
       })
        │
        ├── Telegram OK (200) → return { success: true } → HTTP 200
        └── Telegram Error   → return { success: false } → HTTP 502
```

---

## 4. Alur Build & Deployment (Dev Flow)

### 4.1 Development Lokal

```
Clone repo
    │
    ▼
npm install
    │
    ├── [Mode Vite dev — frontend only]
    │   npm run dev
    │   → http://localhost:3000
    │   (hot reload, tanpa Functions endpoint)
    │
    └── [Mode Wrangler dev — frontend + serverless]
        npm run dev:pages
        → npm run build → wrangler pages dev dist
        → http://localhost:8788
        (membaca .dev.vars, Functions endpoint aktif)
```

### 4.2 Production Build

```
npm run build
    │
    ▼
Vite memproses:
  ├── index.html            → dist/index.html
  ├── privacy-policy.html   → dist/privacy-policy.html
  ├── terms-of-service.html → dist/terms-of-service.html
  ├── links/index.html      → dist/links/index.html
  ├── adellroute/index.html → dist/adellroute/index.html
  ├── src/main.js           → dist/assets/main-[hash].js
  ├── src/style.css         → dist/assets/style-[hash].css
  ├── links/script.js       → dist/assets/links-[hash].js
  ├── links/styles.css      → dist/assets/links-[hash].css
  ├── adellroute/script.js  → dist/assets/adellroute-[hash].js
  ├── adellroute/styles.css → dist/assets/adellroute-[hash].css
  └── public/*              → dist/* (copy langsung)
        _headers, favicon.svg, og-image.png, legal.css, header-logo.svg

npm run preview
  → http://localhost:4173 (preview build lokal)
```

### 4.3 Deploy ke Cloudflare Pages

```
[Via Git Integration — Recommended]
    │
    ▼
Push ke branch `main`
    │
    ▼
Cloudflare Pages auto-build:
  npm run build → output dist/
    │
    ▼
Deploy ke CDN Cloudflare (edge network)
    │
    ▼
URL: https://adellhub.biz.id ✅ Live
     https://adellhub.biz.id/links/ ✅ Live
     https://adellhub.biz.id/privacy-policy.html ✅ Live
     https://adellhub.biz.id/terms-of-service.html ✅ Live
```

---

## 5. State Khusus & Edge Cases

| Skenario | Penanganan |
|----------|------------|
| Form submit tanpa koneksi internet | Error di-catch, tampilkan fallback `mailto:` link |
| Telegram API down | HTTP 502 dikembalikan, user lihat error + fallback mailto |
| Form diisi sangat cepat (< 2 detik) | Silent success, tidak kirim Telegram (bot detection) |
| Honeypot field terisi (bot) | Silent success, tidak kirim Telegram |
| User punya `prefers-reduced-motion` | Animasi dikurangi/dihilangkan via CSS media query & JS guard |
| Perangkat touch (no hover) | Hover states tidak aktif — dikontrol `@media (hover: hover)` |
| Mobile portrait narrow (360px) | Layout stack vertikal, padding dikecilkan |
| Tab/keyboard navigation | Focus ring terlihat jelas (`--color-accent`, 2px offset 3px) |
| Modal dibuka & ESC ditekan | Modal/overlay ditutup, focus kembali ke trigger button |

---

## 6. Riwayat Perubahan

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0.0 | 2026-10-06 | Dokumen awal — alur lengkap Landing Page, Link-in-Bio, Legal, Backend, Build & Deploy |
| 1.1.0 | 2026-10-06 | Tambah alur layanan Adellroute & More to Come; sitemap dan build flow multi-page `/adellroute/` |
