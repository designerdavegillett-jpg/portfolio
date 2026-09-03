import type { CaseStudy } from "./types";

/** Passport Unlimited, 2010-2020. Owned by the "Passport" workstream. */
export const passportStudies: CaseStudy[] = [
  {
    slug: "passport-unlimited-mobile",
    title: "Passport Unlimited, Mobile App",
    headline:
      "Passport Unlimited: a barely-used savings app rebuilt around *what's actually nearby*.",
    status: "Shipped",
    visual: "neutral",
    summary:
      "I was Passport's in-house graphic designer when the mobile app was being built by an outside firm, at a rate high enough that development ran in quarterly bursts sized to leftover budget. I made the case to bring the design in-house, sourced a developer at a fraction of the cost, and redesigned the app around proximity. Then shipped a feedback loop that gave the business its first real view of user satisfaction.",
    year: "2018-2020",
    platform: "iOS & Android",
    role: "Solo Product Designer",
    team: "CTO, Engineers, Contract Developer",
    tags: ["Mobile", "UX Research", "Stakeholder Management", "iOS", "Android"],
    sections: [
      {
        heading: "Background",
        body: "Passport Unlimited is an established savings and discount program connecting users with participating vendors. By the time this project started, the desktop experience had already been modernized. The mobile app was a different story. It was old, outdated, and barely used.\n\nThe mobile app was the primary touchpoint for users on the go, which made its neglect a real problem. The company had the bones of a valuable product; the app just wasn't reflecting that.",
      },
      {
        heading: "Making the Case",
        body: "I wasn't hired to design this app. I was Passport's in-house graphic designer, and my job was marketing 800+ merchant accounts to our members.\n\nThe mobile and web work went to an outside consulting firm. Their rate was high enough that it shaped the roadmap: development happened in quarterly bursts, sized to whatever budget was left. Product decisions were being made on a billing cycle rather than on what users needed.\n\nI was already doing the visual design. I was confident I could carry the UI and UX as well, and that the same budget could buy considerably more than it was buying. So I made the case to the CTO: let me design it, and let me find a developer at a rate that matches how this company actually operates.\n\nHe gave me the shot. I sourced several options and found a solo developer with a track record for efficiency who came in well under what the firms had quoted, enough that development stopped being rationed by quarter.",
      },
      {
        heading: "The Problem",
        body: "Users weren't engaging with the mobile app. The core promise, finding nearby vendor offers, wasn't being delivered in a way that felt useful or current. The app needed more than a visual refresh: it needed a feature and UX overhaul that made proximity-based offer discovery feel intuitive and worth opening.",
      },
      {
        heading: "Process",
        body: "I started by auditing comparable savings and loyalty apps to understand the current bar and where Passport Unlimited could differentiate. From there I moved to wireframes, focusing on the proximity-based offer discovery feature, the app's core value. The goal was making it immediately obvious when something valuable was nearby.\n\nI built prototypes and ran user testing sessions. One piece of feedback genuinely surprised me: I'd designed a central action button in the bottom navigation, a shortcut to jump directly into Dining, Shopping, or Travel (the company's three verticals). I thought it was a smart shortcut. Users disagreed. Most preferred to simply browse naturally, and a few actively disliked the button. Rather than defending the decision, I removed it and let the browse experience do the work.",
      },
      {
        heading: "How Decisions Got Made",
        body: "Ownership of the product was split three ways, with no single authority over the roadmap. That's a structure, not a personality, but the effect is that any design decision can be reopened by anyone, at any point, on any grounds.\n\nHaving argued my way into the work, I couldn't afford for calls to come down to whichever preference carried the room that day. So I stopped bringing options and started bringing evidence: what users actually did in testing, what a direction would cost, what it would take to maintain. That gave the group something external to agree or disagree with, which turned out to be the fastest path to a decision.\n\nIt's the habit I've kept longest from that job.",
      },
      {
        heading: "What Shipped",
        body: "The redesigned app launched and adoption was meaningfully stronger than the old version. But the launch also surfaced something design alone couldn't fix: the quality of offers the sales team was acquiring was a friction point for users.\n\nRather than letting that become invisible complaint, I designed a feedback loop directly into the app, a lightweight way for users to communicate their experience back to the company. The result: the team went from operating on assumptions to having quantitative data on user satisfaction they could actually act on.",
      },
      {
        heading: "Outcome",
        body: "The app shipped and was adopted well. UI was iterated post-launch based on direct user feedback. The in-app feedback loop created measurable insight into offer quality, which had been invisible to the business before. Developer sourcing saved the company thousands in development fees.",
      },
      {
        heading: "What I'd Do Differently",
        body: "Split ownership with no single roadmap authority meant every direction could be reopened, and the project absorbed a lot of avoidable back-and-forth as a result. If I ran this again I'd spend the first week establishing who decides (a single product voice, or failing that a written alignment process) before any design work started. I treated that as someone else's problem to solve. It was mine, and the time lost to it was the biggest drag on the project.",
      },
    ],
  },
];
