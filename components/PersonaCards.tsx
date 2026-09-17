/**
 * The three Passport personas, one at a time, with room to breathe.
 *
 * No portraits: each person leads with the line that matters to the product
 * (when the benefit has to surface), set large in the category colour's
 * company, with the dossier laid out beside it. The frustration that two of
 * them share is marked as shared, because that repetition is the section's point.
 */

type Persona = {
  name: string;
  colour: string;
  category: string;
  surfaces: string;
  who: string;
  bio: string;
  wants: string[];
  frustrations: { text: string; shared?: boolean }[];
  tech: [string, number][];
  brands: string[];
};

const PERSONAS: Persona[] = [
  {
    name: "Thomas",
    colour: "#D9433A",
    category: "Dine",
    surfaces: "Near home, on a weeknight",
    who: "55 · Kirkland · IT support · married, no kids",
    bio: "Owns a home in North Seattle with his wife, two cats and a German Shepherd. Works at a high end tech company in downtown Bellevue. Avid jogger who loves nature and takes his wife and dog to nearby parks for after work runs. Dines out two to four times a week.",
    wants: ["Reduce monthly dining out cost while still trying new restaurants", "Renovate a few rooms with modern upgrades on a smaller budget"],
    frustrations: [
      { text: "Doesn't want to hire a contractor but has no time to research sub-contractors" },
      { text: "Feels the restaurant options are low quality and would like to see better ones" },
      { text: "Believes he has a better grasp on UX than most and that we should gamify the experience" },
    ],
    tech: [["Internet", 5], ["Social", 3], ["Shopping", 2], ["Messaging", 5], ["Games", 4]],
    brands: ["Apple", "Google", "Instagram", "Nintendo"],
  },
  {
    name: "Emily",
    colour: "#E8862B",
    category: "Shop",
    surfaces: "Somewhere that will tolerate a six year old",
    who: "33 · Seattle · HR director · married, two kids",
    bio: "Director of HR at a mid sized law firm in Olympia. Telecommutes most days but is looking for work closer to home, ideally at a sustainable energy firm. The family goes out of town on weekends when it can. The kids are six and nine.",
    wants: ["More kid centered savings options nearby", "Casual dining, not the high end offers that fill the current app"],
    frustrations: [
      { text: "Can't find the filters once they have been applied" },
      { text: "Navigation is unnatural and hidden, so she rarely opens the app" },
      { text: "Turned away for the discount at a business that had quietly left the program", shared: true },
    ],
    tech: [["Internet", 4], ["Social", 4], ["Shopping", 3], ["Messaging", 4], ["Games", 1]],
    brands: ["Microsoft", "Ulta", "Amazon", "Android"],
  },
  {
    name: "James",
    colour: "#2A8FD1",
    category: "Travel",
    surfaces: "In a city he landed in that morning",
    who: "29 · Bellevue · entrepreneur · single",
    bio: "Entrepreneur and investor. Enjoys red wine and good food. Week nights are for client meetings and the occasional date. Lives in an apartment downtown but is rarely there except to sleep. Travels within the states most weeks and abroad once or twice a month.",
    wants: ["Quick deals on flights and up to the minute offers", "Redemption that is easier than showing a card, like a QR code"],
    frustrations: [
      { text: "Sees little content that is relevant to where he actually is" },
      { text: "Can't reach the redemption when there is no wifi or data" },
      { text: "Turned away for the discount at a business that had quietly left the program", shared: true },
    ],
    tech: [["Internet", 5], ["Social", 4], ["Shopping", 2], ["Messaging", 5], ["Games", 2]],
    brands: ["Apple", "Mercedes", "Instagram", "Amazon"],
  },
];

const STYLES = `.personas{--hair:rgba(29,29,31,.12);--mute:#86868b;--ink-2:#424245;
  --display:var(--font-condensed),"Archivo",system-ui,sans-serif;
  margin:0 0 var(--s6,3rem);font-family:var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink,#1d1d1f)}
.personas .person{display:grid;grid-template-columns:minmax(200px,5fr) 8fr;column-gap:clamp(32px,5vw,72px);padding:44px 0 52px;border-top:1px solid var(--hair)}
.personas .person:first-child{border-top:0;padding-top:8px}
.personas .lead .cat{display:flex;align-items:center;gap:7px;margin:0 0 18px;font-size:11.5px;line-height:1;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--c)}
.personas .lead .cat i{width:11px;height:11px;border-radius:50%;background:var(--c)}
.personas .lead .surf{margin:0 0 26px;font-family:var(--display);font-variation-settings:"wdth" 72;font-weight:700;font-size:clamp(1.7rem,2.6vw,2.3rem);line-height:1;letter-spacing:0;text-transform:uppercase;color:var(--ink,#1d1d1f);text-wrap:balance;max-width:none}
.personas .lead .nm{margin:0 0 4px;font-size:17px;line-height:1.3;font-weight:600;color:var(--ink,#1d1d1f);max-width:none}
.personas .lead .who{margin:0;font-size:14px;line-height:1.5;color:var(--mute);max-width:none}
.personas .body{display:grid;gap:30px;align-content:start}
.personas .body h4{margin:0 0 10px;font-size:11.5px;line-height:1.3;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--mute)}
.personas .body p{margin:0;font-size:15.5px;line-height:1.65;color:var(--ink-2);max-width:none}
.personas .two{display:grid;grid-template-columns:1fr 1fr;gap:30px 36px}
.personas .body ul{margin:0;padding:0;list-style:none;display:grid;gap:10px;font-size:14.5px;line-height:1.55;color:var(--ink-2)}
.personas .body li{position:relative;padding-left:16px}
.personas .body li::before{content:"";position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--c)}
.personas .body li.shared::before{background:transparent;box-shadow:inset 0 0 0 1.5px var(--ink,#1d1d1f);width:7px;height:7px;top:.56em;left:-1px}
.personas .meta{display:grid;grid-template-columns:1fr 1fr;gap:30px 36px}
.personas .tech{display:grid;gap:8px}
.personas .tech div{display:grid;grid-template-columns:5.6rem 1fr;align-items:center;gap:10px;font-size:13px;color:var(--mute)}
.personas .bar{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;height:6px;max-width:150px}
.personas .bar i{background:rgba(29,29,31,.1);border-radius:1px}
.personas .bar i.on{background:var(--c)}
.personas .brands{display:flex;flex-wrap:wrap;gap:8px 12px;font-size:14px;line-height:1.4;color:var(--ink-2)}
.personas .key{margin:8px 0 0;padding-top:14px;border-top:1px solid var(--hair);font-size:12.5px;line-height:1.5;color:var(--mute);display:flex;align-items:center;gap:8px}
.personas .key i{width:7px;height:7px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--ink,#1d1d1f);flex:none}
@media (max-width:760px){
  .personas .person{grid-template-columns:1fr;row-gap:26px;padding:32px 0 36px}
  .personas .lead .surf{margin-bottom:18px}
  .personas .two,.personas .meta{grid-template-columns:1fr}
}
`;

export default function PersonaCards() {
  return (
    <div className="personas">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {PERSONAS.map((p) => (
        <article className="person" key={p.name} style={{ "--c": p.colour } as React.CSSProperties}>
          <div className="lead">
            <div className="cat"><i aria-hidden="true" />{p.category}</div>
            <p className="surf">{p.surfaces}</p>
            <p className="nm">{p.name}</p>
            <p className="who">{p.who}</p>
          </div>
          <div className="body">
            <div><h4>Life</h4><p>{p.bio}</p></div>
            <div className="two">
              <div><h4>Wants</h4><ul>{p.wants.map((w) => <li key={w}>{w}</li>)}</ul></div>
              <div><h4>Frustrations</h4><ul>{p.frustrations.map((f) => <li key={f.text} className={f.shared ? "shared" : undefined}>{f.text}</li>)}</ul></div>
            </div>
            <div className="meta">
              <div>
                <h4>Tech use</h4>
                <div className="tech">
                  {p.tech.map(([k, n]) => (
                    <div key={k}><span>{k}</span><span className="bar" aria-label={`${n} of 5`}>{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < n ? "on" : ""} />)}</span></div>
                  ))}
                </div>
              </div>
              <div><h4>Brands</h4><div className="brands">{p.brands.map((b) => <span key={b}>{b}</span>)}</div></div>
            </div>
          </div>
        </article>
      ))}
      <p className="key"><i aria-hidden="true" />The same sentence, in two of the three.</p>
    </div>
  );
}
