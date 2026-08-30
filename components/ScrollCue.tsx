"use client";

import { useEffect, useState } from "react";

/**
 * The "Scroll" hint in the hero. Visible only at the very top of the page —
 * fades out as soon as the user scrolls, and only reappears once they're
 * back at the top (or the page reloads).
 */
export default function ScrollCue() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    // Always show on mount, even if the browser restored a scrolled-down
    // position from before a refresh — only react to scrolling that
    // happens from here on.
    const onScroll = () => setAtTop(window.scrollY <= 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="scroll-cue reveal"
      style={
        {
          "--d": "1.2s",
          opacity: atTop ? undefined : 0,
          transition: "opacity .4s var(--ease)",
          pointerEvents: atTop ? undefined : "none",
        } as React.CSSProperties
      }
    >
      Scroll <i />
    </div>
  );
}
