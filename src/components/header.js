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
          <img src="/header-logo.svg" alt="Adellhub Logo" class="logo-icon" width="64" height="64" aria-hidden="true">
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

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentY = window.scrollY;
    header.classList.toggle('header-scrolled', currentY > 50);

    // Hide header on scroll down (all viewports), reveal on scroll up
    if (!header.classList.contains('mobile-menu-open')) {
      if (currentY > lastScrollY && currentY > 120) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }
    lastScrollY = currentY;
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
      header.classList.remove('header-hidden');
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Close mobile nav when link is clicked
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        header.classList.remove('mobile-menu-open');
        header.classList.remove('header-hidden');
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
