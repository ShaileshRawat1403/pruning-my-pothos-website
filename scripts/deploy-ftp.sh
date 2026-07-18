#!/usr/bin/env bash
set -euo pipefail

# Deploy the static export in out/ to Hostinger.
#
# Two transports, chosen by DEPLOY_PROTOCOL (default: sftp):
#   sftp  — SSH-based. One encrypted connection for the whole sync, so it is
#           fast (minutes, not hours) and secure. Auth by SSH key (preferred)
#           or password. This is the default and the CI path.
#   ftps  — FTP over TLS. Fallback only. Opens a fresh connection per file and
#           per directory listing, which is why a full mirror can take hours.
#
# Required env for sftp:
#   SFTP_HOST        e.g. 82.112.239.210  (or your SSH hostname)
#   SFTP_PORT        e.g. 65002           (Hostinger SSH port, NOT 21)
#   SFTP_USERNAME    e.g. u877214290
#   SFTP_REMOTE_DIR  e.g. /home/u877214290/domains/pruningmypothos.com/public_html
#   one of:
#     SFTP_KEY        path to a private key file (local runs), OR
#     SFTP_KEY_DATA   the private key contents (CI secret; written to a temp file)
#     SFTP_PASSWORD   password fallback if no key is provided
#
# Required env for ftps (legacy fallback):
#   FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_PORT [FTP_REMOTE_DIR]

DEPLOY_PROTOCOL="${DEPLOY_PROTOCOL:-sftp}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required. Install it (macOS: brew install lftp) and retry."
  exit 1
fi

if [[ ! -d out ]]; then
  echo "out/ not found. Run 'npm run build' first."
  exit 1
fi

MIRROR="mirror -R --delete --verbose --parallel=4 --exclude-glob .DS_Store --exclude-glob .gitkeep"

# ── SFTP (default, fast, secure) ─────────────────────────────────────────────
if [[ "$DEPLOY_PROTOCOL" == "sftp" ]]; then
  missing=0
  for var in SFTP_HOST SFTP_PORT SFTP_USERNAME SFTP_REMOTE_DIR; do
    if [[ -z "${!var:-}" ]]; then echo "Missing env var: $var"; missing=1; fi
  done
  if [[ $missing -eq 1 ]]; then
    echo "Set the required SFTP_* env vars before deploying."
    exit 1
  fi

  REMOTE_DIR="${SFTP_REMOTE_DIR%/}"

  # Resolve the auth material. Key wins over password.
  KEYFILE=""
  cleanup() { [[ -n "$KEYFILE" && -f "$KEYFILE" ]] && rm -f "$KEYFILE"; }
  trap cleanup EXIT

  if [[ -n "${SFTP_KEY_DATA:-}" ]]; then
    KEYFILE="$(mktemp)"
    printf '%s\n' "$SFTP_KEY_DATA" > "$KEYFILE"
    chmod 600 "$KEYFILE"
  elif [[ -n "${SFTP_KEY:-}" ]]; then
    KEYFILE="$SFTP_KEY"
  fi

  # Pin the host key on first connect (TOFU) so we are not prompted, but do not
  # blindly disable verification.
  SSH_OPTS="set sftp:auto-confirm yes; set net:max-retries 2; set net:timeout 20;"

  if [[ -n "$KEYFILE" ]]; then
    lftp -e "set sftp:connect-program 'ssh -a -x -i $KEYFILE'; $SSH_OPTS $MIRROR out/ ${REMOTE_DIR}/; bye" \
      -p "$SFTP_PORT" -u "$SFTP_USERNAME," "sftp://$SFTP_HOST"
  elif [[ -n "${SFTP_PASSWORD:-}" ]]; then
    lftp -e "$SSH_OPTS $MIRROR out/ ${REMOTE_DIR}/; bye" \
      -p "$SFTP_PORT" -u "$SFTP_USERNAME","$SFTP_PASSWORD" "sftp://$SFTP_HOST"
  else
    echo "No SFTP auth provided. Set SFTP_KEY (or SFTP_KEY_DATA) or SFTP_PASSWORD."
    exit 1
  fi
  echo "✓ SFTP deploy complete."
  exit 0
fi

# ── FTPS (legacy fallback) ───────────────────────────────────────────────────
missing=0
for var in FTP_SERVER FTP_USERNAME FTP_PASSWORD FTP_PORT; do
  if [[ -z "${!var:-}" ]]; then echo "Missing env var: $var"; missing=1; fi
done
if [[ $missing -eq 1 ]]; then
  echo "Set the required FTP_* env vars before running deploy."
  exit 1
fi

FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/}"
if [[ "$FTP_REMOTE_DIR" == *"/public_html/public_html"* ]]; then
  FTP_REMOTE_DIR="${FTP_REMOTE_DIR/public_html\/public_html/public_html}"
fi

if [[ "${FTP_SSL:-on}" == "off" ]]; then
  echo "WARNING: FTP_SSL=off — credentials will travel in PLAINTEXT."
  SSL_SETTINGS="set ftp:ssl-allow no;"
else
  SSL_SETTINGS="set ftp:ssl-force true; set ftp:ssl-protect-data true; set ssl:verify-certificate no;"
fi

lftp -e "$SSL_SETTINGS set net:max-retries 2; set net:timeout 20; set ftp:passive-mode on; $MIRROR out/ ${FTP_REMOTE_DIR%/}/; bye" \
  -p "$FTP_PORT" -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER"
echo "✓ FTPS deploy complete."
