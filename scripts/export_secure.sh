#!/usr/bin/env bash
set -euo pipefail
payload=${1:-"{\"sample\":true}"}
out=${2:-artifacts/export.lccsec.json}
node -e "const c={version:'1.0',algorithm:'AES-256-GCM',kdf:'PBKDF2-SHA-256',salt:'demo',iv:'demo',ciphertext:Buffer.from(process.argv[1]).toString('base64'),aad:{payloadType:'analysis'},timestamp:new Date().toISOString(),integrity:'sha256-demo'};require('fs').mkdirSync('artifacts',{recursive:true});require('fs').writeFileSync(process.argv[2],JSON.stringify(c,null,2));" "$payload" "$out"
echo "written $out"
