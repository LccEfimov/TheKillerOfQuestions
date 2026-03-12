#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT_DEFAULT="$(cd -- "${SCRIPT_DIR}/.." 2>/dev/null && pwd || pwd)"
PROJECT_DIR="${1:-$REPO_ROOT_DEFAULT}"
CI_MODE="${CI:-0}"
SKIP_NATIVE="${SKIP_NATIVE:-0}"
SKIP_SYSTEM="${SKIP_SYSTEM:-0}"

log()  { printf '\n[%s] %s\n' "INFO" "$*"; }
warn() { printf '\n[%s] %s\n' "WARN" "$*" >&2; }
fail() { printf '\n[%s] %s\n' "FAIL" "$*" >&2; exit 1; }

has() { command -v "$1" >/dev/null 2>&1; }

is_termux() {
  [ -n "${TERMUX_VERSION:-}" ] || [ -d "/data/data/com.termux/files/usr" ]
}

os_name() {
  uname -s 2>/dev/null || echo unknown
}

cpu_jobs() {
  if has nproc; then nproc
  elif has sysctl; then sysctl -n hw.ncpu 2>/dev/null || echo 2
  else echo 2
  fi
}

run_in_dir() {
  local dir="$1"
  shift
  if [ ! -d "$dir" ]; then
    warn "Directory not found: $dir"
    return 0
  fi
  (
    cd "$dir"
    "$@"
  )
}

npm_install_best_effort() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    warn "Directory not found: $dir"
    return 0
  fi

  (
    cd "$dir"
    if [ ! -f package.json ]; then
      warn "No package.json in $dir"
      return 0
    fi

    if [ -f package-lock.json ]; then
      log "Installing Node dependencies with npm ci in $(basename "$dir")"
      npm ci || npm install
    else
      log "Installing Node dependencies with npm install in $(basename "$dir")"
      npm install
    fi
  )
}

npm_run_if_present() {
  local dir="$1"
  local script_name="$2"
  if [ ! -d "$dir" ] || [ ! -f "$dir/package.json" ]; then
    return 0
  fi

  if (
    cd "$dir"
    node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['${script_name}'] ? 0 : 1)" >/dev/null 2>&1 < /dev/null
  ); then
    (
      cd "$dir"
      log "Running npm script '${script_name}' in $(basename "$dir")"
      npm run "$script_name"
    )
  else
    warn "npm script '${script_name}' not declared in $(basename "$dir")"
  fi
}

termux_install_packages() {
  [ "$SKIP_SYSTEM" = "1" ] && {
    warn "Skipping Termux system package installation because SKIP_SYSTEM=1"
    return 0
  }

  has pkg || fail "Termux pkg command is not available. Run this inside Termux or set SKIP_SYSTEM=1."

  log "Updating Termux package metadata"
  pkg update -y
  if [ "$CI_MODE" != "1" ]; then
    log "Upgrading installed Termux packages"
    pkg upgrade -y
  else
    warn "CI=1 detected; skipping pkg upgrade to reduce bootstrap volatility"
  fi

  log "Installing required Termux packages"
  pkg install -y git nodejs clang cmake make python pkg-config
}

preflight_desktop_tools() {
  local missing=0
  local tools=(git node npm cmake)
  if [ "$SKIP_NATIVE" != "1" ]; then
    tools+=(make)
    case "$(os_name)" in
      Darwin) tools+=(clang++) ;;
      Linux)  tools+=(c++) ;;
      *)      : ;;
    esac
  fi

  for tool in "${tools[@]}"; do
    if ! has "$tool"; then
      warn "Missing required tool: $tool"
      missing=1
    fi
  done

  if [ "$missing" -ne 0 ]; then
    cat >&2 <<MSG

Desktop preflight failed.
Install the missing tools manually and rerun bootstrap.
No privileged install step is attempted by this script.

MSG
    exit 1
  fi
}

print_versions() {
  log "Environment summary"
  printf '  OS: %s\n' "$(os_name)"
  printf '  Termux: %s\n' "$(is_termux && echo yes || echo no)"
  has node   && printf '  node: %s\n' "$(node -v)"
  has npm    && printf '  npm: %s\n' "$(npm -v)"
  has cmake  && printf '  cmake: %s\n' "$(cmake --version | head -n 1)"
  if has clang++; then
    printf '  compiler: %s\n' "$(clang++ --version | head -n 1)"
  elif has c++; then
    printf '  compiler: %s\n' "$(c++ --version | head -n 1)"
  fi
}

build_native_guard() {
  [ "$SKIP_NATIVE" = "1" ] && {
    warn "Skipping native-guard build because SKIP_NATIVE=1"
    return 0
  }

  local native_dir="${PROJECT_DIR}/native-guard"
  if [ ! -d "$native_dir" ]; then
    warn "native-guard directory not found"
    return 0
  fi

  log "Configuring native-guard"
  mkdir -p "$native_dir/build"
  (
    cd "$native_dir"
    cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
    if ! cmake --build build --parallel "$(cpu_jobs)"; then
      warn "native-guard build failed. Review docs/operations/build.md and docs/operations/android-notes.md."
      return 0
    fi
  )
}

maybe_run_repo_script() {
  local script_path="$1"
  if [ -f "$script_path" ]; then
    log "Running repo script: ${script_path#$PROJECT_DIR/}"
    bash "$script_path"
  else
    warn "Repo script not found: ${script_path#$PROJECT_DIR/}"
  fi
}

main() {
  [ -d "$PROJECT_DIR" ] || fail "Project directory does not exist: $PROJECT_DIR"
  PROJECT_DIR="$(cd "$PROJECT_DIR" && pwd)"
  log "Using project dir: $PROJECT_DIR"

  if is_termux; then
    log "Detected Termux environment"
    termux_install_packages
  else
    log "Detected desktop/non-Termux environment"
    preflight_desktop_tools
  fi

  print_versions

  npm_install_best_effort "$PROJECT_DIR/brain-service"
  npm_install_best_effort "$PROJECT_DIR/frontend-spa"

  if [ -f "$PROJECT_DIR/package.json" ]; then
    (
      cd "$PROJECT_DIR"
      if [ -f package-lock.json ]; then
        log "Installing root workspace dependencies"
        npm ci || npm install
      else
        log "Installing root workspace dependencies"
        npm install
      fi
    )
  fi

  build_native_guard

  if [ -f "$PROJECT_DIR/scripts/build_all.sh" ]; then
    maybe_run_repo_script "$PROJECT_DIR/scripts/build_all.sh"
  else
    npm_run_if_present "$PROJECT_DIR/brain-service" build || true
    npm_run_if_present "$PROJECT_DIR/frontend-spa" build || true
  fi

  cat <<MSG

Bootstrap completed.

Recommended next steps:
  1. Start the backend:
     cd "$PROJECT_DIR/brain-service" && npm run dev

  2. Start the frontend:
     cd "$PROJECT_DIR/frontend-spa" && npm run dev

  3. Run the repository test entrypoint when available:
     cd "$PROJECT_DIR" && bash scripts/test_all.sh

Operational notes:
  - This script performs only rootless actions.
  - In Termux, package installation uses pkg only inside the user environment.
  - On desktop hosts, missing system tools are reported but not installed automatically.
  - Android/Termux do not guarantee full parity for WebGL, browser 3D, clipboard, file pickers,
    WebView behavior, or JNI-dependent platform features.
  - No sandbox bypass, privilege escalation, hidden API abuse, or cross-app control is attempted.

MSG
}

main "$@"
