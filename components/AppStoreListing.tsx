/**
 * Own the Script's App Store product page, drawn the way it will appear once
 * review clears. The Get button reads Coming soon and the caption says the
 * app is in review, so the figure never claims a listing that does not exist.
 *
 * Every fact on the page is one the case study already states. The icon is
 * the real app icon, exported by Dave.
 * Static; the screenshot row scrolls sideways like the real page. Scoped under
 * .app-store, classes prefixed as-, sizes in cqw against a 390px iPhone.
 */

const v = (px: number) => `${((px * 100) / 390).toFixed(3)}cqw`;
const IMG = "/work/own-the-script/";

const ic = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const TABS: [string, string][] = [
  ["Today", `<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18"/>`],
  ["Games", `<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><rect x="2" y="6" width="20" height="12" rx="6"/>`],
  ["Apps", `<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>`],
  ["Arcade", `<path d="M12 3v8M8 21h8M12 11a3 3 0 1 0 0-6"/><rect x="5" y="15" width="14" height="6" rx="2"/>`],
  ["Search", `<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`],
];
/* Screenshot 1: the prompter over the camera feed. Screenshot 2: the caption
   style and placement screen. Screenshot 3: the finished video. */
const PT = ["the quiet wealth move. Your", "payment may rise, but more", "of every payment goes to", "the balance instead of", "interest, and you own your"];
const SHOTS: [string, string][] = [
  ["A prompter that follows your voice", `<i class="as-scr" style="background-image:url(${IMG}flow/camera.webp);background-position:center 30%"><span class="as-pt">${PT.map((l, k) => `<em class="${k < 2 ? "sp" : k === 2 ? "lv" : k === 3 ? "nx" : ""}">${l}</em>`).join("")}</span></i>`],
  ["Captions you style and place", `<i class="as-scr as-capscr"><b>Audio &amp; Captions</b><span class="as-vid" style="background-image:url(${IMG}caption-bg.webp)"><span class="as-box">What <em>happens</em><br>to your<br>earnest<br>money?</span></span><span class="as-tiles"><span class="t1"><em>TEXT</em>STYLE</span><span class="t2"><em>TEXT</em>STYLE</span><span class="t3"><em>TEXT</em>STYLE</span></span></i>`],
  ["One tap posts everywhere", `<i class="as-scr" style="background-image:url(${IMG}post-video.webp);background-position:center 30%"></i>`],
];
const INFO: [string, string, string][] = [
  ["Status", "In review", "App Store"],
  ["Platform", "iPhone", "iOS"],
  ["Plans", "$40", "per month"],
  ["Language", "EN", "English"],
];

const STYLES = `.app-store{max-width:52rem;margin-block:0 var(--s6,3rem);display:flex;flex-direction:column;align-items:center;gap:16px;-webkit-font-smoothing:antialiased}
.app-store *{box-sizing:border-box}
.app-store .as-phone{--as-f:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif;position:relative;width:min(300px,72vw);aspect-ratio:390/844;container-type:inline-size}
.app-store .as-frm{height:100%;border:${v(11)} solid #000;border-radius:${v(56)};overflow:hidden;background:#fff;box-shadow:0 ${v(14)} ${v(40)} rgba(3,6,20,.14);
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif;color:#000;position:relative}
.app-store .as-sb{height:${v(50)};display:flex;align-items:center;justify-content:space-between;padding:${v(6)} ${v(28)} 0 ${v(40)};font:600 ${v(16)}/1 var(--as-f);position:relative}
.app-store .as-isl{position:absolute;left:50%;top:${v(10)};width:${v(118)};height:${v(34)};margin-left:${v(-59)};border-radius:${v(17)};background:#000}
.app-store .as-sb svg{height:${v(12)};width:auto}
.app-store .as-nav{height:${v(40)};display:flex;align-items:center;padding:0 ${v(10)};color:#007aff;font:400 ${v(17)}/1 var(--as-f)}
.app-store .as-nav svg{width:${v(24)};height:${v(24)}}
.app-store .as-hd{display:flex;gap:${v(16)};padding:${v(6)} ${v(20)} ${v(18)}}
.app-store .as-icon{flex:none;width:${v(118)};height:${v(118)};border-radius:${v(26)};background:#8aa3bd url(${IMG}app-icon.webp) center/cover;box-shadow:inset 0 0 0 ${v(.5)} rgba(0,0,0,.12)}
.app-store .as-meta{flex:1;display:flex;flex-direction:column;min-width:0}
.app-store .as-meta b{font:600 ${v(22)}/1.2 var(--as-f);letter-spacing:-.01em}
.app-store .as-meta small{font:400 ${v(15)}/1.3 var(--as-f);color:#8a8a8e;margin-top:${v(3)}}
.app-store .as-row{margin-top:auto;display:flex;align-items:center;justify-content:space-between}
.app-store .as-get{height:${v(28)};padding:0 ${v(15)};border-radius:999px;background:#eeeef0;color:#8a8a8e;display:grid;place-items:center;font:700 ${v(14)}/1 var(--as-f);letter-spacing:.01em}
.app-store .as-row svg{width:${v(22)};height:${v(22)};color:#007aff}
.app-store .as-info{display:flex;border-top:${v(.5)} solid #d1d1d6;border-bottom:${v(.5)} solid #d1d1d6;margin:0 ${v(20)};padding:${v(10)} 0}
.app-store .as-info div{flex:1;text-align:center;display:flex;flex-direction:column;gap:${v(4)};color:#8a8a8e}
.app-store .as-info div+div{border-left:${v(.5)} solid #d1d1d6}
.app-store .as-info span{font:600 ${v(10.5)}/1 var(--as-f);text-transform:uppercase;letter-spacing:.04em}
.app-store .as-info b{font:700 ${v(15.5)}/1.1 var(--as-f);color:#636366}
.app-store .as-info small{font:400 ${v(11.5)}/1 var(--as-f)}
.app-store .as-shots{display:flex;gap:${v(10)};padding:${v(16)} ${v(20)};overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:${v(20)};scrollbar-width:none}
.app-store .as-shots::-webkit-scrollbar{display:none}
.app-store .as-shot{flex:none;width:${v(168)};height:${v(336)};border-radius:${v(20)};overflow:hidden;background:#f2f2f7;scroll-snap-align:start;display:flex;flex-direction:column;border:${v(.5)} solid rgba(0,0,0,.08)}
.app-store .as-shot p{margin:0;padding:${v(14)} ${v(12)} ${v(10)};color:#000;font:700 ${v(15.5)}/1.2 var(--as-f);text-align:center;max-width:none;letter-spacing:-.01em}
.app-store .as-shot i{flex:1;margin:0 ${v(13)};border-radius:${v(20)} ${v(20)} 0 0;border:${v(5)} solid #0b0f24;border-bottom:0;background-size:cover;position:relative;overflow:hidden;font-style:normal;display:block}
.app-store .as-pt{position:absolute;left:${v(6)};right:${v(6)};top:${v(14)};padding:${v(6)} ${v(7)};border-radius:${v(6)};background:rgba(18,20,25,.72);display:flex;flex-direction:column;gap:${v(1)}}
.app-store .as-pt em{font:700 ${v(8.4)}/1.45 var(--as-f);font-style:normal;color:#fff;white-space:nowrap}
.app-store .as-pt em.sp{color:#8e97a6}.app-store .as-pt em.lv{color:#FFB020}.app-store .as-pt em.nx{color:#F2C97E}
.app-store .as-capscr{background:#f3f5f9;display:flex!important;flex-direction:column;align-items:center;padding:${v(10)} ${v(8)} 0}
.app-store .as-capscr b{align-self:flex-start;font:700 ${v(11)}/1.2 var(--font-ots-serif),"Merriweather",Georgia,serif;color:#111827;margin-bottom:${v(6)}}
.app-store .as-vid{width:${v(80)};height:${v(142)};border-radius:${v(7)};background:#222 center/100% 100% no-repeat;position:relative;flex:none}
.app-store .as-box{position:absolute;left:${v(2)};right:${v(2)};top:56%;border:${v(.6)} dashed #fff;text-align:center;font:800 ${v(7.4)}/1.2 var(--font-ots-cap),"Montserrat",system-ui,sans-serif;color:#fff;text-transform:uppercase;text-shadow:0 0 ${v(1)} rgba(0,0,0,.8)}
.app-store .as-box em{font-style:normal;color:#ffc468}
.app-store .as-tiles{display:flex;gap:${v(4)};margin-top:${v(9)};width:100%;overflow:hidden}
.app-store .as-tiles span{flex:none;width:${v(40)};height:${v(26)};border-radius:${v(5)};background:#3f4452;display:flex;flex-direction:column;align-items:center;justify-content:center;font:800 ${v(5.6)}/1.15 var(--font-ots-cap),"Montserrat",system-ui,sans-serif;color:#fff;border:${v(1)} solid #d9dbde}
.app-store .as-tiles em{font-style:normal;font-size:${v(7.6)}}
.app-store .as-tiles .t1{border:${v(1.5)} solid #007bff}.app-store .as-tiles .t1 em{color:#f4c542}
.app-store .as-tiles .t2 em,.app-store .as-tiles .t2{color:#fff}.app-store .as-tiles .t2{background:#3f4452;box-shadow:inset 0 0 0 ${v(4)} #3f4452,inset 0 0 0 ${v(20)} #c66643}
.app-store .as-tiles .t3 em{color:#3ddc84}
.app-store .as-desc{margin:0 ${v(20)};font:400 ${v(15)}/1.35 var(--as-f);color:#000;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;max-width:none}
.app-store .as-more{margin:${v(2)} ${v(20)} 0;text-align:right;color:#007aff;font:400 ${v(15)}/1.2 var(--as-f)}
.app-store .as-tabs{position:absolute;left:0;right:0;bottom:0;height:${v(84)};background:rgba(249,249,249,.94);border-top:${v(.5)} solid #d1d1d6;display:flex;justify-content:space-around;padding-top:${v(7)};color:#999}
.app-store .as-tabs span{display:flex;flex-direction:column;align-items:center;gap:${v(3)};font:500 ${v(10)}/1 var(--as-f)}
.app-store .as-tabs svg{width:${v(26)};height:${v(26)}}
.app-store .as-tabs span.on{color:#007aff}
.app-store .as-cap{margin:0;font-size:.7rem;line-height:1.55;color:var(--muted,#86868b);text-align:center;max-width:none}
`;

const SB = `<svg viewBox="0 0 66 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9" y="3" width="3" height="9" rx=".8"/><rect x="13.5" y="0.5" width="3" height="11.5" rx=".8"/><path d="M23 4.6a9 9 0 0 1 12.4 0M25.6 7.4a5.3 5.3 0 0 1 7.2 0" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="29.2" cy="10.4" r="1.4"/><rect x="42" y="1" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.2" fill="none" opacity=".4"/><rect x="43.5" y="2.5" width="17" height="7" rx="1.8"/><rect x="63" y="4" width="1.6" height="4" rx=".8" opacity=".4"/></svg>`;

const MARKUP = `<div class="as-phone" role="img" aria-label="Own the Script's App Store page as it will appear, with the Get button reading Coming soon.">
  <div class="as-frm">
    <div class="as-sb"><span>9:41</span><span class="as-isl"></span>${SB}</div>
    <div class="as-nav">${ic(`<path d="m15 18-6-6 6-6"/>`)}Search</div>
    <div class="as-hd"><div class="as-icon"></div>
      <div class="as-meta"><b>Own the Script</b><small>Short-form viral videos</small>
        <div class="as-row"><span class="as-get">Coming soon</span>${ic(`<path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>`)}</div></div></div>
    <div class="as-info">${INFO.map(([a, b, c]) => `<div><span>${a}</span><b>${b}</b><small>${c}</small></div>`).join("")}</div>
    <div class="as-shots">${SHOTS.map(([t, inner]) => `<div class="as-shot"><p>${t}</p>${inner}</div>`).join("")}</div>
    <p class="as-desc">Record a short video with a prompter that follows your voice. Every export carries your NMLS ID and the Equal Housing mark, and one tap posts it to every platform you connect.</p>
    <div class="as-more">more</div>
    <div class="as-tabs">${TABS.map(([n, d]) => `<span${n === "Search" ? ' class="on"' : ""}>${ic(d)}${n}</span>`).join("")}</div>
  </div>
</div>
<p class="as-cap">In App Store review. Listing shown as it will appear.</p>`;

export default function AppStoreListing() {
  return (
    <div className="app-store">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
