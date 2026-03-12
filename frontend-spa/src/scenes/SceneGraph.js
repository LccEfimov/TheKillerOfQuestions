import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SceneGraph = ({ nodes = [] }) => _jsxs("section", { children: [_jsx("h3", { children: "Scene" }), _jsx("pre", { children: JSON.stringify(nodes.slice(0, 4), null, 2) })] });
