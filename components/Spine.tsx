"use client";

import { useEffect, useState } from "react";

type Item = { id: string; name: string };

/**
 * Peripheral, non-interrupting control layer. Ticks sit at the right edge
 * and expand into labels on hover or when their section is active.
 */
export default function Spine({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.35;
      let best = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.offsetTop <= mid) best = i;
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="spine" aria-label="Section navigation">
      {items.map((it, i) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          data-on={i === active}
          onClick={(e) => go(e, it.id)}
        >
          <span className="name">{it.name}</span>
          <span className="tick" />
        </a>
      ))}
    </div>
  );
}
