import test from 'node:test';
import assert from 'node:assert/strict';
import { runAnalysis } from '../src/analyze.js';

test('analysis payload contains required top-level fields', () => {
  const result = runAnalysis('Я проверил факты, но возможно команда перегружена и контекст потерян.');
  for (const field of ['hero', 'stats', 'scenarioBars', 'riskRadar', 'comparison', 'evidence', 'timeline', 'pipeline', 'scene', 'conclusion', 'protection', 'native']) {
    assert.ok(result[field], `missing field: ${field}`);
  }
});

test('scenario probabilities sum approximately to 1', () => {
  const result = runAnalysis('Возможно это усталость и перегруз, хотя часть данных подтверждена фактами.');
  const sum = result.scenarioBars.reduce((acc, row) => acc + row.value, 0);
  assert.ok(Math.abs(sum - 1) < 0.02, `probability sum is ${sum}`);
});
