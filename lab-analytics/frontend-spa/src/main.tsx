import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);

  const run = async () => {
    const res = await fetch('http://localhost:8787/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, protectedMode: false })
    });
    setResult(await res.json());
  };

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', color: '#d8e1ff', background: '#0b1120', minHeight: '100vh', padding: 20 }}>
      <h1>Analytical Cockpit</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} style={{ width: '100%', background: '#111827', color: '#f8fafc' }} />
      <br />
      <button onClick={run} style={{ marginTop: 12 }}>Analyze</button>
      {result && <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
