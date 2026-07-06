// jan-13 — « Triangulation » — Triangles and nothing else.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const n = 12;
    const cw = w / (n - 3);
    const ch = h / (n - 3);

    // Grille de sommets bousculés (débordant du cadre), avec une « hauteur »
    const pts = [];
    for (let gy = 0; gy < n; gy++) {
      pts.push([]);
      for (let gx = 0; gx < n; gx++) {
        pts[gy].push({
          x: (gx - 1.5) * cw + (rand() - 0.5) * cw * 0.7,
          y: (gy - 1.5) * ch + (rand() - 0.5) * ch * 0.7,
          z: rand(),
        });
      }
    }

    // Lumière rasante venant du haut-gauche
    const shade = (a, b, c) => {
      const dzx = (b.z - a.z) + (c.z - a.z);
      const dzy = (c.z - b.z);
      const light = 0.5 + dzx * 0.55 - dzy * 0.3;
      const l = Math.max(0.12, Math.min(0.92, light));
      return `hsl(${18 + l * 14}, ${38 + l * 18}%, ${18 + l * 46}%)`;
    };

    const tri = (a, b, c) => {
      ctx.fillStyle = shade(a, b, c);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    for (let gy = 0; gy < n - 1; gy++) {
      for (let gx = 0; gx < n - 1; gx++) {
        const p00 = pts[gy][gx];
        const p10 = pts[gy][gx + 1];
        const p01 = pts[gy + 1][gx];
        const p11 = pts[gy + 1][gx + 1];
        if (rand() < 0.5) {
          tri(p00, p10, p11);
          tri(p00, p11, p01);
        } else {
          tri(p00, p10, p01);
          tri(p10, p11, p01);
        }
      }
    }
  },
};
