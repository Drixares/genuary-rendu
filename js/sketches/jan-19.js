// jan-19 — « Op » — Op Art.
// Rayures verticales dont la phase se déforme sous une loupe gaussienne :
// l'œil voit un bombement qui n'existe pas. Hommage à Bridget Riley.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, w, h);

    const cx = w * (0.38 + rand() * 0.24);
    const cy = h * (0.38 + rand() * 0.24);
    const sigma = Math.min(w, h) * (0.24 + rand() * 0.08);
    const A = 0.85; // force de la loupe

    const stripes = 26 + Math.floor(rand() * 8);
    const sw = w / stripes;

    // Frontière j : position x de base j*sw, déplacée par la loupe
    const boundary = (j, y) => {
      const bx = j * sw;
      const dx = bx - cx;
      const dy = y - cy;
      const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      return cx + dx * (1 + A * g);
    };

    const stepY = 4;
    for (let j = 0; j < stripes; j++) {
      if (j % 2 === 0) continue; // une rayure sur deux est noire
      ctx.fillStyle = '#141210';
      ctx.beginPath();
      // Bord gauche vers le bas
      for (let y = 0; y <= h; y += stepY) {
        const x = boundary(j, y);
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Bord droit en remontant
      for (let y = h; y >= 0; y -= stepY) {
        ctx.lineTo(boundary(j + 1, y), y);
      }
      ctx.closePath();
      ctx.fill();
    }
  },
};
