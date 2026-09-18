/**
 * Bauhaus Header Component
 * Sticky navigation, Bauhaus wordmark with geometric SVG accent, smooth scroll, mobile menu.
 */

import { openWaitlistForm } from './modal.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initHeader() {
  const header = document.createElement('header');
  header.id = 'site-header';
  header.className = 'site-header';

  header.innerHTML = `
    <div class="container">
      <div class="header-inner">
        
        <!-- Logo Wordmark with Bauhaus Geometric SVG -->
        <a href="#" class="header-logo" aria-label="Adellhub Beranda">
          <svg class="logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="16" r="10" fill="var(--color-dark)" />
            <rect x="12" y="4" width="12" height="12" fill="var(--color-accent)" />
          </svg>
          <span class="logo-text">ADELLHUB</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="header-nav" aria-label="Navigasi Utama">
          <ul class="nav-list">
            <li><a href="#services" class="nav-link">Layanan</a></li>
            <li><a href="#portfolio" class="nav-link">Portofolio</a></li>
            <li><a href="#contact" class="nav-link">Hubungi Kami</a></li>
          </ul>
        </nav>

        <!-- Right Action CTA -->
        <div class="header-actions">
          <button type="button" class="btn btn-primary header-cta" data-waitlist-cta>Gabung Waitlist</button>
          
          <!-- Mobile Menu Toggle Button -->
          <button type="button" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Buka navigasi">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>

      </div>

      <!-- Mobile Navigation Drawer -->
      <nav id="mobile-nav" class="mobile-nav" aria-hidden="true" aria-label="Navigasi Mobile">
        <ul class="mobile-nav-list">
          <li><a href="#services" class="mobile-nav-link">Layanan</a></li>
          <li><a href="#portfolio" class="mobile-nav-link">Portofolio</a></li>
          <li><a href="#contact" class="mobile-nav-link">Hubungi Kami</a></li>
          <li class="mobile-nav-cta-item">
            <button type="button" class="btn btn-accent w-full mobile-nav-cta" data-waitlist-cta>Gabung Waitlist</button>
          </li>
        </ul>
      </nav>
    </div>
  `;

  // Attach Sticky scroll behavior
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu interaction
  const toggleBtn = header.querySelector('.mobile-menu-toggle');
  const mobileNav = header.querySelector('#mobile-nav');

  if (toggleBtn && mobileNav) {
    const toggleMenu = () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileNav.setAttribute('aria-hidden', String(isExpanded));
      header.classList.toggle('mobile-menu-open', !isExpanded);
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Close mobile nav when link is clicked
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        header.classList.remove('mobile-menu-open');
      });
    });
  }

  // Waitlist CTA buttons open the waitlist form modal
  header.querySelectorAll('[data-waitlist-cta]').forEach((btn) => {
    btn.addEventListener('click', () => openWaitlistForm());
  });

  // Smooth scroll handler for all hash anchors
  header.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      }
    });
  });

  return header;
}
