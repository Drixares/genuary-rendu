// jan-21 — « Collisions » — Create a collision detection system (no libraries allowed).
// Détection paire-à-paire et réponse élastique écrites à la main. Pour rester
// déterministe (le rand est recréé à chaque frame), la simulation est rejouée
// depuis l'état initial sur une boucle de 12 s.
const LOOP = 12;
const DT = 1 / 60;

export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    // État initial seedé
    const n = 24;
    const balls = [];
    for (let i = 0; i < n; i++) {
      const r = 8 + rand() * 18;
      balls.push({
        x: r + rand() * (w - r * 2),
        y: r + rand() * (h - r * 2),
        vx: (rand() - 0.5) * 160,
        vy: (rand() - 0.5) * 160,
        r,
        hue: 10 + rand() * 50,
        hit: 0,
      });
    }

    // Rejoue la simulation jusqu'à t (mod LOOP)
    const steps = Math.floor(((t % LOOP) / DT));
    for (let s = 0; s < steps; s++) {
      for (const b of balls) {
        b.x += b.vx * DT;
        b.y += b.vy * DT;
        b.hit = Math.max(0, b.hit - DT * 4);
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x > w - b.r) { b.x = w - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y > h - b.r) { b.y = h - b.r; b.vy = -Math.abs(b.vy); }
      }
      // Détection paire-à-paire + réponse élastique (masses ∝ r²)
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = balls[i];
          const b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const min = a.r + b.r;
          if (dist === 0 || dist >= min) continue;
          const nx = dx / dist;
          const ny = dy / dist;
          // Séparation
          const push = (min - dist) / 2;
          a.x -= nx * push; a.y -= ny * push;
          b.x += nx * push; b.y += ny * push;
          // Impulsion élastique le long de la normale
          const ma = a.r * a.r;
          const mb = b.r * b.r;
          const va = a.vx * nx + a.vy * ny;
          const vb = b.vx * nx + b.vy * ny;
          const pa = (va * (ma - mb) + 2 * mb * vb) / (ma + mb);
          const pb = (vb * (mb - ma) + 2 * ma * va) / (ma + mb);
          a.vx += (pa - va) * nx; a.vy += (pa - va) * ny;
          b.vx += (pb - vb) * nx; b.vy += (pb - vb) * ny;
          a.hit = 1; b.hit = 1;
        }
      }
    }

    // Rendu
    ctx.fillStyle = '#15181f';
    ctx.fillRect(0, 0, w, h);
    for (const b of balls) {
      const light = 45 + b.hit * 45;
      ctx.fillStyle = `hsl(${b.hue}, ${60 + b.hit * 30}%, ${light}%)`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      if (b.hit > 0.6) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${(b.hit - 0.6) * 2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  },
};
