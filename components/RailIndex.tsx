"use client";

import { useEffect, useState } from "react";

type Item = { id: string; name: string };

/**
 * Sticky section index for the rail.
 *
 * Replaces the old Spine, which navigated the same sections from a floating
 * strip at the right edge while the rail on the left repeated each section
 * heading. Two affordances for one job, on opposite sides of the screen. This
 * is the one that survived, because it gives the rail a reason to hold its
 * 14rem.
 *
 * Uses IntersectionObserver rather than a scroll handler: the browser does the
 * intersection maths off the main thread, so this does not run on every frame
 * of a scroll the way the Spine's listener did.
 */
export default function RailIndex({ items, label }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const seen = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.intersectionRatio);
        }
        /* The active section is the first one in document order that is still
           intersecting. Picking "most visible" instead makes the marker jump
           back and forth between two sections of similar height. */
        const current = items.find((it) => (seen.get(it.id) ?? 0) > 0);
        if (current) setActive(current.id);
      },
      /* Ignore the top of the viewport that sits under the fixed header, and
         the bottom two thirds, so a section counts as active while it occupies
         the reading band rather than the moment it peeks into view. */
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 1] },
    );

    const nodes = items
      .map((it) => document.getElementById(it.id))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {label && <div className="label">{label}</div>}
      <nav className="rail-index" aria-label="Sections">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            data-on={it.id === active}
            aria-current={it.id === active ? "true" : undefined}
            onClick={(e) => go(e, it.id)}
          >
            {it.name}
          </a>
        ))}
      </nav>
    </>
  );
}
