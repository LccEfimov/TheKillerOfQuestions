export function normalizeInput(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export function extractEvidence(text) {
  return normalizeInput(text)
    .split('.')
    .filter(Boolean)
    .slice(0, 5)
    .map((t, i) => ({ id: i + 1, text: t.trim() }));
}

export function extractFeatures(text) {
  const t = normalizeInput(text).toLowerCase();
  const len = Math.min(1, t.length / 600);
  const questions = (t.match(/\?/g) || []).length;
  return {
    identity_bridge: /(same|alias|account)/.test(t) ? 0.8 : 0.3,
    multi_actor: /(they|team|people|different)/.test(t) ? 0.75 : 0.35,
    memory_load: Math.min(1, 0.2 + len * 0.8),
    negligence_signal: /(ignore|late|careless|negligent)/.test(t) ? 0.8 : 0.25,
    anti_negligence: /(documented|verified|double-check)/.test(t) ? 0.8 : 0.4,
    evidence_chain: Math.min(1, 0.2 + questions * 0.2),
    uncertainty: /(maybe|unclear|unknown|possibly)/.test(t) ? 0.7 : 0.3
  };
}
