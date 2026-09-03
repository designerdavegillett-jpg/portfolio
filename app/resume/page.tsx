import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Dave Gillett, Senior Product Designer in Seattle. Sixteen years across SaaS, benefits, and construction platforms.",
  alternates: { canonical: "/resume" },
};

/* One source of truth for the page. Mirrors master-resume.yaml. If a claim
   isn't in that file it doesn't belong here either. */
const SPEC: [string, string][] = [
  ["Practice",
   "I came up through graphic design (street work, then corporate marketing) and eventually became obsessed with why people behave predictably in some contexts and surprise you in others. That discovery loop became my product practice: sixteen years across SaaS, benefits, and construction platforms, most recently designing and building a compliance-first mobile product end to end."],
  ["Domains",
   "B2B SaaS · Construction tech · Employee benefits · Fintech and regulated products · CRM"],
  ["Platforms", "iOS · Android · Responsive Web"],
  ["AI Practice",
   "AI Product Design · Directing AI-Assisted Builds · Technical Direction and Spec Writing · AI-Assisted Design"],
  ["Design",
   "Product Design · Information Architecture · Content Modeling · Design Systems · User Research · Interaction Design · Prototyping · Motion Design · Journey Mapping · Multi-audience Systems"],
  ["Leadership",
   "Team Leadership · Design Management · Design Mentoring · Product Strategy · Stakeholder Alignment · Cross-functional Collaboration · Design QA"],
  ["Tools", "Figma · Notion · Jira · Adobe Creative Suite · Claude · Claude Code"],
];

type Record = {
  idx: string;
  company: string;
  title: string;
  dates: string;
  bullets: string[];
};

const RECORDS: Record[] = [
  {
    idx: "01",
    company: "Own the Script",
    title: "Product Designer · Mobile · Fintech / mortgage compliance · Nifli LLC",
    dates: "2026-Present",
    bullets: [
      "Designed and built a mobile app end to end (strategy, research, UX, UI, design system) that turns a mortgage loan officer's single nervous read into a captioned, branded, compliance-checked vertical video",
      "Designed a 19-rule compliance layer to behave like a seatbelt rather than a police stop, flagging risky language against TILA/Reg Z, the MAP Rule, UDAAP, and fair-lending law before publish, with logged overrides and automatic NMLS and Equal Housing disclosure stamping",
      "Directed an AI-assisted build the way a design director runs a studio team, owning every product, UX, and scope decision while taking a native app with an on-device video pipeline from Figma to a working build in two months",
      "Built a designer-owned caption system: twelve self-authored presets with no third-party licensing dependency, driven from one source of truth into an on-device renderer",
      "Repositioned the product after competitive research disproved the original differentiator, relocating the moat from the feature set to the compliance layer",
    ],
  },
  {
    idx: "02",
    company: "Efficiently",
    title: "Senior Product Designer · B2B SaaS · Construction tech · Remote",
    dates: "2020-2026",
    bullets: [
      "Owned end-to-end design of the platform from 0 to 1 across 26+ releases: discovery, problem framing, information architecture, prototyping, and implementation support with engineering",
      "Grew the platform from a finish-and-item selection tool for interior designers into a system managing entire construction projects: takeoff measurement, supplier catalog, finish schedules, bidding, document aggregation, change orders, and a client approval portal",
      "Architected a persistent data system that turned plan changes from hours of manual tracking across item schedules, product books, and project records into a minutes-long update that propagates to every connected module",
      "Designed a canvas-based Product Book Creator that cut client-ready document creation from days in Photoshop/InDesign/Excel to a couple of hours, giving interior designers full layout control without specialist tools",
      "Designed a client-facing approval portal for product selections, extending the platform to a second audience: homeowners with no industry vocabulary, reviewing decisions made by professionals",
      "Designed and built a working prototype of an AI-assisted in-person selection system that listened to the live designer-client conversation and surfaced matching items from the supplier catalog for the client to review in the moment",
      "Identified the complexity ceiling on the self-serve model as the platform's density grew, informing the company's move from a user-managed product to an internally-delivered service",
      "Led design with a team of 9 under my direction (2 lead designers, 4 associate and junior designers, a project manager, and 2 development leads), owning all UI/UX while staying hands-on in the design work",
    ],
  },
  {
    idx: "03",
    company: "Passport Unlimited",
    title: "UX/UI Product Designer · Employee benefits SaaS · Enterprise clients",
    dates: "2015-2020",
    bullets: [
      "Designed and shipped the customer-facing digital product (iOS and Android apps, responsive web portals, and corporate websites) reaching over 500,000 employees across 80+ enterprise clients including Google, Microsoft, Oracle, Intel, Apple, and T-Mobile",
      "Established the design guidelines and best practices that governed product development cycles and customer-facing systems company-wide",
      "Designed motion and interaction detail across mobile and web surfaces, defining how the product moved rather than only how it looked",
    ],
  },
  {
    idx: "04",
    company: "Soro Software",
    title: "Freelance Product Designer · CRM SaaS · Contract",
    dates: "2017-2020",
    bullets: [
      "Designed a responsive CRM and onboarding experience for first-time users (sales teams with no prior CRM vocabulary) grounded in research sessions, journey mapping, and personas",
      "Product reached adoption across retail locations throughout the Seattle area; the company was subsequently acquired",
    ],
  },
  {
    idx: "05",
    company: "Passport Unlimited",
    title: "Lead Graphic Designer · Brand & marketing design",
    dates: "2010-2015",
    bullets: [
      "Managed design across 800+ merchant accounts, creating and developing the marketing campaigns for each",
      "Refreshed brand guidelines and designed all in-house marketing and company-wide sales materials, establishing a consistent visual identity across channels",
      "Promoted into product design after growing the role from the inside: the company created the product design function around work already being done",
    ],
  },
];

const stagger = (i: number) => ({ "--d": `${i * 0.05}s` }) as CSSProperties;

export default function ResumePage() {
  return (
    <div className="page">
      <div className="resume">
        <div className="rsm-slug resume-mono reveal">
          <span>Résumé / Rev. 2026.08</span>
          <span>Seattle, WA · Available immediately</span>
        </div>

        <h1 className="display d-xl rsm-name reveal" style={stagger(1)}>
          Dave Gillett
        </h1>
        <p className="rsm-role reveal" style={stagger(2)}>
          Senior Product Designer
        </p>

        <dl className="rsm-spec reveal" style={stagger(3)}>
          {SPEC.map(([k, v]) => (
            <div className="rsm-row" key={k}>
              <dt className="resume-mono rsm-key">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div className="rsm-row">
            <dt className="resume-mono rsm-key">Contact</dt>
            <dd>
              <a className="underline-link" href="tel:+12063539956">206.353.9956</a>
              {"  ·  "}
              <a className="underline-link" href="mailto:designerdavegillett@gmail.com">
                designerdavegillett@gmail.com
              </a>
              {"  ·  "}
              <a
                className="underline-link"
                href="https://www.linkedin.com/in/david-gillett-847507135/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </dd>
          </div>
        </dl>

        <div className="resume-mono rsm-section-label reveal">
          Experience / {RECORDS.length} records
        </div>

        <div className="rsm-records">
          {RECORDS.map((r, i) => (
            <article className="rsm-record reveal" key={r.idx} style={stagger(i)}>
              <div className="resume-mono">{r.idx}</div>
              <div className="resume-mono">{r.dates}</div>
              <div>
                <h2 className="rsm-co">{r.company}</h2>
                <div className="resume-mono">{r.title}</div>
                <ul>
                  {r.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="rsm-actions reveal">
          <a className="underline-link" href="/Dave-Gillett-Resume.pdf" download>
            Download PDF <span className="arrow">→</span>
          </a>
          <a className="underline-link" href="mailto:designerdavegillett@gmail.com">
            Get in touch <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
