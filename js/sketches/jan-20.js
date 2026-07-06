// jan-20 — « Façades » — Generative Architecture.
const FACADES = ['#8a8074', '#a89b88', '#6e7b86', '#9b6a52', '#b3a58f', '#5d6b5f'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    // Ciel pâle
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#e8e2d4');
    sky.addColorStop(1, '#d4cbb8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const groundY = h * 0.88;
    const buildings = 6 + Math.floor(rand() * 4);
    let x = -w * 0.04;

    while (x < w * 1.02) {
      const bw = w * (0.09 + rand() * 0.14);
      const bh = h * (0.25 + rand() * rand() * 0.55);
      const color = FACADES[Math.floor(rand() * FACADES.length)];
      const y0 = groundY - bh;

      // Ombre portée dure vers la droite
      ctx.fillStyle = 'rgba(40, 36, 30, 0.18)';
      ctx.beginPath();
      ctx.moveTo(x + bw, groundY);
      ctx.lineTo(x + bw + bh * 0.22, groundY);
      ctx.lineTo(x + bw + bh * 0.22, groundY - bh * 0.12);
      ctx.lineTo(x + bw, y0);
      ctx.closePath();
      ctx.fill();

      // Corps du bâtiment
      ctx.fillStyle = color;
      ctx.fillRect(x, y0, bw, bh);
      // Face éclairée : bande claire à gauche
      ctx.fillStyle = 'rgba(255, 252, 240, 0.18)';
      ctx.fillRect(x, y0, bw * 0.16, bh);

      // Fenêtres : grille étages × travées
      const floors = Math.max(2, Math.floor(bh / (14 + rand() * 8)));
      const bays = Math.max(2, Math.floor(bw / (12 + rand() * 8)));
      const mw = bw / bays;
      const mh = bh / floors;
      const lit = rand(); // proportion de fenêtres allumées
      for (let f = 0; f < floors; f++) {
        for (let b = 0; b < bays; b++) {
          const wx = x + b * mw + mw * 0.24;
          const wy = y0 + f * mh + mh * 0.22;
          ctx.fillStyle = rand() < lit * 0.25 ? '#e8c268' : 'rgba(30, 30, 34, 0.55)';
          ctx.fillRect(wx, wy, mw * 0.52, mh * 0.5);
        }
      }
      // Balcons filants sur certains immeubles
      if (rand() < 0.4) {
        ctx.fillStyle = 'rgba(30, 28, 24, 0.35)';
        for (let f = 1; f < floors; f++) {
          ctx.fillRect(x - 2, y0 + f * mh - 2, bw + 4, 3);
        }
      }
      x += bw * (0.86 + rand() * 0.3);
    }

    // Sol
    ctx.fillStyle = '#3f3a32';
    ctx.fillRect(0, groundY, w, h - groundY);
  },
};
