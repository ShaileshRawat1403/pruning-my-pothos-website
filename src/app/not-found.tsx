import Link from "next/link";
import TerminalSim from "../components/TerminalSim";

export default function NotFound() {
  return (
    <div className="min-h-[72vh] flex flex-col items-center justify-center gap-8 py-20 text-center">
      <div className="w-full max-w-lg text-left">
        <TerminalSim
          command="sudo prove-existence /404"
          steps={[
            { text: "Validating biological footprint...", status: "ok" },
            { text: "Querying the void for this page...", status: "warn", ms: 800 },
            { text: "Not found. It may never have existed.", status: "err", ms: 800 },
            { text: "Identity verified. Welcome back, chemical machine #48291.", status: "info" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h1 className="font-heading text-6xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>404</h1>
        <p className="text-base max-w-md" style={{ color: "var(--text-secondary)" }}>
          The page you asked for is not here. Reality distortion field detected in buffer.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-premium btn-primary">Back to safety</Link>
        <Link href="/tools" className="btn-premium btn-secondary">Open the Stack &rarr;</Link>
      </div>
    </div>
  );
}
