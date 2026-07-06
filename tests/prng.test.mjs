import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRand, randomSeed } from '../js/core/prng.js';

test('même seed ⇒ même séquence', () => {
  const a = makeRand('jan-07');
  const b = makeRand('jan-07');
  for (let i = 0; i < 100; i++) assert.equal(a(), b());
});

test('seeds différents ⇒ séquences différentes', () => {
  const a = makeRand('jan-07');
  const b = makeRand('jan-08');
  const same = Array.from({ length: 20 }, () => a() === b());
  assert.ok(same.includes(false));
});

test('valeurs dans [0, 1) et variées', () => {
  const rand = makeRand('spread');
  const values = Array.from({ length: 1000 }, rand);
  assert.ok(values.every(v => v >= 0 && v < 1));
  assert.ok(new Set(values.map(v => v.toFixed(3))).size > 500);
});

test('randomSeed produit des seeds distincts et non vides', () => {
  const s1 = randomSeed();
  const s2 = randomSeed();
  assert.ok(s1.length >= 4);
  assert.notEqual(s1, s2);
});
