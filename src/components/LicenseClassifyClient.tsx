"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `MIT License

Copyright (c) 2026 Shailesh Rawat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY.`;

interface Lic {
  id: string;
  name: string;
  category: string;
  note: string;
}

const CATEGORY_NOTE: Record<string, string> = {
  Permissive: "Use, modify, and redistribute freely, including in closed-source products. Keep the notice.",
  "Strong copyleft": "Derivative works you distribute must be released under the same license. Plan distribution accordingly.",
  "Strong copyleft (network)": "Copyleft that also triggers over a network. Offering it as a hosted service obligates you to share source.",
  "Weak copyleft": "Linking is generally fine; changes to the licensed component itself must be shared.",
  "Weak copyleft (file-level)": "Copyleft applies per file. Files you do not modify can stay proprietary.",
  "Public domain": "No conditions to speak of. Attribution is courtesy, not obligation.",
};

function classify(text: string): Lic | null {
  const t = text.replace(/\s+/g, " ").toLowerCase();
  const hit = (s: string) => t.includes(s.toLowerCase());

  if (hit("apache license") && hit("version 2.0"))
    return { id: "Apache-2.0", name: "Apache License 2.0", category: "Permissive", note: "Permissive, with an explicit patent grant and a NOTICE requirement. Safe for most commercial use." };
  if (hit("gnu affero"))
    return { id: "AGPL-3.0", name: "GNU Affero GPL v3", category: "Strong copyleft (network)", note: "The network clause is the catch: SaaS use counts as distribution." };
  if (hit("gnu lesser"))
    return { id: "LGPL", name: "GNU Lesser GPL", category: "Weak copyleft", note: "Meant for libraries. Linking stays permissive; modifying the library does not." };
  if (hit("gnu general public license") && hit("version 3"))
    return { id: "GPL-3.0", name: "GNU GPL v3", category: "Strong copyleft", note: "Includes a patent grant and anti-tivoization terms." };
  if (hit("gnu general public license") && hit("version 2"))
    return { id: "GPL-2.0", name: "GNU GPL v2", category: "Strong copyleft", note: "No patent grant. Watch for compatibility with other licenses." };
  if (hit("mozilla public license") && hit("2.0"))
    return { id: "MPL-2.0", name: "Mozilla Public License 2.0", category: "Weak copyleft (file-level)", note: "A middle path: share changes to MPL files, keep the rest as you like." };
  if (hit("permission is hereby granted, free of charge"))
    return { id: "MIT", name: "MIT License", category: "Permissive", note: "Short and permissive, with no patent clause. The default for small open projects." };
  if (hit("permission to use, copy, modify, and/or distribute"))
    return { id: "ISC", name: "ISC License", category: "Permissive", note: "Functionally MIT, with slightly leaner wording." };
  if (hit("redistribution and use in source and binary forms")) {
    if (hit("neither the name"))
      return { id: "BSD-3-Clause", name: "BSD 3-Clause", category: "Permissive", note: "Permissive, plus a no-endorsement clause. Keep the copyright and disclaimer." };
    return { id: "BSD-2-Clause", name: "BSD 2-Clause", category: "Permissive", note: "Permissive. Keep the copyright notice and disclaimer." };
  }
  if (hit("this is free and unencumbered software released into the public domain") || hit("unlicense.org"))
    return { id: "Unlicense", name: "The Unlicense", category: "Public domain", note: "A public-domain dedication with a fallback license for jurisdictions that need one." };
  if (hit("cc0") || hit("creative commons zero"))
    return { id: "CC0-1.0", name: "CC0 1.0", category: "Public domain", note: "Common for data and docs. Not ideal for code, since it disclaims patents unclearly." };
  return null;
}

function analyze(text: string): Finding[] {
  const lic = classify(text);
  const out: Finding[] = [];
  if (!lic) {
    out.push({ severity: "warn", label: "No known license matched", detail: "This does not match a common SPDX signature. It may be custom, proprietary, or a modified template. Have a human read it before relying on it." });
    return out;
  }
  out.push({ severity: "ok", label: `${lic.name} · ${lic.id}`, detail: lic.note });
  out.push({ severity: "info", label: `Category · ${lic.category}`, detail: CATEGORY_NOTE[lic.category] ?? "" });

  const cyr = text.match(/copyright\s+(?:\(c\)\s*)?(\d{4}(?:\s*[-–]\s*\d{4})?)\s+(.+)/i);
  if (cyr) out.push({ severity: "info", label: "Copyright", detail: `${cyr[1]} ${cyr[2].split(/[.\n]/)[0].trim().slice(0, 80)}` });

  if (/^MIT/.test(lic.id) && !/as is/i.test(text))
    out.push({ severity: "warn", label: "Missing warranty disclaimer", detail: 'MIT text without the "AS IS" clause looks trimmed. Use the full template.' });

  return out;
}

export default function LicenseClassifyClient() {
  return (
    <LintConsole
      accent="var(--accent-green)"
      command="tessera run --pack license"
      pack="tesserakit-license"
      placeholder="Paste the contents of a LICENSE file. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "No license text to read.", dirty: "Classified. Read the obligations before you ship." }}
    />
  );
}
