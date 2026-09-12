import type { CaseStudy } from "./types";

/**
 * Efficiently, 2020-2026. Owned by the "Efficiently" workstream.
 * Case study 1 of 3: the system. 2 (density ceiling) and 3 (AI prototype) come later.
 *
 * Adding an image to a section: drop the file in /public/work/<slug>/ then add
 *
 *   figures: [
 *     {
 *       src: "/work/design-finish-selection/item-id-model.png",
 *       alt: "Four bathroom locations pointing at item ID TO-01, a fifth at TO-02.",
 *       caption: "Change what TO-01 points at and four bathrooms change. The fifth was never listening.",
 *       size: "wide", // or "text" to hold it to the prose measure
 *     },
 *   ]
 *
 * alongside `heading` and `body`. Multiple figures stack in order.
 */
export const efficientlyStudies: CaseStudy[] = [
  {
    slug: "design-finish-selection",
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
      "A house gets built out of thousands of small decisions and almost none of them have one owner. I designed the first two stages of a platform meant to hold all of them in one place: a plans canvas for measuring and placing finishes, an item schedule that carries the approval workflow, a design book for presenting selections, and a portal where the homeowner says yes. One item record underneath all of it, so a decision made anywhere is visible from everywhere.",
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
      /* ---------- PROBLEM ---------- */
      {
        heading: "The Question Nobody Owns",
        body: "Try this. A homeowner standing in a half-built house points at a tile sample and says yes.\n\nWhat happens next?\n\nSomebody records that yes. Somebody decides whether the homeowner was even the person authorized to say it, or whether their spouse gets a vote, or the architect, or all three. Somebody tells the supplier. Somebody cuts a purchase order. Someone receives the pallet, inspects it, installs it. And if that tile gets discontinued between the yes and the pallet, every one of those people is now working from an answer that stopped being true.\n\nNone of those questions are hard. That's the maddening part. Each one has an obvious answer, and the answers live in a drawing set, an email thread, a spreadsheet, a set of shop drawings, and somebody's text messages, so answering one of them quietly breaks another.\n\nThe company started here because the founder had built his own house and lived through exactly this. When I joined we went and checked whether it generalized, talking to luxury builders and to people who had built. It did, and what came back loudest was money. A change gets requested, the request doesn't reach whoever placed the order in time, the range has already shipped, and now there's a restocking fee. One missed message, tens of thousands of dollars. On a large build that isn't a rare disaster, it's a Tuesday.\n\nSo: one record of a build, from the first drawing to the last warranty, where every stakeholder can see where any item stands. This case study covers the first two stages of it.",
        figures: [
          {
            src: "/work/design-finish-selection/01-cascade.svg",
            alt: "One decision branching into records, approvals, purchase orders, delivery and installation, with loops back to the start.",
            caption: "Every one of these is answerable. None of them lives in the same place as the others.",
          },
        ],
      },
      {
        heading: "Six People Who Want Opposite Things",
        body: "Six kinds of people touch a single finish selection, and they want opposite things from the same screen.\n\nThree are specialists, there for their own discipline and impatient with anything outside it: the architect, the interior designer, the supplier. Three are generalists who move the whole project and mainly need to know where things stand: the project manager, the general contractor, and the homeowner.\n\nThe homeowner is the one everybody designs past. They're the decision maker, the reviewer, the person whose signature ends the argument. And they're the only person on that list doing this once in their life, surrounded by professionals who do it fifty times a year. A screen a project manager finds efficient can be genuinely alarming to someone who has never read a finish schedule.\n\nThere's no splitting the difference. A dense screen doesn't get friendlier when you add whitespace, and a friendly one doesn't get more capable when you add columns. So we stopped trying to make one screen serve both and built different doors into the same room.\n\nDeciding who we weren't building for took longer than deciding who we were. Not quick remodels. Not single-finish projects, the repaint, the tub swap. A tool that tries to be right for a bathtub replacement and a fourteen-room custom build is pleasant for neither, and the gravity pulls toward the bathtub every time, because the bathtub demos in ninety seconds.",
      },

      /* ---------- SOLUTION ---------- */
      {
        heading: "Three Surfaces, One Record",
        body: "Before anybody drew a screen we wrote down what a person is trying to get done in these two stages. Not features, tasks. Read the drawings. Measure areas to pull quantities out of them. Place finish elements and notate distances between them. Then curate and select items plus alternatives, talk to the people who approve, and review, replace, present, around again, because that loop is the job. Almost nothing gets chosen once.\n\nThat list settled arguments for six years. Whenever a feature debate stalled we went back and asked which of those it served.\n\nWhat came out of it was three working areas, plus the catalog that feeds them and the portal where the homeowner says yes. The plans page, where you measure and place. The item schedule, where you operate. The design book, where you persuade.\n\nSchedules are already how construction handles finishes, and every party on a job can read one without being taught, so we built with that instead of around it.\n\nThe real work wasn't building any one of the three. It was making all three the same thing underneath. The item is the atomic unit and every surface is a view of the same record, never a copy. Put an item on a design book page and it appears in the schedule. Tag it on the plans and that physical location is bound to the selection. Approve it, reject it, ask for a change, and it reads that way everywhere it appears.",
        figures: [
          {
            src: "/work/design-finish-selection/08-propagation.svg",
            alt: "The same item shown in two surfaces, both carrying the same approval status.",
            caption: "Approve it once. It reads that way everywhere it appears.",
          },
        ],
      },
      {
        heading: "One Item, Many Places",
        body: "Here's the mechanic at the center of the system.\n\nA location doesn't hold an item. It holds an item ID, and the ID holds the item.\n\nFive bathrooms. You want the same toilet in four of them and something better in the primary. Mark the five locations on the plans, a click each. No items chosen yet. Make an ID called TO-01 and assign it to four of them. Make TO-02 and give it to the fifth. Now pick the toilet for TO-01 and all four bathrooms fill at once.\n\nSix months later the budget is bleeding and toilets are a painless place to take some of it back. Change what TO-01 points at. All four change. The primary doesn't, because it was never listening. It earns its keep on lighting, where a large house can carry a hundred can lights under one ID.\n\nStructurally that's a placeholder that many places point at, the same shape as a component and its instances, except the instances are physical objects sitting in rooms. It's powerful and it isn't free, because it asks a person to hold an abstraction: the ID is not the toilet, it's a slot the toilet fills. What that cost added up to across the whole platform is a longer story and it gets its own case study.\n\nAll of it works without plans, which mattered more than we expected. Plenty of projects arrive with no drawings, or with drawings the architect hasn't released yet. You can build the entire thing in the schedule, and if plans turn up later the navigation already mirrors the structure you built, so nobody starts over.",
        figures: [
          {
            src: "/work/design-finish-selection/05-item-id-model.svg",
            alt: "Five bathroom locations, four assigned to item ID TO-01 and one to TO-02, with the item each ID resolves to.",
            caption: "Change what TO-01 points at and four bathrooms change. The fifth was never listening.",
          },
        ],
      },
      {
        heading: "What a Rejection Costs",
        body: "Saying no in the client portal is one button. It means two entirely different things depending on when somebody presses it.\n\nDuring selection it is cheap. The homeowner rejects an item, the designer is told, the designer picks again. Nobody else hears about it, because nobody else is affected yet.\n\nAfter approval, the same button starts a different machine. The item has moved on by then. Somebody has ordered it, or scheduled around it, or built something that assumes it is coming. So the project manager works out what is still possible, finds whoever is holding that item now, and gathers the real scope and cost of changing it. Then that number goes back to the homeowner, not as a notification but as a decision: approve the change order, or cancel it and build what was already agreed.\n\nThat is what the approval gate is for. Everything upstream of it exists to keep rejections in the first version of that story rather than the second.\n\nIt also settled who gets told what. A rejection during selection reaches one person. A rejection after approval reaches the person who can price it and the person who has to pay for it, and nobody else until there is something for them to do. Notification followed consequence, which is the first thing a system stops doing the moment it owns a notification service and a list of everyone on the project.\n\nThe same logic covers an item that stops existing. Pulling a discontinued item off the page is the clean implementation, and it's wrong, because now the page has quietly changed and nobody knows why. We put a badge over the image instead. The selection stays where it is, visibly dead, and somebody still has to decide what to do about it. Making people aware beats making it tidy.",
        figures: [
          {
            src: "/work/design-finish-selection/19-rejection-cost.svg",
            alt: "Two paths from the same rejection: three steps during selection, six steps and three people after approval.",
            caption: "The same action, taken at two different moments. Timing is the whole difference between a loop and a change order.",
          },
          {
            src: "/work/design-finish-selection/07-discontinued-badge.svg",
            alt: "An item on a design book page with a discontinued status badge over its image.",
            caption: "The selection stays where it is, visibly dead. Someone still has to decide what to do about it.",
            size: "text",
          },
        ],
      },

      /* ---------- PROCESS ---------- */
      {
        heading: "Measuring Before Choosing",
        body: "Upload the architectural set and scale it so measurements come out true. Then hide most of it. A three story house arrives with a stack of sheets and today you need three of them, so you turn the rest off. Small feature, and it's the difference between a page you can think on and a filing cabinet.\n\nOnce it's scaled you can take off quantities. Draw the floor of a room and you get its square footage. Draw the walls and you get theirs. That measured region is a finish area, and an area carries a number, so when you assign a material to it you get a real quantity out the other side.\n\nA location is the other kind of thing: an object that sits somewhere. A refrigerator, a bed, a toilet, a light. It has no area, it has a place.\n\nAreas and locations are the two ways a finish exists in a house. Separating them early meant the quantity math and the placement logic never had to fight each other, which is the sort of decision nobody thanks you for and everybody would have suffered from.",
        figures: [
          {
            src: "/work/design-finish-selection/04-area-vs-location.svg",
            alt: "A drawing showing a measured floor area alongside placed point locations for fixtures.",
            caption: "An area carries a number. A location carries a place. Almost everything downstream depends on keeping those apart.",
          },
        ],
      },
      {
        heading: "Inside the Design Book",
        body: "Two page sizes, two orientations. 11x17 and 11x8.5, portrait or landscape, and that's the entire menu.\n\nThat came out of research, not taste. We collected the books designers were already making. The sample had all sorts of sizes in it, but the bulk landed on those two, and the reason was mundane and completely decisive: those are the sizes an office can print itself. Anything else means sending a file out and waiting on it. Constraining the canvas to what somebody could hold in their hands an hour from now killed off a whole category of layout problems before anyone had to hit one.\n\nThe item box is where the actual design is. It's a placeholder with four addressable zones around it: above, below, left, right. Pick something from the catalog and it drops onto the page bound to the catalog record, and the zones around it can surface any field on that record, each formatted on its own terms. Save the arrangement as a style and any item in the book can wear it with one click.\n\nThe default is the part I'd defend hardest. Nothing arrives naked and waiting for you to format it. An item lands already correct, and everything past that is available rather than required.\n\nThe quadrant model is mine, concept and implementation both. It comes out of magazine work early in my career, where you learn fast how little of a well-set spread is talent. Mostly it's alignment. Put guardrails on alignment and a non-designer gets further than they have any right to, and the designers speed up too, because they stop doing arithmetic with their eyes. Every interior designer we talked to was doing this by hand, and rebuilding the alignment by hand every time a selection changed.\n\nPermissions run on the same separation. Any element locks and unlocks with a click, and a firm can lock the elements inside a template so its standards travel with the file. A locked book isn't a frozen book, though: the layout is a view of the items, so you can freeze the view and keep changing what it's looking at. That's what lets a firm hand a junior a book they can fill and can't wreck.",
        figures: [
          {
            src: "/work/design-finish-selection/design-book.webp",
            alt: "A design book spread in the editor, laying out selections for a primary bathroom across a two page layout.",
            caption:
              "The design book itself. Every diagram below it is an explanation of something happening on this screen.",
            width: 1600,
            height: 1100,
            transparent: true,
          },
          {
            src: "/work/design-finish-selection/09-quadrant-item-box.svg",
            alt: "An item box on the canvas with four zones around it holding the item name, SKU, and size and color, each formatted differently.",
            caption: "Four addressable zones around the image. Every field on the record, formatted on its own terms.",
          },
          {
            src: "/work/design-finish-selection/10-style-swap.svg",
            alt: "The same catalog item rendered under two different saved styles.",
            caption: "Save the arrangement as a style and any item in the book can wear it with one click.",
          },
          {
            src: "/work/design-finish-selection/11-page-sizes.svg",
            alt: "The new book dialog offering two page sizes in portrait and landscape.",
            caption: "The entire menu. Both sizes print in a designer's own office.",
            size: "text",
          },
          {
            src: "/work/design-finish-selection/12-permissions.svg",
            alt: "The request to edit flow: a viewer requests access, the senior is notified, one click approves.",
            caption: "Locked layout, live content. A junior can fill the book and cannot wreck it.",
            size: "text",
          },
        ],
      },
      {
        heading: "The Half-Pixel Problem",
        body: "One thing about the canvas bothered me for a long time, and it's small enough that explaining it feels like a confession.\n\nA canvas puts elements on a pixel grid. The whole point is that when you nudge something one pixel, the next thing lines up to that exact intersection without anybody guessing. The first implementation didn't enforce it. An element could sit at x.7, and the guides couldn't save you because the thing you were aligning to wasn't on the grid either. Zoom in far enough and you could watch an element sitting halfway inside a pixel.\n\nTwo fixes. Grid lines belong on the boundary where pixels meet, not through the middle of them, so an element can sit cleanly on either side of a line. And the guides had been scaling with the zoom, getting fatter the further you magnified, which made precision worse exactly when you were reaching for it. A guide should be one pixel wide however far in you go.\n\nSame category, different surface: the measurement crosshair on the plans page has to stay visible over every value from paper white to solid black, so it's a one pixel black cross with a one pixel white outline, thin enough to still point at something precisely.\n\nNobody puts any of that on a roadmap. It's also the difference between a designer trusting the tool with client work and quietly going back to doing it by hand.",
        figures: [
          {
            src: "/work/design-finish-selection/14-crosshair.svg",
            alt: "The measurement crosshair magnified over a light area and a dark area of a drawing.",
            caption: "One pixel black, one pixel white outline. Findable on paper white and on solid black.",
          },
        ],
      },
      {
        heading: "Two Things I Got Wrong",
        body: "The first version of the item box only took catalog items, and images were a separate object entirely. It should have been one box from the start that could hold either. I didn't see it until we'd already built it, and we went back and redesigned it. The cost landed softly because the rebuild happened alongside functions that needed writing anyway, but the misread was mine and it was avoidable.\n\nThe second one I caught before it cost anything. On a different module, a directory of manufacturers, I pushed for a card grid. Big images, four or five across, scrolling forever. It got approved, and then I looked at it again and realized I'd manufactured a visual hierarchy that made the information harder to read than plain rows and columns would have been. Cards weren't just less boring, they were worse. We caught it before it went to dev.\n\nThat one taught me the distinction I now hold rather than just assert. Cards are for looking at a thing and deciding whether you want it. Lists are for finding out where things stand. The manufacturer directory was a list job that I'd dressed up as a browsing job.\n\nIt's the same split that runs through the whole product. The design book is for persuasion. It's a terrible operations surface, and a contractor who needs a running account of what's chosen and where it stands will not page through a document. The table won on scannability, and it happened to be the format the industry already ran on.",
        figures: [
          {
            src: "/work/design-finish-selection/16-cards-i-got-wrong.svg",
            alt: "The manufacturer card grid beside the list layout that replaced it.",
            caption: "My card grid, and the boring rows that were correct. I argued for the wrong one.",
            size: "text",
          },
        ],
      },
      {
        heading: "The Homeowner's Front Door",
        body: "The homeowner gets their own entrance, and it looks nothing like the rest of the application.\n\nThey sign in and land on their house. If an architect has provided plans they get the floor plan and navigate it. If there are no plans they get a list of rooms. Either way they go into a room and see what's been proposed for it.\n\nNot as a schedule. As cards, large ones, with the item photographed in the color that was actually selected. Open one and there's more detail, any alternatives the designer put forward, and somewhere to say something. People building a luxury house expect a surface that feels like one, so it's white, spacious and quiet.\n\nIf they'd rather have one of the alternatives, choosing it doesn't swap the item. It files a change request back to whoever holds selection authority. That's deliberate. The alternative might be discontinued, or on back order long enough to stall a trade, or wrong for a reason the designer knows and the homeowner has no way to know. The system shouldn't quietly settle something a person is better placed to settle.\n\nNotification is a daily summary, never one message per event. A designer working through a room can touch twenty items in an afternoon. Twenty emails isn't attentiveness, it's noise, and the fastest way to teach somebody to ignore your product is to email them twenty times about it.\n\nThe thing I'd point at, and I didn't notice it for years: this surface runs on a simpler structure than the rest of the platform. No item IDs. No sub-levels underneath the room. Just rooms and the things in them, which is how a person actually thinks about a house. It's also the easiest part of the product to use. I've come to think those two facts are the same fact.",
      },

      /* ---------- RESULT ---------- */
      {
        heading: "What Happened",
        body: "The platform is in real use. A luxury residential development runs its builds on it exclusively, and it isn't the only one. That still gives me a jolt, because you spend a year arguing about how a guide renders at zoom and then somebody builds actual houses with it.\n\nWe wrote success criteria before we built anything. Are we saving people time and money. Is it quick to work in. Can they drop other tools. Are mistakes caught earlier. Is communication between stakeholders better. Good questions, and nobody instrumented a single one of them, so I can't give you a number and I'm not going to invent one.\n\nWhat I can count is what got built. Two of a project's six stages, end to end. Three working surfaces plus a catalog and a client portal. Six stakeholder types with genuinely opposed needs, handled by giving them different doors instead of splitting differences. An item model that carries its own state to every place it appears. Six years of it, and a product design team that started as just me and grew to eight, which I built and mentored and would take anywhere.\n\nThe story of who ended up using this, and why, turned out to be more interesting than any of it. That one gets its own case study.",
      },
    ],
  },
];
