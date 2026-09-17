import type { CaseStudy } from "./types";

/** Passport Unlimited, 2010-2020. Owned by the "Passport" workstream. */
export const passportStudies: CaseStudy[] = [
  {
    slug: "passport-unlimited-mobile",
    title: "Passport Unlimited",
    headline:
      "Passport Unlimited: An underused enterprise benefits app brought in-house, rebuilt, and finally measurable.",
    status: "Shipped",
    visual: "neutral",
    image: {
      /* Built from the header artwork. That file is a page header, so it sits
         on grey with a white band under it; the band is painted out by scanning
         inward from each edge (which stops at the phone shadows), then the crop
         is taken tight to the content at 16/11 so the phones fill the card. */
      src: "/work/passport-unlimited-mobile/card.webp",
      alt: "Five Passport app screens arranged in a row: a map result, a filtered dining list, the home feed with featured offers, a cuisine filter sheet, and a vendor page with the use card action.",
      width: 1600,
      height: 1100,
    },
    summary:
      "I was Passport's in-house graphic designer when the mobile app was being built by an outside firm, at a rate high enough that development ran in quarterly bursts sized to leftover budget. I made the case to bring the design in-house, sourced a developer at a fraction of the cost, and redesigned the app around proximity. Then shipped a feedback loop that gave the business its first real view of user satisfaction.",
    year: "2018-2020",
    platform: "iOS & Android",
    role: "Solo Product Designer",
    team: "CTO, Engineers, Contract Developer",
    tags: ["Mobile", "UX Research", "Stakeholder Management", "iOS", "Android"],
    sections: [
      /* ---------- PROBLEM ---------- */
      {
        heading: "The App Nobody Opened",
        body: "Passport Unlimited is an established savings and discount program connecting members with participating vendors. By the time this project started, the desktop experience had already been modernized. The mobile app was a different story. It was old, outdated, and barely used.\n\nThat mattered more than it sounds. Mobile was the primary touchpoint for a member out in the world, standing on a street with two hours free and no idea that the restaurant across from them honored their card. The company had the bones of a valuable product. The app just wasn't reflecting that.\n\nThe core promise, finding a nearby vendor offer, wasn't being delivered in a way that felt useful or current. This needed more than a visual refresh. It needed the discovery model rebuilt.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/sketches.webp",
            width: 1100,
            height: 744,
            alt: "Notebook pages showing hand-drawn navigation options, screen flows and an account entry decision tree for the Passport app.",
            caption: "Where it started. Navigation options, flows, and the argument with myself about what the home screen was for.",
          },
        ],
      },
      {
        heading: "How I Got the Job",
        body: "I wasn't hired to design this app. I was Passport's in-house graphic designer, and my job was marketing 800+ merchant accounts to our members.\n\nThe mobile and web work went to an outside consulting firm. Their rate was high enough that it shaped the roadmap: development happened in quarterly bursts, sized to whatever budget was left. Product decisions were being made on a billing cycle rather than on what users needed.\n\nI was already doing the visual design. I was confident I could carry the UI and UX as well, and that the same budget could buy considerably more than it was buying. So I made the case to the CTO: let me design it, and let me find a developer at a rate that matches how this company actually operates.\n\nHe gave me the shot. I sourced several options and found a solo developer with a track record for efficiency who came in well under what the firms had quoted, enough that development stopped being rationed by quarter.\n\nThat is the part of this project I would point at first. The redesign is the visible work. Changing how the work got funded is what made the redesign possible.",
      },

      /* ---------- SOLUTION ---------- */
      {
        heading: "Who I Was Designing For",
        body: "Three personas carried the work, and they were deliberately not the same person.\n\nThomas is 55, IT support in Kirkland, married, no kids, dines out two to four times a week. Emily is 33, an HR director in Seattle with two young children, telecommuting most days. James is 29, an entrepreneur in Bellevue who is rarely home and travels within the states most weeks and abroad once or twice a month.\n\nNone of them is a deal hunter. All three were handed a benefit by an employer and mostly forget they have it. What separates them is when and where they need it to surface: Thomas near home on a weeknight, Emily somewhere that will tolerate a six year old, James in a city he landed in that morning.\n\nThe frustrations were the part I kept going back to, because several of them turned up in more than one card. Navigation hidden enough that the app goes unopened. Filters that disappear once applied, so nobody can tell what they have narrowed to. Content that has nothing to do with where you actually are.\n\nAnd in two of the three, the same sentence: having been turned away at a business that had quietly left the program. That one is not a layout problem, and it is the one that stayed with me. No amount of interface saves a member who is embarrassed at a till.\n\nSomeone hunting a discount will go looking for it. Someone who has forgotten they have a benefit needs the benefit to find them, and that is a different product.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/persona-thomas.webp",
            width: 778,
            height: 476,
            alt: "The Thomas Whipple persona card: 55, Kirkland, IT support, with his bio, wants and needs, technology use and frustrations.",
            transparent: true,
            size: "text",
          },
          {
            src: "/work/passport-unlimited-mobile/persona-emily.webp",
            width: 778,
            height: 476,
            alt: "The Emily Renault persona card: 33, Seattle, HR director with two children, with her bio, wants and needs, technology use and frustrations.",
            transparent: true,
            size: "text",
          },
          {
            src: "/work/passport-unlimited-mobile/persona-james.webp",
            width: 778,
            height: 476,
            alt: "The James Hosten persona card: 29, Bellevue, entrepreneur who travels most weeks, with his bio, wants and needs, technology use and frustrations.",
            caption: "Three members, one benefit, three completely different moments of needing it. The repeated frustrations are the ones that shaped the work.",
            transparent: true,
            size: "text",
          },
        ],
      },
      {
        heading: "Rebuilding Around What's Close",
        body: "I started by auditing comparable savings and loyalty apps to understand the current bar and where Passport could differentiate. From there I moved to wireframes, focused on proximity-based offer discovery, because that was the app's core value and the thing it was failing to deliver.\n\nThe information architecture stayed deliberately flat. Home, all offers, the three verticals, map view, search, change location. Every one of those paths lands on the same vendor detail page, and every vendor detail page carries a route out to the vendor: their website, their social, a phone number. The app's job ends at handing the member off to the business, so every screen was checked against whether it moved somebody toward that.\n\nLocation is the one piece of state that runs through all of it. It sits in the header, it is editable from anywhere, and it persists. A member who searches Las Vegas before a trip and lands back in Seattle a week later should not have to think about which city the app believes it is in.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/app-ia.webp",
            width: 1141,
            height: 950,
            alt: "The app's information architecture: home, all offers, dine, shop and travel categories, map view, search and change location, all routing into vendor details and out to vendor website, social and contact.",
            caption: "Flat by design. Eight entry points, one destination, and a route out to the vendor from every one of them.",
          },
          {
            src: "/work/passport-unlimited-mobile/wireframes.webp",
            width: 1024,
            height: 748,
            alt: "Eight wireframe screens: sign in, home portal, search, location change, results list, filtered list with cuisine picker, vendor detail and offer redemption.",
            caption: "The whole app at wireframe stage, before any of it was styled.",
          },
          {
            src: "/work/passport-unlimited-mobile/screen-location.webp",
            width: 375,
            height: 812,
            alt: "The change location screen: a city, state or zip field, a use my location action, and a list of recent locations including San Diego, Las Vegas, Hawaii and Seattle.",
            caption: "Change location, with recents. This is the screen that answers the persona who is somewhere different most weeks.",
            size: "text",
          },
        ],
      },

      /* ---------- PROCESS ---------- */
      {
        heading: "The Button I Designed and Deleted",
        body: "I built prototypes and ran user testing sessions. One piece of feedback genuinely surprised me.\n\nI'd designed a central action button into the bottom navigation, a shortcut that opened a radial menu and threw you straight into All Offers, Dine, Shop or Travel. It solves a real problem on paper. The three verticals are the spine of the business, they were buried a level down, and this put them one thumb-reach from anywhere in the app.\n\nI thought it was a smart shortcut. Users disagreed. Most preferred to simply browse naturally, and a few actively disliked the button.\n\nRather than defending the decision, I removed it and let the browse experience do the work. The clip is the version that did not ship.\n\nWhat I take from it now is not that the idea was stupid. It is that I had solved an org chart problem rather than a member problem. The three verticals matter enormously inside the company and barely at all to somebody deciding where to eat.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/bottom-nav-poster.webp",
            width: 450,
            height: 974,
            clip: "/work/passport-unlimited-mobile/bottom-nav.mp4",
            alt: "The bottom navigation's centre button being tapped, opening a radial menu with All Offers, Dine, Shop and Travel arcing out above it.",
            caption: "Built, prototyped, tested, cut. Users wanted to browse, not to be shortcutted past the browsing.",
          },
        ],
      },
      {
        heading: "How Decisions Got Made",
        body: "Ownership of the product was split three ways, with no single authority over the roadmap. That's a structure, not a personality, but the effect is that any design decision can be reopened by anyone, at any point, on any grounds.\n\nHaving argued my way into the work, I couldn't afford for calls to come down to whichever preference carried the room that day. So I stopped bringing options and started bringing evidence: what users actually did in testing, what a direction would cost, what it would take to maintain. That gave the group something external to agree or disagree with, which turned out to be the fastest path to a decision.\n\nIt's the habit I've kept longest from that job.",
      },
      {
        heading: "The System Underneath",
        body: "The three verticals needed to be legible at a glance, in a list, on a map pin, and on a card in somebody's wallet. So they got colour before they got anything else. Dine red, shop orange, travel blue, each one built on the same circular mark and the same construction grid, so a pin on a map and an icon in a filter row are recognisably the same object at very different sizes.\n\nEverything else is Lato and a five step grey ramp. That is the entire system. It is not ambitious and it was not supposed to be. A member is looking at a photograph of food, a distance, and an offer. The interface's job is to stay out of the way of those three things.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/brand-marks.webp",
            width: 966,
            height: 253,
            alt: "The Passport Corporate wordmark and the three category marks for dine, shop and travel, each shown over its circular construction grid.",
            caption: "One construction, three categories. Built to survive being shrunk to a map pin.",
            transparent: true,
          },
          {
            src: "/work/passport-unlimited-mobile/design-tokens.webp",
            width: 966,
            height: 671,
            alt: "The type and colour specimen: Lato in regular, bold and black, the three category colours with hex values, and a five step grey ramp.",
            caption: "Lato, three category colours, five greys.",
            size: "text",
          },
        ],
      },

      /* ---------- RESULT ---------- */
      {
        heading: "What Shipped",
        body: "The redesigned app launched and adoption was meaningfully stronger than the old version.\n\nHome opens on what's near you: quick access to saved, new and hot offers, then featured placements, then the newest dining, shopping and travel offers as you scroll. Search carries recent searches and recent locations, so the two things a returning member most often repeats are both one tap away. Results run as a list or a map from the same filter set, and the filters stay visible as breadcrumbs so nobody loses track of what they've narrowed to. The vendor page leads with the space itself, then the offer, then the ways to act on it.\n\nBut the launch also surfaced something design alone couldn't fix: the quality of the offers the sales team was acquiring was a friction point for members.\n\nRather than letting that become invisible complaint, I designed a feedback loop directly into the app, a lightweight way for members to tell the company what they thought of an offer. The result: the team went from operating on assumptions to having quantitative data on member satisfaction they could actually act on. That was previously invisible to the business.\n\nDeveloper sourcing saved the company thousands in development fees. UI was iterated post-launch based on direct member feedback.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/annotated-home-search.webp",
            width: 1400,
            height: 760,
            alt: "The home screen and the search and location screens, annotated with callouts for search, category filters, featured paid placements, newly added offers by vertical, and the main navigation.",
            caption: "Home and search, annotated. Featured placements are paid vendor promotion, which is the business model showing through the interface.",
          },
          {
            src: "/work/passport-unlimited-mobile/annotated-browse.webp",
            width: 1400,
            height: 538,
            alt: "Browsing as a list and as a map, annotated with callouts for live breadcrumbs, live filters, vendor info, vendor locations and the selected vendor.",
            caption: "The same filter state, two ways of reading it.",
          },
          {
            src: "/work/passport-unlimited-mobile/annotated-vendor.webp",
            width: 1400,
            height: 583,
            alt: "The vendor detail page with the offer and the actions available, beside the live filter and breadcrumb behaviour.",
            caption: "The vendor page. Everything above the fold is the space, the offer, and a way to act on it.",
          },
        ],
      },
      {
        heading: "The Corporate Portal Beside It",
        body: "The app was one door into the program. The other was the corporate member portal, the web experience a company's employees landed on after HR enrolled them. It had to do the same job as the app on a desktop, for a member who might only visit once a quarter to see what was near the office.\n\nThe portal reuses the mobile system rather than restating it. The three category marks and their colours carry over unchanged, the location and filter row does the same work as the app's live filters, and the featured collections down the right are the same paid placements that fund the program.\n\nThe emails were the part nobody had designed. Welcome, assign your gifts, and the survey sent when a company let its membership lapse. Each one is a single column with one action, because they were read on a phone in an inbox full of other things.",
        figures: [
          {
            src: "/work/passport-unlimited-mobile/corporate-signin.webp",
            width: 1600,
            height: 1007,
            alt: "The Passport Corporate member portal sign-in page: a sign-in form on the left and a full-bleed food photograph on the right.",
            caption: "The portal's front door. Sign in on the left, the program's promise on the right.",
          },
          {
            src: "/work/passport-unlimited-mobile/corporate-home.webp",
            width: 1600,
            height: 1324,
            alt: "The portal's dining results page: a location and filter row, a list of restaurant offers with save, map and menu actions, and featured collections on the right.",
            caption: "Dining results. The same filters as the app, the same three marks in the navigation, and the paid collections on the right.",
          },
          {
            src: "/work/passport-unlimited-mobile/corporate-mobile-detail.webp",
            width: 522,
            height: 1460,
            alt: "The portal's vendor detail page at phone width: the restaurant photograph, the offer, alternate offers, about, social and exclusions.",
            caption: "The vendor page at phone width. The portal had to hold up on the same screen the app lived on.",
            size: "text",
          },
          {
            src: "/work/passport-unlimited-mobile/member-emails.webp",
            width: 1600,
            height: 1151,
            alt: "Three member emails side by side: the welcome and assign gifts email, the comp of email, and the lapsed membership survey email.",
            caption: "Welcome, assign your gifts, and the survey when a company lapsed. One column, one action each.",
          },
        ],
      },
      {
        heading: "What I'd Do Differently",
        body: "Split ownership with no single roadmap authority meant every direction could be reopened, and the project absorbed a lot of avoidable back-and-forth as a result.\n\nIf I ran this again I'd spend the first week establishing who decides (a single product voice, or failing that a written alignment process) before any design work started. I treated that as someone else's problem to solve. It was mine, and the time lost to it was the biggest drag on the project.",
      },
    ],
  },
];
