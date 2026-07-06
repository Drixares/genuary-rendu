import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash } from '../js/router.js';

test('plan par défaut', () => {
  assert.deepEqual(parseHash(''), { view: 'plan' });
  assert.deepEqual(parseHash('#/'), { view: 'plan' });
  assert.deepEqual(parseHash('#nimporte'), { view: 'plan' });
});

test('salles', () => {
  assert.deepEqual(parseHash('#/jour/07'), { view: 'room', day: 7 });
  assert.deepEqual(parseHash('#/jour/31'), { view: 'room', day: 31 });
  assert.deepEqual(parseHash('#/jour/0'), { view: 'plan' });
  assert.deepEqual(parseHash('#/jour/32'), { view: 'plan' });
  assert.deepEqual(parseHash('#/jour/abc'), { view: 'plan' });
});

test('pages', () => {
  assert.deepEqual(parseHash('#/artiste'), { view: 'page', page: 'artiste' });
  assert.deepEqual(parseHash('#/livret'), { view: 'page', page: 'livret' });
  assert.deepEqual(parseHash('#/autre'), { view: 'plan' });
});
