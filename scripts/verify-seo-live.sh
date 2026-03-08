#!/usr/bin/env bash

set -euo pipefail

SITE_URL="${SITE_URL:-https://pruningmypothos.com}"
SITE_URL="${SITE_URL%/}"

check_tag_page() {
  local path="$1"
  local url="${SITE_URL}${path}"
  local html
  local robots
  local canonical
  local expected_canonical="${url}/"

  html="$(curl -fsSL "$url/")"
  robots="$(printf '%s' "$html" | rg -o '<meta name="robots" content="[^"]+"' | head -n 1 || true)"
  canonical="$(printf '%s' "$html" | rg -o '<link rel="canonical" href="[^"]+"' | head -n 1 || true)"

  if [[ "$robots" != '<meta name="robots" content="noindex, follow"' ]]; then
    echo "FAIL robots ${path}/ :: ${robots:-missing}"
    return 1
  fi

  if [[ "$canonical" != "<link rel=\"canonical\" href=\"${expected_canonical}\"" ]]; then
    echo "FAIL canonical ${path}/ :: ${canonical:-missing}"
    return 1
  fi

  echo "PASS ${path}/"
}

echo "Verifying live SEO signals on ${SITE_URL}"

check_tag_page "/tags"
check_tag_page "/tags/ai"
check_tag_page "/tags/attention"

sitemap="$(curl -fsSL "${SITE_URL}/sitemap.xml")"
if printf '%s' "$sitemap" | rg -q '/tags/'; then
  echo "FAIL sitemap contains /tags/"
  exit 1
fi

echo "PASS sitemap excludes /tags/"
echo "All live SEO checks passed."
