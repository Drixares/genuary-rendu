// jan-27 — « Sans hasard » — Make something interesting with no randomness
// or noise or trig. Munching squares : un OU exclusif entre coordonnées,
// rien d'autre. Ni rand, ni bruit, ni trigonométrie dans ce module.
const RAMP = ['#10131a', '#2c4870', '#3f7d5c', '#c8963c', '#b5442c', '#f5f1e8'];

export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    const n = 64;
    const cell = Math.min(w, h) / n;
    const ox = (w - cell * n) / 2;
    const oy = (h - cell * n) / 2;
    const frame = Math.floor(t * 8) % n;
    ctx.fillStyle = '#10131a';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        ctx.fillStyle = RAMP[(x ^ y ^ frame) % RAMP.length];
        ctx.fillRect(ox + x * cell, oy + y * cell, cell + 1, cell + 1);
      }
    }
  },
};
