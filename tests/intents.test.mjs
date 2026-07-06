import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, matchIntent, INTENTS } from '../js/core/intents.js';

test('normalize retire accents et casse', () => {
  assert.equal(normalize('Surprends-MOI, Médiateur !'), 'surprends-moi, mediateur !');
});

test('matching par mots-clés', () => {
  assert.equal(matchIntent('surprends moi', INTENTS).id, 'surprise');
  assert.equal(matchIntent("c'est quoi genuary ?", INTENTS).id, 'genuary');
  assert.equal(matchIntent('ton œuvre préférée ?', INTENTS).id, 'favori');
  assert.equal(matchIntent('blorp blorp', INTENTS).id, 'fallback');
});

test('chaque intent a ≥ 2 réponses et le fallback existe', () => {
  assert.ok(INTENTS.some(i => i.id === 'fallback'));
  for (const i of INTENTS) assert.ok(i.responses.length >= 2, i.id);
});
