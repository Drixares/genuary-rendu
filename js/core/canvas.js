import { makeRand } from './prng.js';

export function computeBackingSize(cssWidth, cssHeight, rawDpr) {
  const dpr = Math.min(3, Math.max(1, rawDpr || 1));
  return { width: Math.round(cssWidth * dpr), height: Math.round(cssHeight * dpr), dpr };
}

export function fitCanvas(canvas, cssWidth, cssHeight) {
  const { width, height, dpr } = computeBackingSize(cssWidth, cssHeight, globalThis.devicePixelRatio);
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Rend un sketch dans un canvas. Retourne { stop } pour couper la boucle
// avant de démonter la vue (sinon les rAF s'accumulent en naviguant).
export function runSketch(canvas, sketch, { seed, cssWidth, cssHeight, animate = true, at = 0 } = {}) {
  const ctx = fitCanvas(canvas, cssWidth, cssHeight);
  const frame = t => sketch.draw(ctx, cssWidth, cssHeight, makeRand(seed), t);

  if (!sketch.animated || !animate || prefersReducedMotion()) {
    frame(sketch.animated ? at : 0);
    return { stop() {} };
  }

  let rafId = 0;
  const start = performance.now();
  const tick = now => {
    frame((now - start) / 1000);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
  return { stop: () => cancelAnimationFrame(rafId) };
}
