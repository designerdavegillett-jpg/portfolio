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
    title: "Efficiently - Phase 1: Designer",
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
      "An Interior Designer needs multiple applications to present their clients with finish item options for their project. An application to manage the finish schedule and item data, one to create a visually appealing presentation of the items, and more to manage/edit images and documents.",
    year: "",
    platform: "",
    role: "Senior Product & Systems Designer. Interaction model, UI, UX, team direction",
    team: "",
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
        heading: "The Problem",
        body: "We interviewed 50+ designers ranging from single-designer studios to entire teams of interior designers to find out what their design process consisted of and what parts of that process drove their pain points, time drifts, and reduction in client satisfaction. The exhaustive list was quite large, but we were able to pinpoint several consistent data points that we established as the foundation for our relief effort ;)\n\nConsistent pain points:\n\n• Inconsistent formatting and spacing across canvas elements.\n• Universal alignment drift, often requiring manual workarounds like ruler guides and duplicating past presentations.\n• Moving elements easily breaks the alignment of surrounding text and images.\n• Changing an item requires copy/pasting from one program to another.\n• Images needed to be at spec prior to being imported.\n\nItem data was a manual chore. Adding an item to the canvas was a series of events. Find the item, get an image, copy and paste the item details line by line, and format the text. Most designers would duplicate the text and paste in new item details to maintain formatting, but the data consistency and manual copy/paste activity were a large source of consternation. Replacing an item on the canvas was also a replay of the same frustrating events.\n\nAny updates to the items in the client presentation had to be manually edited in the item schedule. In extreme cases, one forgotten item update in the item schedule could cost a build weeks in setbacks and thousands of dollars in restocking and replacement fees. A cascading effect in negative reputation and client trust is an expensive byproduct as a result.",
      },
      {
        heading: "The Solution",
        body: "Build a cloud-based platform that serves as a single source of item information, allowing interior designers to build beautifully formatted, luxury-level presentations and maintain pervasive item data throughout the project’s item schedule. We also introduced an approval management system concept that all designers validated as highly valuable.",
      },
      {
        heading: "Catalog & Item Management",
        body: "The company already had an aggregated item catalog consisting of 4 million+ finish items that we would use as a data source and a system that we could use to allow designers to cultivate their own catalog should we not have the item they are looking for. I added an item management system that used the current catalog as a database so users could create or upload their curated items as well.",
        interactive: ["catalog-add", "book-drop", "item-details", "item-schedule", "book-sync"],
        interactiveCopy: {
          "catalog-add": {
            title: "Adding your own item",
            body: "When a designer couldn't find an item in the catalog, they could add it themselves with a photo, the details they had and the item's documents. It went into My items and could be used on any project like any catalog item.",
          },
          "book-drop": {
            title: "Placing items on the page",
            body: "Every item assigned to the room shows up in the list beside the page. A designer drags an item onto a spot on the page and it lands formatted, image and details included, and the list marks which page it's on.",
          },
          "item-details": {
            title: "Item details without leaving the page",
            body: "Clicking an item opens its details beside the list so the page stays in view. Replace and Remove sit at the top, followed by the photo, specs, every location using that Item ID and the item's documents.",
          },
          "item-schedule": {
            title: "Replacing an item from the schedule",
            body: "The Item Schedule holds the same items as the Design Book. Replace opens the catalog already filtered to the item's division and type, since nothing else would be a valid replacement. Picking a new item updates every location that uses that Item ID. If the item was already approved, replacing it puts it back into Change Request status.",
          },
          "book-sync": {
            title: "Keeping the book in sync",
            body: "When an item changes in the schedule, the room list in the book updates right away. The page keeps the item it was laid out with and marks it Outdated, and Update on that tag swaps the new item in.",
          },
        },
      },
    ],
  },
];
