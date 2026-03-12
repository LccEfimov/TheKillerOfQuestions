#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT_DIR="${1:-$PWD}"

info() {
  printf '\n[%s] %s\n' "INFO" "$*"
}

warn() {
  printf '\n[%s] %s\n' "WARN" "$*" >&2
}

run_if_exists() {
  local dir="$1"
  shift
  if [ -d "$dir" ]; then
    (
      cd "$dir"
      "$@"
    )
  else
    warn "Directory not found: $dir"
  fi
}

npm_install_best_effort() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    warn "Directory not found: $dir"
    return 0
  fi

  (
    cd "$dir"
    if [ -f package-lock.json ]; then
      info "Installing dependencies with npm ci in $dir"
      npm ci || npm install
    elif [ -f package.json ]; then
      info "Installing dependencies with npm install in $dir"
      npm install
    else
      warn "No package.json in $dir"
    fi
  )
}

build_native_guard() {
  if [ ! -d "${PROJECT_DIR}/native-guard" ]; then
    warn "native-guard directory not found"
    return 0
  fi

  info "Configuring native-guard"
  mkdir -p "${PROJECT_DIR}/native-guard/build"

  (
    cd "${PROJECT_DIR}/native-guard"
    cmake -S . -B build
    if ! cmake --build build; then
      warn "native-guard build failed. This can happen in some Termux/device combinations. Review docs/operations/android-notes.md and CMake logs."
      return 0
    fi
  )
}

if [ ! -d "/data/data/com.termux/files/usr" ]; then
  warn "This script is intended for Termux. Continuing anyway."
fi

info "Using project dir: ${PROJECT_DIR}"
cd "$PROJECT_DIR"

if ! command -v pkg >/dev/null 2>&1; then
  echo "Termux pkg command is not available. Run this inside Termux." >&2
  exit 1
fi

info "Updating package metadata"
pkg update -y

info "Upgrading installed packages"
pkg upgrade -y

info "Installing required packages"
pkg install -y git nodejs clang cmake make python pkg-config

info "Versions"
command -v node >/dev/null 2>&1 && node -v || true
command -v npm >/dev/null 2>&1 && npm -v || true
command -v clang >/dev/null 2>&1 && clang --version | head -n 1 || true
command -v cmake >/dev/null 2>&1 && cmake --version | head -n 1 || true

npm_install_best_effort "${PROJECT_DIR}/brain-service"
npm_install_best_effort "${PROJECT_DIR}/frontend-spa"

build_native_guard

if [ -d "${PROJECT_DIR}/brain-service" ]; then
  (
    cd "${PROJECT_DIR}/brain-service"
    if npm run | grep -q " build"; then
      info "Running backend build if available"
      npm run build || warn "Backend build step failed or is not required"
    fi
  )
fi

if [ -d "${PROJECT_DIR}/frontend-spa" ]; then
  (
    cd "${PROJECT_DIR}/frontend-spa"
    if npm run | grep -q " build"; then
      info "Running frontend build if available"
      npm run build || warn "Frontend build step failed. Check WebView/3D/browser support and package logs."
    fi
  )
fi

cat <<MSG

Bootstrap completed.

Suggested next steps:

1. Build native module again if needed
   cd native-guard && cmake -S . -B build && cmake --build build

2. Start backend
   cd brain-service && npm run dev

3. Start frontend
   cd frontend-spa && npm run dev

4. Run the full test script if the repository provides it
   cd scripts && bash test_all.sh

Notes:
- This script performs only rootless actions supported by Termux.
- Android and Termux do not guarantee full desktop parity for WebGL, browser 3D, clipboard, file pickers or WebView behavior.
- JNI- or permission-dependent device capabilities still require explicit application integration.
- No sandbox bypass, hidden API abuse, root-only operation or cross-app control is attempted.

MSG
