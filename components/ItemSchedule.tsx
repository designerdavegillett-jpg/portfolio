"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, inside, mj, type Rect } from "@/components/book/engine";
import { PANEL, panelCss, panelKit } from "@/components/book/details";
import { CARDS, CARD, CHECK, CLOSE, catalogCss, catalogMarkup, count } from "@/components/book/catalog";

/**
 * Replace an item from the Item Schedule. The schedule is Dave's Figma frame
 * 55053:100960 with its rows changed to the Design Book's items (copy at
 * 55056:99609), exported at 2x. The hand clicks the PL-02 tag on LOC 3, the
 * Book's details panel slides in from the right, and Replace flies the
 * Catalog in over 8/9 of the screen: search across the top, filters down the
 * left, a scrolling grid of item cards. It opens already filtered to the
 * item's own division and type (Plumbing, Shower Heads), since nothing else
 * would be a valid replacement. The hand scrolls and selects the Kohler. The panel and both
 * locations that use PL-02 (LOC 3 and LOC 4) change to the new item.
 *
 * Card images: the item photos in the Figma file (Book page tiles, room list
 * thumbnails, the Kohler item at 54642:109696) plus twenty showerhead
 * product shots Dave supplied (Kohler, Moen, Delta), fitted on white at
 * 436x328 under invented demo names.
 * Row hover, the tag ring, the Catalog and the toast are designs, not
 * captures: the Figma file has no frame for them. Same contract as the other
 * figures. See components/book/engine.ts and components/book/details.ts.
 */

/* Item rows in design px: B114 Primary Bathroom, then B115 Shower. */
const ROWS = [270, 318, 366, 414, 534, 582, 630, 678, 726];
const SEL = 4; // LOC 3, PL-02
const SAME = [4, 5]; // every row that uses PL-02
const tag = (y: number): Rect => ({ x: 423, y: y + 9.5, w: 34, h: 15 });
const HOME = { x: 700, y: 200 };

const PICK = "Shower Heads";

const CATALOG = catalogMarkup({
  head: `<h4>Catalog</h4><p>Replacing <b>PL-02</b> · Shower Head / Ceiling Mounted · LOC 3, LOC 4</p><div class="bk-x">${CLOSE}</div>`,
  chips: ["Plumbing", PICK],
  cnt: `${count(PICK)} results`,
  cards: CARDS.map((c) => CARD(c, c.k === "elysian" ? `<span class="bk-now">Current · PL-02</span>` : "")).join(""),
});

const STYLES = `${BASE}
.item-schedule .bk-cell{position:absolute;left:369px;width:277px;height:46px;opacity:0}
.item-schedule .bk-stat{position:absolute;left:649px;width:151px;height:46px;opacity:0}
.item-schedule .bk-row{position:absolute;left:24px;width:1318px;height:48px;background:rgba(0,113,227,.05);opacity:0;transition:opacity .14s ease,background-color .14s ease;pointer-events:none}
.item-schedule .bk-row.on{opacity:1}
.item-schedule .bk-row.sel{opacity:1;background:rgba(0,113,227,.09)}
.item-schedule .bk-row.flash{opacity:1;background:rgba(46,158,99,.16)}
.item-schedule .bk-row.slow{transition-duration:1.2s}
.item-schedule .bk-tag{position:absolute;left:423px;width:34px;height:15px;border-radius:3px;box-shadow:0 0 0 1.5px var(--hi);background:rgba(0,113,227,.1);opacity:0;transition:opacity .12s ease;pointer-events:none}
.item-schedule .bk-tag.on{opacity:1}
${panelCss(".item-schedule", "right")}
.item-schedule .bk-mscrim{position:absolute;left:0;top:48px;right:0;bottom:0;background:rgba(10,11,12,.42);opacity:0;pointer-events:none}
${catalogCss(".item-schedule")}
.item-schedule .bk-toast{position:absolute;left:683px;top:690px;display:flex;align-items:center;gap:8px;height:38px;padding:0 16px 0 12px;border-radius:8px;background:#1c1e20;color:#fff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.35);white-space:nowrap;opacity:0;transform:translate(-50%,8px)}
.item-schedule .bk-toast svg{color:#5fd394}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Item Schedule for the primary bathroom and shower. The PL-02 Item ID on a shower head row is clicked and its details slide in from the right. Replace item flies the Catalog in over most of the screen, with search across the top, filters down the left and a grid of item cards. The Catalog opens filtered to plumbing shower heads; the grid is scrolled and a different showerhead is selected. The panel and both shower head rows that use PL-02 change to the new item, and their status changes from Approved to Change Request.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}schedule.webp" alt="">
${SAME.map((i) => `<img class="bk-cell" style="top:${ROWS[i] + 1}px" src="${IMG}cell-kohler.webp" alt="">`).join("")}
${SAME.map((i) => `<img class="bk-stat" style="top:${ROWS[i] + 1}px" src="${IMG}status-cr.webp" alt="">`).join("")}
${ROWS.map((y) => `<div class="bk-row" style="top:${y}px"></div>`).join("")}
${ROWS.map((y) => `<div class="bk-tag" style="top:${y + 9.5}px"></div>`).join("")}
<div class="bk-toast">${CHECK}PL-02 updated in 2 locations, now in Change Request</div>
${PANEL}
<div class="bk-mscrim"></div>
${CATALOG}
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">Replace on an Item ID opens the Catalog. Search, filter, pick the new item, and everything using that ID changes with it, the details panel and both shower head locations, LOC 3 and LOC 4. Both were approved, so they go back to Change Request.</div><button type="button" class="bk-replay">Replay</button></div>`;

/* The panel before and after the swap. */
const ITEM = {
  old: { img: "photo.webp", title: `<b>Elysian</b> Transitional 12" Rain Shower Head`, sub: "Style: ELY-2190", specs: ["Brushed Silver", "12-inch Rain"] },
  new: { img: "photo-kohler.webp", title: `<b>Kohler</b> Statement Multifunction Showerhead`, sub: "Style: 26290-BN", specs: ["Vibrant Brushed Nickel", "Multifunction, 2.5 gpm"] },
};

export default function ItemSchedule() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const qa = <T extends HTMLElement = HTMLElement>(s: string) => [...host.querySelectorAll<T>(s)];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const rows = qa(".bk-row"), tags = qa(".bk-tag"), cells = qa(".bk-cell, .bk-stat");
    const kit = panelKit(host, stage, "right");
    const cat = q(".bk-cat"), mscrim = q(".bk-mscrim"), toast = q(".bk-toast"), body = q(".bk-body");
    const gs = q(".bk-gs"), cards = qa(".bk-card"), frs = qa(".bk-fr"), chips = qa(".bk-chip"), cnt = q(".bk-cnt");
    const fPick = q(`[data-f="cat:${PICK}"]`), fDiv = q('[data-f="div:Plumbing"]'), kohler = q('[data-k="kohler"]'), sel = kohler.querySelector<HTMLElement>(".bk-sel")!;
    const btns = qa(".bk-btn");
    let modal = false;

    const setItem = (k: "old" | "new") => {
      const it = ITEM[k];
      q<HTMLImageElement>(".bk-photo img").src = IMG + it.img;
      q(".bk-title").innerHTML = it.title;
      q(".bk-sub").textContent = it.sub;
      host.querySelectorAll(".bk-specs dd").forEach((dd, i) => { if (i < 2) dd.textContent = it.specs[i]; });
    };
    /* Design px box of an element, read from layout. */
    const box = (el: HTMLElement): Rect => {
      const s = stage.clientWidth / 1366, a = stage.getBoundingClientRect(), b = el.getBoundingClientRect();
      return { x: (b.left - a.left) / s, y: (b.top - a.top) / s, w: b.width / s, h: b.height / s };
    };
    const gsBox = () => box(gs);
    const scrollGrid = async (to: number, dur: number) => {
      const from = gs.scrollTop, t0 = E.now();
      for (let u = 0; u < 1; ) {
        await E.wait(16);
        u = Math.min(1, (E.now() - t0) / dur);
        gs.scrollTop = from + (to - from) * mj(u);
      }
    };

    /* Replace opens on the item's own division and type: Plumbing, Shower Heads. */
    const setFilter = (on: boolean) => {
      [fPick, fDiv, ...chips].forEach((el) => el.classList.toggle("on", on));
      cnt.textContent = `${on ? count(PICK) : CARDS.length} results`;
      cards.forEach((c) => c.classList.toggle("out", on && c.dataset.cat !== PICK));
    };
    setFilter(true);

    const E = engine(stage, {
      home: HOME,
      reduced,
      rows: () => [],
      onFrame(_dt, pt) {
        if (modal) {
          const g = gsBox(), inGrid = inside(pt, g);
          cards.forEach((c) => c.classList.toggle("hot", inGrid && !c.classList.contains("out") && inside(pt, box(c))));
          sel.classList.toggle("hot", kohler.classList.contains("hot") && inside(pt, box(sel)));
          frs.forEach((f) => f.classList.toggle("hot", inside(pt, box(f))));
          return;
        }
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
    const wait = E.wait;

    const select = (on: boolean) => {
      rows[SEL].classList.toggle("sel", on);
      tags[SEL].classList.toggle("on", on);
    };
    function reset() {
      S.mode = "arrow";
      S.cx = HOME.x;
      S.cy = HOME.y;
      S.lock = false;
      modal = false;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      kit.reset();
      kit.closeState();
      setItem("old");
      setFilter(true);
      gs.scrollTop = 0;
      rows.forEach((el) => el.classList.remove("on", "sel", "flash", "slow"));
      tags.forEach((el) => el.classList.remove("on"));
      [...cards, ...frs, sel].forEach((el) => el.classList.remove("hot"));
    }

    const fwd = { fill: "forwards" as const };
    const EASE = "cubic-bezier(.32,.72,0,1)";
    async function loop(id: number) {
      const ok = () => id === S.run;
      const t = tag(ROWS[SEL]);
      while (ok()) {
        await wait(600); if (!ok()) return;
        /* Down into the table, then the Item ID on LOC 3. */
        E.say("The item schedule lists every item in the project by location. Click an Item ID to open its details.");
        await E.moveTo(260, 300, { arc: 0.16 }); if (!ok()) return;
        await wait(350); if (!ok()) return;
        await E.reach(t.x + t.w / 2, t.y + t.h / 2, { arc: 0.12 }); if (!ok()) return;
        await wait(450); if (!ok()) return;
        await E.click("Click the PL-02 Item ID"); if (!ok()) return;

        S.lock = true;
        S.mode = "arrow";
        rows.forEach((el) => el.classList.remove("on"));
        select(true);
        kit.show();
        await wait(480); if (!ok()) return;
        kit.measure();

        /* Read, then Replace. */
        E.say("This item is already approved. Replace it right from the panel.");
        await E.moveTo(kit.P + 200, 300, { arc: 0.18, dur: 800 }); if (!ok()) return;
        await wait(600); if (!ok()) return;
        { const p = kit.at(1, 0.55); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(1000); if (!ok()) return;
        await E.click("Replace the item"); if (!ok()) return;

        /* The Catalog flies in. */
        E.say("The Catalog opens filtered to shower heads, the only valid replacements for this item.");
        modal = true;
        btns.forEach((b) => b.classList.remove("hot"));
        mscrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, ...fwd });
        cat.animate([{ transform: "translateX(102%)" }, { transform: "translateX(0)" }], { duration: 560, easing: EASE, ...fwd });
        await wait(620); if (!ok()) return;

        /* Browse the shower heads: into the grid and down to the third row. */
        await E.moveTo(760, 420, { arc: 0.14, dur: 900 }); if (!ok()) return;
        await wait(600); if (!ok()) return;
        await E.moveTo(1010, 380, { arc: 0.1, dur: 800 }); if (!ok()) return;
        await wait(400); if (!ok()) return;
        await scrollGrid(300, 1500); if (!ok()) return;
        await wait(700); if (!ok()) return;

        /* Pick the Kohler showerhead. */
        E.say("Pick the new shower head.");
        { const b = box(kohler); await E.reach(b.x + b.w * 0.45, b.y + b.h * 0.35, { arc: 0.14 }); } if (!ok()) return;
        await wait(800); if (!ok()) return;
        { const b = box(sel); await E.reach(b.x + b.w / 2, b.y + b.h / 2 + 1, { arc: -0.1 }); } if (!ok()) return;
        await wait(400); if (!ok()) return;
        await E.click("Select the Kohler showerhead"); if (!ok()) return;

        /* The Catalog closes, the panel and both locations change. */
        E.say("Both locations update at once, and the approved item moves to Change Request.");
        modal = false;
        [...cards, ...frs, sel].forEach((el) => el.classList.remove("hot"));
        cat.animate([{ transform: "translateX(0)" }, { transform: "translateX(102%)" }], { duration: 380, easing: "cubic-bezier(.4,0,1,1)", ...fwd });
        mscrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, ...fwd });
        setItem("new");
        body.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 200, fill: "backwards" });
        cells.forEach((c) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 200, ...fwd }));
        toast.animate([{ opacity: 0, transform: "translate(-50%,8px)" }, { opacity: 1, transform: "translate(-50%,0)" }], { duration: 260, delay: 300, easing: "ease-out", ...fwd });
        await E.moveTo(kit.P + 200, 420, { arc: 0.12, dur: 700 }); if (!ok()) return;
        await wait(1600); if (!ok()) return;

        /* Close the panel to show the schedule. */
        E.say("Close the panel. Every row that uses this item has changed.");
        await E.reach(kit.X.x, kit.X.y, { arc: 0.12 }); if (!ok()) return;
        await wait(300); if (!ok()) return;
        await E.click("Close the panel"); if (!ok()) return;
        await kit.hide(E); if (!ok()) return;
        kit.closeState();
        select(false);
        S.lock = true; // no hover while the rows flash
        SAME.forEach((i) => rows[i].classList.add("flash"));
        await E.moveTo(760, 470, { arc: 0.15 }); if (!ok()) return;
        await wait(900); if (!ok()) return;
        SAME.forEach((i) => { rows[i].classList.add("slow"); rows[i].classList.remove("flash"); });
        toast.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, ...fwd });
        await wait(1600); if (!ok()) return;
        E.say("");
        await E.moveTo(HOME.x, HOME.y, { arc: 0.15 }); if (!ok()) return;
        await wait(600); if (!ok()) return;
        E.lap();
        reset();
      }
    }

    if (reduced) {
      setItem("new");
      cells.forEach((c) => (c.style.opacity = "1"));
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
