import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../../brain-service/src/index.mjs';
import { extractFeatures } from '../../brain-service/src/modules/parsers/index.mjs';
import { scoreHypotheses } from '../../brain-service/src/modules/scoring/index.mjs';

describe('brain service', () => {
  test('health works', async () => { const r = await request(app).get('/health'); expect(r.status).toBe(200); });
  test('features normalized and softmax', () => {
    const f = extractFeatures('same account maybe different people and documented checks. why late?');
    Object.values(f).forEach((v) => expect(v).toBeGreaterThanOrEqual(0));
    Object.values(f).forEach((v) => expect(v).toBeLessThanOrEqual(1));
    const probs = scoreHypotheses(f).probs;
    const sum = Object.values(probs).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - 1)).toBeLessThan(1e-9);
  });
  test('analyze payload', async () => {
    const r = await request(app).post('/api/analyze').send({ text: 'same account maybe different people and documented checks. why late and unclear handoffs?' });
    expect(r.status).toBe(200);
    expect(r.body.hero).toBeTruthy();
    expect(r.body.protection).toBeTruthy();
  });
});
