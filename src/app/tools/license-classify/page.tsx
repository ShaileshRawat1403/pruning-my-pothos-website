import ToolShell from "../../../components/ToolShell";
import LicenseClassifyClient from "../../../components/LicenseClassifyClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "License Classifier",
  description: "Paste a LICENSE file and detect which license it is, its SPDX id, and what it obligates you to do: permissive, copyleft, or public domain. Runs offline in your browser.",
  path: "/tools/license-classify",
});

export default function LicenseClassifyPage() {
  return (
    <ToolShell
      eyebrow="Licensing & Compliance"
      title="License Classifier"
      intro="Paste the text of a LICENSE file. It matches the wording against common SPDX signatures, names the license and its id, and tells you plainly what category it falls into and what that obligates. No lookups, no network, all in the browser."
      accent="var(--accent-green)"
      pack="tesserakit-license"
      packBlurb="The full license pack detects and classifies project licenses offline."
    >
      <LicenseClassifyClient />
    </ToolShell>
  );
}
