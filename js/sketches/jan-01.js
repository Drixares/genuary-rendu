// jan-01 — « Partition » — Vertical or horizontal lines only.
const PALETTE = ['#1c1a17', '#b5442c', '#2c4870', '#c8963c', '#57524a'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, w, h);
    const vertical = rand() < 0.5;
    const count = 45 + Math.floor(rand() * 25);
    for (let i = 0; i < count; i++) {
      const thickness = 1 + rand() * rand() * 24;
      const pos = rand() * (vertical ? w : h);
      const span = (vertical ? h : w) * (0.2 + rand() * 0.8);
      const offset = rand() * ((vertical ? h : w) - span);
      ctx.fillStyle = PALETTE[Math.floor(rand() * PALETTE.length)];
      ctx.globalAlpha = 0.65 + rand() * 0.35;
      if (vertical) ctx.fillRect(pos, offset, thickness, span);
      else ctx.fillRect(offset, pos, span, thickness);
    }
    ctx.globalAlpha = 1;
  },
};
