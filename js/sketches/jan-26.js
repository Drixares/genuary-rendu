// jan-26 — « Kaléidoscope » — Symmetry.
// Un seul secteur de τ/8 est dessiné, puis répété par rotation et miroir.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#12141c';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.48;
    const order = 8;

    // Les éclats du secteur : pré-tirés pour être identiques dans chaque copie
    const shards = [];
    for (let i = 0; i < 40; i++) {
      shards.push({
        kind: rand() < 0.55 ? 'tri' : rand() < 0.75 ? 'arc' : 'dot',
        r0: R * (0.08 + rand() * 0.85),
        a0: rand() * (Math.PI / order),
        size: R * (0.02 + rand() * 0.09),
        spin: rand() * Math.PI,
        hue: 175 + rand() * 90,
        light: 40 + rand() * 40,
        alpha: 0.5 + rand() * 0.5,
      });
    }

    const drawSector = () => {
      for (const s of shards) {
        const x = Math.cos(s.a0) * s.r0;
        const y = Math.sin(s.a0) * s.r0;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.spin);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = `hsl(${s.hue}, 55%, ${s.light}%)`;
        if (s.kind === 'tri') {
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size, s.size);
          ctx.lineTo(-s.size, s.size * 0.6);
          ctx.closePath();
          ctx.fill();
        } else if (s.kind === 'arc') {
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = s.size * 0.35;
          ctx.beginPath();
          ctx.arc(0, 0, s.size, 0, Math.PI * 1.2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    for (let k = 0; k < order; k++) {
      // Copie tournée…
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((k * Math.PI * 2) / order);
      drawSector();
      // …et son miroir
      ctx.scale(1, -1);
      drawSector();
      ctx.restore();
    }

    // Anneau de sertissage
    ctx.strokeStyle = 'rgba(240, 234, 217, 0.16)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
  },
};
