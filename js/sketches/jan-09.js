// jan-09 — « Ligne 9 » — The textile design patterns of public transport seating.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    // Fond bleu nuit du velours de siège
    ctx.fillStyle = '#141a3c';
    ctx.fillRect(0, 0, w, h);

    const tileH = h / 7;

    // Zigzags criards, une rangée sur deux magenta / turquoise
    for (let row = 0; row < 8; row++) {
      const y0 = row * tileH + (row % 2 ? tileH * 0.3 : 0);
      const amp = tileH * (0.22 + rand() * 0.12);
      const step = w / (10 + Math.floor(rand() * 5));
      ctx.strokeStyle = row % 2 ? '#d43a8c' : '#2fbfb0';
      ctx.lineWidth = 4 + rand() * 5;
      ctx.lineJoin = 'miter';
      ctx.beginPath();
      let up = rand() < 0.5;
      for (let x = -step; x <= w + step; x += step) {
        const y = y0 + (up ? -amp : amp);
        if (x === -step) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        up = !up;
      }
      ctx.stroke();
    }

    // Confettis rectangulaires jaunes et orange, en quinconce
    const confetti = 90;
    for (let i = 0; i < confetti; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const cw = 4 + rand() * 10;
      const chh = 3 + rand() * 6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rand() - 0.5) * 1.2);
      ctx.fillStyle = rand() < 0.6 ? '#e8b83a' : '#e06a2c';
      ctx.fillRect(-cw / 2, -chh / 2, cw, chh);
      ctx.restore();
    }

    // Trame du tissu : fines lignes verticales sombres
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },
};
