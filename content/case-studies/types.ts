import type { ThumbKind } from "@/components/Thumb";

export type CaseStudy = {
  slug: string;
  title: string;
  /** Card headline. Wrap runs in *asterisks* for italic. Falls back to title. */
  headline?: string;
  summary: string;
  year: string;
  platform: string;
  tags: string[];
  role: string;
  team: string;
  /** Small pill on the thumbnail — "Shipped", "Prototype", "Research". */
  status?: string;
  visual?: ThumbKind;
  sections: {
    heading: string;
    body: string;
  }[];
};

/** Short rows under "Also" on the home page. Add an href once a page exists. */
export type SelectedItem = {
  name: string;
  note: string;
  href?: string;
};
