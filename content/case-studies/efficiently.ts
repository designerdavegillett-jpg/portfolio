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
    title: "Design & Finish Selection",
    headline:
      "Who chooses, who approves, and *who's holding the truth* when a house gets built.",
    status: "Shipped",
    visual: "canvas",
    image: {
      src: "/work/design-finish-selection/three-surfaces.png",
      alt: "Three Efficiently screens overlapping: the plans canvas with a room highlighted on a floor plan, the design book laying out primary bathroom selections, and the item schedule listing locations with approval statuses.",
      width: 1920,
      height: 1320,
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
      {
        heading: "The Question Nobody Owns",
        body: "Try this. A homeowner standing in a half-built house points at a tile sample and says yes.\n\nWhat happens next?\n\nSomebody records that yes. Somebody decides whether the homeowner was even the person authorized to say it, or whether their spouse gets a vote, or the architect, or all three. Somebody tells the supplier. Somebody cuts a purchase order and somebody else confirms the supplier got it. Someone receives the pallet. Someone inspects it. Someone installs it. And if that tile gets discontinued between the yes and the pallet, every one of those people is now working from an answer that stopped being true.\n\nNone of those questions are hard. That's the maddening part. Each one has an obvious answer, and the answers live in a drawing set, an email thread, a spreadsheet, a set of shop drawings, and somebody's text messages, so answering one of them quietly breaks another.\n\nThe company started here because the founder had built his own house, ten thousand square feet of it, and lived through exactly this. When I joined we went and checked whether it generalized, talking to luxury builders and to people who had built. It did. What came back loudest was money. A change gets requested, the request doesn't reach whoever placed the order in time, the range has already shipped, and now there's a restocking fee. One missed message, tens of thousands of dollars. On a large build that isn't a rare disaster, it's a Tuesday, and there are hundreds of chances for it.\n\nSo: one record of a build, from the first drawing to the last warranty, where every stakeholder can see where any item stands. Internally we called it the design schedule.\n\nThis case study covers the first two stages of it.",
        figures: [
          {
            src: "/work/design-finish-selection/01-cascade.svg",
            alt: "One decision branching into records, approvals, purchase orders, delivery and installation, with loops back to the start.",
            caption: "Every one of these is answerable. None of them lives in the same place as the others.",
          },
        ],
      },
      {
        heading: "Who's In the Room",
        body: "Six kinds of people touch a single finish selection, and they want opposite things from the same screen.\n\nThree are specialists, there for their own discipline and impatient with anything outside it: the architect, the interior designer, the manufacturer or supplier. Three are generalists who move the whole project and mainly need to know where things stand: the project manager, the general contractor (every trade collapsed under that one name for our purposes), and the homeowner.\n\nThe homeowner is the one everybody designs past. They're the decision maker, the reviewer, the person whose signature ends the argument. They ask most of the questions. And they're the only person on that list doing this once in their life, surrounded by professionals who do it fifty times a year. A screen a project manager finds efficient can be genuinely alarming to someone who has never read a finish schedule.\n\nThere's no splitting the difference on that. A dense screen doesn't get friendlier when you add whitespace, and a friendly one doesn't get more capable when you add columns. So we stopped trying to make one screen serve both and built different doors into the same room.",
      },
      {
        heading: "What We Weren't Building",
        body: "The list of people we weren't building for took longer to agree on than the list of people we were. Not quick remodels. Not single-finish projects, the repaint, the tub swap. Not cabinetry, not electrical, not internal plumbing schematics.\n\nYou can still do most of that in the platform, we just weren't going to let any of it win an argument. A tool that tries to be right for a bathtub replacement and a fourteen-room custom build is pleasant for neither, and the gravity pulls toward the bathtub every time, because the bathtub demos in ninety seconds.",
      },
      {
        heading: "Three Surfaces and a Front Door",
        body: "Before anybody drew a screen we wrote down what a person is trying to get done in these two stages. Not features, tasks. Read the drawings. Establish room parameters. Measure areas to pull quantities out of them. Place finish elements and notate distances between them. Connect elevations to their floor plans. Then curate and select items plus alternatives, talk to the people who approve, and review, replace, present, around again, because that loop is the job. Almost nothing gets chosen once.\n\nThat list settled arguments for six years. Whenever a feature debate stalled we went back and asked which of those it served.\n\nWhat came out of it was three working areas, plus the catalog that feeds them and the portal where the homeowner says yes.\n\nThe plans page, where you measure and place.\n\nThe item schedule, where you operate.\n\nThe design book, where you persuade.\n\nThe plans page and the design book both write into the schedule, and the schedule can do the whole job by itself if it has to. The real work wasn't building any one of them. It was making all three the same thing underneath.",
        figures: [
          {
            src: "/work/design-finish-selection/02-three-surfaces.svg",
            alt: "The plans page, the item schedule and the design book, showing the same project.",
            caption: "Measure, operate, persuade. One project seen three ways.",
          },
        ],
      },
      {
        heading: "The Plans Page",
        body: "Upload the architectural set and scale it so measurements come out true. Then hide most of it. A three story house arrives with a stack of sheets and today you need three of them, so you turn the rest off and work on what's in front of you. Small feature, and it's the difference between a page you can think on and a filing cabinet.\n\nOnce it's scaled you can take off quantities. Draw the floor of a room and you get its square footage. Draw the walls and you get theirs. That measured region is a finish area, and an area carries a number, so when you assign a material to it you get a real quantity out the other side. Add a waste percentage, or a flat amount if you'd rather be exact about it.\n\nA location is the other kind of thing. A location is an object that sits somewhere: a refrigerator, a bed, a toilet, a light. It has no area, it has a place.\n\nAreas and locations are the two ways a finish exists in a house. Separating them early meant the quantity math and the placement logic never had to fight each other, which is the sort of decision nobody thanks you for and everybody would have suffered from.",
        figures: [
          {
            src: "/work/design-finish-selection/03-takeoff.svg",
            alt: "A room measured on the plans canvas with its square footage displayed.",
            caption: "A takeoff. Draw the surface, get the quantity, add waste.",
          },
          {
            src: "/work/design-finish-selection/04-area-vs-location.svg",
            alt: "A drawing showing a measured floor area alongside placed point locations for fixtures.",
            caption: "An area carries a number. A location carries a place. Almost everything downstream depends on keeping those apart.",
          },
        ],
      },
      {
        heading: "One Item, Many Places",
        body: "Here's the mechanic at the center of the system.\n\nA location doesn't hold an item. It holds an item ID, and the ID holds the item.\n\nFive bathrooms. You want the same toilet in four of them and something better in the primary. Mark the five locations on the plans, a click each. No items chosen yet. Make an ID called TO-01 and assign it to four of them. Make TO-02 and give it to the fifth. Now pick the toilet for TO-01 and all four bathrooms fill at once. Pick the toilet for TO-02 and the primary fills.\n\nSix months later the budget is bleeding and toilets are a painless place to take some of it back. Change what TO-01 points at. All four change. The primary doesn't, because it was never listening.\n\nIt earns its keep on lighting. A large house can carry a hundred can lights under one ID. Change the fixture once and the house changes.\n\nStructurally that's a placeholder that many places point at, which is the same shape as a component and its instances, except the instances are physical objects sitting in rooms. It's powerful and it isn't free, because it asks a person to hold an abstraction: the ID is not the toilet, it's a slot the toilet fills. What that cost added up to across the whole platform is a longer story and it gets its own case study.\n\nAll of it works without plans, which mattered more than we expected. Plenty of projects arrive with no drawings, or with drawings the architect hasn't released yet. You can build the entire thing in the schedule: create rooms, add locations, assign IDs, select items. And if plans turn up later, the navigation down the left side of the plans page already mirrors the structure you built, so nobody starts over.",
        figures: [
          {
            src: "/work/design-finish-selection/05-item-id-model.svg",
            alt: "Five bathroom locations, four assigned to item ID TO-01 and one to TO-02, with the item each ID resolves to.",
            caption: "Change what TO-01 points at and four bathrooms change. The fifth was never listening.",
          },
          {
            src: "/work/design-finish-selection/06-id-assignment.svg",
            alt: "The interface for assigning one item ID across several locations.",
          },
        ],
      },
      {
        heading: "How State Travels",
        body: "The item schedule is the list of finishes chosen for a unit, made by whoever has the authority to choose them, and it carries the approval workflow along with it. One person selects, another approves.\n\nSchedules are already how construction handles finishes. Every party on a job can read one without being taught, which is worth an enormous amount, so we built with that instead of around it.\n\nThe item is the atomic unit and every surface is a view of the same record, never a copy. Put an item on a design book page and it appears in the schedule. Tag it on the plans and that physical location is bound to the selection, so anyone reading drawings can see what goes there. Approve it, reject it, ask for a change, and it reads that way everywhere it appears.\n\nThe interesting case is when an item stops existing. A supplier discontinues something a designer already put on page four and already presented to a client. The clean implementation is to pull it off the page. The clean implementation is wrong. Now the page has quietly changed and nobody knows why, or worse, nobody notices at all.\n\nWe put a badge over the item image instead, carrying its status. The selection stays where it is, visibly dead, and the person who chose it has to decide what to do about it. Making somebody aware beats making it tidy.\n\nUniversal awareness was the actual product. Everything else was a nicer way in.",
        figures: [
          {
            src: "/work/design-finish-selection/07-discontinued-badge.svg",
            alt: "An item on a design book page with a discontinued status badge over its image.",
            caption: "The selection stays where it is, visibly dead. Someone still has to decide what to do about it.",
            size: "text",
          },
          {
            src: "/work/design-finish-selection/08-propagation.svg",
            alt: "The same item shown in two surfaces, both carrying the same approval status.",
            caption: "Approve it once. It reads that way everywhere it appears.",
          },
        ],
      },
      {
        heading: "What a Rejection Costs",
        body: "Saying no in the client portal is one button. It means two entirely different things depending on when somebody presses it.\n\nDuring selection it is cheap. The homeowner rejects an item, the designer is told, the designer picks again. Nobody else hears about it, because nobody else is affected yet. The loop runs a second time and the project never notices.\n\nAfter approval, the same button starts a different machine. The item has moved on by then. Somebody has ordered it, or scheduled around it, or built something that assumes it is coming. So the project manager works out what is actually still possible, finds whoever is holding that item now, and gathers the real scope and cost of changing it. Then that number goes back to the homeowner, not as a notification but as a decision: approve the change order, or cancel it and build what was already agreed.\n\nThat is what the approval gate is for. Everything upstream of it, the schedule, the tags on the plans, the state that travels between surfaces, exists to keep rejections in the first version of that story rather than the second.\n\nIt also settled who gets told what. A rejection during selection reaches one person. A rejection after approval reaches the person who can price it and the person who has to pay for it, and nobody else until there is something for them to do. We never broadcast either one. Notification followed consequence, which sounds obvious and is the first thing a system stops doing the moment it owns a notification service and a list of everyone on the project.\n\nApproval itself can be shared. A couple building together, an owner who keeps a designer with sign-off authority, more than one name on the same decision. A project always carries a primary approver underneath that, though, who can override any of them, so a house can never be held up by two people who both have the right to say yes.",
        figures: [
          {
            src: "/work/design-finish-selection/19-rejection-cost.svg",
            alt: "Two paths from the same rejection: three steps during selection, six steps and three people after approval.",
            caption: "The same action, taken at two different moments. Timing is the whole difference between a loop and a change order.",
          },
        ],
      },
      {
        heading: "Inside the Design Book",
        body: "Two page sizes, two orientations. 11x17 and 11x8.5, portrait or landscape, and that's the entire menu.\n\nThat came out of research, not taste. We collected the books designers were already making. The sample had all sorts of sizes in it, but the bulk landed on those two, and the reason turned out to be mundane and completely decisive: those are the sizes an office can print itself. Anything else means sending a file out and waiting on it. Constraining the canvas to what somebody could hold in their hands an hour from now killed off a whole category of layout problems before anyone had to hit one.\n\nFrom there it's quick. Make a book, take a template or a blank canvas, start working. Ten starter templates shipped with the product, and a firm could build and save its own. The tool set is small on purpose: shapes, a line tool, an image box, an item box. Rulers, grids, guides, and alignment and spacing indicators you can switch off when they start nagging.\n\nThe image box and the item box are where the actual design is.\n\nEach is a placeholder with four addressable zones around it. Above, below, left, right.\n\nTwo ways in, both landing in the same place. Open the catalog drawer on the canvas, search or browse, pick something, and it drops onto the page in your default item box format. Or place an empty item box first and open the catalog from inside it. Either way, that click binds the canvas element to the catalog record.\n\nNow the zones around the box can surface any field on that record, each formatted on its own terms. Item name at 14pt bold. SKU under it at 10pt, underlined. Size and color below that in something else entirely, the whole stack sitting to the right of the image if that's how you want it. The image is yours to work too: resize it, reshape it, knock the background out. Save the arrangement as a style and any item in the book can wear it with one click.\n\nThe default is the part I'd defend hardest. Nothing arrives naked and waiting for you to format it. An item lands already correct, and everything past that is available rather than required.\n\nThe quadrant model is mine, concept and implementation both. It comes out of a stretch of magazine work early in my career, where you learn fast what a well-set spread is worth and how little of it is talent. Mostly it's alignment. Put guardrails on alignment and a non-designer gets further than they have any right to, and the designers speed up too, because they stop doing arithmetic with their eyes.\n\nWhat it replaced is why it was worth building. Every interior designer we talked to was doing this by hand. Place the image, type the name, type the SKU, type the dimensions, line it all up by eye. And when a selection changed, which happens constantly, copy and paste a fresh block of text for the replacement and rebuild the alignment around it.\n\nOne thing I got wrong. The first version only took catalog items, and images were a separate object entirely. It should have been one box from the start that could hold either. I didn't see it until we'd already built it, and we went back and redesigned it. The cost landed softly because the rebuild happened alongside functions that needed writing anyway, but the misread was mine and it was avoidable. The box you'd use today is the one I should have specified first.",
        figures: [
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
        ],
      },
      {
        heading: "Who Gets to Move Things",
        body: "The fight in a tool like this is freedom against consistency. Designers expect to put an element exactly where they want it and they aren't wrong to. The system wants coherent output and clean data underneath.\n\nWe didn't pick a side, we made it a click. Any element locks in place and unlocks the same way, so you can build out a book without knocking your own layout sideways while you work. There was full undo and redo under everything, so nothing was ever lost. The lock wasn't insurance. It was so you could stop thinking about it.\n\nThen the same mechanism got interesting twice.\n\nA firm can lock the elements inside a template. Every book made from it comes out with the same layout and different items, which means a company's standards travel with the file instead of living in the head of whoever has been there longest.\n\nAnd permissions run at the organization level. Admin, editor, viewer, each one's rules overridden by the role above it. Lock a whole book and nothing moves, but an editor can still change items throughout it. Somebody without edit rights clicks to request access, and the senior gets a notice in the app plus an email they can approve from without opening anything.\n\nThat middle part is the one I still like. A locked book isn't a frozen book. The layout is a view of the items, so you can freeze the view and keep changing what it's looking at. Same separation that lets a selection change without breaking anything downstream, except here it's what lets a firm hand a junior a book they can fill and can't wreck.",
        figures: [
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
        body: "One thing about the canvas bothered me for a long time, and it's small enough that explaining it feels like a confession.\n\nA canvas puts elements on a pixel grid. The whole point is that when you nudge something one pixel, the next thing lines up to that exact intersection without anybody guessing. The first implementation didn't enforce it. An element could sit at x.7, or any other fraction, and the guides couldn't save you because the thing you were aligning to wasn't on the grid either. Zoom in far enough and you could watch an element sitting halfway inside a pixel.\n\nYes, a zoomed pixel isn't a real pixel. It's a representation of one, and at that magnification it's telling you the truth about how the element and the grid relate. If the representation is ambiguous the placement is ambiguous, and a designer will feel that long before they can name it.\n\nTwo fixes. Grid lines belong on the boundary where pixels meet, not through the middle of them, so an element can sit cleanly on either side of a line. And the guides had been scaling with the zoom, getting fatter the further you magnified, which made precision worse exactly when you were reaching for it. A guide should be one pixel wide however far in you go.\n\nSame category, different surface: the measurement cursor on the plans page. A crosshair you're using to set an exact point has to stay visible over whatever is underneath it, and a plan set will put every value from paper white to solid black under your cursor. So it's a one pixel black cross with a one pixel white outline. Dark on the light areas, the white edge carrying it over the dark ones, and still thin enough to point at something precisely. I sized it up from what the other precision tools use, because ours needed to be findable fast, and that was the only thing I changed about a convention that already worked.\n\nNobody puts any of that on a roadmap. It's also the difference between a designer trusting the tool with client work and quietly going back to doing it by hand.",
        figures: [
          {
            src: "/work/design-finish-selection/13-half-pixel.svg",
            alt: "A zoomed comparison of an element at a fractional pixel position beside the same element snapped to the pixel boundary.",
            caption: "Left, an element sitting halfway inside a pixel with a guide thickened by zoom. Right, what it should have been.",
          },
          {
            src: "/work/design-finish-selection/14-crosshair.svg",
            alt: "The measurement crosshair magnified over a light area and a dark area of a drawing.",
            caption: "One pixel black, one pixel white outline. Findable on paper white and on solid black.",
          },
        ],
      },
      {
        heading: "Why the List Won",
        body: "The design book is for persuasion. Imagery, sequence, the argument for why these things belong together. It's the right format for the moment somebody decides whether they love a kitchen.\n\nIt's a terrible operations surface. A contractor who needs a running account of what's chosen and where it stands does not want to page through a document, and won't.\n\nThe table won on scannability and on the hierarchy you get free the moment things line up in columns. It also happened to be the format the industry already ran on, so nobody had to be taught anything.\n\nI earned that opinion the embarrassing way. On a different module, a directory of manufacturers, I pushed for a card grid. Big images, four or five across, scrolling forever. It got approved, and then I looked at it again and realized I'd manufactured a visual hierarchy that made the information harder to read than plain rows and columns would have been. Cards weren't just less boring, they were worse. We caught it before it went to dev.\n\nSo I hold the distinction rather than just asserting it. Cards are for looking at a thing and deciding whether you want it. Lists are for finding out where things stand. The manufacturer directory was a list job that I'd dressed up as a browsing job.",
        figures: [
          {
            src: "/work/design-finish-selection/15-book-vs-table.svg",
            alt: "A design book spread beside the item schedule table showing the same selections.",
            caption: "Persuasion on the left, operations on the right. Each one always informs the other.",
          },
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
        body: "The homeowner gets their own entrance, and it looks nothing like the rest of the application.\n\nThey sign in and land on their house. If an architect has provided plans they get the floor plan and navigate it. If there are no plans they get a list of rooms. Either way they go into a room and see what's been proposed for it.\n\nNot as a schedule. As cards, large ones, with the item photographed in the color that was actually selected. Open one and there's more detail, any alternatives the designer put forward, and somewhere to say something. People building a luxury house expect a surface that feels like one, so it's white, spacious and quiet, and it carries just enough of the platform's design to be recognizably the same product.\n\nThey can approve, and they can approve in bulk. Some people want to go item by item and some want to clear a whole room in one motion, and there was no reason to make either of them wrong. Rejection works the same way.\n\nIf they'd rather have one of the alternatives, choosing it doesn't swap the item. It files a change request back to whoever holds selection authority. That's deliberate. The alternative might be discontinued, or on back order long enough to stall a trade, or wrong for a reason the designer knows and the homeowner has no way to know. The system shouldn't quietly settle something a person is better placed to settle.\n\nThey also don't see everything. A designer marks an item for review when it's ready, and only then does it appear in the portal. Work in progress stays out of sight.\n\nAnd notification is a daily summary, never one message per event. A designer working through a room can touch twenty items in an afternoon. Twenty emails isn't attentiveness, it's noise, and the fastest way to teach somebody to ignore your product is to email them twenty times about it.\n\nThe thing I'd point at, and I didn't notice it for years: this surface runs on a simpler structure than the rest of the platform. No item IDs. No sub-levels underneath the room. Just rooms and the things in them, which is how a person actually thinks about a house. It's also the easiest part of the product to use. I've come to think those two facts are the same fact.",
        figures: [
          {
            src: "/work/design-finish-selection/17-portal-vs-platform.svg",
            alt: "The client portal beside the professional platform interface, showing the same project.",
            caption: "Same product, same project, two doors. The simpler structure is the one a person can walk into.",
          },
          {
            src: "/work/design-finish-selection/18-portal-item.svg",
            alt: "An item opened in the client portal showing detail, alternatives and a place to comment.",
            caption: "Choosing an alternative files a change request. It does not quietly swap the item.",
          },
        ],
      },
      {
        heading: "What Happened",
        body: "The platform is in real use. A luxury residential development runs its builds on it exclusively, and it isn't the only one. That still gives me a jolt, because you spend a year arguing about how a guide renders at zoom and then somebody builds actual houses with it.\n\nWe wrote success criteria before we built anything. Are we saving people time and money. Is it quick to work in. Can they drop other tools. Are mistakes caught earlier. Are projects moving faster. Is communication between stakeholders better. Good questions, and nobody instrumented a single one of them, so I can't give you a number and I'm not going to invent one.\n\nWhat I can count is what got built. Two of a project's six stages, end to end. Three working surfaces plus a catalog and a client portal. Six stakeholder types with genuinely opposed needs, handled by giving them different doors instead of splitting differences. An item model that carries its own state to every place it appears. Six years of it, and a product design team that started as just me and grew to eight, which I built and mentored and would take anywhere.\n\nThe story of who ended up using this, and why, turned out to be more interesting than any of it. That one gets its own case study.",
      },
    ],
  },
];
