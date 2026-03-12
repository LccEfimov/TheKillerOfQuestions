import { useState } from 'react';
export const useProtectedMode=()=>{const [enabled,setEnabled]=useState(false); return {enabled,toggle:()=>setEnabled(v=>!v)};};
