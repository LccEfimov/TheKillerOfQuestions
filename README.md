# TheKillerOfQuestions Monorepo

Production-oriented analytics monorepo with `frontend-spa`, `brain-service`, and `native-guard`.

## Architecture
- Frontend SPA (React + TS + Vite): input, protected mode toggle, visualization panels.
- Brain Service (Node + Express): explainable local analysis pipeline and secure export endpoint.
- Native Guard (C++17 + CMake): safe capability summary, allowed-path checks, safe IO helpers.

## Quick start
```bash
bash scripts/bootstrap_repo.sh
bash scripts/dev_all.sh
```

## Build and test
```bash
bash scripts/build_all.sh
bash scripts/test_all.sh
```

## Protected mode
Uses AES-256-GCM + PBKDF2-SHA-256 container (`.lccsec.json`) and non-persistent backend export metadata path.

## Monetization and roadmap
Use-cases: decision-support analytics, B2B dashboards, protected report handling.
Monetization: SaaS, freemium, premium secure export, API tiers, white-label and consulting.
Roadmap: core hardening → polished UX → Telegram Web App → premium protected exports → multimodal → enterprise collaboration.
