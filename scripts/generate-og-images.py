#!/usr/bin/env python3
"""Generate PNG OG-image variants for SVG covers.

Social platforms (LinkedIn, X, Slack) do not render SVG og:images, so every
cover SVG under public/covers/ gets a 1200px-wide PNG sibling. Metadata code
(src/lib/seo/metadata.ts and jsonld.ts) swaps .svg -> .png automatically.

Run after adding a new cover:
    pip install cairosvg
    python3 scripts/generate-og-images.py
"""
import glob
import os
import sys

try:
    import cairosvg
except ImportError:
    sys.exit("cairosvg is required: pip install cairosvg")

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "covers")

count = 0
for svg in glob.glob(os.path.join(ROOT, "**", "*.svg"), recursive=True):
    if "_samples" in svg:
        continue
    png = svg[:-4] + ".png"
    # Skip if PNG is newer than the SVG.
    if os.path.exists(png) and os.path.getmtime(png) >= os.path.getmtime(svg):
        continue
    cairosvg.svg2png(url=svg, write_to=png, output_width=1200)
    count += 1
    print(f"generated {os.path.relpath(png)}")

print(f"done: {count} PNG(s) generated")
