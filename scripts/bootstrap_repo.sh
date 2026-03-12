#!/usr/bin/env bash
set -euo pipefail
echo "[bootstrap] workspace prep"
if command -v termux-info >/dev/null 2>&1; then
  echo "[bootstrap] Termux detected; install build prerequisites through pkg if missing"
else
  echo "[bootstrap] Desktop environment detected (no privileged install attempted)"
fi
if npm install; then
  echo "[bootstrap] npm dependencies installed"
else
  echo "[bootstrap] WARNING: npm install failed (likely registry policy/network). Continue with native checks." >&2
fi
if cmake -S native-guard -B .native-build && cmake --build .native-build; then
  echo "[bootstrap] native-guard configured and built"
else
  echo "[bootstrap] WARNING: native-guard build limitation encountered" >&2
fi
echo "Next: bash scripts/dev_all.sh | bash scripts/build_all.sh | bash scripts/test_all.sh"
