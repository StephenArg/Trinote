#!/usr/bin/env bash
# Keeps Xcode Identity (Version / Build) in sync with the built app and project.yml.
#
# During an Xcode build the current target's MARKETING_VERSION and
# CURRENT_PROJECT_VERSION are already in the environment — use those. Nested
# `xcodebuild -showBuildSettings` from a Run Script phase is unreliable (project
# lock, sandbox) and was exiting 0 without writing anything.
#
# Identity edits only change build settings, not Info.plist on disk, so an
# incremental build can skip Process Info.plist and ship the previous version.
# Touching the target's Info.plist forces that step to run this build.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_YML="${ROOT}/project.yml"
PBXPROJ="${ROOT}/Trinote.xcodeproj/project.pbxproj"

strip_quotes() {
  local value="${1:-}"
  value="${value%\"}"
  value="${value#\"}"
  printf '%s' "$value"
}

is_usable_version() {
  local value="${1:-}"
  [[ -n "$value" && "$value" != *'$'* ]]
}

marketing=""
build_num=""

# Prefer this target's resolved settings when Xcode is building the app.
if [[ "${TARGET_NAME:-}" == "Trinote" ]]; then
  marketing="$(strip_quotes "${MARKETING_VERSION:-}")"
  build_num="$(strip_quotes "${CURRENT_PROJECT_VERSION:-}")"
fi

if ! is_usable_version "$marketing" || ! is_usable_version "$build_num"; then
  if [[ -f "$PBXPROJ" ]]; then
    parsed="$(python3 - "$PBXPROJ" "${CONFIGURATION:-Release}" <<'PY'
import re
import sys

path, preferred = sys.argv[1], sys.argv[2]
text = open(path, encoding="utf-8").read()
header_re = re.compile(
    r"/\* (Debug|Release) \*/ = \{\s*isa = XCBuildConfiguration;\s*buildSettings = \{"
)
matches = []
for header in header_re.finditer(text):
    config_name = header.group(1)
    brace = header.end() - 1
    depth = 0
    i = brace
    while i < len(text):
        ch = text[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                i += 1
                break
        i += 1
    block = text[brace:i]

    def setting(name: str):
        m = re.search(rf"{name}\s*=\s*([^;]+);", block)
        if not m:
            return None
        return m.group(1).strip().strip('"')

    marketing = setting("MARKETING_VERSION")
    build = setting("CURRENT_PROJECT_VERSION")
    if not marketing or not build or "$" in marketing or "$" in build:
        continue
    matches.append((setting("PRODUCT_BUNDLE_IDENTIFIER"), config_name, marketing, build))

def pick(predicate):
    found = [row for row in matches if predicate(row)]
    if not found:
        return None
    for row in found:
        if row[1] == preferred:
            return row
    for row in found:
        if row[1] == "Release":
            return row
    return found[0]

chosen = pick(lambda row: row[0] == "com.trinote")
if chosen is None:
    chosen = pick(lambda row: row[0] is None)
if chosen is None:
    sys.exit(0)
print(f"{chosen[2]}\n{chosen[3]}")
PY
)" || parsed=""
    if [[ -n "$parsed" ]]; then
      marketing="$(printf '%s\n' "$parsed" | sed -n '1p')"
      build_num="$(printf '%s\n' "$parsed" | sed -n '2p')"
    fi
  fi
fi

if ! is_usable_version "$marketing" || ! is_usable_version "$build_num"; then
  echo "sync_project_yml_version: could not resolve Version/Build; skipping" >&2
else
  if [[ -f "$PROJECT_YML" ]]; then
    current_marketing="$(grep -E '^[[:space:]]*MARKETING_VERSION:' "$PROJECT_YML" | head -1 | sed -E 's/.*MARKETING_VERSION:[[:space:]]*"([^"]*)".*/\1/')"
    current_build="$(grep -E '^[[:space:]]*CURRENT_PROJECT_VERSION:' "$PROJECT_YML" | head -1 | sed -E 's/.*CURRENT_PROJECT_VERSION:[[:space:]]*"([^"]*)".*/\1/')"
    if [[ "$current_marketing" != "$marketing" || "$current_build" != "$build_num" ]]; then
      export _TRINOTE_YAML_MARKETING="$marketing"
      export _TRINOTE_YAML_BUILD="$build_num"
      export PROJECT_YML="$PROJECT_YML"
      python3 - <<'PY'
import os
import re
from pathlib import Path

path = Path(os.environ["PROJECT_YML"])
marketing = os.environ["_TRINOTE_YAML_MARKETING"]
build_num = os.environ["_TRINOTE_YAML_BUILD"]
text = path.read_text(encoding="utf-8")

text, n1 = re.subn(
    r'^(?P<indent>\s*)MARKETING_VERSION:\s*".*"$',
    rf'\g<indent>MARKETING_VERSION: "{marketing}"',
    text,
    count=1,
    flags=re.MULTILINE,
)
text, n2 = re.subn(
    r'^(?P<indent>\s*)CURRENT_PROJECT_VERSION:\s*".*"$',
    rf'\g<indent>CURRENT_PROJECT_VERSION: "{build_num}"',
    text,
    count=1,
    flags=re.MULTILINE,
)

if n1 != 1 or n2 != 1:
    raise SystemExit("sync_project_yml_version: could not update version keys in project.yml")

path.write_text(text, encoding="utf-8")
print(f"sync_project_yml_version: project.yml → {marketing} ({build_num})")
PY
    fi
  fi
fi

# Force Process Info.plist to run with this target's Identity values.
if [[ -n "${INFOPLIST_FILE:-}" ]]; then
  plist="${INFOPLIST_FILE}"
  if [[ ! -f "$plist" && -n "${SRCROOT:-}" ]]; then
    plist="${SRCROOT}/${INFOPLIST_FILE}"
  fi
  if [[ ! -f "$plist" ]]; then
    plist="${ROOT}/${INFOPLIST_FILE}"
  fi
  if [[ -f "$plist" ]]; then
    target_marketing="$(strip_quotes "${MARKETING_VERSION:-}")"
    target_build="$(strip_quotes "${CURRENT_PROJECT_VERSION:-}")"
    stamp_dir="${DERIVED_FILE_DIR:-${TEMP_DIR:-/tmp}}"
    mkdir -p "$stamp_dir"
    stamp="${stamp_dir}/trinote-identity-version.stamp"
    resolved="${target_marketing}|${target_build}|${plist}"
    if [[ ! -f "$stamp" ]] || [[ "$(cat "$stamp" 2>/dev/null || true)" != "$resolved" ]]; then
      if is_usable_version "$target_marketing" && is_usable_version "$target_build"; then
        touch "$plist"
        printf '%s' "$resolved" > "$stamp"
        echo "sync_project_yml_version: reprocess $(basename "$plist") for ${target_marketing} (${target_build})"
      fi
    fi
  fi
fi
