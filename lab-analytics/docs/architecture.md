# Architecture

- Frontend SPA sends text payload to brain-service `/analyze`.
- Brain-service normalizes text, extracts required features, computes hypotheses and risk, and returns unified JSON payload.
- Native-guard can be invoked by backend to attach trusted device/runtime metadata.
