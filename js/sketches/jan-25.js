// jan-25 — « Fil » — One line that may or may not intersect itself.
// Une seule polyligne, pré-calculée depuis la seed, révélée avec le temps.
export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    ctx.fillStyle = '#f5f1e8';
    ctx.fillRect(0, 0, w, h);

    // Marche aléatoire lissée, entièrement déterminée par la seed
    const total = 900;
    const pts = [];
    let x = w * (0.2 + rand() * 0.6);
    let y = h * (0.2 + rand() * 0.6);
    let angle = rand() * Math.PI * 2;
    for (let i = 0; i < total; i++) {
      angle += (rand() - 0.5) * 0.55;
      const step = 4 + rand() * 5;
      x += Math.cos(angle) * step;
      y += Math.sin(angle) * step;
      // Rebond doux sur les bords
      if (x < w * 0.06 || x > w * 0.94) { angle = Math.PI - angle; x = Math.min(w * 0.94, Math.max(w * 0.06, x)); }
      if (y < h * 0.06 || y > h * 0.94) { angle = -angle; y = Math.min(h * 0.94, Math.max(h * 0.06, y)); }
      pts.push([x, y]);
    }

    // Révélation progressive (boucle : redémarre une fois la ligne finie)
    const speed = 90; // points par seconde
    const visible = Math.max(2, Math.floor((t * speed) % (total + 240)));
    const upto = Math.min(total, visible);

    ctx.strokeStyle = '#1c1a17';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < upto; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();

    // La pointe du stylo
    if (upto < total) {
      const [px, py] = pts[upto - 1];
      ctx.fillStyle = '#b5442c';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};
