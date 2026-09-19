# TASKS — Telegram Webhook Notifikasi Waitlist

**Versi Dokumen:** 1.5.0  
**Terakhir Diperbarui:** 2026-09-19  
**Status Keseluruhan:** 🟢 Phase T-4 Selesai (terverifikasi) — T-5 Batch Lokal Selesai; Deploy Produksi & E2E Production Pending  
**Branch:** `develop`

> **Instruksi untuk AI Agent:**
> - Tandai task dengan `[/]` saat mulai mengerjakan
> - Tandai task dengan `[x]` saat selesai dan terverifikasi
> - Update field "Terakhir Diperbarui" setiap kali ada perubahan
> - Jangan lewati phase — selesaikan satu phase sebelum pindah ke berikutnya
> - Setelah menyelesaikan seluruh phase, update `docs/CHANGELOG.md`
> - **PENTING:** Bot Token & Chat ID adalah **secret** — JANGAN di-commit ke repo; gunakan Cloudflare environment variables

---

## Latar Belakang

Saat ini, waitlist form di landing page Adellhub menggunakan `mailto:` untuk mengirim data pendaftaran ke `waitlist@adellhub.biz.id` via Cloudflare Email Routing. Pendekatan ini:

1. **Bergantung pada email client** — user harus punya mail app terkonfigurasi di device
2. **Tidak ada notifikasi real-time** — tim harus cek inbox email secara manual
3. **Tidak ada penyimpanan data terstruktur** — data tersebar di email threads

**Solusi:** Mengganti alur `mailto:` menjadi **Cloudflare Pages Functions** (serverless) yang:
- Menerima data form via `POST /api/waitlist`
- Mengirim notifikasi ke **grup Telegram** via Bot API
- Mengirim email konfirmasi ke tim via **Cloudflare Email Workers** (opsional, fase lanjutan)
- Menampilkan sukses/error yang informatif ke user

### Arsitektur Baru

```
┌──────────────┐    POST /api/waitlist    ┌──────────────────────┐
│  Frontend    │ ──────────────────────>  │  Cloudflare Pages    │
│  (modal.js)  │  { name, email,         │  Functions           │
│              │    service, meta }       │  (functions/api/     │
│              │ <──────────────────────  │   waitlist.js)       │
│  ← JSON resp │                         └──────────┬───────────┘
└──────────────┘                                    │
                                                    │ Telegram Bot API
                                                    │ POST sendMessage
                                                    ▼
                                          ┌──────────────────────┐
                                          │  Telegram Group      │
                                          │  (@adellhub_waitlist │
                                          │   atau grup tim)     │
                                          └──────────────────────┘
```

---

## Phase T-0 — Persiapan & Setup Bot Telegram

**Tujuan:** Menyiapkan Bot Telegram, mendapatkan credentials, dan mengonfigurasi environment.  
**Estimasi:** 30 Menit  
**Skill Terkait:** —

### Panduan Membuat Bot Telegram

1. Buka Telegram, cari **@BotFather**
2. Kirim `/newbot`
3. Ikuti instruksi:
   - Berikan **nama bot** (contoh: `Adellhub Waitlist Bot`)
   - Berikan **username bot** (contoh: `adellhub_waitlist_bot`) — harus unik & diakhiri `bot`
4. BotFather akan memberikan **Bot Token** (format: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)
5. **Simpan token ini** — akan digunakan sebagai environment variable

### Panduan Mendapatkan Chat ID & Thread ID Grup

1. Buat atau gunakan **grup Telegram** untuk menerima notifikasi
2. **Tambahkan bot** yang baru dibuat ke grup tersebut (invite via username)
3. Kirim pesan apapun di grup
4. Buka URL berikut di browser:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
5. Cari field `"chat": { "id": -100XXXXXXXXXX }` — angka negatif itu adalah **Chat ID grup**
6. Jika grup menggunakan **Topics** (forum/threads): cari `"message_thread_id"` di response — itu adalah ID topic/thread tujuan
7. **Simpan Chat ID dan Thread ID ini** — akan digunakan sebagai environment variables

> **Catatan Grup Topics:** Grup Telegram yang menggunakan fitur Topics bersifat seperti forum. Pesan harus dikirim dengan parameter `message_thread_id` agar masuk ke topic yang tepat, bukan ke "General" atau topic lain.

### Tasks

- [x] Buat bot Telegram via @BotFather — **selesai** (bot: Adellhub Waitlist Bot)
- [x] Dapatkan Bot Token — **selesai** (tersimpan aman sebagai env var, tidak di-commit ke repo)
- [x] Buat/siapkan grup Telegram untuk notifikasi — **selesai** (menggunakan grup dengan fitur Topics)
- [x] Tambahkan bot ke grup — **selesai**
- [x] Dapatkan Chat ID grup — **selesai** (`-1003957917701`)
- [x] Dapatkan Thread ID (karena grup menggunakan Topics) — **selesai** (`message_thread_id: 2`)
- [x] Set environment variables di Cloudflare Pages Dashboard — **selesai** (dikonfirmasi oleh user):
  - `TELEGRAM_BOT_TOKEN` → token dari BotFather (encrypted)
  - `TELEGRAM_CHAT_ID` → `-1003957917701`
  - `TELEGRAM_THREAD_ID` → `2`
- [x] Buat `.dev.vars` lokal dan masukkan ke `.gitignore` — **selesai**
- [x] Verifikasi bot bisa mengirim pesan ke topic yang benar via curl — **selesai** (dikonfirmasi oleh user)

> **Catatan:** Bot Token **tidak boleh ditulis di file manapun** — hanya di Cloudflare Dashboard sebagai encrypted env var dan di `.dev.vars` lokal (sudah ter-ignore oleh `.gitignore`).

---

## Phase T-1 — Cloudflare Pages Functions (Backend API)

**Tujuan:** Membuat serverless endpoint `POST /api/waitlist` yang menerima data form dan mengirim notifikasi Telegram ke topic/thread yang benar.  
**Estimasi:** 2 Jam  
**Skill Terkait:** `cloudflare-worker-builder` (opsional — install jika dibutuhkan: `npx skills add jezweb/claude-skills@cloudflare-worker-builder`), `telegram-bot-builder` (referensi: `npx skills add sickn33/agentic-awesome-skills@telegram-bot-builder`)

### Struktur File Baru

```
adellhub/
├── functions/              # Cloudflare Pages Functions (auto-detected)
│   └── api/
│       └── waitlist.js     # POST /api/waitlist endpoint
```

> **Catatan Cloudflare Pages Functions:** Folder `functions/` di root project secara otomatis dikenali oleh Cloudflare Pages sebagai serverless functions. File `functions/api/waitlist.js` akan menjadi endpoint `POST /api/waitlist` tanpa konfigurasi tambahan.

### Tasks

- [x] Buat folder `functions/api/` — **selesai**
- [x] Buat `functions/api/waitlist.js` dengan logika:
  - [x] Export `onRequestPost(context)` handler (konvensi Cloudflare Pages Functions)
  - [x] Parse body JSON dari request (`{ name, email, service, userAgent, timestamp }`)
  - [x] Validasi server-side:
    - `name`: wajib, non-empty, max 100 karakter
    - `email`: wajib, format email valid (regex)
    - `service`: opsional, default `"Adellhub"`
    - `timestamp`: opsional (frontend kirim), jika kosong gunakan format waktu WIB
    - `userAgent`: opsional (informasi browser/device)
  - [x] Baca env vars `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, dan `TELEGRAM_THREAD_ID` dari `context.env`
    - [x] Parsing `TELEGRAM_THREAD_ID` secara eksplisit ke integer: `parseInt(context.env.TELEGRAM_THREAD_ID, 10)`
  - [x] Sanitasi & Escape karakter HTML (`&`, `<`, `>`) pada `name`, `email`, `service` untuk Telegram HTML parse mode
  - [x] Format pesan notifikasi Telegram (HTML parse mode)
  - [x] Kirim pesan ke Telegram via `fetch()` — **wajib sertakan `message_thread_id` (numeric)** karena grup menggunakan Topics
  - [x] Handle response sukses: return JSON `{ success: true, message: "Pendaftaran waitlist berhasil dikirim!" }`
  - [x] Handle error Telegram API: jika status !== 200, return HTTP 502 `{ success: false, error: "..." }` agar frontend dapat menampilkan pesan error dan opsi fallback `mailto:` (mencegah data pendaftar hilang tanpa jejak)
  - [x] Handle error validasi: return JSON `{ success: false, error: "..." }` dengan HTTP 400
  - [x] Tambahkan CORS headers untuk `https://adellhub.biz.id` (dan dev origins `localhost:3000`, `localhost:5173`)
  - [x] Anti-spam ringan terintegrasi: honeypot & time-to-submit verification
- [x] Buat `functions/api/waitlist.js` handler untuk preflight `OPTIONS` request (`onRequestOptions`)
- [x] Verifikasi function dengan automated logic & syntax test (syntax valid, semua skenario lolos)

> **Catatan Environment Variables Lokal:** Untuk development, buat file `.dev.vars` di root (sudah ada di `.gitignore`):
> ```
> TELEGRAM_BOT_TOKEN=<token dari BotFather — isi manual, jangan commit>
> TELEGRAM_CHAT_ID=-1003957917701
> TELEGRAM_THREAD_ID=2
> ```



---

## Phase T-2 — Refactor Frontend: `mailto:` → `fetch()` API

**Tujuan:** Mengubah form waitlist dari `mailto:` ke `fetch()` ke endpoint `/api/waitlist`.  
**Estimasi:** 2 Jam  
**Skill Terkait:** `semantic-html-and-seo` (form accessibility), `find-animation-opportunities` (loading states)

### File yang Dimodifikasi

- [`src/components/modal.js`](file:///mnt/Data/github-repo/adellhub/src/components/modal.js) — refactor submit handler
- [`src/components/hero.js`](file:///mnt/Data/github-repo/adellhub/src/components/hero.js) — CTA "Bergabung Waitlist" (jika ada direct submit)
- [`src/style.css`](file:///mnt/Data/github-repo/adellhub/src/style.css) — loading spinner/state styles

### Tasks

- [x] Modifikasi `openWaitlistForm()` di `src/components/modal.js`:
  - [x] Ganti handler `form.submit` dari `mailto:` ke `fetch('/api/waitlist', { method: 'POST', ... })`
  - [x] Kirim data JSON: `{ name, email, service, userAgent, timestamp, formOpenedAt, website }`
  - [x] Tambahkan **loading state** saat menunggu response:
    - Disable tombol submit & input field
    - Ubah teks tombol jadi "Mengirim..." dengan spinner animasi ringan (Bauhaus rotating square)
    - Pertahankan animasi di `transform` saja (sesuai filosofi PRD & `find-animation-opportunities`)
    - Dukung `prefers-reduced-motion`
  - [x] Handle response sukses → tampilkan `showSuccess(name)`
  - [x] Handle response error → tampilkan pesan error di form (bukan alert) via `<div id="waitlist-global-error" class="form-global-error" role="alert">`
    - Pesan error informatif
    - Sertakan fallback link `mailto:` ke `waitlist@adellhub.biz.id` dengan subject & body terisi
  - [x] Handle network error (offline / timeout) → fallback graceful dengan mailto link
  - [x] Pertahankan validasi client-side yang sudah ada (name & email)
  - [x] Hapus referensi `mailto:` dari submit handler utama (tetap ada sebagai fallback link jika error)
- [x] Refactor `openModal()` CTA1 default handler — juga ganti `mailto:` ke buka waitlist form
- [x] Tambahkan CSS untuk loading spinner & global error di `src/style.css` (minimal, geometris Bauhaus)
- [x] Verifikasi build: `npm run build` sukses 100% tanpa error
- [x] Verifikasi aksesibilitas: `aria-busy="true"` saat loading, `role="alert"` pada global error, `tabindex="-1"` pada honeypot hidden input

---

## Phase T-3 — Security: CSP, CORS & Input Sanitization

**Tujuan:** Memastikan endpoint aman dan CSP headers mengizinkan koneksi ke API.  
**Estimasi:** 1 Jam  
**Skill Terkait:** `semantic-html-and-seo` (security best practices)

### File yang Dimodifikasi

- [`public/_headers`](file:///mnt/Data/github-repo/adellhub/public/_headers) — update CSP `connect-src`
- [`functions/api/waitlist.js`](file:///mnt/Data/github-repo/adellhub/functions/api/waitlist.js) — CORS & sanitization
- [`.gitignore`](file:///mnt/Data/github-repo/adellhub/.gitignore) — pastikan `.dev.vars` ter-ignore

### Tasks

- [x] Update `public/_headers` — perbarui `connect-src` mengizinkan `fetch()` ke origin sendiri dan domain produksi:
  ```
  connect-src 'self' https://adellhub.biz.id;
  ```
- [x] Implementasi CORS di `functions/api/waitlist.js`:
  - Allowed origins: `https://adellhub.biz.id` (production), `http://localhost:3000`, `http://localhost:5173`, dan preview `*.pages.dev`
  - Allowed methods: `POST, OPTIONS`
  - Allowed headers: `Content-Type`
  - Block request dari origin asing yang tidak dikenal → return 403 Forbidden
- [x] Input sanitization di server-side:
  - Strip HTML tags dari `name`, `email`, dan `service` via `stripHtmlTags()`
  - Escape karakter HTML di pesan Telegram (`&lt;`, `&gt;`, `&amp;`) untuk mode HTML Telegram Bot API
  - Validasi panjang field (name ≤ 100 chars, email ≤ 254 chars, service ≤ 100 chars)
  - Tolak request dengan body size > 10KB (return 413 Payload Too Large)
  - Tolak CRLF injection (`\r\n`) pada email (return 400)
- [x] Pastikan `.dev.vars` (berisi token Telegram) ada di `.gitignore` — **terverifikasi**
- [x] Verifikasi: request dari origin asing di-reject dengan 403 (terverifikasi via unit test)
- [x] Verifikasi: input HTML injection ter-strip dan ter-escape di pesan Telegram (terverifikasi via unit test)

---

## Phase T-4 — Rate Limiting & Anti-Spam

**Tujuan:** Mencegah abuse pada endpoint waitlist.  
**Estimasi:** 1 Jam  
**Skill Terkait:** —

### Tasks
 
- [x] Proteksi Anti-Bot & Anti-Spam (ringan & zero-dependency):
  - [x] **Honeypot field:** Tambahkan hidden field `<input name="website" tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true">` di form
  - [x] Jika honeypot terisi pada saat submit → tolak secara silent (return 200/sukses palsu tapi tidak kirim notifikasi Telegram)
  - [x] **Timestamp check:** Catat waktu saat modal form dibuka (`formOpenedAt`), tolak submit jika waktu pengisian < 2 detik (bot detection)
  - [x] **Input length & format limits:** Batasi payload maksimal 10KB, nama ≤ 100 karakter, email valid format
- [x] Rate limiting level Cloudflare KV/D1: ditunda (tidak diperlukan untuk MVP)
- [x] Verifikasi: form submit instan (<2 detik) ditolak sebagai bot — **terverifikasi** via `wrangler pages dev` + curl (POST dengan `formOpenedAt` = `Date.now()` → HTTP 200 silent, pesan "Pendaftaran berhasil diterima", tanpa memanggil Telegram)
- [x] Verifikasi: honeypot field tak terlihat oleh user namun menangkap bot submission — **terverifikasi** (POST dengan field `website` terisi → HTTP 200 silent; field di form memakai `sr-only` + `tabindex="-1"` + `autocomplete="off"` + `aria-hidden="true"`)

> **Catatan Verifikasi T-4 (2026-09-19):** Seluruh payload anti-spam sudah terimplementasi sejak Phase T-1/T-2; sesi ini memverifikasi perilakunya secara lokal dengan `wrangler pages dev dist` (`.dev.vars` terbaca otomatis). Daftar lengkap hasil test ada di CHANGELOG.

---

## Phase T-5 — Testing, Build & Deployment

**Tujuan:** Memverifikasi seluruh alur end-to-end dan deploy ke production.  
**Estimasi:** 2 Jam  
**Skill Terkait:** —

### Tasks

- [x] Test lokal dengan Wrangler — **selesai** (command aktual di bawah; `.dev.vars` dibaca otomatis, tidak perlu `--binding`):
  ```bash
  npm run build && npx wrangler pages dev dist --port 8788
  ```
  - [x] Test submit form → cek notifikasi masuk di Telegram grup — **terverifikasi**: POST valid → HTTP 200, Telegram Bot API `ok:true` (pesan "Uji E2E Lokal (Wrangler)" masuk ke topic grup)
  - [x] Test validasi error (nama kosong, email invalid) — **terverifikasi**: HTTP 400 masing-masing (termasuk nama >100 karakter, CRLF di email, content-type salah → 415, payload >10KB → 413, origin asing → 403)
  - [ ] Test network error (matikan internet, cek fallback) — ⏳ manual browser (matikan jaringan → cek fallback `mailto:` tampil di modal)
  - [ ] Test rate limiting (submit beruntun) — **N/A** (rate limiting KV/D1 memang ditunda; hanya anti-spam ringan aktif, submit instan <2 detik sudah ditolak)
  - [x] Test honeypot (isi field hidden, cek tidak terkirim) — **terverifikasi** via curl (HTTP 200 silent, tanpa panggilan Telegram)
- [x] `npm run build` → verifikasi output `dist/` utuh (halaman utama, legal, links tetap ada) — **terverifikasi** (index, privacy, terms, links + `_headers` & aset publik ter-copy)
- [x] Verifikasi `functions/api/waitlist.js` ter-include oleh Cloudflare Pages (folder `functions/` di root) — **terverifikasi** (route `POST /api/waitlist` aktif di `wrangler pages dev`)
- [ ] Deploy ke Cloudflare Pages:
  - [ ] Push ke branch `develop`
  - [ ] Set environment variables di Cloudflare Dashboard:
    - `TELEGRAM_BOT_TOKEN` (encrypted)
    - `TELEGRAM_CHAT_ID` = `-1003957917701` (encrypted)
    - `TELEGRAM_THREAD_ID` = `2` (encrypted)
  - [ ] Verifikasi deployment preview URL berfungsi
- [ ] Test end-to-end di production:
  - [ ] Buka `https://adellhub.biz.id`
  - [ ] Klik "Bergabung Waitlist" → isi form → submit
  - [ ] Verifikasi notifikasi Telegram masuk di grup dengan format yang benar
  - [ ] Verifikasi pesan sukses tampil di modal
  - [ ] Verifikasi di mobile (responsive, touch targets)
  - [ ] Verifikasi `prefers-reduced-motion` dihormati (loading spinner)
- [ ] Merge ke `main` setelah semua test pass
- [x] Update `docs/CHANGELOG.md` dengan entry versi baru

---

## Phase T-6 — Dokumentasi & Cleanup

**Tujuan:** Mendokumentasikan arsitektur baru dan membersihkan kode.  
**Estimasi:** 30 Menit  
**Skill Terkait:** —

### Tasks

- [ ] Update `.ai/PRD.md`:
  - Section 5 (Fitur): ubah "Modal Form Waitlist" dari `mailto:` ke `Cloudflare Pages Functions + Telegram webhook`
  - Section 9 (Batasan): hapus "Tidak ada backend" — ganti dengan catatan serverless functions
  - Tambahkan catatan: "Notifikasi waitlist otomatis ke grup Telegram via Bot API"
- [ ] Update `.ai/TECH-STACK.md`:
  - Section 1: tambahkan `Cloudflare Pages Functions` sebagai serverless layer
  - Section 5: tambahkan `wrangler` sebagai devDependency (jika di-install)
  - Section 5.1: tambahkan skill `cloudflare-worker-builder` dan `telegram-bot-builder` jika di-install
  - Section 6: update info endpoint API (`/api/waitlist`)
- [ ] Update `README.md`:
  - Tambahkan section "Environment Variables" untuk Telegram credentials
  - Tambahkan instruksi setup lokal dengan Wrangler
- [ ] Hapus referensi `mailto:` yang tidak terpakai lagi di kode (kecuali fallback text)
- [ ] Verifikasi tidak ada secret/token yang ter-commit ke repo

---

## Ringkasan Progress

| Phase | Nama | Status |
|-------|------|--------|
| Phase T-0 | Persiapan & Setup Bot Telegram | ✅ Selesai |
| Phase T-1 | Cloudflare Pages Functions (Backend) | ✅ Selesai |
| Phase T-2 | Refactor Frontend: mailto → fetch | ✅ Selesai |
| Phase T-3 | Security: CSP, CORS & Sanitization | ✅ Selesai |
| Phase T-4 | Rate Limiting & Anti-Spam | ✅ Selesai (terverifikasi lokal) |
| Phase T-5 | Testing, Build & Deployment | 🟡 Batch lokal selesai — deploy & E2E production pending |
| Phase T-6 | Dokumentasi & Cleanup | 🟡 Sedang dikerjakan |

---

## Catatan Teknis

### Skills yang Mungkin Perlu Di-install

| Skill | Install Command | Tujuan |
|-------|----------------|--------|
| `cloudflare-worker-builder` (1.4K installs) | `npx skills add jezweb/claude-skills@cloudflare-worker-builder` | Panduan arsitektur Cloudflare Workers/Pages Functions |
| `telegram-bot-builder` (3.5K installs) | `npx skills add sickn33/agentic-awesome-skills@telegram-bot-builder` | Referensi Telegram Bot API, format pesan, error handling |

### Dependensi Baru

| Package | Tipe | Tujuan |
|---------|------|--------|
| `wrangler` | devDependency (opsional) | CLI untuk testing Cloudflare Pages Functions lokal |

> **Catatan:** `wrangler` opsional — bisa dipakai via `npx wrangler` tanpa install. Jika ingin install: `npm install -D wrangler`

### Environment Variables (Secrets)

| Variable | Lokasi | Keterangan |
|----------|--------|------------|
| `TELEGRAM_BOT_TOKEN` | Cloudflare Dashboard → Pages → Settings → Environment Variables | Token dari @BotFather — **encrypted**, jangan commit ke repo |
| `TELEGRAM_CHAT_ID` | Cloudflare Dashboard → Pages → Settings → Environment Variables | `-1003957917701` — Chat ID grup Telegram |
| `TELEGRAM_THREAD_ID` | Cloudflare Dashboard → Pages → Settings → Environment Variables | `2` — ID topic/thread dalam grup (karena grup menggunakan fitur Topics) |

### Perubahan CSP yang Diperlukan

```diff
- connect-src 'self';
+ connect-src 'self' https://adellhub.biz.id;
```

> **Catatan:** `connect-src 'self'` seharusnya sudah cukup karena endpoint `/api/waitlist` ada di origin yang sama. Namun, explicit domain ditambahkan untuk kejelasan.

### Format Pesan Telegram

Pesan dikirim ke: `chat_id: -1003957917701`, `message_thread_id: 2`

```
🔔 Pendaftaran Waitlist Baru!

👤 Nama: John Doe
📧 Email: john@example.com
🏷️ Layanan: Adellwork by Adellhub
🕐 Waktu: 2026-09-19 16:00 WIB
📱 Device: Chrome 120 / Windows 10

#waitlist #adellhub
```
