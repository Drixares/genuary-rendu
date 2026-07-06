// jan-12 — « Subdivision » — Subdivision.
const PALETTE = [
  '#8c4a2f', '#b5442c', '#c8963c', '#2c4870',
  '#5b7a94', '#3f5c47', '#a8926b', '#1c1a17',
];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const gap = 3;
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, w, h);

    const subdivide = (x, y, rw, rh, depth) => {
      const stop = depth >= 6 || (depth > 1 && rand() < 0.22) || rw < 26 || rh < 26;
      if (stop) {
        ctx.fillStyle = PALETTE[(depth + Math.floor(rand() * 3)) % PALETTE.length];
        ctx.globalAlpha = 0.72 + depth * 0.045;
        ctx.fillRect(x + gap / 2, y + gap / 2, rw - gap, rh - gap);
        ctx.globalAlpha = 1;
        return;
      }
      const splitVertical = rw > rh ? true : rh > rw ? false : rand() < 0.5;
      const f = 0.3 + rand() * 0.4;
      if (splitVertical) {
        subdivide(x, y, rw * f, rh, depth + 1);
        subdivide(x + rw * f, y, rw * (1 - f), rh, depth + 1);
      } else {
        subdivide(x, y, rw, rh * f, depth + 1);
        subdivide(x, y + rh * f, rw, rh * (1 - f), depth + 1);
      }
    };

    const m = Math.min(w, h) * 0.06;
    subdivide(m, m, w - m * 2, h - m * 2, 0);
  },
};
