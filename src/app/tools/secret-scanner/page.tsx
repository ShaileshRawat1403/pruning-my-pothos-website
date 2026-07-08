import Link from "next/link";
import SecretScannerClient from "../../../components/SecretScannerClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Secret Shape Scanner",
  description: "Detect secrets by shape, not just by key name, and redact them in place. A browser preview of the Tessera config pack. Nothing leaves your browser.",
  path: "/tools/secret-scanner",
});

export default function SecretScannerPage() {
  const schema = getSoftwareAppSchema({
    name: "Secret Shape Scanner",
    description: "Detect secrets by shape and redact them in place, entirely in the browser.",
    path: "/tools/secret-scanner",
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div className="font-mono text-xs flex gap-2" style={{ color: "var(--text-muted)" }}>
        <Link href="/tools" className="link-slide" style={{ color: "var(--text-secondary)" }}>Stack</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>Secret Shape Scanner</span>
      </div>

      {/* Hero */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Security &amp; Secrets
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Secret Shape Scanner
        </h1>
        <p className="text-base leading-relaxed max-w-[700px]" style={{ color: "var(--text-secondary)" }}>
          Paste an .env, a config, or a log. It finds secrets by their shape, the way a leaked
          key actually looks, rather than trusting the field name, and redacts them in place.
          Everything runs in your browser. Nothing is uploaded.
        </p>
      </section>

      {/* Tool */}
      <SecretScannerClient />

      {/* Tessera tie-in */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: "var(--card-border)" }}>
        <div className="lg:col-span-7 flex flex-col gap-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <h2 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>This is a preview of a Tessera pack</h2>
          <p>
            The browser demo runs a handful of shape detectors client-side. The full check ships in
            Tessera, an offline toolkit of 24 job packs that turn a repository into one reviewable
            HTML report. The <code>config</code> pack inventories every key across your env and code,
            redacts leaked secrets by name and by value shape, and reports drift.
          </p>
          <p>Every pack follows one contract: normalize, validate, generate artifacts. No services, no API keys, no network calls.</p>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="ledger-surface p-5 font-mono text-xs" style={{ borderRadius: "4px" }}>
            <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}>
              <span>install.tty</span>
              <span style={{ color: "var(--accent-green)" }}>offline</span>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>pip install tesserakit-config
            </p>
            <p className="mt-1.5" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>pipx install tesserakit-config<span style={{ color: "var(--text-muted)" }}> # isolated CLI install</span>
            </p>
            <p className="mt-1.5" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>uv tool install tesserakit-config
            </p>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>tessera run --input . --output run
            </p>
            <p className="mt-2" style={{ color: "var(--text-muted)" }}># then open run/index.html</p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://pypi.org/project/tesserakit-config/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-secondary text-center flex-1"
            >
              View on PyPI &rarr;
            </a>
            <a
              href="https://github.com/ShaileshRawat1403/tessera"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-secondary text-center flex-1"
            >
              GitHub &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
