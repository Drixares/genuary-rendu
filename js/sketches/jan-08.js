// jan-08 — « Un million » — Draw one million of something.
// 1 000 000 de points accumulés dans une spirale galactique, via ImageData.
export default {
  animated: false,
  draw(ctx, w, h, rand) {
    const iw = Math.max(1, Math.floor(w));
    const ih = Math.max(1, Math.floor(h));
    const img = new Uint8ClampedArray(iw * ih * 4);

    // Fond nuit
    for (let i = 0; i < img.length; i += 4) {
      img[i] = 12; img[i + 1] = 12; img[i + 2] = 18; img[i + 3] = 255;
    }

    const cx = iw / 2;
    const cy = ih / 2;
    const maxR = Math.min(iw, ih) * 0.46;
    const arms = 3;
    const COUNT = 1_000_000;

    for (let i = 0; i < COUNT; i++) {
      const rr = Math.pow(rand(), 0.6);
      const arm = Math.floor(rand() * arms);
      const angle = rr * 4.2 + (arm / arms) * Math.PI * 2 + (rand() - 0.5) * (1.4 - rr * 0.8);
      const radius = rr * maxR * (0.8 + rand() * 0.4);
      const x = Math.round(cx + Math.cos(angle) * radius + (rand() - 0.5) * 14);
      const y = Math.round(cy + Math.sin(angle) * radius * 0.62 + (rand() - 0.5) * 14);
      if (x < 0 || x >= iw || y < 0 || y >= ih) continue;
      const p = (y * iw + x) * 4;
      // Accumulation additive douce : cœur chaud, bras froids
      const warm = 1 - rr;
      img[p] = Math.min(255, img[p] + 7 + warm * 10);
      img[p + 1] = Math.min(255, img[p + 1] + 6 + warm * 6);
      img[p + 2] = Math.min(255, img[p + 2] + 9);
    }

    const buffer = new OffscreenCanvas(iw, ih);
    const bctx = buffer.getContext('2d');
    bctx.putImageData(new ImageData(img, iw, ih), 0, 0);
    ctx.drawImage(buffer, 0, 0, w, h);
  },
};
