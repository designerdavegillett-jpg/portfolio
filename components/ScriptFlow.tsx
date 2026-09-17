"use client";

import { useEffect, useRef } from "react";

/**
 * The Own the Script flow in three phones: home, script builder, capture.
 *
 * At rest it plays itself: the calendar streak lights up and the add button is
 * tapped; the Refinance topic is picked, the script types in, the review flag
 * appears and Record is pressed; the take rolls with the timer counting, the
 * ring sweeping and the prompter marking the live line. Then it loops. It only
 * runs while on screen, and the first click or tap hands control to the
 * viewer: the step strip and the phones themselves jump to a phase, and the
 * loop stops for good.
 *
 * Same contract as CaptureAnatomy and ComplianceStates: markup and styles are
 * injected as strings, every selector is scoped under .script-flow, and the
 * behaviour lives in one useEffect with a cleanups list. The screens use the
 * Figma file's own colours and type (nodes 1370:1323, 1370:1460, 1370:1506 in
 * eqFCKjSyKAQP5vpD9cB2eb). Inside a screen 1cqw is 4.9335 design px.
 */

const IMG = "/work/own-the-script/flow/";

const STYLES = `.script-flow{--paper:#f5f5f7; --ink:#1d1d1f; --ink-2:#424245; --mute:#86868b; --hair:rgba(29,29,31,.12); --hi:#0071E3;
    --sans:var(--font-body),"Inter Tight",system-ui,sans-serif; --display:var(--font-condensed),"Archivo",system-ui,sans-serif;
    --serif:var(--font-ots-serif),"Merriweather",Georgia,serif; --ots:var(--font-ots-sans),"Merriweather Sans",system-ui,sans-serif;
    --navy:#1a2b6b; --ease:cubic-bezier(.3,.7,.3,1)}
.script-flow *{box-sizing:border-box}
.script-flow{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--ink);font-family:var(--sans);margin-block:0 var(--s5,2rem);max-width:52rem}
.script-flow .sf-stage{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,3vw,28px);align-items:start}
.script-flow .sf-phone,.script-flow .sf-phone *{-webkit-text-size-adjust:none;text-size-adjust:none}
.script-flow .sf-phone{position:relative;container-type:inline-size;transition:opacity .55s var(--ease),transform .55s var(--ease),filter .55s var(--ease);cursor:pointer;-webkit-tap-highlight-color:transparent}
.script-flow .sf-phone:not(.on){opacity:.5;transform:scale(.965);filter:saturate(.75)}
.script-flow .sf-bezel{border:2.83cqw solid #000;border-radius:14.1cqw;box-shadow:0 3cqw 7cqw rgba(0,0,0,.12);background:#000}
.script-flow .sf-screen{position:relative;aspect-ratio:493.35/1068.9;border-radius:11.3cqw;overflow:hidden;background:#fff;container-type:inline-size;transform:translateZ(0)}
.script-flow .sf-ui{position:absolute;inset:0;font-family:var(--ots);font-size:3.08cqw;line-height:1.33;color:#111827}
.script-flow .sf-ui p{margin:0;max-width:none;font-size:inherit;line-height:inherit;color:inherit}
.script-flow .sf-ui h4{margin:0}
.script-flow .sf-ui svg{display:block}

/* ---------- status bar, redrawn ---------- */
.script-flow .sf-sb{position:absolute;left:0;right:0;top:0;height:13.38cqw;display:flex;align-items:center;justify-content:space-between;padding:0 8.5cqw 0 9cqw;font:600 3.45cqw/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.01em;color:#111827;z-index:3}
.script-flow .sf-sb.dk{color:#fff}
.script-flow .sf-sb .isl{position:absolute;left:50%;top:2.84cqw;transform:translateX(-50%);width:29.4cqw;height:7.7cqw;background:#000;border-radius:3.85cqw}
.script-flow .sf-sb svg{height:2.5cqw;width:auto}
.script-flow .sf-sb .tm{display:flex;align-items:center;gap:.9cqw}
.script-flow .sf-sb .tm svg{height:2.6cqw}

/* ---------- home ---------- */
.script-flow .sf-home{background:#fff}
.script-flow .sf-av{position:absolute;left:50%;top:13.38cqw;transform:translateX(-50%);width:23.51cqw;height:23.51cqw;border-radius:50%;background:#e8e8e8;padding:1.28cqw}
.script-flow .sf-av span{display:block;width:100%;height:100%;border-radius:50%;background:#c9ced6 url(${IMG}avatar.webp) center/cover;overflow:hidden}
.script-flow .sf-ready{position:absolute;left:6.08cqw;right:6.08cqw;top:37.91cqw;text-align:center;font:700 6.15cqw/8.21cqw var(--serif);color:#111827}
.script-flow .sf-cal{position:absolute;left:6.08cqw;right:6.08cqw;top:50.27cqw}
.script-flow .sf-cal .lab{display:flex;justify-content:space-between;align-items:baseline;font:700 2.29cqw/4.08cqw var(--ots);color:#8a929e;letter-spacing:.08em}
.script-flow .sf-cal .lab i{font:italic 400 2.29cqw/4.08cqw var(--ots);letter-spacing:0}
.script-flow .sf-days{display:flex;gap:1.53cqw;margin-top:1.2cqw}
.script-flow .sf-day{flex:1;height:10.19cqw;border:.255cqw solid #d1d5db;border-radius:1.2cqw;background:#f4f6f9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;color:var(--navy);transition:background .3s,color .3s}
.script-flow .sf-day b{font:700 2.29cqw/3.06cqw var(--ots)}
.script-flow .sf-day span{display:flex;align-items:center;gap:.5cqw;font:400 3.06cqw/4.08cqw var(--ots)}
.script-flow .sf-day.we{color:#8a929e}
.script-flow .sf-day.today{background:var(--navy);border-color:var(--navy);color:#fff}
.script-flow .sf-day svg{width:3.06cqw;height:3.92cqw;transform:scale(0);transform-origin:50% 90%;transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
.script-flow .sf-day.lit svg{transform:none}
.script-flow .sf-tabs{position:absolute;left:0;right:0;top:69.73cqw;height:10.77cqw;display:flex;gap:0;padding:0 0 0 6.15cqw;border-bottom:.255cqw solid #d1d5db}
.script-flow .sf-tabs span{display:flex;align-items:flex-end;padding:0 3.08cqw .2cqw;font:400 4.1cqw/6.15cqw var(--ots);color:#6b7280;position:relative;padding-bottom:1.6cqw}
.script-flow .sf-tabs span.on{color:#101322}
.script-flow .sf-tabs span.on::after{content:"";position:absolute;left:3.08cqw;right:3.08cqw;bottom:-.255cqw;height:.61cqw;background:var(--navy)}
.script-flow .sf-grid{position:absolute;left:0;right:0;top:80.47cqw;display:grid;grid-template-columns:repeat(3,1fr);gap:.256cqw}
.script-flow .sf-th{aspect-ratio:163.18/273.24;background:#2a2f3a center/cover no-repeat;transform:translateY(2cqw);opacity:0;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.script-flow .sf-phone.seen .sf-th{opacity:1;transform:none}
.script-flow .sf-fade{position:absolute;left:0;right:0;bottom:0;height:34cqw;background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.46));pointer-events:none}
.script-flow .sf-bar{position:absolute;left:3.65cqw;right:3.65cqw;bottom:3.2cqw;height:18.46cqw;border-radius:9.23cqw;background:rgba(255,255,255,.8);-webkit-backdrop-filter:blur(1.94cqw);backdrop-filter:blur(1.94cqw);border:.255cqw solid rgba(0,0,0,.08);box-shadow:0 .26cqw 1.03cqw rgba(0,0,0,.1);display:flex;justify-content:space-between;align-items:center;padding:0 3.08cqw}
.script-flow .sf-bi{width:17.13cqw;display:flex;flex-direction:column;align-items:center;gap:1.03cqw;font:400 3.08cqw/4.1cqw var(--ots);color:#8a929e}
.script-flow .sf-bi svg{width:6.15cqw;height:6.15cqw;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.script-flow .sf-bi.on{color:var(--navy)}
.script-flow .sf-add{width:17.13cqw;display:grid;place-items:center}
.script-flow .sf-add i{width:11.4cqw;height:11.4cqw;border-radius:50%;background:#babfd3;display:grid;place-items:center;transition:transform .18s var(--ease)}
.script-flow .sf-add i::before{content:"";grid-area:1/1;width:9.3cqw;height:9.3cqw;border-radius:50%;background:var(--navy)}
.script-flow .sf-add svg{grid-area:1/1;width:5.4cqw;height:5.4cqw;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round}
.script-flow .sf-add.press i{transform:scale(.9)}

/* ---------- script builder ---------- */
.script-flow .sf-build{background:#f3f5f9}
.script-flow .sf-back{position:absolute;left:5.1cqw;top:14.2cqw;width:10.2cqw;height:10.2cqw;border-radius:50%;background:#fff;box-shadow:0 .51cqw 1.02cqw rgba(0,0,0,.02);display:grid;place-items:center}
.script-flow .sf-back svg{width:5.1cqw;height:5.1cqw;stroke:#111827;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.script-flow .sf-kick{position:absolute;left:5.1cqw;right:5.1cqw;top:30.6cqw;font:700 3.57cqw/1.25 var(--ots);letter-spacing:.07em;text-transform:uppercase;color:#9ca3af}
.script-flow .sf-title{position:absolute;left:5.1cqw;right:5.1cqw;top:36.1cqw;font:700 9.18cqw/11.22cqw var(--serif);color:#111827;letter-spacing:-.005em}
.script-flow .sf-topics{position:absolute;left:5.1cqw;right:5.1cqw;top:53.5cqw}
.script-flow .sf-topics .lab{font:700 3.06cqw/1.25 var(--ots);letter-spacing:.08em;text-transform:uppercase;color:#4b5563}
.script-flow .sf-pills{display:flex;gap:2.04cqw;margin-top:3.06cqw}
.script-flow .sf-pill{height:9.56cqw;padding:0 4.08cqw;border-radius:4.78cqw;border:.255cqw solid #e5e7eb;background:#fff;display:flex;align-items:center;font:400 3.57cqw/1 var(--ots);color:#4b5563;white-space:nowrap;transition:background .3s,border-color .3s,color .3s,box-shadow .3s,transform .18s var(--ease)}
.script-flow .sf-pill.sel{background:rgba(26,43,107,.06);border-color:var(--navy);box-shadow:inset 0 0 0 .13cqw var(--navy);color:var(--navy);font-weight:700}
.script-flow .sf-pill.press{transform:scale(.94)}
.script-flow .sf-card{position:absolute;left:5.1cqw;right:5.1cqw;top:76.2cqw;height:99.9cqw;background:#fff;border-radius:6.12cqw;padding:5.1cqw;box-shadow:0 2.04cqw 4.08cqw rgba(26,43,107,.03);display:flex;flex-direction:column}
.script-flow .sf-body{flex:1;font:400 4.16cqw/6.25cqw var(--ots);color:#4b4b4b;overflow:hidden}
.script-flow .sf-body p+p{margin-top:6.25cqw}
.script-flow .sf-body .w{opacity:0;transition:opacity .16s}
.script-flow .sf-body .w.on{opacity:1}
.script-flow .sf-body u{text-decoration:none;color:#4b4b4b;background:linear-gradient(#b45309,#b45309) no-repeat 0 100%/0 .3cqw;transition:color .4s,background-size .5s ease}
.script-flow .sf-body u.flag{color:#b45309;background-size:100% .3cqw}
.script-flow .sf-meta{border-top:.255cqw solid #e5e7eb;margin-top:5.1cqw;padding-top:5.1cqw;display:flex;justify-content:space-between;align-items:center;font:400 3.31cqw/1.3 var(--ots);color:#4b5563;font-variant-numeric:tabular-nums}
.script-flow .sf-meta b{display:flex;align-items:center;gap:1.53cqw;font:700 3.57cqw/1.3 var(--ots);color:#111827}
.script-flow .sf-meta svg{width:4.05cqw;height:4.05cqw;stroke:#10b981;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.script-flow .sf-flag{position:absolute;left:5.1cqw;right:5.1cqw;top:179.2cqw;height:14.28cqw;border-radius:3.06cqw;background:rgba(212,137,0,.2);display:flex;justify-content:space-between;align-items:center;padding:0 4.08cqw;color:#b45309;opacity:0;transform:translateY(2cqw);transition:opacity .4s var(--ease),transform .4s var(--ease)}
.script-flow .sf-flag.on{opacity:1;transform:none}
.script-flow .sf-flag span{display:flex;align-items:center;gap:2.04cqw;font:700 3.57cqw/1 var(--ots)}
.script-flow .sf-flag em{display:flex;align-items:center;gap:1.02cqw;font:700 3.31cqw/1 var(--ots);font-style:normal}
.script-flow .sf-flag svg{width:4.05cqw;height:4.05cqw;stroke:#b45309;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.script-flow .sf-flag em svg{width:3.3cqw;height:3.3cqw}
.script-flow .sf-cta{position:absolute;left:5.1cqw;right:5.1cqw;top:196.4cqw;height:14.28cqw;border-radius:3.06cqw;background:var(--navy);color:#fff;display:grid;place-items:center;font:700 4.08cqw/1 var(--ots);box-shadow:0 1.02cqw 3.06cqw rgba(26,43,107,.15);transition:transform .18s var(--ease),filter .18s}
.script-flow .sf-cta.press{transform:scale(.97);filter:brightness(1.15)}

/* ---------- capture ---------- */
.script-flow .sf-cap{background:linear-gradient(#3d424d,#14171e)}
.script-flow .sf-cam{position:absolute;inset:0;background:url(${IMG}camera.webp) center/cover no-repeat}
.script-flow .sf-scrim{position:absolute;inset:0;background:rgba(8,12,22,.28)}
.script-flow .sf-gridsvg{position:absolute;inset:0;width:100%;height:100%}
.script-flow .sf-gridsvg line{stroke:rgba(255,255,255,.36);stroke-width:1.25}
.script-flow .sf-gridsvg path{stroke:rgba(255,255,255,.6);stroke-width:1.57;fill:none}
.script-flow .sf-rail{position:absolute;left:86.17cqw;top:88.98cqw;width:10.68cqw;display:flex;flex-direction:column;gap:3.85cqw}
.script-flow .sf-ri{display:flex;flex-direction:column;align-items:center;gap:.585cqw;color:#fff;font:400 2.54cqw/1.3 var(--ots);text-shadow:0 .2cqw .585cqw rgba(0,0,0,.6)}
.script-flow .sf-ri i{width:10.68cqw;height:10.68cqw;border-radius:50%;background:rgba(13,18,30,.55);border:.254cqw solid rgba(255,255,255,.22);display:grid;place-items:center;font:700 2.64cqw/1 var(--ots);font-style:normal}
.script-flow .sf-ri svg{width:5.4cqw;height:5.4cqw;stroke:#fff;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.script-flow .sf-pr{position:absolute;left:5.91cqw;top:16.06cqw;width:89.22cqw;height:44.31cqw;background:rgba(18,20,25,.68);border-radius:3.2cqw;overflow:hidden}
.script-flow .sf-pr::before,.script-flow .sf-pr::after{content:"";position:absolute;left:0;right:0;top:0;height:2.6cqw;background:linear-gradient(rgba(18,20,25,.95),rgba(18,20,25,0));z-index:2}
.script-flow .sf-pr::after{top:auto;bottom:0;height:4cqw;background:linear-gradient(rgba(18,20,25,0),rgba(18,20,25,.9))}
.script-flow .sf-pr ol{list-style:none;margin:0;padding:3.05cqw 3.56cqw 0;transition:transform .55s var(--ease);will-change:transform}
.script-flow .sf-pr li{height:7.88cqw;font:700 4.58cqw/6.61cqw var(--ots);color:#fff;white-space:nowrap;text-shadow:0 .254cqw 1.02cqw rgba(0,0,0,.55);transition:color .45s}
.script-flow .sf-pr li.spent{color:#8e97a6}
.script-flow .sf-pr li.live{color:#ff994f}
.script-flow .sf-pr li.next{color:#ffdabf}
.script-flow .sf-timer{position:absolute;left:50%;top:176.47cqw;transform:translateX(-50%);height:8.02cqw;padding:0 3.56cqw;border-radius:4cqw;background:rgba(13,18,30,.6);display:flex;align-items:center;gap:1.78cqw;color:#fff;font:700 3.56cqw/1 var(--ots);font-variant-numeric:tabular-nums}
.script-flow .sf-timer i{width:2.03cqw;height:2.03cqw;border-radius:50%;background:#ff3b30;animation:sf-blink 1.2s steps(1) infinite}
@keyframes sf-blink{50%{opacity:.25}}
.script-flow .sf-ring{position:absolute;left:50%;top:187.03cqw;transform:translateX(-50%);width:23.39cqw;height:23.39cqw}
.script-flow .sf-ring svg{width:100%;height:100%}
.script-flow .sf-ring circle{fill:none;stroke-width:5;stroke:rgba(255,255,255,.25)}
.script-flow .sf-ring circle.sw{stroke:#fff;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%}
.script-flow .sf-ring rect{fill:#ff3b30}

/* ---------- tap ripple ---------- */
.script-flow .sf-tap{position:absolute;width:12cqw;height:12cqw;margin:-6cqw 0 0 -6cqw;border-radius:50%;background:rgba(0,113,227,.28);border:.4cqw solid rgba(0,113,227,.7);opacity:0;pointer-events:none;z-index:5}
.script-flow .sf-tap.go{animation:sf-tap .62s var(--ease) forwards}
@keyframes sf-tap{0%{opacity:0;transform:scale(.35)}25%{opacity:1;transform:scale(.7)}100%{opacity:0;transform:scale(1.5)}}

/* ---------- step strip ---------- */
.script-flow .sf-steps{list-style:none;margin:var(--s4,1.35rem) 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:0 clamp(14px,3vw,28px)}
.script-flow .sf-steps li{position:relative;border-top:1px solid var(--hair);transition:opacity .22s}
.script-flow .sf-steps li:not(.on){opacity:.45}
.script-flow .sf-so{all:unset;display:flex;flex-direction:column;gap:3px;width:100%;cursor:pointer;padding:10px 2px 8px}
.script-flow .sf-so:focus-visible{outline:2px solid var(--hi);outline-offset:-2px;border-radius:6px}
.script-flow .sf-so h2{margin:0;font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.02rem;line-height:1.18;font-weight:700;letter-spacing:.006em;text-transform:uppercase;color:var(--ink);transition:color .2s}
.script-flow li.on .sf-so h2{color:var(--hi)}
.script-flow .sf-so small{font-size:13px;line-height:1.45;color:var(--ink-2)}
.script-flow .sf-run{position:absolute;left:0;top:-1px;height:1px;width:0;background:var(--hi);pointer-events:none}
.script-flow li.on .sf-run.go{animation:sf-run var(--dwell) linear forwards}
@keyframes sf-run{from{width:0}to{width:100%}}
.script-flow .sf-cap-note{margin:.65rem 0 0;font-size:.7rem;line-height:1.55;color:var(--mute);max-width:34rem}

@media (max-width:640px){
.script-flow .sf-stage{grid-template-columns:1fr;justify-items:center}
.script-flow .sf-phone{width:min(100%,250px)}
.script-flow .sf-phone:not(.on){display:none}
.script-flow .sf-phone.on{animation:sf-in .5s var(--ease)}
@keyframes sf-in{from{opacity:0;transform:translateY(8px)}}
.script-flow .sf-steps{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.script-flow .sf-steps li,.script-flow .sf-steps li.on{border:0;opacity:1;flex:0 0 auto}
.script-flow .sf-so{width:auto;padding:8px 13px;border:1px solid var(--hair);border-radius:999px;background:#fff;transition:background .2s,border-color .2s}
.script-flow li.on .sf-so{background:var(--hi);border-color:var(--hi)}
.script-flow .sf-so h2{font-size:.78rem;letter-spacing:.02em;line-height:1}
.script-flow li.on .sf-so h2{color:#fff}
.script-flow .sf-so small,.script-flow .sf-run{display:none}
}
@media (prefers-reduced-motion:reduce){.script-flow *{transition:none!important;animation:none!important}.script-flow .sf-phone:not(.on){opacity:1;transform:none;filter:none}}
`;

const SB_ICONS = (ink: string) => `<span class="tm"><svg viewBox="0 0 66 12" fill="${ink}"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9" y="3" width="3" height="9" rx=".8"/><rect x="13.5" y="0.5" width="3" height="11.5" rx=".8"/><path d="M23 4.6a9 9 0 0 1 12.4 0M25.6 7.4a5.3 5.3 0 0 1 7.2 0" stroke="${ink}" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="29.2" cy="10.4" r="1.4"/><rect x="42" y="1" width="20" height="10" rx="3" stroke="${ink}" stroke-width="1.2" fill="none" opacity=".4"/><rect x="43.5" y="2.5" width="17" height="7" rx="1.8" fill="#34c759"/><rect x="63" y="4" width="1.6" height="4" rx=".8" opacity=".4"/><path d="M52.6 3.2 50.2 6.4h2l-1 2.6 2.6-3.3h-2z" fill="#000"/></svg></span>`;
const sb = (time: string, dark = false) => `<div class="sf-sb${dark ? " dk" : ""}"><span>${time}</span><span class="isl"></span>${SB_ICONS(dark ? "#fff" : "#111827")}</div>`;

const FLAME = `<svg viewBox="0 0 15 19"><path d="M7.5 18.5c-3.6 0-6-2.5-6-5.9 0-2.6 1.6-4.4 2.7-5.6.4-.4 1 .1.9.6-.2 1 0 1.9.7 2.2.1-2.6 1.4-5.3 4-7.3.4-.3 1 0 .9.5-.2 1.6.5 2.9 1.5 4.1 1 1.3 1.8 2.8 1.8 4.9 0 3.5-2.7 6.5-6.5 6.5z" fill="#f59e0b"/><path d="M7.6 18.5c-1.9 0-3.3-1.4-3.3-3.2 0-1.6 1.2-2.5 1.9-3.5.2-.3.7-.1.7.3 0 .6.2 1 .6 1.2.2-1.5 1-2.6 2-3.3.3-.2.7 0 .7.4 0 .9.4 1.5.9 2.2.5.7.9 1.5.9 2.6 0 2-1.8 3.3-4.4 3.3z" fill="#fbbf24"/></svg>`;
const PLUS = `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`;
const I_HOME = `<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>`;
const I_DOC = `<svg viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>`;
const I_ROCKET = `<svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8-.8-.7-2-.7-3 -.2z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.9 12.9 0 0 1 22 2c0 2.7-.9 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.6-3.3 2-4.5c1.6-1.3 5-1 5-1M12 15v5s3.3-.6 4.5-2c1.3-1.6 1-5 1-5"/></svg>`;
const I_USER = `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/><circle cx="12" cy="9" r="2.4"/><path d="M8.5 14.5c.7-1.4 2-2.1 3.5-2.1s2.8.7 3.5 2.1"/></svg>`;
const I_BACK = `<svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></svg>`;
const I_CLOCK = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
const I_SHIELD = `<svg viewBox="0 0 24 24"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/></svg>`;
const I_CHEV = `<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>`;
const I_FLIP = `<svg viewBox="0 0 24 24"><path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5l2-3h2l2 3h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="m11 19 2 2-2 2"/></svg>`;
const I_GRID = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`;
const I_X = `<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

const SCRIPT = [
  "Refinancing into a shorter term is the quiet wealth move. Your payment may rise, but more of every payment goes to the balance instead of interest, and you own your home significantly faster.",
  "Most people focus on one thing: lowering their monthly overhead. But to <u>guaranteed</u> true wealth builders? They always focus on equity.",
  "Get in touch if you have questions!",
];
const LINES = [
  "Refinancing into a shorter term is", "the quiet wealth move. Your", "payment may rise, but more of every", "payment goes to the balance",
  "instead of interest, and you own", "your home significantly faster.", "Most people focus on one thing:", "lowering their monthly overhead.",
  "But to guaranteed true wealth", "builders? They always focus on", "equity. Get in touch if you have", "questions!",
];
const THUMBS = ["home-office", "outdoor-cafe", "city-rooftop", "library", "kitchen", "park-bench", "home-office", "city-rooftop", "outdoor-cafe"];

const scriptHtml = SCRIPT.map((p) => "<p>" + p.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ") + "</p>").join("");

const HOME = `<div class="sf-ui sf-home">
  ${sb("4:01")}
  <div class="sf-av"><span></span></div>
  <div class="sf-ready">Ready to roll!</div>
  <div class="sf-cal">
    <div class="lab"><span>JUNE 2026</span><i>Tap for full calendar</i></div>
    <div class="sf-days">
      <div class="sf-day we"><b>Sun</b><span>14</span></div>
      <div class="sf-day" data-lit><b>Mon</b><span>15${FLAME}</span></div>
      <div class="sf-day" data-lit><b>Tues</b><span>16${FLAME}</span></div>
      <div class="sf-day" data-lit><b>Wed</b><span>17${FLAME}</span></div>
      <div class="sf-day today"><b>Thurs</b><span>18</span></div>
      <div class="sf-day"><b>Fri</b><span>19</span></div>
      <div class="sf-day we"><b>Sat</b><span>20</span></div>
    </div>
  </div>
  <div class="sf-tabs"><span class="on">Videos</span><span>Schedule</span></div>
  <div class="sf-grid">${THUMBS.map((t, i) => `<div class="sf-th" style="background-image:url(${IMG}thumb-${t}.webp);transition-delay:${i * 45}ms"></div>`).join("")}</div>
  <div class="sf-fade"></div>
  <div class="sf-bar">
    <div class="sf-bi on">${I_HOME}<span>Home</span></div>
    <div class="sf-bi">${I_DOC}<span>Scripts</span></div>
    <div class="sf-add" id="add"><i>${PLUS}</i></div>
    <div class="sf-bi">${I_ROCKET}<span>Lvl Up</span></div>
    <div class="sf-bi">${I_USER}<span>You</span></div>
  </div>
  <div class="sf-tap" style="left:51cqw;top:204.2cqw"></div>
</div>`;

const BUILD = `<div class="sf-ui sf-build">
  ${sb("12:11")}
  <div class="sf-back">${I_BACK}</div>
  <div class="sf-kick">New Video</div>
  <h4 class="sf-title">Build your script</h4>
  <div class="sf-topics">
    <div class="lab">Popular Topics</div>
    <div class="sf-pills"><span class="sf-pill">Rate update</span><span class="sf-pill" id="refi">Refinance</span><span class="sf-pill">Credit tips</span></div>
  </div>
  <div class="sf-card">
    <div class="sf-body" id="body">${scriptHtml}</div>
    <div class="sf-meta"><b>${I_CLOCK}<span id="secs">≈ 0s</span></b><span id="words">0 words</span></div>
  </div>
  <div class="sf-flag" id="flag"><span>${I_SHIELD}1 term to review</span><em>Review ${I_CHEV}</em></div>
  <div class="sf-cta" id="cta">Record this script</div>
  <div class="sf-tap" style="left:48.7cqw;top:65.1cqw" data-tap="refi"></div>
  <div class="sf-tap" style="left:49.9cqw;top:203.6cqw" data-tap="cta"></div>
</div>`;

const CAPTURE = `<div class="sf-ui sf-cap">
  <div class="sf-cam"></div>
  <div class="sf-scrim"></div>
  <svg class="sf-gridsvg" viewBox="0 0 493 1069" preserveAspectRatio="none">
    <line x1="164.3" y1="0" x2="164.3" y2="1069"/><line x1="328.7" y1="0" x2="328.7" y2="1069"/>
    <line x1="0" y1="356.3" x2="493" y2="356.3"/><line x1="0" y1="712.5" x2="493" y2="712.5"/>
    <path vector-effect="non-scaling-stroke" d="M47 78 H453 a18 18 0 0 1 18 18 V424.4 H422.4 a18 18 0 0 0 -18 18 V781 a18 18 0 0 1 -18 18 H47 a18 18 0 0 1 -18 -18 V96 a18 18 0 0 1 18 -18 Z"/>
  </svg>
  ${sb("4:01", true)}
  <div class="sf-pr"><ol id="lines">${LINES.map((l) => `<li>${l}</li>`).join("")}</ol></div>
  <div class="sf-rail">
    <div class="sf-ri"><i>${I_FLIP}</i>Flip</div>
    <div class="sf-ri"><i>${I_GRID}</i>Grid</div>
    <div class="sf-ri"><i>AUTO</i>Pace</div>
    <div class="sf-ri"><i>${I_X}</i>Cancel</div>
  </div>
  <div class="sf-timer"><i></i><span id="elapsed">0:00</span></div>
  <div class="sf-ring"><svg viewBox="0 0 115.4 115.4"><circle cx="57.7" cy="57.7" r="52.7"/><circle class="sw" id="sweep" cx="57.7" cy="57.7" r="52.7" stroke-dasharray="0 331.1"/><rect x="38.7" y="38.7" width="38" height="38" rx="7.5"/></svg></div>
</div>`;

const MARKUP = `<figure style="margin:0">
  <div class="sf-stage" id="stage">
    <div class="sf-phone on" data-phase="0" role="img" aria-label="The home screen: streak calendar, video library and the add button"><div class="sf-bezel"><div class="sf-screen">${HOME}</div></div></div>
    <div class="sf-phone" data-phase="1" role="img" aria-label="The script builder: a topic is chosen, the script fills in and a term is flagged for review"><div class="sf-bezel"><div class="sf-screen">${BUILD}</div></div></div>
    <div class="sf-phone" data-phase="2" role="img" aria-label="The capture screen: the take rolls while the prompter marks the live line"><div class="sf-bezel"><div class="sf-screen">${CAPTURE}</div></div></div>
  </div>
  <ol class="sf-steps" id="steps">
    <li data-phase="0" class="on"><span class="sf-run"></span><button class="sf-so" type="button"><h2>Start the day</h2><small>The streak is the hook. One tap on add and you are writing.</small></button></li>
    <li data-phase="1"><span class="sf-run"></span><button class="sf-so" type="button"><h2>Build the script</h2><small>Pick a topic, the draft writes itself, compliance flags a word before you ever say it.</small></button></li>
    <li data-phase="2"><span class="sf-run"></span><button class="sf-so" type="button"><h2>Record</h2><small>The prompter follows your voice. Grid, pace and cancel sit in the thumb's reach.</small></button></li>
  </ol>
  <figcaption class="sf-cap-note">Left, the home screen as built. The script builder and the capture screen are proposed redesigns from the Figma file, not the shipped screens. The loop plays on its own until you touch it.</figcaption>
</figure>`;

export default function ScriptFlow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- injected
       markup, so one assertion here beats a cast at every lookup. */
    const q = (sel: string): any => host.querySelector(sel);
    (function () {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const phones: HTMLElement[] = [...host.querySelectorAll<HTMLElement>(".sf-phone")];
      const steps: HTMLElement[] = [...host.querySelectorAll<HTMLElement>("#steps li")];
      const DWELL = [3400, 4700, 5300];
      let phase = -1, auto = !reduced, visible = false, timers: number[] = [], raf = 0, gen = 0;

      const at = (ms: number, fn: () => void) => { const g = gen; timers.push(window.setTimeout(() => { if (g === gen) fn(); }, reduced ? 0 : ms)); };
      const clear = () => { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); gen++; };
      const tap = (el: HTMLElement | null) => { if (!el || reduced) return; el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); };
      const press = (el: HTMLElement | null) => { if (!el) return; el.classList.add("press"); at(190, () => el.classList.remove("press")); };

      /* ---- phase 0: home ---- */
      const days = [...host.querySelectorAll<HTMLElement>(".sf-day[data-lit]")];
      function home() {
        days.forEach((d) => d.classList.remove("lit"));
        phones[0].classList.add("seen");
        days.forEach((d, i) => at(500 + i * 260, () => d.classList.add("lit")));
        at(2300, () => tap(q('.sf-home .sf-tap')));
        at(2450, () => press(q("#add")));
      }

      /* ---- phase 1: build ---- */
      const words: HTMLElement[] = [...host.querySelectorAll<HTMLElement>("#body .w")];
      const flagWord = q("#body u") as HTMLElement, refi = q("#refi") as HTMLElement, flag = q("#flag") as HTMLElement;
      const secs = q("#secs"), wordsOut = q("#words");
      function build() {
        words.forEach((w) => w.classList.remove("on"));
        flagWord.classList.remove("flag"); refi.classList.remove("sel"); flag.classList.remove("on");
        secs.textContent = "≈ 0s"; wordsOut.textContent = "0 words";
        at(350, () => tap(q('[data-tap="refi"]')));
        at(500, () => { press(refi); refi.classList.add("sel"); });
        const T0 = 1000, PER = 34;
        words.forEach((w, i) => at(T0 + i * PER, () => {
          w.classList.add("on");
          const n = i + 1; wordsOut.textContent = n + (n === 1 ? " word" : " words"); secs.textContent = "≈ " + Math.round(n * 0.64) + "s";
        }));
        const done = T0 + words.length * PER;
        at(done + 250, () => { flagWord.classList.add("flag"); flag.classList.add("on"); });
        at(done + 1100, () => tap(q('[data-tap="cta"]')));
        at(done + 1250, () => press(q("#cta")));
      }

      /* ---- phase 2: capture ---- */
      const lines: HTMLElement[] = [...host.querySelectorAll<HTMLElement>("#lines li")];
      const ol = q("#lines") as HTMLElement, elapsed = q("#elapsed"), sweep = q("#sweep");
      const C = 331.1;
      function setLive(k: number) {
        ol.style.transform = "translateY(" + (-(k - 1) * 7.88) + "cqw)";
        lines.forEach((l, i) => { l.className = i < k ? "spent" : i === k ? "live" : i === k + 1 ? "next" : ""; });
      }
      function capture() {
        let live = 1; setLive(live);
        elapsed.textContent = "0:00"; sweep.setAttribute("stroke-dasharray", "0 " + C);
        for (let i = 1; i <= 5; i++) at(700 + i * 900, () => setLive(live = 1 + i));
        if (reduced) { elapsed.textContent = "0:08"; sweep.setAttribute("stroke-dasharray", (0.38 * C).toFixed(1) + " " + C); return; }
        const t0 = performance.now();
        const run = () => {
          const ms = performance.now() - t0, s = Math.floor(ms / 1000);
          elapsed.textContent = "0:" + String(s).padStart(2, "0");
          sweep.setAttribute("stroke-dasharray", (Math.min(0.4, ms / DWELL[2] * 0.4) * C).toFixed(1) + " " + C);
          if (ms < DWELL[2] + 400) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      }

      const PLAY = [home, build, capture];
      function go(p: number, fromUser: boolean) {
        if (fromUser) { auto = false; steps.forEach((s) => s.querySelector(".sf-run")!.classList.remove("go")); }
        clear();
        phase = p;
        phones.forEach((ph) => ph.classList.toggle("on", Number(ph.dataset.phase) === p));
        steps.forEach((s) => {
          const on = Number(s.dataset.phase) === p; s.classList.toggle("on", on);
          const bar = s.querySelector(".sf-run") as HTMLElement; bar.classList.remove("go");
          if (on && auto) { void bar.offsetWidth; bar.style.setProperty("--dwell", DWELL[p] + "ms"); bar.classList.add("go"); }
        });
        PLAY[p]();
        if (auto && !reduced) at(DWELL[p], () => { if (visible && auto) go((p + 1) % 3, false); });
      }

      phones.forEach((ph) => ph.addEventListener("click", () => go(Number(ph.dataset.phase), true)));
      steps.forEach((s) => s.addEventListener("click", () => go(Number(s.dataset.phase), true)));

      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          visible = e.isIntersecting;
          if (visible) { if (phase < 0 || auto) go(phase < 0 ? 0 : phase, false); }
          else if (auto) clear();
        });
      }, { threshold: 0.3 });
      io.observe(host); cleanups.push(() => { io.disconnect(); clear(); });

      if (reduced) { phones[0].classList.add("seen"); go(0, false); }
    })();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="script-flow" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
