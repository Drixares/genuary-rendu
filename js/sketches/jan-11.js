// jan-11 — « Jour impossible » — Impossible day.
// Triangle de Penrose : chaque poutre recouvre la suivante à un bout et passe
// dessous à l'autre. La boucle est fermée par un raccord repeint en dernier.
const SHADES = ['#e8e0cd', '#a89877', '#6b5d43'];

export default {
  animated: true,
  draw(ctx, w, h, rand, t) {
    const bgHue = (t * 6) % 360;
    ctx.fillStyle = `hsl(${bgHue}, 24%, 16%)`;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + h * 0.05;
    const R = Math.min(w, h) * 0.4;
    const s = R * 0.22; // épaisseur des poutres

    const corner = k => {
      const a = -Math.PI / 2 + (k * Math.PI * 2) / 3;
      return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
    };
    const O = [corner(0), corner(1), corner(2)];

    const unit = (a, b) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
    };
    // Normale du segment ab pointant vers le centre du triangle
    const inward = (a, b) => {
      const u = unit(a, b);
      let n = [-u[1], u[0]];
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2;
      if (n[0] * (cx - mx) + n[1] * (cy - my) < 0) n = [-n[0], -n[1]];
      return n;
    };
    // Intersection des droites (p + t·u) et (q + s·v)
    const inter = (p, u, q, v) => {
      const d = u[0] * v[1] - u[1] * v[0];
      const k = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / d;
      return [p[0] + u[0] * k, p[1] + u[1] * k];
    };

    // Poutre k : côté O[k] → O[k+1], avec un talon qui s'avance sur le côté suivant.
    const traceBeam = k => {
      const A = O[k];
      const B = O[(k + 1) % 3];
      const C = O[(k + 2) % 3];
      const uAB = unit(A, B);
      const uBC = unit(B, C);
      const nAB = inward(A, B);
      const nBC = inward(B, C);
      const innerA = [A[0] + nAB[0] * s, A[1] + nAB[1] * s];
      const innerB = inter(innerA, uAB, [B[0] + nBC[0] * s, B[1] + nBC[1] * s], uBC);
      const stubOut = [B[0] + uBC[0] * s * 2.4, B[1] + uBC[1] * s * 2.4];
      const stubIn = [stubOut[0] + nBC[0] * s, stubOut[1] + nBC[1] * s];
      ctx.beginPath();
      ctx.moveTo(A[0], A[1]);
      ctx.lineTo(B[0], B[1]);
      ctx.lineTo(stubOut[0], stubOut[1]);
      ctx.lineTo(stubIn[0], stubIn[1]);
      ctx.lineTo(innerB[0], innerB[1]);
      ctx.lineTo(innerA[0], innerA[1]);
      ctx.closePath();
    };

    // Ordre 2, 1, 0 : chaque talon recouvre le départ de la poutre suivante…
    for (const k of [2, 1, 0]) {
      traceBeam(k);
      ctx.fillStyle = SHADES[k];
      ctx.fill();
    }
    // …sauf celui de la poutre 2, repeint par-dessus la poutre 0 pour fermer la boucle.
    ctx.save();
    ctx.beginPath();
    ctx.arc(O[0][0], O[0][1], s * 2.6, 0, Math.PI * 2);
    ctx.clip();
    traceBeam(2);
    ctx.fillStyle = SHADES[2];
    ctx.fill();
    ctx.restore();
  },
};
