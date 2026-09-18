import './style.css';
import { initPreloader } from './components/preloader.js';
import { initHeader } from './components/header.js';
import { initHero } from './components/hero.js';
import { initServices } from './components/services.js';
import { initPortfolio } from './components/portfolio.js';
import { initContact, initFooter } from './components/contact.js';

// Initialize Preloader (1.8s duration)
initPreloader(1800);

const app = document.querySelector('#app');

if (app) {
  // Clear container
  app.innerHTML = '';

  // Initialize and mount Header
  const header = initHeader();
  app.appendChild(header);

  // Main container
  const main = document.createElement('main');
  main.id = 'main-content';

  // 1. Mount Hero Section (Phase 3)
  const hero = initHero();
  main.appendChild(hero);

  // 2. Mount Services Section (Phase 4)
  const services = initServices();
  main.appendChild(services);

  // 3. Mount Portfolio Section (Phase 6)
  const portfolio = initPortfolio();
  main.appendChild(portfolio);

  // 4. Mount Contact Section (Phase 7)
  const contact = initContact();
  main.appendChild(contact);

  app.appendChild(main);

  // 5. Mount Footer (Phase 7)
  const footer = initFooter();
  app.appendChild(footer);
}
