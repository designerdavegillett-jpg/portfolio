import { IMG, inside, mj, type Engine, type Rect } from "@/components/book/engine";

/**
 * The item details panel, shared by ItemDetails (the Design Book, panel slides
 * out of the room list on the left) and ItemSchedule (the Item Schedule,
 * panel slides in from the right edge). Same panel, same contents, same tour:
 * hover Replace and Remove, scroll to the documents, hover one, close.
 *
 * The panel is a design, not a capture: there is no Figma frame for it. Its
 * fields use only what the screens show; the document names are illustrative.
 */

export type Side = "left" | "right";

/** Panel x in design px: beside the room list, or flush to the right edge. */
const PX = { left: 336, right: 994 } as const;

export const panelCss = (s: string, side: Side) => {
  const L = side === "left";
  return `${s} .bk-scrim{position:absolute;${L ? "left:336px;top:48px;right:0" : "left:0;top:48px;width:994px"};bottom:0;background:rgba(10,11,12,.32);opacity:0;pointer-events:none}
${s} .bk-clip{position:absolute;left:${L ? 336 : 906}px;top:48px;width:460px;height:720px;overflow:hidden;pointer-events:none}
${s} .bk-panel{position:absolute;left:${L ? 0 : 88}px;top:0;width:372px;height:720px;display:flex;flex-direction:column;background:#1c1e20;border-left:1px solid #000;box-shadow:${L ? 24 : -24}px 0 48px rgba(0,0,0,.35);color:#fff;transform:translateX(${L ? -102 : 102}%)}
${s} .bk-head{flex:none;display:flex;align-items:center;gap:8px;position:relative;z-index:3;padding:16px 22px 12px;background:#1c1e20;border-bottom:1px solid transparent;transition:border-color .2s}
${s} .bk-head>*{flex:none}
${s} .bk-head.scrolled{border-bottom-color:#303235}
${s} .bk-id{height:28px;display:flex;align-items:center;padding:0 10px;border-radius:6px;background:#4f8a9a;font-size:12px;font-weight:600;white-space:nowrap}
${s} .bk-acts{display:flex;gap:6px;margin-left:auto}
${s} .bk-btn{position:relative;white-space:nowrap;height:28px;padding:0 10px;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:600;transition:background-color .14s,border-color .14s,color .14s}
${s} .bk-btn.rep{background:#36383b;color:#fff}
${s} .bk-btn.rep.hot{background:#45484c}
${s} .bk-btn.del{border:1px solid #5b3434;color:#ff8f87}
${s} .bk-btn.del.hot{background:rgba(220,70,60,.16);border-color:#8a4440;color:#ffa49d}
${s} .bk-tip{position:absolute;top:calc(100% + 8px);left:50%;z-index:3;transform:translate(-50%,-4px);white-space:nowrap;background:#3e4146;color:#fff;font-size:11.5px;font-weight:600;padding:6px 9px;border-radius:5px;box-shadow:0 6px 16px rgba(0,0,0,.35);opacity:0;transition:opacity .16s ease,transform .16s ease;pointer-events:none}
${s} .bk-tip::after{content:"";position:absolute;bottom:100%;left:50%;margin-left:-5px;border:5px solid transparent;border-bottom-color:#3e4146}
${s} .bk-btn.hot .bk-tip{opacity:1;transform:translate(-50%,0)}
${s} .bk-btn.del .bk-tip{left:auto;right:-6px;transform:translateY(-4px)}
${s} .bk-btn.del .bk-tip::after{left:auto;right:28px}
${s} .bk-btn.del.hot .bk-tip{transform:none}
${s} .bk-x{width:28px;height:28px;border-radius:6px;display:grid;place-items:center;color:#cfd1d4;transition:background-color .14s}
${s} .bk-x.hot{background:rgba(255,255,255,.12)}
${s} .bk-scroll{flex:1;min-height:0;overflow:hidden;position:relative}
${s} .bk-body{padding:4px 22px 24px;display:grid;gap:12px;align-content:start}
${s} .bk-fade{position:absolute;left:0;right:0;bottom:0;height:56px;background:linear-gradient(rgba(28,30,32,0),#1c1e20);pointer-events:none;transition:opacity .2s}
${s} .bk-fade.off{opacity:0}
${s} .bk-photo{width:328px;height:328px;border-radius:6px;background:#fff;overflow:hidden}
${s} .bk-photo img{width:328px;height:328px}
${s} .bk-title{font-size:17px;line-height:1.3;font-weight:400}
${s} .bk-title b{font-weight:700}
${s} .bk-sub{font-size:12px;color:#a9acb0;margin-top:4px}
${s} .bk-specs{display:grid;grid-template-columns:96px 1fr;row-gap:6px;font-size:12.5px;margin:0;padding-top:10px;border-top:1px solid #303235}
${s} .bk-specs dt{color:#8d9095}
${s} .bk-specs dd{margin:0;color:#e9eaeb}
${s} .bk-label{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8d9095;padding-top:12px;border-top:1px solid #303235}
${s} .bk-list{display:grid;gap:6px}
${s} .bk-loc{display:flex;gap:12px;align-items:center;height:34px;padding:0 12px;background:#36383b;border-radius:4px;font-size:13.5px;color:#a9acb0}
${s} .bk-loc b{color:#fff;font-weight:700;min-width:44px}
${s} .bk-doc{display:flex;gap:10px;align-items:center;height:34px;padding:0 10px 0 12px;background:#2a2c2f;border-radius:4px;font-size:13px;color:#e9eaeb;transition:background-color .14s}
${s} .bk-doc.hot{background:#3a3d41}
${s} .bk-doc svg{flex:none;color:#a9acb0}
${s} .bk-doc span{flex:1}
${s} .bk-doc em{font-style:normal;font-size:10.5px;font-weight:600;letter-spacing:.06em;color:#8d9095}
${s} .bk-doc .dl{color:#cfd1d4;opacity:.55;transition:opacity .14s}
${s} .bk-doc.hot .dl{opacity:1}`;
};

const ICON = (d: string, w = 15, sw = 2, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const SWAP = ICON(`<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>`);
const TRASH = ICON(`<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/>`);
const CLOSE = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 16);
const FILE = ICON(`<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6"/><path d="M8 13h8M8 17h5"/>`, 16, 1.8);
const DL = ICON(`<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>`, 16, 1.8, "dl");
const doc = (name: string, k = "") => `<div class="bk-doc"${k ? ` data-r="${k}"` : ""}>${FILE}<span>${name}</span><em>PDF</em>${DL}</div>`;

/** Scrim plus the PL-02 showerhead panel. */
export const PANEL = `<div class="bk-scrim"></div>
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
</div></div>`;

const EASE = "cubic-bezier(.32,.72,0,1)";

/** Panel state, hover, and the scripted tour through it. */
export function panelKit(host: HTMLElement, stage: HTMLElement, side: Side) {
  const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
  const P = PX[side];
  const OFF = `translateX(${side === "left" ? -102 : 102}%)`;
  const scrim = q(".bk-scrim"), panel = q(".bk-panel"), head = q(".bk-head");
  const scroller = q(".bk-scroll"), fade = q(".bk-fade"), closeX = q(".bk-x");
  const kids = [head, ...host.querySelectorAll<HTMLElement>(".bk-body>*")];
  const HOT = ["doc", "rep", "del"].map((k) => ({ el: q(`[data-r="${k}"]`), r: null as Rect | null }));
  const X = { x: P + 372 - 22 - 14, y: 48 + 16 + 14 };
  const K = { open: false };

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
  /* Steps on the figure's clock, so pause, slow motion and seeking apply. */
  const scrollTo = async (E: Engine, to: number, dur: number) => {
    const from = scroller.scrollTop, t0 = E.now();
    for (let u = 0; u < 1; ) {
      await E.wait(16);
      u = Math.min(1, (E.now() - t0) / dur);
      scroller.scrollTop = from + (to - from) * mj(u);
      setScrollState();
    }
  };

  const hover = (pt: { x: number; y: number }) => {
    closeX.classList.toggle("hot", K.open && Math.hypot(pt.x - X.x, pt.y - X.y) < 16);
    HOT.forEach((h) => { if (h.r) h.el.classList.toggle("hot", K.open && inside(pt, h.r)); });
  };

  const show = () => {
    K.open = true;
    panel.animate([{ transform: OFF }, { transform: "translateX(0)" }], { duration: 460, easing: EASE, fill: "forwards" });
    scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "forwards" });
    kids.forEach((k, i) =>
      k.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], {
        duration: 320, delay: 140 + i * 40, easing: "ease-out", fill: "backwards",
      }),
    );
  };

  /* After show(): read, try both actions, scroll to the documents, close.
     Resolves false if the run was stopped part way. */
  async function tour(E: Engine, ok: () => boolean) {
    const wait = E.wait;
    await wait(480); if (!ok()) return false;
    measure();
    /* The hand drifts aside to read, then tries both actions. */
    await E.moveTo(P + 224, 330, { arc: 0.2, dur: 900 }); if (!ok()) return false;
    await wait(900); if (!ok()) return false;
    { const p = at(1, 0.55); await E.reach(p.x, p.y, { arc: 0.1 }); } if (!ok()) return false;
    await wait(900); if (!ok()) return false;
    { const p = at(2, 0.45); await E.moveTo(p.x, p.y, { arc: 0.06 }); } if (!ok()) return false;
    await wait(1000); if (!ok()) return false;
    /* Scroll down to the documents. */
    await E.reach(P + 224, 520, { arc: 0.1 }); if (!ok()) return false;
    await wait(250); if (!ok()) return false;
    await scrollTo(E, scroller.scrollHeight - scroller.clientHeight, 1100); if (!ok()) return false;
    measure();
    await wait(500); if (!ok()) return false;
    { const r = HOT[0].r!; await E.reach(r.x + r.w - 60, r.y + r.h / 2, { arc: -0.14 }); } if (!ok()) return false;
    await wait(1300); if (!ok()) return false;
    /* Close. */
    await E.reach(X.x, X.y, { arc: 0.12 }); if (!ok()) return false;
    await wait(380); if (!ok()) return false;
    await E.click(); if (!ok()) return false;
    await hide(E);
    return true;
  }

  /* Slide the panel away and lift the scrim. */
  const hide = async (E: Engine) => {
    panel.animate([{ transform: "translateX(0)" }, { transform: OFF }], { duration: 300, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" });
    scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" });
    await E.wait(300);
  };

  const closeState = () => {
    scroller.scrollTop = 0;
    setScrollState();
    head.classList.remove("scrolled");
    fade.classList.remove("off");
    K.open = false;
  };
  const reset = () => {
    panel.style.transform = OFF;
    scrim.style.opacity = "0";
    closeState();
  };
  const reducedShow = () => {
    panel.style.transform = "none";
    scrim.style.opacity = "1";
  };

  return { K, P, X, measure, at, hover, show, hide, tour, closeState, reset, reducedShow };
}
