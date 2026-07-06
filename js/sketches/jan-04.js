// jan-04 — « Noir sur noir » — Black on black.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, w, h);
    const shapes = 12;
    for (let i = 0; i < shapes; i++) {
      const isDisc = rand() < 0.4;
      const x = w * (0.1 + rand() * 0.8);
      const y = h * (0.1 + rand() * 0.8);
      const size = Math.min(w, h) * (0.08 + rand() * 0.22);
      // Reflet spéculaire très sombre, décalé vers le haut-gauche
      const g = ctx.createRadialGradient(
        x - size * 0.3, y - size * 0.3, size * 0.05,
        x, y, size
      );
      g.addColorStop(0, '#111114');
      g.addColorStop(0.5, '#08080a');
      g.addColorStop(1, '#050506');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      if (isDisc) {
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        const rw = size * (0.6 + rand() * 0.8);
        const rh = size * (0.6 + rand() * 0.8);
        ctx.fillRect(x - rw / 2, y - rh / 2, rw, rh);
        ctx.strokeRect(x - rw / 2, y - rh / 2, rw, rh);
      }
    }
  },
};
