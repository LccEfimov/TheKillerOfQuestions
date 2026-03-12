import { normalizeInput, extractEvidence, extractFeatures } from './modules/parsers/index.mjs';
import { scoreHypotheses, counterfactual } from './modules/scoring/index.mjs';
import { riskModel } from './modules/risks/index.mjs';
import { buildNarrative } from './modules/narrative/index.mjs';
import { buildProtectionMetadata } from './modules/exporters/index.mjs';

export async function runAnalysis(input, native = { status: 'native-unavailable' }) {
  const clean = normalizeInput(input.text);
  const evidence = extractEvidence(clean);
  const features = extractFeatures(clean);
  const { probs } = scoreHypotheses(features);
  const risks = riskModel(features);
  const deltas = counterfactual(features);
  const conclusion = buildNarrative({ probs, evidence });
  return {
    hero: { title: 'Analytical cockpit', summary: 'Explainable scenario scoring' },
    stats: Object.entries(features).map(([label, value]) => ({ label, value })),
    scenarioBars: Object.entries(probs).map(([id, value]) => ({ id, value })),
    riskRadar: [{ axis: 'overall', value: risks.overall }, { axis: 'uncertainty', value: risks.uncertainty }, { axis: 'operational', value: risks.operational }],
    comparison: Object.entries(deltas).map(([metric, d]) => ({ metric, baseline: d.H1, alternate: d.H3 })),
    evidence,
    timeline: conclusion.steps.map((step, i) => ({ step, time: i + 1 })),
    pipeline: conclusion.steps,
    scene: { nodes: [{ id: 'input' }, { id: 'features' }, { id: 'hypotheses' }], edges: [['input', 'features'], ['features', 'hypotheses']] },
    conclusion,
    protection: buildProtectionMetadata(input.protectedMode),
    native,
    report: { features, hypotheses: probs, risks, conclusion }
  };
}
