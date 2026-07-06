// jan-24 — « Cercles » — Geometric art: pick either a circle, rectangle, or triangle.
// Le cercle, choisi. Des amas d'anneaux concentriques placés par rejet.
const BAUHAUS = ['#b5442c', '#2c4870', '#c8963c', '#1c1a17', '#5b7a94'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f0ead9';
    ctx.fillRect(0, 0, w, h);

    // Packing par rejet : on tente des amas, on garde ceux qui ne chevauchent pas
    const placed = [];
    let attempts = 0;
    while (attempts < 900 && placed.length < 26) {
      attempts++;
      const r = Math.min(w, h) * (0.04 + rand() * rand() * 0.16);
      const x = r + rand() * (w - r * 2);
      const y = r + rand() * (h - r * 2);
      let ok = true;
      for (const p of placed) {
        if (Math.hypot(p.x - x, p.y - y) < p.r + r + 6) { ok = false; break; }
      }
      if (!ok) continue;
      placed.push({ x, y, r });

      // Deux couleurs par amas, anneaux alternés
      const ca = BAUHAUS[Math.floor(rand() * BAUHAUS.length)];
      let cb = BAUHAUS[Math.floor(rand() * BAUHAUS.length)];
      if (cb === ca) cb = BAUHAUS[(BAUHAUS.indexOf(ca) + 2) % BAUHAUS.length];
      const rings = 3 + Math.floor(rand() * 7);
      for (let k = rings; k >= 1; k--) {
        ctx.fillStyle = k % 2 ? ca : cb;
        ctx.beginPath();
        ctx.arc(x, y, (r * k) / rings, 0, Math.PI * 2);
        ctx.fill();
      }
      // Point central écru
      ctx.fillStyle = '#f0ead9';
      ctx.beginPath();
      ctx.arc(x, y, Math.max(1.6, r / rings / 3), 0, Math.PI * 2);
      ctx.fill();
    }
  },
};
