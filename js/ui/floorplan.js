// Le plan de la collection : mosaïque paresseuse des 31 œuvres.
// Rendu statique à l'entrée dans le viewport ; les œuvres animées
// s'animent au survol.
import { EXHIBITION } from '../data/exhibition.js';
import { SKETCHES } from '../sketches/index.js';
import { CONFIG } from '../data/config.js';
import { runSketch, prefersReducedMotion } from '../core/canvas.js';

export function renderFloorplan(container) {
  const cleanups = [];

  const section = document.createElement('section');
  section.className = 'floorplan';
  section.innerHTML = `
    <header class="floorplan-header">
      <h1 class="floorplan-title">Le plan de la collection</h1>
      <p class="floorplan-sub">31 œuvres génératives · janvier 2025 · entrez dans une salle</p>
    </header>
    <div class="floorplan-grid"></div>
  `;
  const grid = section.querySelector('.floorplan-grid');

  const thumbSize = canvas => Math.round(canvas.parentElement.clientWidth) || 190;

  // Rendu paresseux : on ne dessine une vignette qu'à son entrée dans le viewport
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const canvas = entry.target;
      const id = canvas.dataset.id;
      const size = thumbSize(canvas);
      runSketch(canvas, SKETCHES.get(id), {
        seed: id, cssWidth: size, cssHeight: size, animate: false, at: 6.5,
      });
      observer.unobserve(canvas);
    }
  }, { rootMargin: '160px' });
  cleanups.push(() => observer.disconnect());

  for (const e of EXHIBITION) {
    const sketch = SKETCHES.get(e.id);
    const day = String(e.day).padStart(2, '0');
    const isFavorite = e.id === CONFIG.favoriteId;

    const tile = document.createElement('a');
    tile.className = 'tile';
    tile.href = `#/jour/${day}`;
    tile.setAttribute('aria-label', `Salle ${day} — ${e.title}`);

    const frame = document.createElement('div');
    frame.className = 'tile-frame';
    const canvas = document.createElement('canvas');
    canvas.dataset.id = e.id;
    frame.append(canvas);

    const caption = document.createElement('span');
    caption.className = 'tile-caption';
    caption.innerHTML = `<span class="tile-day">${day}</span> ${e.title}` +
      (sketch.animated ? ' <span class="tile-anim" title="Œuvre animée">◉</span>' : '') +
      (isFavorite ? ' <span class="tile-fav" title="Œuvre favorite de l’artiste">●</span>' : '');

    tile.append(frame, caption);
    grid.append(tile);
    observer.observe(canvas);

    // Survol : les œuvres animées prennent vie
    if (sketch.animated && !prefersReducedMotion()) {
      let running = null;
      tile.addEventListener('mouseenter', () => {
        const size = thumbSize(canvas);
        running?.stop();
        running = runSketch(canvas, sketch, { seed: e.id, cssWidth: size, cssHeight: size });
      });
      tile.addEventListener('mouseleave', () => {
        running?.stop();
        running = null;
        const size = thumbSize(canvas);
        runSketch(canvas, sketch, { seed: e.id, cssWidth: size, cssHeight: size, animate: false, at: 6.5 });
      });
      cleanups.push(() => running?.stop());
    }
  }

  container.append(section);
  return { destroy: () => cleanups.forEach(f => f()) };
}
