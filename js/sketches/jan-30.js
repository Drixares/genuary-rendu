// jan-30 — « Carte abstraite » — Abstract map.
const DISTRICTS = ['#e4ddc9', '#dcd2c0', '#d8dcc4', '#e0d4c8', '#d4d8ce', '#e6d8b8'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#efe9db';
    ctx.fillRect(0, 0, w, h);

    // Quartiers : subdivision récursive teintée pastel
    const blocks = [];
    const subdivide = (x, y, rw, rh, depth) => {
      if (depth >= 5 || (depth > 2 && rand() < 0.3) || rw < 50 || rh < 50) {
        blocks.push({ x, y, rw, rh });
        return;
      }
      const vertical = rw > rh;
      const f = 0.35 + rand() * 0.3;
      if (vertical) {
        subdivide(x, y, rw * f, rh, depth + 1);
        subdivide(x + rw * f, y, rw * (1 - f), rh, depth + 1);
      } else {
        subdivide(x, y, rw, rh * f, depth + 1);
        subdivide(x, y + rh * f, rw, rh * (1 - f), depth + 1);
      }
    };
    subdivide(0, 0, w, h, 0);

    for (const b of blocks) {
      ctx.fillStyle = DISTRICTS[Math.floor(rand() * DISTRICTS.length)];
      ctx.fillRect(b.x, b.y, b.rw, b.rh);
      // Les rues : joints blancs entre quartiers
      ctx.strokeStyle = '#f8f5ec';
      ctx.lineWidth = 4;
      ctx.strokeRect(b.x, b.y, b.rw, b.rh);
      // Ruelles internes
      ctx.strokeStyle = 'rgba(248, 245, 236, 0.8)';
      ctx.lineWidth = 1.6;
      const alleys = Math.floor(rand() * 3);
      for (let a = 0; a < alleys; a++) {
        ctx.beginPath();
        if (rand() < 0.5) {
          const ax = b.x + b.rw * (0.25 + rand() * 0.5);
          ctx.moveTo(ax, b.y);
          ctx.lineTo(ax, b.y + b.rh);
        } else {
          const ay = b.y + b.rh * (0.25 + rand() * 0.5);
          ctx.moveTo(b.x, ay);
          ctx.lineTo(b.x + b.rw, ay);
        }
        ctx.stroke();
      }
    }

    // La rivière : large polyligne bleue qui traverse
    ctx.strokeStyle = '#8fb4c4';
    ctx.lineWidth = Math.min(w, h) * 0.045;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    let ry = h * (0.2 + rand() * 0.6);
    ctx.moveTo(-10, ry);
    const bends = 5;
    for (let i = 1; i <= bends; i++) {
      ry += (rand() - 0.5) * h * 0.3;
      ry = Math.min(h * 0.9, Math.max(h * 0.1, ry));
      ctx.lineTo((w / bends) * i + (i === bends ? 10 : 0), ry);
    }
    ctx.stroke();
    // Berges
    ctx.strokeStyle = 'rgba(120, 150, 165, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Un parc
    ctx.fillStyle = '#a8bd8f';
    const pk = blocks[Math.floor(rand() * blocks.length)];
    ctx.fillRect(pk.x + 4, pk.y + 4, pk.rw - 8, pk.rh - 8);

    // Points d'intérêt numérotés
    ctx.font = '700 11px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 1; i <= 6; i++) {
      const px = w * (0.1 + rand() * 0.8);
      const py = h * (0.1 + rand() * 0.8);
      ctx.fillStyle = '#b5442c';
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f8f5ec';
      ctx.fillText(String(i), px, py + 4);
    }
    ctx.textAlign = 'start';

    // Rose des vents minimale
    ctx.fillStyle = '#57524a';
    ctx.font = '700 14px Georgia, serif';
    ctx.fillText('N', w - 30, 30);
    ctx.strokeStyle = '#57524a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w - 25, 38);
    ctx.lineTo(w - 25, 58);
    ctx.stroke();
  },
};
