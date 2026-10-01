"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, RAIL, rail, engine, controller, inside, wait, mj, type Rect } from "@/components/book/engine";

/**
 * Click for details. The same Books screen with the showerhead already on the
 * page, so its row carries the placed marker. A click on the row slides its
 * details out beside the list: Replace (opens the Catalog) and Remove (takes
 * the item off its Item ID card) pinned at the top with the Item ID, then a
 * square photo, specs, every location the ID is assigned to and the item's
 * documents, which sit below the fold. The hand hovers both actions, scrolls
 * to the documents, hovers one, and closes the panel.
 *
 * The panel is a design, not a capture: there is no Figma frame for it. Its
 * fields use only what the screen itself shows; the document names are
 * illustrative.
 *
 * Same contract as the other figures. See components/book/engine.ts.
 */

const STYLES = `${BASE}
.item-details .bk-seltint{position:absolute;left:24px;top:240px;width:288px;height:64px;border-radius:8px;background:rgba(41,151,255,.18);opacity:0;transition:opacity .16s ease;pointer-events:none}
.item-details .bk-seltint.on{opacity:1}
.item-details .bk-scrim{position:absolute;left:336px;top:48px;right:0;bottom:0;background:rgba(10,11,12,.32);opacity:0;pointer-events:none}
.item-details .bk-clip{position:absolute;left:336px;top:48px;width:460px;height:720px;overflow:hidden;pointer-events:none}
.item-details .bk-panel{position:absolute;left:0;top:0;width:372px;height:720px;display:flex;flex-direction:column;background:#1c1e20;border-left:1px solid #000;box-shadow:24px 0 48px rgba(0,0,0,.35);color:#fff;transform:translateX(-102%)}
.item-details .bk-head{flex:none;display:flex;align-items:center;gap:8px;position:relative;z-index:3;padding:16px 22px 12px;background:#1c1e20;border-bottom:1px solid transparent;transition:border-color .2s}
.item-details .bk-head>*{flex:none}
.item-details .bk-head.scrolled{border-bottom-color:#303235}
.item-details .bk-id{height:28px;display:flex;align-items:center;padding:0 10px;border-radius:6px;background:#4f8a9a;font-size:12px;font-weight:600;white-space:nowrap}
.item-details .bk-acts{display:flex;gap:6px;margin-left:auto}
.item-details .bk-btn{position:relative;white-space:nowrap;height:28px;padding:0 10px;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:600;transition:background-color .14s,border-color .14s,color .14s}
.item-details .bk-btn.rep{background:#36383b;color:#fff}
.item-details .bk-btn.rep.hot{background:#45484c}
.item-details .bk-btn.del{border:1px solid #5b3434;color:#ff8f87}
.item-details .bk-btn.del.hot{background:rgba(220,70,60,.16);border-color:#8a4440;color:#ffa49d}
.item-details .bk-tip{position:absolute;top:calc(100% + 8px);left:50%;z-index:3;transform:translate(-50%,-4px);white-space:nowrap;background:#3e4146;color:#fff;font-size:11.5px;font-weight:600;padding:6px 9px;border-radius:5px;box-shadow:0 6px 16px rgba(0,0,0,.35);opacity:0;transition:opacity .16s ease,transform .16s ease;pointer-events:none}
.item-details .bk-tip::after{content:"";position:absolute;bottom:100%;left:50%;margin-left:-5px;border:5px solid transparent;border-bottom-color:#3e4146}
.item-details .bk-btn.hot .bk-tip{opacity:1;transform:translate(-50%,0)}
.item-details .bk-btn.del .bk-tip{left:auto;right:-6px;transform:translateY(-4px)}
.item-details .bk-btn.del .bk-tip::after{left:auto;right:28px}
.item-details .bk-btn.del.hot .bk-tip{transform:none}
.item-details .bk-x{width:28px;height:28px;border-radius:6px;display:grid;place-items:center;color:#cfd1d4;transition:background-color .14s}
.item-details .bk-x.hot{background:rgba(255,255,255,.12)}
.item-details .bk-scroll{flex:1;min-height:0;overflow:hidden;position:relative}
.item-details .bk-body{padding:4px 22px 24px;display:grid;gap:12px;align-content:start}
.item-details .bk-fade{position:absolute;left:0;right:0;bottom:0;height:56px;background:linear-gradient(rgba(28,30,32,0),#1c1e20);pointer-events:none;transition:opacity .2s}
.item-details .bk-fade.off{opacity:0}
.item-details .bk-photo{width:328px;height:328px;border-radius:6px;background:#fff;overflow:hidden}
.item-details .bk-photo img{width:328px;height:328px}
.item-details .bk-title{font-size:17px;line-height:1.3;font-weight:400}
.item-details .bk-title b{font-weight:700}
.item-details .bk-sub{font-size:12px;color:#a9acb0;margin-top:4px}
.item-details .bk-specs{display:grid;grid-template-columns:96px 1fr;row-gap:6px;font-size:12.5px;margin:0;padding-top:10px;border-top:1px solid #303235}
.item-details .bk-specs dt{color:#8d9095}
.item-details .bk-specs dd{margin:0;color:#e9eaeb}
.item-details .bk-label{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8d9095;padding-top:12px;border-top:1px solid #303235}
.item-details .bk-list{display:grid;gap:6px}
.item-details .bk-loc{display:flex;gap:12px;align-items:center;height:34px;padding:0 12px;background:#36383b;border-radius:4px;font-size:13.5px;color:#a9acb0}
.item-details .bk-loc b{color:#fff;font-weight:700;min-width:44px}
.item-details .bk-doc{display:flex;gap:10px;align-items:center;height:34px;padding:0 10px 0 12px;background:#2a2c2f;border-radius:4px;font-size:13px;color:#e9eaeb;transition:background-color .14s}
.item-details .bk-doc.hot{background:#3a3d41}
.item-details .bk-doc svg{flex:none;color:#a9acb0}
.item-details .bk-doc span{flex:1}
.item-details .bk-doc em{font-style:normal;font-size:10.5px;font-weight:600;letter-spacing:.06em;color:#8d9095}
.item-details .bk-doc .dl{color:#cfd1d4;opacity:.55;transition:opacity .14s}
.item-details .bk-doc.hot .dl{opacity:1}`;

const ICON = (d: string, w = 15, sw = 2, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const SWAP = ICON(`<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>`);
const TRASH = ICON(`<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/>`);
const CLOSE = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 16);
const FILE = ICON(`<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/><path d="M8 13h8M8 17h5"/>`, 16, 1.8);
const DL = ICON(`<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>`, 16, 1.8, "dl");
const doc = (name: string, k = "") => `<div class="bk-doc"${k ? ` data-r="${k}"` : ""}>${FILE}<span>${name}</span><em>PDF</em>${DL}</div>`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="An item in the room list is clicked and its details slide out beside the list: Replace and Remove actions, a photo, specs, the locations it is assigned to and its installation, care and repair documents. The panel scrolls to the documents, then closes.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}screen.webp" alt="">
${RAIL}
<div class="bk-seltint"></div>
<div class="bk-scrim"></div>
<div class="bk-clip"><div class="bk-panel">
<div class="bk-head"><span class="bk-id">PL-02</span><div class="bk-acts"><div class="bk-btn rep" data-r="rep">${SWAP}Replace item<span class="bk-tip">Opens the Catalog to pick a new item</span></div><div class="bk-btn del" data-r="del">${TRASH}Remove item<span class="bk-tip">Removes it from Item ID PL-02</span></div></div><div class="bk-x">${CLOSE}</div></div>
<div class="bk-scroll"><div class="bk-body">
<div class="bk-photo"><img src="${IMG}photo.webp" alt=""></div>
<div><div class="bk-title"><b>Elysian</b> Transitional 12" Rain Shower Head</div><div class="bk-sub">Style: ELY-2190</div></div>
<dl class="bk-specs"><dt>Finish</dt><dd>Brushed Silver</dd><dt>Size</dt><dd>12-inch Rain</dd><dt>Division</dt><dd>Plumbing</dd><dt>Room</dt><dd>Primary Bathroom · B-115 Shower</dd></dl>
<div class="bk-label">Locations</div>
<div class="bk-list"><div class="bk-loc"><b>LOC 3</b>Shower Head / Ceiling Mounted</div><div class="bk-loc"><b>LOC 4</b>Shower Head / Ceiling Mounted</div></div>
<div class="bk-label">Documents</div>
<div class="bk-list">${doc("Installation Guide", "doc")}${doc("Care &amp; Cleaning")}${doc("Repair &amp; Replacement Parts")}</div>
</div></div>
<div class="bk-fade"></div>
</div></div>
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

    const tint = q(".bk-seltint"), scrim = q(".bk-scrim"), panel = q(".bk-panel"), head = q(".bk-head");
    const scroller = q(".bk-scroll"), fade = q(".bk-fade"), closeX = q(".bk-x");
    const kids = [head, ...host.querySelectorAll<HTMLElement>(".bk-body>*")];
    const HOT = ["doc", "rep", "del"].map((k) => ({ el: q(`[data-r="${k}"]`), r: null as Rect | null }));
    const X = { x: 336 + 372 - 22 - 14, y: 48 + 16 + 14 };
    let open = false;

    /* Hit boxes in design px, read from layout once the panel is in place. */
    const measure = () => {
      const s = stage.clientWidth / 1366, a = stage.getBoundingClientRect();
      HOT.forEach((h) => {
        const b = h.el.getBoundingClientRect();
        h.r = { x: (b.left - a.left) / s, y: (b.top - a.top) / s, w: b.width / s, h: b.height / s };
      });
    };
    const at = (i: number, fx = 0.5) => {
      const r = HOT[i].r!;
      return { x: r.x + r.w * fx, y: r.y + r.h / 2 + 2 };
    };
    const setScrollState = () => {
      head.classList.toggle("scrolled", scroller.scrollTop > 2);
      fade.classList.toggle("off", scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight - 2);
    };
    const scrollTo = (to: number, dur: number) =>
      new Promise<void>((res) => {
        const from = scroller.scrollTop, t0 = performance.now();
        const step = (now: number) => {
          const u = Math.min(1, (now - t0) / dur);
          scroller.scrollTop = from + (to - from) * mj(u);
          setScrollState();
          if (u < 1) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      });

    const E = engine(stage, {
      home: { x: 760, y: 420 },
      reduced,
      rows: () => (open ? [] : [{ row, card }]),
      onFrame(_dt, pt) {
        closeX.classList.toggle("hot", open && Math.hypot(pt.x - X.x, pt.y - X.y) < 16);
        HOT.forEach((h) => { if (h.r) h.el.classList.toggle("hot", open && inside(pt, h.r)); });
      },
    });
    const S = E.S;
    const EASE = "cubic-bezier(.32,.72,0,1)";

    const closeState = () => {
      scroller.scrollTop = 0;
      setScrollState();
      head.classList.remove("scrolled");
      fade.classList.remove("off");
      open = false;
      S.lock = false;
      row.set("sel", false);
      tint.classList.remove("on");
    };
    function reset() {
      S.mode = "arrow";
      S.cx = 760;
      S.cy = 420;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      panel.style.transform = "translateX(-102%)";
      scrim.style.opacity = "0";
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

        open = true;
        S.lock = true;
        S.mode = "arrow";
        row.set("sel", true);
        tint.classList.add("on");
        panel.animate([{ transform: "translateX(-102%)" }, { transform: "translateX(0)" }], { duration: 460, easing: EASE, fill: "forwards" });
        scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "forwards" });
        kids.forEach((k, i) =>
          k.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], {
            duration: 320, delay: 140 + i * 40, easing: "ease-out", fill: "backwards",
          }),
        );
        await wait(480); if (!ok()) return;
        measure();

        /* The hand drifts aside to read, then tries both actions. */
        await E.moveTo(560, 330, { arc: 0.2, dur: 900 }); if (!ok()) return;
        await wait(900); if (!ok()) return;
        { const p = at(1, 0.55); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return;
        await wait(900); if (!ok()) return;
        { const p = at(2, 0.45); await E.moveTo(p.x, p.y, { arc: 0.06 }); } if (!ok()) return;
        await wait(1000); if (!ok()) return;

        /* Scroll down to the documents. */
        await E.reach(560, 520, { arc: 0.1 }); if (!ok()) return;
        await wait(250); if (!ok()) return;
        await scrollTo(scroller.scrollHeight - scroller.clientHeight, 1100); if (!ok()) return;
        measure();
        await wait(500); if (!ok()) return;
        { const r = HOT[0].r!; await E.reach(r.x + r.w - 60, r.y + r.h / 2, { arc: -0.14 }); } if (!ok()) return;
        await wait(1300); if (!ok()) return;

        /* Close. */
        await E.reach(X.x, X.y, { arc: 0.12 }); if (!ok()) return;
        await wait(380); if (!ok()) return;
        await E.click(); if (!ok()) return;
        panel.animate([{ transform: "translateX(0)" }, { transform: "translateX(-102%)" }], { duration: 300, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" });
        scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" });
        await wait(300);
        closeState();
        await E.moveTo(760, 420, { arc: 0.15 }); if (!ok()) return;
        await wait(1200); if (!ok()) return;
        reset();
      }
    }

    if (reduced) {
      panel.style.transform = "none";
      scrim.style.opacity = "1";
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
