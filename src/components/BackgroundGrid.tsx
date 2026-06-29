"use client";

import { usePathname } from "next/navigation";

export default function BackgroundGrid() {
  const pathname = usePathname();
  const isSentiments = 
    pathname.startsWith("/sentiments") || 
    pathname.startsWith("/sentences") || 
    pathname.startsWith("/self") || 
    pathname.startsWith("/shelf");

  if (isSentiments) return null; // No cyber grid lines inside the calm garden!
  return <div className="grid-overlay" />;
}
