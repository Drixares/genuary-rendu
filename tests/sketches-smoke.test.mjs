// Smoke test : chaque sketch doit exécuter draw() sans lever d'exception,
// à t=0 et t=1.5, sur un contexte 2D factice. Ne vérifie pas le rendu visuel
// (fait au navigateur), mais attrape toute erreur d'exécution.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { makeRand } from '../js/core/prng.js';

function makeFakeCtx() {
  const gradient = { addColorStop() {} };
  const target = {
    canvas: {},
    measureText: () => ({ width: 10 }),
    createLinearGradient: () => gradient,
    createRadialGradient: () => gradient,
    createConicGradient: () => gradient,
    createPattern: () => ({}),
    getImageData: (x, y, w, h) => new globalThis.ImageData(w, h),
    createImageData: (w, h) => new globalThis.ImageData(w, h),
  };
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) return obj[prop];
      return () => undefined; // toute méthode inconnue est un no-op
    },
    set(obj, prop, value) { obj[prop] = value; return true; },
  });
}

// Shims des APIs navigateur utilisées par certains sketches (ImageData, OffscreenCanvas)
globalThis.ImageData ??= class ImageData {
  constructor(dataOrW, wOrH, h) {
    if (typeof dataOrW === 'object') {
      this.data = dataOrW; this.width = wOrH; this.height = h ?? (dataOrW.length / 4 / wOrH);
    } else {
      this.width = dataOrW; this.height = wOrH;
      this.data = new Uint8ClampedArray(dataOrW * wOrH * 4);
    }
  }
};
globalThis.OffscreenCanvas ??= class OffscreenCanvas {
  constructor(w, h) { this.width = w; this.height = h; }
  getContext() { return makeFakeCtx(); }
};

const files = readdirSync(new URL('../js/sketches', import.meta.url))
  .filter(f => /^jan-\d{2}\.js$/.test(f))
  .sort();

for (const file of files) {
  test(`${file} : draw() s'exécute sans erreur`, async () => {
    const mod = (await import(`../js/sketches/${file}`)).default;
    assert.equal(typeof mod.animated, 'boolean', `${file}: animated`);
    assert.equal(typeof mod.draw, 'function', `${file}: draw`);
    for (const t of [0, 1.5]) {
      mod.draw(makeFakeCtx(), 420, 420, makeRand(file), t);
    }
  });
}
