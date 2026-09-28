"use client";

import { useEffect, useRef } from "react";

/**
 * Own the Script's Audio & Captions screen (Figma eqFCKjSyKAQP5vpD9cB2eb,
 * node 1574:790), with the caption placement working.
 *
 * At rest, while in view, a finger drags the caption up the frame, then pulls
 * its corner in to resize it, holds, and eases back. The first touch stops the
 * loop for good and hands the caption to the viewer: drag the box to move it,
 * drag a corner handle to resize it.
 *
 * Same contract as ComplianceStates: markup and styles are injected strings,
 * every selector is scoped under .caption-placement, and behaviour lives in
 * one useEffect with a cleanups list. All phone sizes are Figma px through
 * u(), so the frame scales as one piece (1cqw = 5.2346 design px).
 */

const W = 523.46;
const u = (px: number) => `${((px * 100) / W).toFixed(3)}cqw`;

/* Caption box geometry in the video's own design px. */
const VW = 213, VH = 377.59, BW = 208.16, BH = 101.66;
const REST = { x: 0.61, y: 211.18, s: 1 };

const IMG = "/work/own-the-script/caption-bg.webp";

const STYLES = `.caption-placement{margin-block:0 var(--s6,3rem);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.caption-placement *{box-sizing:border-box}
.caption-placement .cp-panel{max-width:52rem;background:color-mix(in srgb,var(--paper-sunk,#e8e8ed) 45%,var(--paper,#f5f5f7));padding:clamp(28px,5vw,56px) 16px clamp(20px,3vw,32px);display:flex;flex-direction:column;align-items:center;gap:18px}
.caption-placement .cp-hint{margin:0;font-size:.7rem;line-height:1.5;color:var(--muted,#86868b);text-align:center;max-width:none}

.caption-placement .phone{position:relative;width:min(290px,72vw);container-type:inline-size;aspect-ratio:523.46/1099;
  --k:calc(100cqw / 523.46);
  --serif:var(--font-ots-serif),"Merriweather",Georgia,serif; --ots:var(--font-ots-sans),"Merriweather Sans",system-ui,sans-serif;
  --cap:var(--font-ots-cap),"Montserrat",system-ui,sans-serif;
  background:#fff;border-radius:${u(72.357)};padding:${u(12.33)};box-shadow:0 ${u(14)} ${u(40)} rgba(3,6,20,.12),0 0 0 ${u(1)} rgba(3,6,20,.06);-webkit-text-size-adjust:none;text-size-adjust:none}
.caption-placement .scr{position:relative;height:100%;background:#f3f5f9;border-radius:${u(60)};overflow:hidden;color:#101322;font-family:var(--ots)}
.caption-placement .sb{position:relative;height:${u(55)};display:flex;align-items:center;justify-content:space-between;padding:${u(6)} ${u(46)} 0 ${u(58)};font:700 ${u(19)}/1 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;font-variant-numeric:tabular-nums;color:#000}
.caption-placement .sb .pill{position:absolute;left:${u(174.57)};top:${u(13.91)};width:${u(145.47)};height:${u(37.95)};background:#000;border-radius:${u(30)}}
.caption-placement .sb svg{height:${u(15)};width:auto;display:block}
.caption-placement .hd{padding:${u(15)} ${u(29.41)};display:flex;flex-direction:column;gap:${u(30)}}
.caption-placement .nv{display:flex;justify-content:space-between;align-items:center}
.caption-placement .bk{width:${u(50.3)};height:${u(50.3)};border-radius:50%;background:#fff;display:grid;place-items:center;filter:drop-shadow(0 ${u(2.5)} ${u(2.5)} rgba(0,0,0,.02))}
.caption-placement .bk svg{width:${u(25.15)};height:${u(25.15)};stroke:#101322;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.caption-placement .cn{height:${u(50.32)};padding:0 ${u(32)};border-radius:${u(16.46)};background:#fff;display:flex;align-items:center;font:700 ${u(17.156)}/1 var(--ots);color:#4b5563}
.caption-placement .tt{display:flex;flex-direction:column;gap:${u(5.03)}}
.caption-placement .tt .ey{margin:0;font:700 ${u(17.607)}/1.25 var(--ots);letter-spacing:${u(1.2576)};text-transform:uppercase;color:#9ca3af}
.caption-placement .tt .h{margin:0;font:700 ${u(40)}/${u(55.336)} var(--serif);color:#111827;letter-spacing:0;text-transform:none}
.caption-placement .bd{padding:0 ${u(30)};display:flex;flex-direction:column;gap:${u(30)}}
.caption-placement .grp{display:flex;flex-direction:column;gap:${u(15.09)}}
.caption-placement .lb{margin:0;font:700 ${u(15.09)}/1.25 var(--ots);color:#4b5563;text-transform:uppercase;letter-spacing:0}
.caption-placement .area{display:flex;justify-content:center}
.caption-placement .stage{position:relative;width:${u(VW)};height:${u(VH)};touch-action:none}
.caption-placement .vid{position:absolute;inset:0;border-radius:${u(19.364)};overflow:hidden;background:#2b2e35 url(${IMG}) center/100% 100% no-repeat}
.caption-placement .cbox{position:absolute;left:calc(var(--x) * var(--k));top:calc(var(--y) * var(--k));width:calc(${BW} * var(--s) * var(--k));height:calc(${BH} * var(--s) * var(--k));border:calc(1.21 * var(--k)) dashed #fff;cursor:grab}
.caption-placement .cbox.grab{cursor:grabbing}
.caption-placement .cbox .t{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;font:800 calc(20.574 * var(--s) * var(--k))/1.2353 var(--cap);color:#fff;text-align:center;white-space:nowrap;letter-spacing:0;text-transform:uppercase;
  text-shadow:0 0 calc(1.2 * var(--k)) rgba(0,0,0,.85),0 calc(.6 * var(--k)) calc(2 * var(--k)) rgba(0,0,0,.5)}
.caption-placement .cbox .t span{display:block}
.caption-placement .cbox .t em{font-style:normal;color:#ffc468}
.caption-placement .hdl{position:absolute;width:${u(10)};height:${u(10)};background:#fff;border:${u(1.5)} solid #1e2b6b;border-radius:${u(2)};cursor:nwse-resize}
.caption-placement .hdl::after{content:"";position:absolute;inset:-${u(10)}}
.caption-placement .hdl[data-h="tl"]{left:${u(-3.82)};top:${u(-4.73)}}
.caption-placement .hdl[data-h="tr"]{right:${u(-6.02)};top:${u(-4.73)};cursor:nesw-resize}
.caption-placement .hdl[data-h="br"]{right:${u(-6.02)};bottom:${u(-5.61)}}
.caption-placement .fing{position:absolute;left:calc(var(--fx) * var(--k));top:calc(var(--fy) * var(--k));width:${u(30)};height:${u(30)};margin:${u(-15)} 0 0 ${u(-15)};border-radius:50%;background:rgba(255,255,255,.5);border:${u(1.6)} solid rgba(255,255,255,.95);box-shadow:0 ${u(2)} ${u(8)} rgba(0,0,0,.35);opacity:var(--fo);transform:scale(calc(1 - .18 * var(--fp)));pointer-events:none}

.caption-placement .sty{display:flex;gap:${u(10)};align-items:center;overflow:hidden;width:${u(433)}}
.caption-placement .scard{flex:none;width:${u(165)};background:#fff;border-radius:${u(16)};overflow:hidden}
.caption-placement .tile{background:#3f4452;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--cap);white-space:nowrap;line-height:1.22}
.caption-placement .c1{border:${u(4)} solid #007bff}
.caption-placement .c1 .tile{height:${u(100)};border:${u(1)} solid #fff;border-radius:${u(14)};gap:${u(2)};font-weight:800}
.caption-placement .c1 .a{color:#f4c542;font-size:${u(34.5)}}
.caption-placement .c1 .b{color:#fff;font-size:${u(22.5)}}
.caption-placement .c2{border:${u(2)} solid #1e2b6b}
.caption-placement .c2 .tile{height:${u(100)};border-radius:${u(10)}}
.caption-placement .c2 .pop{background:#c66643;border-radius:${u(6.847)};padding:${u(10.27)} ${u(8)};display:flex;flex-direction:column;align-items:center;gap:${u(1.71)};color:#fff;font-weight:800;font-size:${u(20.541)}}
.caption-placement .c3{border:${u(1.5)} solid #d9dbde}
.caption-placement .c3 .tile{height:${u(101)};border-radius:${u(10)};gap:${u(2)};font-size:${u(24.474)}}
.caption-placement .c3 .a{color:#3ddc84;font-weight:800}
.caption-placement .c3 .b{color:#fff;font-weight:700}

.caption-placement .tc{background:#fff;border:${u(1.225)} solid #d9dbde;border-radius:${u(14.705)};padding:${u(19.607)};height:${u(208)};overflow:hidden}
.caption-placement .ok{display:flex;align-items:center;gap:${u(7.35)};padding:${u(9.8)} 0 ${u(14.7)};border-bottom:${u(1.225)} solid #e5e7eb;font:700 ${u(15.93)}/1.25 var(--ots);color:#0f7643}
.caption-placement .ok i{width:${u(19.6)};height:${u(22.06)};border-radius:${u(11)};background:#0f7643;display:grid;place-items:center}
.caption-placement .ok svg{width:${u(9.8)};height:${u(9.8)};stroke:#fff;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.caption-placement .tx{margin:0;padding-top:${u(14.7)};font:400 ${u(20.54)}/${u(30.8)} var(--ots);color:#101322;max-width:none}

.caption-placement .bot{position:absolute;left:${u(1.2)};right:${u(1.2)};bottom:0;height:${u(111.72)};background:#fcfcfc;border-radius:0 0 ${u(60)} ${u(60)};box-shadow:0 ${u(-1)} ${u(1)} rgba(0,0,0,.04);padding:${u(24)} ${u(30)};display:flex;align-items:center}
.caption-placement .nx{flex:1;height:${u(63.72)};border-radius:${u(14.705)};background:#1e2b6b;display:grid;place-items:center;font:700 ${u(19.607)}/1 var(--ots);color:#fff}
@media (prefers-reduced-motion:reduce){.caption-placement .fing{display:none}}
`;

const MARKUP = `<div class="cp-panel">
  <div class="phone" role="img" aria-label="The Audio and Captions screen. The caption is dragged to a new position on the video, then resized from its corner.">
    <div class="scr">
      <div class="sb"><span data-clock>4:01</span><span class="pill"></span>
        <svg viewBox="0 0 66 12" fill="#000"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9" y="3" width="3" height="9" rx=".8"/><rect x="13.5" y="0.5" width="3" height="11.5" rx=".8"/><path d="M23 4.6a9 9 0 0 1 12.4 0M25.6 7.4a5.3 5.3 0 0 1 7.2 0" stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="29.2" cy="10.4" r="1.4"/><rect x="42" y="1" width="20" height="10" rx="3" stroke="#000" stroke-width="1.2" fill="none" opacity=".4"/><rect x="43.5" y="2.5" width="17" height="7" rx="1.8" fill="#34c759"/><rect x="63" y="4" width="1.6" height="4" rx=".8" opacity=".4"/><path d="M52.6 3.2 50.2 6.4h2l-1 2.6 2.6-3.3h-2z" fill="#000"/></svg>
      </div>
      <div class="hd">
        <div class="nv"><span class="bk"><svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></svg></span><span class="cn">Cancel</span></div>
        <div class="tt"><p class="ey">New Video</p><p class="h">Audio &amp; Captions</p></div>
      </div>
      <div class="bd">
        <div class="grp">
          <p class="lb">Caption style &amp; placement</p>
          <div class="area"><div class="stage" data-stage>
            <div class="vid"></div>
            <div class="cbox" data-box>
              <div class="t"><span>What <em>happens</em></span><span>to your</span><span>earnest</span><span>money?</span></div>
              <i class="hdl" data-h="tl"></i><i class="hdl" data-h="tr"></i><i class="hdl" data-h="br"></i>
            </div>
            <div class="fing" data-finger></div>
          </div></div>
        </div>
        <div class="sty">
          <div class="scard c1"><div class="tile"><span class="a">RATES</span><span class="b">DROPPED</span></div></div>
          <div class="scard c2"><div class="tile"><div class="pop"><span>RATES</span><span>DROPPED</span></div></div></div>
          <div class="scard c3"><div class="tile"><span class="a">RATES</span><span class="b">DROPPED</span></div></div>
        </div>
        <div class="grp">
          <p class="lb">Transcript of your audio</p>
          <div class="tc"><div class="ok"><i><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></i>Looks compliant</div>
            <p class="tx">Refinancing your mortgage into a shorter term is a smart strategy for building wealth quietly. While your monthly payment might increase, a larger portion of each payment goes directly toward reducing your loan balance instead of paying interest.</p></div>
        </div>
      </div>
      <div class="bot"><div class="nx">Next</div></div>
    </div>
  </div>
  <p class="cp-hint">Drag the caption to move it. Drag a corner to resize it.</p>
</div>`;

/* One loop of the demo, in design px of the video. fo = finger opacity,
   fp = finger pressed. Every segment eases in and out. */
type KF = { t: number; x: number; y: number; s: number; fx: number; fy: number; fo: number; fp: number };
const cx = (x: number, s: number) => x + (BW * s) / 2;
const cy = (y: number, s: number) => y + (BH * s) / 2;
const UP = 34, SM = 0.7;
const K: KF[] = [
  { t: 0, ...REST, fx: cx(REST.x, 1) + 24, fy: cy(REST.y, 1) + 34, fo: 0, fp: 0 },
  { t: 700, ...REST, fx: cx(REST.x, 1) + 24, fy: cy(REST.y, 1) + 34, fo: 0, fp: 0 },
  { t: 1100, ...REST, fx: cx(REST.x, 1), fy: cy(REST.y, 1), fo: 1, fp: 0 },
  { t: 1260, ...REST, fx: cx(REST.x, 1), fy: cy(REST.y, 1), fo: 1, fp: 1 },
  { t: 2400, x: REST.x, y: UP, s: 1, fx: cx(REST.x, 1), fy: cy(UP, 1), fo: 1, fp: 1 },
  { t: 2560, x: REST.x, y: UP, s: 1, fx: cx(REST.x, 1), fy: cy(UP, 1), fo: 1, fp: 0 },
  { t: 3000, x: REST.x, y: UP, s: 1, fx: REST.x + BW, fy: UP + BH, fo: 1, fp: 0 },
  { t: 3160, x: REST.x, y: UP, s: 1, fx: REST.x + BW, fy: UP + BH, fo: 1, fp: 1 },
  { t: 4100, x: REST.x, y: UP, s: SM, fx: REST.x + BW * SM, fy: UP + BH * SM, fo: 1, fp: 1 },
  { t: 4260, x: REST.x, y: UP, s: SM, fx: REST.x + BW * SM, fy: UP + BH * SM, fo: 1, fp: 0 },
  { t: 4600, x: REST.x, y: UP, s: SM, fx: REST.x + BW * SM + 18, fy: UP + BH * SM + 26, fo: 0, fp: 0 },
  { t: 6000, x: REST.x, y: UP, s: SM, fx: REST.x + BW * SM + 18, fy: UP + BH * SM + 26, fo: 0, fp: 0 },
  { t: 6800, ...REST, fx: cx(REST.x, 1) + 24, fy: cy(REST.y, 1) + 34, fo: 0, fp: 0 },
];
const LOOP = K[K.length - 1].t;
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function CaptionPlacement() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    const stage = host.querySelector("[data-stage]") as HTMLElement;
    const box = host.querySelector("[data-box]") as HTMLElement;
    const finger = host.querySelector("[data-finger]") as HTMLElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = { ...REST };
    function paint() {
      box.style.setProperty("--x", String(st.x));
      box.style.setProperty("--y", String(st.y));
      box.style.setProperty("--s", String(st.s));
    }
    function paintFinger(fx: number, fy: number, fo: number, fp: number) {
      finger.style.setProperty("--fx", String(fx));
      finger.style.setProperty("--fy", String(fy));
      finger.style.setProperty("--fo", String(fo));
      finger.style.setProperty("--fp", String(fp));
      box.classList.toggle("grab", fp > 0.5);
    }
    paint();
    paintFinger(0, 0, 0, 0);

    /* The demo loop. Runs only while in view, and never again after a touch. */
    let auto = !reduced, raf = 0, elapsed = 0, last = 0;
    function frame(now: number) {
      if (last) elapsed = (elapsed + (now - last)) % LOOP;
      last = now;
      let i = 0;
      while (i < K.length - 2 && K[i + 1].t <= elapsed) i++;
      const a = K[i], b = K[i + 1];
      const e = ease(clamp((elapsed - a.t) / (b.t - a.t), 0, 1));
      const m = (p: number, q: number) => p + (q - p) * e;
      st.x = m(a.x, b.x); st.y = m(a.y, b.y); st.s = m(a.s, b.s);
      paint();
      paintFinger(m(a.fx, b.fx), m(a.fy, b.fy), m(a.fo, b.fo), m(a.fp, b.fp));
      raf = requestAnimationFrame(frame);
    }
    function play() { if (auto && !raf) { last = 0; raf = requestAnimationFrame(frame); } }
    function pause() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play() : pause())), { threshold: 0.35 });
    io.observe(stage);
    cleanups.push(() => { io.disconnect(); pause(); });

    /* Direct manipulation, in the video's design px. */
    let drag: null | { mode: string; px: number; py: number; x: number; y: number; s: number } = null;
    const scale = () => VW / stage.getBoundingClientRect().width;
    function down(ev: PointerEvent) {
      if (auto) { auto = false; pause(); paintFinger(0, 0, 0, 0); }
      const t = ev.target as HTMLElement;
      const h = t.closest("[data-h]") as HTMLElement | null;
      if (!h && !t.closest("[data-box]")) return;
      ev.preventDefault();
      stage.setPointerCapture(ev.pointerId);
      drag = { mode: h ? (h.dataset.h as string) : "move", px: ev.clientX, py: ev.clientY, x: st.x, y: st.y, s: st.s };
      box.classList.add("grab");
    }
    function move(ev: PointerEvent) {
      if (!drag) return;
      const k = scale(), dx = (ev.clientX - drag.px) * k, dy = (ev.clientY - drag.py) * k;
      const w0 = BW * drag.s, h0 = BH * drag.s;
      if (drag.mode === "move") {
        st.x = clamp(drag.x + dx, 0, VW - w0);
        st.y = clamp(drag.y + dy, 0, VH - h0);
      } else if (drag.mode === "br") {
        st.s = clamp((w0 + dx) / BW, 0.45, Math.min(1, (VW - drag.x) / BW, (VH - drag.y) / BH));
      } else if (drag.mode === "tr") {
        st.s = clamp((w0 + dx) / BW, 0.45, Math.min(1, (VW - drag.x) / BW, (drag.y + h0) / BH));
        st.y = drag.y + h0 - BH * st.s;
      } else {
        st.s = clamp((w0 - dx) / BW, 0.45, Math.min(1, (drag.x + w0) / BW, (drag.y + h0) / BH));
        st.x = drag.x + w0 - BW * st.s;
        st.y = drag.y + h0 - BH * st.s;
      }
      paint();
    }
    function up() { drag = null; box.classList.remove("grab"); }
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    cleanups.push(() => {
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
    });

    const clock = host.querySelector("[data-clock]") as HTMLElement;
    function clk() { const d = new Date(); clock.textContent = (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"); }
    clk(); const ct = setInterval(clk, 1000); cleanups.push(() => clearInterval(ct));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="caption-placement" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
