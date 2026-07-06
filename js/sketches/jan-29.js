// jan-29 — « Grille suisse » — Grid-based graphic design.
// Une affiche construite sur une grille modulaire 6×8 apparente.
const POSTER = ['#b5442c', '#1c1a17', '#2c4870', '#c8963c'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f2eee4';
    ctx.fillRect(0, 0, w, h);

    const cols = 6;
    const rows = 8;
    const m = Math.min(w, h) * 0.07;
    const gw = (w - m * 2) / cols;
    const gh = (h - m * 2) / rows;
    const cell = (c, r) => [m + c * gw, m + r * gh];

    // La grille apparente
    ctx.strokeStyle = 'rgba(28, 26, 23, 0.16)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(m + c * gw, m);
      ctx.lineTo(m + c * gw, h - m);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(m, m + r * gh);
      ctx.lineTo(w - m, m + r * gh);
      ctx.stroke();
    }

    // Blocs de couleur alignés sur la grille
    const blocks = 4 + Math.floor(rand() * 4);
    for (let i = 0; i < blocks; i++) {
      const c = Math.floor(rand() * (cols - 1));
      const r = Math.floor(rand() * (rows - 2));
      const spanC = 1 + Math.floor(rand() * Math.min(3, cols - c));
      const spanR = 1 + Math.floor(rand() * 2);
      const [x, y] = cell(c, r);
      ctx.fillStyle = POSTER[Math.floor(rand() * POSTER.length)];
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x, y, gw * spanC, gh * spanR);
    }
    ctx.globalAlpha = 1;

    // Filet fort de structure
    const [rx, ry] = cell(0, 5);
    ctx.fillStyle = '#1c1a17';
    ctx.fillRect(rx, ry - 2, w - m * 2, 4);

    // Typographie massive, tournée, calée sur la grille
    ctx.save();
    const [tx, ty] = cell(rand() < 0.5 ? 1 : 2, 8);
    ctx.translate(tx, ty);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#1c1a17';
    ctx.font = `900 ${gh * 1.55}px Helvetica, Arial, sans-serif`;
    ctx.fillText('GENUARY', 0, 0);
    ctx.restore();

    // Bas de casse : lignes d'information
    ctx.fillStyle = '#1c1a17';
    ctx.font = `700 ${gh * 0.32}px Helvetica, Arial, sans-serif`;
    const [ix, iy] = cell(3, 6);
    ctx.fillText('31 jours · 31 contraintes', ix, iy - gh * 0.3);
    ctx.font = `400 ${gh * 0.28}px Helvetica, Arial, sans-serif`;
    ctx.fillText('janvier 2025', ix, iy);
    ctx.fillText('canvas 2d · zéro librairie', ix, iy + gh * 0.3);
  },
};
