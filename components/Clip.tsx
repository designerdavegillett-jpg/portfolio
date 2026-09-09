"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short silent UI clip inside a figure.
 *
 * A seven second interaction is a video, not an image. The source recording was
 * a 2 MB GIF; the same thing as h264 at twice the resolution is 329 KB.
 *
 * The state is driven by what the element is actually doing, not by whether
 * `play()` resolved. That promise rejects when autoplay is refused, but it also
 * simply never settles while the tab is in the background, and an earlier
 * version of this component sat waiting on it and left the viewer a poster
 * frame with no controls and no way to start it.
 *
 * So: render inert on the server, try to play on mount, and after a beat show
 * controls if the thing is not actually running. Retry when the tab comes back
 * to the foreground, since that is the usual reason it did not start.
 */
export default function Clip({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"static" | "playing" | "manual">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPlaying = () => setMode("playing");
    const onPause = () => setMode("manual");
    el.addEventListener("playing", onPlaying);
    el.addEventListener("pause", onPause);

    let timer: number | undefined;

    const attempt = () => {
      window.clearTimeout(timer);
      if (query.matches) {
        el.pause();
        setMode("manual");
        return;
      }
      void el.play().catch(() => {});
      /* Whatever the promise does, judge it on the element a moment later. */
      timer = window.setTimeout(() => {
        setMode(el.paused ? "manual" : "playing");
      }, 1000);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") attempt();
    };

    attempt();
    query.addEventListener("change", attempt);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("pause", onPause);
      query.removeEventListener("change", attempt);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="clip"
      poster={poster}
      loop
      muted
      playsInline
      /* Shown whenever the clip is not actually running, so it stays reachable
         for anyone whose browser refused to start it. */
      controls={mode === "manual"}
      preload="metadata"
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
