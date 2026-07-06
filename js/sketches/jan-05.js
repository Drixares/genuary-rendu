// jan-05 — « Cité isométrique » — Isometric Art (No vanishing points).
const TOPS = ['#dfe8e2', '#e8e0d0', '#d8dfe8'];
const LEFTS = ['#a8b8ac', '#b8ab92', '#9fadc0'];
const RIGHTS = ['#77897c', '#8a7d64', '#6f7e93'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f2efe8';
    ctx.fillRect(0, 0, w, h);
    const n = 9;
    const tile = Math.min(w, h) / (n * 1.6);
    const dx = tile * 0.92;
    const dy = tile * 0.53;
    const zh = tile * 0.62;
    const cx = w / 2;
    const cy = h * 0.2;

    const iso = (gx, gy, z) => [
      cx + (gx - gy) * dx,
      cy + (gx + gy) * dy - z * zh,
    ];

    const face = (pts, fill) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
    };

    for (let gy = 0; gy < n; gy++) {
      for (let gx = 0; gx < n; gx++) {
        const height = Math.floor(rand() * rand() * 6);
        const c = Math.floor(rand() * TOPS.length);
        for (let z = 0; z < height; z++) {
          face([iso(gx, gy, z + 1), iso(gx + 1, gy, z + 1), iso(gx + 1, gy + 1, z + 1), iso(gx, gy + 1, z + 1)], TOPS[c]);
          face([iso(gx, gy + 1, z + 1), iso(gx + 1, gy + 1, z + 1), iso(gx + 1, gy + 1, z), iso(gx, gy + 1, z)], LEFTS[c]);
          face([iso(gx + 1, gy + 1, z + 1), iso(gx + 1, gy, z + 1), iso(gx + 1, gy, z), iso(gx + 1, gy + 1, z)], RIGHTS[c]);
        }
        if (height === 0) {
          face([iso(gx, gy, 0), iso(gx + 1, gy, 0), iso(gx + 1, gy + 1, 0), iso(gx, gy + 1, 0)], 'rgba(28, 26, 23, 0.05)');
        }
      }
    }
  },
};
