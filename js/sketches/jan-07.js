// jan-07 — « Tableur » — Use software that is not intended to create art or images.
// Un faux tableur dont la mise en forme conditionnelle peint un coucher de soleil.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const cols = 16;
    const rows = 22;
    const headerW = w * 0.055;
    const headerH = h * 0.045;
    const cw = (w - headerW) / cols;
    const ch = (h - headerH) / rows;

    // Fond + chrome du tableur
    ctx.fillStyle = '#f6f6f4';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e4e4e0';
    ctx.fillRect(0, 0, w, headerH);
    ctx.fillRect(0, 0, headerW, h);

    // Position du soleil et de l'horizon dans la grille
    const sunCol = 3 + rand() * (cols - 6);
    const sunRow = 5 + rand() * 6;
    const horizonRow = rows * 0.66;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = headerW + c * cw;
        const y = headerH + r * ch;
        let color;
        if (r > horizonRow) {
          // Mer sombre, plus dense vers le bas
          const f = (r - horizonRow) / (rows - horizonRow);
          color = `hsl(${248 - f * 10}, ${30 + f * 10}%, ${26 - f * 12}%)`;
        } else {
          // Ciel : chaud près du soleil, violet au loin
          const d = Math.min(1, Math.hypot(c - sunCol, (r - sunRow) * 1.6) / cols);
          const hue = 32 - d * 80; // 32 (orange) → -48 ≡ violet
          const light = 76 - d * 40;
          color = `hsl(${hue}, ${68 - d * 18}%, ${light}%)`;
        }
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cw - 1, ch - 1);
      }
    }

    // Le disque solaire : quelques cellules « sélectionnées »
    ctx.strokeStyle = '#1a6b3c';
    ctx.lineWidth = 2;
    ctx.strokeRect(headerW + (sunCol - 1) * cw, headerH + (sunRow - 1) * ch, cw * 2, ch * 2);

    // En-têtes A, B, C… et 1, 2, 3…
    ctx.fillStyle = '#6b6b66';
    ctx.font = `${Math.max(7, headerH * 0.42)}px ui-monospace, monospace`;
    ctx.textAlign = 'center';
    for (let c = 0; c < cols; c++) {
      ctx.fillText(String.fromCharCode(65 + c), headerW + c * cw + cw / 2, headerH * 0.68);
    }
    for (let r = 0; r < rows; r++) {
      ctx.fillText(String(r + 1), headerW / 2, headerH + r * ch + ch * 0.68);
    }

    // Quelques formules qui traînent
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    const formulas = ['=SUN(D6)', '=SKY($A1)', '=SEA(B19)', '=NOW()'];
    for (let i = 0; i < formulas.length; i++) {
      const c = Math.floor(rand() * cols);
      const r = Math.floor(rand() * rows);
      ctx.fillText(formulas[i], headerW + c * cw + 2, headerH + r * ch + ch * 0.66);
    }
    ctx.textAlign = 'start';
  },
};
