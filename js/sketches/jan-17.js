// jan-17 — « π = 4 » — What happens if pi=4?
// En distance de Tchebychev, π vaut 4 et le cercle est un carré. Un point
// y orbite ; le cercle euclidien fantôme observe en pointillés.
export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    ctx.fillStyle = '#101318';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.32;

    // Point sur le « cercle » L∞ de rayon r à l'angle a
    const squareCircle = a => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      const m = Math.max(Math.abs(c), Math.abs(s));
      return [cx + (c / m) * r, cy + (s / m) * r];
    };

    // Cercle euclidien fantôme
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(245, 241, 232, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trajectoire déjà parcourue (traînée)
    const a1 = t * 0.9;
    ctx.strokeStyle = '#c8963c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const steps = 160;
    const trail = Math.min(a1, Math.PI * 2);
    for (let i = 0; i <= steps; i++) {
      const a = a1 - trail + (trail * i) / steps;
      const [x, y] = squareCircle(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Le point orbital
    const [px, py] = squareCircle(a1);
    ctx.fillStyle = '#f5f1e8';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Rayon
    ctx.strokeStyle = 'rgba(200, 150, 60, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Légende
    ctx.fillStyle = 'rgba(245, 241, 232, 0.55)';
    ctx.font = '13px ui-monospace, monospace';
    ctx.fillText('π = 4', cx - 16, cy - r - 14);
  },
};
