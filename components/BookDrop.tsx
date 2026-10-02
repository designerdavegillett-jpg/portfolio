"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, RAIL, rail, engine, controller, inside, type Rect } from "@/components/book/engine";

/**
 * Drag to place. Efficiently's Books screen with two empty slots on the page.
 * The hand hovers a row in the room list (the hover card is Dave's Figma
 * design, 55036:99615), picks it up, carries it across as a floating card
 * that trails the hand on a spring, and drops it. Open slots light up as
 * targets while a card is lifted; the slot under the hand fills blue. A dimmed
 * copy stays in the list where the card came from, and once it lands the row
 * is marked with the page it now sits on.
 *
 * Same contract as the other figures: injected markup and styles, classes
 * prefixed bk- under .bk, behaviour in one useEffect. See components/book/engine.ts.
 */

const STYLES = `${BASE}
.book-drop .bk-target{position:absolute;border-radius:2px;pointer-events:none;opacity:0;transition:opacity .18s ease,box-shadow .14s ease,background-color .14s ease}
.book-drop .bk-target.armed{opacity:1;box-shadow:inset 0 0 0 1.5px rgba(0,113,227,.45);background:rgba(0,113,227,.03)}
.book-drop .bk-target.over{opacity:1;box-shadow:inset 0 0 0 2px var(--hi),0 0 0 4px rgba(0,113,227,.18);background:rgba(0,113,227,.1)}
.book-drop .bk-trace{position:absolute;left:24px;width:288px;height:64px;background:#222426;opacity:0;pointer-events:none;border-radius:8px}
.book-drop .bk-ghost{position:absolute;left:0;top:0;width:288px;height:64px;border-radius:8px;overflow:hidden;opacity:0;pointer-events:none;will-change:transform;transform-origin:32px 32px}
.book-drop .bk-ghost img{width:288px;height:64px}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="An item is picked up from the room list and dragged onto an empty slot on the design book page. The slot highlights as the item passes over it, the product photo drops in, and the list marks the item as placed on page 4.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}screen.webp" alt="">
<img class="bk-slot" data-r="p1" src="${IMG}slot-1-empty.png" style="left:436px;top:482px" alt="">
<img class="bk-slot" data-r="p2" src="${IMG}slot-2-empty.png" style="left:851px;top:482px" alt="">
<img class="bk-slot bk-fill" data-r="f1" src="${IMG}slot-1-filled.webp" style="left:436px;top:482px" alt="">
<img class="bk-slot bk-fill" data-r="f2" src="${IMG}slot-2-filled.webp" style="left:851px;top:482px" alt="">
<div class="bk-target" data-r="t1" style="left:436px;top:482px;width:184px;height:169px"></div>
<div class="bk-target" data-r="t2" style="left:851px;top:482px;width:184px;height:169px"></div>
${RAIL}
<div class="bk-trace" data-r="tr1" style="top:240px"></div>
<div class="bk-trace" data-r="tr2" style="top:502px"></div>
<div class="bk-ghost" data-r="g1"><img src="${IMG}card-1.webp" alt=""></div>
<div class="bk-ghost" data-r="g2"><img src="${IMG}card-2.webp" alt=""></div>
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">Hover an item in the room list and a grab handle appears. Pick it up and the open slots on the page light up, the one under the cursor fills blue, and the photo, name and SKU drop in on release. The list then marks the item with the page it sits on.</div><button type="button" class="bk-replay">Replay</button></div>`;

type Item = {
  row: ReturnType<ReturnType<typeof rail>>;
  trace: HTMLElement;
  ghost: HTMLElement;
  fill: HTMLElement;
  target: HTMLElement;
  pin: HTMLElement;
  card: Rect;
  origin: { x: number; y: number };
  grab: { x: number; y: number };
  slot: Rect;
  done: boolean;
};

export default function BookDrop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const r = (k: string) => q(`[data-r="${k}"]`);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage"), rl = q(".bk-rl"), rows = rail(rl);

    const ITEMS: Item[] = [1, 2].map((n) => ({
      row: rows(n as 1 | 2),
      trace: r(`tr${n}`),
      ghost: r(`g${n}`),
      fill: r(`f${n}`),
      target: r(`t${n}`),
      pin: q(`.bk-pin.i${n}`),
      card: { x: 24, y: n === 1 ? 240 : 502, w: 288, h: 64 },
      origin: { x: 24, y: n === 1 ? 240 : 502 },
      grab: { x: 56, y: n === 1 ? 272 : 534 },
      slot: { x: n === 1 ? 436 : 851, y: 482, w: 184, h: 169 },
      done: false,
    }));

    /* The lifted card trails the hand on an underdamped spring. */
    const G = { x: 0, y: 0, vx: 0, vy: 0, s: 1, vs: 0, ts: 1 };
    let drag: Item | null = null;

    const E = engine(stage, {
      home: { x: 900, y: 330 },
      reduced,
      rows: () => ITEMS.filter((i) => !i.done).map((i) => ({ row: i.row, card: i.card })),
      onFrame(dt, pt) {
        if (!drag) return;
        const tx = pt.x - 32, ty = pt.y - 32, k = 420, c = 30;
        G.vx += ((tx - G.x) * k - G.vx * c) * dt;
        G.vy += ((ty - G.y) * k - G.vy * c) * dt;
        G.x += G.vx * dt;
        G.y += G.vy * dt;
        G.vs += ((G.ts - G.s) * 300 - G.vs * 18) * dt;
        G.s += G.vs * dt;
        drag.ghost.style.transform = `translate(${G.x}px,${G.y}px) scale(${G.s})`;
        ITEMS.forEach((o) => o.target.classList.toggle("over", !o.done && inside(pt, o.slot)));
      },
    });
    const S = E.S;
    const wait = E.wait;

    function reset() {
      drag = null;
      S.lock = false;
      S.mode = "arrow";
      S.cx = 900;
      S.cy = 330;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      rl.classList.remove("bk-lift");
      ITEMS.forEach((it) => {
        it.done = false;
        it.fill.style.opacity = "0";
        it.ghost.style.opacity = "0";
        it.ghost.style.boxShadow = "none";
        it.trace.style.opacity = "0";
        it.row.set("on", false);
        it.target.classList.remove("armed", "over");
        it.pin.classList.remove("on");
      });
    }

    async function dragItem(it: Item, id: number) {
      const ok = () => id === S.run;
      await E.reach(it.grab.x + 6, it.grab.y + 4, { arc: 0.12 }); if (!ok()) return;
      await E.moveTo(it.grab.x, it.grab.y, { arc: 0, dur: 420 }); if (!ok()) return;
      await wait(340); if (!ok()) return;
      await E.click("Pick up the item"); if (!ok()) return;

      /* Grab: the hover card lifts off as a floating card; a dimmed copy stays behind. */
      S.lock = true;
      S.mode = "grab";
      it.row.set("on", true);
      Object.assign(G, { x: it.origin.x, y: it.origin.y, vx: 0, vy: 0, s: 1, vs: 0, ts: 1.04 });
      it.ghost.style.transform = `translate(${G.x}px,${G.y}px)`;
      it.ghost.style.opacity = "1";
      it.ghost.animate(
        [{ boxShadow: "0 0 0 rgba(0,0,0,0)" }, { boxShadow: "0 18px 36px rgba(0,0,0,.45),0 4px 4px rgba(0,0,0,.25)" }],
        { duration: 220, easing: "ease-out", fill: "forwards" },
      );
      it.trace.animate([{ opacity: 0 }, { opacity: 0.6 }], { duration: 180, fill: "forwards" });
      rl.classList.add("bk-lift");
      drag = it;
      ITEMS.forEach((o) => { if (!o.done) o.target.classList.add("armed"); });
      await wait(170); if (!ok()) return;
      await E.moveTo(S.cx + 14, S.cy - 4, { arc: 0, dur: 180 }); if (!ok()) return;
      await E.reach(it.slot.x + it.slot.w / 2 + 8, it.slot.y + it.slot.h / 2 + 6, { arc: -0.16 }); if (!ok()) return;
      await wait(420); if (!ok()) return;
      await E.click("Drop it on the page"); if (!ok()) return;

      /* Release: the card tucks into the slot and the tile settles in. */
      drag = null;
      S.mode = "arrow";
      S.lock = false;
      it.done = true;
      ITEMS.forEach((o) => o.target.classList.remove("armed"));
      const gx = it.slot.x + it.slot.w / 2 - 144, gy = it.slot.y + it.slot.h / 2 - 32;
      it.ghost.getAnimations().forEach((a) => a.cancel());
      it.ghost.animate(
        [{ transform: it.ghost.style.transform, opacity: 1 }, { transform: `translate(${gx}px,${gy}px) scale(.5)`, opacity: 0 }],
        { duration: 240, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
      );
      it.fill.animate(
        [{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "scale(1.012)", offset: 0.65 }, { opacity: 1, transform: "scale(1)" }],
        { duration: 460, delay: 90, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
      );
      it.trace.animate([{ opacity: 0.6 }, { opacity: 0 }], { duration: 160, fill: "forwards" });
      it.row.set("on", false);
      rl.classList.remove("bk-lift");
      wait(380).then(() => {
        if (!ok()) return;
        it.pin.classList.add("on");
        it.pin.animate([{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, offset: 0.6 }, { opacity: 1 }], {
          duration: 320,
          easing: "cubic-bezier(.2,.8,.2,1.2)",
        });
      });
      await wait(200);
      it.target.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: "ease-out", fill: "forwards" });
      await wait(420);
      it.target.classList.remove("over");
      it.target.getAnimations().forEach((a) => a.cancel());
      await wait(260);
    }

    async function loop(id: number) {
      while (id === S.run) {
        await wait(500); if (id !== S.run) return;
        for (const it of ITEMS) {
          await dragItem(it, id);
          if (id !== S.run) return;
        }
        await E.reach(1180, 700, { arc: 0.1 }); if (id !== S.run) return;
        await wait(2000); if (id !== S.run) return;
        await Promise.all(ITEMS.map((it) => it.fill.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, fill: "forwards" }).finished));
        if (id !== S.run) return;
        E.lap();
        reset();
        S.cx = 1180;
        S.cy = 700;
      }
    }

    if (reduced) {
      ITEMS.forEach((it) => {
        it.fill.style.opacity = "1";
        it.pin.classList.add("on");
      });
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk book-drop" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
