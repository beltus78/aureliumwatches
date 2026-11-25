#!/bin/bash
# Aurelium Watches — publish the latest code:  bash ~/websites/aureliumwatches/deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
export PATH="$PWD/.node/bin:$PATH"
npm install --no-audit --no-fund >/dev/null
npx wrangler d1 migrations apply aureliumwatches --remote
npx wrangler deploy
echo "Done. Open https://aureliumwatches.com"
