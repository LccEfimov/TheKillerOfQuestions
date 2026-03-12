#!/usr/bin/env bash
set -euo pipefail
npm run -w frontend-spa test
NODE_ENV=test npm run -w brain-service test -- ../../tests/backend/analysis.test.mjs
cmake -S native-guard -B .native-build
cmake --build .native-build
./.native-build/native-guard --self-check
NODE_ENV=test node tests/integration/full-flow.mjs
