const sigmoid = (x) => 1 / (1 + Math.exp(-x));

export function riskModel(features) {
  const overall = sigmoid(-1 + 1.2 * features.negligence_signal + 0.8 * features.uncertainty + 0.4 * features.multi_actor - 0.7 * features.anti_negligence);
  return { overall, uncertainty: features.uncertainty, operational: Math.min(1, (features.memory_load + features.evidence_chain) / 2) };
}
