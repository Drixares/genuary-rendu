// jan-06 — « Primitives » — Make a landscape using only primitive shapes.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    // Ciel : bandes horizontales du haut vers l'horizon
    const skyBands = 8;
    const horizon = h * 0.62;
    for (let i = 0; i < skyBands; i++) {
      const f = i / (skyBands - 1);
      ctx.fillStyle = `hsl(${28 + f * 14}, ${64 - f * 20}%, ${68 + f * 14}%)`;
      ctx.fillRect(0, (horizon / skyBands) * i, w, horizon / skyBands + 1);
    }
    // Soleil : un disque
    const sunX = w * (0.25 + rand() * 0.5);
    const sunY = horizon * (0.3 + rand() * 0.35);
    ctx.fillStyle = '#f6e3b0';
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.min(w, h) * 0.07, 0, Math.PI * 2);
    ctx.fill();
    // Nuages : petits cercles agglutinés
    for (let c = 0; c < 4; c++) {
      const cxx = rand() * w;
      const cyy = horizon * (0.15 + rand() * 0.4);
      ctx.fillStyle = 'rgba(250, 246, 238, 0.8)';
      for (let k = 0; k < 5; k++) {
        ctx.beginPath();
        ctx.arc(cxx + (rand() - 0.5) * 60, cyy + (rand() - 0.5) * 14, 10 + rand() * 14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Montagnes : trois rangées de triangles, de plus en plus proches
    const rows = [
      { y: horizon, height: h * 0.3, color: 'hsl(230, 18%, 62%)' },
      { y: horizon, height: h * 0.22, color: 'hsl(228, 22%, 48%)' },
      { y: horizon, height: h * 0.14, color: 'hsl(226, 26%, 34%)' },
    ];
    for (const row of rows) {
      let x = -w * 0.1;
      while (x < w * 1.1) {
        const base = w * (0.16 + rand() * 0.2);
        ctx.fillStyle = row.color;
        ctx.beginPath();
        ctx.moveTo(x, row.y);
        ctx.lineTo(x + base / 2, row.y - row.height * (0.6 + rand() * 0.4));
        ctx.lineTo(x + base, row.y);
        ctx.closePath();
        ctx.fill();
        x += base * (0.55 + rand() * 0.3);
      }
    }
    // Champs : rectangles jusqu'en bas
    const fieldRows = 5;
    for (let i = 0; i < fieldRows; i++) {
      const y0 = horizon + ((h - horizon) / fieldRows) * i;
      let x = 0;
      while (x < w) {
        const seg = w * (0.1 + rand() * 0.25);
        ctx.fillStyle = `hsl(${88 + rand() * 30}, ${30 + rand() * 25}%, ${30 + i * 5 + rand() * 8}%)`;
        ctx.fillRect(x, y0, seg + 1, (h - horizon) / fieldRows + 1);
        x += seg;
      }
    }
  },
};
