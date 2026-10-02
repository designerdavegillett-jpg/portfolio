"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, inside, wait, mj, type Rect } from "@/components/book/engine";
import { PANEL, panelCss, panelKit } from "@/components/book/details";

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
 * thumbnails, the Kohler item at 54642:109696) plus eight showerheads from
 * Pexels and Unsplash (free licenses, no attribution required), cut to
 * 436x328. Their brand names are invented.
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

type Card = { k: string; brand: string; name: string; style: string; finish: string; sw: string; cat: string };
/* Catalog results, in "Relevance" order. */
const CARDS: Card[] = [
  { k: "elysian", brand: "Elysian", name: `Transitional 12" Rain Shower Head`, style: "ELY-2190", finish: "Brushed Silver", sw: "#c9cdd2", cat: "Shower Heads" },
  { k: "noir", brand: "Noir", name: `10" Round Rain Shower Head`, style: "NR-1040", finish: "Matte Black", sw: "#2b2b2b", cat: "Shower Heads" },
  { k: "arc", brand: "Arc", name: "Multifunction Hand Shower on Slide Bar", style: "ARC-520", finish: "Chrome · White", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "metro", brand: "Metro", name: `12" Wall Mount Rain Head`, style: "MTR-1208", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "halo", brand: "Halo", name: `9" Rain Shower Head`, style: "HAL-0907", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "verde", brand: "Verde", name: `10" Round Rain Head`, style: "VRD-1010", finish: "Brushed Nickel", sw: "#9a9a96", cat: "Shower Heads" },
  { k: "linea", brand: "Linea", name: "Slide Bar Hand Shower", style: "LIN-300", finish: "Chrome · White", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "cascade", brand: "Cascade", name: `14" Ceiling Rain Head`, style: "CSC-1400", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "kohler", brand: "Kohler", name: "Statement Multifunction Showerhead", style: "26290-BN", finish: "Vibrant Brushed Nickel", sw: "#9a9a96", cat: "Shower Heads" },
  { k: "heritage", brand: "Heritage", name: "Lever Hand Shower", style: "HRT-210", finish: "Antique Brass", sw: "#a87a45", cat: "Shower Heads" },
  { k: "lyra", brand: "Lyra", name: "Wall Faucet", style: "LYR-7356", finish: "Solid Brass", sw: "#c8a265", cat: "Faucets" },
  { k: "aurelia", brand: "Aurelia", name: "Freestanding Tub", style: "AUR-4821", finish: "Calacatta Marble", sw: "#e8e4dc", cat: "Tubs" },
  { k: "vita", brand: "Vita", name: "Vessel Sink", style: "VTA-3278", finish: "Travertine Stone", sw: "#cdb79a", cat: "Sinks" },
  { k: "drain", brand: "Universal", name: `48" Channel Shower Drain`, style: "UNSD48", finish: "Stainless Steel", sw: "#b9bdc2", cat: "Drains" },
  { k: "finot", brand: "Finot", name: "Pressure Balance Control Valve Trim", style: "NPB160", finish: "Polished Nickel", sw: "#d9d6d0", cat: "Valves & Trim" },
  { k: "solo", brand: "Solo", name: "Towel Ring · Seamless Hoop", style: "LD15G1", finish: "Brushed Brass", sw: "#b8955a", cat: "Bath Accessories" },
  { k: "serena", brand: "Serena", name: "Double Vanity", style: "SRN-5043", finish: "Fluted Oak", sw: "#b98e62", cat: "Vanities" },
  { k: "saddle", brand: "Saddle", name: "Porcelain Wood Tile", style: "FN-02", finish: "Natural Oak", sw: "#c2a887", cat: "Tile" },
];
const PICK = "Shower Heads";
const count = (c: string) => CARDS.filter((x) => x.cat === c).length;

const ICON = (d: string, w = 15, sw = 2) =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const SEARCH = ICON(`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`, 16);
const CLOSE = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 16);
const XS = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 11, 2.6);
const CARET = ICON(`<path d="m6 9 6 6 6-6"/>`, 14);
const PLUS = ICON(`<path d="M12 5v14M5 12h14"/>`, 14, 2.2);
const CHECK = ICON(`<path d="M20 6 9 17l-5-5"/>`, 14, 2.6);
const TICK = ICON(`<path d="M20 6 9 17l-5-5"/>`, 11, 3.4);
const GRID = ICON(`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`, 15);
const LIST = ICON(`<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>`, 15);

const box = (label: string, n: number | string, on = false, k = "") =>
  `<div class="bk-fr${on ? " on" : ""}"${k ? ` data-f="${k}"` : ""}><span class="bk-cb">${TICK}</span><span class="l">${label}</span><span class="n">${n}</span></div>`;
const FINISHES: [string, string][] = [["Brushed Silver", "#c9cdd2"], ["Brushed Nickel", "#9a9a96"], ["Brushed Brass", "#b8955a"], ["Polished Chrome", "#e6e8ea"], ["Matte Black", "#2b2b2b"], ["Natural Stone", "#cdb79a"]];
const CATS = [...new Set(CARDS.map((c) => c.cat))];

const FILTERS = `<div class="bk-fl">
<div class="bk-fh"><b>Filters</b><span>Clear all</span></div>
<div class="bk-fs"><div class="bk-label">Source</div>${box("Efficiently Catalog", "4M+", true)}${box("My items", 37, true)}</div>
<div class="bk-fs"><div class="bk-label">Division</div>${box("Plumbing", CARDS.length - 2, false, "div")}${box("Finishes", 1)}${box("Casework", 1)}</div>
<div class="bk-fs"><div class="bk-label">Category</div>${CATS.map((c) => box(c, count(c), false, c === PICK ? "pick" : "")).join("")}</div>
<div class="bk-fs"><div class="bk-label">Finish</div><div class="bk-sws">${FINISHES.map(([n, c]) => `<span class="bk-swc"><i style="background:${c}"></i>${n}</span>`).join("")}</div></div>
<div class="bk-fs"><div class="bk-label">Brand</div>${box("Aurelia", 1)}${box("Elysian", 1)}${box("Finot", 1)}${box("Kohler", 1)}</div>
<div class="bk-ffade"></div>
</div>`;

const CARD = (c: Card) => `<div class="bk-card" data-k="${c.k}" data-cat="${c.cat}">
<div class="bk-ci"><img src="${IMG}cat-${c.k}.webp" alt="">${c.k === "elysian" ? `<span class="bk-now">Current · PL-02</span>` : ""}<span class="bk-sel">Select</span></div>
<div class="bk-ct"><div class="t"><b>${c.brand}</b> ${c.name}</div><div class="s">Style: ${c.style}</div><div class="f"><i style="background:${c.sw}"></i>${c.finish}</div></div>
</div>`;

const CATALOG = `<div class="bk-cat">
<div class="bk-chd">
<div class="bk-ch"><h4>Catalog</h4><p>Replacing <b>PL-02</b> · Shower Head / Ceiling Mounted · LOC 3, LOC 4</p><div class="bk-x">${CLOSE}</div></div>
<div class="bk-srow"><div class="bk-in">${SEARCH}<span>Search 4 million+ items by name, brand, style or SKU</span></div><div class="bk-add">${PLUS}Add your own item</div></div>
</div>
<div class="bk-cb2">
${FILTERS}
<div class="bk-gw">
<div class="bk-gt"><b class="bk-cnt">${count(PICK)} results</b><span class="bk-chip">Plumbing${XS}</span><span class="bk-chip">${PICK}${XS}</span><span class="bk-sort">Sort: <b>Relevance</b>${CARET}</span><span class="bk-view"><i class="on">${GRID}</i><i>${LIST}</i></span></div>
<div class="bk-gs"><div class="bk-grid">${CARDS.map(CARD).join("")}</div></div>
</div>
</div>
</div>`;

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
.item-schedule .bk-mscrim{position:absolute;left:0;top:48px;right:0;bottom:0;background:rgba(10,11,12,.42);opacity:0;pointer-events:none}
.item-schedule .bk-cat{position:absolute;left:152px;top:48px;width:1214px;height:720px;display:flex;flex-direction:column;background:#1c1e20;border-left:1px solid #000;box-shadow:-24px 0 48px rgba(0,0,0,.4);color:#fff;transform:translateX(102%)}
.item-schedule .bk-chd{flex:none;padding:16px 24px 16px;border-bottom:1px solid #303235;display:grid;gap:12px}
.item-schedule .bk-ch{display:flex;align-items:baseline;gap:14px}
.item-schedule .bk-ch h4{margin:0;font-size:18px;font-weight:700}
.item-schedule .bk-ch p{margin:0;font-size:12.5px;color:#a9acb0}
.item-schedule .bk-ch p b{color:#fff;font-weight:600}
.item-schedule .bk-ch .bk-x{margin-left:auto;align-self:center}
.item-schedule .bk-srow{display:flex;gap:10px}
.item-schedule .bk-in{flex:1;height:40px;display:flex;align-items:center;gap:10px;padding:0 14px;border-radius:6px;background:#2a2c2f;border:1px solid #3a3d41;font-size:13.5px;color:#7d8086}
.item-schedule .bk-add{height:40px;display:flex;align-items:center;gap:6px;padding:0 14px;border-radius:6px;background:#36383b;font-size:12.5px;font-weight:600;white-space:nowrap}
.item-schedule .bk-cb2{flex:1;min-height:0;display:grid;grid-template-columns:248px 1fr;grid-template-rows:minmax(0,1fr)}
.item-schedule .bk-fl{position:relative;overflow:hidden;padding:14px 20px 0;border-right:1px solid #303235;display:grid;gap:14px;align-content:start}
.item-schedule .bk-fh{display:flex;justify-content:space-between;align-items:baseline;font-size:14px}
.item-schedule .bk-fh span{font-size:12px;color:#8fc1ff;font-weight:600}
.item-schedule .bk-fs{display:grid;gap:2px}
.item-schedule .bk-fs .bk-label{padding:12px 0 6px;font-size:10.5px}
.item-schedule .bk-fr{display:flex;align-items:center;gap:9px;height:26px;padding:0 6px;margin:0 -6px;border-radius:4px;font-size:12.5px;color:#d5d7da;transition:background-color .12s}
.item-schedule .bk-fr.hot{background:#2c2e31}
.item-schedule .bk-fr .l{flex:1}
.item-schedule .bk-fr .n{font-size:11px;color:#8d9095}
.item-schedule .bk-cb{width:15px;height:15px;flex:none;border-radius:3px;border:1.5px solid #5a5d62;display:grid;place-items:center;color:transparent;transition:background-color .12s,border-color .12s,color .12s}
.item-schedule .bk-fr.on .bk-cb{background:var(--hi);border-color:var(--hi);color:#fff}
.item-schedule .bk-sws{display:flex;flex-wrap:wrap;gap:6px}
.item-schedule .bk-swc{display:flex;align-items:center;gap:6px;height:24px;padding:0 9px 0 5px;border-radius:12px;background:#2a2c2f;font-size:11px;color:#c3c5c9}
.item-schedule .bk-swc i,.item-schedule .bk-ct .f i{width:13px;height:13px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.item-schedule .bk-ffade{position:absolute;left:0;right:0;bottom:0;height:64px;background:linear-gradient(rgba(28,30,32,0),#1c1e20)}
.item-schedule .bk-gw{min-width:0;min-height:0;display:flex;flex-direction:column}
.item-schedule .bk-gt{flex:none;height:48px;display:flex;align-items:center;gap:12px;padding:0 24px;font-size:13px}
.item-schedule .bk-chip{display:flex;align-items:center;gap:6px;height:24px;padding:0 8px 0 10px;border-radius:12px;background:rgba(0,113,227,.22);color:#cfe3ff;font-size:11.5px;font-weight:600;opacity:0;transform:scale(.9)}
.item-schedule .bk-chip.on{opacity:1;transform:none;transition:opacity .18s,transform .18s}
.item-schedule .bk-sort{margin-left:auto;display:flex;align-items:center;gap:4px;font-size:12.5px;color:#a9acb0}
.item-schedule .bk-sort b{color:#fff;font-weight:600}
.item-schedule .bk-view{display:flex;gap:2px;padding:2px;border-radius:6px;background:#2a2c2f}
.item-schedule .bk-view i{width:28px;height:24px;display:grid;place-items:center;border-radius:4px;color:#8d9095}
.item-schedule .bk-view i.on{background:#3a3d41;color:#fff}
.item-schedule .bk-gs{flex:1;min-height:0;overflow:hidden;position:relative}
.item-schedule .bk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:4px 24px 24px}
.item-schedule .bk-card{border-radius:8px;background:#26282b;overflow:hidden;box-shadow:0 0 0 1px transparent;transition:box-shadow .14s,background-color .14s}
.item-schedule .bk-card.hot{background:#2c2f33;box-shadow:0 0 0 1.5px #5a5e64}
.item-schedule .bk-card.out{display:none}
.item-schedule .bk-ci{position:relative;aspect-ratio:436/328;background:#fff}
.item-schedule .bk-ci img{width:100%;height:100%}
.item-schedule .bk-now{position:absolute;left:8px;top:8px;height:22px;display:flex;align-items:center;padding:0 8px;border-radius:5px;background:#4f8a9a;color:#fff;font-size:11px;font-weight:600}
.item-schedule .bk-sel{position:absolute;right:8px;bottom:8px;height:28px;display:flex;align-items:center;padding:0 14px;border-radius:6px;background:#36383b;color:#fff;font-size:12px;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.25);opacity:0;transform:translateY(4px);transition:opacity .14s,transform .14s,background-color .14s}
.item-schedule .bk-card[data-k="elysian"] .bk-sel{display:none}
.item-schedule .bk-card.hot .bk-sel{opacity:1;transform:none}
.item-schedule .bk-sel.hot{background:var(--hi)}
.item-schedule .bk-ct{padding:10px 12px 12px;display:grid;gap:3px}
.item-schedule .bk-ct .t{font-size:13px;line-height:1.35;height:35px;overflow:hidden}
.item-schedule .bk-ct .s{font-size:11.5px;color:#a9acb0}
.item-schedule .bk-ct .f{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#c3c5c9;margin-top:2px}
.item-schedule .bk-toast{position:absolute;left:497px;top:690px;display:flex;align-items:center;gap:8px;height:38px;padding:0 16px 0 12px;border-radius:8px;background:#1c1e20;color:#fff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.35);white-space:nowrap;opacity:0;transform:translate(-50%,8px)}
.item-schedule .bk-toast svg{color:#5fd394}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="The Item Schedule for the primary bathroom and shower. The PL-02 Item ID on a shower head row is clicked and its details slide in from the right. Replace item flies the Catalog in over most of the screen, with search across the top, filters down the left and a grid of item cards. The Catalog opens filtered to plumbing shower heads; the grid is scrolled and a different showerhead is selected. The panel and both shower head rows that use PL-02 change to the new item.">
<div class="bk-inner">
<img class="bk-full" src="${IMG}schedule.webp" alt="">
${SAME.map((i) => `<img class="bk-cell" style="top:${ROWS[i] + 1}px" src="${IMG}cell-kohler.webp" alt="">`).join("")}
${ROWS.map((y) => `<div class="bk-row" style="top:${y}px"></div>`).join("")}
${ROWS.map((y) => `<div class="bk-tag" style="top:${y + 9.5}px"></div>`).join("")}
<div class="bk-toast">${CHECK}PL-02 updated in 2 locations</div>
${PANEL}
<div class="bk-mscrim"></div>
${CATALOG}
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">Replace on an Item ID opens the Catalog. Search, filter, pick the new item, and everything using that ID changes with it, the details panel and both shower head locations, LOC 3 and LOC 4.</div><button type="button" class="bk-replay">Replay</button></div>`;

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
    const rows = qa(".bk-row"), tags = qa(".bk-tag"), cells = qa(".bk-cell");
    const kit = panelKit(host, stage, "right");
    const cat = q(".bk-cat"), mscrim = q(".bk-mscrim"), toast = q(".bk-toast"), body = q(".bk-body");
    const gs = q(".bk-gs"), cards = qa(".bk-card"), frs = qa(".bk-fr"), chips = qa(".bk-chip"), cnt = q(".bk-cnt");
    const fPick = q('[data-f="pick"]'), fDiv = q('[data-f="div"]'), kohler = q('[data-k="kohler"]'), sel = kohler.querySelector<HTMLElement>(".bk-sel")!;
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
    const scrollGrid = (to: number, dur: number) =>
      new Promise<void>((res) => {
        const from = gs.scrollTop, t0 = performance.now();
        const step = (now: number) => {
          const u = Math.min(1, (now - t0) / dur);
          gs.scrollTop = from + (to - from) * mj(u);
          if (u < 1) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      });
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

        /* The Catalog flies in. */
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
        { const b = box(kohler); await E.reach(b.x + b.w * 0.45, b.y + b.h * 0.35, { arc: 0.14 }); } if (!ok()) return;
        await wait(800); if (!ok()) return;
        { const b = box(sel); await E.reach(b.x + b.w / 2, b.y + b.h / 2 + 1, { arc: -0.1 }); } if (!ok()) return;
        await wait(400); if (!ok()) return;
        await E.click(); if (!ok()) return;

        /* The Catalog closes, the panel and both locations change. */
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
