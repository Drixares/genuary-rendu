import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeBackingSize } from '../js/core/canvas.js';

test('computeBackingSize applique le DPR borné à [1, 3]', () => {
  assert.deepEqual(computeBackingSize(400, 300, 2), { width: 800, height: 600, dpr: 2 });
  assert.deepEqual(computeBackingSize(400, 300, 0.5), { width: 400, height: 300, dpr: 1 });
  assert.deepEqual(computeBackingSize(400, 300, 5), { width: 1200, height: 900, dpr: 3 });
});
