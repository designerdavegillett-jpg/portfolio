import type { CaseStudy } from "./types";

/**
 * Efficiently rebuild, in progress. A copy of the live page's header fields
 * (title, hero, meta, tags) with Dave's new copy as the sections. Unlisted:
 * it sits in draftStudies, resolves at /work/efficiently-demo, is kept out of
 * /work, the home page and the sitemap, and is marked noindex.
 *
 * Bullets: a paragraph whose lines all start with "• " renders as a list.
 * When this replaces the live page, move the sections into efficiently.ts.
 */
export const efficientlyDemo: CaseStudy[] = [
  {
    slug: "efficiently-demo",
    title: "Efficiently",
    headline:
      "Efficiently: A single-source-of-truth SaaS platform for residential construction.",
    status: "Shipped",
    visual: "canvas",
    image: {
      src: "/work/design-finish-selection/three-surfaces.webp",
      alt: "Three Efficiently screens overlapping: the plans canvas with a room highlighted on a floor plan, the design book laying out primary bathroom selections, and the item schedule listing locations with approval statuses.",
      width: 1600,
      height: 1100,
      transparent: true,
    },
    summary:
      "A house gets built out of thousands of small decisions and almost none of them have one owner. I designed the first two stages of a platform meant to hold all of them in one place: a plans canvas for measuring and placing finishes, an item schedule that carries the approval workflow, a design book for presenting selections, and a portal where the homeowner says yes. One item record sits underneath all of it, so a decision made anywhere is visible everywhere.",
    year: "2020-2026",
    platform: "Cloud web app",
    role: "Senior Product & Systems Designer. Interaction model, UI, UX, team direction",
    team: "A product design team that started as just me and grew to 8, under my direction",
    tags: [
      "Systems Design",
      "Information Architecture",
      "User Research",
      "Canvas UI",
      "Permissions",
      "Workflow",
      "B2B SaaS",
    ],
    sections: [
      {
        heading: "Discovery",
        body: "We interviewed 50+ designers ranging from single-designer studios to entire teams of interior designers to find out what their design process consisted of and what parts of that process drove their pain points, time drifts, and reduction in client satisfaction. The exhaustive list was quite large, but we were able to pinpoint several consistent data points that we established as the foundation for our relief effort ;)\n\nConsistent pain points:\n\n• Inconsistent formatting and spacing across canvas elements.\n• Universal alignment drift, often requiring manual workarounds like ruler guides and duplicating past presentations.\n• Moving elements easily breaks the alignment of surrounding text and images.\n• Changing an item requires copy/pasting from one program to another.\n• Images needed to be at spec prior to being imported.\n\nItem data was a manual chore. Adding an item to the canvas was a series of events. Find the item, get an image, copy and paste the item details line by line, and format the text. Most designers would duplicate the text and paste in new item details to maintain formatting, but the data consistency and manual copy/paste activity were a large source of consternation. Replacing an item on the canvas was also a replay of the same frustrating events.\n\nAny updates to the items in the client presentation had to be manually edited in the item schedule. In extreme cases, one forgotten item update in the item schedule could cost a build weeks in setbacks and thousands of dollars in restocking and replacement fees. A cascading effect in negative reputation and client trust is an expensive byproduct as a result.",
      },
      {
        heading: "The Solution",
        body: "Build a cloud-based platform that serves as a single source of item information, allowing interior designers to build beautifully formatted, luxury-level presentations and maintain pervasive item data throughout the project’s item schedule. We also introduced an approval management system concept that all designers validated as a high-value time- and effort-relief function.",
      },
      {
        heading: "Catalog & Item Management",
        body: "The company already had an aggregated item catalog consisting of 4 million+ finish items that we would use as a data source and a system that we could use to allow designers to cultivate their own catalog should we not have the item they are looking for. I added an item management system that used the current catalog as a database so users could create or upload their curated items as well.",
        interactive: ["book-drop", "item-details"],
      },
    ],
  },
];
