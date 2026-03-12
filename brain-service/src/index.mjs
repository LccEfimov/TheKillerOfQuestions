import express from 'express';
import { AnalyzeRequest } from './schemas/request.mjs';
import { requiredKeys } from './schemas/response.mjs';
import { runAnalysis } from './analysis.mjs';

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.get('/api/native-summary', (_, res) => res.json({ status: 'available', platform: process.platform, threads: 4, cwd: process.cwd() }));
app.get('/api/examples/:id', (req, res) => res.json({ id: req.params.id, message: 'example payload' }));
app.post('/api/analyze', async (req, res, next) => {
  try {
    const input = AnalyzeRequest.parse(req.body);
    const out = await runAnalysis(input, { status: 'available', platform: process.platform, threads: 4, cwd: process.cwd() });
    for (const k of requiredKeys) if (!(k in out)) throw new Error(`Missing ${k}`);
    res.json(out);
  } catch (error) {
    next(error);
  }
});
app.post('/api/export/secure', (req, res) => {
  const { container, protectedMode } = req.body || {};
  if (!protectedMode) return res.status(400).json({ error: 'protectedMode must be enabled' });
  if (!container?.ciphertext) return res.status(400).json({ error: 'invalid container' });
  res.json({ ok: true, stored: false, metadata: { receivedAt: new Date().toISOString(), payloadType: container.metadata?.payloadType || 'analysis' } });
});
app.use((err, _, res, __) => res.status(400).json({ error: err.message || 'bad request' }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.BRAIN_PORT || 8787;
  app.listen(port, () => console.log(`brain-service on :${port}`));
}

export default app;
