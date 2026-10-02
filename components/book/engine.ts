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

export const STYLES = `.bk{--hi:#0071E3;--app:var(--font-eff-sans,"Open Sans"),system-ui,sans-serif;margin-block:0 var(--s5,2rem);max-width:none}
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
.bk .bk-cur[data-m="arrow"] .c-arrow,.bk .bk-cur[data-m="open"] .c-open,.bk .bk-cur[data-m="grab"] .c-grab,.bk .bk-cur[data-m="point"] .c-point{opacity:1}
.bk .bk-cur.click svg{transform:scale(.86)}

/* caption and replay */
.bk .bk-bar{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-top:.65rem}
.bk .bk-cap{font-size:.7rem;line-height:1.55;color:var(--muted,#86868b);max-width:34rem}
.bk .bk-replay{flex:none;font:500 .7rem/1 var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink-soft,#424245);background:transparent;border:1px solid rgba(29,29,31,.16);border-radius:999px;padding:.45rem .8rem;cursor:pointer}
.bk .bk-replay:hover{border-color:rgba(29,29,31,.32)}
.bk .bk-replay:focus-visible{outline:2px solid var(--hi);outline-offset:2px}
.bk .bk-rev{display:flex;align-items:center;gap:8px;margin-top:.55rem;padding:6px 8px;border-radius:8px;background:rgba(29,29,31,.05);font:500 .7rem/1 var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink-soft,#424245)}
.bk .bk-rev button,.bk .bk-rev select{font:inherit;color:inherit;background:#fff;border:1px solid rgba(29,29,31,.16);border-radius:6px;height:26px;padding:0 9px;cursor:pointer}
.bk .bk-rev button[data-a="play"]{min-width:4.6em}
.bk .bk-rev input{flex:1;min-width:0;accent-color:var(--hi)}
.bk .bk-rt{font-variant-numeric:tabular-nums;min-width:7em;text-align:right}
@media (prefers-reduced-motion:reduce){.bk *{transition:none!important}.bk .bk-replay{display:none}}`;

const HAND_OPEN = `<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`;
const HAND_GRAB = `<path d="M18 11.5V9a2 2 0 0 0-4 0v1.4"/><path d="M14 10V8a2 2 0 0 0-4 0v2"/><path d="M10 9.9V9a2 2 0 0 0-4 0v5"/><path d="M6 14a2 2 0 0 0-4 0"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/>`;
const HAND_POINT = `<path d="M10 9.5V4a2 2 0 0 0-4 0v10"/><path d="M14 10V9a2 2 0 0 0-4 0v1"/><path d="M18 11v-1a2 2 0 0 0-4 0"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L6 14"/>`;
const hand = (cls: string, lines: string, fill: string) =>
  `<svg class="${cls}" viewBox="-1 -1 26 26" fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff" stroke-width="5">${lines}</g><path d="${fill}" fill="#fff"/><g stroke="#111" stroke-width="1.6">${lines}</g></svg>`;

export const CURSOR = `<div class="bk-cur" data-m="arrow">
<svg class="c-arrow" viewBox="0 0 26 26"><path d="M3 2 L3 21 L8.2 16.4 L11.6 24.2 L15 22.8 L11.7 15.2 L18.6 15.2 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>
${hand("c-open", HAND_OPEN, "M7 15V6a2 2 0 0 1 4 0V4a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v2a2 2 0 0 1 3 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8Z")}
${hand("c-point", HAND_POINT, "M6 14V4a2 2 0 0 1 4 0v5a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8Z")}
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
  const S = { cx: opts.home.x, cy: opts.home.y, mode: "arrow" as "arrow" | "open" | "grab" | "point", lock: false, run: 0 };
  let tween: { t0: number; d: number; res: () => void; f: (u: number) => Pt } | null = null;
  /* A clock of its own, so review mode can pause, slow down and seek. Every
     wait, tween and scroll in a figure runs on it; Web Animations and CSS
     transitions inside the figure are paused and rate-matched each frame. */
  const C = { t: 0, rate: 1, user: 1, paused: false, ffTo: -1, ffPause: false, cycleStart: 0, cycleLen: 0 };
  let timers: { at: number; res: () => void }[] = [];
  const held = new WeakSet<Animation>();
  const now = () => C.t;
  const wait = (ms: number) => new Promise<void>((res) => timers.push({ at: C.t + ms, res }));
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
    const id = S.run, dx = x - S.cx, dy = y - S.cy, dist = Math.hypot(dx, dy) || 1, ov = Math.min(16, dist * 0.025);
    await moveTo(x + (dx / dist) * ov, y + (dy / dist) * ov * 0.6, o);
    if (id !== S.run) return;
    await moveTo(x, y, { arc: 0, dur: 200 });
  }
  async function click() {
    cur.classList.add("click");
    await wait(110);
    cur.classList.remove("click");
  }
  function frame(real: number) {
    if (!live) return;
    const rdt = Math.min(50, real - (last || real));
    last = real;
    let vms = C.paused ? 0 : rdt * C.rate;
    if (C.ffTo >= 0) vms = Math.min(vms, Math.max(0, C.cycleStart + C.ffTo - C.t)); // land on the seek point
    C.t += vms;
    if (C.ffTo >= 0 && C.t - C.cycleStart >= C.ffTo) {
      C.ffTo = -1;
      C.rate = C.user;
      C.paused = C.ffPause;
    }
    if (timers.length) {
      const due = timers.filter((x) => x.at <= C.t);
      if (due.length) {
        timers = timers.filter((x) => x.at > C.t);
        due.forEach((x) => x.res());
      }
    }
    inner.getAnimations({ subtree: true }).forEach((a) => {
      if (a.playbackRate !== C.rate) a.playbackRate = C.rate;
      if (C.paused && a.playState === "running") { a.pause(); held.add(a); }
      else if (!C.paused && held.has(a)) { held.delete(a); if (a.playState === "paused") a.play(); }
    });
    if (tween) {
      const u = Math.min(1, (C.t - tween.t0) / tween.d), p = tween.f(mj(u));
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
    /* Physics in small steps, so fast-forward stays stable. */
    const steps = Math.min(40, Math.max(1, Math.ceil(vms / 20)));
    for (let i = 0; i < steps; i++) opts.onFrame?.(vms / 1000 / steps, pt);
    /* Hotspot per cursor: arrow tip, fingertip, or palm centre. */
    const [hx, hy] = S.mode === "arrow" ? [3, 2] : S.mode === "point" ? [9, 3] : [11, 10];
    cur.style.transform = `translate(${S.cx - hx}px,${S.cy - hy}px)`;
    cur.dataset.m = S.mode;
    raf = requestAnimationFrame(frame);
  }
  if (!opts.reduced) raf = requestAnimationFrame(frame);

  const halt = () => {
    S.run++;
    tween = null;
  };
  const destroy = () => {
    live = false;
    halt();
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
  /* Review controls. */
  const lap = () => {
    C.cycleLen = C.t - C.cycleStart;
    C.cycleStart = C.t;
  };
  const ff = (to: number, thenPause: boolean) => {
    C.ffTo = to;
    C.ffPause = thenPause;
    C.paused = false;
    C.rate = 40;
  };
  return { S, C, now, wait, moveTo, reach, click, halt, destroy, inner, cur, lap, ff };
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
  const review = !reduced && /[?&]review\b/.test(location.search);
  const start = () => {
    E.halt();
    reset();
    E.C.cycleStart = E.now();
    playing = true;
    loop(E.S.run);
    if (measuring) E.ff(1e9, false);
  };
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting && !started && !stopped) {
          started = true;
          start();
        } else if (!e.isIntersecting && playing) {
          playing = false;
          started = false;
          E.halt();
          reset();
        }
      }),
    { threshold: 0.35 },
  );
  const onStage = () => {
    if (review) return void togglePause();
    if (playing) {
      stopped = true;
      playing = false;
      E.halt();
    }
  };
  const onReplay = () => {
    stopped = false;
    started = true;
    start();
  };
  /* Review bar: only with ?review in the URL. Pause, back 5s, restart,
     speed and a timeline to drag. Seeking replays the loop at 40x to the
     chosen point, so every state is exactly what the script produces. */
  let bar: HTMLDivElement | null = null, tick = 0;
  const togglePause = () => {
    if (E.C.ffTo >= 0) E.C.ffPause = !E.C.ffPause;
    else E.C.paused = !E.C.paused;
    sync();
  };
  const pos = () => Math.max(0, E.now() - E.C.cycleStart);
  const len = () => E.C.cycleLen || Math.max(pos(), 1000);
  const seek = (to: number) => {
    const p = E.C.ffTo >= 0 ? E.C.ffPause : E.C.paused;
    stopped = false;
    started = true;
    start();
    E.ff(Math.max(0, to), p);
  };
  let dragging = false;
  /* First run in review mode plays one loop at 40x to learn its length. */
  let measuring = review;
  const sync = () => {
    if (!bar) return;
    if (measuring && E.C.cycleLen > 0) {
      measuring = false;
      E.C.ffTo = -1;
      E.C.rate = E.C.user;
      seek(0);
    }
    const paused = E.C.ffTo >= 0 ? E.C.ffPause : E.C.paused;
    bar.querySelector<HTMLButtonElement>('[data-a="play"]')!.textContent = paused ? "Play" : "Pause";
    const r = bar.querySelector<HTMLInputElement>("input")!;
    if (!dragging) r.value = String(Math.round((pos() / len()) * 1000));
    if (measuring) return void (bar.querySelector(".bk-rt")!.textContent = "measuring…");
    bar.querySelector(".bk-rt")!.textContent = `${(pos() / 1000).toFixed(1)} / ${E.C.cycleLen ? (E.C.cycleLen / 1000).toFixed(1) + "s" : "…"}`;
  };
  if (review) {
    bar = document.createElement("div");
    bar.className = "bk-rev";
    bar.innerHTML = `<button type="button" data-a="restart" title="Restart">Restart</button><button type="button" data-a="back" title="Back 5 seconds">-5s</button><button type="button" data-a="play">Pause</button><input type="range" min="0" max="1000" value="0" aria-label="Timeline"><span class="bk-rt"></span><select aria-label="Speed"><option value="0.25">0.25x</option><option value="0.5">0.5x</option><option value="1" selected>1x</option></select>`;
    (replay.parentElement ?? stage).insertAdjacentElement("afterend", bar);
    bar.addEventListener("click", (e) => {
      const a = (e.target as HTMLElement).closest("button")?.dataset.a;
      if (a === "play") togglePause();
      else if (a === "back") seek(pos() - 5000);
      else if (a === "restart") seek(0);
    });
    const r = bar.querySelector<HTMLInputElement>("input")!;
    r.addEventListener("input", () => { dragging = true; });
    r.addEventListener("change", () => { dragging = false; seek((Number(r.value) / 1000) * len()); });
    bar.querySelector("select")!.addEventListener("change", (e) => {
      E.C.user = Number((e.target as HTMLSelectElement).value);
      if (E.C.ffTo < 0) E.C.rate = E.C.user;
    });
    tick = window.setInterval(sync, 100);
  }
  if (!reduced) {
    io.observe(stage);
    stage.addEventListener("click", onStage);
    replay.addEventListener("click", onReplay);
  }
  return () => {
    io.disconnect();
    stage.removeEventListener("click", onStage);
    replay.removeEventListener("click", onReplay);
    window.clearInterval(tick);
    bar?.remove();
  };
}
