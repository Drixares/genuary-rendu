// jan-28 — « Défilement infini » — Infinite Scroll.
// Quatre colonnes de cartes qui montent sans fin, en boucle par modulo.
const CARD_TINTS = ['#dcd4c4', '#c9bfae', '#d4c8be', '#c2c8bd'];

export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    ctx.fillStyle = '#efeae0';
    ctx.fillRect(0, 0, w, h);

    const lanes = 4;
    const gap = w * 0.02;
    const laneW = (w - gap * (lanes + 1)) / lanes;

    for (let lane = 0; lane < lanes; lane++) {
      const x = gap + lane * (laneW + gap);
      const speed = 30 + rand() * 55; // px/s, propre à la voie
      // Cartes de la voie : hauteurs seedées, motif répété sur cycleH
      const cards = [];
      let yAcc = 0;
      for (let i = 0; i < 9; i++) {
        const ch = h * (0.1 + rand() * 0.16);
        cards.push({ y: yAcc, h: ch, tint: Math.floor(rand() * CARD_TINTS.length), deco: rand() });
        yAcc += ch + gap;
      }
      const cycleH = yAcc;
      const offset = (t * speed) % cycleH;

      for (const c of cards) {
        // Position bouclée : la carte réapparaît par le bas
        let y = ((c.y - offset) % cycleH + cycleH) % cycleH - c.h;
        if (y > h || y + c.h + cycleH < 0) continue;
        for (const yy of [y, y + cycleH]) {
          if (yy > h || yy + c.h < 0) continue;
          ctx.fillStyle = CARD_TINTS[c.tint];
          ctx.fillRect(x, yy, laneW, c.h);
          // Faux contenu : avatar + lignes de texte
          ctx.fillStyle = 'rgba(28, 26, 23, 0.5)';
          ctx.beginPath();
          ctx.arc(x + laneW * 0.12, yy + c.h * 0.2, laneW * 0.055, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(28, 26, 23, 0.35)';
          const lines = Math.max(1, Math.floor(c.h / 22) - 1);
          for (let l = 0; l < lines; l++) {
            const ly = yy + c.h * 0.36 + l * 14;
            if (ly + 5 > yy + c.h - 6) break;
            ctx.fillRect(x + laneW * 0.08, ly, laneW * (0.5 + ((c.deco * 7 + l) % 3) * 0.14), 5);
          }
          // Un « like » rouge de temps en temps
          if (c.deco > 0.72) {
            ctx.fillStyle = '#b5442c';
            ctx.fillRect(x + laneW * 0.08, yy + c.h - 14, 16, 5);
          }
        }
      }
    }

    // Voile de fondu haut/bas, comme un écran qu'on ne quitte plus
    const fade = ctx.createLinearGradient(0, 0, 0, h);
    fade.addColorStop(0, 'rgba(239, 234, 224, 1)');
    fade.addColorStop(0.12, 'rgba(239, 234, 224, 0)');
    fade.addColorStop(0.88, 'rgba(239, 234, 224, 0)');
    fade.addColorStop(1, 'rgba(239, 234, 224, 1)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, w, h);
  },
};
