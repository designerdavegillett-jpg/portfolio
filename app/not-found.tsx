import Link from "next/link";
import type { Metadata } from "next";
import { splitWords } from "@/lib/type";

/* Static export writes this out as out/404.html, which Cloudflare Pages serves
   for any path that has no file. Without it a missing route got Cloudflare's
   own bare 404 page, outside the site's type system and with no way back in. */
export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export default function NotFound() {
  return (
    <div className="page" style={{ minHeight: "70svh" }}>
      <span className="label">404</span>

      <h1
        className="display d-xl"
        style={{ maxWidth: "44rem", marginTop: "var(--s6)" }}
      >
        {splitWords("Nothing lives at this address. *The work* is one link away.")}
      </h1>

      <div
        className="reveal"
        style={{ "--d": ".5s", marginTop: "2.4rem", maxWidth: "36rem" } as React.CSSProperties}
      >
        <p className="body-lg">
          Either the page moved or the address has a typo in it. Everything on
          the site is reachable from here.
        </p>
      </div>

      <nav
        className="reveal"
        aria-label="Site sections"
        style={{ "--d": ".6s", marginTop: "var(--s5)", display: "flex", gap: "2.5rem", flexWrap: "wrap" } as React.CSSProperties}
      >
        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="label underline-link">
            {label} <span className="arrow">→</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
