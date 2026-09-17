import type { CaseStudy } from "./types";

/**
 * Own the Script - Dave's own product. Owned by the "Own the Script" workstream.
 *
 * STATUS, corrected 9 Sep 2026: the app is IN APP STORE REVIEW, not shipped.
 * The earlier "shipped" note of 24 Aug 2026 was wrong and has been corrected
 * here, in AGENTS.md and in desktop project memory. Do not reintroduce it.
 * Working loan officers outside Dave are using it on TestFlight, which retires
 * the old "no loan officer outside me has used this product" line.
 *
 * TODO (needs Dave): the TestFlight sentence in "Where It Stands" is written at
 * the only level currently confirmed - that real loan officers are using it.
 * No count, no duration, no feedback, because none has been supplied and the
 * project rule is never invent a metric. Strengthen it once he provides them.
 *
 * Restructured 9 Sep 2026 from an 18-section, 8,545-word chronological build log
 * into the problem / solution / process / result arc. The cut material was build
 * log detail and is intentionally gone; the previous version is in git history.
 *
 * Competitor and vendor names stay redacted (Vendor A-E, Competitor A/B).
 * No em dashes, no en dashes.
 */
export const ownTheScriptStudies: CaseStudy[] = [
  {
    slug: "own-the-script",
    title: "Own the Script",
    headline:
      "Own the Script: A short-form video app that carries its own compliance layer, concept to App Store review in ten weeks.",
    status: "In App Store review",
    visual: "dark",
    image: {
      src: "/work/own-the-script/main.webp",
      alt: "Three screens from Own the Script: the home feed with a weekly streak strip and video library, the script builder with a compliance review prompt, and the capture screen with the teleprompter running over the camera.",
      /* Dave's artwork. Supplied as a 1920px transparent PNG at 2.0 MB;
         re-encoded to WebP at 1600px, which covers the largest place it renders
         (832 CSS px on the case study page) at 2x. Not rendered as attributes on
         the tag - see the note in components/Thumb.tsx. */
      width: 1600,
      height: 1132,
      transparent: true,
    },
    summary:
      "A mortgage loan officer making a short video is a licensed advertiser, and almost nothing built for them treats it that way. I designed and directed an iOS app that lets one write a compliant script, read it off a teleprompter that follows their voice, burn animated captions and a regulatory disclosure card into the video on the phone, and publish it to three platforms in one tap. Behind it sits a web console where a lender writes its own compliance rulebook and the phone enforces it. Ten weeks, one designer, no engineers. AI agents wrote every line of the code and I wrote every line of the direction.",
    seoDescription:
      "A compliance-native video app for mortgage loan officers: a voice-following teleprompter, a 19-rule scan, and disclosures burned into every export.",
    updated: "2026-09-09",
    year: "2026",
    platform: "iOS app and web console",
    role: "Product design and direction. Product definition, interaction, visual, IA, copy, all platform and legal work, every device test",
    team: "Solo. AI agents wrote the code under continuous direction",
    tags: [
      "Solo Project",
      "Product Design",
      "Compliance",
      "iOS",
      "Design Systems",
      "AI-Directed Build",
    ],
    sections: [
      {
        heading: "The Problem Nobody in the Category Is Solving",
        body: "A mortgage loan officer lives or dies on referral flow, and short-form video is the cheapest referral engine available to them. The evidence that it works is real but narrow. Across working loan officer communities I found one originator posting a short video every day for two years and reporting qualified leads at $5 to $10 each, and another who traced three closed deals to a single September video in their first year. Against that, a thread of thirty-three comments from someone who posted three or four educational videos a week for a year and generated nothing.\n\nWhat made the category interesting was not that video works. It is that every piece of a loan officer's video is a regulated advertisement, and the tooling pretends otherwise.\n\nA single sixty second clip is governed at the same time by the SAFE Act, which requires the originator's NMLS ID on advertising. By the Fair Housing Act and ECOA, which require the Equal Housing mark and prohibit steering language. By Regulation Z, where quoting an APR or a payment triggers a full disclosure. By the FTC's Mortgage Acts and Practices Rule, which bans guaranteed approvals, debt elimination claims and skip a payment. By RESPA Section 8 on referral arrangements, and by UDAAP generally.\n\nMost of that cannot be handled by a caption, because the caption is not what gets reshared. It has to be inside the rendered video file. That became the product's central technical commitment and its clearest differentiator.\n\nI checked five vendors that a top ten US lender actually contracts with, against their own documentation rather than their marketing. Not one of them lets a loan officer record vertical video on a phone, burn captions into it, and publish it to a vertical feed. One states in its own docs that its Instagram support is single images only. Another's video product is a mail merge loan status tool, with real video handed to a third party integration. The only vendor that accepts 9:16 to Reels is upload only, and was acquired in 2023 by a company that now redirects its domain elsewhere.",
        interactive: "script-flow",
      },
      {
        heading: "Two Assumptions the Research Killed",
        body: "I started with two working assumptions and the competitive read reversed both. Both reversals shaped the product more than any feature decision did.\n\nFirst, compliance is not a moat. My June deep dive concluded that compliance assistance was the differentiator. A second pass proved that wrong, because both direct competitors already run compliance layers, one of them a 62 rule engine with severity tiers and regulatory citations. What survived scrutiny was narrower and much harder to copy: burning the NMLS ID and the Equal Housing mark into the rendered frame, on every export, with no path around it. Nobody in the category demonstrably does that.\n\nSecond, price is not the wedge. An earlier note of mine had recorded one self-serve competitor at $200 to $500 a month, enterprise only, and concluded the individual loan officer was underserved at the low end. That pointed at a roughly $40 a month solo app. When I re-verified the live pricing pages in August, that competitor was running a self-serve credit card checkout at $79. The cheap solo lane was not open. It was occupied by two funded incumbents with a $39 product underneath them. So I priced at $79 for individuals and $59 a seat for teams, matching the market anchor rather than undercutting it, and including everything the nearest competitor gates behind its $149 tier.\n\nThe research also surfaced a failure mode more useful than any feature request. The most discussed loan officer problem was not \"I can't make videos.\" It was \"I have no closings, so I have no confidence to give advice, so my content stays generic.\" That is a scripts and ideas problem, not a capture problem, and it is why the daily ideas feed and the script writer became first class surfaces rather than conveniences.",
      },
      {
        heading: "What the Product Had to Guarantee",
        interactive: "compliance-states",
        body: "The commitment from the research, that the disclosure lives inside the file rather than beside it, is only worth something if it cannot be switched off. So it is enforced in the renderer, not in the interface. Any caption specification arriving without a disclosure card gets one injected before the composition is built, and there is no code path that produces an export without it. \"Always include the disclosure\" is a promise. A renderer that will not emit a frame without one is a guarantee.\n\nThe scan in front of it is a 19 rule engine, and the design work was not writing the rules. It was deciding which of them a licensed professional is allowed to overrule.\n\nA live false positive on 30 July made that concrete. The caption \"Thinking about waiting for the perfect moment to refinance? Perfect rarely announces itself\" was hard blocked by the superlatives rule with no way through, and the Post button simply disabled. The rule blocks best, lowest, cheapest, number one, unbeatable, perfect. But \"the perfect moment\" is idiomatic and temporal. It is not a claim about the product, the rate or the terms, which is what the MAP Rule actually targets. The patch was easy. I took the design question underneath it instead.\n\nTier one is overridable with a logged acknowledgement: superlatives, free, urgency, comparative, qualify, prepay, counselor, and the trigger term rules. These are substantiation judgments, and a licensed loan officer can reasonably decide the claim is supportable in their context. The tool's job is to inform, not to make a legal determination.\n\nTier two is never overridable: guarantee, approval, credit-income, debt elimination, government affiliation, fair housing and RESPA referral. These are false representations about how lending works. No professional judgment makes them true, and fair lending exposure is not the loan officer's to waive.\n\nFour constraints keep that model real rather than decorative, and I set them by reading the live code before designing anything. The block is enforced on the server, because a client side post anyway button means anyone can bypass it with a crafted request and the audit trail becomes a lie. An override writes its own distinct audit event, so it is never counted as a clean publish. The acknowledgement is recorded rather than merely displayed, because we warned them is only a defence if it is evidenced. And it is per flag rather than one blanket checkbox, so the member has to look at each claim they are standing behind.\n\nGovernance sits on top of all of it. Override is a capability, not a default. A solo user may override, because they are their own compliance officer. A team member may override only if their organisation permits it, because a member quietly bypassing a company rule is exactly what the admin is paying to prevent.",
      },
      {
        heading: "A Prompter That Marks the Word You Are About to Say",
        interactive: "capture-anatomy",
        body: "On 12 August a phone maker announced a camera suite with a teleprompter in it, and one line in a hands on report changed my design: it highlights words on the camera screen to match your speaking pace.\n\nThat is the insight. It does not merely scroll. It marks where you are, word by word. Marking position is the feature, and scrolling is only how the marker stays on screen. My first build of the new engine scrolled without marking, which was a material miss, and I corrected it the same day.\n\nI built it in a Labs sandbox reachable from Settings, microphone only, rather than in the capture screen. Feel first, risky integration second. That is why it could be iterated a dozen times in two days without ever putting the recording path at risk.\n\nThe correction that defines the feature was one sentence: the highlight marks the text you are about to say, not the text you already said. A speech aligner's cursor is the last matched word, which by definition has already been spoken. Marking it points at the past, and it makes every millisecond of recogniser lag visible as a marker trailing the voice. The active word is cursor plus one, and both the highlight and the scroll target read from it, so the marker and the page can never disagree.\n\nWhat I reported next as lag was not an easing problem. The marker only moved when a word was matched, so between the recogniser's callbacks it sat perfectly still and then teleported, and the dead window landed on the line boundary, which is exactly where the eye needs to move. It was not easing badly. It was not moving at all. Never tune the easing before checking whether the thing moves between updates.\n\nThe answer was dead reckoning, the way a GPS navigates between fixes. Advance at the reader's own measured pace between matches, snap to each match when it lands. Prediction is capped at three words, and that cap doubles as the silence detector, because past about three words the reader has stopped rather than sped up. Position became a floating point word index, which is the enabling change for everything else, because the fractional part is what makes the colour crossfade and the scroll continuous rather than stepped.\n\nI rejected two things twice each. No background band or highlight fill, because a filled band competes with the video behind the prompter and reads as chrome rather than as the script; the colour of the type is the marker. And no word by word darkening inside the live line, proposed as a fix for having no feedback until a line boundary. It is a progress bar for the past, and it pulls the eye backwards at the moment it should be moving on.\n\nUnderneath both sits the law of that screen: only one property may change on a moving surface. The active line had been rendering at weight 700, and bold glyphs are wider, so every line that became active re-wrapped the paragraph, which invalidated the measured word geometry, which regrouped the lines, which moved the highlight, which caused another reflow. A visible tearing loop out of one weight change. Colour is the only thing allowed to change. Never weight, never size, never letter spacing.",
      },
      {
        heading: "Directing a Build I Did Not Write",
        body: "I did product definition, interaction, visual, IA, copy, all platform and legal work, and every device test. AI agents wrote every line of the code. I do not write code. That arrangement did not remove work from me, it relocated it.\n\nSpecification became the primary design deliverable. When a build partner implements literally what it is told, ambiguity in a spec surfaces as a defect rather than as a question. Not \"make the prompter smoother\" but a stated model of what smooth means, what is allowed to change, and what must never move.\n\nVerification had to be designed rather than assumed. A partner that always reports the work as done requires me to prove that it isn't. Measure, don't eyeball, and build the ten line thing that makes a silent failure speak: three rounds of reasoning about audio session teardown produced nothing, and a twenty line bare camera self test surfaced the real error on its first run. Then run an adversarial pass. A July security review used seven independent review lenses and then had a separate agent try to refute every finding. Eighty raised, twenty-eight survived, fifty-two disproved, and two of the report's own top five turned out to be stale.\n\nThe memory problem was structural. Ten weeks across roughly 120 conversations with a partner that has no continuous memory means every session starts from zero and re-derives context, sometimes incorrectly. My answer was an indexed knowledge base of 145 dated notes, each holding one fact, read at the start of every session. It rotted, and the rot was the instructive part. A July audit cross-checked every falsifiable claim in it against the live repository, database, deployed functions and platform dashboards and found ten that were actively dangerous. One told a future session to send an API version that returns a nonexistent version error. Another sat under a heading reading \"already correct, do not fix\" and was wrong.\n\nTwo pieces of work show what the process is for.\n\nThe first is a rebuild I ordered in one line: captions produced with no outside subscription. Version one was a cloud pipeline that worked end to end by 17 June, cost 20 to 41 cents per finished video, and meant every video a loan officer made passed through two vendors' servers. Between 3 and 6 July I replaced all of it with four hand written Swift modules and on-device speech to text. That is usually described as a cost decision. The more interesting half is product integrity. Captions are now stored as data and burned only at export, and one declarative vocabulary of animation primitives drives both the live preview and the native renderer. One vocabulary, two renderers, no translation layer that can drift. Under the old architecture the vendor's burns were static, so the preview and the export never matched, and that mismatch had been accepted as a known limit.\n\nThe second is three audits I ran in August, and it is the work I would show someone first. By then the product had thirty screens, three live integrations, an admin console and a compliance engine, and it had accumulated the ordinary kind of lies a fast moving product grows. For a product selling audit integrity those are category-defining defects rather than polish. The site audit found ten problems, six of them false claims, and twelve claims that verified as accurate, which mattered as much, because the instinct after finding six false ones is to start deleting. The interface audit found a full scheduling drawer with a month calendar and a confirmation and no worker behind it to fire the rows, and a green Connected pill on a row that could not post. The third found three Settings rows with a press target, a button role, a chevron and a pressed animation, and no action attached. The fix was the obvious one plus a structural one: I had the row component's press handler changed from optional to required, so a future dead row is a compile error rather than a silent defect.\n\nEvery finding came from reading code, not from memory. Three claims I suspected were broken proved correct. Three I did not suspect at all proved false, and those only surfaced because I re-fetched the pages for exact wording rather than working from an earlier summary. Suspicion is not a finding, and a summary is not the source.",
        figures: [
          {
            src: "/work/own-the-script/caption-studio.webp",
            alt: "The caption studio with a live animated preview running on real word timings, and the preset and style controls beside it.",
            width: 1600,
            height: 899,
            caption:
              "Captions are data until export. The same primitives drive this preview and the native renderer, so what you see is what burns. This and every screenshot below is a frame from the Meta App Review screencast, recorded from the Release build on a physical iPhone. Faces are blurred, the interface is not retouched.",
          },
          {
            src: "/work/own-the-script/connected-contradiction.webp",
            alt: "A publishing destination row showing an amber pill reading action needed, in the slot the green Connected pill occupied, with the destination picker beneath it.",
            width: 1600,
            height: 899,
            caption:
              "A green Connected pill on a row that could not post. The fix was a fifth row state in the same geometry, so nothing reflows when the member resolves it.",
          },
        ],
      },
      {
        heading: "Five Approvals, Almost None of It Code",
        body: "Record once, post everywhere is one line on a marketing page. Behind it are five independent corporate approval processes, each with its own vocabulary, its own irreversible decisions and its own way of failing. This was the most calendar-expensive part of the project.\n\nThe first decision took one line, on 27 July: I'm not paying $780 a month for an aggregator. So the app does real OAuth per platform, our own developer apps, our name on every consent screen, zero recurring cost. I evaluated a second aggregator properly after an outside suggestion and rejected it on the merits rather than on price, because it does not skip the platform reviews anyway and it is strictly worse for the stated threat: it puts the same tokens in someone else's database with the key in an environment variable.\n\nOn 28 July I corrected a premise that would otherwise have cost weeks. Nothing has blocked the reviews was true only of one platform's business verification. Three of the four reviews need the working integration built first. One rejects mock screencasts. One wants a recording of the real post sheet. One wants the actual OAuth grant on video with working demo credentials. So the adapter work moved ahead of the reviews rather than after them.\n\nThe most careful work went into a six scope permission request. I was advised to strip a business management scope for least privilege. That advice was wrong and I proved it by measurement rather than by argument: same user, same Page, explicit full access role. With six scopes the API returns the Page and the linked Instagram account. With the same five minus that one, it returns an empty array. A Page owned by a business portfolio is invisible without it, and that is not an edge case in mortgage, because branch and team Pages are routinely business owned. Those loan officers would have been told they administer no Pages, with no way forward.\n\nThe most consequential piece of research in the whole track is about not pressing a button. Publishing an unverified app with a sensitive scope subjects the project to a 100 new user cap that applies for the entire lifetime of the project and cannot be reset. The beta is 20 to 50 loan officers, and publishing early would have spent those slots permanently on people who also see an unverified app warning screen. A second trap sits next to it: a project in Testing status issues refresh tokens that expire in seven days, and the scope this product needs is not in the exempt subset, so every connection would die weekly. That is why one adapter is written, committed, and deliberately not registered.\n\nAll six permissions were approved on 13 August, eight days ahead of my estimate, and the access verification tied to it was confirmed on 18 August. I verified the submitted screencast frame by frame by extracting stills rather than by watching it.",
        figures: [
          {
            src: "/work/own-the-script/publishing.webp",
            alt: "The publishing sheet with three destination rows, each showing its connection state and chosen destination, and a single post action beneath them.",
            width: 1600,
            height: 899,
            caption:
              "One tap, three platforms, our own OAuth on each. The aggregator would have been $780 a month and would not have skipped a single review.",
          },
        ],
      },
      {
        heading: "Where It Stands",
        body: "Own the Script is in App Store review. Working loan officers outside me are using it on TestFlight.\n\nThe core creation flow is built and device verified end to end, from record to published video. Compliance in the frame is built and guaranteed at a single choke point, which is the clearest defensible claim in the product. Platform standing is real: six permissions approved, tech provider status confirmed, one platform self-serve and two more in progress. Governance and admin are built and proven with a live team policy on a device.\n\nThe gaps are real and I would rather name them than list only the wins. There is no billing implementation at all, so the pricing model is locked on paper and the product cannot take a dollar. Android is not shippable, because the caption burn is a 55 line stub blocked on hardware since 3 July. Scheduling has a table and an interface and no worker behind it, so the tile is honestly disabled rather than hopeful. Campaigns, the strongest differentiation play on the backlog, is still a coming soon tab. And there is no attorney sign off on the compliance rules, which is required before launch and has been named as such since version one.\n\nThe gap that bothers me most is the audit trail, because it is the differentiator. Twice in July I hand deleted posts after testing and both times the trail still recorded them as published. It is structural rather than incidental, because every test cycle where the operator cleans up their own feed creates another false record, and on one platform it cannot self heal, because the granted scope has no read side, so the system cannot ask whether a post still exists. Only the member can say. The fix is a member-initiated retract action writing a distinct event. Designed, not built.\n\nTen weeks, one designer, no engineers. The agents wrote thirty-nine thousand lines of TypeScript, sixteen hundred lines of Swift and forty-two server functions. They also confidently reported work as finished that was not, produced a security defect that put live posting credentials in plaintext, wrote a code comment claiming the opposite, recorded a dangerous API version in project memory, and got the direction of the prompter highlight backwards. I caught every one of those by running a verification process I designed on purpose: device tests, adversarial review passes, numerically verified geometry, claim by claim audits against source, and a dated written record with a correction ledger for when the record itself rots.\n\nA partner that will build exactly what it is told needs me to be very good at knowing what to tell it, and better still at proving it did not. That process is the actual design work in an AI-built product, and it is the part that does not transfer to the next tool.",
        figures: [
          {
            src: "/work/own-the-script/live-on-instagram.webp",
            alt: "The finished video playing in the Instagram Reels feed with the burned caption visible.",
            width: 1600,
            height: 899,
            caption:
              "The end of the loop, recorded on a device. Captured, compliance checked, burned and published from one tap.",
          },
        ],
      },
    ],
  },
];
