"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    return `text-sm font-heading font-medium transition-colors hover:text-[var(--text-primary)] ${
      isActive(path) 
        ? "text-[var(--text-primary)] relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent-cyan after:rounded-full after:shadow-glow-cyan" 
        : "text-text-secondary"
    }`;
  };

  return (
    <header className="w-full max-w-[1200px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-50">
      <Link href="/" className="font-heading font-bold text-xl tracking-tight text-[var(--text-primary)] flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="sys-logo-icon text-accent-cyan">
          <circle cx="12" cy="12" r="9" strokeDasharray="2.5 2.5" opacity="0.6" />
          <path d="M5 19L19 5" />
          <path d="M12 5a7 7 0 0 1 7 7" strokeDasharray="1.5 1.5" />
          <circle cx="12" cy="12" r="2.5" fill="var(--accent-purple)" stroke="none" />
          <circle cx="19" cy="5" r="1.5" fill="var(--accent-cyan)" stroke="none" />
        </svg>
        <span>Sans Serif</span> Systems
      </Link>

      <nav className="flex flex-wrap justify-center items-center gap-6">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/tools" className={linkClass("/tools")}>Tools</Link>
        <Link href="/canvases" className={linkClass("/canvases")}>Canvases</Link>
        <Link href="/docs" className={linkClass("/docs")}>Docs</Link>
        <Link href="/live-lab" className={linkClass("/live-lab")}>Live Lab</Link>
        <Link href="/sentiments" className={linkClass("/sentiments")}>Sentiments</Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        <a href="https://github.com/ShaileshRawat1403" className="github-btn" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.3.3.7.8.7 1.7v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
