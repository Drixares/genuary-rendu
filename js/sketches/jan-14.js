// jan-14 — « Éblouissement » — Pure black and white. No gray.
// Camouflage dazzle : cellules de rayures épaisses, 4 orientations, #000/#fff.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);

    const cells = [];
    const subdivide = (x, y, rw, rh, depth) => {
      if (depth >= 4 || (depth > 1 && rand() < 0.3) || rw < 60 || rh < 60) {
        cells.push({ x, y, rw, rh });
        return;
      }
      const vertical = rw > rh;
      const f = 0.35 + rand() * 0.3;
      if (vertical) {
        subdivide(x, y, rw * f, rh, depth + 1);
        subdivide(x + rw * f, y, rw * (1 - f), rh, depth + 1);
      } else {
        subdivide(x, y, rw, rh * f, depth + 1);
        subdivide(x, y + rh * f, rw, rh * (1 - f), depth + 1);
      }
    };
    subdivide(0, 0, w, h, 0);

    const ANGLES = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
    for (const c of cells) {
      const angle = ANGLES[Math.floor(rand() * ANGLES.length)];
      const stripe = 8 + rand() * 22;
      ctx.save();
      ctx.beginPath();
      ctx.rect(c.x, c.y, c.rw, c.rh);
      ctx.clip();
      // Fond blanc, rayures noires épaisses
      ctx.fillStyle = '#fff';
      ctx.fillRect(c.x, c.y, c.rw, c.rh);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = stripe;
      const diag = Math.hypot(c.rw, c.rh);
      const mx = c.x + c.rw / 2;
      const my = c.y + c.rh / 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const px = -dy;
      const py = dx;
      for (let o = -diag; o <= diag; o += stripe * 2) {
        ctx.beginPath();
        ctx.moveTo(mx + px * o - dx * diag, my + py * o - dy * diag);
        ctx.lineTo(mx + px * o + dx * diag, my + py * o + dy * diag);
        ctx.stroke();
      }
      // Filet noir entre cellules
      ctx.lineWidth = 3;
      ctx.strokeRect(c.x, c.y, c.rw, c.rh);
      ctx.restore();
    }
  },
};
