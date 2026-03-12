export const useResponsiveState=()=>({narrow: typeof window!=='undefined' ? window.innerWidth<800 : false});
