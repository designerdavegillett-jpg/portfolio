/**
 * The three Passport personas as typeset cards rather than stock photographs.
 * Each card carries a monogram tile in the persona's category colour instead of
 * a face: the people are composites, and a photo of a model implied otherwise.
 * Static markup; the styles are scoped under .persona-cards.
 */

type Persona = {
  name: string;
  initials: string;
  colour: string;
  facts: [string, string][];
  bio: string;
  wants: string[];
  tech: [string, number][];
  brands: string[];
  frustrations: string[];
};

const PERSONAS: Persona[] = [
  {
    name: "Thomas Whipple",
    initials: "TW",
    colour: "#E24C3F",
    facts: [["Age", "55"], ["Lives", "Kirkland, WA"], ["Education", "B.A. Computer Tech"], ["Work", "IT support"], ["Family", "Married, no kids"]],
    bio: "Owns a home in North Seattle where he lives with his wife, two cats and a German Shepherd. Works at a high end tech company in downtown Bellevue. Avid jogger who loves nature and frequently visits nearby parks with his wife and dog for after work jogs. Dines out two to four times a week.",
    wants: ["Reduce monthly dining out cost while still being able to try new restaurants", "Renovate a few rooms in the house with modern upgrades on a smaller budget"],
    tech: [["Internet", 5], ["Social media", 3], ["Online shopping", 2], ["Messaging", 5], ["Games", 4]],
    brands: ["Apple", "Google", "Instagram", "Nintendo"],
    frustrations: ["Doesn't want to hire a contractor but doesn't have time to research sub-contractors", "Feels like restaurant options are low quality and would like to see better ones", "Believes he has a better grasp on UX than most and we should gamify the experience"],
  },
  {
    name: "Emily Renault",
    initials: "ER",
    colour: "#F28C28",
    facts: [["Age", "33"], ["Lives", "Seattle, WA"], ["Education", "Masters in Journalism"], ["Work", "HR director"], ["Family", "Married, two kids"]],
    bio: "Director of HR at a mid sized law firm in Olympia. Telecommutes most days but is looking for work closer to home. Would like to be involved in a sustainable energy firm. Family likes to go out of town on weekends when possible. Kids are six and nine years old.",
    wants: ["Would like to see more kid centered savings options nearby", "Prefers casual dining over the high end offers mostly populating the current app"],
    tech: [["Internet", 4], ["Social media", 4], ["Online shopping", 3], ["Messaging", 4], ["Games", 1]],
    brands: ["Microsoft", "Ulta", "Amazon", "Android"],
    frustrations: ["Can't find the filters once they have been applied", "Navigation is not natural and hidden, so she rarely uses the app", "Has been rejected from savings at a few places that have left the program"],
  },
  {
    name: "James Hosten",
    initials: "JH",
    colour: "#2D9CDB",
    facts: [["Age", "29"], ["Lives", "Bellevue, WA"], ["Education", "MBA"], ["Work", "Entrepreneur"], ["Family", "Single"]],
    bio: "Entrepreneur and investor. Enjoys red wine and good food. Week nights are reserved for client meetings and occasionally dates. Lives in an apartment downtown but is rarely home except to sleep. Travels often within the states and one to two times a month internationally.",
    wants: ["Quick deals on flights and up to the minute offers", "Would like redemption to be easier, like a QR code or a snowshoe"],
    tech: [["Internet", 5], ["Social media", 4], ["Online shopping", 2], ["Messaging", 5], ["Games", 2]],
    brands: ["Apple", "Mercedes", "Instagram", "Amazon"],
    frustrations: ["Doesn't see a lot of relevant content for where he travels", "Can't access the redemption when there is no wifi or data", "Has been rejected from savings at a few places that have left the program"],
  },
];

const STYLES = `.persona-cards{display:grid;gap:var(--s5,2rem);margin:0 0 var(--s6,3rem)}
.persona-cards .pc{display:grid;grid-template-columns:150px 1fr;background:#fff;border:1px solid rgba(29,29,31,.12);border-radius:12px;overflow:hidden}
.persona-cards .pc-tile{display:flex;flex-direction:column;justify-content:space-between;padding:20px;background:var(--c);color:#fff}
.persona-cards .pc-tile .mono{font-family:var(--font-condensed),"Archivo",system-ui,sans-serif;font-variation-settings:"wdth" 72;font-weight:700;font-size:56px;line-height:1;letter-spacing:-.01em}
.persona-cards .pc-tile .role{font-size:12px;line-height:1.35;opacity:.92}
.persona-cards .pc-body{display:grid;grid-template-columns:1fr 1fr;gap:18px 28px;padding:22px 24px}
.persona-cards h3{margin:0 0 6px;font-size:18px;line-height:1.2;font-weight:600;color:var(--ink,#1d1d1f)}
.persona-cards h4{margin:0 0 6px;font-size:11.5px;line-height:1.3;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#86868b}
.persona-cards .facts{margin:0 0 4px;padding:0;list-style:none;display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:13px;line-height:1.5;color:#424245}
.persona-cards .facts dt{color:#86868b}
.persona-cards .facts dd{margin:0;color:var(--ink,#1d1d1f)}
.persona-cards p{margin:0;font-size:13px;line-height:1.55;color:#424245;max-width:none}
.persona-cards ul{margin:0;padding-left:16px;font-size:13px;line-height:1.5;color:#424245;display:grid;gap:5px}
.persona-cards .tech{margin:0;padding:0;list-style:none;display:grid;gap:5px;font-size:13px;line-height:1.4;color:#424245}
.persona-cards .tech li{display:flex;align-items:center;justify-content:space-between;gap:12px}
.persona-cards .dots{display:inline-flex;gap:4px}
.persona-cards .dots i{width:9px;height:9px;border-radius:50%;background:rgba(29,29,31,.12)}
.persona-cards .dots i.on{background:var(--c)}
.persona-cards .brands{display:flex;flex-wrap:wrap;gap:6px}
.persona-cards .brands span{font-size:12px;line-height:1;padding:6px 9px;border:1px solid rgba(29,29,31,.14);border-radius:999px;color:#424245}
.persona-cards .block{display:grid;gap:14px}
@media (max-width:640px){.persona-cards .pc{grid-template-columns:1fr}.persona-cards .pc-tile{flex-direction:row;align-items:center;gap:16px;padding:16px 20px}.persona-cards .pc-tile .mono{font-size:36px}.persona-cards .pc-body{grid-template-columns:1fr;padding:18px}}
`;

export default function PersonaCards() {
  return (
    <div className="persona-cards">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {PERSONAS.map((p) => (
        <article className="pc" key={p.name} style={{ "--c": p.colour } as React.CSSProperties}>
          <div className="pc-tile">
            <div className="mono" aria-hidden="true">{p.initials}</div>
            <div className="role">{p.facts[3][1]}, {p.facts[1][1]}</div>
          </div>
          <div className="pc-body">
            <div className="block">
              <div>
                <h3>{p.name}</h3>
                <dl className="facts">
                  {p.facts.map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </div>
              <div><h4>Bio</h4><p>{p.bio}</p></div>
              <div><h4>Wants and needs</h4><ul>{p.wants.map((w) => <li key={w}>{w}</li>)}</ul></div>
            </div>
            <div className="block">
              <div>
                <h4>Tech use</h4>
                <ul className="tech">
                  {p.tech.map(([k, n]) => (
                    <li key={k}><span>{k}</span><span className="dots" aria-label={`${n} of 5`}>{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < n ? "on" : ""} />)}</span></li>
                  ))}
                </ul>
              </div>
              <div><h4>Favourite brands</h4><div className="brands">{p.brands.map((b) => <span key={b}>{b}</span>)}</div></div>
              <div><h4>Frustrations</h4><ul>{p.frustrations.map((f) => <li key={f}>{f}</li>)}</ul></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
