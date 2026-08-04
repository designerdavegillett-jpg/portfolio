import { Fragment, type ReactNode } from "react";

/**
 * Splits a headline into per-word spans so MotionLayer can stagger them.
 * Wrap any run in *asterisks* to set it in italic — the display face has a
 * real italic and it carries most of the editorial voice.
 *
 * Runs on the server, so markup is deterministic and there is no hydration
 * mismatch and no flash of unsplit text.
 */
export function splitWords(text: string): ReactNode {
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  let i = 0;

  return segments.map((seg, si) => {
    const italic = seg.startsWith("*") && seg.endsWith("*");
    const content = italic ? seg.slice(1, -1) : seg;

    const words = content.split(/(\s+)/).map((chunk, ci) => {
      if (chunk.trim() === "") return <Fragment key={`s${ci}`}>{chunk}</Fragment>;
      return (
        <span className="hero-word" key={`w${i++}`}>
          {chunk}
        </span>
      );
    });

    return italic ? <em key={si}>{words}</em> : <Fragment key={si}>{words}</Fragment>;
  });
}

/** Same italic convention, but without the word-splitting. For card headlines. */
export function emphasize(text: string): ReactNode {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((seg, i) =>
      seg.startsWith("*") && seg.endsWith("*") ? (
        <em key={i}>{seg.slice(1, -1)}</em>
      ) : (
        <Fragment key={i}>{seg}</Fragment>
      ),
    );
}
