// jan-02 — « Strates » — Layers upon layers upon layers.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const layers = 36;
    ctx.fillStyle = '#e8ddca';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.85;
    for (let i = 0; i < layers; i++) {
      const depth = i / (layers - 1); // 0 = fond (ciel), 1 = premier plan
      const baseY = h * (0.12 + depth * 0.88);
      // Teinte : du ciel pâle (fond) au brun profond (avant)
      const hue = 36 - depth * 16;
      const sat = 22 + depth * 38;
      const light = 78 - depth * 58;
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
      ctx.beginPath();
      ctx.moveTo(0, h);
      let y = baseY;
      for (let x = 0; x <= w; x += 8) {
        y += (rand() - 0.5) * 9;
        y = Math.min(baseY + 26, Math.max(baseY - 26, y));
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },
};
