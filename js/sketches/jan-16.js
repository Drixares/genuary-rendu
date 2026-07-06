// jan-16 — « Nuancier » — Generative palette.
// L'œuvre est la palette : 7 harmonies HSL dérivées de la seed, avec codes hex.

function hslToHex(hue, s, l) {
  const hh = ((hue % 360) + 360) % 360;
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = n => {
    const k = (n + hh / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default {
  animated: false,
  draw(ctx, w, h, rand) {
    ctx.fillStyle = '#f5f2ea';
    ctx.fillRect(0, 0, w, h);

    const base = rand() * 360;
    const sat = 45 + rand() * 35;
    // Harmonies : base, analogues, triade, complémentaire…
    const offsets = [0, 24, -24, 120, 180, 204, -120];
    const cols = offsets.length;
    const rows = 6;

    const m = Math.min(w, h) * 0.07;
    const gapX = 8;
    const gapY = 6;
    const chipW = (w - m * 2 - gapX * (cols - 1)) / cols;
    const chipH = (h - m * 2 - gapY * (rows - 1) - 14) / rows;

    ctx.textAlign = 'center';
    for (let c = 0; c < cols; c++) {
      const hue = base + offsets[c] + (rand() - 0.5) * 8;
      for (let r = 0; r < rows; r++) {
        const light = 88 - (r / (rows - 1)) * 66;
        const s = sat * (0.75 + rand() * 0.3);
        const hex = hslToHex(hue, s, light);
        const x = m + c * (chipW + gapX);
        const y = m + r * (chipH + gapY);
        ctx.fillStyle = hex;
        ctx.fillRect(x, y, chipW, chipH);
        // Code hex sous la pastille du bas, sinon dans la pastille si assez grande
        if (r === rows - 1) {
          ctx.fillStyle = '#57524a';
          ctx.font = `${Math.max(7, chipW * 0.16)}px ui-monospace, monospace`;
          ctx.fillText(hex, x + chipW / 2, y + chipH + 12);
        }
      }
    }
    ctx.textAlign = 'start';
  },
};
