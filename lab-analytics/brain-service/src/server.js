import express from 'express';
import { runAnalysis } from './analyze.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'brain-service' });
});

app.post('/analyze', (req, res) => {
  const { text, protectedMode = false } = req.body ?? {};

  if (typeof text !== 'string' || text.trim().length < 10) {
    return res.status(400).json({
      error: 'validation_error',
      message: 'Text must be a string with at least 10 characters.'
    });
  }

  return res.json(runAnalysis(text, Boolean(protectedMode)));
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`brain-service listening on :${port}`);
});
