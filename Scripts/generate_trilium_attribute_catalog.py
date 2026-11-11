#!/usr/bin/env python3
"""Generate Trinote/Resources/TriliumAttributeCatalog.json from a Trilium checkout.

Reads, at a git ref of the Trilium repository (default v0.107.0):
  - packages/commons/src/lib/builtin_attributes.ts   the built-in names, their value kinds and choices
  - apps/client/src/widgets/attribute_widgets/attr_help.ts   which explanation belongs to which name
  - apps/client/src/translations/<locale>/translation.json   the explanations, per language

The explanations are HTML in Trilium; they are converted here to inline Markdown (code spans, "• " list
lines, http(s) links only), which the app renders with AttributedString(markdown:).

Usage: Scripts/generate_trilium_attribute_catalog.py /path/to/Trilium [--ref v0.107.0]
"""
from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "Trinote" / "Resources" / "TriliumAttributeCatalog.json"

# The app's languages (Localizable.xcstrings). Trilium has no Hungarian; the app falls back to English.
LOCALES = ("en", "es", "it", "fr", "de", "ru", "ar", "hi", "hu", "cs", "pl")


def git_show(repo: Path, ref: str, path: str) -> str | None:
    result = subprocess.run(
        ["git", "-C", str(repo), "show", f"{ref}:{path}"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return None
    return result.stdout


def parse_builtin_attributes(source: str) -> list[dict]:
    start = source.index("const BUILTIN_ATTRIBUTES = [")
    end = source.index("] as const", start)
    body = source[start:end]
    # Drop line comments so commas or braces inside them can't confuse the entry pattern.
    body = re.sub(r"//[^\n]*", "", body)

    entries = []
    for match in re.finditer(r'\{\s*type:\s*"(label|relation)",\s*name:\s*"([^"]+)"(.*?)\}', body, re.S):
        kind, name, rest = match.group(1), match.group(2), match.group(3)
        entry: dict = {"type": kind, "name": name}
        value_type = re.search(r'valueType:\s*"([^"]+)"', rest)
        if value_type:
            entry["valueType"] = value_type.group(1)
        options = re.search(r"selectOptions:\s*\[(.*?)\]", rest, re.S)
        if options:
            entry["selectOptions"] = re.findall(r'"([^"]*)"', options.group(1))
        if re.search(r"isDangerous:\s*true", rest):
            entry["isDangerous"] = True
        entries.append(entry)
    if not entries:
        sys.exit("No built-in attributes found; has builtin_attributes.ts changed shape?")
    return entries


def parse_help_keys(source: str) -> dict[str, str]:
    """Maps "label:<name>" / "relation:<name>" to the translation key under `attribute_detail`."""
    keys: dict[str, str] = {}
    section: str | None = None
    for line in source.splitlines():
        stripped = line.strip()
        if re.match(r"^label:\s*\{$", stripped):
            section = "label"
            continue
        if re.match(r"^relation:\s*\{$", stripped):
            section = "relation"
            continue
        if section is None:
            continue
        match = re.match(r'^"?([\w:]+)"?\s*:\s*(?:\{\s*description:\s*)?t\("attribute_detail\.([a-z0-9_]+)"\)', stripped)
        if match:
            keys[f"{section}:{match.group(1)}"] = match.group(2)
    if not keys:
        sys.exit("No help keys found; has attr_help.ts changed shape?")
    return keys


MARKDOWN_SPECIALS = re.compile(r"([\\`*_\[\]])")


def escape_markdown(text: str) -> str:
    return MARKDOWN_SPECIALS.sub(r"\\\1", text)


def html_to_markdown(source: str) -> str:
    """Trilium's help HTML (code, lists, links, emphasis) as inline Markdown for AttributedString."""
    out: list[str] = []
    pos = 0
    link_href: str | None = None

    def plain(segment: str) -> str:
        # As in a browser, line breaks in the HTML source are only spaces; tags decide where lines break.
        return escape_markdown(html.unescape(re.sub(r"\s*\n\s*", " ", segment)))

    for match in re.finditer(r"<(/?)([a-zA-Z]+)([^>]*)>", source):
        out.append(plain(source[pos:match.start()]))
        pos = match.end()
        closing, tag, attrs = match.group(1) == "/", match.group(2).lower(), match.group(3)
        if tag == "code":
            out.append("`")
        elif tag in ("strong", "b"):
            out.append("**")
        elif tag in ("em", "i"):
            out.append("*")
        elif tag == "li" and not closing:
            out.append("\n• ")
        elif tag in ("ul", "ol") and closing:
            out.append("\n")
        elif tag == "br":
            out.append("\n")
        elif tag == "p" and closing:
            out.append("\n\n")
        elif tag == "a":
            if not closing:
                href = re.search(r'href\s*=\s*"([^"]*)"', attrs)
                link_href = href.group(1) if href and re.match(r"^https?://", href.group(1)) else None
                if link_href:
                    out.append("[")
            elif link_href:
                out.append(f"]({link_href})")
                link_href = None
        # Any other tag is dropped, keeping its text.
    out.append(plain(source[pos:]))
    result = "".join(out).replace("\u00a0", " ")
    # Code spans hold literal text: undo the escaping inside them.
    result = re.sub(r"`([^`]*)`", lambda m: "`" + re.sub(r"\\([\\`*_\[\]])", r"\1", m.group(1)) + "`", result)
    lines = [re.sub(r"[ \t]+", " ", line).strip() for line in result.split("\n")]
    result = "\n".join(lines)
    result = re.sub(r"\n{3,}", "\n\n", result)
    # List items sit on consecutive lines.
    result = re.sub(r"\n+(?=• )", "\n", result)
    return result.strip()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("trilium", type=Path, help="path to a Trilium git checkout")
    parser.add_argument("--ref", default="v0.107.0", help="git ref to read (default: v0.107.0)")
    args = parser.parse_args()

    builtins_source = git_show(args.trilium, args.ref, "packages/commons/src/lib/builtin_attributes.ts")
    help_source = git_show(args.trilium, args.ref, "apps/client/src/widgets/attribute_widgets/attr_help.ts")
    if builtins_source is None or help_source is None:
        sys.exit(f"Could not read the Trilium sources at {args.ref} in {args.trilium}")

    attributes = parse_builtin_attributes(builtins_source)
    help_keys = parse_help_keys(help_source)

    help_by_locale: dict[str, dict[str, str]] = {}
    for locale in LOCALES:
        raw = git_show(args.trilium, args.ref, f"apps/client/src/translations/{locale}/translation.json")
        if raw is None:
            continue
        strings = json.loads(raw).get("attribute_detail", {})
        texts = {}
        for attribute_key, string_key in sorted(help_keys.items()):
            value = strings.get(string_key)
            if isinstance(value, str) and value.strip():
                texts[attribute_key] = html_to_markdown(value)
        if texts:
            help_by_locale[locale] = texts

    if "en" not in help_by_locale:
        sys.exit("No English explanations found")

    catalog = {
        "source": f"Trilium {args.ref}",
        "attributes": attributes,
        "help": help_by_locale,
    }
    OUTPUT.write_text(json.dumps(catalog, ensure_ascii=False, indent=1, sort_keys=False) + "\n", encoding="utf-8")
    counts = ", ".join(f"{locale} {len(texts)}" for locale, texts in help_by_locale.items())
    print(f"Wrote {OUTPUT.relative_to(ROOT)}: {len(attributes)} built-in attributes; explanations: {counts}")


if __name__ == "__main__":
    main()
