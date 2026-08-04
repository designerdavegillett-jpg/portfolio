# Dave Gillett — Portfolio

Next.js 16 · React 19 · Tailwind v4 · deployed to **nifli.design**

```bash
npm run dev     # http://localhost:3000
npm run build   # production build — run before deploying
```

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | The entire design system — sizing engine, type scale, motion, layout |
| `components/MotionLayer.tsx` | All motion, in one client component mounted once in the root layout |
| `lib/type.tsx` | `splitWords()` and `emphasize()` — headline splitting and `*italic*` markup |
| `content/case-studies/` | All content. One file per body of work |

## The sizing engine

```css
html { font-size: clamp(11.5px, 1.058vw, 19px); }  /* 16px at a 1512px viewport */
```

Every dimension in the site is a multiple of that root unit, so the page scales as a
single object instead of snapping between breakpoints. There is exactly **one**
structural breakpoint (900px), and it only changes layout — never size.

`globals.css` is plain CSS after the Tailwind import, so it wins the cascade
(unlayered beats layered). Don't wrap it in `@layer`.

## Motion

`MotionLayer` mounts once and owns everything. Server components opt in:

```jsx
<div className="reveal" style={{ "--d": ".12s" }}>   {/* --d is the stagger delay */}
```

No wrapper components, no `"use client"` in page files. `prefers-reduced-motion` is
handled globally. `types/css.d.ts` lets `--d` through without a cast.

Headlines use `*asterisks*` for italic runs. `splitWords()` splits them into per-word
spans **on the server**, so there's no hydration mismatch and no flash of unsplit text.

## Content

```
content/case-studies/
  types.ts            CaseStudy + SelectedItem shapes
  efficiently.ts      Efficiently, 2020–2026
  passport.ts         Passport Unlimited, 2010–2020
  own-the-script.ts   Own the Script
  index.ts            display order + the "Also" rows
```

Each file is owned by one workstream, so parallel work doesn't collide. Add a study to
its own file; only reorder in `index.ts`. A new entry automatically gets a card, a
detail page, a static route, and a sitemap entry.

**Own the Script has zero users.** Never "shipped", "launched", or "in production".

## Placeholder art

`components/Thumb.tsx` holds abstract SVGs (`canvas` / `system` / `dark` / `neutral`).
Swap the `<svg>` for `<Image>` when real screenshots exist — nothing else changes.

## Metadata

`metadataBase` in `app/layout.tsx` is set to `https://nifli.design`. Change it there if
the domain moves; `robots.ts` and `sitemap.ts` have the same URL hardcoded.

`app/opengraph-image.png` is a static file that Next picks up automatically for both
Open Graph and Twitter cards. To regenerate it, rebuild the 1200×630 image and drop it
in place.
