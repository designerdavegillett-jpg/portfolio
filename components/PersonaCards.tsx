/**
 * The three Passport personas, side by side.
 *
 * The section's argument is that they were deliberately not the same person,
 * and that two of them share one sentence. So the figure is a comparison, not
 * three portraits: one row per dimension, one column per persona, and the
 * repeated frustration is marked as repeated. Each column leads with the line
 * that matters to the product (when the benefit has to surface), set in the
 * persona's category colour, in place of a face.
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

const ROWS: { key: string; label: string }[] = [
  { key: "bio", label: "Life" },
  { key: "wants", label: "Wants" },
  { key: "frustrations", label: "Frustrations" },
  { key: "tech", label: "Tech use" },
  { key: "brands", label: "Brands" },
];

const STYLES = `.personas{--hair:rgba(29,29,31,.12);--mute:#86868b;--ink-2:#424245;
  --display:var(--font-condensed),"Archivo",system-ui,sans-serif;
  margin:0 0 var(--s6,3rem);font-family:var(--font-body),"Inter Tight",system-ui,sans-serif;color:var(--ink,#1d1d1f)}
.personas .grid{display:grid;grid-auto-flow:column;grid-template-rows:auto repeat(5,auto);grid-template-columns:5.5rem repeat(3,minmax(0,1fr));column-gap:clamp(16px,2.5vw,32px)}
.personas .col{display:contents}
.personas .rl{grid-column:1;padding:14px 0 18px;font-size:11px;line-height:1.3;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);border-top:1px solid var(--hair)}
.personas .cell{padding:14px 0 18px;border-top:1px solid var(--hair);font-size:13.5px;line-height:1.55;color:var(--ink-2)}
.personas .cell p{margin:0;font-size:inherit;line-height:inherit;color:inherit;max-width:none}
.personas .cell ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.personas .cell li{position:relative;padding-left:14px}
.personas .cell li::before{content:"";position:absolute;left:0;top:.62em;width:5px;height:5px;border-radius:50%;background:var(--c)}
.personas .cell li.shared::before{background:transparent;box-shadow:inset 0 0 0 1.5px var(--ink,#1d1d1f);top:.58em;width:6px;height:6px;left:-1px}
.personas .head{padding:0 0 18px;border-top:3px solid var(--c)}
.personas .head .cat{display:flex;align-items:center;gap:6px;margin:12px 0 14px;font-size:11px;line-height:1;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--c)}
.personas .head .cat i{width:10px;height:10px;border-radius:50%;background:var(--c)}
.personas .head .surf{margin:0;font-family:var(--display);font-variation-settings:"wdth" 72;font-weight:700;font-size:1.55rem;line-height:1.02;letter-spacing:0;text-transform:uppercase;color:var(--ink,#1d1d1f);text-wrap:balance;min-height:3.2em}
.personas .head .nm{margin:14px 0 2px;font-size:15px;font-weight:600;color:var(--ink,#1d1d1f)}
.personas .head .who{margin:0;font-size:12.5px;line-height:1.45;color:var(--mute)}
.personas .rl.top{border-top:3px solid transparent;align-self:end}
.personas .tech{display:grid;gap:7px}
.personas .tech div{display:grid;grid-template-columns:5.2rem 1fr;align-items:center;gap:8px;font-size:12px;color:var(--mute)}
.personas .bar{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;height:6px}
.personas .bar i{background:rgba(29,29,31,.1);border-radius:1px}
.personas .bar i.on{background:var(--c)}
.personas .brands{display:flex;flex-wrap:wrap;gap:6px 10px;font-size:12.5px;color:var(--ink-2)}
.personas .key{margin:18px 0 0;padding-top:12px;border-top:1px solid var(--hair);font-size:12px;line-height:1.5;color:var(--mute);display:flex;align-items:center;gap:8px}
.personas .key i{width:6px;height:6px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--ink,#1d1d1f);flex:none}
@media (max-width:820px){
  .personas .grid{display:block}
  .personas .col{display:block;padding-bottom:28px}
  .personas .col.labels{display:none}
  .personas .cell::before{content:attr(data-label);display:block;margin-bottom:6px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--mute)}
  .personas .head .surf{min-height:0;font-size:1.4rem}
}
`;

function Cell({ p, row }: { p: Persona; row: string }) {
  if (row === "bio") return <p>{p.bio}</p>;
  if (row === "wants") return <ul>{p.wants.map((w) => <li key={w}>{w}</li>)}</ul>;
  if (row === "frustrations")
    return <ul>{p.frustrations.map((f) => <li key={f.text} className={f.shared ? "shared" : undefined}>{f.text}</li>)}</ul>;
  if (row === "tech")
    return (
      <div className="tech">
        {p.tech.map(([k, n]) => (
          <div key={k}><span>{k}</span><span className="bar" aria-label={`${n} of 5`}>{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < n ? "on" : ""} />)}</span></div>
        ))}
      </div>
    );
  return <div className="brands">{p.brands.map((b) => <span key={b}>{b}</span>)}</div>;
}

export default function PersonaCards() {
  return (
    <div className="personas">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="grid" role="table" aria-label="The three personas compared">
        <div className="col labels" aria-hidden="true">
          <div className="rl top">Surfaces</div>
          {ROWS.map((r) => <div className="rl" key={r.key}>{r.label}</div>)}
        </div>
        {PERSONAS.map((p) => (
          <div className="col" key={p.name} style={{ "--c": p.colour } as React.CSSProperties}>
            <div className="head">
              <div className="cat"><i aria-hidden="true" />{p.category}</div>
              <p className="surf">{p.surfaces}</p>
              <p className="nm">{p.name}</p>
              <p className="who">{p.who}</p>
            </div>
            {ROWS.map((r) => (
              <div className="cell" data-label={r.label} key={r.key}>
                <Cell p={p} row={r.key} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="key"><i aria-hidden="true" />The same sentence, in two of the three.</p>
    </div>
  );
}
