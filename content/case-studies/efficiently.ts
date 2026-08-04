import type { CaseStudy } from "./types";

/**
 * Efficiently, 2020–2026. Owned by the "Efficiently" workstream.
 * Planned order: Product Book Creator → data system / density ceiling → AI selection prototype.
 */
export const efficientlyStudies: CaseStudy[] = [
  {
    slug: "product-book-creator",
    title: "Product Book Creator",
    headline:
      "One selection, four surfaces, *one state* — the finish schedule as the spine of the platform.",
    status: "Shipped",
    visual: "canvas",
    summary:
      "A finish selection isn't one thing in one place. The designer presents it, the homeowner reacts to it, the builder operates on it, and the plans locate it. I designed the item as the atomic unit and every surface as a view onto it — so approval, rejection, and change requests propagate everywhere the item appears, and no stakeholder is working from a different version of the truth.",
    year: "2020–2026",
    platform: "Web",
    role: "Senior Product Designer — interaction model, UI, UX",
    team: "Design team, engineering leads, PM",
    tags: [
      "Design Systems",
      "Information Architecture",
      "Canvas UI",
      "Workflow",
      "B2B SaaS",
    ],
    sections: [
      {
        heading: "Background",
        body: "Every project in the platform has an item schedule: the list of finishes selected for a unit — a house, an apartment, a floor — by whoever holds the authority to choose them.\n\nThe schedule isn't only a list. It carries the approval workflow. One stakeholder selects; another approves. And in construction, the schedule is the universal instrument for listing and managing finishes — every party in the process already knows how to read one.\n\nThe Product Book Creator was one module inside that system, not a standalone tool. That distinction is the whole case study.",
      },
      {
        heading: "The Problem",
        body: "A finish selection is not one thing in one place.\n\nAn interior designer needs to present it — beautifully formatted, photographed, in context, as a book the homeowner will actually enjoy looking at.\n\nA homeowner needs to react to it — approve what they want to keep, comment on what they don't, request changes.\n\nA builder or project manager needs to operate on it — a running list they can scan, sort, and work down.\n\nA plans stakeholder needs to locate it — which item goes where, marked on the architectural drawings.\n\nSame item. Four different jobs. The hard part was never building any one of those views. It's that if the item's state doesn't travel between them, every stakeholder ends up working from a different version of the truth.",
      },
      {
        heading: "The Interaction Model",
        body: "I designed around the item as the atomic unit. Every surface is a view onto the same record, never a copy of it.\n\nPlace an item on a page of the product book, and it appears in the item schedule. Place that item on the architectural plans, and the physical location is now bound to the selection — anyone working from the plans can see what was chosen for that spot.\n\nState travels the same way. When an item is approved, rejected, or flagged for a change, that status propagates to everywhere the item appears. The homeowner comments in the book; the builder sees it in the schedule; the plans reflect it.\n\nUniversal awareness was the actual product. The book was the most pleasant door into it.",
      },
      {
        heading: "Why the List Won",
        body: "The book is a persuasion surface. It's how a designer makes a case — imagery, layout, sequence, the argument for why these selections belong together. It's the right format for the moment a homeowner is deciding whether they love something.\n\nIt is a poor operations surface. A stakeholder who needs a running account of what's been chosen and where it stands does not want to page through a document.\n\nWe tried other presentations, and some of them could have worked. The table won on two things: scannability, and the hierarchy you get for free when everything lines up in columns. It was also the format the industry already ran on — designing with that grain instead of against it meant nobody had to be taught anything new.\n\nSo the two surfaces stay distinct, and each one always informs the other. That was the constraint I designed to.",
      },
    ],
  },
];
