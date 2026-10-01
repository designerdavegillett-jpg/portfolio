"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, inside, wait, type Rect } from "@/components/book/engine";
import { PANEL, panelCss, panelKit } from "@/components/book/details";

/**
 * Replace an item from the Item Schedule. The schedule is Dave's Figma frame
 * 55053:100960 with its rows changed to the Design Book's items (copy at
 * 55056:99609), exported at 2x. The hand clicks the PL-02 tag on LOC 3, the
 * Book's details panel slides in from the right, Replace opens the Catalog,
 * and the Kohler showerhead is picked. The panel and both locations that use
 * PL-02 (LOC 3 and LOC 4) change to the new item.
 *
 * The updated item cells (cell-kohler.webp) are cut from the same frame with
 * the Kohler item from Figma 54642:109696 dropped in. Row hover, the tag ring,
 * the Catalog picker and the toast are designs, not captures: the Figma file
 * has no frame for them. Same contract as the other figures. See
 * components/book/engine.ts and components/book/details.ts.
 */

/* Item rows in design px: B114 Primary Bathroom, then B115 Shower. */
const ROWS = [270, 318, 366, 414, 534, 582, 630, 678, 726];
const SEL = 4; // LOC 3, PL-02
const SAME = [4, 5]; // every row that uses PL-02
const tag = (y: number): Rect => ({ x: 423, y: y + 9.5, w: 34, h: 15 });
const HOME = { x: 700, y: 200 };

const ICON = (d: string, w = 15, sw = 2) =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const SEARCH = ICON(`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`, 15);
const CLOSE = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 16);
const CARET = ICON(`<path d="m6 9 6 6 6-6"/>`, 14);
const PLUS = ICON(`<path d="M12 5v14M5 12h14"/>`, 14, 2.2);
const CHECK = ICON(`<path d="M20 6 9 17l-5-5"/>`, 14, 2.6);

const STYLES = `${BASE}
.item-schedule .bk-cell{position:absolute;left:369px;width:277px;height:46px;opacity:0}
.item-schedule .bk-row{position:absolute;left:24px;width:1318px;height:48px;background:rgba(0,113,227,.05);opacity:0;transition:opacity .14s ease,background-color .14s ease;pointer-events:none}
.item-schedule .bk-row.on{opacity:1}
.item-schedule .bk-row.sel{opacity:1;background:rgba(0,113,227,.09)}
.item-schedule .bk-row.flash{opacity:1;background:rgba(46,158,99,.16)}
.item-schedule .bk-row.slow{transition-duration:1.2s}
.item-schedule .bk-tag{position:absolute;left:423px;width:34px;height:15px;border-radius:3px;box-shadow:0 0 0 1.5px var(--hi);background:rgba(0,113,227,.1);opacity:0;transition:opacity .12s ease;pointer-events:none}
.item-schedule .bk-tag.on{opacity:1}
${panelCss(".item-schedule", "right")}
.item-schedule .bk-mscrim{position:absolute;left:0;top:48px;right:0;bottom:0;background:rgba(10,11,12,.38);opacity:0;pointer-events:none}
.item-schedule .bk-cat{position:absolute;left:177px;top:150px;width:640px;display:flex;flex-direction:column;gap:14px;padding:20px 22px 18px;background:#1c1e20;border:1px solid #000;border-radius:10px;box-shadow:0 24px 60px rgba(0,0,0,.5);color:#fff;opacity:0;transform:translateY(8px) scale(.98)}
.item-schedule .bk-ch{display:flex;align-items:flex-start;gap:12px}
.item-schedule .bk-ch h4{margin:0;font-size:17px;font-weight:700;line-height:1.2}
.item-schedule .bk-ch p{margin:4px 0 0;font-size:12px;color:#a9acb0}
.item-schedule .bk-ch .bk-x{margin-left:auto}
.item-schedule .bk-srow{display:flex;gap:8px}
.item-schedule .bk-in{flex:1;height:36px;display:flex;align-items:center;gap:8px;padding:0 12px;border-radius:6px;background:#2a2c2f;border:1px solid #3a3d41;font-size:13px;color:#fff}
.item-schedule .bk-in svg{color:#8d9095}
.item-schedule .bk-dd{height:36px;display:flex;align-items:center;gap:6px;padding:0 12px;border-radius:6px;background:#36383b;font-size:12.5px;color:#a9acb0}
.item-schedule .bk-dd b{color:#fff;font-weight:600}
.item-schedule .bk-res{display:grid;gap:6px}
.item-schedule .bk-res>.bk-label{border-top:0;padding-top:0}
.item-schedule .bk-it{display:flex;align-items:center;gap:14px;height:76px;padding:0 14px 0 10px;border-radius:6px;background:#26282b;transition:background-color .14s}
.item-schedule .bk-it.hot{background:#303337}
.item-schedule .bk-it img{width:56px;height:56px;border-radius:4px;background:#fff;flex:none}
.item-schedule .bk-it div{flex:1;min-width:0}
.item-schedule .bk-it .t{font-size:13.5px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.item-schedule .bk-it .s{font-size:12px;color:#a9acb0;margin-top:3px}
.item-schedule .bk-cur-tag{height:24px;display:flex;align-items:center;padding:0 9px;border-radius:5px;background:#36383b;color:#a9acb0;font-size:11.5px;font-weight:600}
.item-schedule .bk-pick{height:28px;display:flex;align-items:center;padding:0 14px;border-radius:6px;background:#36383b;color:#fff;font-size:12px;font-weight:600;transition:background-color .14s}
.item-schedule .bk-pick.hot{background:var(--hi)}
.item-schedule .bk-own{display:flex;align-items:center;gap:6px;padding-top:12px;border-top:1px solid #303235;font-size:12.5px;color:#a9acb0}
.item-schedule .bk-own span{display:flex;align-items:center;gap:4px;color:#8fc1ff;font-weight:600}
.item-schedule .bk-toast{position:absolute;left:497px;top:690px;display:flex;align-items:center;gap:8px;height:38px;padding:0 16px 0 12px;border-radius:8px;background:#1c1e20;color:#fff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.35);white-space:nowrap;opacity:0;transform:translate(-50%,8px)}
.item-schedule .bk-toast svg{color:#5fd394}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Item Schedule for the primary bathroom and shower. The PL-02 Item ID on a shower head row is clicked and its details slide in from the right. Replace item opens the Catalog, a different showerhead is picked, and the panel and both shower head rows that use PL-02 change to the new item.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}schedule.webp" alt="">
${SAME.map((i) => `<img class="bk-cell" style="top:${ROWS[i] + 1}px" src="${IMG}cell-kohler.webp" alt="">`).join("")}
${ROWS.map((y) => `<div class="bk-row" style="top:${y}px"></div>`).join("")}
${ROWS.map((y) => `<div class="bk-tag" style="top:${y + 9.5}px"></div>`).join("")}
<div class="bk-toast">${CHECK}PL-02 updated in 2 locations</div>
${PANEL}
<div class="bk-mscrim"></div>
<div class="bk-cat">
<div class="bk-ch"><div><h4>Catalog</h4><p>Replacing PL-02 · Shower Head / Ceiling Mounted · LOC 3, LOC 4</p></div><div class="bk-x" data-c="x">${CLOSE}</div></div>
<div class="bk-srow"><div class="bk-in">${SEARCH}shower head</div><div class="bk-dd">Division: <b>Plumbing</b>${CARET}</div></div>
<div class="bk-res"><div class="bk-label">2 results</div>
<div class="bk-it"><img src="${IMG}thumb-elysian.webp" alt=""><div><div class="t"><b>Elysian</b> Transitional 12" Rain Shower Head</div><div class="s">Style: ELY-2190 · Brushed Silver</div></div><span class="bk-cur-tag">Current</span></div>
<div class="bk-it" data-c="row"><img src="${IMG}thumb-kohler.webp" alt=""><div><div class="t"><b>Kohler</b> Statement Multifunction Showerhead</div><div class="s">Style: 26290-BN · Vibrant Brushed Nickel</div></div><span class="bk-pick" data-c="pick">Select</span></div>
</div>
<div class="bk-own">Not in the Catalog?<span>${PLUS}Add your own item</span></div>
</div>
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">Replace on an Item ID opens the Catalog. Pick the new item and everything using that ID changes with it, the details panel and both shower head locations, LOC 3 and LOC 4.</div><button type="button" class="bk-replay">Replay</button></div>`;

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
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const rows = [...host.querySelectorAll<HTMLElement>(".bk-row")];
    const tags = [...host.querySelectorAll<HTMLElement>(".bk-tag")];
    const cells = [...host.querySelectorAll<HTMLElement>(".bk-cell")];
    const kit = panelKit(host, stage, "right");
    const cat = q(".bk-cat"), mscrim = q(".bk-mscrim"), toast = q(".bk-toast"), body = q(".bk-body");
    const C = { row: q('[data-c="row"]'), pick: q('[data-c="pick"]') };
    const btns = [...host.querySelectorAll<HTMLElement>(".bk-btn")];
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
    let hit: { row: Rect; pick: Rect } | null = null;

    const E = engine(stage, {
      home: HOME,
      reduced,
      rows: () => [],
      onFrame(_dt, pt) {
        if (modal) {
          C.row.classList.toggle("hot", !!hit && inside(pt, hit.row));
          C.pick.classList.toggle("hot", !!hit && inside(pt, hit.pick));
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
      hit = null;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      kit.reset();
      kit.closeState();
      setItem("old");
      rows.forEach((el) => el.classList.remove("on", "sel", "flash", "slow"));
      tags.forEach((el) => el.classList.remove("on"));
      Object.values(C).forEach((el) => el.classList.remove("hot"));
    }

    const fwd = { fill: "forwards" as const };
    async function loop(id: number) {
      const ok = () => id === S.run;
      const t = tag(ROWS[SEL]);
      while (ok()) {
        await wait(600); if (!ok()) return;
        /* Down into the table, then the Item ID on LOC 3. */
        await E.moveTo(260, 300, { arc: 0.16 }); if (!ok()) return;
        await wait(350); if (!ok()) return;
        await E.reach(t.x + t.w / 2, t.y + t.h / 2, { arc: 0.12 }); if (!ok()) return;
        await wait(450); if (!ok()) return;
        await E.click(); if (!ok()) return;

        S.lock = true;
        S.mode = "arrow";
        rows.forEach((el) => el.classList.remove("on"));
        select(true);
        kit.show();
        await wait(480); if (!ok()) return;
        kit.measure();

        /* Read, then Replace. */
        await E.moveTo(kit.P + 200, 300, { arc: 0.18, dur: 800 }); if (!ok()) return;
        await wait(600); if (!ok()) return;
        { const p = kit.at(1, 0.55); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(1000); if (!ok()) return;
        await E.click(); if (!ok()) return;

        /* The Catalog. */
        modal = true;
        btns.forEach((b) => b.classList.remove("hot"));
        mscrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, ...fwd });
        cat.animate([{ opacity: 0, transform: "translateY(8px) scale(.98)" }, { opacity: 1, transform: "none" }], { duration: 280, easing: "cubic-bezier(.32,.72,0,1)", ...fwd });
        await wait(320); if (!ok()) return;
        hit = { row: box(C.row), pick: box(C.pick) };
        await E.moveTo(hit.row.x + 260, hit.row.y + 40, { arc: 0.16, dur: 1000 }); if (!ok()) return;
        await wait(700); if (!ok()) return;
        await E.reach(hit.pick.x + hit.pick.w / 2, hit.pick.y + hit.pick.h / 2 + 1, { arc: -0.08 }); if (!ok()) return;
        await wait(450); if (!ok()) return;
        await E.click(); if (!ok()) return;

        /* Picked: the Catalog closes, the panel and both locations change. */
        cat.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(.98)" }], { duration: 200, ...fwd });
        mscrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, ...fwd });
        modal = false;
        C.pick.classList.remove("hot");
        body.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" });
        await wait(170); if (!ok()) return;
        setItem("new");
        body.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: "forwards" });
        cells.forEach((c) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, ...fwd }));
        toast.animate([{ opacity: 0, transform: "translate(-50%,8px)" }, { opacity: 1, transform: "translate(-50%,0)" }], { duration: 260, easing: "ease-out", ...fwd });
        await E.moveTo(kit.P + 200, 420, { arc: 0.12, dur: 700 }); if (!ok()) return;
        await wait(1600); if (!ok()) return;

        /* Close the panel to show the schedule. */
        await E.reach(kit.X.x, kit.X.y, { arc: 0.12 }); if (!ok()) return;
        await wait(300); if (!ok()) return;
        await E.click(); if (!ok()) return;
        await kit.hide(); if (!ok()) return;
        kit.closeState();
        select(false);
        S.lock = true; // no hover while the rows flash
        SAME.forEach((i) => rows[i].classList.add("flash"));
        await E.moveTo(760, 470, { arc: 0.15 }); if (!ok()) return;
        await wait(900); if (!ok()) return;
        SAME.forEach((i) => { rows[i].classList.add("slow"); rows[i].classList.remove("flash"); });
        toast.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, ...fwd });
        await wait(1600); if (!ok()) return;
        await E.moveTo(HOME.x, HOME.y, { arc: 0.15 }); if (!ok()) return;
        await wait(600); if (!ok()) return;
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
