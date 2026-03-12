export function buildProtectionMetadata(enabled) {
  return { protectedMode: !!enabled, format: 'lccsec.json', algorithm: 'AES-256-GCM', kdf: 'PBKDF2-SHA-256' };
}
export const exportJson = (report) => JSON.stringify(report, null, 2);
export const exportMd = (report) => `# Report\n\n${report.conclusion.summary}`;
export const exportHtml = (report) => `<h1>Report</h1><p>${report.conclusion.summary}</p>`;
