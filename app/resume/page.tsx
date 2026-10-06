import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Dave Gillett, Senior Product Designer in Seattle. 15+ years of experience in SaaS, web, and mobile app design.",
  alternates: { canonical: "/resume" },
};

/* Mirrors the general PDF résumé (public/Dave-Gillett-Resume.pdf), row for
   row. Change one, change the other. */
const SPEC: [string, string][] = [
  ["Role", "Senior Product Designer"],
  ["Practice",
   "15+ years of experience in SaaS, web, and mobile app design. I design the systems and build the structure under complex products - the model, the rules, the design system. I lead design strategy with cross-functional partners and mentor designers with clear direction and an open mind. Lately I’ve been directing AI-assisted builds and agentic workflows, keeping the human experience in front while using AI to move faster through research, testing and validation."],
  ["Domains",
   "B2B SaaS · Construction tech · Employee benefits · Fintech and regulated products · CRM · Nonprofits"],
  ["Platforms", "iOS · Android · Responsive Web"],
  ["Practice Areas",
   "Information Architecture · Content Modeling · Design Systems · Interaction Design · Prototyping · User Research"],
  ["Leadership",
   "Team Leadership · Design Management · Mentoring · Product Strategy · Stakeholder Alignment · Design QA"],
];

type Record = {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
};

const RECORDS: Record[] = [
  {
    company: "Own the Script",
    title: "Product Designer · Nifli LLC · iOS App",
    dates: "2026-Present",
    bullets: [
      "Sole designer and product owner on a mobile app that turns a loan officer’s single nervous read into a captioned, compliance-checked vertical video. Took it from concept to working build in two months",
      "Designed a 19-rule compliance engine that flags risky language before publish and soft-blocks it with a logged override",
      "Set a deterministic rules floor the AI cannot override, so every compliance decision stays auditable",
      "Designed on-device transcription, captions, and burn-in with no outside API calls, so a recording is ready to post in minutes",
      "Directed the AI-assisted build and owned every product, UX, and scope decision",
    ],
  },
  {
    company: "Efficiently",
    title: "Senior Product Designer",
    dates: "2020-2026",
    bullets: [
      "Took design of a B2B construction platform from zero to eight modules, from discovery through implementation",
      "Led a 9-person team including 7 designers across 55,000+ screens and 4,000+ feature flows, owned all UI/UX, stayed hands-on, and shortened the time from design to implementation",
      "One of three executives, owning design and the handoff from design to engineering across a multilingual team",
      "Built the design function from one designer to seven, plus team members across multiple practices, and set the process and critique",
      "Grew the platform from a finish-selection tool into a full scale construction management system",
      "Architected a persistent data system that cut plan-change updates from hours of manual cross-module tracking to minutes",
      "Cut client-ready document creation from days to hours with a canvas-based builder that replaced a Photoshop, InDesign, and Excel workflow",
      "Rebuilt a catalog of 4,000,000+ items from hundreds of vendors with a full filter and search system",
      "Led the item-box style system, where one click restyles every item to a saved brand style across all books",
      "Designed a full change order system for live construction projects, the product’s highest-stakes surface",
      "Extended the platform to homeowners with a client approval portal, replacing approvals scattered across email, texts, and phone messages with one source of truth both sides could reach",
      "Ran 50+ user interviews and pushed for validation before expanding scope",
      "Identified the complexity ceiling that moved the platform from self-serve to an internally delivered service model",
    ],
  },
  {
    company: "Passport Unlimited",
    title: "Senior Product / Lead Designer 2015-2020 · Lead Graphic Designer 2010-2015",
    dates: "2010-2020",
    bullets: [
      "Shipped iOS, Android, and responsive web products reaching 500,000+ employees across 80+ enterprise clients including Google, Microsoft, Oracle, and Apple",
      "Raised the mobile app\u2019s app store rating from 2.3 to 4.1 stars with a ground-up redesign built around proximity-based offer discovery",
      "Brought design in-house, replacing a months-long agency cycle and reducing $100,000+ in annual agency fees",
      "Unified every public-facing surface, including the corporate site, member site, and mobile app, under one brand",
      "Updated all public-facing properties to meet WCAG accessibility regulations",
      "Established company-wide design guidelines for product development and customer-facing systems, speeding the path from concept to development",
      "Managed design across 800+ merchant accounts and their marketing campaigns, grew the role, and was promoted into product design",
    ],
  },
  {
    company: "Soro Software",
    title: "Product Design Director · Contract",
    dates: "2017-2020",
    bullets: [
      "Designed a responsive CRM and onboarding flow for users with no prior CRM vocabulary, based on research and journey mapping. It was adopted across Seattle-area retail locations, and the company was acquired",
      "Designed the CRM’s information architecture: seven areas, My/All views, and five report families",
    ],
  },
  {
    company: "Pro Bono Design",
    title: "Pro Bono Designer · 501(c)(3) Nonprofits",
    dates: "2026-Present",
    bullets: [
      "Rebranded a 501(c)(3) nonprofit and carried the new brand system across web, print and templates",
      "Designed nonprofit grant proposals, including a $15,000-$20,000 request to a federal bar association",
      "Updated sitewide SEO with structured data and page titles, and set up the organization’s first analytics",
      "Redesigned and launched the site for PacCLEAN, a 501(c)(3) climate policy network, archiving its 25-page legacy site",
    ],
  },
];

const stagger = (i: number) => ({ "--d": `${i * 0.05}s` }) as CSSProperties;

export default function ResumePage() {
  return (
    <div className="page">
      <div className="resume">
        <div className="rsm-slug resume-mono reveal">
          <span>Résumé / Rev. 2026.09</span>
          <span>Seattle, WA</span>
        </div>

        <header className="rsm-head reveal" style={stagger(1)}>
          <h1 className="rsm-name">Dave Gillett</h1>
          <ul className="rsm-contact resume-mono">
            <li><a href="mailto:designerdavegillett@gmail.com">designerdavegillett@gmail.com</a></li>
            <li><a href="https://portfolio.nifli.design">portfolio.nifli.design</a></li>
            <li>
              <a href="https://www.linkedin.com/in/david-gillett-847507135/" target="_blank" rel="noreferrer">
                linkedin.com/in/david-gillett-847507135
              </a>
            </li>
          </ul>
        </header>

        <dl className="rsm-spec reveal" style={stagger(2)}>
          {SPEC.map(([k, v]) => (
            <div className="rsm-row" key={k}>
              <dt className="resume-mono rsm-key">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="resume-mono rsm-section-label reveal">
          Experience / {RECORDS.length} records
        </div>

        <div className="rsm-records">
          {RECORDS.map((r, i) => (
            <article className="rsm-record reveal" key={r.company} style={stagger(i)}>
              <div className="resume-mono rsm-dates">{r.dates}</div>
              <div>
                <h2 className="rsm-co">{r.company}</h2>
                <div className="resume-mono rsm-title">{r.title}</div>
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
