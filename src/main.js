import './style.css';

// Phase 1: Design System & Foundation Verification
const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    <main class="container section-spacing" style="display: flex; flex-direction: column; gap: var(--space-12);">
      
      <!-- Header / Title -->
      <section style="border-bottom: var(--border-width-thick) solid var(--color-dark); padding-bottom: var(--space-8);">
        <span class="badge badge-accent">Phase 1 Foundation</span>
        <h1 class="text-h1" style="margin-top: var(--space-4);">ADELLHUB</h1>
        <p class="text-lead" style="margin-top: var(--space-4);">
          Sistem Desain Bauhaus UI: Presisi geometris, tipografi tegas Space Grotesk & Inter, palet off-white, arang, dan merah aksen.
        </p>
      </section>

      <!-- Typography Scale -->
      <section style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">01. Skala Tipografi</span>
        <div class="bauhaus-card" style="display: flex; flex-direction: column; gap: var(--space-6);">
          <div>
            <span class="text-label text-muted">Heading 1</span>
            <div class="text-h1">EKOSISTEM IT MASA DEPAN</div>
          </div>
          <hr class="divider" />
          <div>
            <span class="text-label text-muted">Heading 2</span>
            <div class="text-h2">Layanan Terpadu Adellhub</div>
          </div>
          <hr class="divider" />
          <div>
            <span class="text-label text-muted">Heading 3</span>
            <div class="text-h3">Adellwork · Adelltech · Adellbooth</div>
          </div>
          <hr class="divider" />
          <div>
            <span class="text-label text-muted">Body Text</span>
            <p class="text-body">
              Adellhub adalah payung startup teknologi modern yang menaungi tiga solusi digital inovatif. Dibangun dengan prinsip "form follows function" untuk kejelasan navigasi dan efisiensi maksimal.
            </p>
          </div>
        </div>
      </section>

      <!-- Bauhaus Geometric Shapes & Patterns -->
      <section style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">02. Bentuk Geometris & Pola Bauhaus</span>
        <div class="grid grid-cols-3 gap-6">
          
          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-circle geo-fill-dark" style="width: 80px; height: 80px;"></div>
            <span class="text-label">Lingkaran Hitam</span>
          </div>

          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-circle geo-fill-accent" style="width: 80px; height: 80px;"></div>
            <span class="text-label">Lingkaran Aksen Merah</span>
          </div>

          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-semicircle-top geo-fill-dark" style="width: 100px; height: 50px;"></div>
            <span class="text-label">Setengah Lingkaran</span>
          </div>

          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-square geo-border-dark" style="width: 70px;"></div>
            <span class="text-label">Kotak Garis Arang</span>
          </div>

          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-pattern-lines" style="width: 100px; height: 70px; border: var(--border-width) solid var(--color-dark);"></div>
            <span class="text-label">Garis Arsitektural</span>
          </div>

          <div class="bauhaus-card flex flex-col items-center justify-center gap-4" style="min-height: 220px;">
            <div class="geo-shape geo-pattern-dots" style="width: 100px; height: 70px; border: var(--border-width) solid var(--color-dark);"></div>
            <span class="text-label">Grid Titik Geometris</span>
          </div>

        </div>
      </section>

      <!-- UI Primitives & Interactive States -->
      <section style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="text-label text-muted">03. Tombol & Komponen Interaktif</span>
        <div class="bauhaus-card flex flex-wrap items-center gap-4">
          <button type="button" class="btn btn-primary" id="btn-demo-primary">Tombol Primary</button>
          <button type="button" class="btn btn-accent" id="btn-demo-accent">Tombol Accent</button>
          <button type="button" class="btn btn-outline" id="btn-demo-outline">Tombol Outline</button>
          <span class="badge badge-dark">Badge Dark</span>
          <span class="badge badge-accent">Badge Accent</span>
          <span class="badge">Badge Default</span>
        </div>
      </section>

    </main>
  `;
}
