"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, RAIL, rail, engine, controller, type Rect } from "@/components/book/engine";
import { PANEL, panelCss, panelKit } from "@/components/book/details";

/**
 * Click for details. The same Books screen with the showerhead already on the
 * page, so its row carries the placed marker. A click on the row slides its
 * details out beside the list: Replace (opens the Catalog) and Remove (takes
 * the item off its Item ID card) pinned at the top with the Item ID, then a
 * square photo, specs, every location the ID is assigned to and the item's
 * documents, which sit below the fold. The hand hovers both actions, scrolls
 * to the documents, hovers one, and closes the panel.
 *
 * The panel lives in components/book/details.ts, shared with ItemSchedule.
 * Same contract as the other figures. See components/book/engine.ts.
 */

const STYLES = `${BASE}
.item-details .bk-seltint{position:absolute;left:24px;top:240px;width:288px;height:64px;border-radius:8px;background:rgba(41,151,255,.18);opacity:0;transition:opacity .16s ease;pointer-events:none}
.item-details .bk-seltint.on{opacity:1}
${panelCss(".item-details", "left")}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="An item in the room list is clicked and its details slide out beside the list: Replace and Remove actions, a photo, specs, the locations it is assigned to and its installation, care and repair documents. The panel scrolls to the documents, then closes.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}screen.webp" alt="">
${RAIL}
<div class="bk-seltint"></div>
${PANEL}
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">A click on the row opens its details beside the list, so the page stays in view. Replace opens the Catalog to swap in a different item and Remove takes it off its Item ID card. Below that, every location the ID is assigned to and the item's documents.</div><button type="button" class="bk-replay">Replay</button></div>`;

export default function ItemDetails() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage"), rl = q(".bk-rl");
    const row = rail(rl)(1);
    const card: Rect = { x: 24, y: 240, w: 288, h: 64 };
    q(".bk-pin.i1").classList.add("on"); // already on the page

    const tint = q(".bk-seltint");
    const kit = panelKit(host, stage, "left");

    const E = engine(stage, {
      home: { x: 760, y: 420 },
      reduced,
      rows: () => (kit.K.open ? [] : [{ row, card }]),
      onFrame: (_dt, pt) => kit.hover(pt),
    });
    const S = E.S;
    const wait = E.wait;

    const closeState = () => {
      kit.closeState();
      S.lock = false;
      row.set("sel", false);
      tint.classList.remove("on");
    };
    function reset() {
      S.mode = "arrow";
      S.cx = 760;
      S.cy = 420;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      kit.reset();
      row.set("on", false);
      closeState();
    }

    async function loop(id: number) {
      const ok = () => id === S.run;
      while (ok()) {
        await wait(600); if (!ok()) return;
        await E.reach(150, 272, { arc: 0.14 }); if (!ok()) return;
        await wait(500); if (!ok()) return;
        await E.click(); if (!ok()) return;

        S.lock = true;
        S.mode = "arrow";
        row.set("sel", true);
        tint.classList.add("on");
        kit.show();
        if (!(await kit.tour(E, ok))) return;
        closeState();
        await E.moveTo(760, 420, { arc: 0.15 }); if (!ok()) return;
        await wait(1200); if (!ok()) return;
        E.lap();
        reset();
      }
    }

    if (reduced) {
      kit.reducedShow();
      row.set("sel", true);
      tint.classList.add("on");
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk item-details" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
