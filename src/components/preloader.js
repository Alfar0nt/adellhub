/**
 * Bauhaus Geometric Pre-loader Component
 * Adheres to Bauhaus principles: form follows function, pure geometry, restrained motion.
 */

export function initPreloader(durationMs = 1800) {
  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveDuration = prefersReducedMotion ? 400 : durationMs;

  const preloaderEl = document.createElement('div');
  preloaderEl.id = 'preloader';
  preloaderEl.setAttribute('role', 'status');
  preloaderEl.setAttribute('aria-label', 'Memuat Adellhub');

  preloaderEl.innerHTML = `
    <div class="preloader-content">
      <div class="preloader-geo-canvas">
        <svg class="preloader-svg" viewBox="0 0 120 120" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Background decorative circle outline -->
          <circle cx="60" cy="60" r="54" stroke="var(--color-dark)" stroke-width="2" stroke-dasharray="4 4" class="preloader-orbit" />
          
          <!-- Bauhaus Black Half Circle -->
          <path d="M 60 20 A 40 40 0 0 1 60 100 Z" fill="var(--color-dark)" class="preloader-semicircle" />
          
          <!-- Bauhaus Red Square Accent -->
          <rect x="25" y="45" width="30" height="30" fill="var(--color-accent)" class="preloader-square" />

          <!-- Center Pivot Circle -->
          <circle cx="60" cy="60" r="8" fill="var(--color-white)" stroke="var(--color-dark)" stroke-width="2" />
        </svg>
      </div>

      <div class="preloader-brand">
        <span class="preloader-title">ADELLHUB</span>
        <span class="preloader-subtitle">STARTUP IT ECOSYSTEM</span>
      </div>

      <!-- Geometric Progress Bar -->
      <div class="preloader-progress-track">
        <div class="preloader-progress-bar" style="animation-duration: ${effectiveDuration}ms;"></div>
      </div>
    </div>
  `;

  document.body.prepend(preloaderEl);

  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';

  const dismiss = () => {
    preloaderEl.classList.add('preloader-fade-out');
    document.body.style.overflow = '';

    window.dispatchEvent(new CustomEvent('adellhub:preloader-done'));

    setTimeout(() => {
      if (preloaderEl && preloaderEl.parentNode) {
        preloaderEl.remove();
      }
    }, 500);
  };

  // Auto-dismiss after duration
  setTimeout(dismiss, effectiveDuration);
}
