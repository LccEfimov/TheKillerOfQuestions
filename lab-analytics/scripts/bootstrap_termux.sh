#!/usr/bin/env bash
set -euo pipefail

pkg update -y
pkg install -y nodejs-lts cmake clang git

echo "Termux bootstrap complete."
