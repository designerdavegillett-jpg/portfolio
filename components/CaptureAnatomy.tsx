"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive anatomy of the Own the Script capture screen.
 *
 * Line-art of the recording screen beside a list of its seven parts. Hovering
 * either side highlights the part on the phone, draws a leader line, and opens
 * one card of plain-language copy. The prompter scrolls while it is hovered and
 * the take timer and progress ring run live.
 *
 * Markup and behaviour are injected rather than written as JSX: the drawing is
 * a single large SVG that reads far better as markup than as thousands of
 * converted attributes, and the interaction is imperative DOM work either way.
 * Every selector is scoped under .capture-anatomy so nothing leaks into
 * globals.css.
 */

const STYLES = `.capture-anatomy{--paper:#f5f5f7; --paper-sunk:#e8e8ed; --ink:#1d1d1f; --ink-2:#424245; --mute:#86868b;
    --hair:rgba(29,29,31,.12); --card:#ffffff; --hi:#0071E3;
    --acc:#FF6B00; --acc-2:#E8935A; --rec:#FF3B30; --spent:#8E97A6;
    --panel:#2b2b2e; --panel-text:#FFFFFF; --dim:0.3;
    --sans:var(--font-body),"Inter Tight",system-ui,sans-serif;
    --display:var(--font-condensed),"Archivo",system-ui,sans-serif;
    --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;}
.capture-anatomy *{box-sizing:border-box}
.capture-anatomy{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--ink);font-family:var(--sans);margin-block:var(--s6,3rem)}
.capture-anatomy .figure{position:relative;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:auto minmax(320px,1fr);gap:40px clamp(32px,5vw,64px);align-items:start}
.capture-anatomy .phone{position:relative;width:min(480px,42vw);display:block;justify-self:center}
.capture-anatomy .phone svg{width:100%;height:auto;display:block;overflow:hidden;border-radius:6px;
    --ink:#e9ecf1; --ink-2:#b6bcc6; --mute:#6f7885; --hi:#2997FF; --acc-2:#F0A472}
.capture-anatomy .part{transition:opacity .22s ease}
.capture-anatomy .figure.has-active .part:not(.active){opacity:var(--dim)}
.capture-anatomy .part .hl{display:none}
.capture-anatomy .part .ink, .capture-anatomy .part .mute, .capture-anatomy .part [stroke]{transition:stroke .2s ease,stroke-width .2s ease}
.capture-anatomy .part.active .ink, .capture-anatomy .part.active .mute, .capture-anatomy .part.active path[stroke], .capture-anatomy .part.active rect[stroke], .capture-anatomy .part.active circle[stroke]{stroke:var(--hi);stroke-width:1.5}
.capture-anatomy .part.active .lbl{fill:var(--hi)}
.capture-anatomy .gf{fill:var(--ink);transition:fill .2s}
.capture-anatomy .part.active .gf{fill:var(--hi)}
.capture-anatomy .part.active .keep{stroke:var(--mute)!important;stroke-width:2!important}
.capture-anatomy .part.active [style*="transparent"]{stroke:var(--hi)!important}
.capture-anatomy .pin{display:none}
.capture-anatomy .pin circle{fill:var(--paper);stroke:var(--ink);stroke-width:1.25;transition:fill .2s,stroke .2s,transform .2s}
.capture-anatomy .pin path{stroke:var(--ink);stroke-width:1.75;stroke-linecap:round;fill:none;transition:stroke .2s,transform .25s ease}
.capture-anatomy .part.active .pin circle{fill:var(--acc);stroke:var(--acc)}
.capture-anatomy .part.active .pin path{stroke:#fff;transform:rotate(45deg)}
.capture-anatomy .ink{stroke:var(--ink);fill:none;stroke-width:1}
.capture-anatomy .mute{stroke:var(--mute);fill:none;stroke-width:1}
.capture-anatomy .dash{stroke-dasharray:4 4}
.capture-anatomy .lbl{font:12.5px var(--sans);fill:var(--ink);text-anchor:middle}
.capture-anatomy .zone{opacity:0;transition:opacity .25s ease}
.capture-anatomy .part.active .zone{opacity:1}
.capture-anatomy .part[data-part="3"] > *:not(.hitbox){opacity:0;transition:opacity .25s ease}
.capture-anatomy .part[data-part="3"].active > *{opacity:1}
.capture-anatomy .part[data-part="3"].active .lbl{opacity:0}
.capture-anatomy .zl{font:400 13px var(--sans);fill:var(--hi)}
.capture-anatomy .zt{font:400 15px var(--sans);fill:var(--hi)}
.capture-anatomy .pt{font:500 22.58px var(--sans)}
.capture-anatomy .hitbox{fill:transparent;cursor:pointer}
.capture-anatomy .col{align-self:start;display:flex;flex-direction:column}
.capture-anatomy .lede{margin:0 0 var(--s4,1.35rem);font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.45rem;line-height:1.12;font-weight:700;letter-spacing:0;text-transform:uppercase;color:var(--ink);text-wrap:pretty;max-width:none}
.capture-anatomy .callouts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.capture-anatomy .callouts li{border-top:1px solid var(--hair);transition:opacity .22s ease}
.capture-anatomy .callouts li:last-child{border-bottom:1px solid var(--hair)}
.capture-anatomy .figure.has-active .callouts li:not(.active){opacity:.45}
.capture-anatomy .co{all:unset;display:block;width:100%;cursor:pointer;padding:12px 4px}
.capture-anatomy .co:focus-visible{outline:2px solid var(--hi);outline-offset:-2px;border-radius:6px}
.capture-anatomy .co h2{margin:0;font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.02rem;line-height:1.18;font-weight:700;letter-spacing:.006em;text-transform:uppercase;transition:color .2s}
.capture-anatomy li.active .co h2{color:var(--hi)}
.capture-anatomy .detail{display:grid;width:100%;margin-top:26px;opacity:0;visibility:hidden;border:1px solid var(--hair);border-radius:12px;padding:24px 26px;background:var(--card);overflow:hidden;transition:height .3s cubic-bezier(.3,.7,.3,1),opacity .2s ease}
.capture-anatomy .detail.on{opacity:1;visibility:visible}
.capture-anatomy .detail h3{margin:0 0 8px;font-size:14.7px;line-height:1.3;font-weight:600;color:var(--hi);letter-spacing:0}
.capture-anatomy .detail .dsc{grid-area:1/1;align-self:start;font-weight:400;font-synthesis-weight:none;font-size:13.8px;line-height:1.68;color:var(--ink-2);max-width:none;opacity:0;transform:translateY(4px);transition:opacity .22s ease,transform .22s ease;pointer-events:none}
.capture-anatomy .detail .dsc.on{opacity:1;transform:none}
.capture-anatomy .co ul{margin:0;padding:12px 0 0 18px;display:flex;flex-direction:column;gap:10px}
.capture-anatomy .detail ul{margin:0;padding:12px 0 0 18px;display:flex;flex-direction:column;gap:10px}
.capture-anatomy .detail li, .capture-anatomy .detail .dsc span{font-weight:400}
.capture-anatomy .detail li{border:0}
.capture-anatomy .detail b{color:var(--ink);font-weight:600}
.capture-anatomy .lead{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:1}
.capture-anatomy .lead path{fill:none;stroke:var(--hi);stroke-width:1.25;opacity:0;transition:opacity .2s ease}
.capture-anatomy .lead circle{fill:var(--hi);opacity:0;transition:opacity .2s ease}
.capture-anatomy .lead.on path, .capture-anatomy .lead.on circle{opacity:1}

  @media (max-width:980px){.capture-anatomy .lead{display:none}
}

  @media (max-width:820px){.capture-anatomy .figure{grid-template-columns:1fr}
.capture-anatomy .co h2{font-size:1rem}

  }

  @media (prefers-reduced-motion:reduce){.capture-anatomy *{transition:none!important}
}
`;

const MARKUP = `<figure class="figure" id="fig" style="margin:0 auto">
  <div class="phone">
    <svg viewBox="-20 -20 533 1109" xmlns="http://www.w3.org/2000/svg" aria-label="Line drawing of the recording screen with seven highlighted parts" role="img">
      <g id="scene">
      <!-- dark ground for the drawing -->
      <rect x="-15" y="-15" width="523" height="1099" rx="60" fill="#0d1014"/>
      <rect x="0" y="0" width="493" height="1069" rx="46" fill="#15181d"/>
      <!-- shell -->
      <rect class="ink" x="-15" y="-15" width="523" height="1099" rx="60" stroke-width="1.5"/>
      <rect class="ink" x="0" y="0" width="493" height="1069" rx="46"/>
      <!-- status bar -->
      <rect class="ink" x="174" y="14" width="146" height="38" rx="19"/>
      <circle cx="192" cy="33" r="3.5" fill="var(--rec)"/>
      <text id="clock" x="44" y="34" style="font:700 15px var(--sans);fill:var(--ink);font-variant-numeric:tabular-nums">4:01</text>
      <g fill="var(--ink)">
        <rect x="380" y="34" width="3" height="5" rx="1"/><rect x="385" y="31" width="3" height="8" rx="1"/><rect x="390" y="28" width="3" height="11" rx="1"/><rect x="395" y="25" width="3" height="14" rx="1"/>
      </g>
      <path class="ink" d="M408 31a12 12 0 0 1 16 0M411 34.5a8 8 0 0 1 10 0" stroke-width="1.5"/><circle cx="416" cy="38" r="1.5" fill="var(--ink)"/>
      <rect class="ink" x="434" y="26" width="24" height="12" rx="3"/><rect x="436" y="28" width="20" height="8" rx="2" fill="var(--ink)"/><rect x="459" y="29" width="2" height="6" rx="1" fill="var(--ink)"/>

      <!-- 4 thirds grid + safe zone -->
      <g class="part" data-part="4">
        <line class="mute dash" x1="164.3" y1="0" x2="164.3" y2="1069"/>
        <line class="mute dash" x1="328.7" y1="0" x2="328.7" y2="1069"/>
        <line class="mute dash" x1="0" y1="356.3" x2="493" y2="356.3"/>
        <line class="mute dash" x1="0" y1="712.5" x2="404" y2="712.5"/>
        <path class="mute" stroke-dasharray="8 5" d="M47 78 H453 a18 18 0 0 1 18 18 V424.4 H422.4 a18 18 0 0 0 -18 18 V781 a18 18 0 0 1 -18 18 H47 a18 18 0 0 1 -18 -18 V96 a18 18 0 0 1 18 -18 Z"/>
        <g class="zone">
          <path d="M0 799 H493 V1023 a46 46 0 0 1 -46 46 H46 a46 46 0 0 1 -46 -46 Z" fill="var(--hi)" opacity=".10"/>
          <path d="M493 424.4 H422.4 a18 18 0 0 0 -18 18 V799 H493 Z" fill="var(--hi)" opacity=".10"/>
                    <circle cx="46" cy="842" r="15" fill="none" stroke="var(--hi)" stroke-width="1.6"/>
          <path d="M40 848a7 7 0 0 1 12 0M46 839a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" fill="none" stroke="var(--hi)" stroke-width="1.6"/>
          <text class="zt" x="70" y="847" style="font-weight:700">Social Account Name</text>
          <text class="zt" x="28" y="884">Refinancing into a shorter term is the</text>
          <text class="zt" x="28" y="908">quiet wealth move - here is why #mortgage</text>
          <g fill="none" stroke="var(--hi)" stroke-width="1.6">
            <path d="M31 948v-14l11-3v14"/><circle cx="28" cy="948" r="3.4"/><circle cx="39" cy="945" r="3.4"/>
          </g>
          <text class="zt" x="52" y="951" style="font-size:14px">Original sound - Social Account Name</text>
          <rect x="28" y="1000" width="437" height="4" rx="2" fill="var(--hi)" opacity=".35"/>
          <rect x="28" y="1000" width="150" height="4" rx="2" fill="var(--hi)"/>
          <text class="zl" x="28" y="1036" style="font-size:12px">Reserved by the platform - keep your face and any text above it</text>
        </g>
        <g class="pin" transform="translate(164.3 712.5)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="300" y="360" width="60" height="180" data-hit="4"/>
      </g>

      <!-- 2 prompter -->
      <g class="part" data-part="2">
        <path class="ink" d="M47 78 H453 a18 18 0 0 1 18 18 V306 H29 V96 a18 18 0 0 1 18 -18 Z"/>
        <clipPath id="ptclip"><rect x="29" y="78" width="442" height="228"/></clipPath>
        <linearGradient id="ptfade" gradientUnits="userSpaceOnUse" x1="0" y1="212" x2="0" y2="306"><stop offset="0" stop-color="#fff"/><stop offset=".09" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient>
        <mask id="ptmask" maskUnits="userSpaceOnUse" x="29" y="78" width="442" height="228"><rect x="29" y="78" width="442" height="228" fill="url(#ptfade)"/></mask>
        <g clip-path="url(#ptclip)" mask="url(#ptmask)"><g id="ptl"></g></g>
        <path class="ink" d="M47 78 H453 a18 18 0 0 1 18 18 V306 H29 V96 a18 18 0 0 1 18 -18 Z" style="stroke:transparent"/>
        <g class="pin" transform="translate(246.5 188)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="29" y="78" width="442" height="228" data-hit="2"/>
      </g>

      <!-- 3 drift pill -->
      <g class="part" data-part="3">
        <rect class="mute" stroke-dasharray="3 3" x="97.2" y="335" width="298.6" height="27.6" rx="13.8"/>
        <g class="zone">
          <rect x="97.2" y="335" width="298.6" height="27.6" rx="13.8" fill="var(--hi)" opacity=".12"/>
          <g transform="translate(112 342)" stroke="var(--hi)" fill="none" stroke-width="1.4" stroke-linecap="round">
            <path d="M6.5 0.6a2.6 2.6 0 0 1 2.6 2.6v4.6a2.6 2.6 0 0 1-5.2 0V3.2A2.6 2.6 0 0 1 6.5.6z"/>
            <path d="M2 7.6a4.5 4.5 0 0 0 9 0M6.5 12.1v2"/>
            <path d="M0.6 0.6l12 14" stroke-width="1.6"/>
          </g>
          <text class="zl" x="253" y="354" text-anchor="middle" style="font-size:12px">Not hearing you - using estimated pace</text>
        </g>
        <text class="lbl" x="246.5" y="352.8" style="fill:var(--mute);font-size:11px">Not hearing you - using estimated pace</text>
        <rect class="hl" x="97.2" y="335" width="298.6" height="27.6" rx="13.8"/>
        <g class="pin" transform="translate(246.5 326.8)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="97.2" y="329" width="298.6" height="40" data-hit="3"/>
      </g>

      <!-- 5 capture rail -->
      <g class="part" data-part="5">
        <g transform="translate(422.2,451)">
          <circle class="mute" cx="26.3" cy="26.3" r="26.3"/>
          <path class="ink" stroke-linejoin="round" stroke-width="1.3" d="M16.8 17.8h5.2l1.6-3h5.4l1.6 3h5.2a2.5 2.5 0 0 1 2.5 2.5v14.4a2.5 2.5 0 0 1-2.5 2.5H16.8a2.5 2.5 0 0 1-2.5-2.5V20.3a2.5 2.5 0 0 1 2.5-2.5z"/>
          <path class="ink" stroke-width="1.3" stroke-linecap="round" d="M21.18 26.6A5.2 5.2 0 0 1 30.28 24.16M31.42 28.4A5.2 5.2 0 0 1 22.32 30.84"/>
          <path class="gf" d="M31.57 25.69L31.81 22.87L28.75 25.45ZM21.03 29.31L23.85 29.55L20.79 32.13Z"/>
          <text class="lbl" x="26.3" y="73">Flip</text>
        </g>
        <g transform="translate(422.2,543.7)">
          <circle class="mute" cx="26.3" cy="26.3" r="26.3"/>
          <rect class="ink" x="16" y="16" width="21" height="21"/>
          <path class="ink" d="M23 16v21M30 16v21M16 23h21M16 30h21"/>
          <text class="lbl" x="26.3" y="73">Grid</text>
        </g>
        <g transform="translate(422.2,636.4)">
          <circle class="mute" cx="26.3" cy="26.3" r="26.3"/>
          <text class="lbl" x="26.3" y="30" style="font-weight:700;font-size:11px">AUTO</text>
          <text class="lbl" x="26.3" y="73">Pace</text>
        </g>
        <g transform="translate(422.2,729.1)">
          <circle class="mute" cx="26.3" cy="26.3" r="26.3"/>
          <path class="ink" d="M19 19l14.6 14.6M33.6 19L19 33.6"/>
          <text class="lbl" x="26.3" y="73">Cancel</text>
        </g>
        <rect class="hl" x="417" y="451" width="63.2" height="364.2" rx="6"/>
        <g class="pin" transform="translate(453.5 632)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="417" y="451" width="63.2" height="364.2" data-hit="5"/>
      </g>

      <!-- 6 timer pill -->
      <g class="part" data-part="6">
        <rect class="ink" x="198" y="870.6" width="96.9" height="40.6" rx="20.3"/>
        <circle cx="220.6" cy="890.9" r="5" fill="var(--rec)"/>
        <text id="elapsed" x="234" y="897" style="font:700 16px var(--sans);fill:var(--ink);font-variant-numeric:tabular-nums">0:00</text>
        <rect class="hl" x="198" y="870.6" width="96.9" height="40.6" rx="20.3"/>
        <g class="pin" transform="translate(246.5 890.9)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="190" y="864" width="112" height="54" data-hit="6"/>
      </g>

      <!-- 7 record ring -->
      <g class="part" data-part="7">
        <circle class="keep" cx="246.5" cy="981.4" r="56.7" fill="none" stroke="var(--mute)" stroke-width="2"/>
        <circle cx="246.5" cy="981.4" r="56.7" fill="none" stroke="var(--acc)" stroke-width="2"
                id="sweep" stroke-dasharray="0 356.3" transform="rotate(-90 246.5 981.4)"/>
        <rect x="229.5" y="964.4" width="34" height="34" rx="8" fill="var(--rec)"/>
        <rect class="hl" x="180" y="924" width="133" height="115" rx="60"/>
        <g class="pin" transform="translate(246.5 981.4)"><circle r="14"/><path d="M-5 0h10M0 -5v10"/></g>
        <rect class="hitbox" x="180" y="924" width="133" height="115.4" data-hit="7"/>
      </g>
      </g>
    </svg>
  </div>

  <div class="col">
  <h1 class="lede">Anatomy of a capture screen reimagined</h1>
  <ol class="callouts" id="callouts">
    <li data-part="2"><button class="co" type="button"><h2>Prompter</h2><div class="dsc"><span>Listens as you speak and scrolls at your pace, so the script never runs ahead of you or drags behind. Five lines at a time: the line you're saying is orange, the next one warms up, and what you've already said fades back.</span></div></button></li>
    <li data-part="3"><button class="co" type="button"><h2>When the mic drops out</h2><div class="dsc"><span>The prompter follows your voice, so if the mic stops hearing you - a noisy room, a hand over the mic, a permission that lapsed - it would otherwise freeze mid-sentence and you'd stop with it. Instead this pill appears and the script falls back to scrolling at a steady estimated pace, so the take keeps running. It's hidden the rest of the time.</span></div></button></li>
    <li data-part="4"><button class="co" type="button"><h2>Framing guide</h2><div class="dsc"><span>Shows you where your video will actually be seen once it's posted, so you frame for the feed, not the screen.<ul><li><b>Safe zone</b> outlines the area short-video platforms leave clear. Keep your face and anything that matters inside it.</li><li><b>Bottom band</b> is reserved for the caption, username and sound that platforms lay over the video.</li><li><b>Right rail</b> mirrors where platforms stack like, comment and share, so your actions rail sits where their buttons will.</li><li><b>Rule of thirds</b> grid for placing yourself off-centre. Toggle it all from Grid on the rail.</li></ul></span></div></button></li>
    <li data-part="5"><button class="co" type="button"><h2>Actions rail</h2><div class="dsc"><span>Everything you might touch mid-take, within thumb reach.<ul><li><b>Flip</b> switches between the front and back camera.</li><li><b>Grid</b> turns the framing guide on or off.</li><li><b>Pace</b> sets how fast the script scrolls: Auto follows your voice, or lock it to 0.5x, 1.0x, 1.5x or 2.0x.</li><li><b>Cancel</b> ends the take without saving. It sits last so you don't hit it by accident.</li></ul></span></div></button></li>
    <li data-part="6"><button class="co" type="button"><h2>Take timer</h2><div class="dsc"><span>Counts up from the first frame. The red dot is tied to the real recording state, so it never says you're rolling when you're not.</span></div></button></li>
    <li data-part="7"><button class="co" type="button"><h2>Progress ring</h2><div class="dsc"><span>The ring fills as you move through the script, so you can see how much is left without reading ahead.</span></div></button></li>
  </ol>
  <div class="detail" id="detail"></div>
  <svg class="lead" id="lead" aria-hidden="true"></svg>
  </div>
</figure>`;

export default function CaptureAnatomy() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const cleanups: Array<() => void> = [];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- the
       drawing is injected markup, so one assertion here beats fifty casts. */
    const q = (sel: string): any => host.querySelector(sel);
    /* The drawing is injected markup, so every lookup is a runtime query. Types
       are asserted once in q() rather than at each of the fifty call sites. */
    (function () {

        const fig=q('#fig');
        const list=q('#callouts');
        const parts=[...fig.querySelectorAll('svg .part[data-part]')];
        const items: HTMLLIElement[] = [...list.querySelectorAll('li[data-part]')];
        let pinned: string | null = null, hover: string | null = null;
        // prompter: smooth scroll while hovered, speed ramps up and down
        const SCRIPT=["Refinancing into a shorter term is","the quiet wealth move. Your","payment may rise, but more of every","payment goes to the balance","instead of interest, and you own","your home years sooner. Rates","moved again this month, so let's","run your numbers before the","window closes. Reply here and I'll","send two options side by side."];
        const ptl=q('#ptl'), PITCH=38.87, Y0=119.2, N=SCRIPT.length;
        const nodes: SVGTextElement[] = []; for(let k=0;k<9;k++){const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('class','pt');t.setAttribute('x','46.7');ptl.appendChild(t);nodes.push(t);}
        let pos=2, speed=0, wantPT=false, last=performance.now();
        const MAX=0.55; // lines per second
        function renderPT(){
          const base=Math.floor(pos), live=Math.round(pos);
          nodes.forEach((t,k)=>{const i=base-2+k; const off=i-live;
            t.textContent=SCRIPT[((i%N)+N)%N];
            t.setAttribute('y',(Y0+(i-pos+2)*PITCH).toFixed(2));
            t.setAttribute('fill',off<0?'var(--mute)':off===0?'var(--acc)':off===1?'var(--acc-2)':'var(--ink)');});
        }
        function ptFrame(now: number){
          const dt=Math.min(0.05,(now-last)/1000); last=now;
          const target=wantPT?MAX:0, k=wantPT?2.2:1.6;   // ramp rates
          speed+=(target-speed)*(1-Math.exp(-k*dt));
          if(speed<0.002&&!wantPT) speed=0;
          if(speed>0){pos+=speed*dt; if(pos>=N) pos-=N;}
          renderPT(); ptRaf=requestAnimationFrame(ptFrame);
        }
        function setPrompter(on: boolean){wantPT=on;}
        let ptRaf=0; renderPT(); ptRaf=requestAnimationFrame(ptFrame); cleanups.push(()=>cancelAnimationFrame(ptRaf));

        const detail=q('#detail');
        items.forEach((li)=>{const d=li.querySelector('.dsc') as HTMLElement; d.dataset.part=li.dataset.part;
          const h=document.createElement('h3'); h.textContent=li.querySelector('h2')!.textContent;
          d.insertBefore(h,d.firstChild); detail.appendChild(d);});
        const lead=q('#lead');
        const dscs: HTMLElement[] = [...detail.querySelectorAll('.dsc')];
        let lastId: string | null = null;
        function apply(){
          const id=hover||pinned;
          setPrompter(id==='2');
          fig.classList.toggle('has-active',!!id);
          parts.forEach((p)=>p.classList.toggle('active',p.dataset.part===id));
          items.forEach((l)=>l.classList.toggle('active',l.dataset.part===id));
          lastId=id;
          detail.classList.toggle('on',!!id);
          dscs.forEach((d)=>d.classList.toggle('on',!!id&&d.dataset.part===id));
          sizeDetail();
          drawLead(id);
        }
        const phone=fig.querySelector('.phone') as HTMLElement, AR=533/1109;
        function sizePhone(){
          if(getComputedStyle(fig).gridTemplateColumns.split(' ').length<2){phone.style.width='';return;}
          const tallest=Math.max(...dscs.map((d)=>d.offsetHeight))+50;
          const target=list.offsetHeight+26+tallest;
          /* The list lost a row, so height alone under-sizes the drawing.
             Scale up and hold a floor, capped so it never crowds the column. */
          phone.style.width=Math.round(target*AR*1.25)+'px';
        }
        function sizeDetail(){
          const a=dscs.find((d)=>d.classList.contains('on'));
          if(a) detail.style.height=(a.offsetHeight+48)+'px';
        }
        function drawLead(id: string | null){
          if(!id||getComputedStyle(lead).display==='none'){lead.classList.remove('on');return;}
          const hit=fig.querySelector(`.part[data-part="${id}"] .hitbox`);
          if(!hit){lead.classList.remove('on');return;}
          const f=fig.getBoundingClientRect(), h=hit.getBoundingClientRect(), d=detail.getBoundingClientRect();
          lead.setAttribute('viewBox',`0 0 ${f.width} ${f.height}`);
          const ax=h.right-f.left, ay=h.top+h.height/2-f.top;
          const bx=d.left-f.left, by=d.top-f.top+28;
          const mx=(ax+bx)/2;
          lead.innerHTML=`<path d="M${ax} ${ay} H${mx} V${by} H${bx-2}"/><circle cx="${ax}" cy="${ay}" r="3.5"/>`;
          lead.classList.add('on');
        }
        const onResize=()=>{sizePhone();sizeDetail();drawLead(hover||pinned||lastId);};
        addEventListener('resize',onResize); cleanups.push(()=>removeEventListener('resize',onResize));
        function bind(el: Element, id: string){
          el.addEventListener('mouseenter',()=>{hover=id;apply();});
          el.addEventListener('mouseleave',()=>{hover=null;apply();});
          el.addEventListener('focusin',()=>{hover=id;apply();});
          el.addEventListener('focusout',()=>{hover=null;apply();});
          el.addEventListener('click',()=>{pinned=(pinned===id)?null:id;hover=null;apply();});
        }
        parts.forEach((p)=>bind(p,p.dataset.part as string));
        items.forEach((l)=>bind(l,l.dataset.part as string));
        const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){pinned=null;hover=null;apply();}};
        document.addEventListener('keydown',onKey); cleanups.push(()=>document.removeEventListener('keydown',onKey));

        const clock=q('#clock');
        function tick(){const d=new Date();const h=d.getHours()%12||12;clock.textContent=h+':'+String(d.getMinutes()).padStart(2,'0');}
        tick(); const clockTimer=setInterval(tick,1000); cleanups.push(()=>clearInterval(clockTimer));
        // recording loop: 45 s take, timer counts up, ring sweeps to full, then a fresh take
        const elapsed=q('#elapsed'), sweep=q('#sweep'), TAKE=45000, C=356.3;
        const t0=performance.now();
        function rec(){const ms=(performance.now()-t0)%TAKE; const sec=Math.floor(ms/1000);
          elapsed.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');
          sweep.setAttribute('stroke-dasharray',(ms/TAKE*C).toFixed(1)+' '+C); raf=requestAnimationFrame(rec);}
        let raf=requestAnimationFrame(rec); cleanups.push(()=>cancelAnimationFrame(raf));
        sizePhone(); apply();
        if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{sizePhone();sizeDetail();});

    })();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="capture-anatomy" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </div>
  );
}
