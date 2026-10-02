/**
 * Shared engine for the two Efficiently design book figures, BookDrop and
 * ItemDetails. Both are the real Books screen (Figma 9bdjmhedvlcW4wU5TALxr7,
 * frames 55026:99643 filled, 55028:100913 empty, 55036:99615 row hover),
 * exported at 2x and laid out at 1366x768 design px, scaled to fit.
 *
 * A scripted cursor drives each figure. It moves on a minimum-jerk speed
 * curve along a slight arc and overshoots a touch before settling, which is
 * how a hand moves a mouse. Hover, drop targets and button states react to
 * where the cursor actually is each frame rather than being timed.
 *
 * The room list is cut into strips so the hover state can move like the real
 * layout: the card grows 16px, its contents slide 8px into the padding and
 * everything below moves down together.
 *
 * Every class is prefixed bk- under .bk, so nothing reaches globals.css.
 */

export const IMG = "/work/design-finish-selection/book/";
export const W = 1366;

export type Pt = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
export const inside = (p: Pt, r: Rect) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
/* Minimum-jerk: the bell-shaped speed curve of a real hand. */
export const mj = (t: number) => t * t * t * (10 - 15 * t + 6 * t * t);

export const STYLES = `.bk{--hi:#0071E3;--app:var(--font-eff-sans,"Open Sans"),system-ui,sans-serif;margin-block:24px var(--s5,2rem);max-width:none;width:80%}
@media (max-width:767px){.bk{width:auto}}
.bk *{box-sizing:border-box}
.bk .bk-stage{position:relative;width:100%;aspect-ratio:1366/768;overflow:hidden;border-radius:8px;background:#1e1f21;box-shadow:0 0 0 1px rgba(29,29,31,.1);cursor:pointer;-webkit-tap-highlight-color:transparent}
.bk .bk-inner{position:absolute;left:0;top:0;width:1366px;height:768px;transform-origin:0 0;font-family:var(--app);-webkit-font-smoothing:antialiased;color:#fff}
.bk .bk-inner img{max-width:none;display:block}
.bk .bk-full{position:absolute;inset:0;width:1366px;height:768px}
.bk .bk-slot{position:absolute;width:184px;height:169px}
.bk .bk-fill{opacity:0;transform-origin:50% 50%}

/* room list strips */
.bk .bk-rl{position:absolute;left:0;top:228px;width:336px;height:540px;overflow:hidden;background:#222426;pointer-events:none}
.bk .bk-rl>*{position:absolute;max-width:none;display:block;transition:transform .28s cubic-bezier(.2,.8,.2,1),opacity .2s ease,height .28s cubic-bezier(.2,.8,.2,1)}
.bk .bk-rl .bk-hd,.bk .bk-rl .bk-hh{width:272px;height:48px;left:24px}
.bk .bk-rl .bk-hh{opacity:0}
.bk .bk-rl .bk-cd{left:24px;width:288px;height:48px;background:#383838;border:1px solid #484b4e;border-radius:8px;box-shadow:0 4px 4px rgba(0,0,0,.25);opacity:0}
.bk .bk-rl .bk-gr{left:4px;width:16px;height:20px;opacity:0}
.bk .bk-rl.bk-lift .bk-gr{opacity:0!important}
.bk .bk-rl .bk-pin{left:120px;height:16px;display:flex;align-items:center;gap:4px;padding:0 6px 0 4px;border-radius:4px;background:rgba(46,158,99,.2);color:#8fdcb0;font:600 10px/1 var(--app);white-space:nowrap;opacity:0;transform-origin:0 50%}
.bk .bk-rl .bk-pin.i1{top:13px}
.bk .bk-rl .bk-pin.i2{top:275px}
.bk .bk-rl .bk-pin.on{opacity:1}
.bk .bk-rl .bk-b1{left:0;top:60px;width:336px;height:214px}
.bk .bk-rl .bk-b2{left:0;top:322px;width:336px;height:218px}
.bk .bk-rl .i1{top:12px}
.bk .bk-rl .bk-gr.i1{top:34px}
.bk .bk-rl .i2{top:274px}
.bk .bk-rl .bk-gr.i2{top:296px}
.bk .bk-rl[data-h="1"] .bk-hd.i1,.bk .bk-rl[data-h="1"] .bk-hh.i1,.bk .bk-rl[data-h="2"] .bk-hd.i2,.bk .bk-rl[data-h="2"] .bk-hh.i2,
.bk .bk-rl[data-h="1"] .bk-pin.i1,.bk .bk-rl[data-h="2"] .bk-pin.i2{transform:translate(8px,8px)}
.bk .bk-rl[data-h="1"] .bk-hd.i1,.bk .bk-rl[data-h="2"] .bk-hd.i2{opacity:0}
.bk .bk-rl[data-h="1"] .bk-hh.i1,.bk .bk-rl[data-h="2"] .bk-hh.i2,.bk .bk-rl[data-h="1"] .bk-gr.i1,.bk .bk-rl[data-h="2"] .bk-gr.i2{opacity:1}
.bk .bk-rl[data-h="1"] .bk-cd.i1,.bk .bk-rl[data-h="2"] .bk-cd.i2{opacity:1;height:64px}
.bk .bk-rl[data-h="1"] .bk-b1,.bk .bk-rl[data-h="1"] .i2,.bk .bk-rl[data-h="1"] .bk-b2,.bk .bk-rl[data-h="2"] .bk-b2{transform:translateY(16px)}

/* cursor */
.bk .bk-cur{position:absolute;left:0;top:0;width:26px;height:26px;pointer-events:none;will-change:transform}
.bk .bk-cur svg{position:absolute;inset:0;width:26px;height:26px;opacity:0;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.45));transition:transform .09s ease}
.bk .bk-cur[data-m="arrow"] .c-arrow,.bk .bk-cur[data-m="open"] .c-open,.bk .bk-cur[data-m="grab"] .c-grab,.bk .bk-cur[data-m="point"] .c-point,.bk .bk-cur[data-m="text"] .c-text{opacity:1}
.bk .bk-cur.click svg{transform:scale(.86)}

/* caption and replay */
.bk .bk-bar{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-top:.65rem}
.bk .bk-cap{font-size:.7rem;line-height:1.55;color:var(--muted,#86868b);max-width:34rem}
.bk .bk-replay{flex:none;font:500 .7rem/1 var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink-soft,#424245);background:transparent;border:1px solid rgba(29,29,31,.16);border-radius:999px;padding:.45rem .8rem;cursor:pointer}
.bk .bk-replay:hover{border-color:rgba(29,29,31,.32)}
.bk .bk-replay:focus-visible{outline:2px solid var(--hi);outline-offset:2px}

/* try it yourself: the next thing to click */
.bk .bk-hot{position:absolute;left:0;top:0;width:0;height:0;opacity:0;pointer-events:none;z-index:20;transition:opacity .2s}
.bk .bk-hot.on{opacity:1}
.bk .bk-hot i{position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;border:2.5px solid #ff6a3d;background:rgba(255,106,61,.16);animation:bkping 1.6s ease-out infinite}
.bk .bk-hot i+i{animation-delay:.8s}
.bk .bk-hot b{position:absolute;left:-6px;top:-6px;width:12px;height:12px;border-radius:50%;background:#ff6a3d;box-shadow:0 0 0 3px #fff,0 2px 6px rgba(0,0,0,.35)}
.bk .bk-hot span{position:absolute;left:20px;top:-40px;white-space:nowrap;background:#1d1d1f;color:#fff;font:600 14px/1 var(--app);padding:9px 12px;border-radius:7px;box-shadow:0 8px 20px rgba(0,0,0,.35)}
.bk .bk-hot.flip span{left:auto;right:20px}
.bk .bk-hot.low span{top:22px}
.bk .bk-hot.miss b{animation:bkshake .35s}
@keyframes bkping{0%{transform:scale(.55);opacity:1}100%{transform:scale(2.3);opacity:0}}
@keyframes bkshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.bk .bk-ctl{flex:none;display:flex;gap:.5rem;align-items:center}
.bk .bk-mode{display:inline-flex;padding:2px;border-radius:999px;border:1px solid rgba(29,29,31,.16)}
.bk .bk-mode button{font:500 .7rem/1 var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink-soft,#424245);background:transparent;border:0;border-radius:999px;padding:.4rem .75rem;cursor:pointer}
.bk .bk-mode button.on{background:var(--ink,#1d1d1f);color:#fff}
.bk .bk-guide{display:none;align-items:center;gap:.6rem;margin-top:.5rem;font:500 .72rem/1.4 var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink-soft,#424245)}
.bk .bk-guide.on{display:flex}
.bk .bk-guide i{width:9px;height:9px;border-radius:50%;background:#ff6a3d;flex:none}
.bk .bk-guide button{margin-left:auto;font:inherit;color:inherit;background:transparent;border:1px solid rgba(29,29,31,.16);border-radius:999px;padding:.35rem .7rem;cursor:pointer}
.bk .bk-pz{position:absolute;inset:0;z-index:29;display:grid;place-items:center;background:rgba(15,16,18,.25);opacity:0;pointer-events:none;transition:opacity .2s}
.bk .bk-pz.on{opacity:1}
.bk .bk-pz span{display:flex;align-items:center;gap:.5rem;padding:.7rem 1.1rem .7rem .85rem;border-radius:999px;background:rgba(29,29,31,.88);color:#fff;font:600 .8rem/1 var(--font-body),"Inter Tight",system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.bk .bk-mode button{position:relative;overflow:hidden}
.bk .bk-mode button[data-m="watch"].on{background:#0071e3;color:#fff}
@media (prefers-reduced-motion:reduce){.bk *{transition:none!important}.bk .bk-replay,.bk .bk-ctl{display:none}}`;

const HAND_OPEN = `<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`;
const HAND_GRAB = `<path d="M18 11.5V9a2 2 0 0 0-4 0v1.4"/><path d="M14 10V8a2 2 0 0 0-4 0v2"/><path d="M10 9.9V9a2 2 0 0 0-4 0v5"/><path d="M6 14a2 2 0 0 0-4 0"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/>`;
const HAND_POINT = `<path d="M10 9.5V4a2 2 0 0 0-4 0v10"/><path d="M14 10V9a2 2 0 0 0-4 0v1"/><path d="M18 11v-1a2 2 0 0 0-4 0"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L6 14"/>`;
const hand = (cls: string, lines: string, fill: string) =>
  `<svg class="${cls}" viewBox="-1 -1 26 26" fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff" stroke-width="5">${lines}</g><path d="${fill}" fill="#fff"/><g stroke="#111" stroke-width="1.6">${lines}</g></svg>`;

export const CURSOR = `<div class="bk-cur" data-m="arrow">
<svg class="c-arrow" viewBox="0 0 26 26"><path d="M3 2 L3 21 L8.2 16.4 L11.6 24.2 L15 22.8 L11.7 15.2 L18.6 15.2 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>
${hand("c-open", HAND_OPEN, "M7 15V6a2 2 0 0 1 4 0V4a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v2a2 2 0 0 1 3 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8Z")}
${hand("c-point", HAND_POINT, "M6 14V4a2 2 0 0 1 4 0v5a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8Z")}
<svg class="c-text" viewBox="-1 -1 26 26" fill="none" stroke-linecap="round"><path d="M8.5 3.5c2 0 3.5.6 3.5 2v13c0 1.4-1.5 2-3.5 2M15.5 3.5c-2 0-3.5.6-3.5 2v13c0 1.4 1.5 2 3.5 2M10 12h4" stroke="#fff" stroke-width="4"/><path d="M8.5 3.5c2 0 3.5.6 3.5 2v13c0 1.4-1.5 2-3.5 2M15.5 3.5c-2 0-3.5.6-3.5 2v13c0 1.4 1.5 2 3.5 2M10 12h4" stroke="#111" stroke-width="1.5"/></svg>
${hand("c-grab", HAND_GRAB, "M2 14a2 2 0 0 1 4 0V9a2 2 0 0 1 4 0V8a2 2 0 0 1 4 0V9a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8Z")}
</div>`;

const CHECK = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

/* The room list as strips: two item rows, their hover cards and grips, and
   the list below each row, which moves down when a row above it grows. */
export const RAIL = `<div class="bk-rl">
<img class="bk-b1" src="${IMG}list-1.webp" alt=""><img class="bk-b2" src="${IMG}list-2.webp" alt="">
<div class="bk-cd i1"></div><div class="bk-cd i2"></div>
<img class="bk-hd i1" src="${IMG}row-1.webp" alt=""><img class="bk-hh i1" src="${IMG}row-1-hover.webp" alt="">
<img class="bk-hd i2" src="${IMG}row-2.webp" alt=""><img class="bk-hh i2" src="${IMG}row-2-hover.webp" alt="">
<img class="bk-gr i1" src="${IMG}grip-1.png" alt=""><img class="bk-gr i2" src="${IMG}grip-2.png" alt="">
<div class="bk-pin i1">${CHECK}On Pg 4</div><div class="bk-pin i2">${CHECK}On Pg 4</div>
</div>`;

/** Row state for the strip list. One row shows its hover layout at a time. */
export function rail(el: HTMLElement) {
  const st: Record<string, Record<string, boolean>> = { 1: {}, 2: {} };
  const sync = () => {
    el.dataset.h = ["1", "2"].find((n) => st[n].on || st[n].sel) ?? "";
  };
  return (n: 1 | 2) => ({
    set(flag: "on" | "sel", v: boolean) {
      if (!!st[n][flag] !== v) {
        st[n][flag] = v;
        sync();
      }
    },
  });
}
export type Row = ReturnType<ReturnType<typeof rail>>;

type EngineOpts = {
  home: Pt;
  reduced: boolean;
  rows: () => { row: Row; card: Rect }[];
  onFrame?: (dt: number, p: Pt) => void;
};

/** The scripted hand. One per figure. */
export function engine(stage: HTMLElement, opts: EngineOpts) {
  const inner = stage.querySelector<HTMLElement>(".bk-inner")!;
  const cur = inner.querySelector<HTMLElement>(".bk-cur")!;
  const S = { cx: opts.home.x, cy: opts.home.y, mode: "arrow" as "arrow" | "open" | "grab" | "point" | "text", lock: false, run: 0 };
  let tween: { t0: number; d: number; res: () => void; f: (u: number) => Pt } | null = null;
  /* A clock of its own, so a figure can pause, slow down and seek. Every
     wait, tween and scroll in a figure runs on it; Web Animations and CSS
     transitions inside the figure are paused and rate-matched each frame. */
  const C = { t: 0, rate: 1, user: 1, paused: false, ffTo: -1, ffPause: false, cycleStart: 0, cycleLen: 0 };
  let timers: { at: number; res: () => void }[] = [];
  const held = new WeakSet<Animation>();
  const now = () => C.t;
  const wait = (ms: number) => new Promise<void>((res) => timers.push({ at: C.t + ms, res }));

  /* Try it yourself: the script stops at every click and waits for the
     viewer's own click on the marked spot. Moves resolve at once and the
     pointer drives hover, so the figure reacts to the real mouse. */
  const G = { on: false, x: opts.home.x, y: opts.home.y, pending: null as null | { res: () => void; x: number; y: number }, onStep: null as null | ((label: string | null) => void) };
  const hot = document.createElement("div");
  hot.className = "bk-hot";
  hot.innerHTML = "<i></i><i></i><b></b><span></span>";
  inner.insertBefore(hot, cur);
  const toDesign = (e: MouseEvent) => {
    const s = stage.clientWidth / W, a = stage.getBoundingClientRect();
    return { x: (e.clientX - a.left) / s, y: (e.clientY - a.top) / s };
  };
  const onMove = (e: PointerEvent) => {
    if (!G.on) return;
    const p = toDesign(e);
    S.cx = p.x;
    S.cy = p.y;
  };
  const onDown = (e: MouseEvent) => {
    if (!G.on || !G.pending) return;
    const p = toDesign(e), t = G.pending;
    if (Math.hypot(p.x - t.x, p.y - t.y) <= 46) advance();
    else { hot.classList.remove("miss"); void hot.offsetWidth; hot.classList.add("miss"); }
  };
  const advance = () => {
    const t = G.pending;
    if (!t) return;
    G.pending = null;
    hot.classList.remove("on");
    G.onStep?.(null);
    t.res();
  };
  const setGuided = (on: boolean) => {
    G.on = on;
    cur.style.display = on ? "none" : "";
    stage.style.cursor = on ? "default" : "";
  };
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("click", onDown);
  let last = 0;
  let raf = 0;
  let live = true;

  const fit = () => {
    inner.style.transform = `scale(${stage.clientWidth / W})`;
  };
  const ro = new ResizeObserver(fit);
  ro.observe(stage);
  fit();

  function moveTo(x: number, y: number, { arc = 0.18, dur }: { arc?: number; dur?: number } = {}) {
    G.x = x;
    G.y = y;
    if (G.on) return Promise.resolve();
    return new Promise<void>((res) => {
      const x0 = S.cx, y0 = S.cy, dx = x - x0, dy = y - y0, dist = Math.hypot(dx, dy);
      const d = dur ?? 260 + dist * 0.95;
      const nx = -dy / (dist || 1), ny = dx / (dist || 1), b = dist * arc;
      const c1 = { x: x0 + dx * 0.3 + nx * b, y: y0 + dy * 0.3 + ny * b };
      const c2 = { x: x0 + dx * 0.75 + nx * b * 0.5, y: y0 + dy * 0.75 + ny * b * 0.5 };
      tween = {
        t0: C.t,
        d,
        res,
        f: (u) => {
          const k = 1 - u;
          return {
            x: k * k * k * x0 + 3 * k * k * u * c1.x + 3 * k * u * u * c2.x + u * u * u * x,
            y: k * k * k * y0 + 3 * k * k * u * c1.y + 3 * k * u * u * c2.y + u * u * u * y,
          };
        },
      };
    });
  }
  /* Overshoot a touch, then correct. */
  async function reach(x: number, y: number, o: { arc?: number; dur?: number } = {}) {
    if (G.on) return void (await moveTo(x, y));
    const id = S.run, dx = x - S.cx, dy = y - S.cy, dist = Math.hypot(dx, dy) || 1, ov = Math.min(16, dist * 0.025);
    await moveTo(x + (dx / dist) * ov, y + (dy / dist) * ov * 0.6, o);
    if (id !== S.run) return;
    await moveTo(x, y, { arc: 0, dur: 200 });
  }
  async function click(label = "Click here") {
    if (G.on) {
      const x = G.x, y = G.y;
      hot.style.transform = `translate(${x}px,${y}px)`;
      hot.classList.toggle("flip", x > W - 260);
      hot.classList.toggle("low", y < 90);
      hot.querySelector("span")!.textContent = label;
      hot.classList.add("on");
      G.onStep?.(label);
      await new Promise<void>((res) => (G.pending = { res, x, y }));
      return;
    }
    cur.classList.add("click");
    await wait(110);
    cur.classList.remove("click");
  }
  /* Advance the figure's clock by ms and draw. */
  function step(ms: number) {
    C.t += ms;
    if (tween) {
      /* Epsilon: fast-forward lands exactly on the end, give or take float error. */
      const u = C.t >= tween.t0 + tween.d - 1e-6 ? 1 : Math.min(1, (C.t - tween.t0) / tween.d), p = tween.f(mj(u));
      S.cx = p.x;
      S.cy = p.y;
      if (u >= 1) {
        const r = tween.res;
        tween = null;
        r();
      }
    }
    const pt = { x: S.cx, y: S.cy };
    if (!S.lock) {
      let over = false;
      opts.rows().forEach((r) => {
        const on = !over && inside(pt, r.card);
        if (on) over = true;
        r.row.set("on", on);
      });
      S.mode = over ? "open" : "arrow";
    }
    /* Physics in small steps so it stays stable at any speed. */
    const n = Math.min(40, Math.max(1, Math.ceil(ms / 20)));
    for (let i = 0; i < n; i++) opts.onFrame?.(ms / 1000 / n, pt);
    /* Hotspot per cursor: arrow tip, fingertip, or palm centre. */
    const [hx, hy] = S.mode === "arrow" ? [3, 2] : S.mode === "point" ? [9, 3] : S.mode === "text" ? [13, 13] : [11, 10];
    cur.style.transform = `translate(${S.cx - hx}px,${S.cy - hy}px)`;
    cur.dataset.m = S.mode;
  }
  function resolveDue() {
    if (!timers.length) return;
    const due = timers.filter((x) => x.at <= C.t + 1e-6);
    if (due.length) {
      timers = timers.filter((x) => x.at > C.t + 1e-6);
      due.forEach((x) => x.res());
    }
  }
  function frame(real: number) {
    if (!live) return;
    const rdt = Math.min(50, real - (last || real));
    last = real;
    if (G.on) stage.style.cursor = S.mode === "point" ? "pointer" : S.mode === "text" ? "text" : S.mode === "grab" ? "grabbing" : S.mode === "open" ? "grab" : "default";
    if (C.ffTo < 0) {
      step(C.paused ? 0 : rdt * C.rate);
      resolveDue();
      inner.getAnimations({ subtree: true }).forEach((a) => {
        if (a.playbackRate !== C.rate) a.playbackRate = C.rate;
        if (C.paused && a.playState === "running") { a.pause(); held.add(a); }
        else if (!C.paused && held.has(a)) { held.delete(a); if (a.playState === "paused") a.play(); }
      });
    }
    raf = requestAnimationFrame(frame);
  }

  /* Fast-forward for seeking: steps the clock event by event (never more
     than 16ms at a time), yielding between steps so the script's awaits run
     in order, and drives every animation's currentTime by hand. The result
     is the exact state the script produces at that time. */
  const ffHeld = new Set<Animation>();
  const driveAnims = (ms: number) => {
    inner.getAnimations({ subtree: true }).forEach((a) => {
      if (a.playState === "finished") return;
      if (a.playState !== "paused") a.pause();
      ffHeld.add(a);
      const end = Number(a.effect?.getComputedTiming().endTime ?? 0), ct = Number(a.currentTime ?? 0);
      if (Number.isFinite(end) && ct + ms >= end) { a.finish(); ffHeld.delete(a); }
      else a.currentTime = ct + ms;
    });
  };
  const endFF = () => {
    C.ffTo = -1;
    C.rate = C.user;
    C.paused = C.ffPause;
    ffHeld.forEach((a) => {
      if (a.playState !== "paused") return;
      if (C.paused) held.add(a);
      else a.play();
    });
    ffHeld.clear();
  };
  const mc = new MessageChannel();
  mc.port2.onmessage = () => {
    if (!live || C.ffTo < 0) return;
    const target = C.cycleStart + C.ffTo;
    let next = Math.min(target, C.t + 16);
    for (const x of timers) next = Math.min(next, x.at);
    if (tween) next = Math.min(next, tween.t0 + tween.d);
    const ms = Math.max(0, next - C.t);
    step(ms);
    driveAnims(ms);
    resolveDue();
    if (C.t >= target) return endFF();
    mc.port1.postMessage(0);
  };
  if (!opts.reduced) raf = requestAnimationFrame(frame);

  const halt = () => {
    S.run++;
    tween = null;
    G.pending = null;
    hot.classList.remove("on");
    G.onStep?.(null);
  };
  const destroy = () => {
    live = false;
    halt();
    cancelAnimationFrame(raf);
    mc.port1.close();
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("click", onDown);
    ro.disconnect();
  };
  /* Review controls. */
  const lap = () => {
    C.cycleLen = C.t - C.cycleStart;
    C.cycleStart = C.t;
  };
  const ff = (to: number, thenPause: boolean) => {
    const running = C.ffTo >= 0;
    C.ffTo = to;
    C.ffPause = thenPause;
    if (!running) mc.port1.postMessage(0);
  };
  return { S, C, G, now, wait, moveTo, reach, click, halt, destroy, inner, cur, lap, ff, endFF, setGuided, advance };
}
export type Engine = ReturnType<typeof engine>;

/** Plays while in view, stops for good on the first click, Replay restarts. */
export function controller(
  stage: HTMLElement,
  replay: HTMLElement,
  E: Engine,
  { reset, loop, reduced }: { reset: () => void; loop: (id: number) => void; reduced: boolean },
) {
  let playing = false, stopped = false, started = false;
  /* Play the demo, or try it: the same script, waiting on the viewer's clicks. */
  let mode: "watch" | "try" = "watch";
  const ctl = document.createElement("div");
  ctl.className = "bk-ctl";
  ctl.innerHTML = `<div class="bk-mode" role="group" aria-label="Demo mode"><button type="button" data-m="watch" class="on">Play demo</button><button type="button" data-m="try">Try it yourself</button></div>`;
  replay.parentElement?.insertBefore(ctl, replay);
  ctl.appendChild(replay);
  const guide = document.createElement("div");
  guide.className = "bk-guide";
  guide.innerHTML = `<i></i><span>Click the marked spot to start</span><button type="button">Skip step</button>`;
  (replay.closest(".bk-bar") ?? stage).insertAdjacentElement("afterend", guide);
  E.G.onStep = (label) => { guide.querySelector("span")!.textContent = label ? `Next: ${label}` : "Watch what happens…"; };

  /* While the demo plays, its button reads Pause demo and pauses it. */
  const playBtn = ctl.querySelector<HTMLButtonElement>('button[data-m="watch"]')!;
  const sync = () => {
    playBtn.textContent = mode === "watch" && playing && !timer && !E.C.paused ? "Pause demo" : "Play demo";
  };

  /* Coming into view, the figure waits 3 seconds, then the demo plays. */
  const DELAY = 3000;
  let timer = 0;
  const stopCount = () => {
    window.clearTimeout(timer);
    timer = 0;
    sync();
  };
  const countdown = () => {
    E.halt();
    setPaused(false);
    E.setGuided(false);
    reset();
    stopCount();
    timer = window.setTimeout(() => { timer = 0; start(); }, DELAY);
    sync();
  };

  const setMode = (m: "watch" | "try") => {
    stopCount();
    mode = m;
    ctl.querySelectorAll<HTMLButtonElement>(".bk-mode button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
    guide.classList.toggle("on", m === "try");
    stopped = false;
    started = true;
    start();
  };
  const onMode = (e: Event) => {
    const m = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-m]")?.dataset.m as "watch" | "try" | undefined;
    if (m === "watch" && mode === "watch" && playing && !timer) setPaused(!E.C.paused);
    else if (m) setMode(m);
  };
  const onSkip = () => E.advance();
  ctl.addEventListener("click", onMode);
  guide.querySelector("button")!.addEventListener("click", onSkip);
  const start = () => {
    E.halt();
    setPaused(false);
    E.setGuided(mode === "try");
    reset();
    E.C.cycleStart = E.now();
    playing = true;
    sync();
    loop(E.S.run);
  };
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting && !started && !stopped) {
          started = true;
          if (mode === "try") start();
          else countdown();
        } else if (!e.isIntersecting && mode === "watch" && (playing || timer)) {
          stopCount();
          setPaused(false);
          playing = false;
          started = false;
          E.halt();
          reset();
          sync();
        }
      }),
    { threshold: 0.35 },
  );
  /* A click on a playing demo pauses it; another click plays it on. */
  const pz = document.createElement("div");
  pz.className = "bk-pz";
  pz.innerHTML = `<span><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>Paused, click to play</span>`;
  stage.appendChild(pz);
  const setPaused = (on: boolean) => {
    E.C.paused = on;
    pz.classList.toggle("on", on);
    sync();
  };
  const onStage = () => {
    if (mode === "try" || timer || !playing) return;
    setPaused(!E.C.paused);
  };
  const onReplay = () => {
    stopCount();
    stopped = false;
    started = true;
    start();
  };
  if (!reduced) {
    io.observe(stage);
    stage.addEventListener("click", onStage);
    replay.addEventListener("click", onReplay);
  }
  return () => {
    stopCount();
    io.disconnect();
    stage.removeEventListener("click", onStage);
    replay.removeEventListener("click", onReplay);
    guide.remove();
    pz.remove();
    ctl.removeEventListener("click", onMode);
  };
}
