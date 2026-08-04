"use client";

import { useEffect, useState } from "react";

/** Renders nothing on the server so the clock can never mismatch on hydration. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Los_Angeles",
        }),
      );
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time ?? "—"}</span>;
}
