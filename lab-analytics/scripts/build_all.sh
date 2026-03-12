#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "[build] brain-service install"
cd brain-service
npm install
cd ..

echo "[build] frontend install + build"
cd frontend-spa
npm install
npm run build
cd ..

echo "[build] native-guard cmake configure+build"
cmake -S native-guard -B native-guard/build
cmake --build native-guard/build

echo "[build] done"
