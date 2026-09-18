# adellhub

Landing page satu halaman untuk Adellhub — ekosistem startup IT (Adellwork, Adelltech, Adellbooth). Dibangun dengan Vite + Vanilla JS, desain Bauhaus.

## ⚠️ Sebelum Launch — Checklist

Operasi manual ini **tidak bisa dilakukan oleh agent** dan wajib dicek sebelum deploy. Centang saat sudah selesai.

### 1. Cloudflare Email Routing
Form waitlist (`waitlist@adellhub.biz.id`) dan section kontak (`hello@adellhub.biz.id`) mengirim email ke **alamat yang belum aktif** sampai Email Routing diaktifkan di Cloudflare.

- [ ] Login ke [Cloudflare Dashboard](https://dash.cloudflare.com) → pilih domain `adellhub.biz.id`
- [ ] Buka **Email → Email Routing** → klik **Enable**
- [ ] Verifikasi alamat tujuan (email pribadi) lewat email konfirmasi
- [ ] Buat routing rule: `waitlist@` → email pribadi
- [ ] Buat routing rule: `hello@` → email pribadi

**Fallback:** ganti `WAITLIST_EMAIL` di `src/components/modal.js` dan `CONTACT_EMAIL` di `src/components/contact.js` ke alamat lain.

### 2. Buat Share Image (og-image.png)
Meta `og:image` / `twitter:image` menunjuk ke `https://adellhub.biz.id/og-image.png`. File ini belum ada — social media preview akan hilang tanpanya.

- [ ] Siapkan gambar 1200×630 px (PNG atau JPG, ≤ 8 MB)
- [ ] Simpan sebagai `og-image.png` di `public/`
- [ ] `npm run build` (Vite akan copy ke `dist/og-image.png`)

### 3. Verifikasi Browser & Tooling
Agent tidak punya Chrome — berikut wajib dicek di browser lokal.

- [ ] Jalankan `npm run dev`, buka di Chrome & Firefox
- [ ] Jalankan **Lighthouse** (Chrome DevTools → Lighthouse tab) — target: Performance ≥ 90, Accessibility ≥ 90
- [ ] Jalankan [W3C HTML Validator](https://validator.w3.org/) pada URL dev server
- [ ] Uji semua link: klien WhatsApp (`wa.me/6285179697112`), email (`mailto:hello@adellhub.biz.id`), Instagram (`@adellhub`)
- [ ] Uji form waitlist: input kosong, email salah, submit
- [ ] Uji modal tutup: klik backdrop, klik ✕, tekan Escape
- [ ] Uji keyboard navigation (Tab/Shift+Tab) di dalam modal — fokus tidak boleh keluar
- [ ] Uji `prefers-reduced-motion` di Chrome DevTools → Rendering → Emulate CSS media = `prefers-reduced-motion: reduce`

---

## Development

```bash
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview build
```