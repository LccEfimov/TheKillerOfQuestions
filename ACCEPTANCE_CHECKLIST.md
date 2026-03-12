# ACCEPTANCE_CHECKLIST.md

## 1. Repository structure and contracts
- [ ] root repository contains `frontend-spa`, `brain-service`, `native-guard`, `docs`, `examples`, `scripts`, `tests`
- [ ] root contains `.gitignore` and `README.md`
- [ ] optional root workspace files, if added, are coherent with the repo contract (`package.json`, `.env.example`, CI, report files)
- [ ] `frontend-spa` matches the required structure: `main.tsx`, `App.tsx`, `api.ts`, `security.ts`, `styles.css`, `components/`, `hooks/`, `lib/`, `scenes/`, `charts/`
- [ ] `brain-service` matches the required structure: `index.mjs`, `analysis.mjs`, `ai.mjs`, `modules/parsers`, `modules/scoring`, `modules/risks`, `modules/narrative`, `modules/exporters`, `schemas`, `prompts`
- [ ] `native-guard` matches the required structure: `CMakeLists.txt`, `src/main.cpp`, `platform/`, `crypto/`, `io/`, `telemetry/`
- [ ] docs tree matches the contract: `architecture/`, `modding/`, `research/`, `operations/`
- [ ] examples tree matches the contract: `messages/`, `reports/`, `encrypted/`, `stego/`
- [ ] scripts tree contains `bootstrap_repo.sh`, `build_all.sh`, `dev_all.sh`, `export_secure.sh`
- [ ] tests tree contains `frontend/`, `backend/`, `native/`, `integration/`

## 2. Bootstrap and developer ergonomics
- [ ] `scripts/bootstrap_repo.sh` exists and is executable
- [ ] bootstrap script works rootless
- [ ] bootstrap script detects Termux vs desktop environment honestly
- [ ] bootstrap script installs Termux prerequisites through `pkg` when running inside Termux
- [ ] bootstrap script performs desktop preflight checks without privileged package installation
- [ ] bootstrap script installs `frontend-spa` and `brain-service` Node dependencies
- [ ] bootstrap script attempts `native-guard` configuration/build or reports a clear limitation
- [ ] bootstrap script prints next steps for dev, build and test flows
- [ ] bootstrap script documents Android/WebView/JNI limitations without overclaiming

## 3. Build and runtime
- [ ] `frontend-spa` dependencies install successfully
- [ ] `brain-service` dependencies install successfully
- [ ] `native-guard` configures with CMake
- [ ] `native-guard` builds without critical errors or the limitation is documented in the final report
- [ ] `scripts/build_all.sh` exists and works
- [ ] `scripts/dev_all.sh` exists and works
- [ ] frontend production build completes or a concrete limitation is documented
- [ ] backend start path is valid
- [ ] frontend starts in dev mode
- [ ] backend starts in dev mode
- [ ] backend health endpoint returns HTTP 200
- [ ] frontend can call backend locally
- [ ] end-to-end sample report renders locally
- [ ] runtime errors are surfaced clearly and non-silently

## 4. Analytics engine and API
- [ ] input normalization works
- [ ] feature extraction works
- [ ] required normalized features are present: `identity_bridge`, `multi_actor`, `memory_load`, `negligence_signal`, `anti_negligence`, `evidence_chain`, `uncertainty`
- [ ] feature values stay within `[0..1]`
- [ ] hypothesis scoring works
- [ ] softmax output sums to approximately `1.0`
- [ ] risk model works
- [ ] counterfactual contribution calculation works
- [ ] evidence registry is produced
- [ ] comparison payload is produced
- [ ] conclusion narrative is produced
- [ ] API returns `hero`
- [ ] API returns `stats`
- [ ] API returns scenario chart datasets
- [ ] API returns risk datasets
- [ ] API returns `comparison`
- [ ] API returns `evidence`
- [ ] API returns `timeline`
- [ ] API returns `pipeline`
- [ ] API returns `scene`
- [ ] API returns `conclusion`
- [ ] API returns `protection`
- [ ] API returns `native`
- [ ] invalid input receives a safe validation response

## 5. Frontend UX and visualization
- [ ] hero section renders
- [ ] input panel renders and accepts long-form input
- [ ] mode controls render and change state coherently
- [ ] protected mode toggle renders and changes state coherently
- [ ] stats cards render
- [ ] hypothesis probability chart renders
- [ ] risk radar renders
- [ ] evidence registry renders
- [ ] computational pipeline renders
- [ ] timeline renders
- [ ] comparison view renders
- [ ] conclusion section renders
- [ ] scene graph / 3D analytical scene renders or a documented safe fallback is provided
- [ ] layout remains usable on narrow screens
- [ ] dark analytical style is coherent and readable

## 6. Security and protected mode
- [ ] protected mode toggle works
- [ ] user is explicitly informed when protected mode is enabled
- [ ] `scripts/export_secure.sh` exists and works
- [ ] AES-256-GCM export works
- [ ] PBKDF2-SHA-256 derivation works
- [ ] encrypted container format is documented
- [ ] optional stego export path is available and documented, or explicitly marked experimental
- [ ] backend returns protection metadata
- [ ] no plaintext server-side persistence is used in the protected path
- [ ] invalid passphrase / export errors are handled safely

## 7. Native guard and capability model
- [ ] native guard runs from CLI
- [ ] native guard can emit JSON summary
- [ ] native summary includes platform, cpu threads, cwd and storage summary
- [ ] allowed path validation works
- [ ] hashing / crypto helpers work only within allowed paths
- [ ] scanned tree is restricted to project scope or declared safe paths
- [ ] `SafeAndroidCapabilityController` or equivalent class exists
- [ ] class methods are grouped by capability area
- [ ] class returns `available / unavailable / denied / unsupported` semantics where relevant
- [ ] capability matrix can be serialized to JSON
- [ ] Android/Termux limitations are documented honestly
- [ ] legal scope and non-goals are documented
- [ ] no privilege escalation code exists
- [ ] no cross-process or cross-app memory access code exists
- [ ] no sandbox bypass behavior exists

## 8. Documentation quality
- [ ] `README.md` exists and explains architecture, dev flow and secure export
- [ ] `docs/architecture/system-overview.md` exists
- [ ] `docs/architecture/data-flow.md` exists
- [ ] `docs/architecture/threat-model.md` exists
- [ ] `docs/modding/module-contracts.md` exists
- [ ] `docs/modding/extension-guide.md` exists
- [ ] `docs/modding/roadmap.md` exists and includes roadmap plus monetization logic
- [ ] `docs/research/formulas.md` exists
- [ ] `docs/research/scenario-model.md` exists
- [ ] `docs/research/visualization-model.md` exists
- [ ] `docs/operations/build.md` exists
- [ ] `docs/operations/deploy.md` exists
- [ ] `docs/operations/android-notes.md` exists and covers capability-controller behavior and Termux constraints

## 9. Examples and assets
- [ ] at least 3 sample message/input files exist
- [ ] at least 3 sample output/report files exist
- [ ] encrypted export example format is documented
- [ ] stego example format is documented
- [ ] at least 1 architecture diagram in markdown exists
- [ ] at least 1 scenario explanation example exists
- [ ] examples can be used by integration tests or demo scripts

## 10. Testing and verification
- [ ] frontend tests exist
- [ ] backend tests exist
- [ ] native tests or smoke checks exist
- [ ] integration tests exist
- [ ] `scripts/test_all.sh` exists
- [ ] `scripts/test_all.sh` exits non-zero on critical failure
- [ ] test summary or artifacts are saved
- [ ] critical paths are exercised: analysis, API, secure export, native summary

## 11. Delivery report
- [ ] `FINAL_IMPLEMENTATION_REPORT.md` exists
- [ ] created files are listed
- [ ] implemented modules are listed
- [ ] executed build and test commands are listed
- [ ] results are listed
- [ ] known limitations are listed honestly
- [ ] external API requirements are listed
- [ ] desktop run instructions are listed
- [ ] Termux run instructions are listed
- [ ] development instructions are listed
- [ ] production build instructions are listed
