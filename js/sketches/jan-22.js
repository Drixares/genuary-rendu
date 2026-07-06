// jan-22 — « Dégradés » — Gradients only.
// Aucune couleur unie : uniquement des dégradés superposés en transparence.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    // Fond : premier dégradé vertical
    const base = ctx.createLinearGradient(0, 0, 0, h);
    const baseHue = rand() * 360;
    base.addColorStop(0, `hsl(${baseHue}, 45%, 82%)`);
    base.addColorStop(1, `hsl(${baseHue + 60}, 40%, 60%)`);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // Voiles linéaires
    for (let i = 0; i < 10; i++) {
      const angle = rand() * Math.PI * 2;
      const cx = w / 2 + Math.cos(angle) * w * 0.5;
      const cy = h / 2 + Math.sin(angle) * h * 0.5;
      const g = ctx.createLinearGradient(cx, cy, w - cx, h - cy);
      const hue = baseHue + (rand() - 0.5) * 160;
      g.addColorStop(0, `hsla(${hue}, ${50 + rand() * 30}%, ${45 + rand() * 35}%, ${0.25 + rand() * 0.3})`);
      g.addColorStop(0.5 + rand() * 0.3, `hsla(${hue + 40}, 45%, 60%, 0.05)`);
      g.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // Halos radiaux
    for (let i = 0; i < 4; i++) {
      const x = w * (0.15 + rand() * 0.7);
      const y = h * (0.15 + rand() * 0.7);
      const r = Math.min(w, h) * (0.18 + rand() * 0.3);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const hue = baseHue + (rand() - 0.5) * 120;
      g.addColorStop(0, `hsla(${hue}, 70%, ${60 + rand() * 25}%, ${0.35 + rand() * 0.3})`);
      g.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // Vignette douce (encore un dégradé)
    const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
    v.addColorStop(0, 'hsla(0, 0%, 0%, 0)');
    v.addColorStop(1, `hsla(${baseHue + 220}, 30%, 12%, 0.35)`);
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  },
};
