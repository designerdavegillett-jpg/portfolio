import type { ThumbKind } from "@/components/Thumb";

/** An image inside a case study section. Files live in /public. */
export type Figure = {
  /** Path from /public, e.g. "/work/design-finish-selection/item-id-model.png" */
  src: string;
  /** Required. Describes the image for screen readers and when it fails to load. */
  alt: string;
  /** Optional line under the image. */
  caption?: string;
  /** "wide" (default) runs to the content column. "text" holds it to the prose measure. */
  size?: "text" | "wide";
  /**
   * Intrinsic pixel dimensions of the file. Optional, but set them: the browser
   * reserves the right box before the image arrives, which removes the layout
   * shift that Core Web Vitals measures as CLS. Get them with
   * `sips -g pixelWidth -g pixelHeight <file>`.
   */
  width?: number;
  height?: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Card headline. Wrap runs in *asterisks* for italic. Falls back to title. */
  headline?: string;
  summary: string;
  /**
   * Meta description for search results. Search engines truncate around 155
   * characters, and `summary` is usually far longer, so write a tight one here.
   * Falls back to `summary` when absent.
   */
  seoDescription?: string;
  /** ISO date the case study page last changed materially. Feeds the sitemap. */
  updated?: string;
  year: string;
  platform: string;
  tags: string[];
  role: string;
  team: string;
  /**
   * No longer rendered. The status pill was removed from the thumbnail on
   * 24 Aug 2026. Kept as an optional field so the three content files still
   * type-check; safe to delete from all of them in one pass.
   */
  status?: string;
  /** Abstract placeholder visual. Ignored once `image` is set. */
  visual?: ThumbKind;
  /** Real screenshot for the thumbnail, once you have one. Takes priority over `visual`. */
  image?: {
    /** Path from /public, e.g. "/work/design-finish-selection/main.png" */
    src: string;
    alt: string;
    /** Intrinsic pixel dimensions. Same CLS reason as Figure above. */
    width?: number;
    height?: number;
  };
  sections: {
    heading: string;
    body: string;
    /** Optional images, rendered after the body copy. */
    figures?: Figure[];
  }[];
};

/** Short rows under "Also" on the home page. Add an href once a page exists. */
export type SelectedItem = {
  name: string;
  note: string;
  href?: string;
};
