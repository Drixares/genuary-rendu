// Point d'entrée : bootstrap du musée, montage des vues selon la route.
import { CONFIG } from './data/config.js';
import { startRouter } from './router.js';
import { renderFloorplan } from './ui/floorplan.js';
import { renderRoom } from './ui/room.js';
import { renderPage } from './ui/pages.js';
import { renderMediator } from './ui/mediator.js';

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

renderMediator(document.getElementById('mediator-root'));

startRouter(route => {
  highlightNav(route);
  if (route.view === 'room') mount(container => renderRoom(container, route.day));
  else if (route.view === 'page') mount(container => renderPage(container, route.page));
  else mount(container => renderFloorplan(container));
});
