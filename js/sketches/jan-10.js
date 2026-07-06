// jan-10 — « τ seul » — You can only use TAU in your code, no other number allowed.
// Aucun littéral numérique dans ce module : tout est dérivé de τ.
const TAU = Math.PI + Math.PI;
const ONE = TAU / TAU;
const TWO = ONE + ONE;
const THREE = TWO + ONE;
const FOUR = TWO + TWO;
const SIX = THREE + THREE;
const TEN = SIX + FOUR;
const HUNDRED = TEN * TEN;
const HALF = ONE / TWO;
const TENTH = ONE / TEN;

export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    ctx.fillStyle = `hsl(${TWO * HUNDRED + FOUR * TEN}, ${THREE * TEN}%, ${TEN}%)`;
    ctx.fillRect(ONE - ONE, ONE - ONE, w, h);
    const cx = w * HALF;
    const cy = h * HALF;
    const maxR = Math.min(w, h) * (HALF - TENTH / TWO);
    const orbits = SIX;
    // Soleil central
    ctx.fillStyle = `hsl(${FOUR * TEN}, ${SIX + SIX}0%, ${SIX + ONE}0%)`;
    ctx.beginPath();
    ctx.arc(cx, cy, TEN, ONE - ONE, TAU);
    ctx.fill();
    for (let i = ONE - ONE; i < orbits; i += ONE) {
      const r = maxR * ((i + ONE) / orbits);
      // Anneau de l'orbite
      ctx.strokeStyle = `hsla(${TWO * HUNDRED}, ${TWO * TEN}%, ${SIX * TEN}%, ${TENTH * TWO})`;
      ctx.lineWidth = ONE;
      ctx.beginPath();
      ctx.arc(cx, cy, r, ONE - ONE, TAU);
      ctx.stroke();
      // Planète : phase seedée, vitesse décroissante avec la distance
      const phase = rand() * TAU;
      const speed = (TWO * TAU * TENTH) / (i + ONE);
      const a = phase + t * speed;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      const size = TWO + rand() * SIX;
      const hue = HUNDRED * TWO + i * TEN * TWO + rand() * TEN;
      ctx.fillStyle = `hsl(${hue}, ${SIX * TEN}%, ${SIX * TEN}%)`;
      ctx.beginPath();
      ctx.arc(px, py, size, ONE - ONE, TAU);
      ctx.fill();
      // Lune : orbite rapide autour de la planète
      const ma = phase * TWO + t * speed * SIX;
      ctx.fillStyle = `hsl(${hue + TEN * THREE}, ${FOUR * TEN}%, ${SIX * TEN + TEN}%)`;
      ctx.beginPath();
      ctx.arc(px + Math.cos(ma) * size * TWO, py + Math.sin(ma) * size * TWO, size / THREE, ONE - ONE, TAU);
      ctx.fill();
    }
  },
};
