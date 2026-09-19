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
   * Dense artwork a reader may want larger than the column allows. Wraps the
   * image in a link that opens the file itself in a new tab.
   */
  zoom?: boolean;
  /**
   * The file has a transparent background. Drops the hairline border, which
   * otherwise draws a box around empty space. Same flag as the thumbnail's.
   */
  transparent?: boolean;
  /**
   * Path to a short silent clip, e.g. "/work/<slug>/bottom-nav.mp4". When set,
   * `src` is used as the poster frame and the figure renders a looping video
   * instead of an image. Autoplay is suppressed under reduced motion.
   */
  clip?: string;
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
  /**
   * Skip the hero image at the top of the case study page. `image` still
   * feeds the card, Open Graph and structured data. Set when the first
   * section opens with an interactive figure that is the hero.
   */
  hideHero?: boolean;
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
    /**
     * The file has a transparent background, usually a device render with a
     * soft shadow. Drops the grey plate and the inset hairline, and fits the
     * image inside the box rather than cropping it, so the shadow survives.
     */
    transparent?: boolean;
  };
  sections: Section[];
};

/**
 * How wide a section runs. Every section used to render identically at the
 * 34rem prose measure, which flattened work that isn't the same shape.
 *
 * - "default"  prose measure, 34rem. The reading default; use it for most copy.
 * - "wide"     44rem. For a section carrying a large figure alongside its copy.
 * - "full"     the whole content column. For full-bleed imagery.
 * - "two-col"  body flows in two columns. Good for a list-like section such as
 *              a scorecard, bad for a narrative one.
 */
export type SectionLayout = "default" | "wide" | "full" | "two-col";

export type Section = {
  heading: string;
  body: string;
  /** Width variant. Defaults to "default". */
  layout?: SectionLayout;
  /** Optional images. Rendered under the heading, before the body copy. */
  figures?: Figure[];
  /**
   * Renders an interactive component after the figures. Each value maps to one
   * component in the case study page's registry, so content stays data and the
   * page keeps the only import.
   */
  interactive?: "capture-anatomy" | "compliance-states" | "script-flow" | "persona-cards";
};

/** Short rows under "Also" on the home page. Add an href once a page exists. */
export type SelectedItem = {
  name: string;
  note: string;
  href?: string;
};
