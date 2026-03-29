#!/usr/bin/env python3
import argparse
import json
import os
import re
import subprocess
from typing import Dict, List, Optional, Set, Tuple

import requests


def sh(*args: str) -> str:
    return subprocess.check_output(args, text=True).strip()


def offset_to_line_col(text: str, offset: int) -> Tuple[int, int]:
    # reviewdog wants 1-based line/column
    line = text.count("\n", 0, offset) + 1
    last_nl = text.rfind("\n", 0, offset)
    col = offset - (last_nl + 1) + 1
    return line, col


def normalize_word(s: str) -> str:
    s = re.sub(r"^[\W_]+|[\W_]+$", "", s, flags=re.UNICODE)
    return s.lower()


def load_dictionary(path: str) -> Set[str]:
    if not path or not os.path.exists(path):
        return set()
    words: Set[str] = set()
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            words.add(line.lower())
    return words


def changed_files(base_sha: str, head_sha: str) -> List[str]:
    # list only changed files in the PR
    out = sh("git", "diff", "--name-only", base_sha, head_sha)
    files = [x.strip() for x in out.splitlines() if x.strip()]
    return files


def is_text_file(path: str) -> bool:
    ext = os.path.splitext(path)[1].lower()
    return ext in {".md", ".txt", ".rst", ".adoc", ".asciidoc", ".tex"} or os.path.basename(path).lower() in {
        "readme", "readme.md", "readme.txt"
    }


def lt_check(api_url: str, language: str, text: str) -> Dict:
    resp = requests.post(
        api_url,
        data={
            "language": language,
            "text": text,
        },
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--api-url", required=True)
    ap.add_argument("--language", required=True)
    ap.add_argument("--base-sha", required=True)
    ap.add_argument("--head-sha", required=True)
    ap.add_argument("--dictionary", default=".languagetool/words.txt")
    ap.add_argument("--max-suggestions", type=int, default=3)
    args = ap.parse_args()

    dict_words = load_dictionary(args.dictionary)

    files = changed_files(args.base_sha, args.head_sha)
    files = [f for f in files if os.path.exists(f) and is_text_file(f)]

    diagnostics: List[Dict] = []

    for path in files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()

        if not content.strip():
            continue

        try:
            result = lt_check(args.api_url, args.language, content)
        except Exception as e:
            # Emit a single diagnostic if the API call fails for a file
            diagnostics.append(
                {
                    "message": f"LanguageTool API error for {path}: {e}",
                    "location": {"path": path, "range": {"start": {"line": 1, "column": 1}}},
                    "severity": "WARNING",
                }
            )
            continue

        matches = result.get("matches", [])
        for m in matches:
            offset = int(m.get("offset", 0))
            length = int(m.get("length", 0))
            bad = content[offset : offset + length]

            rule = m.get("rule", {}) or {}
            rule_id = rule.get("id") or "UNKNOWN_RULE"
            category = (rule.get("category", {}) or {}).get("id", "")

            # Cheap custom dictionary support without modifying LT server:
            # if LT reports a spelling/typo-ish issue AND the token is in our dictionary -> ignore it.
            # (Most spelling problems show up in category TYPOS and/or rule ids containing MORFOLOGIK.)
            bad_norm = normalize_word(bad)
            if dict_words and bad_norm:
                looks_like_spelling = (category.upper() == "TYPOS") or ("MORFOLOGIK" in str(rule_id).upper())
                if looks_like_spelling and (bad_norm in dict_words):
                    continue

            start_line, start_col = offset_to_line_col(content, offset)
            end_line, end_col = offset_to_line_col(content, offset + max(length, 0))

            # Suggestions (as rdjson "suggestions" with ranges)
            suggestions = []
            repls = m.get("replacements", []) or []
            for r in repls[: args.max_suggestions]:
                val = r.get("value")
                if not val:
                    continue
                suggestions.append(
                    {
                        "range": {
                            "start": {"line": start_line, "column": start_col},
                            "end": {"line": end_line, "column": end_col},
                        },
                        "text": val,
                    }
                )

            code = {"value": rule_id}
            urls = rule.get("urls") or []
            if urls and isinstance(urls, list):
                u = urls[0].get("value")
                if u:
                    code["url"] = u

            diagnostics.append(
                {
                    "message": m.get("message") or "LanguageTool finding",
                    "location": {
                        "path": path,
                        "range": {
                            "start": {"line": start_line, "column": start_col},
                            "end": {"line": end_line, "column": end_col},
                        },
                    },
                    "severity": "WARNING",
                    "code": code,
                    **({"suggestions": suggestions} if suggestions else {}),
                }
            )

    rdjson = {
        "source": {
            "name": "LanguageTool",
            "url": "https://languagetool.org",
        },
        "diagnostics": diagnostics,
    }

    print(json.dumps(rdjson))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
