import { API_BASE } from './lib/constants';
const j=async(path:string,init?:RequestInit)=>{const r=await fetch(`${API_BASE}${path}`,{headers:{'Content-Type':'application/json'},...init});if(!r.ok) throw new Error(await r.text());return r.json();};
export const analyzeText=(payload:any)=>j('/api/analyze',{method:'POST',body:JSON.stringify(payload)});
export const getHealth=()=>j('/health');
export const getNativeSummary=()=>j('/api/native-summary');
export const exportProtected=(payload:any)=>j('/api/export/secure',{method:'POST',body:JSON.stringify(payload)});
