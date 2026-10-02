import { IMG } from "@/components/book/engine";

/**
 * The Catalog, shared by ItemSchedule (a fly-in over 8/9 of the screen, opened
 * by Replace) and CatalogAdd (the full Catalog page, adding a custom item).
 * Card images: the item photos in the Figma file plus twenty showerhead
 * product shots Dave supplied (Kohler, Moen, Delta) under invented demo names.
 */

export type Card = { k: string; brand: string; name: string; style: string; finish: string; sw: string; cat: string };
/* Catalog results, in "Relevance" order. */
export const CARDS: Card[] = [
  { k: "elysian", brand: "Elysian", name: `Transitional 12" Rain Shower Head`, style: "ELY-2190", finish: "Brushed Silver", sw: "#c9cdd2", cat: "Shower Heads" },
  { k: "orbis", brand: "Orbis", name: `12" Round Rain Head`, style: "ORB-1200", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "fenn", brand: "Fenn", name: `Single-Function Shower Head`, style: "FEN-210", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "radiant", brand: "Radiant", name: `8" Rain Shower Head`, style: "RAD-0800", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "plano", brand: "Plano", name: `12" Rectangular Rain Head`, style: "PLN-1210", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "bell", brand: "Bell", name: `Eco-Performance Shower Head`, style: "BEL-150", finish: "Matte Black", sw: "#2b2b2b", cat: "Shower Heads" },
  { k: "bellmont", brand: "Bellmont", name: `10" Ceiling Rain Head`, style: "BMT-1010", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "rivet", brand: "Rivet", name: `5-Setting Shower Head`, style: "RVT-500", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "kohler", brand: "Kohler", name: `Statement Multifunction Showerhead`, style: "26290-BN", finish: "Vibrant Brushed Nickel", sw: "#9a9a96", cat: "Shower Heads" },
  { k: "edge", brand: "Edge", name: `Square Handheld Shower`, style: "EDG-340", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "pebble", brand: "Pebble", name: `Oblong Ceiling Rain Head`, style: "PBL-1400", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "quadra", brand: "Quadra", name: `10" Square Rain Head`, style: "QDR-1000", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "halcyon", brand: "Halcyon", name: `5-Function Shower Head`, style: "HLC-505", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "ardent", brand: "Ardent", name: `Multifunction Shower Head`, style: "ARD-330", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "tessa", brand: "Tessa", name: `Square Shower Head`, style: "TSA-220", finish: "Chrome · White", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "belfry", brand: "Belfry", name: `Single-Function Shower Head`, style: "BFY-110", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "stellar", brand: "Stellar", name: `8" Ceiling Rain Head`, style: "STL-0808", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "glide", brand: "Glide", name: `Handheld Shower`, style: "GLD-260", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "lumen", brand: "Lumen", name: `14" Soft-Square Rain Head`, style: "LMN-1400", finish: "Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "cirrus", brand: "Cirrus", name: `10" Ceiling Rain Head`, style: "CRS-1010", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "arlo", brand: "Arlo", name: `Handheld Shower with Hose`, style: "ARL-420", finish: "Matte Black", sw: "#2b2b2b", cat: "Shower Heads" },
  { k: "nimbus", brand: "Nimbus", name: `12" Ceiling Rain Head`, style: "NMB-1212", finish: "Polished Chrome", sw: "#e6e8ea", cat: "Shower Heads" },
  { k: "lyra", brand: "Lyra", name: "Wall Faucet", style: "LYR-7356", finish: "Solid Brass", sw: "#c8a265", cat: "Faucets" },
  { k: "aurelia", brand: "Aurelia", name: "Freestanding Tub", style: "AUR-4821", finish: "Calacatta Marble", sw: "#e8e4dc", cat: "Tubs" },
  { k: "vita", brand: "Vita", name: "Vessel Sink", style: "VTA-3278", finish: "Travertine Stone", sw: "#cdb79a", cat: "Sinks" },
  { k: "drain", brand: "Universal", name: `48" Channel Shower Drain`, style: "UNSD48", finish: "Stainless Steel", sw: "#b9bdc2", cat: "Drains" },
  { k: "finot", brand: "Finot", name: "Pressure Balance Control Valve Trim", style: "NPB160", finish: "Polished Nickel", sw: "#d9d6d0", cat: "Valves & Trim" },
  { k: "solo", brand: "Solo", name: "Towel Ring · Seamless Hoop", style: "LD15G1", finish: "Brushed Brass", sw: "#b8955a", cat: "Bath Accessories" },
  { k: "serena", brand: "Serena", name: "Double Vanity", style: "SRN-5043", finish: "Fluted Oak", sw: "#b98e62", cat: "Vanities" },
  { k: "saddle", brand: "Saddle", name: "Porcelain Wood Tile", style: "FN-02", finish: "Natural Oak", sw: "#c2a887", cat: "Tile" },
];
export const count = (c: string) => CARDS.filter((x) => x.cat === c).length;

export const ICON = (d: string, w = 15, sw = 2) =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
export const SEARCH = ICON(`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`, 16);
export const CLOSE = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 16);
export const XS = ICON(`<path d="M18 6 6 18M6 6l12 12"/>`, 11, 2.6);
export const CARET = ICON(`<path d="m6 9 6 6 6-6"/>`, 14);
export const PLUS = ICON(`<path d="M12 5v14M5 12h14"/>`, 14, 2.2);
export const CHECK = ICON(`<path d="M20 6 9 17l-5-5"/>`, 14, 2.6);
export const TICK = ICON(`<path d="M20 6 9 17l-5-5"/>`, 11, 3.4);
export const GRID = ICON(`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`, 15);
export const LIST = ICON(`<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>`, 15);

const box = (label: string, n: number | string, on = false, k = "") =>
  `<div class="bk-fr${on ? " on" : ""}"${k ? ` data-f="${k}"` : ""}><span class="bk-cb">${TICK}</span><span class="l">${label}</span><span class="n">${n}</span></div>`;
const FINISHES: [string, string][] = [["Brushed Silver", "#c9cdd2"], ["Brushed Nickel", "#9a9a96"], ["Brushed Brass", "#b8955a"], ["Polished Chrome", "#e6e8ea"], ["Matte Black", "#2b2b2b"], ["Natural Stone", "#cdb79a"]];
const CATS = [...new Set(CARDS.map((c) => c.cat))];

export const FILTERS = `<div class="bk-fl">
<div class="bk-fh"><b>Filters</b><span>Clear all</span></div>
<div class="bk-fs"><div class="bk-label">Source</div>${box("Efficiently Catalog", "4M+", true, "src:catalog")}${box("My items", 37, true, "src:mine")}</div>
<div class="bk-fs"><div class="bk-label">Division</div>${box("Plumbing", CARDS.length - 2, false, "div:Plumbing")}${box("Finishes", 1)}${box("Casework", 1)}</div>
<div class="bk-fs"><div class="bk-label">Category</div>${CATS.map((c) => box(c, count(c), false, `cat:${c}`)).join("")}</div>
<div class="bk-fs"><div class="bk-label">Finish</div><div class="bk-sws">${FINISHES.map(([n, c]) => `<span class="bk-swc"><i style="background:${c}"></i>${n}</span>`).join("")}</div></div>
<div class="bk-fs"><div class="bk-label">Brand</div>${box("Aurelia", 1)}${box("Elysian", 1)}${box("Finot", 1)}${box("Kohler", 1)}</div>
<div class="bk-ffade"></div>
</div>`;

export const CARD = (c: Card, badge = "", extra = "") => `<div class="bk-card${extra}" data-k="${c.k}" data-cat="${c.cat}">
<div class="bk-ci"><img src="${IMG}cat-${c.k}.webp" alt="">${badge}<span class="bk-sel">Select</span></div>
<div class="bk-ct"><div class="t"><b>${c.brand}</b> ${c.name}</div><div class="s">Style: ${c.style}</div><div class="f"><i style="background:${c.sw}"></i>${c.finish}</div></div>
</div>`;

/** The Catalog panel: header, search, filters and the card grid. */
export const catalogMarkup = ({ head, chips = [], cnt, cards }: { head: string; chips?: string[]; cnt: string; cards: string }) => `<div class="bk-cat">
<div class="bk-chd">
<div class="bk-ch">${head}</div>
<div class="bk-srow"><div class="bk-in">${SEARCH}<span>Search 4 million+ items by name, brand, style or SKU</span></div><div class="bk-add">${PLUS}Add your own item</div></div>
</div>
<div class="bk-cb2">
${FILTERS}
<div class="bk-gw">
<div class="bk-gt"><b class="bk-cnt">${cnt}</b>${chips.map((c) => `<span class="bk-chip">${c}${XS}</span>`).join("")}<span class="bk-sort">Sort: <b>Relevance</b>${CARET}</span><span class="bk-view"><i class="on">${GRID}</i><i>${LIST}</i></span></div>
<div class="bk-gs"><div class="bk-grid">${cards}</div></div>
</div>
</div>
</div>`;

/** Catalog CSS under a figure's scope class. Positioned as the fly-in;
    a full-page figure overrides .bk-cat. */
export const catalogCss = (s: string) => `${s} .bk-cat{position:absolute;left:152px;top:48px;width:1214px;height:720px;display:flex;flex-direction:column;background:#1c1e20;border-left:1px solid #000;box-shadow:-24px 0 48px rgba(0,0,0,.4);color:#fff;transform:translateX(102%)}
${s} .bk-chd{flex:none;padding:16px 24px 16px;border-bottom:1px solid #303235;display:grid;gap:12px}
${s} .bk-ch{display:flex;align-items:baseline;gap:14px}
${s} .bk-ch h4{margin:0;font-size:18px;font-weight:700}
${s} .bk-ch p{margin:0;font-size:12.5px;color:#a9acb0}
${s} .bk-ch p b{color:#fff;font-weight:600}
${s} .bk-ch .bk-x{margin-left:auto;align-self:center}
${s} .bk-srow{display:flex;gap:10px}
${s} .bk-in{flex:1;height:40px;display:flex;align-items:center;gap:10px;padding:0 14px;border-radius:6px;background:#2a2c2f;border:1px solid #3a3d41;font-size:13.5px;color:#7d8086}
${s} .bk-add{height:40px;display:flex;align-items:center;gap:6px;padding:0 14px;border-radius:6px;background:#36383b;font-size:12.5px;font-weight:600;white-space:nowrap}
${s} .bk-cb2{flex:1;min-height:0;display:grid;grid-template-columns:248px 1fr;grid-template-rows:minmax(0,1fr)}
${s} .bk-fl{position:relative;overflow:hidden;padding:14px 20px 0;border-right:1px solid #303235;display:grid;gap:14px;align-content:start}
${s} .bk-fh{display:flex;justify-content:space-between;align-items:baseline;font-size:14px}
${s} .bk-fh span{font-size:12px;color:#8fc1ff;font-weight:600}
${s} .bk-fs{display:grid;gap:2px}
${s} .bk-fs .bk-label{padding:12px 0 6px;font-size:10.5px}
${s} .bk-fr{display:flex;align-items:center;gap:9px;height:26px;padding:0 6px;margin:0 -6px;border-radius:4px;font-size:12.5px;color:#d5d7da;transition:background-color .12s}
${s} .bk-fr.hot{background:#2c2e31}
${s} .bk-fr .l{flex:1}
${s} .bk-fr .n{font-size:11px;color:#8d9095}
${s} .bk-cb{width:15px;height:15px;flex:none;border-radius:3px;border:1.5px solid #5a5d62;display:grid;place-items:center;color:transparent;transition:background-color .12s,border-color .12s,color .12s}
${s} .bk-fr.on .bk-cb{background:var(--hi);border-color:var(--hi);color:#fff}
${s} .bk-sws{display:flex;flex-wrap:wrap;gap:6px}
${s} .bk-swc{display:flex;align-items:center;gap:6px;height:24px;padding:0 9px 0 5px;border-radius:12px;background:#2a2c2f;font-size:11px;color:#c3c5c9}
${s} .bk-swc i,${s} .bk-ct .f i{width:13px;height:13px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
${s} .bk-ffade{position:absolute;left:0;right:0;bottom:0;height:64px;background:linear-gradient(rgba(28,30,32,0),#1c1e20)}
${s} .bk-gw{min-width:0;min-height:0;display:flex;flex-direction:column}
${s} .bk-gt{flex:none;height:48px;display:flex;align-items:center;gap:12px;padding:0 24px;font-size:13px}
${s} .bk-chip{display:flex;align-items:center;gap:6px;height:24px;padding:0 8px 0 10px;border-radius:12px;background:rgba(0,113,227,.22);color:#cfe3ff;font-size:11.5px;font-weight:600;opacity:0;transform:scale(.9)}
${s} .bk-chip.on{opacity:1;transform:none;transition:opacity .18s,transform .18s}
${s} .bk-sort{margin-left:auto;display:flex;align-items:center;gap:4px;font-size:12.5px;color:#a9acb0}
${s} .bk-sort b{color:#fff;font-weight:600}
${s} .bk-view{display:flex;gap:2px;padding:2px;border-radius:6px;background:#2a2c2f}
${s} .bk-view i{width:28px;height:24px;display:grid;place-items:center;border-radius:4px;color:#8d9095}
${s} .bk-view i.on{background:#3a3d41;color:#fff}
${s} .bk-gs{flex:1;min-height:0;overflow:hidden;position:relative}
${s} .bk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:4px 24px 24px}
${s} .bk-card{border-radius:8px;background:#26282b;overflow:hidden;box-shadow:0 0 0 1px transparent;transition:box-shadow .14s,background-color .14s}
${s} .bk-card.hot{background:#2c2f33;box-shadow:0 0 0 1.5px #5a5e64}
${s} .bk-card.out{display:none}
${s} .bk-ci{position:relative;aspect-ratio:436/328;background:#fff}
${s} .bk-ci img{width:100%;height:100%}
${s} .bk-now{position:absolute;left:8px;top:8px;height:22px;display:flex;align-items:center;padding:0 8px;border-radius:5px;background:#4f8a9a;color:#fff;font-size:11px;font-weight:600}
${s} .bk-sel{position:absolute;right:8px;bottom:8px;height:28px;display:flex;align-items:center;padding:0 14px;border-radius:6px;background:#36383b;color:#fff;font-size:12px;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.25);opacity:0;transform:translateY(4px);transition:opacity .14s,transform .14s,background-color .14s}
${s} .bk-card[data-k="elysian"] .bk-sel{display:none}
${s} .bk-card.hot .bk-sel{opacity:1;transform:none}
${s} .bk-sel.hot{background:var(--hi)}
${s} .bk-ct{padding:10px 12px 12px;display:grid;gap:3px}
${s} .bk-ct .t{font-size:13px;line-height:1.35;height:35px;overflow:hidden}
${s} .bk-ct .s{font-size:11.5px;color:#a9acb0}
${s} .bk-ct .f{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#c3c5c9;margin-top:2px}`;
