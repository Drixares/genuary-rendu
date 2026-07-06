// jan-15 — « Tapis » — Design a rug.
// Un quadrant est dessiné, puis reflété quatre fois, comme au métier à tisser.
const WOOL = ['#8c2f21', '#2c3a5e', '#e8dfc8', '#c8963c', '#5b3a4e'];

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = WOOL[0];
    ctx.fillRect(0, 0, w, h);

    const mx = w * 0.06; // marge pour les franges
    const my = h * 0.08;
    const rw = w - mx * 2;
    const rh = h - my * 2;

    // Dessine un rectangle en symétrie ×4 (coordonnées relatives au quadrant)
    const rect4 = (x, y, rww, rhh, fill) => {
      ctx.fillStyle = fill;
      ctx.fillRect(mx + x, my + y, rww, rhh);
      ctx.fillRect(mx + rw - x - rww, my + y, rww, rhh);
      ctx.fillRect(mx + x, my + rh - y - rhh, rww, rhh);
      ctx.fillRect(mx + rw - x - rww, my + rh - y - rhh, rww, rhh);
    };
    // Losange en symétrie ×4
    const diamond4 = (x, y, s, fill) => {
      for (const [px, py] of [
        [mx + x, my + y], [mx + rw - x, my + y],
        [mx + x, my + rh - y], [mx + rw - x, my + rh - y],
      ]) {
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.moveTo(px, py - s);
        ctx.lineTo(px + s, py);
        ctx.lineTo(px, py + s);
        ctx.lineTo(px - s, py);
        ctx.closePath();
        ctx.fill();
      }
    };

    // Bordures concentriques
    let inset = 0;
    const bands = 3 + Math.floor(rand() * 3);
    for (let b = 0; b < bands; b++) {
      const bandW = rw * (0.025 + rand() * 0.035);
      const color = WOOL[1 + Math.floor(rand() * (WOOL.length - 1))];
      rect4(inset, inset, rw / 2 - inset, bandW, color);              // haut/bas
      rect4(inset, inset, bandW, rh / 2 - inset, color);              // gauche/droite
      inset += bandW + rw * 0.018;
    }

    // Champ central
    ctx.fillStyle = WOOL[2];
    ctx.fillRect(mx + inset, my + inset, rw - inset * 2, rh - inset * 2);

    // Semis de losanges dans le champ
    const rowsD = 2 + Math.floor(rand() * 3);
    for (let r = 0; r < rowsD; r++) {
      const y = inset + (rh / 2 - inset) * ((r + 1) / (rowsD + 0.5));
      const colsD = 2 + Math.floor(rand() * 3);
      for (let c = 0; c < colsD; c++) {
        const x = inset + (rw / 2 - inset) * ((c + 1) / (colsD + 0.5));
        const s = Math.min(rw, rh) * (0.02 + rand() * 0.035);
        diamond4(x, y, s, WOOL[(r + c) % 2 ? 1 : 3]);
        diamond4(x, y, s * 0.45, WOOL[(r + c) % 2 ? 3 : 4]);
      }
    }
    // Médaillon central
    diamond4(rw / 2, rh / 2, Math.min(rw, rh) * 0.12, WOOL[1]);
    diamond4(rw / 2, rh / 2, Math.min(rw, rh) * 0.07, WOOL[3]);
    diamond4(rw / 2, rh / 2, Math.min(rw, rh) * 0.03, WOOL[2]);

    // Franges haut et bas
    ctx.strokeStyle = '#d9cfb4';
    ctx.lineWidth = 2;
    for (let x = mx; x <= w - mx; x += 7) {
      ctx.beginPath();
      ctx.moveTo(x, my);
      ctx.lineTo(x + (rand() - 0.5) * 4, my - h * 0.05);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, h - my);
      ctx.lineTo(x + (rand() - 0.5) * 4, h - my + h * 0.05);
      ctx.stroke();
    }
  },
};
