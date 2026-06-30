"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Detect if current route belongs to sentiments writing garden
  const isSentiments = 
    pathname.startsWith("/sentiments") || 
    pathname.startsWith("/sentences") || 
    pathname.startsWith("/self") || 
    pathname.startsWith("/shelf");

  if (!isSentiments) {
    // Systems variant (default)
    return (
      <footer className="w-full border-t border-[var(--card-border)] px-8 py-12 mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h5 className="font-heading text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">Systems</h5>
              <p className="text-sm text-text-secondary max-w-[320px]">
                Open-source utilities, visual canvases, and evaluation harness templates for AI-assisted workflow development.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-heading text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">Ecosystem</h5>
              <Link href="/tools" className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">Browse Store</Link>
              <Link href="/canvases" className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">Interactive Canvases</Link>
              <Link href="/docs" className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">Command Documentation</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-heading text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">Open Source</h5>
              <p className="text-sm text-text-secondary">
                Interested in contributing new loop patterns, testing custom prompts, or collaborating on open schemas? Let's connect.
              </p>
              <a href="mailto:shailesh.rawat1403@gmail.com" className="text-sm text-accent-cyan hover:underline mt-1 block">
                shailesh.rawat1403@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 items-center border-t border-[var(--card-border)] pt-8 mt-4 text-center">
            <p className="text-sm text-text-muted max-w-[650px] leading-relaxed">
              Sans Serif Systems is a public platform by Shailesh Rawat for inspectable AI-assisted work across code, content, communication, and change adoption.
            </p>
            <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4 mt-2 text-xs text-text-muted">
              <p>&copy; {year} Sans Serif Systems. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/" className="hover:text-accent-cyan transition-colors font-semibold">Systems</Link>
                <Link href="/sentiments" className="hover:text-accent-cyan transition-colors font-semibold">Sentiments</Link>
                <Link href="/sentences" className="hover:text-accent-cyan transition-colors font-semibold">Writing Archive</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Sentiments writing workspace clean style
  const links = [
    { label: "Email", href: "mailto:shailesh.rawat1403@gmail.com", external: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shailesh-rawat", external: true },
    { label: "GitHub", href: "https://github.com/ShaileshRawat1403", external: true },
    { label: "pruningmypothos.com", href: "https://pruningmypothos.com", external: true, primary: true },
  ];

  return (
    <footer className="w-full border-t border-[var(--card-border)] px-4 py-8 mt-auto flex flex-col items-center gap-4 text-center max-w-[1100px] mx-auto">
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link, idx) => (
          <a
            key={idx}
            className={`px-3 py-1 border border-[var(--card-border)] rounded-full text-xs font-mono text-text-secondary bg-black/10 hover:border-accent-cyan/40 hover:text-[var(--text-primary)] transition-all ${
              link.primary ? "border-accent-cyan/30 text-[var(--text-primary)]" : ""
            }`}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-xs text-text-secondary max-w-[64ch] leading-relaxed">
        PruningMyPothos is a thinking workspace on AI systems, orchestration, platform integration, governance, and adoption.
      </p>
      <div className="text-xs font-mono text-text-muted">
        &copy; {year} Shailesh Rawat (san_serif_sentiments). All rights reserved.
      </div>
    </footer>
  );
}
