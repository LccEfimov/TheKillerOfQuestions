const hypotheses = ['H1', 'H2', 'H3'];
const weights = {
  H1: { identity_bridge: 1.1, multi_actor: 1.4, memory_load: 0.2, negligence_signal: 0.1, anti_negligence: 0.2, evidence_chain: 0.5, uncertainty: 0.4, bias: 0.1 },
  H2: { identity_bridge: 0.2, multi_actor: 0.4, memory_load: 1.5, negligence_signal: 0.3, anti_negligence: -0.5, evidence_chain: 0.4, uncertainty: 1.0, bias: 0.2 },
  H3: { identity_bridge: 0.1, multi_actor: 0.1, memory_load: 0.3, negligence_signal: 1.6, anti_negligence: -1.0, evidence_chain: 0.3, uncertainty: 0.4, bias: 0.15 }
};

export function scoreHypotheses(features) {
  const scores = {};
  for (const h of hypotheses) {
    scores[h] = weights[h].bias + Object.entries(features).reduce((acc, [k, v]) => acc + (weights[h][k] ?? 0) * v, 0);
  }
  const exp = Object.fromEntries(hypotheses.map((h) => [h, Math.exp(scores[h])]));
  const z = hypotheses.reduce((acc, h) => acc + exp[h], 0);
  const probs = Object.fromEntries(hypotheses.map((h) => [h, exp[h] / z]));
  return { scores, probs };
}

export function counterfactual(features) {
  const base = scoreHypotheses(features).probs;
  const out = {};
  for (const key of Object.keys(features)) {
    const without = { ...features, [key]: 0 };
    const next = scoreHypotheses(without).probs;
    out[key] = Object.fromEntries(Object.keys(base).map((h) => [h, base[h] - next[h]]));
  }
  return out;
}
