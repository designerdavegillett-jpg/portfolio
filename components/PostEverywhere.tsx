"use client";

import { useEffect, useRef } from "react";

/**
 * Own the Script's Post Caption screen (Figma eqFCKjSyKAQP5vpD9cB2eb, node
 * 1530:1470) beside a second phone showing where the video lands.
 *
 * Pick platforms, tap Post Video, and each selected platform goes live in turn
 * on the right, drawn as that platform's own feed. At rest a finger adds
 * TikTok, posts, and the right phone walks through each destination; the
 * first touch stops the loop and hands both phones to the viewer.
 *
 * Nothing on the destination screens claims reach: every post is shown the
 * moment it lands, with no likes, views or comments.
 *
 * Same contract as the other figures: injected markup and styles, every class
 * prefixed pe- under .post-everywhere, behaviour in one useEffect.
 * Phone sizes are Figma px through u() (1cqw = 5.2346 design px).
 */

const W = 523.46;
const u = (px: number) => `${((px * 100) / W).toFixed(3)}cqw`;
const VIDEO = "/work/own-the-script/post-video.webp";

type P = "linkedin" | "instagram" | "facebook" | "tiktok" | "youtube";
const ORDER: P[] = ["linkedin", "instagram", "facebook", "tiktok", "youtube"];
/* LinkedIn and Facebook lead the wall; the vertical-video platforms follow. */
const WALL: P[] = ["linkedin", "facebook", "instagram", "tiktok", "youtube"];
const NAME: Record<P, string> = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "Youtube" };
const SHOWN: Record<P, string> = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube" };

/* Exported from the Figma file as SVG, verbatim apart from sizing. */
const LOGO: Record<P, string> = {
  linkedin: `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#0052CC"/><path d="M18.9458 10.9537C18.0451 10.053 16.8236 9.54706 15.5499 9.54706C14.2761 9.54706 13.0546 10.053 12.1539 10.9537C11.2532 11.8543 10.7472 13.0758 10.7472 14.3495V19.9523H13.949V14.3495C13.949 13.9249 14.1176 13.5178 14.4179 13.2175C14.7181 12.9173 15.1253 12.7487 15.5499 12.7487C15.9744 12.7487 16.3816 12.9173 16.6818 13.2175C16.9821 13.5178 17.1507 13.9249 17.1507 14.3495V19.9523H20.3525V14.3495C20.3525 13.0758 19.8465 11.8543 18.9458 10.9537Z" fill="white"/><path d="M7.54549 10.3475H4.34375V19.9523H7.54549V10.3475Z" fill="white"/><path d="M5.94462 7.94625C6.82876 7.94625 7.54549 7.22954 7.54549 6.34544C7.54549 5.46134 6.82876 4.74463 5.94462 4.74463C5.06048 4.74463 4.34375 5.46134 4.34375 6.34544C4.34375 7.22954 5.06048 7.94625 5.94462 7.94625Z" fill="white"/></svg>`,
  instagram: `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#E70380"/><path d="M16.0175 8.8629H16.0242M9.01315 6.01123H15.684C17.5261 6.01123 19.0194 7.42983 19.0194 9.17976V15.5168C19.0194 17.2667 17.5261 18.6853 15.684 18.6853H9.01315C7.17105 18.6853 5.67773 17.2667 5.67773 15.5168V9.17976C5.67773 7.42983 7.17105 6.01123 9.01315 6.01123ZM15.0167 11.9492C15.099 12.4766 15.0042 13.0153 14.7457 13.4885C14.4872 13.9618 14.0782 14.3455 13.5769 14.5852C13.0756 14.8249 12.5074 14.9084 11.9533 14.8237C11.3992 14.739 10.8873 14.4904 10.4904 14.1134C10.0936 13.7364 9.83195 13.2502 9.74279 12.7238C9.65362 12.1974 9.74145 11.6577 9.99378 11.1814C10.2461 10.7052 10.6501 10.3166 11.1483 10.0711C11.6465 9.82553 12.2135 9.73544 12.7686 9.81365C13.3349 9.89342 13.8592 10.1441 14.264 10.5287C14.6688 10.9132 14.9327 11.4113 15.0167 11.9492Z" stroke="white" stroke-width="1.37207" stroke-linecap="round"/></svg>`,
  facebook: `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#0052CC"/><path d="M14.3495 6.01123H16.3505V8.54605H14.3495C14.1726 8.54605 14.003 8.61282 13.8779 8.73166C13.7528 8.8505 13.6825 9.01169 13.6825 9.17976V11.0809H16.3505L15.6835 13.6157H13.6825V18.6853H11.0146V13.6157H9.01367V11.0809H11.0146V9.17976C11.0146 8.33941 11.366 7.53348 11.9914 6.93927C12.6168 6.34506 13.465 6.01123 14.3495 6.01123Z" fill="white"/></svg>`,
  tiktok: `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#626262"/><path d="M18.5273 8.28255C17.7294 8.1071 17.0077 7.68342 16.4656 7.0723C15.9235 6.46118 15.5889 5.69405 15.5098 4.88097V4.52881H12.7486V15.4699C12.6728 16.0264 12.3971 16.5364 11.9729 16.9045C11.5488 17.2727 11.0052 17.474 10.4435 17.4708C9.83003 17.4708 9.24169 17.2271 8.80791 16.7933C8.37412 16.3595 8.13042 15.7712 8.13042 15.1577C8.13042 14.5443 8.37412 13.9559 8.80791 13.5222C9.24169 13.0884 9.83003 12.8447 10.4435 12.8447C10.6676 12.8447 10.8757 12.8767 11.0758 12.9247V10.1074C10.8661 10.081 10.6549 10.0676 10.4435 10.0674C9.10597 10.0673 7.82252 10.5953 6.87226 11.5366C5.922 12.4779 5.3818 13.7563 5.36914 15.0937C5.36914 16.4395 5.90376 17.7302 6.85539 18.6818C7.80701 19.6335 9.09769 20.1681 10.4435 20.1681C11.7893 20.1681 13.08 19.6335 14.0316 18.6818C14.9832 17.7302 15.5179 16.4395 15.5179 15.0937V9.91531C16.63 10.7078 17.962 11.1331 19.3276 11.1319V8.3786C19.0582 8.37462 18.79 8.34243 18.5273 8.28255Z" fill="white"/></svg>`,
  youtube: `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#EC696D"/><path d="M15.5499 13.1492L19.7305 15.9361C19.7908 15.9762 19.8608 15.9992 19.9331 16.0027C20.0054 16.0061 20.0773 15.9899 20.1411 15.9557C20.205 15.9216 20.2583 15.8707 20.2955 15.8086C20.3328 15.7465 20.3524 15.6755 20.3525 15.6031V9.04329C20.3525 8.97288 20.3339 8.90371 20.2987 8.84276C20.2634 8.78181 20.2127 8.73125 20.1516 8.69617C20.0905 8.6611 20.0213 8.64275 19.9509 8.64299C19.8805 8.64323 19.8114 8.66204 19.7505 8.69753L15.5499 11.1483M5.94462 7.54639H13.949C14.8331 7.54639 15.5499 8.26306 15.5499 9.14713V15.5501C15.5499 16.4342 14.8331 17.1508 13.949 17.1508H5.94462C5.06048 17.1508 4.34375 16.4342 4.34375 15.5501V9.14713C4.34375 8.26306 5.06048 7.54639 5.94462 7.54639Z" stroke="white" stroke-width="2.74413" stroke-linecap="round"/></svg>`,
};
const CHECK = `<svg viewBox="0 0 14 14" fill="none"><path d="M11.4333 3.43018L5.14529 9.71835L2.28711 6.86009" stroke="currentColor" stroke-width="2.74413" stroke-linecap="round"/></svg>`;
const PLUS = `<svg viewBox="0 0 14 14" fill="none"><path d="M2.85742 6.86023H10.8621M6.85974 2.85791V10.8625" stroke="currentColor" stroke-width="2.74413" stroke-linecap="round"/></svg>`;
const PENCIL = `<svg viewBox="0 0 17 17" fill="none"><path d="M10.2923 3.42965L13.0366 6.17373M14.5282 4.67298C14.8909 4.31036 15.0947 3.81852 15.0948 3.30564C15.0949 2.79276 14.8912 2.30086 14.5285 1.93815C14.1659 1.57545 13.674 1.37165 13.161 1.37158C12.6481 1.37152 12.1561 1.5752 11.7934 1.93781L2.63679 11.0955C2.47749 11.2543 2.35968 11.4499 2.29374 11.6649L1.38741 14.6505C1.36968 14.7098 1.36834 14.7728 1.38353 14.8328C1.39873 14.8929 1.42989 14.9477 1.47372 14.9914C1.51754 15.0352 1.57239 15.0662 1.63245 15.0813C1.69251 15.0964 1.75554 15.095 1.81485 15.0772L4.80141 14.1716C5.01628 14.1063 5.21182 13.9892 5.37087 13.8307L14.5282 4.67298Z" stroke="#1E2B6B" stroke-width="2.2" stroke-linecap="round"/></svg>`;

/* Generic line icons for the destination chrome. */
const PATH: Record<string, string> = {
  heart: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  chat: `<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>`,
  send: `<path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/>`,
  more: `<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>`,
  moreV: `<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>`,
  bookmark: `<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>`,
  share: `<path d="M15 17l5-5-5-5M4 18v-2a4 4 0 0 1 4-4h12"/>`,
  up: `<path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>`,
  down: `<path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>`,
  repeat: `<path d="m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/>`,
  camera: `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3.5"/>`,
  search: `<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/>`,
  home: `<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
  add: `<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>`,
  reels: `<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8.5h18M8.5 3l2.5 5.5M14 3l2.5 5.5"/><path d="m10 12 5 3-5 3z"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
  users: `<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4.13a4 4 0 0 1 0 7.75M22 21a7 7 0 0 0-4-6.3"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  case: `<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  inbox: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  msg: `<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="m8 13 3-3 2 2 3-3"/>`,
  video: `<rect x="2" y="5" width="15" height="14" rx="3"/><path d="m17 10 5-3v10l-5-3"/>`,
  menu: `<path d="M4 6h16M4 12h16M4 18h16"/>`,
  subs: `<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M6 3h12M10 10l5 3-5 3z"/>`,
  shorts: `<path d="M14.5 3.5 7 8a3.2 3.2 0 0 0 .7 5.8l1.3.5-1.3.8A3.2 3.2 0 0 0 9.5 20.5L17 16a3.2 3.2 0 0 0-.7-5.8l-1.3-.5 1.3-.8a3.2 3.2 0 0 0-1.8-5.4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>`,
  music: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
  play: `<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>`,
};
const ic = (n: string, c = "") => `<svg class="pe-i ${c}" viewBox="0 0 24 24">${PATH[n]}</svg>`;

const SB = (dark: boolean) => `<div class="pe-sb${dark ? " dk" : ""}"><span data-clock>4:01</span><span class="pe-isl"></span>
  <svg viewBox="0 0 66 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9" y="3" width="3" height="9" rx=".8"/><rect x="13.5" y="0.5" width="3" height="11.5" rx=".8"/><path d="M23 4.6a9 9 0 0 1 12.4 0M25.6 7.4a5.3 5.3 0 0 1 7.2 0" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="29.2" cy="10.4" r="1.4"/><rect x="42" y="1" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".4"/><rect x="43.5" y="2.5" width="17" height="7" rx="1.8" fill="#34c759"/><rect x="63" y="4" width="1.6" height="4" rx=".8" opacity=".4"/></svg></div>`;

const BURN = `<div class="pe-burn"><span>What <em>happens</em></span><span>to your</span><span>earnest</span><span>money?</span></div>`;
const HOOK = "Stop paying your bank's vacation fund. 🏦✈️";
const POST = [
  HOOK,
  "",
  "A 30-year mortgage? You're paying for your house TWICE in interest.",
  "",
  "Refinance to a shorter term and watch what happens:",
  "",
  "→ More of every payment attacks YOUR balance",
  "→ Less money vanishes into interest",
  "→ You own your home YEARS sooner",
  "",
  "\"But my payment goes up—\"",
  "",
  "Yes. And you stop lighting money on fire. 🔥",
];
const AV = `<span class="pe-av">DG</span>`;

const STYLES = `.post-everywhere{margin-block:0 var(--s6,3rem);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.post-everywhere *{box-sizing:border-box}
.post-everywhere .pe-grid{display:grid;grid-template-columns:auto auto;justify-content:center;align-items:start;gap:28px clamp(24px,5vw,56px)}
.post-everywhere .pe-col{display:flex;flex-direction:column;align-items:center;gap:14px;min-width:0}
.post-everywhere .pe-hint{margin:18px auto 0;font-size:.7rem;line-height:1.5;color:var(--muted,#86868b);text-align:center;max-width:none}
.post-everywhere .pe-phone{position:relative;width:min(262px,40vw);container-type:inline-size;aspect-ratio:523.46/1099;-webkit-text-size-adjust:none;text-size-adjust:none;
  --k:calc(100cqw / 523.46);
  --serif:var(--font-ots-serif),"Merriweather",Georgia,serif; --ots:var(--font-ots-sans),"Merriweather Sans",system-ui,sans-serif;
  --cap:var(--font-ots-cap),"Montserrat",system-ui,sans-serif; --sys:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif}
.post-everywhere .pe-frm{height:100%;background:#fff;border-radius:${u(48)};padding:${u(12.33)};box-shadow:0 ${u(14)} ${u(40)} rgba(3,6,20,.12),0 0 0 ${u(1)} rgba(3,6,20,.06)}
.post-everywhere .pe-scr{position:relative;height:100%;background:#f3f5f9;border-radius:${u(36)};overflow:hidden;overflow:clip;color:#101322;font-family:var(--ots)}
.post-everywhere .pe-sb{position:absolute;z-index:5;left:0;right:0;top:0;height:${u(55)};display:flex;align-items:center;justify-content:space-between;padding:${u(6)} ${u(46)} 0 ${u(58)};font:700 ${u(19)}/1 var(--sys);font-variant-numeric:tabular-nums;color:#000}
.post-everywhere .pe-sb.dk{color:#fff}
.post-everywhere .pe-sb.lt{background:#f3f5f9}
.post-everywhere .pe-sb .pe-isl{position:absolute;left:${u(174.57)};top:${u(13.91)};width:${u(145.47)};height:${u(37.95)};background:#000;border-radius:${u(30)}}
.post-everywhere .pe-sb svg{height:${u(15)};width:auto;display:block}
.post-everywhere .pe-i{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;display:block;flex:none}

/* ---------- left: Post Caption ---------- */
.post-everywhere .pe-main{position:absolute;top:${u(55)};left:0;right:0;bottom:0;overflow:hidden;overflow:clip;padding-bottom:${u(140)}}
.post-everywhere .pe-hd{padding:${u(15)} ${u(29.41)};display:flex;flex-direction:column;gap:${u(30)}}
.post-everywhere .pe-nv{display:flex;justify-content:space-between;align-items:center}
.post-everywhere .pe-bk{width:${u(50.3)};height:${u(50.3)};border-radius:50%;background:#fff;display:grid;place-items:center;font-size:${u(25)};color:#101322}
.post-everywhere .pe-cn{height:${u(50.32)};padding:0 ${u(32)};border-radius:${u(16.46)};background:#fff;display:flex;align-items:center;font:700 ${u(17.156)}/1 var(--ots);color:#4b5563}
.post-everywhere .pe-tt{display:flex;flex-direction:column;gap:${u(5.03)}}
.post-everywhere .pe-ey{margin:0;font:700 ${u(17.607)}/1.25 var(--ots);letter-spacing:${u(1.2576)};text-transform:uppercase;color:#9ca3af;max-width:none}
.post-everywhere .pe-h{margin:0;font:700 ${u(40)}/${u(55.336)} var(--serif);color:#111827;letter-spacing:0;text-transform:none;max-width:none}
.post-everywhere .pe-bd{padding:0 ${u(32.93)};display:flex;flex-direction:column;gap:${u(32)}}
.post-everywhere .pe-grp{display:flex;flex-direction:column;gap:${u(15.09)}}
.post-everywhere .pe-lb{margin:0;font:700 ${u(15.09)}/1.25 var(--ots);color:#6a707b;text-transform:uppercase;letter-spacing:0;max-width:none}
.post-everywhere .pe-row{display:flex;justify-content:space-between;align-items:center}
.post-everywhere .pe-edit{display:flex;align-items:center;gap:${u(5.49)};font:700 ${u(15.09)}/1 var(--ots);color:#1e2b6b}
.post-everywhere .pe-edit svg{width:${u(16.46)};height:${u(16.46)}}
.post-everywhere .pe-tags{display:flex;flex-wrap:wrap;gap:${u(16.46)}}
.post-everywhere .pe-chip{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:${u(16.46)};height:${u(54.88)};padding:0 ${u(16.46)};border-radius:999px;background:#fff;border:${u(1.372)} solid #d9dbde;color:#4b5563;font:700 ${u(17.837)}/1 var(--ots);cursor:pointer;transition:background .18s,border-color .18s,color .18s,transform .12s}
.post-everywhere .pe-chip:active,.post-everywhere .pe-chip.press{transform:scale(.96)}
.post-everywhere .pe-chip:focus-visible,.post-everywhere .pe-post:focus-visible,.post-everywhere .pe-tab:focus-visible{outline:2px solid #007bff;outline-offset:2px}
.post-everywhere .pe-chip .pe-logo{width:${u(24.7)};height:${u(24.7)}}
.post-everywhere .pe-chip .pe-logo svg{width:100%;height:100%;display:block}
.post-everywhere .pe-chip .pe-st{position:relative;width:${u(13.72)};height:${u(13.72)}}
.post-everywhere .pe-chip .pe-st>*{position:absolute;inset:0;width:100%;height:100%;transition:opacity .15s}
.post-everywhere .pe-chip .pe-ck,.post-everywhere .pe-chip .pe-spin{opacity:0}
.post-everywhere .pe-chip.on{background:#d2e6ff;border-color:#0052cc;color:#0052cc}
.post-everywhere .pe-chip.on .pe-ck{opacity:1}
.post-everywhere .pe-chip.on .pe-pl{opacity:0}
.post-everywhere .pe-chip.busy .pe-ck{opacity:0}
.post-everywhere .pe-chip.busy .pe-spin{opacity:1}
.post-everywhere .pe-spin{border-radius:50%;border:${u(2.4)} solid rgba(0,82,204,.25);border-top-color:#0052cc;animation:pe-rot .7s linear infinite}
@keyframes pe-rot{to{transform:rotate(360deg)}}
.post-everywhere .pe-chip.done{background:#e3f4ea;border-color:#0f7643;color:#0f7643}
.post-everywhere .pe-card{background:#fff;border:${u(1.372)} solid #d9dbde;border-bottom:0;border-radius:${u(16.46)} ${u(16.46)} 0 0;padding:${u(21.95)};display:flex;flex-direction:column;gap:${u(21.95)}}
.post-everywhere .pe-ok{display:flex;justify-content:space-between;align-items:center;padding:${u(10.98)} 0 ${u(16.46)};border-bottom:${u(1.372)} solid #e5e7eb;font:700 ${u(17.837)}/1.25 var(--ots);color:#0f7643}
.post-everywhere .pe-ok span{display:flex;align-items:center;gap:${u(8.23)}}
.post-everywhere .pe-ok i{width:${u(21.95)};height:${u(24.7)};border-radius:${u(12.35)};background:#0f7643;display:grid;place-items:center;color:#fff}
.post-everywhere .pe-ok i svg{width:${u(10.98)};height:${u(10.98)}}
.post-everywhere .pe-ok small{font:400 ${u(17.837)}/1 var(--ots);color:#9ca3af}
.post-everywhere .pe-txt p{margin:0;min-height:1.25em;font:400 ${u(20.58)}/1.25 var(--ots);color:#101322;max-width:none}
.post-everywhere .pe-bot{position:absolute;z-index:4;left:${u(1.2)};right:${u(1.2)};bottom:0;height:${u(111.72)};background:#fcfcfc;border-radius:0 0 ${u(36)} ${u(36)};box-shadow:0 ${u(-1)} ${u(1)} rgba(0,0,0,.04);padding:${u(24)} ${u(30)};display:flex;align-items:center}
.post-everywhere .pe-post{all:unset;box-sizing:border-box;position:relative;overflow:hidden;flex:1;height:${u(63.72)};border-radius:${u(14.705)};background:#1e2b6b;display:grid;place-items:center;font:700 ${u(19.607)}/1 var(--ots);color:#fff;cursor:pointer;transition:background .25s,transform .12s}
.post-everywhere .pe-post:active,.post-everywhere .pe-post.press{transform:scale(.98)}
.post-everywhere .pe-post[disabled]{opacity:.45;cursor:default}
.post-everywhere .pe-post .pe-bar{position:absolute;left:0;top:0;bottom:0;width:0;background:rgba(255,255,255,.16);transition:width .5s ease}
.post-everywhere .pe-post span{position:relative}
.post-everywhere .pe-post.done{background:#0f7643}
.post-everywhere .pe-fing{position:absolute;z-index:9;left:0;top:0;width:${u(46)};height:${u(46)};margin:${u(-23)} 0 0 ${u(-23)};border-radius:50%;background:rgba(255,255,255,.45);border:${u(2)} solid rgba(255,255,255,.95);box-shadow:0 ${u(2)} ${u(10)} rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:left .55s cubic-bezier(.4,0,.2,1),top .55s cubic-bezier(.4,0,.2,1),opacity .25s,transform .12s}
.post-everywhere .pe-fing.on{opacity:1}
.post-everywhere .pe-fing.dn{transform:scale(.82)}

/* ---------- right: destinations ---------- */
.post-everywhere .pe-dest{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .35s,visibility 0s .35s;font-family:var(--sys)}
.post-everywhere .pe-dest.on{opacity:1;visibility:visible;transition:opacity .35s}
.post-everywhere .pe-vid{position:absolute;inset:0;overflow:hidden;background:#111}
.post-everywhere .pe-ph{position:absolute;inset:0;background:#222 url(${VIDEO}) center/cover no-repeat;transform-origin:50% 40%}
.post-everywhere .pe-dest.on .pe-ph{animation:pe-kb 14s ease-in-out infinite alternate}
@keyframes pe-kb{from{transform:scale(1)}to{transform:scale(1.07)}}
.post-everywhere .pe-burn{position:absolute;left:0;right:0;top:57%;display:flex;flex-direction:column;align-items:center;font:800 ${u(29)}/1.22 var(--cap);color:#fff;text-transform:uppercase;text-align:center;text-shadow:0 0 ${u(2)} rgba(0,0,0,.85),0 ${u(1)} ${u(4)} rgba(0,0,0,.5);white-space:nowrap}
.post-everywhere .pe-burn em{font-style:normal;color:#ffc468}
.post-everywhere .pe-shade{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,0) 16%,rgba(0,0,0,0) 58%,rgba(0,0,0,.6) 88%)}
.post-everywhere .pe-top{position:absolute;left:${u(26)};right:${u(26)};top:${u(66)};display:flex;align-items:center;justify-content:space-between;color:#fff;font:700 ${u(28)}/1 var(--sys)}
.post-everywhere .pe-top .pe-i{font-size:${u(30)}}
.post-everywhere .pe-top .pe-ic{display:flex;gap:${u(22)}}
.post-everywhere .pe-rail{position:absolute;right:${u(16)};bottom:${u(206)};display:flex;flex-direction:column;align-items:center;gap:${u(26)};color:#fff}
.post-everywhere .pe-rail .pe-i{font-size:${u(38)}}
.post-everywhere .pe-rail b{display:flex;flex-direction:column;align-items:center;gap:${u(6)};font:600 ${u(13.5)}/1 var(--sys)}
.post-everywhere .pe-meta{position:absolute;left:${u(22)};right:${u(96)};bottom:${u(124)};color:#fff;display:flex;flex-direction:column;gap:${u(10)};font:400 ${u(17)}/1.3 var(--sys)}
.post-everywhere .pe-who{display:flex;align-items:center;gap:${u(12)};font:700 ${u(18)}/1 var(--sys)}
.post-everywhere .pe-av{flex:none;width:${u(38)};height:${u(38)};border-radius:50%;background:linear-gradient(135deg,#8793a8,#4a5468);display:grid;place-items:center;color:#fff;font:700 ${u(14)}/1 var(--sys);letter-spacing:.02em}
.post-everywhere .pe-pill{border:${u(1.5)} solid rgba(255,255,255,.75);border-radius:${u(9)};padding:${u(6)} ${u(12)};font:600 ${u(15)}/1 var(--sys)}
.post-everywhere .pe-cap{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.post-everywhere .pe-cap i{font-style:normal;opacity:.75}
.post-everywhere .pe-aud{display:flex;align-items:center;gap:${u(8)};font-size:${u(15)}}
.post-everywhere .pe-aud .pe-i{font-size:${u(16)}}
.post-everywhere .pe-prog{position:absolute;left:0;right:0;bottom:${u(100)};height:${u(3)};background:rgba(255,255,255,.25)}
.post-everywhere .pe-prog::after{content:"";position:absolute;left:0;top:0;bottom:0;width:0;background:#fff}
.post-everywhere .pe-dest.on .pe-prog::after{animation:pe-pg 9s linear infinite}
@keyframes pe-pg{to{width:100%}}
.post-everywhere .pe-nav{position:absolute;left:0;right:0;bottom:0;height:${u(100)};background:#000;display:flex;justify-content:space-around;align-items:flex-start;padding-top:${u(16)};color:#fff}
.post-everywhere .pe-nav .pe-i{font-size:${u(30)}}
.post-everywhere .pe-nav b{display:flex;flex-direction:column;align-items:center;gap:${u(5)};font:500 ${u(11.5)}/1 var(--sys);opacity:.8}
.post-everywhere .pe-nav b.on{opacity:1}
.post-everywhere .pe-nav.lt{background:#fff;color:#5e5e5e;border-top:${u(1)} solid #e3e3e3}
.post-everywhere .pe-nav.lt b.on{color:#191919}
/* TikTok */
.post-everywhere .pe-tk .pe-top{justify-content:center;gap:${u(26)};font-size:${u(20)}}
.post-everywhere .pe-tk .pe-top span{opacity:.7}
.post-everywhere .pe-tk .pe-top span.on{opacity:1;position:relative}
.post-everywhere .pe-tk .pe-top span.on::after{content:"";position:absolute;left:25%;right:25%;bottom:${u(-9)};height:${u(3)};background:#fff;border-radius:2px}
.post-everywhere .pe-tk .pe-top .pe-i{position:absolute;right:0}
.post-everywhere .pe-tk .pe-rail .pe-av{width:${u(52)};height:${u(52)};border:${u(2)} solid #fff;position:relative;overflow:visible;font-size:${u(17)}}
.post-everywhere .pe-tk .pe-rail .pe-av::after{content:"+";position:absolute;left:50%;bottom:${u(-10)};transform:translateX(-50%);width:${u(20)};height:${u(20)};border-radius:50%;background:#fe2c55;color:#fff;font:700 ${u(16)}/${u(20)} var(--sys);text-align:center}
.post-everywhere .pe-tk .pe-rail .pe-i.fill{fill:#fff;stroke:none}
.post-everywhere .pe-tkplus{width:${u(44)};height:${u(30)};border-radius:${u(9)};background:#fff;color:#000;display:grid;place-items:center;font:700 ${u(24)}/1 var(--sys);box-shadow:${u(-3)} 0 0 #25f4ee,${u(3)} 0 0 #fe2c55}
/* YouTube Shorts */
.post-everywhere .pe-yt .pe-sub{background:#fff;color:#0f0f0f;border-radius:999px;padding:${u(7)} ${u(14)};font:600 ${u(14)}/1 var(--sys)}
.post-everywhere .pe-yt .pe-nav{background:#0f0f0f}
/* Feed platforms */
.post-everywhere .pe-feed{position:absolute;inset:0;overflow:hidden;color:#191919}
.post-everywhere .pe-li{background:#f4f2ee}
.post-everywhere .pe-fb{background:#f0f2f5;color:#050505}
.post-everywhere .pe-bar2{position:absolute;left:0;right:0;top:${u(55)};height:${u(66)};background:#fff;display:flex;align-items:center;gap:${u(14)};padding:0 ${u(20)};border-bottom:${u(1)} solid #e3e3e3}
.post-everywhere .pe-bar2 .pe-av{width:${u(34)};height:${u(34)};font-size:${u(12)}}
.post-everywhere .pe-srch{flex:1;height:${u(38)};border-radius:${u(6)};background:#edf3f8;display:flex;align-items:center;gap:${u(8)};padding:0 ${u(12)};color:#666;font:400 ${u(15)}/1 var(--sys)}
.post-everywhere .pe-srch .pe-i,.post-everywhere .pe-bar2>.pe-i{font-size:${u(22)};color:#666}
.post-everywhere .pe-fbtabs{position:absolute;left:0;right:0;top:${u(55)};height:${u(62)};background:#fff;display:flex;justify-content:space-around;align-items:center;color:#65676b;border-bottom:${u(1)} solid #dadde1}
.post-everywhere .pe-fbtabs .pe-i{font-size:${u(27)}}
.post-everywhere .pe-fbtabs span{height:100%;display:grid;place-items:center;flex:1}
.post-everywhere .pe-fbtabs span.on{color:#0866ff;box-shadow:inset 0 ${u(-3)} 0 #0866ff}
.post-everywhere .pe-post2{position:absolute;left:0;right:0;top:${u(131)};background:#fff;padding-top:${u(16)}}
.post-everywhere .pe-ph2{display:flex;align-items:center;gap:${u(12)};padding:0 ${u(18)}}
.post-everywhere .pe-ph2 .pe-av{width:${u(48)};height:${u(48)};font-size:${u(16)}}
.post-everywhere .pe-ph2 div{flex:1;display:flex;flex-direction:column;gap:${u(4)}}
.post-everywhere .pe-ph2 b{font:700 ${u(17)}/1.2 var(--sys)}
.post-everywhere .pe-ph2 small{display:flex;align-items:center;gap:${u(4)};font:400 ${u(13.5)}/1.2 var(--sys);color:#666}
.post-everywhere .pe-ph2 small .pe-i{font-size:${u(13)}}
.post-everywhere .pe-ph2>.pe-i{font-size:${u(24)};color:#666}
.post-everywhere .pe-body{margin:${u(12)} ${u(18)} ${u(12)};font:400 ${u(16)}/1.4 var(--sys);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;max-width:none}
.post-everywhere .pe-body i{font-style:normal;color:#666}
.post-everywhere .pe-media{position:relative;aspect-ratio:4/5;overflow:hidden;background:#111}
.post-everywhere .pe-media .pe-burn{font-size:${u(26)}}
.post-everywhere .pe-playb{position:absolute;left:50%;top:50%;width:${u(64)};height:${u(64)};margin:${u(-32)} 0 0 ${u(-32)};border-radius:50%;background:rgba(0,0,0,.45);display:grid;place-items:center;color:#fff}
.post-everywhere .pe-playb .pe-i{font-size:${u(30)}}
.post-everywhere .pe-first{padding:${u(10)} ${u(18)};font:400 ${u(13.5)}/1 var(--sys);color:#666;border-bottom:${u(1)} solid #e8e8e8}
.post-everywhere .pe-acts{display:flex;justify-content:space-around;padding:${u(10)} ${u(8)} ${u(14)};color:#5e5e5e}
.post-everywhere .pe-acts b{display:flex;flex-direction:column;align-items:center;gap:${u(5)};font:600 ${u(12.5)}/1 var(--sys)}
.post-everywhere .pe-acts .pe-i{font-size:${u(22)}}
.post-everywhere .pe-mind{background:#f0f2f5;border-radius:999px;color:#65676b}
.post-everywhere .pe-fbnav b.on{color:#0866ff}
.post-everywhere .pe-fb .pe-acts{flex-direction:row;color:#65676b;border-top:${u(1)} solid #ced0d4;margin:0 ${u(14)};padding:${u(12)} 0}
.post-everywhere .pe-fb .pe-acts b{flex-direction:row;gap:${u(8)};font-size:${u(15)}}
/* waiting / posting veil */
.post-everywhere .pe-veil{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${u(16)};background:rgba(16,19,34,.55);backdrop-filter:blur(${u(10)});-webkit-backdrop-filter:blur(${u(10)});color:#fff;font:700 ${u(20)}/1.3 var(--ots);text-align:center;transition:opacity .4s}
.post-everywhere .pe-veil .pe-logo{width:${u(64)};height:${u(64)}}
.post-everywhere .pe-veil .pe-logo svg{width:100%;height:100%;display:block}
.post-everywhere .pe-veil small{font:400 ${u(15)}/1.3 var(--ots);opacity:.8}
.post-everywhere .pe-veil .pe-spin{width:${u(28)};height:${u(28)};border-color:rgba(255,255,255,.3);border-top-color:#fff;border-width:${u(3)};display:none}
.post-everywhere .pe-dest.busy .pe-veil .pe-spin{display:block}
.post-everywhere .pe-dest.live .pe-veil{opacity:0;pointer-events:none}
.post-everywhere .pe-toast{position:absolute;z-index:6;left:50%;top:${u(128)};transform:translate(-50%,${u(-30)});opacity:0;display:flex;align-items:center;gap:${u(8)};background:#fff;color:#0f7643;border-radius:999px;padding:${u(10)} ${u(18)};font:700 ${u(15)}/1 var(--ots);white-space:nowrap;box-shadow:0 ${u(6)} ${u(20)} rgba(0,0,0,.25);transition:transform .4s cubic-bezier(.3,1.4,.5,1),opacity .3s}
.post-everywhere .pe-toast svg{width:${u(14)};height:${u(14)}}
.post-everywhere .pe-dest.pop .pe-toast{transform:translate(-50%,0);opacity:1}
/* the wall of destinations */
.post-everywhere .pe-quad{--mw:120px;--gap:12px;display:grid;grid-template-columns:repeat(2,var(--mw));gap:var(--gap);align-content:start}
.post-everywhere .pe-cell{display:none;flex-direction:column;gap:6px;width:var(--mw)}
.post-everywhere .pe-cell.show{display:flex;animation:pe-in .35s ease}
.post-everywhere .pe-mini{width:var(--mw)}
.post-everywhere .pe-lab{height:22px;display:flex;align-items:center;gap:6px;font:600 .68rem/1 var(--font-body,system-ui),system-ui,sans-serif;color:var(--ink,#1d1d1f);white-space:nowrap}
.post-everywhere .pe-lg{width:18px;height:18px;flex:none}
.post-everywhere .pe-lg svg{width:100%;height:100%;display:block}
.post-everywhere .pe-lab em{margin-left:auto;font-style:normal;font-weight:500;color:var(--muted,#86868b);display:flex;align-items:center;gap:4px}
.post-everywhere .pe-cell.live .pe-lab em{color:#0f7643}
.post-everywhere .pe-cell.live .pe-lab em::before{content:"";width:6px;height:6px;border-radius:50%;background:#34c759}
@keyframes pe-in{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}
.post-everywhere .pe-mini .pe-frm{box-shadow:0 ${u(10)} ${u(28)} rgba(3,6,20,.12),0 0 0 ${u(1)} rgba(3,6,20,.06)}
.post-everywhere .pe-slot{width:var(--mw);height:calc(var(--mw) * 1099 / 523.46);border:1.5px dashed rgba(29,29,31,.2);border-radius:calc(var(--mw) * .0917);display:none;place-items:center;text-align:center;padding:10px;font:600 .68rem/1.3 var(--sys,system-ui);color:var(--muted,#86868b)}
.post-everywhere .pe-slot.show{display:grid}
@media (max-width:640px){
.post-everywhere .pe-grid{grid-template-columns:1fr}
.post-everywhere .pe-phone{width:min(280px,78vw)}
}
@media (prefers-reduced-motion:reduce){.post-everywhere *{animation:none!important;transition:none!important}.post-everywhere .pe-fing{display:none}}
`;

const chip = (p: P) => `<button type="button" class="pe-chip" data-chip="${p}" aria-pressed="false"><span class="pe-logo">${LOGO[p]}</span>${NAME[p]}<span class="pe-st"><span class="pe-pl">${PLUS}</span><span class="pe-ck">${CHECK}</span><span class="pe-spin"></span></span></button>`;

const veil = (p: P) => `<div class="pe-veil"><span class="pe-logo">${LOGO[p]}</span><span data-veil>Not posted yet</span><span class="pe-spin"></span><small>Select ${SHOWN[p]} and tap Post Video</small></div>
  <div class="pe-toast">${CHECK}Live on ${SHOWN[p]}</div>`;

const DEST: Record<P, string> = {
  instagram: `<div class="pe-dest" data-dest="instagram">${SB(true)}
    <div class="pe-vid"><div class="pe-ph"></div>${BURN}</div><div class="pe-shade"></div>
    <div class="pe-top"><span>Reels</span>${ic("camera")}</div>
    <div class="pe-rail">${ic("heart")}${ic("chat")}${ic("send")}${ic("more")}</div>
    <div class="pe-meta"><div class="pe-who">${AV}davidgillett<span class="pe-pill">Follow</span></div>
      <div class="pe-cap">${HOOK} <i>more</i></div>
      <div class="pe-aud">${ic("music")}davidgillett · Original audio</div></div>
    <div class="pe-prog"></div>
    <div class="pe-nav"><b class="on">${ic("home")}</b><b>${ic("search")}</b><b>${ic("add")}</b><b>${ic("reels")}</b><b>${ic("user")}</b></div>
    ${veil("instagram")}</div>`,
  tiktok: `<div class="pe-dest pe-tk" data-dest="tiktok">${SB(true)}
    <div class="pe-vid"><div class="pe-ph"></div>${BURN}</div><div class="pe-shade"></div>
    <div class="pe-top"><span>Following</span><span class="on">For You</span>${ic("search")}</div>
    <div class="pe-rail">${AV}${ic("heart", "fill")}${ic("chat", "fill")}${ic("bookmark", "fill")}${ic("share")}</div>
    <div class="pe-meta"><div class="pe-who">@davidgillett</div>
      <div class="pe-cap">${HOOK}</div>
      <div class="pe-aud">${ic("music")}original sound · davidgillett</div></div>
    <div class="pe-prog"></div>
    <div class="pe-nav"><b class="on">${ic("home")}Home</b><b>${ic("users")}Friends</b><b><span class="pe-tkplus">+</span></b><b>${ic("inbox")}Inbox</b><b>${ic("user")}Profile</b></div>
    ${veil("tiktok")}</div>`,
  youtube: `<div class="pe-dest pe-yt" data-dest="youtube">${SB(true)}
    <div class="pe-vid"><div class="pe-ph"></div>${BURN}</div><div class="pe-shade"></div>
    <div class="pe-top"><span></span><span class="pe-ic">${ic("search")}${ic("moreV")}</span></div>
    <div class="pe-rail"><b>${ic("up")}Like</b><b>${ic("down")}Dislike</b><b>${ic("chat")}Comment</b><b>${ic("share")}Share</b><b>${ic("repeat")}Remix</b></div>
    <div class="pe-meta"><div class="pe-who">${AV}@davidgillett<span class="pe-sub">Subscribe</span></div>
      <div class="pe-cap">${HOOK}</div></div>
    <div class="pe-prog"></div>
    <div class="pe-nav"><b>${ic("home")}Home</b><b class="on">${ic("shorts")}Shorts</b><b>${ic("add")}</b><b>${ic("subs")}Subscriptions</b><b>${ic("user")}You</b></div>
    ${veil("youtube")}</div>`,
  linkedin: `<div class="pe-dest" data-dest="linkedin"><div class="pe-feed pe-li">${SB(false)}
    <div class="pe-bar2">${AV}<span class="pe-srch">${ic("search")}Search</span>${ic("inbox")}</div>
    <div class="pe-post2"><div class="pe-ph2">${AV}<div><b>David Gillett</b><small>Just now · ${ic("globe")}</small></div>${ic("more")}</div>
      <p class="pe-body">${POST.filter(Boolean).slice(0, 3).join(" ")} <i>…more</i></p>
      <div class="pe-media"><div class="pe-ph"></div>${BURN}<span class="pe-playb">${ic("play")}</span></div>
      <div class="pe-first">Be the first to react</div>
      <div class="pe-acts"><b>${ic("up")}Like</b><b>${ic("chat")}Comment</b><b>${ic("repeat")}Repost</b><b>${ic("send")}Send</b></div></div>
    <div class="pe-nav lt"><b class="on">${ic("home")}Home</b><b>${ic("users")}My Network</b><b>${ic("add")}Post</b><b>${ic("bell")}Notifications</b><b>${ic("case")}Jobs</b></div>
    </div>${veil("linkedin")}</div>`,
  facebook: `<div class="pe-dest" data-dest="facebook"><div class="pe-feed pe-fb">${SB(false)}
    <div class="pe-bar2">${AV}<span class="pe-srch pe-mind">What's on your mind?</span>${ic("search")}</div>
    <div class="pe-post2" style="top:${u(131)}"><div class="pe-ph2">${AV}<div><b>David Gillett</b><small>Just now · ${ic("globe")}</small></div>${ic("more")}</div>
      <p class="pe-body">${POST.filter(Boolean).slice(0, 3).join(" ")} <i>…See more</i></p>
      <div class="pe-media"><div class="pe-ph"></div>${BURN}<span class="pe-playb">${ic("play")}</span></div>
      <div class="pe-acts"><b>${ic("up")}Like</b><b>${ic("chat")}Comment</b><b>${ic("share")}Share</b></div></div>
    <div class="pe-nav lt pe-fbnav"><b class="on">${ic("home")}Home</b><b>${ic("video")}Video</b><b>${ic("users")}Friends</b><b>${ic("bell")}Notifications</b><b>${ic("menu")}Menu</b></div>
    </div>${veil("facebook")}</div>`,
};

const MARKUP = `<div class="pe-grid">
  <div class="pe-col">
    <div class="pe-phone" data-left role="img" aria-label="The Post Caption screen: pick the platforms, then post the video to all of them at once.">
      <div class="pe-frm"><div class="pe-scr">
        ${SB(false).replace('class="pe-sb"', 'class="pe-sb lt"')}
        <div class="pe-main">
          <div class="pe-hd">
            <div class="pe-nv"><span class="pe-bk">${ic("share").replace("M15 17l5-5-5-5M4 18v-2a4 4 0 0 1 4-4h12", "m12 19-7-7 7-7M19 12H5")}</span><span class="pe-cn">Cancel</span></div>
            <div class="pe-tt"><p class="pe-ey">Post your video</p><p class="pe-h">Post Caption</p></div>
          </div>
          <div class="pe-bd">
            <div class="pe-grp"><p class="pe-lb">Post to</p><div class="pe-tags">${ORDER.map(chip).join("")}</div></div>
            <div class="pe-grp">
              <div class="pe-row"><p class="pe-lb">What should your post say</p><span class="pe-edit">${PENCIL}Edit text</span></div>
              <div class="pe-card"><div class="pe-ok"><span><i>${CHECK}</i>Looks clear</span><small>346/3000</small></div>
                <div class="pe-txt">${POST.map((l) => `<p>${l}</p>`).join("")}</div></div>
            </div>
          </div>
        </div>
        <div class="pe-bot"><button type="button" class="pe-post" data-post><i class="pe-bar"></i><span data-post-label>Post Video</span></button></div>
      </div></div>
      <div class="pe-fing" data-finger></div>
    </div>
  </div>
  <div class="pe-col">
    <div class="pe-quad" data-quad role="img" aria-label="The same video as it appears on each platform it was posted to, one small phone per platform.">
      ${WALL.map((p) => `<div class="pe-cell" data-cell="${p}"><div class="pe-phone pe-mini"><div class="pe-frm"><div class="pe-scr" style="background:#000">${DEST[p]}</div></div></div><div class="pe-lab"><span class="pe-lg">${LOGO[p]}</span>${SHOWN[p]}<em data-state>Ready</em></div></div>`).join("")}
      ${[0, 1, 2, 3].map((i) => `<div class="pe-slot" data-slot="${i}"><span>Add a platform</span></div>`).join("")}
    </div>
  </div>
</div>
<p class="pe-hint">Pick the platforms, then tap Post Video. Each one goes live on the right.</p>`;

export default function PostEverywhere() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends HTMLElement>(s: string) => host.querySelector(s) as T;
    const $$ = (s: string) => [...host.querySelectorAll(s)] as HTMLElement[];

    const chips = new Map<P, HTMLElement>($$("[data-chip]").map((c) => [c.dataset.chip as P, c]));
    const dests = new Map<P, HTMLElement>($$("[data-dest]").map((d) => [d.dataset.dest as P, d]));
    const cells = new Map<P, HTMLElement>($$("[data-cell]").map((c) => [c.dataset.cell as P, c]));
    const slots = $$("[data-slot]");
    const quad = $("[data-quad]");
    const post = $<HTMLButtonElement>("[data-post]");
    const postLabel = $("[data-post-label]");
    const bar = $(".pe-bar");
    const left = $("[data-left]");
    const finger = $("[data-finger]");

    const sel = new Set<P>();
    const live = new Set<P>();
    let busy = false;

    function render() {
      ORDER.forEach((p) => {
        const on = sel.has(p);
        const c = chips.get(p)!;
        c.classList.toggle("on", on);
        c.classList.toggle("done", live.has(p));
        c.setAttribute("aria-pressed", String(on));
        const cell = cells.get(p)!;
        cell.classList.toggle("show", on || live.has(p));
        cell.classList.toggle("live", live.has(p));
        (cell.querySelector("[data-state]") as HTMLElement).textContent = live.has(p) ? "Live" : dests.get(p)!.classList.contains("busy") ? "Posting…" : "Ready";
        const d = dests.get(p)!;
        d.classList.toggle("on", true);
        d.classList.toggle("live", live.has(p));
        const v = d.querySelector("[data-veil]") as HTMLElement;
        v.textContent = d.classList.contains("busy") ? "Posting…" : sel.has(p) ? "Ready to post" : "Not posted yet";
      });
      post.disabled = sel.size === 0 && !busy;
      const n = ORDER.filter((p) => sel.has(p) || live.has(p)).length;
      slots.forEach((sl, i) => sl.classList.toggle("show", i < 4 - n));
      rows = n > 4 ? 3 : 2;
      size();
    }
    /* Size the small phones so the wall is as tall as the Post Caption phone. */
    let rows = 2;
    function size() {
      const h = left.getBoundingClientRect().height;
      if (!h) return;
      const stacked = innerWidth <= 640;
      const gap = 12;
      const lab = 28;
      const byH = ((h - gap * (rows - 1) - lab * rows) / rows) * (523.46 / 1099);
      const mw = stacked ? Math.min(byH, (quad.parentElement!.clientWidth - gap) / 2) : byH;
      quad.style.setProperty("--mw", mw.toFixed(1) + "px");
    }

    /* Timers carry a generation so a reset cancels everything in flight. */
    let timers: number[] = [], gen = 0;
    const at = (ms: number, fn: () => void) => { const g = gen; timers.push(window.setTimeout(() => { if (g === gen) fn(); }, reduced ? 0 : ms)); };
    const clear = () => { timers.forEach(clearTimeout); timers = []; gen++; };
    cleanups.push(clear);

    function toggle(p: P) {
      if (busy) return;
      if (sel.has(p)) { sel.delete(p); live.delete(p); } else sel.add(p);
      postLabel.textContent = "Post Video"; post.classList.remove("done"); bar.style.width = "0";
      render();
    }
    function doPost(onDone?: () => void) {
      if (busy || sel.size === 0) return;
      busy = true;
      const list = ORDER.filter((p) => sel.has(p));
      list.forEach((p) => { live.delete(p); chips.get(p)!.classList.add("busy"); dests.get(p)!.classList.add("busy"); });
      postLabel.textContent = "Posting to " + list.length + "…";
      bar.style.width = "0";
      render();
      list.forEach((p, i) => at(500 + i * 700, () => {
        chips.get(p)!.classList.remove("busy");
        const d = dests.get(p)!; d.classList.remove("busy");
        live.add(p);
        bar.style.width = ((i + 1) / list.length) * 100 + "%";
        render();
        d.classList.add("pop"); at(1500, () => d.classList.remove("pop"));
        if (i === list.length - 1) {
          busy = false;
          postLabel.textContent = "Posted to " + list.length + (list.length === 1 ? " platform" : " platforms");
          post.classList.add("done");
          render();
          if (onDone) onDone();
        }
      }));
    }

    /* The demo finger lives in the left phone's own coordinates. */
    function point(el: HTMLElement) {
      const r = el.getBoundingClientRect(), p = left.getBoundingClientRect();
      finger.style.left = r.left - p.left + r.width / 2 + "px";
      finger.style.top = r.top - p.top + r.height / 2 + "px";
    }
    function press(el: HTMLElement) { finger.classList.add("dn"); el.classList.add("press"); at(160, () => { finger.classList.remove("dn"); el.classList.remove("press"); }); }

    let auto = !reduced, running = false;
    function reset() {
      sel.clear(); live.clear();
      (["linkedin", "instagram", "facebook"] as P[]).forEach((p) => sel.add(p));
      dests.forEach((d) => d.classList.remove("busy", "pop"));
      chips.forEach((c) => c.classList.remove("busy"));
      busy = false;
      postLabel.textContent = "Post Video"; post.classList.remove("done"); bar.style.width = "0";
      render();
    }
    function loop() {
      if (!auto) return;
      running = true;
      reset();
      const tk = chips.get("tiktok")!;
      at(700, () => { point(tk); finger.style.transition = "none"; finger.style.top = parseFloat(finger.style.top) + 60 + "px"; void finger.offsetWidth; finger.style.transition = ""; finger.classList.add("on"); point(tk); });
      at(1500, () => { press(tk); toggle("tiktok"); });
      at(2100, () => point(post));
      at(2800, () => { press(post); doPost(() => {
        at(700, () => finger.classList.remove("on"));
        at(6500, () => loop());
      }); });
    }
    function stopAuto() {
      if (!auto) return;
      auto = false; running = false; clear();
      finger.classList.remove("on", "dn");
      chips.forEach((c) => c.classList.remove("press"));
      post.classList.remove("press");
      if (busy) { busy = false; dests.forEach((d) => d.classList.remove("busy")); chips.forEach((c) => c.classList.remove("busy")); postLabel.textContent = "Post Video"; }
      render();
    }

    const onDown = (e: PointerEvent) => { if (e.isTrusted) stopAuto(); };
    host.addEventListener("pointerdown", onDown, true);
    cleanups.push(() => host.removeEventListener("pointerdown", onDown, true));
    chips.forEach((c, p) => c.addEventListener("click", () => toggle(p)));
    post.addEventListener("click", () => doPost());
    const ro = new ResizeObserver(size); ro.observe(left); cleanups.push(() => ro.disconnect());

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { if (auto && !running) loop(); }
      else if (auto && running) { clear(); running = false; finger.classList.remove("on"); }
    }), { threshold: 0.35 });
    io.observe(host);
    cleanups.push(() => io.disconnect());

    const clocks = $$("[data-clock]");
    function clk() { const d = new Date(); const s = (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"); clocks.forEach((c) => (c.textContent = s)); }
    clk(); const ct = setInterval(clk, 1000); cleanups.push(() => clearInterval(ct));

    reset();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="post-everywhere" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
