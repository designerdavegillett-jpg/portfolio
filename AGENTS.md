<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Read this before working on the portfolio

This project is worked on across several parallel chats. Context lives in four places and they are
not synced. Orient yourself before touching anything.

1. **`case-studies/MEMORY-efficiently-2026-08-11.md`** (this repo, gitignored). Long-form notes from
   a voice interview that desktop project memory could not save: the Efficiently item ID model, the
   unit/room/space/area hierarchy, the density-ceiling material, the client portal, Dave's admitted
   mistakes, and the handling rules for sensitive material. **If desktop memory is working, move
   this into `case-study-product-book.md` in project memory and delete the file.**
2. **Desktop project memory** (`project_memory_read`). Topic files: `portfolio-workstreams`,
   `dave-resume-facts`, `portfolio-design-system`, `portfolio-privacy-audit`,
   `case-study-product-book`, `own-the-script`, `job-app`, `job-boards`. Read
   `portfolio-workstreams` first. If it errors with "not associated with a project on this device,"
   memory is down: write findings to this repo instead of losing them.
3. **The claude.ai project doc `claude/UNIFIED-PROJECT-STATE.md`** in the "Nifli and App WEBSITES"
   project. Cross-chat state and current status. It is the only state doc; edit it, don't add another.
4. Whatever the chat you are in already knows.

## File ownership

Three chats run in parallel, one per body of work.

| Chat | Owns |
|---|---|
| Efficiently | `content/case-studies/efficiently.ts` |
| Passport | `content/case-studies/passport.ts` |
| Own the Script | `content/case-studies/own-the-script.ts` |

Do not edit another lane's file. Shared and needing coordination: `content/case-studies/index.ts`,
`content/case-studies/types.ts`, and everything in `app/`, `components/`, `lib/`. The design and
motion system is finished and locked — chats add content, not layout systems.

## Hard rules for anything that goes on the site

- **Never invent a metric.** Efficiently instrumented nothing. Measure scope and complexity instead.
- **Check shipped versus built.** Own the Script **is shipped** (Dave confirmed 2026-08-24); the
  older "zero users, never say shipped" rule is retired, but the body copy in
  `own-the-script.ts` still contradicts this in its Honest Scorecard section and needs reconciling.
  The Efficiently AI selection prototype never shipped; permitted verbs there are designed, built,
  prototyped.
- **Describe the structure, never the people.** No former colleague identifiable. Never name the
  Efficiently CEO. Never frame a setback as someone else's fault, including through neutral phrasing
  a reader would decode as blame.
- No dollar figures on the Passport consulting arrangement.

## Dave's voice rules

- **No em dashes, no en dashes.** Plain hyphen. He asked for this explicitly.
- **No three-beat AI closers.** He named "That's the real truth. Hard. Honest." as the trope to
  avoid. Don't end sections on pronouncements.
- First person, plain, human, interested in the work. No design-speak unless it's the right word.
- Ask one specific question, stop, let him answer at length by voice. His long unstructured answers
  are better than anything drafted for him.

## Conventions

- Headline strings use `*asterisks*` for italic runs (`lib/type.tsx`).
- Reveal animation is opt-in with `className="reveal"`, optional `style={{ "--d": ".12s" }}`.
- Section images: add `figures: [{ src, alt, caption?, size? }]` next to `heading` and `body`. Files
  live in `public/work/<slug>/`. `size: "text"` holds an image to the prose measure.
- Verify with `npx tsc --noEmit` before committing. Live target is Nifli.design, static export to
  Cloudflare.

## Current status, 2026-08-28

Three case studies build: `design-finish-selection` (Efficiently), `own-the-script`,
`passport-unlimited-mobile`. Cross-chat state lives in the claude.ai project doc
`claude/UNIFIED-PROJECT-STATE.md`. It is the only state doc; edit it rather than starting another.

Known gap before any production deploy to nifli.design: the live Astro site serves `/resume` and
`/dave-gillett-resume.pdf`, and neither exists in this repo. Deploying to production without them
turns both into 404s. See `claude/nifli-nextjs-portfolio-deploy.md` in the project.

**Never run git through the Claude device bridge.** It creates a `.git/index.lock` it cannot remove
and wedges the repo. Dave runs git and wrangler in his own Terminal.
