import { useState } from 'react';
export function useAsyncTask() { const [loading, setLoading] = useState(false); const [error, setError] = useState(); const run = async (fn) => { setLoading(true); setError(undefined); try {
    return await fn();
}
catch (e) {
    setError(e.message);
    throw e;
}
finally {
    setLoading(false);
} }; return { loading, error, run }; }
