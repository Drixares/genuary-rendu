// jan-03 — « Quarante-deux » — Exactly 42 lines of code.
// Le corps de draw fait exactement 42 lignes.
export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    const cx = w / 2;
    const cy = h / 2;
    const rings = 9;
    const maxR = Math.min(w, h) * 0.38;
    ctx.fillStyle = '#14121c';
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = 'round';
    for (let i = 0; i < rings; i++) {
      const r = maxR * ((i + 1) / rings);
      const arcs = 2 + Math.floor(rand() * 4);
      const width = 3 + rand() * 9;
      const speed = (i % 2 ? 1 : -1) * (0.1 + 0.05 * i);
      const hue = 210 + i * 14 + rand() * 10;
      ctx.strokeStyle = `hsl(${hue}, 70%, ${55 + rand() * 15}%)`;
      ctx.lineWidth = width;
      for (let a = 0; a < arcs; a++) {
        const start = rand() * Math.PI * 2 + t * speed;
        const span = 0.4 + rand() * 1.4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, start, start + span);
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#f5f1e8';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 241, 232, 0.25)';
    ctx.lineWidth = 1;
    const ticks = 42;
    for (let k = 0; k < ticks; k++) {
      const ang = (k / ticks) * Math.PI * 2 + t * 0.03;
      const r2 = maxR + (k % 7 === 0 ? 26 : 20);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (maxR + 14), cy + Math.sin(ang) * (maxR + 14));
      ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
      ctx.stroke();
    }
    ctx.font = '12px ui-monospace, monospace';
    ctx.fillText('42', cx + maxR + 30, cy + 4);
  },
};
