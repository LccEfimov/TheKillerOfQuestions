import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
vi.mock('./api', () => ({ analyzeText: vi.fn(async () => ({ hero: { title: 'T', summary: 'S' }, stats: [], scenarioBars: [], riskRadar: [], comparison: [], evidence: [], timeline: [], pipeline: [], scene: { nodes: [] }, conclusion: { summary: 'done' }, native: {}, report: {}, protection: {} })), exportProtected: vi.fn(async () => ({ ok: true })) }));
test('renders sections and protected toggle', async () => { render(_jsx(App, {})); expect(screen.getByText(/Analytical Lab|T/)).toBeTruthy(); fireEvent.click(screen.getByRole('checkbox')); expect(screen.getByText(/Protected mode enabled/)).toBeTruthy(); });
