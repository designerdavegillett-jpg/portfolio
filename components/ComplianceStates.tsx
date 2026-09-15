"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive three-state view of the Own the Script audio compliance screen.
 *
 * One phone drawing, three states: compliant, needs review, not compliant.
 * Selecting a state on the right swaps the badge, the guidance, the transcript
 * with its flagged phrases, and the action buttons, in place. The frame never
 * moves. At rest the states cycle on their own until the viewer touches
 * anything, then it is theirs. Selection is click or tap only, never hover.
 *
 * Same contract as CaptureAnatomy: markup and styles are injected as strings,
 * every selector is scoped under .compliance-states, and the behaviour lives in
 * one useEffect with a cleanups list.
 */

const STYLES = `.compliance-states{--paper:#f5f5f7; --ink:#1d1d1f; --ink-2:#424245; --mute:#86868b;
    --hair:rgba(29,29,31,.12); --card:#ffffff; --hi:#0071E3;
    --sans:var(--font-body),"Inter Tight",system-ui,sans-serif;
    --display:var(--font-condensed),"Archivo",system-ui,sans-serif;}
.compliance-states *{box-sizing:border-box}
.compliance-states .phone, .compliance-states .phone *{-webkit-text-size-adjust:none;text-size-adjust:none}
.compliance-states{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--ink);font-family:var(--sans);margin-block:0 var(--s6,3rem)}
.compliance-states .figure{position:relative;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:auto minmax(320px,1fr);gap:40px clamp(32px,5vw,64px);align-items:start}

/* ---------- the phone: Figma frame 1384:776, 552 wide, 1cqw = 5.52px in the design ---------- */
.compliance-states .phone{position:relative;width:min(400px,36vw);justify-self:center;container-type:inline-size;
    --p-bg:#f3f5f9; --p-ink:#101322; --p-mute:#6a707b; --p-faint:#9ca3af; --p-line:#e5e7eb; --p-edge:#d9dbde;
    --p-navy:#1e2b6b; --p-sec:#f9fafb; --p-sec-edge:#babfd3; --p-sec-ink:#4b5563;
    --ok:#0f7643; --warn:#b45a00; --bad:#dc2626;
    --serif:var(--font-ots-serif),"Merriweather",Georgia,serif; --ots:var(--font-ots-sans),"Merriweather Sans",system-ui,sans-serif}
.compliance-states .screen{position:relative;background:var(--p-bg);border:2.98cqw solid #000;border-radius:13.4cqw;box-shadow:0 4cqw 8cqw rgba(0,0,0,.1);aspect-ratio:552/1199;overflow:hidden;color:var(--p-ink);font-family:var(--ots);font-size:3.62cqw;line-height:1.6}
.compliance-states .sb{height:9.7cqw;margin:2.98cqw 5.97cqw 0;display:flex;align-items:center;justify-content:space-between;padding:0 3cqw;font:700 3.3cqw/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.compliance-states .sb .pill{position:absolute;left:50%;top:2.6cqw;transform:translateX(-50%);width:22cqw;height:6.6cqw;background:#000;border-radius:3.3cqw}
.compliance-states .sb svg{height:2.4cqw;width:auto;display:block}
.compliance-states .nav{display:flex;align-items:center;gap:2.9cqw;margin:3.98cqw 5.97cqw 0}
.compliance-states .nav .back{width:10cqw;height:10.2cqw;border-radius:50%;background:#fff;box-shadow:0 .5cqw .5cqw rgba(0,0,0,.02);display:grid;place-items:center;flex:none}
.compliance-states .nav .back svg{width:5cqw;height:5cqw;stroke:var(--p-ink);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.compliance-states .nav h4{margin:0;font:700 6.96cqw/1.25 var(--serif);color:var(--p-ink);letter-spacing:0;text-transform:none}
.compliance-states .pbody{padding:2.17cqw 5.97cqw 0;display:flex;flex-direction:column;gap:4.97cqw}
.compliance-states .lab{margin:0 0 2.9cqw;font:700 2.98cqw/1.3 var(--ots);letter-spacing:0;text-transform:uppercase;color:var(--p-mute)}
.compliance-states .pdisc-wrap .lab{margin-bottom:1.99cqw}
.compliance-states .pcard{background:#fff;border:.36cqw solid var(--p-edge);border-radius:2.9cqw;padding:3.99cqw}
.compliance-states .badge{display:flex;align-items:center;gap:1.45cqw;padding:2cqw 0 2.9cqw;border-bottom:.25cqw solid var(--p-line);font:700 3.26cqw/1.3 var(--ots);color:var(--st);transition:border-color .3s}
.compliance-states .screen:not([data-state="ok"]) .badge{border-bottom-color:transparent}
.compliance-states .badge i{width:4.35cqw;height:4.35cqw;border-radius:50%;background:var(--st);display:grid;place-items:center;flex:none;position:relative;transition:background .3s}
.compliance-states .badge i svg{width:2.2cqw;height:2.2cqw;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;position:absolute;opacity:0;transition:opacity .2s}
.compliance-states .badge i svg.on{opacity:1}
.compliance-states .badge b{position:relative;display:block;height:1.3em;font-weight:700}
.compliance-states .badge b span{position:absolute;left:0;top:0;white-space:nowrap;opacity:0;transform:translateY(.3em);transition:opacity .25s,transform .25s}
.compliance-states .badge b span.on{opacity:1;transform:none}
.compliance-states .why{color:var(--st);font:400 3.62cqw/1.6 var(--ots);margin:0;padding:0 0 2.9cqw;border-bottom:.25cqw solid var(--p-line);overflow:hidden;transition:max-height .35s cubic-bezier(.3,.7,.3,1),padding .35s,opacity .25s}
.compliance-states .why.off{max-height:0!important;padding-block:0;opacity:0;border-bottom-width:0}
.compliance-states .tx{padding-top:2.9cqw}
.compliance-states .tx p{margin:0;font:400 3.62cqw/1.6 var(--ots);color:var(--p-ink);max-width:none;transition:opacity .22s ease,transform .22s ease}
.compliance-states .tx p.swap{opacity:0;transform:translateY(.4em)}
.compliance-states .tx u{text-decoration:none;color:var(--st);font-weight:700;background:linear-gradient(var(--st),var(--st)) no-repeat 0 100%/0 .3cqw;transition:background-size .5s ease .25s}
.compliance-states .tx p.drawn u{background-size:100% .3cqw}
.compliance-states .pdisc{border-width:.25cqw;border-radius:2.98cqw;padding:1.99cqw 3.98cqw}
.compliance-states .pdisc .row{display:flex;gap:2.98cqw;align-items:center;padding:2.98cqw 0}
.compliance-states .pdisc .row+.row{border-top:.25cqw solid var(--p-line)}
.compliance-states .pdisc i{width:4.47cqw;height:4.47cqw;border-radius:50%;background:var(--ok);display:grid;place-items:center;flex:none}
.compliance-states .pdisc i svg{width:2.24cqw;height:2.24cqw;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.compliance-states .pdisc b{display:block;font:700 3.48cqw/1.3 var(--ots);color:var(--p-ink)}
.compliance-states .pdisc small{display:block;font:400 2.98cqw/1.3 var(--ots);color:var(--p-faint);margin-top:.5cqw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.compliance-states .bottom{position:absolute;left:0;right:0;bottom:0;background:var(--p-bg);border-top:.25cqw solid var(--p-line);filter:drop-shadow(0 -.36cqw .36cqw rgba(0,0,0,.25))}
.compliance-states .acts{padding:3.98cqw 5.97cqw 0;display:flex;flex-direction:column;gap:2.98cqw}
.compliance-states .btn{height:12.9cqw;border-radius:2.98cqw;display:grid;place-items:center;font:700 3.44cqw/1 var(--ots);background:var(--p-sec);border:.27cqw solid var(--p-sec-edge);color:var(--p-sec-ink);position:relative;overflow:hidden}
.compliance-states .btn span{grid-area:1/1;opacity:0;transition:opacity .22s}
.compliance-states .btn span.on{opacity:1}
.compliance-states .btn.pri{background:var(--p-navy);border-color:var(--p-navy);color:#fff;font-size:3.98cqw}
.compliance-states .acts .pair{display:grid;grid-template-columns:1fr 1fr;gap:2.9cqw}
.compliance-states .home{height:7.2cqw;position:relative}
.compliance-states .home i{position:absolute;left:50%;top:0;transform:translateX(-50%);width:34.5cqw;height:1.24cqw;border-radius:1cqw;background:#000}
.compliance-states .screen[data-state="ok"]{--st:var(--ok)}
.compliance-states .screen[data-state="warn"]{--st:var(--warn)}
.compliance-states .screen[data-state="bad"]{--st:var(--bad)}

/* ---------- the column ---------- */
.compliance-states .col{align-self:start;display:flex;flex-direction:column}
.compliance-states .lede{margin:0 0 var(--s4,1.35rem);font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.45rem;line-height:1.12;font-weight:700;letter-spacing:0;text-transform:uppercase;color:var(--ink);text-wrap:pretty;max-width:none}
.compliance-states .states{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.compliance-states .states li{border-top:1px solid var(--hair);transition:opacity .22s ease;position:relative}
.compliance-states .states li:last-child{border-bottom:1px solid var(--hair)}
.compliance-states .states li:not(.active){opacity:.45}
.compliance-states .so{all:unset;display:flex;align-items:center;gap:12px;width:100%;cursor:pointer;padding:12px 4px}
.compliance-states .so:focus-visible{outline:2px solid var(--hi);outline-offset:-2px;border-radius:6px}
.compliance-states .so i{width:10px;height:10px;border-radius:50%;background:var(--dot);flex:none;box-shadow:0 0 0 0 var(--dot);transition:box-shadow .3s}
.compliance-states li.active .so i{box-shadow:0 0 0 4px color-mix(in srgb,var(--dot) 25%,transparent)}
.compliance-states .so h2{margin:0;font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.02rem;line-height:1.18;font-weight:700;letter-spacing:.006em;text-transform:uppercase;transition:color .2s}
.compliance-states li.active .so h2{color:var(--hi)}
.compliance-states .bar{position:absolute;left:0;bottom:-1px;height:1px;width:0;background:var(--hi);pointer-events:none}
.compliance-states li.active .bar.run{animation:cs-bar var(--dwell) linear forwards}
@keyframes cs-bar{from{width:0}to{width:100%}}
.compliance-states .detail{display:grid;width:100%;margin-top:26px;border:1px solid var(--hair);border-radius:12px;padding:24px 26px;background:var(--card);overflow:hidden;transition:height .3s cubic-bezier(.3,.7,.3,1)}
.compliance-states .detail h3{margin:0 0 8px;font-size:14.7px;line-height:1.3;font-weight:600;color:var(--hi);letter-spacing:0}
.compliance-states .detail .dsc{grid-area:1/1;align-self:start;font-weight:400;font-synthesis-weight:none;font-size:13.8px;line-height:1.68;color:var(--ink-2);max-width:none;opacity:0;transform:translateY(4px);transition:opacity .22s ease,transform .22s ease;pointer-events:none}
.compliance-states .detail .dsc.on{opacity:1;transform:none;pointer-events:auto}
.compliance-states .detail ul{margin:0;padding:12px 0 0 18px;display:flex;flex-direction:column;gap:10px}
.compliance-states .detail li{border:0;font-weight:400}
.compliance-states .detail b{color:var(--ink);font-weight:600}

  @media (max-width:820px){
.compliance-states .figure{grid-template-columns:minmax(150px,38%) 1fr;gap:20px}
.compliance-states .phone{width:100%;max-width:280px}
.compliance-states .lede{font-size:1.2rem;margin-bottom:14px}
.compliance-states .states{flex-direction:row;flex-wrap:wrap;gap:8px}
.compliance-states .states li,.compliance-states .states li:last-child{border:0;opacity:1}
.compliance-states .so{padding:8px 13px 8px 10px;border:1px solid var(--hair);border-radius:999px;background:var(--card);gap:8px;transition:background .2s,border-color .2s}
.compliance-states li.active .so{background:var(--hi);border-color:var(--hi)}
.compliance-states li.active .so i{box-shadow:none}
.compliance-states .so h2{font-size:.78rem;letter-spacing:.02em;line-height:1}
.compliance-states li.active .so h2{color:#fff}
.compliance-states .bar{display:none}
.compliance-states .detail{margin-top:16px;padding:16px 18px}
.compliance-states .detail .dsc{font-size:14px}
  }
  @media (max-width:560px){
.compliance-states .figure{grid-template-columns:1fr;gap:18px}
.compliance-states .phone{max-width:240px;margin-inline:auto}
  }
  @media (prefers-reduced-motion:reduce){.compliance-states *{transition:none!important;animation:none!important}}
`;

const CHECK = `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`;
const TRI = `<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"/></svg>`;
const OCT = TRI;

const MARKUP = `<figure class="figure" id="fig" style="margin:0 auto">
  <div class="phone">
    <div class="screen" id="screen" data-state="ok" role="img" aria-label="The audio compliance screen, shown in one of three states">
      <div class="sb"><span id="clock">2:59</span><span class="pill"></span>
        <svg viewBox="0 0 66 12" fill="var(--p-ink)"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9" y="3" width="3" height="9" rx=".8"/><rect x="13.5" y="0.5" width="3" height="11.5" rx=".8"/><path d="M23 4.6a9 9 0 0 1 12.4 0M25.6 7.4a5.3 5.3 0 0 1 7.2 0" stroke="var(--p-ink)" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="29.2" cy="10.4" r="1.4"/><rect x="42" y="1" width="20" height="10" rx="3" stroke="var(--p-ink)" stroke-width="1.2" fill="none" opacity=".4"/><rect x="43.5" y="2.5" width="17" height="7" rx="1.8" fill="#34c759"/><rect x="63" y="4" width="1.6" height="4" rx=".8" opacity=".4"/><path d="M52.6 3.2 50.2 6.4h2l-1 2.6 2.6-3.3h-2z" fill="#000"/></svg>
      </div>
      <div class="nav"><span class="back"><svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></svg></span><h4>Audio Compliance</h4></div>
      <div class="pbody">
        <div>
          <p class="lab">Transcript of your audio</p>
          <div class="pcard">
            <div class="badge"><i>${CHECK.replace("<svg", '<svg data-k="ok" class="on"')}${TRI.replace("<svg", '<svg data-k="warn"')}${OCT.replace("<svg", '<svg data-k="bad"')}</i>
              <b><span data-k="ok" class="on">Looks compliant</span><span data-k="warn">Needs review</span><span data-k="bad">Not compliant</span></b></div>
            <p class="why off" id="why"></p>
            <div class="tx"><p id="tx"></p></div>
          </div>
        </div>
        <div class="pdisc-wrap">
          <p class="lab">Shows at the end of your video</p>
          <div class="pcard pdisc">
            <div class="row"><i>${CHECK}</i><div><b>NMLS ID</b><small>NMLS #123456789</small></div></div>
            <div class="row"><i>${CHECK}</i><div><b>NMLS Consumer Access</b><small>https://www.nmlsconsumeraccess.org...</small></div></div>
          </div>
        </div>
      </div>
      <div class="bottom">
      <div class="acts">
        <div class="btn pri"><span data-k="ok warn" class="on">Looks good — Next</span><span data-k="bad">Re-record</span></div>
        <div class="pair">
          <div class="btn"><span data-k="ok warn" class="on">Re-record</span><span data-k="bad">Continue anyway</span></div>
          <div class="btn"><span data-k="ok warn bad" class="on">Cancel</span></div>
        </div>
      </div>
      <div class="home"><i></i></div>
      </div>
    </div>
  </div>
  <div class="col">
  <p class="lede">The same screen, three verdicts. What changes is what you are allowed to do next.</p>
  <ol class="states" id="states">
    <li data-state="ok" style="--dot:var(--ok)"><button class="so" type="button"><i></i><h2>Looks compliant</h2></button><span class="bar"></span>
      <div class="dsc"><span>The scan found nothing to flag. Your transcript is shown in full so you can read what you actually said, and the two disclosures that will be burned into the end of the video sit beneath it. Next is the primary action and Re-record is one tap away, because the transcript is also the first time you see your own take written down.</span></div></li>
    <li data-state="warn" style="--dot:var(--warn)"><button class="so" type="button"><i></i><h2>Needs review</h2></button><span class="bar"></span>
      <div class="dsc"><span>A tier one flag. The reason sits above the transcript and the phrases that triggered it are underlined in place, so you see the claim in its own sentence rather than in a list. These are substantiation judgments, and a licensed loan officer can decide the claim is supportable.<ul><li><b>Next stays primary.</b> The tool informs; it does not make a legal determination for you.</li><li><b>Continuing is logged.</b> Each flag is acknowledged on its own and the override is recorded as its own event, never as a clean publish.</li></ul></span></div></li>
    <li data-state="bad" style="--dot:var(--bad)"><button class="so" type="button"><i></i><h2>Not compliant</h2></button><span class="bar"></span>
      <div class="dsc"><span>A tier two flag. Guaranteeing returns, calling a loan risk-free, promising the lowest rate: these are false statements about how lending works, and no professional judgment makes them true.<ul><li><b>Re-record becomes the primary action.</b> The button that was Next now asks for a new take, and continuing drops to a secondary button.</li><li><b>The block lives on the server.</b> A button on the phone is not the gate, so a crafted request cannot get around it and the audit trail stays honest.</li></ul></span></div></li>
  </ol>
  <div class="detail" id="detail"></div>
  </div>
</figure>`;

const TX: Record<string, { why: string; text: string }> = {
  ok: {
    why: "",
    text: "Refinancing your mortgage into a shorter term is a smart strategy for building wealth quietly. While your monthly payment might increase, a larger portion of each payment goes directly toward reducing your loan balance instead of paying interest. This means you pay off your home faster and save a significant amount on interest over the life of the loan. It's a powerful way to accelerate your financial freedom and build equity more quickly.",
  },
  warn: {
    why: "Some phrases in your recording might be interpreted as guaranteeing results or promising low rates. We recommend reviewing them to ensure full industry compliance.",
    text: "Refinancing your mortgage into a shorter term is a smart strategy for building wealth quietly. While we can <u>almost guarantee savings</u> over the long run, it is considered <u>practically risk-free</u> since a larger portion of each payment goes directly toward reducing your loan balance instead of paying interest. We also want to find you <u>the absolute lowest rate</u> available.",
  },
  bad: {
    why: "Guaranteeing returns, claiming \"risk-free\", or promising absolute lowest rates violates industry mortgage advertising standards.",
    text: "I <u>guarantee you'll save</u> thousands by refinancing. This is a <u>risk-free investment</u> that will definitely increase your home value. You're <u>guaranteed the lowest rate</u> available.",
  },
};

export default function ComplianceStates() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- injected
       markup, so one assertion here beats a cast at every lookup. */
    const q = (sel: string): any => host.querySelector(sel);
    (function () {
      const screen = q("#screen"), why = q("#why"), tx = q("#tx"), detail = q("#detail"), list = q("#states");
      const items: HTMLLIElement[] = [...list.querySelectorAll("li[data-state]")];
      const keyed: HTMLElement[] = [...screen.querySelectorAll("[data-k]")];
      const ORDER = ["ok", "warn", "bad"];
      const DWELL = 5200;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let current = "ok", swapTimer = 0, auto = !reduced, cycle = 0;

      items.forEach((li) => {
        const d = li.querySelector(".dsc") as HTMLElement; d.dataset.state = li.dataset.state;
        const h = document.createElement("h3"); h.textContent = li.querySelector("h2")!.textContent;
        d.insertBefore(h, d.firstChild); detail.appendChild(d);
      });
      const dscs: HTMLElement[] = [...detail.querySelectorAll(".dsc")];

      function sizeDetail() {
        const a = dscs.find((d) => d.classList.contains("on"));
        if (a) detail.style.height = a.offsetHeight + 48 + "px";
      }
      function setText(id: string) {
        const s = TX[id];
        tx.classList.add("swap"); tx.classList.remove("drawn");
        clearTimeout(swapTimer);
        swapTimer = window.setTimeout(() => {
          tx.innerHTML = s.text;
          tx.classList.remove("swap");
          requestAnimationFrame(() => tx.classList.add("drawn"));
        }, reduced ? 0 : 220);
        why.textContent = s.why;
        why.style.maxHeight = s.why ? "40cqw" : "0";
        why.classList.toggle("off", !s.why);
      }
      function apply(id: string, fromUser: boolean) {
        if (fromUser) { auto = false; items.forEach((l) => l.querySelector(".bar")!.classList.remove("run")); }
        if (id === current && fromUser) return;
        current = id;
        screen.dataset.state = id;
        keyed.forEach((el) => el.classList.toggle("on", (el.dataset.k || "").split(" ").includes(id)));
        items.forEach((l) => {
          const on = l.dataset.state === id; l.classList.toggle("active", on);
          const bar = l.querySelector(".bar") as HTMLElement;
          bar.classList.remove("run");
          if (on && auto) { void bar.offsetWidth; bar.style.setProperty("--dwell", DWELL + "ms"); bar.classList.add("run"); }
        });
        dscs.forEach((d) => d.classList.toggle("on", d.dataset.state === id));
        setText(id);
        sizeDetail();
      }
      cleanups.push(() => clearTimeout(swapTimer));

      items.forEach((li) => {
        const id = li.dataset.state as string;
        li.addEventListener("click", () => apply(id, true));
      });
      screen.addEventListener("pointerdown", () => apply(ORDER[(ORDER.indexOf(current) + 1) % 3], true));

      /* Cycle at rest, only while the figure is on screen, until first touch. */
      let tick = 0;
      function startCycle() {
        stopCycle();
        if (!auto) return;
        tick = window.setInterval(() => {
          if (!auto) { stopCycle(); return; }
          cycle = (ORDER.indexOf(current) + 1) % 3; apply(ORDER[cycle], false);
        }, DWELL);
      }
      function stopCycle() { if (tick) { clearInterval(tick); tick = 0; } }
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { startCycle(); if (auto) apply(current, false); } else stopCycle(); });
      }, { threshold: 0.35 });
      io.observe(host); cleanups.push(() => { io.disconnect(); stopCycle(); });

      /* Match the capture anatomy's phone on the same page: same height, this
         frame's own aspect. Falls back to the CSS width when it is absent. */
      const phone = q(".phone") as HTMLElement;
      const other = document.querySelector(".capture-anatomy .phone") as HTMLElement | null;
      function syncSize() {
        if (!other) return;
        /* Below 820 both figures hand sizing to their CSS (100% of the grid
           cell, capped), which keeps the phone inside its column. */
        if (innerWidth <= 820) { phone.style.width = ""; phone.style.maxWidth = ""; return; }
        const hgt = other.getBoundingClientRect().height;
        if (hgt > 0) { phone.style.width = Math.round(hgt * 552 / 1199) + "px"; phone.style.maxWidth = "none"; }
      }
      if (other) {
        const ro = new ResizeObserver(() => { syncSize(); sizeDetail(); });
        ro.observe(other); cleanups.push(() => ro.disconnect());
      }
      const onResize = () => { syncSize(); sizeDetail(); };
      addEventListener("resize", onResize); cleanups.push(() => removeEventListener("resize", onResize));
      syncSize();

      const clock = q("#clock");
      function clk() { const d = new Date(); const h = d.getHours() % 12 || 12; clock.textContent = h + ":" + String(d.getMinutes()).padStart(2, "0"); }
      clk(); const ct = setInterval(clk, 1000); cleanups.push(() => clearInterval(ct));

      apply("ok", false);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeDetail);
    })();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="compliance-states" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
