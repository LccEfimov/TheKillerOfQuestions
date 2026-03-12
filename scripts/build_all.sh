#!/usr/bin/env bash
set -euo pipefail
npm run -w brain-service build
npm run -w frontend-spa build
cmake -S native-guard -B .native-build
cmake --build .native-build
