# ACCEPTANCE_CHECKLIST.md

## 1. Build
- [ ] `frontend-spa` dependencies install successfully
- [ ] `brain-service` dependencies install successfully
- [ ] `native-guard` configures with CMake
- [ ] `native-guard` builds without critical errors
- [ ] frontend production build completes or documented limitation is recorded
- [ ] backend build/start path is valid
- [ ] `scripts/build_all.sh` exists and works

## 2. Runtime
- [ ] frontend starts in dev mode
- [ ] backend starts in dev mode
- [ ] backend health endpoint returns HTTP 200
- [ ] frontend can call backend locally
- [ ] sample report renders end-to-end
- [ ] runtime errors are handled and surfaced clearly

## 3. Analytics
- [ ] input normalization works
- [ ] feature extraction works
- [ ] required features are present: `identity_bridge`, `multi_actor`, `memory_load`, `negligence_signal`, `anti_negligence`, `evidence_chain`, `uncertainty`
- [ ] feature values are normalized to `[0..1]`
- [ ] hypothesis scoring works
- [ ] softmax output sums to approximately `1.0`
- [ ] risk model works
- [ ] counterfactual contribution calculation works
- [ ] evidence registry is produced
- [ ] comparison view data is produced
- [ ] conclusion narrative is produced

## 4. Visualization
- [ ] hero section renders
- [ ] stats cards render
- [ ] bar chart renders
- [ ] radar chart renders
- [ ] timeline renders
- [ ] evidence registry renders
- [ ] computational pipeline renders
- [ ] comparison table renders
- [ ] conclusion section renders
- [ ] 3D graph or 3D scene renders
- [ ] layout is responsive on narrow screens
- [ ] dark analytical style is coherent and readable

## 5. Security / Protected Mode
- [ ] protected mode toggle works
- [ ] user is explicitly informed when protected mode is enabled
- [ ] AES-256-GCM export works
- [ ] PBKDF2-SHA-256 derivation works
- [ ] encrypted container format is documented
- [ ] optional stego export path is available and documented
- [ ] backend returns protection metadata
- [ ] no plaintext server-side persistence is used in protected mode path
- [ ] invalid passphrase / export errors are handled safely

## 6. Native Guard
- [ ] native guard runs from CLI
- [ ] native guard can emit JSON summary
- [ ] native summary includes platform, cpu threads, cwd and storage summary
- [ ] allowed path validation works
- [ ] hashing works only within allowed paths
- [ ] scanned tree is restricted to project scope
- [ ] safe restrictions are documented in output or docs
- [ ] no privilege escalation code exists
- [ ] no cross-process or cross-app memory access code exists
- [ ] no sandbox bypass behavior exists

## 7. Safe Android Capability Controller
- [ ] `SafeAndroidCapabilityController` or equivalent class exists
- [ ] class methods are grouped by capability area
- [ ] class returns `available / unavailable / denied / unsupported` semantics where relevant
- [ ] capability matrix can be serialized to JSON
- [ ] Android/Termux limitations are documented honestly
- [ ] class documentation explains legal scope and non-goals

## 8. API Contract
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
- [ ] invalid input receives safe validation response

## 9. Documentation
- [ ] `README.md` exists
- [ ] architecture docs exist
- [ ] threat model exists
- [ ] formulas doc exists
- [ ] scenario model doc exists
- [ ] visualization model doc exists
- [ ] module contracts doc exists
- [ ] extension guide exists
- [ ] Android notes exist
- [ ] deploy/build docs exist
- [ ] monetization doc exists
- [ ] roadmap doc exists
- [ ] safe Android capability controller doc exists

## 10. Examples
- [ ] at least 3 sample input files exist
- [ ] at least 3 sample output/report files exist
- [ ] encrypted export example format is documented
- [ ] stego container example format is documented
- [ ] at least 1 architecture diagram in markdown exists
- [ ] at least 1 scenario explanation example exists

## 11. Testing
- [ ] frontend tests exist
- [ ] backend tests exist
- [ ] native tests or smoke checks exist
- [ ] integration tests exist
- [ ] `scripts/test_all.sh` exists
- [ ] `scripts/test_all.sh` fails with non-zero exit code on critical failure
- [ ] test artifacts or summary are saved

## 12. Operations / Delivery
- [ ] `scripts/dev_all.sh` exists
- [ ] `scripts/build_all.sh` exists
- [ ] `scripts/bootstrap_termux.sh` exists
- [ ] Termux bootstrap is rootless
- [ ] dev startup instructions are clear
- [ ] production build instructions are clear
- [ ] desktop launch instructions are clear

## 13. Final Report
- [ ] `FINAL_IMPLEMENTATION_REPORT.md` created
- [ ] created files are listed
- [ ] executed tests are listed
- [ ] test results are listed
- [ ] known limitations are listed
- [ ] external API requirements are listed
- [ ] desktop run instructions are listed
- [ ] Termux run instructions are listed
- [ ] dev run instructions are listed
- [ ] production build instructions are listed
