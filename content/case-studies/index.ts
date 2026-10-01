import type { CaseStudy, SelectedItem } from "./types";
import { efficientlyStudies } from "./efficiently";
import { passportStudies } from "./passport";
import { ownTheScriptStudies } from "./own-the-script";
import { soroStudies } from "./soro";
import { efficientlyDemo } from "./efficiently-demo";

export type { CaseStudy, SelectedItem };

/**
 * Display order for /work and the home page. Each source file is owned by one
 * workstream: edit your own file, and only reorder here.
 */
export const caseStudies: CaseStudy[] = [
  ...ownTheScriptStudies,
  ...efficientlyStudies,
  ...passportStudies,
  ...soroStudies,
];

/** Studies that resolve by URL but are not listed, and are marked noindex. */
export const draftStudies: CaseStudy[] = [...efficientlyDemo];

/** Rows under "Also" on the home page. Drop a row once its case study is live. */
export const selectedWork: SelectedItem[] = [];
