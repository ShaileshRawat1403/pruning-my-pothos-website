"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    return `text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:text-accent-cyan px-2.5 py-1.5 rounded-lg ${
      isActive(path) 
        ? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20" 
        : "text-text-secondary hover:bg-white/5"
    }`;
  };

  return (
    <header className="sticky top-4 w-[calc(100%-2rem)] max-w-[1100px] mx-auto px-6 py-3.5 mt-4 rounded-3xl border border-white/5 bg-[#070b19]/75 backdrop-blur-xl shadow-premium z-50 transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        {/* Brand Logo */}
        <Link href="/" className="font-heading font-bold text-lg tracking-tight text-[var(--text-primary)] flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sys-logo-icon text-accent-cyan">
            <circle cx="12" cy="12" r="9" strokeDasharray="2.5 2.5" opacity="0.6" />
            <path d="M5 19L19 5" />
            <circle cx="12" cy="12" r="2.5" fill="var(--accent-purple)" stroke="none" />
            <circle cx="19" cy="5" r="1.5" fill="var(--accent-cyan)" stroke="none" />
          </svg>
          <span>Sans Serif Systems</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5">
          <Link href="/systems" className={linkClass("/systems")}>Systems</Link>
          <Link href="/sentences" className={linkClass("/sentences")}>Sentences</Link>
          <Link href="/sentiments" className={linkClass("/sentiments")}>Sentiments</Link>
          <Link href="/shelf" className={linkClass("/shelf")}>Shelf</Link>
          <Link href="/self" className={linkClass("/self")}>Self</Link>
          <Link href="/tools" className={linkClass("/tools")}>Tools</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
        </nav>

        {/* Right side utilities */}
        <div className="hidden xl:flex items-center gap-3">
          
          <a 
            href="https://github.com/ShaileshRawat1403" 
            className="github-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 transition-all text-[10px] font-mono font-bold uppercase tracking-wider text-text-primary hover:bg-white/10" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.3.3.7.8.7 1.7v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu toggle & utilities */}
        <div className="flex xl:hidden items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-[var(--text-primary)] focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {menuOpen && (
        <nav className="flex xl:hidden flex-col gap-2 mt-4 pt-4 border-t border-white/5 animate-slide-down">
          <Link href="/systems" onClick={() => setMenuOpen(false)} className={linkClass("/systems")}>Systems</Link>
          <Link href="/sentences" onClick={() => setMenuOpen(false)} className={linkClass("/sentences")}>Sentences</Link>
          <Link href="/sentiments" onClick={() => setMenuOpen(false)} className={linkClass("/sentiments")}>Sentiments</Link>
          <Link href="/shelf" onClick={() => setMenuOpen(false)} className={linkClass("/shelf")}>Shelf</Link>
          <Link href="/self" onClick={() => setMenuOpen(false)} className={linkClass("/self")}>Self</Link>
          <Link href="/tools" onClick={() => setMenuOpen(false)} className={linkClass("/tools")}>Tools</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className={linkClass("/about")}>About</Link>
          
          <div className="pt-2 mt-2 border-t border-white/5">
            <a 
              href="https://github.com/ShaileshRawat1403" 
              className="github-btn flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono font-bold uppercase tracking-wider text-text-primary hover:bg-white/10" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.3.3.7.8.7 1.7v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
