#!/usr/bin/env bash
set -euo pipefail
./.native-build/native-guard --json >/tmp/native.json
./.native-build/native-guard --self-check
