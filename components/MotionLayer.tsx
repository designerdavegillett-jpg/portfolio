"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The whole motion system, in one place.
 *
 * Server components opt in by adding className="reveal" and, optionally,
 * style={{ "--d": ".12s" }} for a stagger delay. Nothing else is needed —
 * no wrapper divs, no per-component client boundaries.
 */
export default function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- hero: word-by-word entrance -------------------------------------
    const words = document.querySelectorAll<HTMLElement>(".hero-word");
    words.forEach((w, i) => {
      w.style.transitionDelay = reduce ? "0s" : `${0.18 + i * 0.028}s`;
    });
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        words.forEach((w) => w.classList.add("in"));
      });
    });

    // --- everything else: reveal on intersect ----------------------------
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");

    if (reduce) {
      targets.forEach((t) => t.classList.add("in"));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
