"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Normalise slash structures
    const p = path.endsWith("/") ? path.slice(0, -1) : path;
    const current = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    return current === p;
  };

  const linkClass = (path: string) => {
    return `block p-2 text-sm font-heading rounded transition-all hover:bg-white/5 ${
      isActive(path)
        ? "text-[color:var(--text-primary)] bg-accent-cyan/10 border-l-2 border-accent-cyan pl-3 font-semibold"
        : "text-[color:var(--text-secondary)] pl-3"
    }`;
  };

  return (
    <div className="docs-nav card-glass p-5 flex flex-col gap-3 min-w-[240px] md:sticky md:top-24 h-fit">
      <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)] mb-2 px-1">
        Architectural Core
      </h5>
      <Link href="/docs/natural-language-programming-stack" className={linkClass("/docs/natural-language-programming-stack")}>
        NLP Systems Stack
      </Link>
      <Link href="/docs/public-private-boundary" className={linkClass("/docs/public-private-boundary")}>
        Public / Private Boundary
      </Link>
      <Link href="/docs/tool-status" className={linkClass("/docs/tool-status")}>
        Tool Status Registry
      </Link>
      <Link href="/docs" className={linkClass("/docs")}>
        Introduction
      </Link>
    </div>
  );
}
