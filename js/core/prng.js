// PRNG déterministe : hash FNV-1a de la seed → générateur mulberry32.
// Même seed, même séquence — chaque œuvre est reproductible à l'identique.

function fnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function makeRand(seed) {
  let state = fnv1a(String(seed)) || 1;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let z = state;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

const SYLLABLES = ['ka', 'lu', 'mi', 'no', 're', 'sa', 'to', 'vé', 'zo', 'pi'];

export function randomSeed() {
  let out = '';
  for (let i = 0; i < 3; i++) {
    out += SYLLABLES[Math.floor(Math.random() * SYLLABLES.length)];
  }
  return out + '-' + Math.floor(Math.random() * 100);
}
