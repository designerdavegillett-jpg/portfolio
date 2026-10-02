"use client";

import { useEffect, useRef } from "react";
import { IMG, STYLES as BASE, CURSOR, engine, controller, type Rect } from "@/components/book/engine";

/**
 * Before Efficiently: one item, copied by hand. A designer has the
 * manufacturer's product page, a spreadsheet and InDesign open. Each
 * attribute is selected on the web page, copied, switched over to Excel and
 * pasted into its own cell, then switched back for the next. Then each cell
 * is copied and pasted line by line into the item's caption on the InDesign
 * page. Counters in the menu bar tally the copies, pastes and app switches.
 *
 * Everything here is drawn in HTML: the browser, Excel and InDesign windows
 * are depictions, not captures, with neutral app icons. The product details
 * are Kohler's published page for the Purist widespread faucet (K-14406-4-CP);
 * the InDesign page is the Design Book page from Figma 55026:99643.
 * Same contract as the other figures. See components/book/engine.ts.
 */

const HOME = { x: 980, y: 620 };
const FAUCET = `${IMG}faucet.webp`;
const P = { left: 152, top: 120, s: 1 }; // InDesign page placement in design px

/* Web attribute -> Excel cell. */
const ATTRS = [
  { k: "name", cell: "D6", text: "Purist Widespread Bathroom Sink Faucet" },
  { k: "model", cell: "E6", text: "K-14406-4-CP" },
  { k: "finish", cell: "F6", text: "Polished Chrome" },
  { k: "flow", cell: "G6", text: "1.2 gpm" },
];
const WHAT: Record<string, string> = { name: "product name", model: "model number", finish: "finish", flow: "flow rate" };
/* Excel cell -> caption line on the page. */
const LINES = [
  { cell: "D6", line: 0, text: "PURIST WIDESPREAD FAUCET" },
  { cell: "F6", line: 1, text: "Polished Chrome" },
  { cell: "G6", line: 1, text: " · 1.2 gpm", append: true },
  { cell: "E6", line: 2, text: "SKU-K-14406-4-CP" },
];

const ICON = (d: string, w = 16, sw = 1.8, c = "currentColor") =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const GLOBE = ICON(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`, 34, 1.6, "#fff");
const SHEET = ICON(`<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>`, 34, 1.6, "#fff");
const LAYOUT = ICON(`<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 8h6v5H7zM15 8h2M15 11h2M7 16h10"/>`, 34, 1.6, "#fff");

/* Excel grid. */
const COLS = [
  ["A", "Item ID", 64], ["B", "Room", 118], ["C", "Location", 160], ["D", "Item", 300], ["E", "Model", 124], ["F", "Finish", 128], ["G", "Flow", 74], ["H", "Notes", 140],
] as const;
const ROWS: string[][] = [
  ["PL-02", "B115 Shower", "Shower Head / Ceiling", "Elysian Transitional 12\" Rain Shower Head", "ELY-2190", "Brushed Silver", "2.5 gpm", ""],
  ["PL-06", "B115 Shower", "Shower Drain / Rectangle", "Universal 48\" Channel Shower Drain", "UNSD48", "Stainless", "", ""],
  ["PL-08", "B115 Shower", "Towel Ring / Single", "Solo Brushed Brass Seamless Hoop", "LD15G1", "Brushed Brass", "", ""],
  ["PL-12", "B115 Shower", "Shower Control", "Finot Pressure Balance Valve Trim", "NPB160", "Polished Nickel", "", ""],
  ["PL-04", "B114 Primary Bath", "Faucet - Lavatory", "", "", "", "", ""],
];
const gridHtml = () => {
  const head = `<div class="xr xh"><i class="xn"></i>${COLS.map(([l, , w]) => `<i style="width:${w}px">${l}</i>`).join("")}</div>`;
  const r1 = `<div class="xr"><i class="xn">1</i>${COLS.map(([, h, w]) => `<i class="b" style="width:${w}px">${h}</i>`).join("")}</div>`;
  const body = ROWS.map((r, i) => `<div class="xr"><i class="xn">${i + 2}</i>${COLS.map(([l, , w], j) => `<i data-cell="${l}${i + 2}" style="width:${w}px">${r[j]}</i>`).join("")}</div>`).join("");
  const empty = Array.from({ length: 16 }, (_, i) => `<div class="xr"><i class="xn">${i + 7}</i>${COLS.map(([, , w]) => `<i style="width:${w}px"></i>`).join("")}</div>`).join("");
  return head + r1 + body + empty;
};

const sel = (k: string, html: string) => `<span class="ws" data-a="${k}"><b class="hl"></b><span>${html}</span></span>`;

const BROWSER = `<div class="app web" data-app="web">
<div class="wtabs"><span class="dots"><i></i><i></i><i></i></span><span class="wtab">Purist® Widespread bathroom sink faucet | KOHLER</span></div>
<div class="wbar"><span class="nav">‹ ›</span><span class="url">kohler.com/en/products/bathroom-faucets/shop-bathroom-sink-faucets/purist-…-14406-4</span></div>
<div class="wpage">
<div class="khead"><b>KOHLER</b><span>Bathroom</span><span>Kitchen</span><span>Health &amp; Wellness</span><span>Inspiration</span><span>Services</span><span>Parts &amp; Support</span><span>For Professionals</span></div>
<div class="crumb">Home / Bathroom Sink Faucets / Purist</div>
<div class="pdp">
<div class="pimg"><img src="${FAUCET}" alt=""></div>
<div class="pinfo">
<h3>${sel("name", "Purist® Widespread bathroom sink faucet with Lever handles, 1.2 gpm")}</h3>
<div class="model">${sel("model", "K-14406-4-CP")}</div>
<div class="price">$607.50</div>
<div class="color">Color: ${sel("finish", "Polished Chrome")}</div>
<div class="sws">${["#d9dcdf", "#b9b6ad", "#8e8a86", "#c7c9cb", "#2b2b2b", "#6b4f3a", "#c9a35c", "#1d1d1f"].map((c, i) => `<i style="background:${c}"${i === 0 ? ' class="on"' : ""}></i>`).join("")}</div>
<dl class="specs"><dt>Flow rate</dt><dd>${sel("flow", "1.2 gpm")}</dd><dt>Spout</dt><dd>Low gooseneck</dd><dt>Installation</dt><dd>Widespread, 3-hole</dd><dt>Handles</dt><dd>Two lever handles</dd></dl>
<div class="cta"><span class="buy">Add to Cart</span><span class="save">Save to List</span></div>
</div></div></div></div>`;

const EXCEL = `<div class="app xl" data-app="xl">
<div class="xtitle"><span class="dots"><i></i><i></i><i></i></span>Finish Schedule - Barbuda Ocean Club.xlsx</div>
<div class="xtabs"><span>File</span><span class="on">Home</span><span>Insert</span><span>Draw</span><span>Page Layout</span><span>Formulas</span><span>Data</span><span>Review</span><span>View</span></div>
<div class="xrib">${Array.from({ length: 9 }, (_, i) => `<i style="width:${[90, 160, 120, 110, 140, 90, 120, 100, 80][i]}px"></i>`).join("")}</div>
<div class="xfx"><span class="xname">D6</span><span class="fxl">fx</span><span class="xval"></span></div>
<div class="xgrid">${gridHtml()}<b class="xact"></b><b class="xants"></b></div>
<div class="xsheets"><span class="on">Primary Bath</span><span>Kitchen</span><span>Powder</span><span>+</span></div>
</div>`;

const INDESIGN = `<div class="app idn" data-app="id">
<div class="idbar"><span class="dots"><i></i><i></i><i></i></span><span class="idf">X: 676 px</span><span class="idf">Y: 266 px</span><span class="idf">W: 158 px</span><span class="idf">Body Copy ▾</span><span class="idf">Minion Pro ▾</span><span class="idf">9 pt ▾</span></div>
<div class="iddoc">Barbuda_PrimaryBath.indd @ 100%</div>
<div class="idtools">${Array.from({ length: 12 }, () => "<i></i>").join("")}</div>
<div class="idpanel"><b>Pages</b><div class="pg">${[1, 2, 3, 4, 5, 6].map((n) => `<i class="${n === 4 ? "on" : ""}">${n}</i>`).join("")}</div><b>Layers</b><div class="ly"><i>Text</i><i>Images</i><i>Guides</i></div><b>Paragraph Styles</b><div class="ly"><i>Item Title</i><i>Item Detail</i><i>Item SKU</i></div></div>
<div class="idpage">
<img class="idimg" src="${IMG}idpage.webp" alt="">
<div class="idph"><img src="${FAUCET}" alt=""></div>
<div class="idcap"></div>
<div class="idframe"><i></i><i></i><i></i><i></i></div>
<div class="idl l0"></div><div class="idl l1"></div><div class="idl l2"></div>
<b class="idcaret"></b>
</div>
</div>`;

const STYLES = `${BASE}
.copy-paste .bk-stage{background:#2b2f36}
.copy-paste .mbar{position:absolute;left:0;top:0;width:1366px;height:26px;display:flex;align-items:center;gap:18px;padding:0 14px;background:rgba(30,32,36,.92);color:#e9eaeb;font-size:12.5px;z-index:5}
.copy-paste .mbar b{font-weight:700}
.copy-paste .mbar .cnt{margin-left:auto;display:flex;gap:14px;color:#c3c5c9}
.copy-paste .mbar .cnt em{font-style:normal;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}
.copy-paste .app{position:absolute;left:0;top:26px;width:1366px;height:742px;opacity:0;overflow:hidden}
.copy-paste .app.on{opacity:1}
.copy-paste .dots{display:flex;gap:7px;margin-right:12px}
.copy-paste .dots i{width:11px;height:11px;border-radius:50%;background:#ff5f57}
.copy-paste .dots i:nth-child(2){background:#febc2e}.copy-paste .dots i:nth-child(3){background:#28c840}
/* browser */
.copy-paste .web{background:#fff;color:#1d1d1f}
.copy-paste .wtabs{height:38px;display:flex;align-items:flex-end;padding:0 12px;background:#dee1e6}
.copy-paste .wtabs .dots{align-self:center}
.copy-paste .wtab{height:30px;display:flex;align-items:center;padding:0 14px;border-radius:8px 8px 0 0;background:#fff;font-size:12px;color:#3c4043;max-width:340px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.copy-paste .wbar{height:40px;display:flex;align-items:center;gap:12px;padding:0 12px;border-bottom:1px solid #e3e3e3}
.copy-paste .wbar .nav{color:#5f6368;font-size:18px;letter-spacing:6px}
.copy-paste .url{flex:1;height:28px;display:flex;align-items:center;padding:0 14px;border-radius:14px;background:#f1f3f4;font-size:12.5px;color:#3c4043}
.copy-paste .wpage{position:absolute;left:0;top:78px;right:0;bottom:0;font-family:"Helvetica Neue",Arial,sans-serif}
.copy-paste .khead{height:46px;display:flex;align-items:center;gap:26px;padding:0 40px;background:#000;color:#ddd;font-size:13px}
.copy-paste .khead b{color:#fff;font-size:20px;letter-spacing:.32em;margin-right:24px}
.copy-paste .crumb{padding:14px 40px;font-size:12px;color:#6b6b6b}
.copy-paste .pdp{display:grid;grid-template-columns:640px 1fr;gap:44px;padding:0 40px}
.copy-paste .pimg{height:540px;background:#f4f4f4;display:grid;place-items:center;overflow:hidden}
.copy-paste .pimg img{width:86%;height:86%;object-fit:contain;mix-blend-mode:multiply}
.copy-paste .pinfo h3{margin:6px 0 10px;font-size:25px;line-height:1.3;font-weight:400;max-width:560px}
.copy-paste .model{font-size:13px;color:#5b5b5b;margin-bottom:12px}
.copy-paste .price{font-size:22px;font-weight:700;margin-bottom:18px}
.copy-paste .color{font-size:14px;margin-bottom:10px}
.copy-paste .sws{display:flex;gap:10px;margin-bottom:22px}
.copy-paste .sws i{width:30px;height:30px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
.copy-paste .sws i.on{box-shadow:0 0 0 2px #fff,0 0 0 3.5px #000}
.copy-paste .specs{display:grid;grid-template-columns:140px 1fr;row-gap:9px;margin:0 0 24px;padding-top:16px;border-top:1px solid #e3e3e3;font-size:14px}
.copy-paste .specs dt{color:#6b6b6b}.copy-paste .specs dd{margin:0}
.copy-paste .cta{display:flex;gap:12px}
.copy-paste .cta span{height:46px;display:flex;align-items:center;padding:0 34px;font-size:14px;font-weight:700;border:1.5px solid #000}
.copy-paste .cta .buy{background:#000;color:#fff}
.copy-paste .ws{position:relative;display:inline}
.copy-paste .ws .hl{position:absolute;left:-1px;top:-1px;bottom:-1px;width:0;background:#b4d5fe;z-index:0}
.copy-paste .ws>span{position:relative;z-index:1}
.copy-paste h3 .ws{display:inline-block}
/* excel */
.copy-paste .xl{background:#fff;color:#1d1d1f;font-family:"Segoe UI",Arial,sans-serif}
.copy-paste .xtitle{height:34px;display:flex;align-items:center;padding:0 12px;background:#217346;color:#fff;font-size:12.5px}
.copy-paste .xtitle .dots{margin-right:auto}
.copy-paste .xtitle{justify-content:center}
.copy-paste .xtitle .dots{position:absolute;left:12px}
.copy-paste .xtabs{height:30px;display:flex;align-items:center;gap:20px;padding:0 16px;background:#217346;color:#d7eadf;font-size:12.5px}
.copy-paste .xtabs .on{color:#fff;font-weight:700;border-bottom:2px solid #fff;padding:6px 0}
.copy-paste .xrib{height:62px;display:flex;align-items:center;gap:10px;padding:0 12px;background:#f3f3f3;border-bottom:1px solid #d6d6d6}
.copy-paste .xrib i{height:42px;border-right:1px solid #d6d6d6;background:linear-gradient(#e2e2e2 0 0) 8px 8px/18px 18px no-repeat,linear-gradient(#e2e2e2 0 0) 32px 8px/18px 18px no-repeat,linear-gradient(#e9e9e9 0 0) 8px 30px/60% 6px no-repeat}
.copy-paste .xfx{height:28px;display:flex;align-items:center;gap:10px;padding:0 8px;border-bottom:1px solid #d6d6d6;font-size:13px}
.copy-paste .xname{width:70px;border-right:1px solid #d6d6d6;color:#333}
.copy-paste .fxl{font-style:italic;color:#777;width:28px;border-right:1px solid #d6d6d6}
.copy-paste .xgrid{position:absolute;left:0;top:154px;right:0;bottom:30px;overflow:hidden;font-size:12.5px}
.copy-paste .xr{display:flex;height:24px}
.copy-paste .xr i{font-style:normal;flex:none;height:24px;line-height:23px;padding:0 6px;border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.copy-paste .xr .xn{width:40px;text-align:center;background:#f3f3f3;color:#666;padding:0}
.copy-paste .xh i{background:#f3f3f3;color:#666;text-align:center}
.copy-paste .xr .b{font-weight:700;background:#e7f1ea}
.copy-paste .xact{position:absolute;border:2px solid #217346;pointer-events:none;opacity:0}
.copy-paste .xants{position:absolute;pointer-events:none;opacity:0;background:repeating-linear-gradient(90deg,#217346 0 5px,transparent 5px 9px) top/100% 2px no-repeat,repeating-linear-gradient(90deg,#217346 0 5px,transparent 5px 9px) bottom/100% 2px no-repeat,repeating-linear-gradient(0deg,#217346 0 5px,transparent 5px 9px) left/2px 100% no-repeat,repeating-linear-gradient(0deg,#217346 0 5px,transparent 5px 9px) right/2px 100% no-repeat}
.copy-paste .xsheets{position:absolute;left:0;right:0;bottom:0;height:30px;display:flex;gap:2px;padding-left:40px;background:#f3f3f3;border-top:1px solid #d6d6d6;font-size:12px}
.copy-paste .xsheets span{display:flex;align-items:center;padding:0 16px;color:#555}
.copy-paste .xsheets .on{background:#fff;color:#217346;font-weight:700;border-bottom:2px solid #217346}
/* indesign */
.copy-paste .idn{background:#535353;color:#ddd;font-family:system-ui,sans-serif}
.copy-paste .idbar{height:36px;display:flex;align-items:center;gap:10px;padding:0 12px;background:#323232;border-bottom:1px solid #222;font-size:11.5px}
.copy-paste .idf{height:22px;display:flex;align-items:center;padding:0 8px;border-radius:3px;background:#262626;color:#cfcfcf}
.copy-paste .iddoc{height:26px;display:flex;align-items:center;padding:0 52px;background:#3a3a3a;font-size:11.5px;color:#ddd}
.copy-paste .idtools{position:absolute;left:0;top:62px;bottom:0;width:36px;display:grid;align-content:start;gap:6px;padding:10px 7px;background:#323232;border-right:1px solid #222}
.copy-paste .idtools i{width:22px;height:22px;border-radius:3px;background:#4a4a4a}
.copy-paste .idtools i:first-child{background:#5a7fbf}
.copy-paste .idpanel{position:absolute;right:0;top:62px;bottom:0;width:220px;padding:10px 12px;background:#323232;border-left:1px solid #222;font-size:11.5px;display:grid;align-content:start;gap:8px}
.copy-paste .idpanel b{color:#eee;font-weight:600;padding-top:6px;border-top:1px solid #444}
.copy-paste .idpanel b:first-child{border:0;padding-top:0}
.copy-paste .pg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.copy-paste .pg i{height:40px;background:#e9e9e9;color:#555;font-style:normal;font-size:10px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:2px}
.copy-paste .pg i.on{box-shadow:0 0 0 2px #5a7fbf}
.copy-paste .ly{display:grid;gap:3px}
.copy-paste .ly i{font-style:normal;height:22px;display:flex;align-items:center;padding:0 8px;background:#2a2a2a;color:#cfcfcf}
.copy-paste .idpage{position:absolute;left:${P.left}px;top:${P.top - 26}px;width:878px;height:575px;box-shadow:0 2px 10px rgba(0,0,0,.4);background:#f8f8f8}
.copy-paste .idimg{position:absolute;inset:0;width:878px;height:575px}
.copy-paste .idph{position:absolute;left:676px;top:87px;width:154px;height:172px;background:#fff;overflow:hidden}
.copy-paste .idph img{width:100%;height:100%;object-fit:contain;padding:10px;mix-blend-mode:multiply}
.copy-paste .idcap{position:absolute;left:672px;top:264px;width:166px;height:50px;background:#f8f8f8}
.copy-paste .idframe{position:absolute;left:675px;top:266px;width:158px;height:44px;border:1px solid #3c8dfa;opacity:0}
.copy-paste .idframe i{position:absolute;width:5px;height:5px;background:#fff;border:1px solid #3c8dfa}
.copy-paste .idframe i:nth-child(1){left:-3px;top:-3px}.copy-paste .idframe i:nth-child(2){right:-3px;top:-3px}.copy-paste .idframe i:nth-child(3){left:-3px;bottom:-3px}.copy-paste .idframe i:nth-child(4){right:-3px;bottom:-3px}
.copy-paste .idl{position:absolute;left:676px;white-space:nowrap;color:#222}
.copy-paste .l0{top:268px;font:400 10.5px/1.2 Georgia,"Times New Roman",serif;letter-spacing:.02em}
.copy-paste .l1{top:284px;font:400 7.5px/1.2 "Helvetica Neue",Arial,sans-serif;color:#555}
.copy-paste .l2{top:296px;font:italic 400 7.5px/1.2 Georgia,serif;color:#b08d57}
.copy-paste .idcaret{position:absolute;width:1px;height:11px;background:#111;opacity:0;animation:cpblink 1s steps(1) infinite}
@keyframes cpblink{50%{visibility:hidden}}
/* switcher, key hints */
.copy-paste .hud{position:absolute;left:50%;top:330px;transform:translateX(-50%);display:flex;gap:18px;padding:18px 22px;border-radius:18px;background:rgba(40,42,46,.82);backdrop-filter:blur(8px);opacity:0;z-index:6}
.copy-paste .hud div{display:grid;justify-items:center;gap:6px;padding:8px;border-radius:12px;color:#ddd;font-size:11.5px}
.copy-paste .hud div.on{background:rgba(255,255,255,.18);color:#fff}
.copy-paste .hud span{width:64px;height:64px;border-radius:15px;display:grid;place-items:center}
.copy-paste .hud .i-web span{background:#3b6fd8}.copy-paste .hud .i-xl span{background:#2f7d55}.copy-paste .hud .i-id span{background:#6b4fa0}
.copy-paste .key{position:absolute;height:26px;display:flex;align-items:center;padding:0 9px;border-radius:6px;background:#1d1d1f;color:#fff;font:600 13px/1 system-ui,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);opacity:0;z-index:7;pointer-events:none}`;

const MARKUP = `<div class="bk-stage" role="img" aria-label="Before Efficiently. A designer copies a faucet's name, model, finish and flow rate one at a time from the manufacturer's web page into a spreadsheet, switching apps for every value, then copies each cell and pastes it line by line into the item's caption on an InDesign page. Counters tally the copies, pastes and app switches.">
<div class="bk-inner">
${BROWSER}${EXCEL}${INDESIGN}
<div class="mbar"><b class="appname">Browser</b><span>File</span><span>Edit</span><span>View</span><span>Window</span><span class="cnt">Copies <em data-n="c">0</em> Pastes <em data-n="p">0</em> App switches <em data-n="s">0</em></span></div>
<div class="hud"><div class="i-web"><span>${GLOBE}</span>Browser</div><div class="i-xl"><span>${SHEET}</span>Excel</div><div class="i-id"><span>${LAYOUT}</span>InDesign</div></div>
<div class="key"></div>
${CURSOR}
</div>
</div>
<div class="bk-bar"><div class="bk-cap">One faucet, the way designers told us they did it: every attribute copied from the manufacturer's site into a spreadsheet, then pasted line by line into the presentation.</div><button type="button" class="bk-replay">Replay</button></div>`;

type App = "web" | "xl" | "id";
const NAMES: Record<App, string> = { web: "Browser", xl: "Excel", id: "InDesign" };

export default function CopyPaste() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => host.querySelector<T>(s)!;
    const qa = <T extends HTMLElement = HTMLElement>(s: string) => [...host.querySelectorAll<T>(s)];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = q(".bk-stage");
    const apps = { web: q('[data-app="web"]'), xl: q('[data-app="xl"]'), id: q('[data-app="id"]') };
    const hud = q(".hud"), hudItems = { web: q(".hud .i-web"), xl: q(".hud .i-xl"), id: q(".hud .i-id") };
    const key = q(".key"), appname = q(".appname");
    const xact = q(".xact"), xants = q(".xants"), xname = q(".xname"), xval = q(".xval"), grid = q(".xgrid");
    const frame = q(".idframe"), caret = q(".idcaret"), lines = qa(".idl");
    const n = { c: q('[data-n="c"]'), p: q('[data-n="p"]'), s: q('[data-n="s"]') };
    const count = { c: 0, p: 0, s: 0 };
    let cur: App = "web";

    const scale = () => stage.clientWidth / 1366;
    const box = (el: HTMLElement): Rect => {
      const s = scale(), a = stage.getBoundingClientRect(), b = el.getBoundingClientRect();
      return { x: (b.left - a.left) / s, y: (b.top - a.top) / s, w: b.width / s, h: b.height / s };
    };
    const cell = (id: string) => q(`[data-cell="${id}"]`);
    const bump = (k: "c" | "p" | "s") => {
      count[k]++;
      n[k].textContent = String(count[k]);
      n[k].animate([{ transform: "scale(1.35)", color: "#7fd3a3" }, { transform: "none" }], { duration: 380, easing: "ease-out" });
    };

    const E = engine(stage, { home: HOME, reduced, rows: () => [], onFrame() {} });
    const S = E.S;
    const wait = E.wait;
    const fwd = { fill: "forwards" as const };

    /* A key-combo hint beside the hand. */
    const keys = async (label: string) => {
      key.textContent = label;
      key.style.transform = `translate(${S.cx + 18}px,${S.cy + 16}px)`;
      key.animate([{ opacity: 0, translate: "0 4px" }, { opacity: 1, translate: "0 0", offset: 0.2 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], { duration: 760 });
      await wait(420);
    };
    const show = (a: App) => {
      (Object.keys(apps) as App[]).forEach((k) => apps[k].classList.toggle("on", k === a));
      appname.textContent = NAMES[a];
      cur = a;
    };
    /* Cmd-Tab over to another app. */
    async function switchTo(a: App, ok: () => boolean) {
      if (a === cur) return;
      (Object.keys(hudItems) as App[]).forEach((k) => hudItems[k].classList.toggle("on", k === cur));
      hud.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120, ...fwd });
      await wait(200); if (!ok()) return;
      (Object.keys(hudItems) as App[]).forEach((k) => hudItems[k].classList.toggle("on", k === a));
      await wait(260); if (!ok()) return;
      hud.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, ...fwd });
      show(a);
      bump("s");
      await wait(160);
    }
    const placeAct = (el: HTMLElement, target: HTMLElement) => {
      const g = grid.getBoundingClientRect(), b = target.getBoundingClientRect(), s = scale();
      Object.assign(el.style, { left: `${(b.left - g.left) / s - 1}px`, top: `${(b.top - g.top) / s - 1}px`, width: `${b.width / s + 1}px`, height: `${b.height / s + 1}px`, opacity: "1" });
    };

    async function copyWeb(k: string, fast: boolean, ok: () => boolean) {
      const span = q(`[data-a="${k}"]`), txt = span.querySelector("span")!, hl = span.querySelector<HTMLElement>(".hl")!;
      const b = box(txt);
      S.mode = "text";
      S.lock = true;
      await E.reach(b.x - 2, b.y + b.h / 2, { arc: 0.1, dur: fast ? 420 : undefined }); if (!ok()) return;
      await E.click(`Select the ${WHAT[k]}`); if (!ok()) return;
      await wait(fast ? 80 : 200); if (!ok()) return;
      const dur = Math.min(900, 200 + b.w * 1.2) * (fast ? 0.6 : 1);
      hl.animate([{ width: "0px" }, { width: `${b.w / 1 + 2}px` }], { duration: dur, easing: "ease-in-out", ...fwd });
      await E.moveTo(b.x + b.w + 1, b.y + b.h / 2, { arc: 0, dur }); if (!ok()) return;
      await keys("⌘C"); if (!ok()) return;
      bump("c");
    }
    async function pasteCell(id: string, text: string, fast: boolean, ok: () => boolean) {
      const c = cell(id), b = box(c);
      S.mode = "arrow";
      await E.reach(b.x + 30, b.y + b.h / 2, { arc: 0.12, dur: fast ? 480 : undefined }); if (!ok()) return;
      await E.click(`Click cell ${id} to paste`); if (!ok()) return;
      placeAct(xact, c);
      xname.textContent = id;
      xval.textContent = c.textContent ?? "";
      await keys("⌘V"); if (!ok()) return;
      c.textContent = text;
      xval.textContent = text;
      bump("p");
      await wait(fast ? 120 : 260);
    }
    async function copyCell(id: string, ok: () => boolean) {
      const c = cell(id), b = box(c);
      S.mode = "arrow";
      await E.reach(b.x + 30, b.y + b.h / 2, { arc: 0.12, dur: 500 }); if (!ok()) return;
      await E.click(`Click cell ${id} to copy it`); if (!ok()) return;
      placeAct(xact, c);
      xname.textContent = id;
      xval.textContent = c.textContent ?? "";
      await keys("⌘C"); if (!ok()) return;
      placeAct(xants, c);
      xants.animate([{ backgroundPosition: "0 0,0 100%,0 0,100% 0" }, { backgroundPosition: "18px 0,-18px 100%,0 -18px,100% 18px" }], { duration: 600, iterations: 3 });
      bump("c");
    }
    async function pasteLine(line: number, text: string, append: boolean, ok: () => boolean) {
      const el = lines[line];
      const p = box(q(".idpage"));
      const x = p.x + 676 + (append ? el.getBoundingClientRect().width / scale() : 0) + 1, y = p.y + [274, 288, 300][line];
      S.mode = "text";
      await E.reach(x, y, { arc: 0.12, dur: 560 }); if (!ok()) return;
      await E.click("Click into the caption to paste"); if (!ok()) return;
      frame.style.opacity = "1";
      Object.assign(caret.style, { left: `${x - p.x}px`, top: `${y - p.y - 6}px`, opacity: "1" });
      await keys("⌘V"); if (!ok()) return;
      el.textContent = append ? el.textContent + text : text;
      el.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 200 });
      caret.style.left = `${676 + el.getBoundingClientRect().width / scale() + 1}px`;
      bump("p");
      await wait(220);
    }

    function reset() {
      S.mode = "arrow";
      S.cx = HOME.x;
      S.cy = HOME.y;
      S.lock = false;
      E.inner.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      show("web");
      ATTRS.forEach((a) => { cell(a.cell).textContent = ""; });
      lines.forEach((l) => (l.textContent = ""));
      [xact, xants, frame, caret].forEach((el) => (el.style.opacity = "0"));
      xname.textContent = "D6";
      xval.textContent = "";
      (["c", "p", "s"] as const).forEach((k) => { count[k] = 0; n[k].textContent = "0"; });
    }

    async function loop(id: number) {
      const ok = () => id === S.run;
      while (ok()) {
        await wait(900); if (!ok()) return;
        /* Web page to spreadsheet, one attribute at a time. */
        for (let i = 0; i < ATTRS.length; i++) {
          const a = ATTRS[i], fast = i > 1;
          await copyWeb(a.k, fast, ok); if (!ok()) return;
          await switchTo("xl", ok); if (!ok()) return;
          await pasteCell(a.cell, a.text, fast, ok); if (!ok()) return;
          if (i < ATTRS.length - 1) {
            await switchTo("web", ok); if (!ok()) return;
            q(`[data-a="${a.k}"] .hl`).getAnimations().forEach((x) => x.cancel());
          }
        }
        await wait(600); if (!ok()) return;
        /* Spreadsheet to the page, one line at a time. */
        for (const l of LINES) {
          await copyCell(l.cell, ok); if (!ok()) return;
          await switchTo("id", ok); if (!ok()) return;
          await pasteLine(l.line, l.text, !!l.append, ok); if (!ok()) return;
          if (l !== LINES[LINES.length - 1]) { await switchTo("xl", ok); if (!ok()) return; }
        }
        frame.style.opacity = "0";
        caret.style.opacity = "0";
        S.mode = "arrow";
        await E.moveTo(1030, 640, { arc: 0.15 }); if (!ok()) return;
        await wait(3200); if (!ok()) return;
        E.lap();
        reset();
      }
    }

    reset();
    if (reduced) {
      show("id");
      LINES.forEach((l) => { lines[l.line].textContent = l.append ? lines[l.line].textContent + l.text : l.text; });
      E.cur.style.display = "none";
    }
    const stop = controller(stage, q(".bk-replay"), E, { reset, loop, reduced });
    return () => {
      stop();
      E.destroy();
    };
  }, []);

  return (
    <div className="bk copy-paste" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
