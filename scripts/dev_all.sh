#!/usr/bin/env bash
set -euo pipefail
trap 'kill 0' EXIT
npm run -w brain-service dev &
npm run -w frontend-spa dev &
wait
