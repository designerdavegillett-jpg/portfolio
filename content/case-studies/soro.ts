import type { CaseStudy } from "./types";

/**
 * Soro Software, 2017-2020. Source assets: Design Assets/portfolio-art/Website2/soro.
 * The dashboard capture is deliberately not used: it carries real customer and
 * staff names. Add product screens only after scrubbing.
 */
export const soroStudies: CaseStudy[] = [
  {
    slug: "soro",
    title: "Soro Software",
    headline: "Soro: A CRM for a sales team that lived in its truck, from brand mark to shipped dashboard.",
    status: "Shipped",
    visual: "neutral",
    image: {
      src: "/work/soro/devices.webp",
      alt: "The Soro dashboard shown on a laptop, a tablet and a phone.",
      width: 1400,
      height: 651,
      transparent: true,
    },
    summary:
      "Soro was a customer relationship tool for a regional wholesale sales team. I designed the brand and the product: the mark, the palette and type system, the information architecture, and the dashboard and account screens the reps used every day. It was adopted across the team's Seattle-area accounts, and the company was later acquired.",
    year: "2017-2020",
    platform: "Web",
    role: "Product Designer, Brand",
    team: "Founder, Engineers",
    tags: ["CRM", "Brand", "Information Architecture", "Web"],
    sections: [
      {
        heading: "A Mark Before a Screen",
        body: "The brand came first, because the product needed a name and a face before anyone would trust it with their accounts. The mark started as pages of pencil, then settled into an S built from two interlocking strokes, and the lowercase logotype beside it.",
        figures: [
          {
            src: "/work/soro/sketchbook-marks.webp",
            width: 1400,
            height: 651,
            alt: "An open sketchbook filled with pencil explorations of an S mark.",
            caption: "Pencil first. Pages of S marks before any of them went near a screen.",
          },
          {
            src: "/work/soro/logo-sheet.webp",
            width: 1600,
            height: 580,
            alt: "The Soro logo sheet: the mark and logotype in colour, in a single colour and reversed, with minimum clear space.",
            caption: "The mark, the logotype, and the clear space rule.",
            transparent: true,
          },
        ],
      },
      {
        heading: "The System",
        body: "A primary blue for the product, a small set of status colours the reps would learn fast, neutral greys for the chrome, and one sans at a handful of sizes. Everything in the dashboard is built from this sheet.",
        figures: [
          {
            src: "/work/soro/colour-sheet.webp",
            width: 1600,
            height: 845,
            alt: "The Soro colour sheet: primary palette, neutral palette, and status colours with hex values.",
            caption: "Primary, neutral, status.",
            transparent: true,
          },
          {
            src: "/work/soro/type-sheet.webp",
            width: 1376,
            height: 1088,
            alt: "The Soro type and button sheet: heading and body sizes, link styles, and the primary, secondary and destructive button states.",
            caption: "Type sizes and the three button families with their states.",
            transparent: true,
            size: "text",
          },
        ],
      },
      {
        heading: "The Shape of It",
        body: "The sitemap is small on purpose. A rep signs in and lands on their own day: recent sales, today's tasks, and the accounts due for a visit. Everything else is one level down.",
        figures: [
          {
            src: "/work/soro/sitemap.webp",
            width: 982,
            height: 699,
            alt: "The Soro sitemap: sign in leading to home, customers, orders, contacts, reports, users and data tools, each with its child pages.",
            caption: "Sign in, then home, then seven sections.",
            transparent: true,
            size: "text",
          },
          {
            src: "/work/soro/sketchbook-screens.webp",
            width: 1400,
            height: 843,
            alt: "A sketchbook page of hand-drawn dashboard and list layouts.",
            caption: "The dashboard on paper before it was in code.",
          },
        ],
      },
      {
        heading: "What Shipped",
        body: "The dashboard is the rep's day: recent sales, sales by category, and the to-do list with the account card beside it, so the next call and everything known about that account sit on one screen.",
        figures: [
          {
            src: "/work/soro/devices.webp",
            width: 1400,
            height: 651,
            alt: "The Soro dashboard on a laptop, a tablet and a phone.",
            caption: "The shipped dashboard across three screen sizes.",
            transparent: true,
          },
        ],
      },
    ],
  },
];
