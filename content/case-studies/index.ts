import type { CaseStudy, SelectedItem } from "./types";
import { efficientlyStudies } from "./efficiently";
import { passportStudies } from "./passport";
import { ownTheScriptStudies } from "./own-the-script";

export type { CaseStudy, SelectedItem };

/**
 * Display order for /work and the home page. Each source file is owned by one
 * workstream — edit your own file, and only reorder here.
 */
export const caseStudies: CaseStudy[] = [
  ...efficientlyStudies,
  ...passportStudies,
  ...ownTheScriptStudies,
];

/** Rows under "Also" on the home page. Drop a row once its case study is live. */
export const selectedWork: SelectedItem[] = [
  {
    name: "Passport Unlimited",
    note: "benefits platform reaching 500,000+ employees across 80+ enterprise clients.",
  },
  {
    name: "Soro Software",
    note: "retail CRM adopted across Seattle-area locations; the company was acquired.",
  },
  {
    name: "Own the Script",
    note: "a compliance video tool built solo — design, code, and the decisions in between.",
  },
];
