// jan-18 — « Le vent » — What does wind look like?
// On ne dessine pas le vent : on dessine 900 brins qui lui cèdent.
export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    ctx.fillStyle = '#f2efe6';
    ctx.fillRect(0, 0, w, h);

    // Rafales : amplitude globale qui respire
    const gust = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.7 + Math.sin(t * 0.23) * 2));

    const blades = 900;
    ctx.lineCap = 'round';
    for (let i = 0; i < blades; i++) {
      const x0 = rand() * w * 1.1 - w * 0.05;
      const y0 = h * (0.25 + rand() * 0.75);
      const len = 14 + rand() * (h * 0.09) * (y0 / h + 0.4);
      const phase = rand() * Math.PI * 2;
      const stiff = 0.4 + rand() * 0.6;
      // Balancement : le vent vient de la gauche, ondule dans le temps et l'espace
      const sway = (Math.sin(t * 1.8 + phase + x0 * 0.02) * 0.5 + 0.7) * gust * (1 - stiff * 0.4);
      const bend = sway * len * 0.9;

      const g = 0.5 + rand() * 0.5;
      ctx.strokeStyle = `hsl(${95 + rand() * 40}, ${28 + g * 22}%, ${26 + g * 26}%)`;
      ctx.lineWidth = 1 + g * 1.4;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      // Trois segments de plus en plus penchés
      ctx.quadraticCurveTo(
        x0 + bend * 0.25, y0 - len * 0.55,
        x0 + bend, y0 - len
      );
      ctx.stroke();
    }

    // Quelques graines emportées
    const seeds = 24;
    ctx.fillStyle = 'rgba(120, 110, 90, 0.55)';
    for (let i = 0; i < seeds; i++) {
      const speed = 40 + rand() * 90;
      const y = h * (0.1 + rand() * 0.5) + Math.sin(t * 2 + rand() * Math.PI * 2) * 14;
      const x = (rand() * w + t * speed * gust) % (w * 1.1);
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};
