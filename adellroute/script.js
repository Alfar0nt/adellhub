/**
 * Adellroute Teaser Waitlist Script
 * Handles direct registration to POST /api/waitlist with anti-spam and loading states.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('route-waitlist-form');
  if (!form) return;

  const nameInput = document.getElementById('route-name');
  const emailInput = document.getElementById('route-email');
  const honeypotInput = document.getElementById('route-website');
  const submitBtn = document.getElementById('route-submit-btn');
  const submitText = document.getElementById('route-submit-text');
  const globalErrorEl = document.getElementById('route-form-alert');
  const successCard = document.getElementById('route-success-card');
  const successName = document.getElementById('route-success-name');

  const formOpenedAt = Date.now();

  const setError = (input, message) => {
    const errorEl = document.querySelector(`[data-error-for="${input.id}"]`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('form-error-visible');
      }
    } else {
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('form-error-visible');
      }
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
      setError(emailInput, 'Format email tidak valid. Contoh: dev@example.com');
      valid = false;
    } else {
      setError(emailInput, '');
    }

    return valid;
  };

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) setError(nameInput, '');
  });

  emailInput.addEventListener('input', () => {
    const val = emailInput.value.trim();
    if (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError(emailInput, '');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const honeypot = honeypotInput ? honeypotInput.value.trim() : '';

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    submitBtn.setAttribute('aria-busy', 'true');
    if (submitText) submitText.textContent = 'Mendaftarkan...';
    if (globalErrorEl) globalErrorEl.style.display = 'none';

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          service: 'Adellroute by Adellhub',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          formOpenedAt,
          website: honeypot,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        // Success state
        form.style.display = 'none';
        if (successName) successName.textContent = name;
        if (successCard) successCard.style.display = 'block';
      } else {
        const errorMsg = result.error || 'Terjadi kesalahan sistem saat mendaftar.';
        showError(errorMsg, name, email);
      }
    } catch {
      showError(
        'Koneksi internet bermasalah. Anda dapat mendaftar langsung via email cadangan kami.',
        name,
        email
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-loading');
      submitBtn.removeAttribute('aria-busy');
      if (submitText) submitText.textContent = 'Daftar Waitlist Early Access';
    }
  });

  function showError(msg, name, email) {
    if (!globalErrorEl) return;
    const mailtoUrl = `mailto:waitlist@adellhub.biz.id?subject=${encodeURIComponent(
      'Pendaftaran Early Access Adellroute'
    )}&body=${encodeURIComponent(`Halo Adellhub,\n\nSaya ingin bergabung dalam Early Access Adellroute.\n\nNama: ${name}\nEmail: ${email}`)}`;

    globalErrorEl.innerHTML = `
      ${msg} Silakan <a href="${mailtoUrl}">klik di sini untuk mendaftar via email langsung</a>.
    `;
    globalErrorEl.style.display = 'block';
  }
});
