import { useState } from 'react';
export function useAsyncTask(){const [loading,setLoading]=useState(false);const [error,setError]=useState<string|undefined>();const run=async<T>(fn:()=>Promise<T>)=>{setLoading(true);setError(undefined);try{return await fn();}catch(e:any){setError(e.message);throw e;}finally{setLoading(false);}};return {loading,error,run};}
