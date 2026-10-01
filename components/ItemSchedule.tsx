"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, inside, wait, type Rect } from "@/components/book/engine";
import { PANEL, panelCss, panelKit } from "@/components/book/details";

/**
 * Click an Item ID in the Item Schedule. The schedule is Dave's Figma frame
 * 55053:100960 with its rows changed to the Design Book's items (copy at
 * 55056:99609), exported at 2x. The hand runs down the table, clicks the
 * PL-02 tag on LOC 3, and the same details panel the Book opens slides in from
 * the right edge. Then the same tour as ItemDetails: Replace, Remove, scroll
 * to the documents, close.
 *
 * Row hover and the tag's hover ring are drawn here; the frame has no hover
 * design. Same contract as the other figures. See components/book/engine.ts.
 */

/* Item rows in design px: B114 Primary Bathroom, then B115 Shower. */
const ROWS = [270, 318, 366, 414, 534, 582, 630, 678, 726];
const SEL = 4; // LOC 3, PL-02
const tag = (y: number): Rect => ({ x: 423, y: y + 9.5, w: 34, h: 15 });
const HOME = { x: 700, y: 200 };

const STYLES = `${BASE}
.item-schedule .bk-row{position:absolute;left:24px;width:1318px;height:48px;background:rgba(0,113,227,.05);opacity:0;transition:opacity .14s ease,background-color .14s ease;pointer-events:none}
.item-schedule .bk-row.on{opacity:1}
.item-schedule .bk-row.sel{opacity:1;background:rgba(0,113,227,.09)}
.item-schedule .bk-tag{position:absolute;left:423px;width:34px;height:15px;border-radius:3px;box-shadow:0 0 0 1.5px var(--hi);background:rgba(0,113,227,.1);opacity:0;transition:opacity .12s ease;pointer-events:none}
.item-schedule .bk-tag.on{opacity:1}
${panelCss(".item-schedule", "right")}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Item Schedule for the primary bathroom and shower. The PL-02 Item ID on the shower head row is clicked and the item's details slide in from the right: Replace and Remove actions, a photo, specs, the locations it is assigned to and its installation, care and repair documents. The panel scrolls to the documents, then closes.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}schedule.webp" alt="">
${ROWS.map((y) => `<div class="bk-row" style="top:${y}px"></div>`).join("")}
${ROWS.map((y) => `<div class="bk-tag" style="top:${y + 9.5}px"></div>`).join("")}
${PANEL}
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">The Item Schedule carries the same items as the Design Book. A click on an Item ID opens the same details panel, so an item can be replaced or removed from either place.</div><button type="button" class="bk-replay">Replay</button></div>`;

export default function ItemSchedule() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const rows = [...host.querySelectorAll<HTMLElement>(".bk-row")];
    const tags = [...host.querySelectorAll<HTMLElement>(".bk-tag")];
    const kit = panelKit(host, stage, "right");

    const E = engine(stage, {
      home: HOME,
      reduced,
      rows: () => [],
      onFrame(_dt, pt) {
        kit.hover(pt);
        if (E.S.lock) return;
        const r = ROWS.findIndex((y) => inside(pt, { x: 24, y, w: 1318, h: 48 }));
        const onTag = r >= 0 && inside(pt, tag(ROWS[r]));
        rows.forEach((el, i) => el.classList.toggle("on", i === r));
        tags.forEach((el, i) => el.classList.toggle("on", onTag && i === r));
        if (onTag) E.S.mode = "point";
      },
    });
    const S = E.S;

    const select = (on: boolean) => {
      rows[SEL].classList.toggle("sel", on);
      tags[SEL].classList.toggle("on", on);
    };
    const closeState = () => {
      kit.closeState();
      S.lock = false;
      select(false);
    };
    function reset() {
      S.mode = "arrow";
      S.cx = HOME.x;
      S.cy = HOME.y;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      kit.reset();
      rows.forEach((el) => el.classList.remove("on"));
      tags.forEach((el) => el.classList.remove("on"));
      closeState();
    }

    async function loop(id: number) {
      const ok = () => id === S.run;
      const t = tag(ROWS[SEL]);
      while (ok()) {
        await wait(600); if (!ok()) return;
        /* Down into the table, reading the rows. */
        await E.moveTo(250, 296, { arc: 0.16 }); if (!ok()) return;
        await wait(450); if (!ok()) return;
        await E.moveTo(300, 440, { arc: -0.12, dur: 700 }); if (!ok()) return;
        await wait(250); if (!ok()) return;
        /* Over to the Item ID on LOC 3 and click it. */
        await E.reach(t.x + t.w / 2, t.y + t.h / 2, { arc: 0.12 }); if (!ok()) return;
        await wait(450); if (!ok()) return;
        await E.click(); if (!ok()) return;

        S.lock = true;
        S.mode = "arrow";
        rows.forEach((el) => el.classList.remove("on"));
        select(true);
        kit.show();
        if (!(await kit.tour(E, ok))) return;
        closeState();
        await E.moveTo(HOME.x, HOME.y, { arc: 0.15 }); if (!ok()) return;
        await wait(1200); if (!ok()) return;
        reset();
      }
    }

    if (reduced) {
      kit.reducedShow();
      select(true);
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk item-schedule" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
