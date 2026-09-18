/**
 * Bauhaus Modal / Overlay Component
 * Accessible dialog with Bauhaus geometric styling, backdrop, and keyboard ESC handling.
 */

let activeModal = null;

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
          <span class="modal-service-tag">${subtitle || 'Layanan Adellhub'}</span>
        </div>
        <button type="button" class="modal-close-btn" aria-label="Tutup dialog">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
      </div>

      <!-- Modal Body Content -->
      <div class="modal-body">
        <h3 id="modal-title" class="modal-title">${title}</h3>
        <p class="modal-message">${message || 'Layanan ini masih dalam progress pengerjaan. Terima kasih atas antusiasme Anda!'}</p>
        
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
          ${cta1Text || 'Gabung Waitlist via Email'}
        </button>
        <a href="${cta2Url || 'https://instagram.com/adellhub'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline modal-btn-cta2">
          ${cta2Text || '@adellhub via Sosial Media'}
        </a>
      </div>

    </div>
  `;

  document.body.appendChild(modalBackdrop);
  document.body.style.overflow = 'hidden';
  activeModal = modalBackdrop;

  // Animate in
  requestAnimationFrame(() => {
    modalBackdrop.classList.add('modal-active');
  });

  // Event handlers
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside dialog
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Handle ESC key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  // CTA1 click handler
  const cta1Btn = modalBackdrop.querySelector('.modal-btn-cta1');
  if (cta1Btn && cta1Action) {
    cta1Btn.addEventListener('click', () => {
      cta1Action();
    });
  } else if (cta1Btn) {
    cta1Btn.addEventListener('click', () => {
      window.location.href = `mailto:waitlist@adellhub.com?subject=Daftar%20Waitlist%20${encodeURIComponent(title)}&body=Halo%20tim%20Adellhub,%0A%0ASaya%20tertarik%20untuk%20bergabung%20dengan%20waitlist%20layanan%20${encodeURIComponent(title)}.%20Mohon%20berikan%20informasi%20ketika%20layanan%20ini%20telah%20tersedia.%0A%0ATerima%20kasih.`;
    });
  }
}

export function closeModal() {
  if (!activeModal) return;

  const current = activeModal;
  current.classList.remove('modal-active');
  document.body.style.overflow = '';

  setTimeout(() => {
    if (current && current.parentNode) {
      current.remove();
    }
    if (activeModal === current) {
      activeModal = null;
    }
  }, 300);
}
