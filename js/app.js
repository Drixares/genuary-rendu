// Point d'entrée : bootstrap du musée, montage des vues selon la route.
import { CONFIG } from './data/config.js';
import { startRouter } from './router.js';
import { renderFloorplan } from './ui/floorplan.js';

const view = document.getElementById('view');
let current = { destroy() {} };

function mount(render) {
  current.destroy();
  view.innerHTML = '';
  current = render(view) ?? { destroy() {} };
  view.focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: 'instant' });
}

function highlightNav(route) {
  const key = route.view === 'plan' ? 'plan' : route.view === 'page' ? route.page : null;
  document.querySelectorAll('.museum-nav a').forEach(a =>
    a.classList.toggle('is-active', a.dataset.route === key));
}

document.getElementById('footer-name').textContent = CONFIG.name;
const gh = document.getElementById('footer-github');
gh.href = CONFIG.githubUrl;

startRouter(route => {
  highlightNav(route);
  // Les vues salle et pages sont branchées par les tasks suivantes
  mount(container => renderFloorplan(container));
});
