/**
 * Bauhaus Contact & Footer Component
 * Channel kontak (Email, WhatsApp, Instagram) dalam kartu geometris + footer bar copyright.
 */

export const CONTACT_EMAIL = 'hello@adellhub.biz.id';
export const CONTACT_WHATSAPP = 'https://wa.me/6285179697112';
export const CONTACT_INSTAGRAM = 'https://instagram.com/adellhub';

const mailIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" />
    <path d="M2 6 L12 13 L22 6" />
  </svg>
`;

const whatsappIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" />
    <path d="M11 16 L8 20 L13 16" />
  </svg>
`;

const instagramIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
`;

export function initContact() {
  const contactSection = document.createElement('section');
  contactSection.id = 'contact';
  contactSection.className = 'contact-section section-spacing';

  contactSection.innerHTML = `
    <div class="container">

      <!-- Section Header -->
      <div class="section-header">
        <div class="section-header-top">
          <span class="text-label text-muted">03. HUBUNGI KAMI</span>
          <div class="section-header-line" aria-hidden="true"></div>
        </div>
        <h2 class="section-title text-h2">MARI TERHUBUNG</h2>
        <p class="section-lead text-lead">
          Untuk update terbaru, ikuti perjalanan kami di sosial media.
        </p>
      </div>

      <!-- Contact Channel Cards -->
      <div class="contact-grid">
        <a href="mailto:${CONTACT_EMAIL}" class="contact-card" aria-label="Hubungi kami via Email">
          <span class="contact-icon">${mailIcon}</span>
          <span class="contact-label">Email</span>
          <span class="contact-value">${CONTACT_EMAIL}</span>
        </a>

        <a href="${CONTACT_WHATSAPP}" target="_blank" rel="noopener noreferrer" class="contact-card" aria-label="Hubungi kami via WhatsApp">
          <span class="contact-icon">${whatsappIcon}</span>
          <span class="contact-label">WhatsApp</span>
          <span class="contact-value">+62 851-7969-7112</span>
        </a>

        <a href="${CONTACT_INSTAGRAM}" target="_blank" rel="noopener noreferrer" class="contact-card" aria-label="Kunjungi profil Instagram Adellhub">
          <span class="contact-icon">${instagramIcon}</span>
          <span class="contact-label">Instagram</span>
          <span class="contact-value">@adellhub</span>
        </a>
      </div>

    </div>
  `;

  return contactSection;
}

export function initFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="container footer-inner">
      <span class="footer-brand">
        <svg class="logo-icon" width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="16" r="10" fill="#F5F0E8" />
          <rect x="12" y="4" width="12" height="12" fill="#E63329" />
        </svg>
        <span class="footer-logo-text">ADELLHUB</span>
      </span>
      <p class="footer-copyright">© 2026 Adellhub. All rights reserved.</p>
    </div>
  `;

  return footer;
}