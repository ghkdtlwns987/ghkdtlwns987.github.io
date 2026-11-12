#!/usr/bin/env python3
"""Portfolio PDF generator — PDF 안에서 Index(#앵커) 점프가 동작합니다.

Chrome/Chromium headless 로 인쇄 PDF를 만듭니다.
(브라우저 Cmd+P 와 달리 /GoTo 내부 링크가 살아 있습니다.)

Usage:
  python3 script/generate_portfolio_pdf.py karrot
  python3 script/generate_portfolio_pdf.py resume
  python3 script/generate_portfolio_pdf.py samsung --url http://127.0.0.1:7002
  python3 script/generate_portfolio_pdf.py karrot --out /tmp/karrot.pdf

Requires: google-chrome 또는 chromium-browser
Jekyll serve 가 떠 있어야 합니다 (기본 http://127.0.0.1:7002).
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT_DIR = ROOT / "_private" / "portfolio-pdfs"
DEFAULT_BASE = "http://127.0.0.1:7002"


def find_chrome() -> str:
    for name in ("google-chrome", "chromium-browser", "chromium", "chrome"):
        path = shutil.which(name)
        if path:
            return path
    raise FileNotFoundError(
        "Chrome/Chromium 이 필요합니다. (google-chrome 또는 chromium-browser)"
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate portfolio PDF with working internal Index links"
    )
    parser.add_argument("slug", help="portfolio slug (karrot, samsung, resume, ...)")
    parser.add_argument(
        "--url",
        default=DEFAULT_BASE,
        help=f"Jekyll base URL (default: {DEFAULT_BASE})",
    )
    parser.add_argument(
        "--out",
        default=None,
        help="Output PDF path (default: _private/portfolio-pdfs/<slug>.pdf)",
    )
    args = parser.parse_args()

    slug = args.slug.strip("/")
    page_url = args.url.rstrip("/") + f"/portfolio/{slug}/"
    out = Path(args.out) if args.out else DEFAULT_OUT_DIR / f"{slug}.pdf"
    out.parent.mkdir(parents=True, exist_ok=True)

    chrome = find_chrome()
    print(f"chrome: {chrome}")
    print(f"url:    {page_url}")
    print(f"out:    {out}")

    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=10000",
        f"--print-to-pdf={out}",
        page_url,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0 or not out.is_file() or out.stat().st_size < 1000:
        print(proc.stdout, file=sys.stderr)
        print(proc.stderr, file=sys.stderr)
        print("PDF 생성 실패. Jekyll serve URL 과 Chrome 설치를 확인하세요.", file=sys.stderr)
        return 1

    print(f"done: {out} ({out.stat().st_size:,} bytes)")
    print("PDF 뷰어에서 Index 링크를 클릭하면 해당 섹션으로 이동합니다.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
