import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EXHIBITION, getEntry, dayToId } from '../js/data/exhibition.js';
import { CONFIG } from '../js/data/config.js';

test('31 entrées, jours 1..31, ids jan-NN uniques et ordonnés', () => {
  assert.equal(EXHIBITION.length, 31);
  EXHIBITION.forEach((e, i) => {
    assert.equal(e.day, i + 1);
    assert.equal(e.id, `jan-${String(i + 1).padStart(2, '0')}`);
  });
});

test('chaque entrée est complète', () => {
  for (const e of EXHIBITION) {
    for (const field of ['prompt', 'promptCredit', 'title', 'note', 'technique']) {
      assert.ok(typeof e[field] === 'string' && e[field].length > 0, `${e.id}.${field}`);
    }
    assert.ok(Array.isArray(e.tags) && e.tags.length >= 2, `${e.id}.tags`);
  }
});

test('prompts officiels vérifiés par échantillon', () => {
  assert.equal(getEntry('jan-01').prompt, 'Vertical or horizontal lines only.');
  assert.equal(getEntry('jan-17').prompt, 'What happens if pi=4?');
  assert.equal(getEntry('jan-31').prompt, 'Pixel sorting.');
});

test('helpers et config', () => {
  assert.equal(dayToId(7), 'jan-07');
  assert.equal(getEntry('nope'), undefined);
  assert.ok(EXHIBITION.some(e => e.id === CONFIG.favoriteId));
  assert.equal(CONFIG.githubUrl, 'https://github.com/Drixares');
});
