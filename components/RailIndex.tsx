"use client";

import { useEffect, useRef, useState } from "react";

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

  /* The parent builds this array inline, so it is a new object on every render.
     Depending on it directly tore the observer down and rebuilt it every time
     the marker moved, which threw away the accumulated intersection ratios and
     left the marker reading a half-empty map. Depend on the ids instead, and
     reach the current array through a ref. */
  const itemsRef = useRef(items);
  /* Declared before the observer effect, so it has refreshed by the time that
     one runs. Writing the ref during render is not allowed. */
  useEffect(() => {
    itemsRef.current = items;
  });
  const idsKey = items.map((it) => it.id).join("|");

  useEffect(() => {
    const items = itemsRef.current;
    const seen = new Map<string, number>();
    let atBottom = false;

    const resolve = () => {
      /* The last section is usually too short to ever reach the reading band:
         the page runs out of scroll before it gets there, which would leave the
         marker stuck on the second to last item for the whole end of the page.
         Once the page is scrolled out, the last section is the one being read. */
      if (atBottom) {
        setActive(items[items.length - 1].id);
        return;
      }
      /* Otherwise the active section is the first one in document order still
         intersecting the band. Picking "most visible" instead makes the marker
         jump back and forth between two sections of similar height. */
      const current = items.find((it) => (seen.get(it.id) ?? 0) > 0);
      if (current) setActive(current.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target.id, entry.intersectionRatio);
        resolve();
      },
      /* Ignore the strip under the fixed header and the bottom two thirds, so a
         section counts as active while it occupies the reading band rather than
         the moment it peeks into view. */
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 1] },
    );

    const nodes = items
      .map((it) => document.getElementById(it.id))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));

    /* The one thing an observer cannot see: whether the page has hit its own
       end. Document height is cached and refreshed on resize, so the scroll
       handler compares three numbers and never forces a layout. */
    let docHeight = document.documentElement.scrollHeight;
    const onScroll = () => {
      const next = window.scrollY + window.innerHeight >= docHeight - 4;
      if (next !== atBottom) {
        atBottom = next;
        resolve();
      }
    };
    const onResize = () => {
      docHeight = document.documentElement.scrollHeight;
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [idsKey]);

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
