const PAGES = new Set(['artiste', 'exposition', 'livret', 'contact']);

export function parseHash(hash) {
  const path = String(hash || '').replace(/^#\/?/, '');
  const room = path.match(/^jour\/(\d{1,2})$/);
  if (room) {
    const day = Number(room[1]);
    if (day >= 1 && day <= 31) return { view: 'room', day };
  }
  if (PAGES.has(path)) return { view: 'page', page: path };
  return { view: 'plan' };
}

export function startRouter(onRoute) {
  const fire = () => onRoute(parseHash(location.hash));
  addEventListener('hashchange', fire);
  fire();
}

export const gotoHash = hash => { location.hash = hash; };
export const gotoDay = day => gotoHash(`#/jour/${String(day).padStart(2, '0')}`);
