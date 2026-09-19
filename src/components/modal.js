/**
 * Bauhaus Modal / Overlay Component
 * Accessible dialogs with Bauhaus geometric styling, backdrop, and keyboard ESC handling.
 * Includes: service "Coming Soon" overlay + waitlist registration form modal (fetch to /api/waitlist, with mailto fallback on error).
 */

export const WAITLIST_EMAIL = 'waitlist@adellhub.biz.id';

let activeModal = null;
let activeKeyHandler = null;
let lastFocusedElement = null;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

const ALLOWED_EXTERNAL_SCHEMES = /^(https?:|mailto:)/;
const DEFAULT_CTA2_URL = 'https://instagram.com/adellhub';

const safeExternalUrl = (url) => {
  const candidate = String(url || '').trim();
  return ALLOWED_EXTERNAL_SCHEMES.test(candidate) ? escapeHtml(candidate) : escapeHtml(DEFAULT_CTA2_URL);
};

const closeIcon = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
    <line x1="4" y1="4" x2="16" y2="16" />
    <line x1="16" y1="4" x2="4" y2="16" />
  </svg>
`;

// Shared modal mounting: append, lock scroll, animate in, manage focus (trap + restore).
function attachModal(modalBackdrop) {
  document.body.appendChild(modalBackdrop);
  document.body.style.overflow = 'hidden';
  activeModal = modalBackdrop;
  lastFocusedElement = document.activeElement;

  const dialog = modalBackdrop.querySelector('.modal-dialog');
  if (dialog && !dialog.hasAttribute('tabindex')) {
    dialog.setAttribute('tabindex', '-1');
  }

  requestAnimationFrame(() => {
    modalBackdrop.classList.add('modal-active');
    if (dialog && typeof dialog.focus === 'function') {
      dialog.focus({ preventScroll: true });
    }
  });

  const keyHandler = (e) => {
    // Close on Escape
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Keep focus inside the dialog (WCAG 2.4.3 Focus Order)
    if (e.key === 'Tab') {
      const focusables = Array.from(
        modalBackdrop.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', keyHandler, true);
  activeKeyHandler = keyHandler;
}

export function openModal({ title, subtitle, message, cta1Text, cta1Action, cta2Text, cta2Url }) {
  // If modal already open, remove it first
  if (activeModal) {
    closeModal();
  }

  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';
  modalBackdrop.setAttribute('role', 'presentation');

  modalBackdrop.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      
      <!-- Top Decorative Bar & Close Button -->
      <div class="modal-header">
        <div class="modal-eyebrow-group">
          <span class="badge badge-accent">COMING SOON</span>
          <span class="modal-service-tag">${escapeHtml(subtitle || 'Layanan Adellhub')}</span>
        </div>
        <button type="button" class="modal-close-btn" aria-label="Tutup dialog">
          ${closeIcon}
        </button>
      </div>

      <!-- Modal Body Content -->
      <div class="modal-body">
        <h3 id="modal-title" class="modal-title">${escapeHtml(title)}</h3>
        <p class="modal-message">${escapeHtml(message || 'Layanan ini masih dalam progress pengerjaan. Terima kasih atas antusiasme Anda!')}</p>
        
        <!-- Decorative Bauhaus Accent -->
        <div class="modal-accent-line" aria-hidden="true">
          <span class="geo-shape geo-circle geo-fill-dark" style="width: 12px; height: 12px;"></span>
          <span class="geo-shape geo-square geo-fill-accent" style="width: 12px;"></span>
          <span style="flex: 1; height: 2px; background: var(--color-dark);"></span>
        </div>
      </div>

      <!-- Modal Action CTAs -->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary modal-btn-cta1">
          ${escapeHtml(cta1Text || 'Gabung Waitlist via Email')}
        </button>
        <a href="${safeExternalUrl(cta2Url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline modal-btn-cta2">
          ${escapeHtml(cta2Text || '@adellhub via Sosial Media')}
        </a>
      </div>

    </div>
  `;

  // Event handlers
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside dialog
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // CTA1 click handler
  const cta1Btn = modalBackdrop.querySelector('.modal-btn-cta1');
  if (cta1Btn && cta1Action) {
    cta1Btn.addEventListener('click', () => {
      cta1Action();
    });
  } else if (cta1Btn) {
    cta1Btn.addEventListener('click', () => {
      openWaitlistForm({ service: title || 'Adellhub' });
    });
  }

  attachModal(modalBackdrop);
}

export function openWaitlistForm({ service = 'Adellhub' } = {}) {
  // If modal already open, remove it first
  if (activeModal) {
    closeModal();
  }

  const formOpenedAt = Date.now();
  const safeService = escapeHtml(service);
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop waitlist-backdrop';
  modalBackdrop.setAttribute('role', 'presentation');

  modalBackdrop.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
      
      <div class="modal-header">
        <div class="modal-eyebrow-group">
          <span class="badge badge-accent">WAITLIST</span>
          <span class="modal-service-tag">${safeService}</span>
        </div>
        <button type="button" class="modal-close-btn" aria-label="Tutup dialog">
          ${closeIcon}
        </button>
      </div>

      <div class="modal-body">
        <h3 id="waitlist-title" class="modal-title">Mendapat Akses Awal</h3>
        <p class="modal-message">
          Daftarkan data Anda untuk mendapatkan akses awal ${safeService} saat resmi diluncurkan.
        </p>

        <form id="waitlist-form" class="waitlist-form" novalidate>
          <!-- Anti-bot honeypot field (hidden from assistive tech and visual users) -->
          <div class="sr-only" aria-hidden="true" style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;">
            <label for="waitlist-website">Website</label>
            <input type="text" id="waitlist-website" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <div class="form-field">
            <label class="form-label" for="waitlist-name">Nama <span class="form-required" aria-hidden="true">*</span></label>
            <input class="form-input" type="text" id="waitlist-name" name="name" autocomplete="name" placeholder="Nama lengkap Anda" required />
            <span class="form-error" data-error-for="waitlist-name" aria-live="polite"></span>
          </div>

          <div class="form-field">
            <label class="form-label" for="waitlist-email">Email <span class="form-required" aria-hidden="true">*</span></label>
            <input class="form-input" type="email" id="waitlist-email" name="email" autocomplete="email" placeholder="nama@email.com" required />
            <span class="form-error" data-error-for="waitlist-email" aria-live="polite"></span>
          </div>

          <!-- Global Form Error Alert with Email Fallback -->
          <div id="waitlist-global-error" class="form-global-error" role="alert" aria-live="assertive"></div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="submit" form="waitlist-form" id="waitlist-submit-btn" class="btn btn-primary modal-btn-cta1">
          <span class="btn-text">Gabung Waitlist</span>
        </button>
      </div>

    </div>
  `;

  // Event handlers
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Form elements
  const form = modalBackdrop.querySelector('#waitlist-form');
  const nameInput = modalBackdrop.querySelector('#waitlist-name');
  const emailInput = modalBackdrop.querySelector('#waitlist-email');
  const honeypotInput = modalBackdrop.querySelector('#waitlist-website');
  const submitBtn = modalBackdrop.querySelector('#waitlist-submit-btn');
  const globalErrorEl = modalBackdrop.querySelector('#waitlist-global-error');

  const setError = (input, message) => {
    const errorEl = modalBackdrop.querySelector(`[data-error-for="${input.id}"]`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.classList.add('form-error-visible');
    } else {
      input.removeAttribute('aria-invalid');
      errorEl.textContent = '';
      errorEl.classList.remove('form-error-visible');
    }
  };

  const validate = () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let valid = true;

    if (!name) {
      setError(nameInput, 'Nama wajib diisi.');
      valid = false;
    } else {
      setError(nameInput, '');
    }

    if (!email) {
      setError(emailInput, 'Email wajib diisi.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(emailInput, 'Format email tidak valid. Contoh: nama@email.com');
      valid = false;
    } else {
      setError(emailInput, '');
    }

    return valid;
  };

  const showSuccess = (name) => {
    const dialog = modalBackdrop.querySelector('.modal-dialog');
    dialog.innerHTML = `
      <div class="modal-header">
        <div class="modal-eyebrow-group">
          <span class="badge badge-accent">TERDAFTAR</span>
          <span class="modal-service-tag">${safeService}</span>
        </div>
        <button type="button" class="modal-close-btn" aria-label="Tutup dialog">
          ${closeIcon}
        </button>
      </div>

      <div class="modal-body">
        <div class="waitlist-success" role="status" aria-live="polite">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="26" fill="var(--color-dark)" />
            <path d="M18 29 L25 36 L39 22" stroke="var(--color-accent)" stroke-width="4" stroke-linecap="square" />
          </svg>
          <h3 id="waitlist-success-title" class="modal-title">Terima kasih, ${escapeHtml(name)}!</h3>
          <p class="modal-message">
            Permintaan akses awal ${safeService} telah kami terima. Notifikasi pendaftaran telah diteruskan ke tim Adellhub dan kami akan segera mengabari Anda melalui email.
          </p>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary modal-btn-cta1 waitlist-done-btn">Selesai</button>
      </div>
    `;

    dialog.setAttribute('aria-labelledby', 'waitlist-success-title');

    const newCloseBtn = dialog.querySelector('.modal-close-btn');
    newCloseBtn.addEventListener('click', closeModal);
    const doneBtn = dialog.querySelector('.waitlist-done-btn');
    doneBtn.addEventListener('click', closeModal);
    doneBtn.focus({ preventScroll: true });
  };

  const showFormError = (errorMessage, nameVal, emailVal) => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-loading');
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = '<span class="btn-text">Coba Kirim Ulang</span>';
    }
    nameInput.disabled = false;
    emailInput.disabled = false;

    if (globalErrorEl) {
      const fallbackSubject = encodeURIComponent(`Daftar Waitlist ${service} — Adellhub`);
      const fallbackBody = encodeURIComponent(
        `Halo tim Adellhub,\n\nSaya tertarik untuk bergabung dengan waitlist ${service}.\n\nNama: ${nameVal}\nEmail: ${emailVal}\n\nTerima kasih.`
      );
      const mailtoUrl = `mailto:${WAITLIST_EMAIL}?subject=${fallbackSubject}&body=${fallbackBody}`;

      globalErrorEl.innerHTML = `
        <p><strong>Pendaftaran belum terkirim:</strong> ${escapeHtml(errorMessage)}</p>
        <p>Silakan coba kembali atau kirim data Anda langsung via email:</p>
        <a href="${mailtoUrl}" class="fallback-mail-link">
          Kirim via Email (${escapeHtml(WAITLIST_EMAIL)}) &rarr;
        </a>
      `;
      globalErrorEl.classList.add('form-error-visible');
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset pesan error global sebelumnya
    if (globalErrorEl) {
      globalErrorEl.classList.remove('form-error-visible');
      globalErrorEl.innerHTML = '';
    }

    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const website = honeypotInput ? honeypotInput.value : '';

    // Aktifkan loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span><span class="btn-text">Mengirim...</span>';
    }
    nameInput.disabled = true;
    emailInput.disabled = true;

    const payload = {
      name,
      email,
      service,
      userAgent: navigator.userAgent || '',
      timestamp: new Date().toISOString(),
      formOpenedAt,
      website,
    };

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        showSuccess(name);
      } else {
        const errMsg = (data && data.error) || 'Terjadi kesalahan pada server saat memproses data.';
        showFormError(errMsg, name, email);
      }
    } catch (err) {
      console.error('Waitlist submission failed:', err);
      showFormError('Koneksi terputus atau server tidak dapat dijangkau.', name, email);
    }
  });

  attachModal(modalBackdrop);
}

export function closeModal() {
  if (!activeModal) return;

  const current = activeModal;
  const previousFocus = lastFocusedElement;
  current.classList.remove('modal-active');
  document.body.style.overflow = '';
  lastFocusedElement = null;

  if (activeKeyHandler) {
    document.removeEventListener('keydown', activeKeyHandler, true);
    activeKeyHandler = null;
  }

  setTimeout(() => {
    if (current && current.parentNode) {
      current.remove();
    }
    if (activeModal === current) {
      activeModal = null;
    }
    // Restore focus to the element that opened the modal (WCAG 2.4.3)
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus({ preventScroll: true });
    }
  }, 300);
}