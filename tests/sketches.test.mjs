import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SKETCHES } from '../js/sketches/index.js';
import { EXHIBITION } from '../js/data/exhibition.js';

test('registre complet et conforme au contrat', () => {
  assert.equal(SKETCHES.size, 31);
  for (const e of EXHIBITION) {
    const s = SKETCHES.get(e.id);
    assert.ok(s, `sketch manquant : ${e.id}`);
    assert.equal(typeof s.animated, 'boolean', `${e.id}.animated`);
    assert.equal(typeof s.draw, 'function', `${e.id}.draw`);
    assert.ok(s.draw.length >= 4, `${e.id}.draw doit accepter (ctx, w, h, rand[, t])`);
  }
});
