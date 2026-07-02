"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: stop observing once it's visible so it doesn't animate out and in repeatedly
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all elements with the .animate-on-scroll class
    // We add a small timeout to ensure the DOM is fully rendered after navigation
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll:not(.is-visible)");
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  return null; // This component doesn't render anything visible
}
