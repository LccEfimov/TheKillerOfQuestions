export function buildNarrative({ probs, evidence }) {
  const top = Object.entries(probs).sort((a, b) => b[1] - a[1])[0];
  return {
    summary: `Most likely ${top[0]} (${(top[1] * 100).toFixed(1)}%).`,
    steps: ['normalize', 'extract-features', 'score', 'risk', 'narrative'],
    recommendations: ['Collect stronger evidence chain', 'Reduce uncertainty by adding timestamps'],
    caveats: ['Heuristic local model'],
    evidenceBacked: evidence.length > 0
  };
}
