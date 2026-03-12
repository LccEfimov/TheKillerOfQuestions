import { useState } from 'react';
import { analyzeText, exportProtected } from './api';
import { encryptPayload } from './security';
import { useAnalysisForm } from './hooks/useAnalysisForm';
import { useProtectedMode } from './hooks/useProtectedMode';
import { useAsyncTask } from './hooks/useAsyncTask';
import { validateText } from './lib/validators';
import { SceneGraph } from './scenes/SceneGraph';
import { HeroPanel,InputPanel,ModeSwitches,StatsGrid,HypothesisChart,RiskRadar,EvidenceRegistry,PipelineView,TimelineView,ComparisonTable,ConclusionPanel,DiagnosticsPanel,ExportPanel,ErrorBanner,LoadingOverlay } from './components';

export function App(){const form=useAnalysisForm(); const pm=useProtectedMode(); const task=useAsyncTask(); const [data,setData]=useState<any>({hero:{title:'Analytical Lab',summary:'ready'}});
const run=()=>task.run(async()=>{if(!validateText(form.text)) throw new Error('Input too short'); setData(await analyzeText({text:form.text,mode:form.context,protectedMode:pm.enabled}));});
const onExport=()=>task.run(async()=>{const container=await encryptPayload(data,'demo-passphrase'); await exportProtected({container,protectedMode:pm.enabled});});
return <main><HeroPanel hero={data.hero}/><InputPanel text={form.text} setText={form.setText}/><button onClick={run}>Analyze</button><ModeSwitches protectedMode={pm.enabled} toggle={pm.toggle}/>{pm.enabled&&<p>Protected mode enabled</p>}<ErrorBanner error={task.error}/><LoadingOverlay loading={task.loading}/><StatsGrid stats={data.stats||[]}/><HypothesisChart scenarioBars={data.scenarioBars||[]}/><RiskRadar riskRadar={data.riskRadar||[]}/><EvidenceRegistry evidence={data.evidence||[]}/><PipelineView pipeline={data.pipeline||[]}/><TimelineView timeline={data.timeline||[]}/><ComparisonTable comparison={data.comparison||[]}/><ConclusionPanel conclusion={data.conclusion||{}}/><SceneGraph nodes={data.scene?.nodes||[]}/><DiagnosticsPanel native={data.native||{}}/><ExportPanel onExport={onExport}/></main>}
