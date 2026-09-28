/**
 * Where It Stands, as one honest board: what is built and device verified
 * beside what is not built yet. Every line restates a claim already made in
 * the case study copy; nothing here is new or rounded up.
 *
 * Static by design. Scoped under .status-board; class names prefixed stb-.
 */

type Tile = { name: string; state: "built" | "gap" | "designed"; text: string };

const BUILT: Tile[] = [
  { name: "Creation flow", state: "built", text: "Record to published video, verified end to end on a device." },
  { name: "Compliance in the frame", state: "built", text: "The NMLS ID and Equal Housing mark are burned into every export at a single choke point." },
  { name: "Platform standing", state: "built", text: "Six permissions approved and tech provider status confirmed. One platform is self serve, two more are in progress." },
  { name: "Governance and admin", state: "built", text: "Proven with a live team policy on a device." },
];
const GAPS: Tile[] = [
  { name: "Audit trail", state: "designed", text: "A post deleted by hand still reads as published. The member retract that fixes it is designed, not built." },
  { name: "Billing", state: "gap", text: "No implementation at all. Pricing is locked on paper and the product cannot take a dollar." },
  { name: "Android", state: "gap", text: "Not shippable. The caption burn is a 55 line stub, blocked on hardware since 3 July." },
  { name: "Scheduling", state: "gap", text: "A table and an interface with no worker behind it, so the tile is disabled." },
  { name: "Campaigns", state: "gap", text: "The strongest differentiation play on the backlog is still a coming soon tab." },
  { name: "Legal sign off", state: "gap", text: "No attorney review of the compliance rules yet. Required before launch." },
];
const LABEL = { built: "Built", gap: "Not built", designed: "Designed" } as const;

const STYLES = `.status-board{margin-block:0 var(--s6,3rem);--hi:#0071E3;--hair:rgba(29,29,31,.12);--ink:#1d1d1f;--ink-2:#424245;
  --display:var(--font-condensed),"Archivo",system-ui,sans-serif}
.status-board *{box-sizing:border-box}
.status-board .stb-now{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 22px}
.status-board .stb-now span{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border:1px solid var(--hair);border-radius:999px;background:#fff;font-size:12.5px;line-height:1.2;color:var(--ink-2)}
.status-board .stb-now span::before{content:"";width:7px;height:7px;border-radius:50%;background:#34c759}
.status-board .stb-cols{display:grid;grid-template-columns:1fr 1.25fr;gap:28px;align-items:start}
.status-board .stb-h{margin:0 0 12px;display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-family:var(--display);font-variation-settings:"wdth" 72;font-size:1.02rem;line-height:1.18;font-weight:700;letter-spacing:.006em;text-transform:uppercase;color:var(--ink)}
.status-board .stb-h small{font-family:inherit;font-size:.8rem;color:#86868b}
.status-board .stb-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.status-board .stb-cols>div:last-child .stb-list{grid-template-columns:1fr 1fr}
.status-board .stb-t{border:1px solid var(--hair);border-radius:12px;background:#fff;padding:13px 15px 14px;display:grid;gap:6px;transition:border-color .2s,transform .2s}
.status-board .stb-t:hover{border-color:var(--c);transform:translateY(-1px)}
.status-board .stb-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.status-board .stb-t b{font-size:14.2px;line-height:1.3;font-weight:600;color:var(--ink)}
.status-board .stb-t em{flex:none;font-style:normal;font-size:11px;line-height:1;font-weight:600;letter-spacing:.02em;padding:5px 8px;border-radius:999px;color:var(--c);background:var(--bg)}
.status-board .stb-t p{margin:0;font-size:13.2px;line-height:1.55;color:var(--ink-2);max-width:none}
.status-board .stb-built{--c:#0f7643;--bg:#e3f4ea}
.status-board .stb-gap{--c:#b42318;--bg:#fdecea}
.status-board .stb-designed{--c:#0071E3;--bg:#e6f0fc;border-style:dashed}
@media (max-width:820px){.status-board .stb-cols{grid-template-columns:1fr}.status-board .stb-cols>div:last-child .stb-list{grid-template-columns:1fr}}
`;

const tile = (t: Tile) => (
  <li key={t.name} className={`stb-t stb-${t.state}`}>
    <div className="stb-top"><b>{t.name}</b><em>{LABEL[t.state]}</em></div>
    <p>{t.text}</p>
  </li>
);

export default function StatusBoard() {
  return (
    <div className="status-board">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="stb-now" aria-label="Status">
        <span>In App Store review</span>
        <span>On TestFlight with working loan officers</span>
      </div>
      <div className="stb-cols">
        <div>
          <h3 className="stb-h">Built and device verified<small>{BUILT.length}</small></h3>
          <ul className="stb-list">{BUILT.map(tile)}</ul>
        </div>
        <div>
          <h3 className="stb-h">Not built yet<small>{GAPS.length}</small></h3>
          <ul className="stb-list">{GAPS.map(tile)}</ul>
        </div>
      </div>
    </div>
  );
}
