// jan-31 — « Tri de pixels » — Pixel sorting.
// Des bandes de bruit coloré, puis des segments horizontaux triés par
// luminance via ImageData. Le glitch le plus ordonné qui soit.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const iw = Math.max(1, Math.floor(w));
    const ih = Math.max(1, Math.floor(h));
    const img = new Uint8ClampedArray(iw * ih * 4);

    // 1. Bandes horizontales de bruit coloré (teinte par bande)
    let y = 0;
    while (y < ih) {
      const bandH = 8 + Math.floor(rand() * 40);
      const hue = rand() * 360;
      for (let yy = y; yy < Math.min(ih, y + bandH); yy++) {
        for (let x = 0; x < iw; x++) {
          const p = (yy * iw + x) * 4;
          const light = 20 + rand() * 70;
          const sat = 30 + rand() * 60;
          // HSL → RGB rapide (formule compacte)
          const a = (sat / 100) * Math.min(light / 100, 1 - light / 100);
          const f = n => {
            const k = (n + hue / 30) % 12;
            return Math.round(255 * (light / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
          };
          img[p] = f(0); img[p + 1] = f(8); img[p + 2] = f(4); img[p + 3] = 255;
        }
      }
      y += bandH;
    }

    // 2. Tri de segments horizontaux par luminance
    const lum = p => img[p] * 0.299 + img[p + 1] * 0.587 + img[p + 2] * 0.114;
    for (let yy = 0; yy < ih; yy++) {
      let x = 0;
      while (x < iw) {
        if (rand() < 0.4) { x += Math.floor(rand() * 30); continue; }
        const segLen = Math.min(iw - x, 30 + Math.floor(rand() * rand() * (iw * 0.7)));
        const row = yy * iw;
        const seg = [];
        for (let k = 0; k < segLen; k++) {
          const p = (row + x + k) * 4;
          seg.push([img[p], img[p + 1], img[p + 2], lum(p)]);
        }
        seg.sort((a, b) => a[3] - b[3]);
        for (let k = 0; k < segLen; k++) {
          const p = (row + x + k) * 4;
          img[p] = seg[k][0]; img[p + 1] = seg[k][1]; img[p + 2] = seg[k][2];
        }
        x += segLen;
      }
    }

    const buffer = new OffscreenCanvas(iw, ih);
    const bctx = buffer.getContext('2d');
    bctx.putImageData(new ImageData(img, iw, ih), 0, 0);
    ctx.drawImage(buffer, 0, 0, w, h);
  },
};
