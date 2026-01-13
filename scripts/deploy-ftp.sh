#!/usr/bin/env bash
set -euo pipefail

missing=0
for var in FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_PORT; do
  if [[ -z "${!var:-}" ]]; then
    echo "Missing env var: $var"
    missing=1
  fi
done

if [[ $missing -eq 1 ]]; then
  echo "Set the required FTP_* env vars before running deploy."
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required. Install it (macOS: brew install lftp) and retry."
  exit 1
fi

if [[ ! -d dist ]]; then
  echo "dist/ not found. Run 'npm run build' first."
  exit 1
fi

lftp -e "set ftp:ssl-allow no; set net:max-retries 2; set net:timeout 20; set ftp:passive-mode on; mirror -R --delete --verbose dist/ /; bye" \
  -p "$FTP_PORT" -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER"
