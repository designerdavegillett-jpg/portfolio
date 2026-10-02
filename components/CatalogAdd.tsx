"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, inside, type Rect } from "@/components/book/engine";
import { CARDS, CARD, CHECK, CLOSE, CARET, ICON, catalogCss, catalogMarkup, type Card } from "@/components/book/catalog";

/**
 * The Catalog page, adding a custom item. Not everything a designer specifies
 * is in the 4 million+ item Catalog, so they can add their own: a photo, the
 * details they have and the item's documents. The hand opens New item, drops
 * in a photo, types the name, vendor and style, picks a category (which sets
 * the division), a finish, attaches a spec sheet and saves. The item lands at
 * the front of the grid, marked My item.
 *
 * The page, the New item panel and the toast are designs, not captures: the
 * Figma file has no frames for them. The app header is cut from the Item
 * Schedule export with the active tab redrawn. The new item's photo is one of
 * the showerhead shots Dave supplied, under an invented name and vendor.
 * Same contract as the other figures. See components/book/engine.ts.
 */

const NEW: Card = { k: "bell", brand: "Atelier Ferro", name: "Noir Bell Shower Head", style: "AF-BELL-08", finish: "Matte Black", sw: "#2b2b2b", cat: "Shower Heads" };
const FIELDS = { name: "Noir Bell Shower Head", vendor: "Atelier Ferro", sku: "AF-BELL-08" };
const HOME = { x: 760, y: 420 };

const UPLOAD = ICON(`<path d="M12 16V4M7 9l5-5 5 5"/><path d="M20 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"/>`, 22, 1.8);
const FILE = ICON(`<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/>`, 14, 1.8);
const CLIP = ICON(`<path d="m21 11-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/>`, 14, 1.8);
const SWATCHES: [string, string][] = [["Polished Chrome", "#e6e8ea"], ["Brushed Nickel", "#9a9a96"], ["Brushed Brass", "#b8955a"], ["Matte Black", "#2b2b2b"], ["Oil Rubbed Bronze", "#4a3426"]];
const CAT_OPTS = ["Shower Heads", "Faucets", "Drains", "Valves & Trim", "Tubs", "Sinks"];

const field = (label: string, k: string, extra = "") =>
  `<label class="bk-fd${extra}"><span>${label}</span><div class="bk-ip" data-i="${k}"><em></em><i class="bk-caret"></i><s></s></div></label>`;

const FORM = `<div class="bk-nf">
<div class="bk-nh"><div><h4>New item</h4><p>Adds to My items, ready to use on any project</p></div><div class="bk-x">${CLOSE}</div></div>
<div class="bk-nb">
<div class="bk-drop" data-c="drop"><div class="bk-dz">${UPLOAD}<b>Drop a photo or <u>browse</u></b><span>JPG or PNG, square works best</span></div><img src="${IMG}cat-${NEW.k}.webp" alt=""><div class="bk-prog"><i></i></div></div>
${field("Name", "name", " full")}
${field("Vendor", "vendor")}
${field("Style / SKU", "sku")}
<label class="bk-fd"><span>Category</span><div class="bk-ip bk-sl" data-c="cat"><em class="ph">Choose a category</em>${CARET}</div>
<div class="bk-menu">${CAT_OPTS.map((c, i) => `<div${i === 0 ? ' data-c="opt"' : ""}>${c}</div>`).join("")}</div></label>
<label class="bk-fd"><span>Division</span><div class="bk-ip bk-sl" data-i="div"><em class="ph">Set by category</em>${CARET}</div></label>
<div class="bk-fd full"><span>Finish</span><div class="bk-sw2">${SWATCHES.map(([n, c]) => `<span${n === NEW.finish ? ' data-c="sw"' : ""}><i style="background:${c}"></i>${n}</span>`).join("")}</div></div>
<div class="bk-fd full"><span>Documents</span><div class="bk-docs"><span class="bk-chipd">${FILE}Spec Sheet.pdf</span><span class="bk-att" data-c="att">${CLIP}Attach</span></div></div>
</div>
<div class="bk-nfoot"><span class="bk-cancel">Cancel</span><span class="bk-save" data-c="save">Save to My items</span></div>
</div>`;

const STYLES = `${BASE}
${catalogCss(".catalog-add")}
.catalog-add .bk-hdr{position:absolute;left:0;top:0;width:1366px;height:48px;background:url(${IMG}schedule.webp) 0 0/1366px 768px}
.catalog-add .bk-tab{position:absolute;top:15px;height:20px;display:flex;align-items:center;background:#232526;font-size:12px;white-space:nowrap}
.catalog-add .bk-tab.off{left:484px;width:96px;color:#abadae;padding-left:3px}
.catalog-add .bk-tab.on{left:720px;width:52px;color:#fcfeff;font-weight:700;padding-left:4px}
.catalog-add .bk-cat{left:0;width:1366px;transform:none;border-left:0;box-shadow:none}
.catalog-add .bk-grid{grid-template-columns:repeat(5,1fr)}
.catalog-add .bk-sel{display:none}
.catalog-add .bk-add{transition:background-color .14s}
.catalog-add .bk-add.hot{background:var(--hi)}
.catalog-add .bk-mine{position:absolute;left:8px;top:8px;height:22px;display:flex;align-items:center;padding:0 8px;border-radius:5px;background:#7a5af8;color:#fff;font-size:11px;font-weight:600}
.catalog-add .bk-card.new{box-shadow:0 0 0 2px #7a5af8}
.catalog-add .bk-fr.bump .n{color:#c9b8ff;font-weight:700}
.catalog-add .bk-mscrim{position:absolute;left:0;top:48px;right:0;bottom:0;background:rgba(10,11,12,.42);opacity:0;pointer-events:none}
.catalog-add .bk-nf{position:absolute;left:846px;top:48px;width:520px;height:720px;display:flex;flex-direction:column;background:#1c1e20;border-left:1px solid #000;box-shadow:-24px 0 48px rgba(0,0,0,.4);color:#fff;transform:translateX(102%)}
.catalog-add .bk-nh{flex:none;display:flex;align-items:flex-start;padding:18px 22px 14px;border-bottom:1px solid #303235}
.catalog-add .bk-nh h4{margin:0;font-size:18px;font-weight:700}
.catalog-add .bk-nh p{margin:4px 0 0;font-size:12px;color:#a9acb0}
.catalog-add .bk-nh .bk-x{margin-left:auto;width:28px;height:28px;display:grid;place-items:center;color:#cfd1d4}
.catalog-add .bk-nb{flex:1;min-height:0;padding:16px 22px;display:grid;grid-template-columns:1fr 1fr;gap:12px 14px;align-content:start}
.catalog-add .bk-drop{grid-column:1/-1;position:relative;height:176px;border-radius:8px;border:1.5px dashed #4a4d52;background:#232527;overflow:hidden;transition:border-color .14s,background-color .14s}
.catalog-add .bk-drop.hot{border-color:var(--hi);background:rgba(0,113,227,.08)}
.catalog-add .bk-dz{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#a9acb0;font-size:12px}
.catalog-add .bk-dz b{color:#e9eaeb;font-size:13px;font-weight:600}
.catalog-add .bk-dz u{color:#8fc1ff;text-decoration:none}
.catalog-add .bk-drop img{position:absolute;left:50%;top:0;height:100%;width:auto;transform:translateX(-50%);opacity:0;background:#fff}
.catalog-add .bk-drop.has{border-style:solid;border-color:#3a3d41;background:#fff}
.catalog-add .bk-prog{position:absolute;left:16px;right:16px;bottom:12px;height:4px;border-radius:2px;background:rgba(0,0,0,.12);opacity:0}
.catalog-add .bk-prog i{display:block;height:100%;width:0;border-radius:2px;background:var(--hi)}
.catalog-add .bk-fd{position:relative;display:grid;gap:5px;font-size:11px;color:#8d9095;font-weight:600;letter-spacing:.02em}
.catalog-add .bk-fd.full{grid-column:1/-1}
.catalog-add .bk-ip{height:36px;display:flex;align-items:center;padding:0 11px;border-radius:6px;background:#2a2c2f;border:1px solid #3a3d41;font-size:13px;font-weight:400;letter-spacing:0;color:#fff;transition:border-color .14s,box-shadow .14s}
.catalog-add .bk-ip em{font-style:normal;white-space:nowrap}
.catalog-add .bk-ip em.ph{color:#6f7277}
.catalog-add .bk-ip.focus{border-color:var(--hi);box-shadow:0 0 0 3px rgba(0,113,227,.22)}
.catalog-add .bk-caret{display:none;width:1.5px;height:16px;margin-left:1px;background:#fff;animation:bkblink 1s steps(1) infinite}
.catalog-add .bk-ip.focus .bk-caret{display:block}
@keyframes bkblink{50%{opacity:0}}
.catalog-add .bk-sl svg{margin-left:auto;color:#8d9095}
.catalog-add .bk-sl.hot{border-color:#5a5e64}
.catalog-add .bk-menu{position:absolute;left:0;right:0;top:100%;margin-top:4px;z-index:4;padding:4px;border-radius:6px;background:#2c2e31;box-shadow:0 12px 28px rgba(0,0,0,.45);font-size:13px;font-weight:400;letter-spacing:0;color:#e9eaeb;opacity:0;transform:translateY(-4px);pointer-events:none}
.catalog-add .bk-menu.on{opacity:1;transform:none;transition:opacity .14s,transform .14s}
.catalog-add .bk-menu div{height:30px;display:flex;align-items:center;padding:0 10px;border-radius:4px}
.catalog-add .bk-menu div.hot{background:#3a3d41}
.catalog-add .bk-sw2{display:flex;flex-wrap:wrap;gap:6px}
.catalog-add .bk-sw2 span{display:flex;align-items:center;gap:6px;height:28px;padding:0 10px 0 6px;border-radius:14px;background:#2a2c2f;border:1px solid #3a3d41;font-size:12px;font-weight:400;letter-spacing:0;color:#d5d7da;transition:border-color .14s,background-color .14s}
.catalog-add .bk-sw2 span i{width:15px;height:15px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.catalog-add .bk-sw2 span.hot{border-color:#5a5e64}
.catalog-add .bk-sw2 span.on{border-color:var(--hi);background:rgba(0,113,227,.16);color:#fff}
.catalog-add .bk-docs{display:flex;gap:8px;align-items:center}
.catalog-add .bk-chipd{display:none;align-items:center;gap:6px;height:30px;padding:0 10px;border-radius:5px;background:#2a2c2f;font-size:12.5px;font-weight:400;letter-spacing:0;color:#e9eaeb}
.catalog-add .bk-chipd.on{display:flex}
.catalog-add .bk-att{display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:5px;border:1px dashed #4a4d52;font-size:12.5px;font-weight:600;letter-spacing:0;color:#a9acb0;transition:border-color .14s,color .14s}
.catalog-add .bk-att.hot{border-color:var(--hi);color:#fff}
.catalog-add .bk-nfoot{flex:none;display:flex;justify-content:flex-end;gap:8px;padding:14px 22px;border-top:1px solid #303235}
.catalog-add .bk-cancel,.catalog-add .bk-save{height:34px;display:flex;align-items:center;padding:0 16px;border-radius:6px;font-size:13px;font-weight:600}
.catalog-add .bk-cancel{color:#a9acb0}
.catalog-add .bk-save{background:#36383b;color:#7d8086;transition:background-color .14s,color .14s}
.catalog-add .bk-save.ready{background:var(--hi);color:#fff}
.catalog-add .bk-save.ready.hot{background:#2b8af0}
.catalog-add .bk-toast{position:absolute;left:683px;top:700px;display:flex;align-items:center;gap:8px;height:38px;padding:0 16px 0 12px;border-radius:8px;background:#2c2e31;color:#fff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.45);white-space:nowrap;opacity:0;transform:translate(-50%,8px)}
.catalog-add .bk-toast svg{color:#5fd394}`;

const GRID_CARDS = CARD(NEW, `<span class="bk-mine">My item</span>`, " new out") + CARDS.filter((c) => c.k !== NEW.k).map((c) => CARD(c)).join("");

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Catalog page. Add your own item opens a New item panel: a photo is dropped in, the name, vendor and style are typed, Shower Heads is picked as the category, which sets the division to Plumbing, Matte Black is picked as the finish and a spec sheet is attached. Saving adds the item to the front of the grid, marked My item.">
<div class="bk-inner">
<div class="bk-hdr"></div><div class="bk-tab off">Item Schedule</div><div class="bk-tab on">Catalog</div>
${catalogMarkup({ head: `<h4>Catalog</h4><p>4 million+ items, plus <b class="bk-mycnt">37</b> in My items</p>`, cnt: "4M+ results", cards: GRID_CARDS })}
<div class="bk-mscrim"></div>
${FORM}
<div class="bk-toast">${CHECK}Added to My items</div>
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">Not everything a designer specifies is in the Catalog. They add their own item with a photo, the details they have and its documents, and it sits in My items next to everything else, ready for any project.</div><button type="button" class="bk-replay">Replay</button></div>`;

export default function CatalogAdd() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const qa = <T extends HTMLElement = HTMLElement>(s: string) => [...host.querySelectorAll<T>(s)];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const add = q(".bk-add"), form = q(".bk-nf"), mscrim = q(".bk-mscrim"), toast = q(".bk-toast");
    const drop = q('[data-c="drop"]'), dimg = drop.querySelector<HTMLElement>("img")!, prog = q(".bk-prog"), bar = q(".bk-prog i");
    const ip = (k: string) => q(`[data-i="${k}"]`);
    const catSel = q('[data-c="cat"]'), menu = q(".bk-menu"), opt = q('[data-c="opt"]'), sw = q('[data-c="sw"]');
    const att = q('[data-c="att"]'), chipd = q(".bk-chipd"), save = q('[data-c="save"]');
    const grid = q(".bk-grid"), newCard = q(".bk-card.new"), mine = q('[data-f="src:mine"]'), mycnt = q(".bk-mycnt");
    const HOT = [add, drop, catSel, opt, sw, att, save];

    /* Design px box of an element, read from layout. */
    const scale = () => stage.clientWidth / 1366;
    const box = (el: HTMLElement): Rect => {
      const s = scale(), a = stage.getBoundingClientRect(), b = el.getBoundingClientRect();
      return { x: (b.left - a.left) / s, y: (b.top - a.top) / s, w: b.width / s, h: b.height / s };
    };
    const mid = (el: HTMLElement, fx = 0.5) => { const b = box(el); return { x: b.x + b.w * fx, y: b.y + b.h / 2 + 1 }; };
    let live = false;

    const E = engine(stage, {
      home: HOME,
      reduced,
      rows: () => [],
      onFrame(_dt, pt) {
        let point = false;
        HOT.forEach((el) => {
          const on = live && (el !== opt || menu.classList.contains("on")) && inside(pt, box(el));
          el.classList.toggle("hot", on);
          if (on) point = true;
        });
        if (point && !E.S.lock) E.S.mode = "point";
      },
    });
    const S = E.S;
    const wait = E.wait;
    const fwd = { fill: "forwards" as const };

    /* Type into a field one character at a time, with a human rhythm. */
    async function type(k: string, text: string, ok: () => boolean) {
      const f = ip(k), em = f.querySelector("em")!;
      f.classList.add("focus");
      for (let i = 0; i < text.length; i++) {
        em.textContent = text.slice(0, i + 1);
        await wait(38 + ((i * 37) % 5) * 14 + (text[i] === " " ? 40 : 0)); if (!ok()) return;
      }
      await wait(250);
      f.classList.remove("focus");
    }

    function reset() {
      S.mode = "arrow";
      S.cx = HOME.x;
      S.cy = HOME.y;
      S.lock = false;
      live = true;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      HOT.forEach((el) => el.classList.remove("hot"));
      drop.classList.remove("has");
      bar.style.width = "0";
      ["name", "vendor", "sku"].forEach((k) => { ip(k).querySelector("em")!.textContent = ""; ip(k).classList.remove("focus"); });
      const ce = catSel.querySelector("em")!; ce.textContent = "Choose a category"; ce.className = "ph";
      const de = ip("div").querySelector("em")!; de.textContent = "Set by category"; de.className = "ph";
      menu.classList.remove("on");
      sw.classList.remove("on");
      chipd.classList.remove("on");
      save.classList.remove("ready");
      newCard.classList.add("out");
      mine.classList.remove("bump");
      mine.querySelector(".n")!.textContent = "37";
      mycnt.textContent = "37";
    }

    async function loop(id: number) {
      const ok = () => id === S.run;
      while (ok()) {
        await wait(800); if (!ok()) return;
        /* Open New item. */
        { const p = mid(add); await E.reach(p.x, p.y, { arc: 0.14 }); } if (!ok()) return;
        await wait(500); if (!ok()) return;
        await E.click(); if (!ok()) return;
        mscrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, ...fwd });
        form.animate([{ transform: "translateX(102%)" }, { transform: "translateX(0)" }], { duration: 480, easing: "cubic-bezier(.32,.72,0,1)", ...fwd });
        await wait(560); if (!ok()) return;

        /* Photo: drop it in, a short upload. */
        { const p = mid(drop); await E.reach(p.x, p.y + 10, { arc: 0.12 }); } if (!ok()) return;
        await wait(400); if (!ok()) return;
        await E.click(); if (!ok()) return;
        drop.classList.add("has");
        dimg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, ...fwd });
        prog.animate([{ opacity: 1 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 1100, ...fwd });
        bar.animate([{ width: "0%" }, { width: "100%" }], { duration: 900, easing: "ease-out", ...fwd });
        await wait(1000); if (!ok()) return;

        /* Details. */
        { const p = mid(ip("name"), 0.2); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await E.click(); if (!ok()) return;
        await type("name", FIELDS.name, ok); if (!ok()) return;
        { const p = mid(ip("vendor"), 0.25); await E.reach(p.x, p.y, { arc: 0.08 }); } if (!ok()) return;
        await E.click(); if (!ok()) return;
        await type("vendor", FIELDS.vendor, ok); if (!ok()) return;
        { const p = mid(ip("sku"), 0.25); await E.reach(p.x, p.y, { arc: 0.08 }); } if (!ok()) return;
        await E.click(); if (!ok()) return;
        await type("sku", FIELDS.sku, ok); if (!ok()) return;

        /* Category sets the division. */
        { const p = mid(catSel, 0.4); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(250); if (!ok()) return;
        await E.click(); if (!ok()) return;
        menu.classList.add("on");
        await wait(500); if (!ok()) return;
        { const p = mid(opt, 0.3); await E.reach(p.x, p.y, { arc: 0.06 }); } if (!ok()) return;
        await wait(300); if (!ok()) return;
        await E.click(); if (!ok()) return;
        menu.classList.remove("on");
        { const ce = catSel.querySelector("em")!; ce.textContent = NEW.cat; ce.className = ""; }
        await wait(260); if (!ok()) return;
        { const de = ip("div").querySelector("em")!; de.textContent = "Plumbing"; de.className = "";
          de.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }); }
        await wait(500); if (!ok()) return;

        /* Finish and documents. */
        { const p = mid(sw, 0.4); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(300); if (!ok()) return;
        await E.click(); if (!ok()) return;
        sw.classList.add("on");
        await wait(400); if (!ok()) return;
        { const p = mid(att); await E.reach(p.x, p.y, { arc: 0.08 }); } if (!ok()) return;
        await wait(300); if (!ok()) return;
        await E.click(); if (!ok()) return;
        chipd.classList.add("on");
        chipd.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: 240, easing: "ease-out" });
        save.classList.add("ready");
        await wait(700); if (!ok()) return;

        /* Save: the panel closes and the item joins the grid, up front. */
        { const p = mid(save); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(400); if (!ok()) return;
        await E.click(); if (!ok()) return;
        live = false;
        HOT.forEach((el) => el.classList.remove("hot"));
        S.mode = "arrow";
        form.animate([{ transform: "translateX(0)" }, { transform: "translateX(102%)" }], { duration: 340, easing: "cubic-bezier(.4,0,1,1)", ...fwd });
        mscrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, ...fwd });
        await wait(300); if (!ok()) return;
        /* FLIP the grid so the cards slide over to make room. */
        const s = scale();
        const cards = qa(".bk-card").filter((c) => c !== newCard).slice(0, 15);
        const before = cards.map((c) => c.getBoundingClientRect());
        newCard.classList.remove("out");
        cards.forEach((c, i) => {
          const a = before[i], b = c.getBoundingClientRect();
          c.animate([{ transform: `translate(${(a.left - b.left) / s}px,${(a.top - b.top) / s}px)` }, { transform: "none" }], { duration: 460, easing: "cubic-bezier(.2,.8,.2,1)" });
        });
        newCard.animate([{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: 120, easing: "cubic-bezier(.2,.8,.2,1.1)", fill: "backwards" });
        grid.parentElement!.scrollTop = 0;
        mine.classList.add("bump");
        mine.querySelector(".n")!.textContent = "38";
        mycnt.textContent = "38";
        toast.animate([{ opacity: 0, transform: "translate(-50%,8px)" }, { opacity: 1, transform: "translate(-50%,0)" }], { duration: 260, delay: 200, easing: "ease-out", ...fwd });
        await E.moveTo(560, 560, { arc: 0.15 }); if (!ok()) return;
        await wait(2600); if (!ok()) return;
        toast.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, ...fwd });
        await wait(800); if (!ok()) return;
        await E.moveTo(HOME.x, HOME.y, { arc: 0.15 }); if (!ok()) return;
        await wait(800); if (!ok()) return;
        E.lap();
        reset();
      }
    }

    reset();
    if (reduced) {
      newCard.classList.remove("out");
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk catalog-add" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
