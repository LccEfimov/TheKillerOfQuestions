import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { analyzeText, exportProtected } from './api';
import { encryptPayload } from './security';
import { useAnalysisForm } from './hooks/useAnalysisForm';
import { useProtectedMode } from './hooks/useProtectedMode';
import { useAsyncTask } from './hooks/useAsyncTask';
import { validateText } from './lib/validators';
import { SceneGraph } from './scenes/SceneGraph';
import { HeroPanel, InputPanel, ModeSwitches, StatsGrid, HypothesisChart, RiskRadar, EvidenceRegistry, PipelineView, TimelineView, ComparisonTable, ConclusionPanel, DiagnosticsPanel, ExportPanel, ErrorBanner, LoadingOverlay } from './components';
export function App() {
    const form = useAnalysisForm();
    const pm = useProtectedMode();
    const task = useAsyncTask();
    const [data, setData] = useState({ hero: { title: 'Analytical Lab', summary: 'ready' } });
    const run = () => task.run(async () => { if (!validateText(form.text))
        throw new Error('Input too short'); setData(await analyzeText({ text: form.text, mode: form.context, protectedMode: pm.enabled })); });
    const onExport = () => task.run(async () => { const container = await encryptPayload(data, 'demo-passphrase'); await exportProtected({ container, protectedMode: pm.enabled }); });
    return _jsxs("main", { children: [_jsx(HeroPanel, { hero: data.hero }), _jsx(InputPanel, { text: form.text, setText: form.setText }), _jsx("button", { onClick: run, children: "Analyze" }), _jsx(ModeSwitches, { protectedMode: pm.enabled, toggle: pm.toggle }), pm.enabled && _jsx("p", { children: "Protected mode enabled" }), _jsx(ErrorBanner, { error: task.error }), _jsx(LoadingOverlay, { loading: task.loading }), _jsx(StatsGrid, { stats: data.stats || [] }), _jsx(HypothesisChart, { scenarioBars: data.scenarioBars || [] }), _jsx(RiskRadar, { riskRadar: data.riskRadar || [] }), _jsx(EvidenceRegistry, { evidence: data.evidence || [] }), _jsx(PipelineView, { pipeline: data.pipeline || [] }), _jsx(TimelineView, { timeline: data.timeline || [] }), _jsx(ComparisonTable, { comparison: data.comparison || [] }), _jsx(ConclusionPanel, { conclusion: data.conclusion || {} }), _jsx(SceneGraph, { nodes: data.scene?.nodes || [] }), _jsx(DiagnosticsPanel, { native: data.native || {} }), _jsx(ExportPanel, { onExport: onExport })] });
}
