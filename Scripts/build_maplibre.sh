#!/usr/bin/env bash
# Builds Trinote/Resources/vendor/maplibre-gl.js (+ .css) from a MapLibre GL JS release.
#
# MapLibre 6 ships as ES modules only (maplibre-gl.mjs, a shared chunk, and a worker module). The geo map pages
# load from file://, where WKWebView runs neither module scripts nor module workers, so this bundles the library
# into one classic script that sets window.maplibregl (as the 5.x UMD build did) and runs its worker from a blob.
#
# Usage: Scripts/build_maplibre.sh <version>     e.g. Scripts/build_maplibre.sh 6.10.0
# Needs node and the canvas editor's esbuild (Trinote/Resources/canvas-editor-build: npm install).
set -euo pipefail

if [[ $# -ne 1 ]]; then
    echo "Usage: $(basename "$0") <maplibre-gl version>" >&2
    exit 1
fi
ver="$1"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR="${ROOT}/Trinote/Resources/vendor"
ESBUILD="${ROOT}/Trinote/Resources/canvas-editor-build/node_modules/.bin/esbuild"
if [[ ! -x "${ESBUILD}" ]]; then
    echo "error: esbuild not found; run 'npm install' in Trinote/Resources/canvas-editor-build first" >&2
    exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "${WORK}"' EXIT

for f in maplibre-gl.mjs maplibre-gl-shared.mjs maplibre-gl-worker.mjs maplibre-gl.css; do
    echo "GET maplibre-gl@${ver}/dist/${f}"
    curl -sSfL -A "Trinote-build-maplibre/1.0" -o "${WORK}/${f}" "https://cdn.jsdelivr.net/npm/maplibre-gl@${ver}/dist/${f}"
done

# The worker, as a classic script (it imports the shared chunk, which esbuild folds in).
echo "import './maplibre-gl-worker.mjs';" > "${WORK}/worker-entry.mjs"
"${ESBUILD}" "${WORK}/worker-entry.mjs" --bundle --format=iife --minify --target=es2022 --log-level=warning \
    --outfile="${WORK}/worker.iife.js"

# The library, with the worker's source inlined and started from a blob URL. MapLibre treats a worker URL ending
# in ".cjs" as a classic worker, so the fragment keeps it from starting a module worker.
node - "${WORK}" <<'NODE'
const fs = require("fs");
const dir = process.argv[2];
const worker = fs.readFileSync(`${dir}/worker.iife.js`, "utf8");
fs.writeFileSync(`${dir}/main-entry.mjs`, `
import * as maplibregl from './maplibre-gl.mjs';
const WORKER_SOURCE = ${JSON.stringify(worker)};
const workerUrl = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
maplibregl.setWorkerUrl(workerUrl + '#.cjs');
globalThis.maplibregl = maplibregl;
`);
NODE
# import.meta.url (MapLibre's default worker location) is unused once setWorkerUrl has run, so its warning is expected.
"${ESBUILD}" "${WORK}/main-entry.mjs" --bundle --format=iife --minify --target=es2022 --log-level=error \
    --outfile="${VENDOR}/maplibre-gl.js"
cp "${WORK}/maplibre-gl.css" "${VENDOR}/maplibre-gl.css"
echo "wrote ${VENDOR}/maplibre-gl.js ($(wc -c < "${VENDOR}/maplibre-gl.js" | tr -d ' ') bytes) and maplibre-gl.css"
