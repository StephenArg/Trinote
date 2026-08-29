#!/usr/bin/env bash
# Download a pinned Mermaid or MindElixir build into Trinote/Resources/vendor.
# Usage:
#   Scripts/bump_vendor.sh mermaid <version>
#   Scripts/bump_vendor.sh mind-elixir <version>
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR="${ROOT}/Trinote/Resources/vendor"

usage() {
    cat <<EOF
Usage: $(basename "$0") <subcommand> <version>

Subcommands:
  mermaid <ver>       curl mermaid.min.js from jsDelivr
  mind-elixir <ver>   curl MindElixir.iife.js + MindElixir.css from jsDelivr

Examples:
  $(basename "$0") mermaid 11.16.1
  $(basename "$0") mind-elixir 5.15.1
EOF
}

download() {
    local url="$1"
    local dest="$2"
    echo "GET ${url}"
    curl -sSfL \
        -A "Trinote-bump-vendor/1.0" \
        -o "${dest}" \
        "${url}"
    if [[ ! -s "${dest}" ]]; then
        echo "error: empty download: ${dest}" >&2
        exit 1
    fi
    local bytes
    bytes="$(wc -c < "${dest}" | tr -d ' ')"
    echo "wrote ${dest} (${bytes} bytes)"
}

if [[ $# -lt 1 ]]; then
    usage
    exit 1
fi

cmd="$1"
shift

case "${cmd}" in
    mermaid)
        if [[ $# -ne 1 ]]; then
            usage
            exit 1
        fi
        ver="$1"
        download \
            "https://cdn.jsdelivr.net/npm/mermaid@${ver}/dist/mermaid.min.js" \
            "${VENDOR}/mermaid.min.js"
        ;;
    mind-elixir)
        if [[ $# -ne 1 ]]; then
            usage
            exit 1
        fi
        ver="$1"
        download \
            "https://cdn.jsdelivr.net/npm/mind-elixir@${ver}/dist/MindElixir.iife.js" \
            "${VENDOR}/MindElixir.iife.js"
        download \
            "https://cdn.jsdelivr.net/npm/mind-elixir@${ver}/dist/MindElixir.css" \
            "${VENDOR}/MindElixir.css"
        ;;
    -h|--help|help)
        usage
        ;;
    *)
        echo "error: unknown subcommand '${cmd}'" >&2
        usage
        exit 1
        ;;
esac
