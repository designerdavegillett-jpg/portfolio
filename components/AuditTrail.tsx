"use client";

import { useEffect, useRef } from "react";

/**
 * The audit trail gap from Where It Stands, played out. A post lands and the
 * record says Published. The member deletes it from their own feed and the
 * record still says Published, because the granted scope has no read side.
 * The second mode shows the designed fix: a member-initiated retract that
 * writes its own event, so the record and the feed agree again.
 *
 * Plays on its own while in view. The toggle switches between today and the
 * designed fix and restarts the sequence. Scoped under .audit-trail, classes
 * prefixed at-. The phone is sized in cqw against a 220px design width.
 */

const v = (px: number) => `${((px * 100) / 220).toFixed(3)}cqw`;
const VIDEO = "/work/own-the-script/post-video.webp";
const IG = `<svg viewBox="0 0 25 25" fill="none"><rect width="24.6972" height="24.6972" rx="5.48826" fill="#E70380"/><path d="M16.0175 8.8629H16.0242M9.01315 6.01123H15.684C17.5261 6.01123 19.0194 7.42983 19.0194 9.17976V15.5168C19.0194 17.2667 17.5261 18.6853 15.684 18.6853H9.01315C7.17105 18.6853 5.67773 17.2667 5.67773 15.5168V9.17976C5.67773 7.42983 7.17105 6.01123 9.01315 6.01123ZM15.0167 11.9492C15.099 12.4766 15.0042 13.0153 14.7457 13.4885C14.4872 13.9618 14.0782 14.3455 13.5769 14.5852C13.0756 14.8249 12.5074 14.9084 11.9533 14.8237C11.3992 14.739 10.8873 14.4904 10.4904 14.1134C10.0936 13.7364 9.83195 13.2502 9.74279 12.7238C9.65362 12.1974 9.74145 11.6577 9.99378 11.1814C10.2461 10.7052 10.6501 10.3166 11.1483 10.0711C11.6465 9.82553 12.2135 9.73544 12.7686 9.81365C13.3349 9.89342 13.8592 10.1441 14.264 10.5287C14.6688 10.9132 14.9327 11.4113 15.0167 11.9492Z" stroke="white" stroke-width="1.37207" stroke-linecap="round"/></svg>`;

const STYLES = `.audit-trail{margin-block:0 var(--s6,3rem);--hi:#0071E3;--hair:rgba(29,29,31,.12);--ink:#1d1d1f;--ink-2:#424245;--mute:#86868b;
  --display:var(--font-condensed),"Archivo",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.audit-trail *{box-sizing:border-box}
.audit-trail .at-seg{display:inline-flex;padding:3px;border-radius:999px;background:#e8e8ed;margin:0 0 22px}
.audit-trail .at-seg button{all:unset;cursor:pointer;padding:7px 14px;border-radius:999px;font-size:12.5px;line-height:1;font-weight:600;color:var(--ink-2);transition:background .2s,color .2s,box-shadow .2s}
.audit-trail .at-seg button[aria-pressed="true"]{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.audit-trail .at-seg button:focus-visible{outline:2px solid var(--hi);outline-offset:2px}
.audit-trail .at-row{display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,4vw,44px);align-items:center}
.audit-trail .at-col{display:flex;flex-direction:column;align-items:center;gap:10px}
.audit-trail .at-cap{font-family:var(--display);font-variation-settings:"wdth" 72;font-size:.9rem;font-weight:700;letter-spacing:.01em;text-transform:uppercase;color:var(--ink)}
/* phone: the member's own feed */
.audit-trail .at-phone{position:relative;width:min(220px,44vw);aspect-ratio:220/452;container-type:inline-size;--sys:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif}
/* cqw on the container itself resolves against its parent, so the bezel lives one level in. */
.audit-trail .at-frm{height:100%;background:#fff;border-radius:${v(34)};padding:${v(6)};box-shadow:0 ${v(8)} ${v(24)} rgba(3,6,20,.12),0 0 0 1px rgba(3,6,20,.06)}
.audit-trail .at-scr{position:relative;height:100%;border-radius:${v(28)};overflow:hidden;background:#fff;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#111}
.audit-trail .at-isl{position:absolute;left:50%;top:${v(8)};width:${v(62)};height:${v(18)};margin-left:${v(-31)};border-radius:${v(9)};background:#000}
.audit-trail .at-prof{position:absolute;left:0;right:0;top:${v(36)};padding:0 ${v(12)};display:flex;align-items:center;gap:${v(10)}}
.audit-trail .at-av{width:${v(44)};height:${v(44)};border-radius:50%;background:linear-gradient(135deg,#8793a8,#4a5468);display:grid;place-items:center;color:#fff;font:700 ${v(14)}/1 var(--sys)}
.audit-trail .at-prof b{display:block;font:700 ${v(13)}/1.2 var(--sys)}
.audit-trail .at-prof small{display:block;font:400 ${v(10.5)}/1.3 var(--sys);color:#737373}
.audit-trail .at-tabs{position:absolute;left:0;right:0;top:${v(92)};height:${v(28)};border-bottom:1px solid #e5e5e5;display:flex}
.audit-trail .at-tabs span{flex:1;display:grid;place-items:center;font:600 ${v(10)}/1 var(--sys);color:#737373}
.audit-trail .at-tabs span.on{color:#111;box-shadow:inset 0 -1.5px 0 #111}
.audit-trail .at-grid{position:absolute;left:0;right:0;top:${v(121)};display:grid;grid-template-columns:repeat(3,1fr);gap:1px}
.audit-trail .at-cell{aspect-ratio:9/16}
.audit-trail .at-post{position:relative;background:#222 url(${VIDEO}) center/cover no-repeat;transition:opacity .45s,transform .45s}
.audit-trail .at-post::after{content:"";position:absolute;right:${v(4)};top:${v(4)};width:${v(9)};height:${v(9)};border-radius:${v(2)};border:${v(1.4)} solid #fff}
.audit-trail .at-gone .at-post{opacity:0;transform:scale(.9)}
.audit-trail .at-empty{position:absolute;left:0;right:0;top:${v(210)};text-align:center;font:600 ${v(12)}/1.4 var(--sys);color:#737373;opacity:0;transition:opacity .4s .2s}
.audit-trail .at-gone .at-empty{opacity:1}
.audit-trail .at-sheet{z-index:3;position:absolute;left:${v(8)};right:${v(8)};bottom:${v(8)};border-radius:${v(16)};background:#fff;box-shadow:0 ${v(-4)} ${v(24)} rgba(0,0,0,.18);padding:${v(6)} 0;transform:translateY(120%);transition:transform .35s cubic-bezier(.3,.8,.3,1)}
.audit-trail .at-sheet.on{transform:none}
.audit-trail .at-sheet span{display:block;padding:${v(11)} ${v(16)};font:500 ${v(12)}/1 var(--sys);border-top:1px solid #efefef}
.audit-trail .at-sheet span:first-child{border-top:0}
.audit-trail .at-sheet .at-del{color:#ed4956;font-weight:600}
.audit-trail .at-dim{z-index:2;position:absolute;inset:0;background:rgba(0,0,0,.25);opacity:0;transition:opacity .3s;pointer-events:none}
.audit-trail .at-sheet.on~.at-dim{opacity:1}
.audit-trail .at-fing{position:absolute;z-index:5;left:50%;top:50%;width:${v(24)};height:${v(24)};margin:${v(-12)} 0 0 ${v(-12)};border-radius:50%;background:rgba(255,255,255,.5);border:${v(1.5)} solid rgba(255,255,255,.95);box-shadow:0 ${v(1)} ${v(6)} rgba(0,0,0,.4);opacity:0;transition:left .5s cubic-bezier(.4,0,.2,1),top .5s cubic-bezier(.4,0,.2,1),opacity .25s,transform .12s;pointer-events:none}
.audit-trail .at-fing.on{opacity:1}
.audit-trail .at-fing.dn{transform:scale(.8)}
/* the record */
.audit-trail .at-log{width:100%;max-width:400px;border:1px solid var(--hair);border-radius:14px;background:#fff;overflow:hidden}
.audit-trail .at-lh{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--hair);font-size:12px;font-weight:600;color:var(--mute);letter-spacing:.02em;text-transform:uppercase}
.audit-trail .at-rows{list-style:none;margin:0;padding:6px 0;min-height:110px}
.audit-trail .at-rows li{display:grid;grid-template-columns:44px 20px 1fr;gap:10px;align-items:center;padding:9px 16px;font-size:13.2px;line-height:1.35;color:var(--ink);animation:at-in .35s ease}
@keyframes at-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.audit-trail .at-rows time{font-variant-numeric:tabular-nums;color:var(--mute);font-size:12.5px}
.audit-trail .at-rows svg{width:20px;height:20px;display:block}
.audit-trail .at-ev{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.audit-trail .at-pill{font-size:11px;font-weight:600;line-height:1;padding:5px 8px;border-radius:999px}
.audit-trail .at-pub{color:#0f7643;background:#e3f4ea}
.audit-trail .at-ret{color:#8a5a00;background:#fdf2dc}
.audit-trail .at-note{grid-column:3;font-size:12px;color:var(--mute)}
.audit-trail .at-act{display:flex;justify-content:flex-end;padding:0 16px 12px;min-height:44px}
.audit-trail .at-btn{all:unset;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:10px;border:1px solid var(--hair);color:var(--ink);opacity:0;transform:translateY(4px);transition:opacity .3s,transform .3s,background .15s,box-shadow .3s}
.audit-trail .at-btn.on{opacity:1;transform:none}
.audit-trail .at-btn.pulse{box-shadow:0 0 0 4px rgba(0,113,227,.25);border-color:var(--hi)}
.audit-trail .at-btn.dn{background:#f0f0f3}
.audit-trail .at-stat{display:flex;align-items:center;gap:10px;padding:12px 16px;border-top:1px solid var(--hair);font-size:13px;line-height:1.4;font-weight:600;min-height:48px;transition:background .3s,color .3s}
.audit-trail .at-stat i{width:9px;height:9px;border-radius:50%;background:currentColor;flex:none}
.audit-trail .at-stat[data-s="wait"]{color:var(--mute)}
.audit-trail .at-stat[data-s="ok"]{color:#0f7643;background:#f3faf6}
.audit-trail .at-stat[data-s="bad"]{color:#b42318;background:#fdf3f2}
.audit-trail .at-why{margin:18px 0 0;max-width:34rem;font-size:13.2px;line-height:1.6;color:var(--ink-2)}
.audit-trail .at-why b{color:var(--ink);font-weight:600}
@media (max-width:640px){.audit-trail .at-row{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.audit-trail *{transition:none!important;animation:none!important}.audit-trail .at-fing{display:none}}
`;

const MARKUP = `<div class="at-seg" role="group" aria-label="Which version">
  <button type="button" data-mode="today" aria-pressed="true">Today</button>
  <button type="button" data-mode="fix" aria-pressed="false">With member retract (designed)</button>
</div>
<div class="at-row">
  <div class="at-col"><span class="at-cap">The member's feed</span>
    <div class="at-phone" data-phone role="img" aria-label="The member's Instagram profile. The post is deleted by hand.">
      <div class="at-frm"><div class="at-scr" data-scr>
        <span class="at-isl"></span>
        <div class="at-prof"><span class="at-av">DG</span><div><b>davidgillett</b><small>Test account</small></div></div>
        <div class="at-tabs"><span class="on">Posts</span><span>Reels</span><span>Tagged</span></div>
        <div class="at-grid"><div class="at-cell at-post" data-post></div><div class="at-cell"></div><div class="at-cell"></div></div>
        <div class="at-empty">No posts yet</div>
        <div class="at-sheet" data-sheet><span>Edit</span><span>Archive</span><span class="at-del" data-del>Delete</span></div>
        <div class="at-dim"></div>
      </div></div>
      <div class="at-fing" data-finger></div>
    </div>
  </div>
  <div class="at-col"><span class="at-cap">Own the Script's record</span>
    <div class="at-log">
      <div class="at-lh"><span>Post history</span><span>Append only</span></div>
      <ol class="at-rows" data-rows></ol>
      <div class="at-act"><button type="button" class="at-btn" data-retract tabindex="-1">Retract post</button></div>
      <div class="at-stat" data-stat data-s="wait"><i></i><span data-stat-text>Waiting for the post to land</span></div>
    </div>
  </div>
</div>
<p class="at-why" data-why></p>`;

const WHY = {
  today: "<b>Why the record cannot correct itself.</b> The granted scope on this platform has no read side, so the system cannot ask whether a post still exists. Every test cycle where someone cleans up their own feed leaves another false Published.",
  fix: "<b>Designed, not built.</b> The member retracts the post in Own the Script. That writes a distinct Retracted event rather than editing the old one, so the trail stays append only and tells the truth without ever reading the feed.",
};

export default function AuditTrail() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    const $ = (s: string) => host.querySelector(s) as HTMLElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = $("[data-phone]"), scr = $("[data-scr]"), post = $("[data-post]"), sheet = $("[data-sheet]"), del = $("[data-del]");
    const finger = $("[data-finger]"), rows = $("[data-rows]"), retract = $("[data-retract]"), stat = $("[data-stat]"), statText = $("[data-stat-text]"), why = $("[data-why]");
    const segs = [...host.querySelectorAll("[data-mode]")] as HTMLElement[];
    let mode: "today" | "fix" = "today";

    let timers: number[] = [], gen = 0, running = false, visible = false;
    const at = (ms: number, fn: () => void) => { const g = gen; timers.push(window.setTimeout(() => { if (g === gen) fn(); }, reduced ? 0 : ms)); };
    const clear = () => { timers.forEach(clearTimeout); timers = []; gen++; running = false; };
    cleanups.push(clear);

    const clock = (m: number) => { const d = new Date(Date.now() + m * 60000); return (d.getHours() % 12 || 12) + ":" + String(d.getMinutes()).padStart(2, "0"); };
    function row(ev: string, cls: string, note = "") {
      const li = document.createElement("li");
      li.innerHTML = `<time>${clock(ev === "Published" ? 0 : 3)}</time>${IG}<span class="at-ev">Instagram<span class="at-pill ${cls}">${ev}</span></span>${note ? `<span class="at-note">${note}</span>` : ""}`;
      rows.appendChild(li);
    }
    function setStat(s: "wait" | "ok" | "bad", t: string) { stat.dataset.s = s; statText.textContent = t; }
    function point(el: HTMLElement) {
      const r = el.getBoundingClientRect(), p = phone.getBoundingClientRect();
      finger.style.left = r.left - p.left + r.width / 2 + "px";
      finger.style.top = r.top - p.top + r.height / 2 + "px";
    }
    function tap(el: HTMLElement) { finger.classList.add("dn"); at(160, () => finger.classList.remove("dn")); void el; }

    function reset() {
      rows.innerHTML = ""; scr.classList.remove("at-gone"); sheet.classList.remove("on");
      retract.classList.remove("on", "pulse", "dn"); finger.classList.remove("on", "dn");
      setStat("wait", "Waiting for the post to land");
      why.innerHTML = WHY[mode];
      segs.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    }
    function play() {
      clear(); running = true; reset();
      at(700, () => { row("Published", "at-pub"); setStat("ok", "Record matches the feed"); });
      at(2000, () => { point(post); finger.classList.add("on"); });
      at(2700, () => { tap(post); sheet.classList.add("on"); });
      at(3400, () => point(del));
      at(4000, () => { tap(del); sheet.classList.remove("on"); scr.classList.add("at-gone"); });
      at(4500, () => finger.classList.remove("on"));
      if (mode === "today") {
        at(5000, () => setStat("bad", "Record says Published. The post is gone."));
        at(11000, () => { if (visible) play(); else running = false; });
      } else {
        at(5000, () => setStat("bad", "Record says Published. The post is gone."));
        at(6000, () => { retract.classList.add("on", "pulse"); });
        at(7200, () => { retract.classList.add("dn"); });
        at(7400, () => { retract.classList.remove("dn", "pulse", "on"); row("Retracted by member", "at-ret", "Written as its own event. Nothing is edited."); });
        at(8000, () => setStat("ok", "Record matches the feed"));
        at(13500, () => { if (visible) play(); else running = false; });
      }
    }
    segs.forEach((b) => b.addEventListener("click", () => { mode = b.dataset.mode as "today" | "fix"; play(); }));

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      visible = e.isIntersecting;
      if (visible && !running) play();
    }), { threshold: 0.35 });
    io.observe(host); cleanups.push(() => io.disconnect());
    reset();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="audit-trail" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
