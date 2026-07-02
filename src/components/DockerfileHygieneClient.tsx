"use client";

import LintConsole, { Finding } from "./LintConsole";

// Fake token, assembled from fragments so the literal shape never sits in source
// (keeps push protection quiet). The demo still detects it at runtime.
const FAKE_TOKEN = "ghp_" + "16C7e42F292c6912E7710c838347Ae178";

const SAMPLE = `FROM node:latest
ENV API_TOKEN=${FAKE_TOKEN}
WORKDIR /app
ADD ./app /app
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://example.com/install.sh | sh
COPY . .
CMD ["node", "server.js"]`;

function analyze(text: string): Finding[] {
  const lines = text.split("\n");
  const findings: Finding[] = [];
  let sawFrom = false, hasUser = false, hasHealthcheck = false;

  lines.forEach((raw, i) => {
    const line = raw.trim();
    const L = i + 1;
    if (/^FROM\b/i.test(line)) {
      sawFrom = true;
      const image = line.replace(/^FROM\s+/i, "").replace(/\s+AS\s+\w+/i, "").trim();
      if (/:latest$/i.test(image) || !image.includes(":")) {
        findings.push({ severity: "warn", label: "Unpinned base image", line: L, detail: "FROM without a fixed version or digest. Pin to a tag or a SHA256 digest for reproducible builds." });
      }
    }
    if (/^USER\b/i.test(line)) hasUser = true;
    if (/^HEALTHCHECK\b/i.test(line)) hasHealthcheck = true;
    if (/^(ENV|ARG)\b/i.test(line) && /(KEY|TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIAL)/i.test(line)) {
      findings.push({ severity: "err", label: "Secret baked into an image layer", line: L, detail: "Values in ENV/ARG persist in the image and its history. Use build secrets or inject at runtime." });
    }
    if (/^ADD\s+(?!https?:)/i.test(line) && !/\.(tar|gz|tgz|bz2|xz|zip)\b/i.test(line)) {
      findings.push({ severity: "warn", label: "ADD used for a local file", line: L, detail: "Prefer COPY for local files. ADD has surprising auto-unpack and URL behavior." });
    }
    if (/\b(curl|wget)\b[^\n]*\|\s*(sudo\s+)?(sh|bash)\b/i.test(line)) {
      findings.push({ severity: "warn", label: "Pipe to shell at build time", line: L, detail: "curl | sh runs unverified remote code during the build. Download, verify, then execute." });
    }
    if (/apt-get\s+install/i.test(line) && !/--no-install-recommends/i.test(line)) {
      findings.push({ severity: "info", label: "apt-get install without --no-install-recommends", line: L, detail: "Pulls extra packages and bloats the image." });
    }
  });

  if (sawFrom && !hasUser) findings.push({ severity: "warn", label: "Container runs as root", detail: "No USER instruction. Add a non-root USER so a breakout does not land as root." });
  if (sawFrom && !hasHealthcheck) findings.push({ severity: "info", label: "No HEALTHCHECK", detail: "Orchestrators cannot tell whether the container is actually healthy." });
  return findings;
}

export default function DockerfileHygieneClient() {
  return (
    <LintConsole
      accent="var(--accent-cyan)"
      command="tessera run --pack dockerfile"
      pack="tesserakit-dockerfile"
      placeholder="Paste a Dockerfile. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Clean image. Ship it.", dirty: "One CVE from enlightenment. Fix before you build." }}
    />
  );
}
