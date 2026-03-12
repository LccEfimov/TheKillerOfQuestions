const REQUIRED_FEATURES = [
  'identity_bridge',
  'multi_actor',
  'memory_load',
  'negligence_signal',
  'anti_negligence',
  'evidence_chain',
  'uncertainty'
];

const HYPOTHESES = [
  { id: 'H1', title: 'Different actors / account contexts' },
  { id: 'H2', title: 'Context loss due to overload' },
  { id: 'H3', title: 'Negligence / unprofessional behavior' }
];

const WEIGHTS = {
  H1: { identity_bridge: 0.9, multi_actor: 0.8, memory_load: 0.2, negligence_signal: 0.1, anti_negligence: -0.4, evidence_chain: 0.5, uncertainty: 0.3 },
  H2: { identity_bridge: 0.1, multi_actor: 0.2, memory_load: 0.8, negligence_signal: 0.3, anti_negligence: -0.2, evidence_chain: 0.6, uncertainty: 0.4 },
  H3: { identity_bridge: 0.0, multi_actor: 0.1, memory_load: 0.3, negligence_signal: 1.0, anti_negligence: -0.9, evidence_chain: 0.4, uncertainty: 0.2 }
};

const BIAS = { H1: -0.1, H2: -0.05, H3: -0.15 };

const clamp01 = (n) => Math.max(0, Math.min(1, n));

export function normalizeInput(raw) {
  return String(raw || '').replace(/\s+/g, ' ').trim();
}

export function extractFeatures(text) {
  const t = text.toLowerCase();
  const len = Math.max(text.length, 1);
  const count = (tokens) => tokens.reduce((acc, tk) => acc + (t.match(new RegExp(tk, 'g')) || []).length, 0);

  const features = {
    identity_bridge: clamp01(count(['я ', 'он ', 'она ', 'они ', 'мы ']) / 12),
    multi_actor: clamp01(count(['кто', 'они', 'команда', 'пользователь', 'менеджер']) / 8),
    memory_load: clamp01(count(['устал', 'забыл', 'перегруз', 'много задач']) / 5),
    negligence_signal: clamp01(count(['безразлич', 'неважно', 'плевать', 'забей']) / 4),
    anti_negligence: clamp01(count(['проверил', 'уточнил', 'внимательно', 'ответственно']) / 6),
    evidence_chain: clamp01(count(['потому', 'следовательно', 'факт', 'доказ']) / 7),
    uncertainty: clamp01(count(['возможно', 'наверное', 'кажется', 'не уверен']) / 8)
  };

  if (len > 1200) {
    features.memory_load = clamp01(features.memory_load + 0.12);
    features.uncertainty = clamp01(features.uncertainty + 0.08);
  }

  return features;
}

function softmax(scores) {
  const max = Math.max(...Object.values(scores));
  const exp = Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, Math.exp(v - max)]));
  const total = Object.values(exp).reduce((a, b) => a + b, 0);
  return Object.fromEntries(Object.entries(exp).map(([k, v]) => [k, v / total]));
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export function runAnalysis(rawText, protectedMode = false) {
  const text = normalizeInput(rawText);
  const features = extractFeatures(text);

  const scores = {};
  for (const h of HYPOTHESES) {
    scores[h.id] = BIAS[h.id] + REQUIRED_FEATURES.reduce((acc, f) => acc + WEIGHTS[h.id][f] * features[f], 0);
  }

  const probs = softmax(scores);
  const riskValue = sigmoid(-0.3 + REQUIRED_FEATURES.reduce((a, f) => a + (f === 'anti_negligence' ? -0.5 : 0.4) * features[f], 0));

  const top = Object.entries(probs).sort((a, b) => b[1] - a[1])[0];

  return {
    hero: {
      title: 'Lexical Cognitive Cockpit',
      subtitle: 'Explainable scenario analysis for text evidence',
      dominantHypothesis: top[0],
      dominantProbability: Number(top[1].toFixed(4))
    },
    stats: REQUIRED_FEATURES.map((name) => ({ name, value: Number(features[name].toFixed(4)) })),
    scenarioBars: Object.entries(probs).map(([id, value]) => ({ id, value: Number(value.toFixed(4)) })),
    riskRadar: [
      { axis: 'Systemic risk', value: Number(riskValue.toFixed(4)) },
      { axis: 'Uncertainty', value: Number(features.uncertainty.toFixed(4)) },
      { axis: 'Evidence quality', value: Number(features.evidence_chain.toFixed(4)) }
    ],
    comparison: HYPOTHESES.map((h) => ({ id: h.id, title: h.title, score: Number(scores[h.id].toFixed(4)), probability: Number(probs[h.id].toFixed(4)) })),
    evidence: text.split(/[.!?]/).map((chunk, idx) => chunk.trim()).filter(Boolean).slice(0, 6).map((fragment, idx) => ({ id: `ev-${idx + 1}`, fragment })),
    timeline: [
      { step: 'input_normalization', status: 'done' },
      { step: 'feature_extraction', status: 'done' },
      { step: 'hypothesis_scoring', status: 'done' },
      { step: 'risk_estimation', status: 'done' }
    ],
    pipeline: [
      'Normalize input',
      'Extract required features',
      'Apply weighted linear scenario model',
      'Softmax posterior computation',
      'Risk sigmoid scoring',
      'Assemble explainable payload'
    ],
    scene: {
      nodes: REQUIRED_FEATURES.map((f) => ({ id: f, weight: Number(features[f].toFixed(4)) })),
      edges: [
        { from: 'identity_bridge', to: 'H1' },
        { from: 'memory_load', to: 'H2' },
        { from: 'negligence_signal', to: 'H3' }
      ]
    },
    conclusion: {
      narrative: `Most likely scenario: ${top[0]} with probability ${top[1].toFixed(2)}. Risk index is ${riskValue.toFixed(2)}.`
    },
    protection: {
      protectedMode,
      transport: protectedMode ? 'client-side-encrypted' : 'plaintext-for-analysis',
      container: '.lccsec.json'
    },
    native: {
      source: 'native-guard-placeholder',
      status: 'not-attached-in-dev'
    }
  };
}
