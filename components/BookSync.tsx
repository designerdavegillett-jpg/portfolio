"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, RAIL, engine, controller, inside, type Rect } from "@/components/book/engine";

/**
 * The Design Book after PL-02 is replaced in the Item Schedule (the
 * ItemSchedule figure). The room list picks up the new item, the Kohler
 * showerhead, but the page keeps the Elysian showerhead it was laid out with.
 * The row's green "On Pg 4" marker turns into an amber "Pg 4 out of date"
 * flag; hovering it says what the page still shows and outlines that spot on
 * the canvas.
 *
 * The new row (row-1-kohler.webp) is the Books frame 55026:99643 with the
 * Kohler item from Figma 54642:109696 dropped in, exported at 2x and cut like
 * row-1.webp. The sync notice, the flag, its tooltip and the outline are
 * designs, not captures. Same contract as the other figures. See
 * components/book/engine.ts.
 */

const WARN = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 21h20Z"/><path d="M12 10v4M12 17.5v.5"/></svg>`;
const SYNC = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>`;

/* In design px. */
const FLAG: Rect = { x: 120, y: 241, w: 112, h: 16 };
const TILE: Rect = { x: 430, y: 476, w: 196, h: 180 }; // Elysian tile and its caption on the page
const HOME = { x: 900, y: 330 };

const STYLES = `${BASE}
.book-sync .bk-rl .bk-new{left:24px;top:12px;width:272px;height:48px;opacity:0}
.book-sync .bk-rl .bk-sweep{left:24px;top:12px;width:288px;height:48px;border-radius:8px;background:rgba(41,151,255,.22);opacity:0}
.book-sync .bk-rl .bk-flag{left:120px;top:13px;height:16px;display:flex;align-items:center;gap:4px;padding:0 6px 0 4px;border-radius:4px;background:rgba(224,148,32,.2);color:#ffc56b;font:600 10px/1 var(--app);white-space:nowrap;opacity:0;transition:background-color .14s}
.book-sync .bk-rl .bk-flag.hot{background:rgba(224,148,32,.34)}
.book-sync .bk-note{position:absolute;left:24px;top:700px;width:288px;height:40px;display:flex;align-items:center;gap:8px;padding:0 12px;border-radius:8px;background:#36383b;color:#e9eaeb;font-size:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0}
.book-sync .bk-note svg{color:#8fc1ff;flex:none}
.book-sync .bk-ftip{position:absolute;left:96px;top:266px;width:244px;padding:9px 11px;border-radius:6px;background:#3e4146;color:#fff;font-size:11.5px;line-height:1.45;box-shadow:0 6px 16px rgba(0,0,0,.35);opacity:0;transform:translateY(-4px);transition:opacity .16s ease,transform .16s ease;pointer-events:none}
.book-sync .bk-ftip::after{content:"";position:absolute;bottom:100%;left:74px;border:5px solid transparent;border-bottom-color:#3e4146}
.book-sync .bk-ftip.on{opacity:1;transform:none}
.book-sync .bk-ftip b{font-weight:700}
.book-sync .bk-stale{position:absolute;left:${TILE.x}px;top:${TILE.y}px;width:${TILE.w}px;height:${TILE.h}px;border-radius:4px;box-shadow:0 0 0 2px #e0941f,0 0 0 6px rgba(224,148,32,.18);opacity:0;transition:opacity .2s ease;pointer-events:none}
.book-sync .bk-stale.on{opacity:1}
.book-sync .bk-stale span{position:absolute;left:-2px;bottom:100%;margin-bottom:6px;height:20px;display:flex;align-items:center;gap:4px;padding:0 7px 0 6px;border-radius:4px;background:#e0941f;color:#1c1e20;font:700 10.5px/1 var(--app);white-space:nowrap}`;

const RAIL_PLUS = RAIL.replace(
  /<\/div>$/,
  `<div class="bk-sweep"></div><img class="bk-new" src="${IMG}row-1-kohler.webp" alt=""><div class="bk-flag">${WARN}Pg 4 out of date</div></div>`,
);

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Design Book. After the showerhead is replaced in the Item Schedule, the room list shows the new Kohler showerhead, while page 4 still shows the Elysian showerhead it was laid out with. The row is flagged Pg 4 out of date, and hovering the flag outlines the old item on the page.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}screen.webp" alt="">
${RAIL_PLUS}
<div class="bk-note">${SYNC}PL-02 changed in the Item Schedule</div>
<div class="bk-ftip">Page 4 still shows the <b>Elysian</b> Transitional 12" Rain Shower Head. Replace it on the page to update the layout.</div>
<div class="bk-stale"><span>${WARN}Previous item</span></div>
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">The room list shows the new item as soon as it changes in the schedule. The page keeps the item it was laid out with, and the row is flagged until the page is updated.</div><button type="button" class="bk-replay">Replay</button></div>`;

export default function BookSync() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const pin = q(".bk-pin.i1"), nu = q(".bk-new"), sweep = q(".bk-sweep"), flag = q(".bk-flag");
    const note = q(".bk-note"), tip = q(".bk-ftip"), stale = q(".bk-stale");
    let flagged = false;

    const E = engine(stage, {
      home: HOME,
      reduced,
      rows: () => [],
      onFrame(_dt, pt) {
        const onFlag = flagged && inside(pt, { x: FLAG.x - 2, y: FLAG.y - 3, w: FLAG.w + 4, h: FLAG.h + 6 });
        flag.classList.toggle("hot", onFlag);
        tip.classList.toggle("on", onFlag);
        stale.classList.toggle("on", onFlag || (flagged && inside(pt, TILE)));
      },
    });
    const S = E.S;
    const wait = E.wait;
    const fwd = { fill: "forwards" as const };

    function reset() {
      S.mode = "arrow";
      S.cx = HOME.x;
      S.cy = HOME.y;
      flagged = false;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      pin.classList.add("on");
      [flag, tip, stale].forEach((el) => el.classList.remove("hot", "on"));
    }

    async function loop(id: number) {
      const ok = () => id === S.run;
      while (ok()) {
        await wait(1200); if (!ok()) return;
        /* The change arrives from the schedule. */
        note.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: "ease-out", ...fwd });
        await wait(500); if (!ok()) return;
        sweep.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 1100, easing: "ease-out" });
        nu.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, ...fwd });
        pin.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, ...fwd });
        await wait(260); if (!ok()) return;
        flag.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "none" }], { duration: 240, easing: "ease-out", ...fwd });
        flagged = true;
        await wait(1500); if (!ok()) return;
        note.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, ...fwd });

        /* What the flag means: the page still has the old item. */
        await E.reach(FLAG.x + 60, FLAG.y + 9, { arc: 0.14 }); if (!ok()) return;
        await wait(2600); if (!ok()) return;
        await E.reach(TILE.x + TILE.w / 2, TILE.y + 70, { arc: -0.12 }); if (!ok()) return;
        await wait(2000); if (!ok()) return;
        await E.moveTo(HOME.x, HOME.y, { arc: 0.15 }); if (!ok()) return;
        await wait(1400); if (!ok()) return;
        E.lap();
        reset();
      }
    }

    pin.classList.add("on");
    if (reduced) {
      nu.style.opacity = "1";
      pin.classList.remove("on");
      flag.style.opacity = "1";
      stale.classList.add("on");
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk book-sync" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
