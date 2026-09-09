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
`content/case-studies/types.ts`, and everything in `app/`, `components/`, `lib/`.

**The design lock is lifted (2026-09-02).** The earlier rule said the design and motion system was
finished and locked, and that chats add content rather than layout systems. Dave has explicitly
retired that: structural redesign is now permitted at will, including the sizing engine, the type
scale, the rail/section grid, the motion primitives, and the component structure. The content rules
and voice rules below are NOT lifted and still bind.

## Hard rules for anything that goes on the site

- **Never invent a metric.** Efficiently instrumented nothing. Measure scope and complexity instead.
- **Check shipped versus built.** Own the Script is **in App Store review**, not shipped (Dave
  confirmed 2026-09-09). The 2026-08-24 note calling it shipped was wrong and the headline that said
  "concept to App Store" has been corrected to "concept to App Store review in ten weeks". Do not
  reintroduce either. Real loan officers outside Dave ARE using it on TestFlight, which retires the
  old "no loan officer outside me has used this product" line; that line is gone. No count or
  feedback has been supplied, so do not write one.
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
- **Type scale.** `d-xl` / `d-lg` / `d-md` / `d-sm` sit on one 1.25 ratio (2.656 / 2.125 / 1.7 /
  1.36rem) with line-height and tracking tuned per step. Do not add a size outside the scale; add a
  step if you genuinely need one.
- **Space scale.** `--s1` through `--s8` (0.4rem up by 1.5 each). Use these for structural spacing
  rather than raw rem, so vertical rhythm stays a system. The s4 to s5 step is 1.481 rather than
  1.5, because 1.35 x 1.5 is 2.025 and Dave chose round numbers (2 / 3 / 4.5 / 6.75) over exact
  ratio (2.025 / 3.038 / 4.556 / 6.834). Deliberate. Do not "fix" it.
- **Measures.** `--measure` (34rem) is the prose default, `--measure-wide` (44rem) the opened-up one.
- **Section layouts.** A case study section takes an optional `layout` of `"default" | "wide" |
  "full" | "two-col"`, and an optional `figuresFirst: true` to lead with its images. Default stays
  the 34rem measure. `two-col` collapses to one column under 900px.
- **The rail.** `components/RailIndex.tsx` is the sticky section index on case studies. It replaced
  `Spine.tsx` (deleted 2026-09-02), which navigated the same sections from a floating strip at the
  right edge while the left rail sat empty at `height: 0`.
- Section images: add `figures: [{ src, alt, caption?, size? }]` next to `heading` and `body`. Files
  live in `public/work/<slug>/`. `size: "text"` holds an image to the prose measure.
- **Case study shape (set 2026-09-02).** Every case study follows problem, solution, process, result.
  Headings are named for their specific content and fall in that order; they are not literally
  called "Problem" and "Solution". Target 1,800 to 2,500 words. Efficiently sits at 2,906 and
  Passport at 1,471, both accepted deliberately: Passport was not padded to reach the floor because
  the facts to fill it do not exist.
- **No outlines on imagery (2026-09-07).** The inset hairline on `.thumb` and the 1px border on
  `.figure img` were both removed at Dave's request. Do not reintroduce a frame around images.
- **`transparent: true`** on a thumbnail or a figure drops the grey plate and switches the thumbnail
  to `object-fit: contain`, for artwork with a knocked-out background and a soft shadow. This
  replaced three filename-matching CSS hacks; do not add another `img[src$="..."]` rule.
- **Clips.** A figure with `clip: "/work/<slug>/x.mp4"` renders `components/Clip.tsx` instead of an
  image, using `src` as the poster. For UI recordings use h264, not GIF or animated WebP: the
  Passport bottom nav was 1,988 KB as a GIF and 329 KB as h264 at twice the resolution. Clip decides
  whether to show controls from what the element is actually doing, never from whether `play()`
  resolved, because that promise never settles in a background tab.
- **Image pipeline.** Ship WebP at 1600px wide, quality 82 to 86. That covers the largest place a
  figure renders (832 CSS px) at 2x. Lossy WebP shifts a flat fill by about 1/255, so a background
  meant to match `--paper` will read 246,245,248 against 245,245,247. That is invisible; going
  lossless to fix it costs 5x the bytes and is not worth it.
- Verify with `npx tsc --noEmit` before committing. Live target is Nifli.design, static export to
  Cloudflare.

## Current status, 2026-09-09

| Case study | Sections | Words | Figures | On the arc |
|---|---|---|---|---|
| Efficiently (`design-finish-selection`) | 11 | 2,906 | 20 | yes |
| Passport (`passport-unlimited-mobile`) | 9 | 1,471 | 13 | yes |
| Own the Script (`own-the-script`) | 7 | 3,362 | 8 | yes |

**Own the Script was restructured on 2026-09-09.** It went from 18 sections and 8,545 words to 7
sections and 3,362 words on the problem/solution/process/result arc, keeping all 8 figures. The cut
material was build log detail and is intentionally gone; the previous version is in git history.
Both former blockers are cleared: the status is corrected to App Store review with TestFlight users,
and the four largest PNGs were converted to WebP at 1600px q84 (1,836 KiB down to 176 KiB).

It sits at 3,362 words against the 1,800 to 2,500 target and above Efficiently's 2,906. That is not
yet accepted, unlike the other two overruns; Dave has been told and a further pass is offered.

Also open: the Passport hero renders at 1664 device px on retina but its source only supplies about
730, so it is soft. Dave tried an AI upscale on 2026-09-07; it rewrote the interface text into
nonsense ("Hawaiian Airlines" became "Marvaltan dutdoes") and was rejected. The fix is a real 2x
export from the original design file, not an upscale.

The earlier deploy blocker is cleared: `/resume` and `public/Dave-Gillett-Resume.pdf` both exist.

Cross-chat state lives in the claude.ai project doc `claude/UNIFIED-PROJECT-STATE.md`. It is the
only state doc; edit it rather than starting another.

**Never run git through the Claude device bridge.** It creates a `.git/index.lock` it cannot remove
and wedges the repo. Dave runs git and wrangler in his own Terminal.
