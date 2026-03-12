#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

cd brain-service
npm test
cd ..

echo "native smoke"
cmake -S native-guard -B native-guard/build >/dev/null
cmake --build native-guard/build >/dev/null
./native-guard/build/native_guard .
