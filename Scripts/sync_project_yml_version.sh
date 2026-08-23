#!/usr/bin/env bash
# Copies MARKETING_VERSION and CURRENT_PROJECT_VERSION from the generated Xcode
# project into project.yml so XcodeGen stays in sync after editing Version/Build in Xcode.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_YML="${ROOT}/project.yml"
XCODEPROJ="${ROOT}/Trinote.xcodeproj"

if [[ ! -f "$PROJECT_YML" || ! -d "$XCODEPROJ" ]]; then
  exit 0
fi

settings="$(xcodebuild -project "$XCODEPROJ" -scheme Trinote -showBuildSettings 2>/dev/null)" || exit 0

marketing="$(printf '%s\n' "$settings" | awk -F ' = ' '/^[[:space:]]*MARKETING_VERSION =/{print $2; exit}')"
build_num="$(printf '%s\n' "$settings" | awk -F ' = ' '/^[[:space:]]*CURRENT_PROJECT_VERSION =/{print $2; exit}')"

if [[ -z "$marketing" || -z "$build_num" ]]; then
  exit 0
fi

current_marketing="$(grep -E '^[[:space:]]*MARKETING_VERSION:' "$PROJECT_YML" | head -1 | sed -E 's/.*MARKETING_VERSION:[[:space:]]*"([^"]*)".*/\1/')"
current_build="$(grep -E '^[[:space:]]*CURRENT_PROJECT_VERSION:' "$PROJECT_YML" | head -1 | sed -E 's/.*CURRENT_PROJECT_VERSION:[[:space:]]*"([^"]*)".*/\1/')"

if [[ "$current_marketing" == "$marketing" && "$current_build" == "$build_num" ]]; then
  exit 0
fi

export MARKETING_VERSION="$marketing"
export CURRENT_PROJECT_VERSION="$build_num"
export PROJECT_YML="$PROJECT_YML"

python3 - <<'PY'
import os
import re
from pathlib import Path

path = Path(os.environ["PROJECT_YML"])
marketing = os.environ["MARKETING_VERSION"]
build_num = os.environ["CURRENT_PROJECT_VERSION"]
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
