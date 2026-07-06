// jan-23 — « Béton » — Inspired by brutalism.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    // Ciel blanc cassé, écrasé de lumière
    ctx.fillStyle = '#ece8dd';
    ctx.fillRect(0, 0, w, h);

    const groundY = h * 0.82;
    const blocks = 5;
    const shadowLen = 0.5; // ombres à 45°

    // Monolithes, du fond vers l'avant
    for (let i = 0; i < blocks; i++) {
      const bw = w * (0.16 + rand() * 0.2);
      const bh = h * (0.2 + rand() * 0.5);
      const x = w * 0.04 + (w * 0.9 - bw) * (i / (blocks - 1)) + (rand() - 0.5) * w * 0.06;
      const y0 = groundY - bh;
      const gray = 52 + rand() * 18 - i * 2;

      // Ombre portée dure à 45° vers la droite
      ctx.fillStyle = 'rgba(38, 35, 30, 0.35)';
      ctx.beginPath();
      ctx.moveTo(x + bw, groundY);
      ctx.lineTo(x + bw + bh * shadowLen, groundY);
      ctx.lineTo(x + bw + bh * shadowLen, groundY - bh * 0.02);
      ctx.lineTo(x + bw, y0);
      ctx.closePath();
      ctx.fill();

      // Bloc principal
      ctx.fillStyle = `hsl(36, 6%, ${gray}%)`;
      ctx.fillRect(x, y0, bw, bh);
      // Face ombrée à droite
      ctx.fillStyle = `hsl(36, 8%, ${gray - 14}%)`;
      ctx.fillRect(x + bw * 0.82, y0, bw * 0.18, bh);
      // Couronnement
      ctx.fillStyle = `hsl(36, 6%, ${gray + 8}%)`;
      ctx.fillRect(x - bw * 0.03, y0 - h * 0.015, bw * 1.06, h * 0.02);

      // Trame de petites fenêtres profondes
      const floors = Math.max(3, Math.floor(bh / 26));
      const bays = Math.max(2, Math.floor(bw / 30));
      for (let f = 0; f < floors; f++) {
        for (let b = 0; b < bays; b++) {
          if (rand() < 0.12) continue; // respirations aveugles
          const wx = x + (b + 0.3) * (bw / bays);
          const wy = y0 + (f + 0.34) * (bh / floors);
          ctx.fillStyle = `hsl(36, 8%, ${gray - 26}%)`;
          ctx.fillRect(wx, wy, (bw / bays) * 0.42, (bh / floors) * 0.34);
          // Linteau éclairé
          ctx.fillStyle = `hsl(36, 8%, ${gray + 12}%)`;
          ctx.fillRect(wx, wy - 2, (bw / bays) * 0.42, 2);
        }
      }
    }

    // Sol
    ctx.fillStyle = '#b3ab9a';
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.fillStyle = 'rgba(38, 35, 30, 0.2)';
    ctx.fillRect(0, groundY, w, 3);

    // Grain du coffrage
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 2200; i++) {
      const gx = rand() * w;
      const gy = rand() * h;
      const v = 30 + rand() * 60;
      ctx.fillStyle = `hsla(36, 8%, ${v}%, ${0.06 + rand() * 0.1})`;
      ctx.fillRect(gx, gy, 1.2, 1.2);
    }
    ctx.globalAlpha = 1;
  },
};
