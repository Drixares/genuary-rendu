// La salle : une œuvre plein écran, son cartel, la navigation entre salles.
import { getEntry, dayToId, EXHIBITION } from '../data/exhibition.js';
import { SKETCHES } from '../sketches/index.js';
import { runSketch } from '../core/canvas.js';
import { randomSeed } from '../core/prng.js';
import { gotoDay, gotoHash } from '../router.js';

export function renderRoom(container, day) {
  const entry = getEntry(dayToId(day));
  const sketch = SKETCHES.get(entry.id);
  const dayStr = String(day).padStart(2, '0');

  let seed = entry.id;   // seed par défaut : l'identifiant de l'œuvre
  let running = { stop() {} };

  const section = document.createElement('section');
  section.className = 'room';
  section.innerHTML = `
    <div class="room-stage">
      <button class="room-nav room-nav--prev" aria-label="Salle précédente">←</button>
      <div class="room-art">
        <canvas aria-label="${entry.title} — œuvre générative, jour ${day}"></canvas>
      </div>
      <button class="room-nav room-nav--next" aria-label="Salle suivante">→</button>
    </div>
    <aside class="room-cartel" aria-label="Cartel de l'œuvre">
      <p class="cartel-day">Salle ${dayStr} / 31</p>
      <h1 class="cartel-title">${entry.title}</h1>
      <p class="cartel-prompt">« ${entry.prompt} »<span class="cartel-credit"> — prompt de ${entry.promptCredit}</span></p>
      <p class="cartel-note">${entry.note}</p>
      <p class="cartel-technique">${entry.technique}</p>
      <p class="cartel-seed">
        <span class="cartel-seed-label">seed :</span>
        <span class="cartel-seed-value"></span>
        <button class="cartel-reseed" aria-label="Régénérer l'œuvre avec un nouveau seed">Régénérer ◌</button>
      </p>
      <a class="cartel-back" href="#/">← Retour au plan</a>
    </aside>
  `;

  const canvas = section.querySelector('canvas');
  const seedValue = section.querySelector('.cartel-seed-value');

  const artSize = () => {
    const stage = section.querySelector('.room-art');
    const rect = stage.getBoundingClientRect();
    return Math.round(Math.min(rect.width, rect.height)) ||
      Math.round(Math.min(innerWidth * 0.6, innerHeight * 0.7));
  };

  const render = () => {
    running.stop();
    const size = artSize();
    running = runSketch(canvas, sketch, { seed, cssWidth: size, cssHeight: size });
    seedValue.textContent = seed;
  };

  section.querySelector('.cartel-reseed').addEventListener('click', () => {
    seed = randomSeed();
    render();
  });
  section.querySelector('.room-nav--prev').addEventListener('click', () =>
    gotoDay(day === 1 ? 31 : day - 1));
  section.querySelector('.room-nav--next').addEventListener('click', () =>
    gotoDay(day === 31 ? 1 : day + 1));

  const onKey = e => {
    if (e.key === 'ArrowLeft') gotoDay(day === 1 ? 31 : day - 1);
    else if (e.key === 'ArrowRight') gotoDay(day === 31 ? 1 : day + 1);
    else if (e.key === 'Escape') gotoHash('#/');
  };
  document.addEventListener('keydown', onKey);

  const onResize = () => render();
  addEventListener('resize', onResize);

  container.append(section);
  render();

  return {
    destroy() {
      running.stop();
      document.removeEventListener('keydown', onKey);
      removeEventListener('resize', onResize);
    },
  };
}
