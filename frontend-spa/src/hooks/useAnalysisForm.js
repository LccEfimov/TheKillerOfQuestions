import { useState } from 'react';
export const useAnalysisForm = () => { const [text, setText] = useState(''); const [context, setContext] = useState('web'); return { text, setText, context, setContext }; };
