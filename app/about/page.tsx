import { splitWords } from "@/lib/type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dave Gillett, Senior Product Designer in Seattle. Sixteen years designing the systems people work inside.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="page about-center">
        <h1 className="display d-xl" style={{ maxWidth: "48rem" }}>
          {splitWords(
            "I came to product design from street work and corporate marketing, obsessed with why people behave *predictably* in some contexts and surprise you in others.",
          )}
        </h1>
      </div>

      <section className="section about-center" style={{ marginTop: "5rem" }}>
        <div className="rail">
          <div className="sidelist rail-side reveal" style={{ "--d": ".14s" } as React.CSSProperties}>
            <img
              className="about-photo"
              src="/about/dave-portrait.webp"
              width={656}
              height={954}
              alt="Dave Gillett in his studio"
            />
            <h4>Practice</h4>
            <ul>
              <li>Product Design</li>
              <li>Design Systems</li>
              <li>Interaction Design</li>
              <li>Design Direction</li>
              <li>Prototyping in code</li>
            </ul>
            <h4>Recently</h4>
            <ul>
              <li>Efficiently, 2020-2026</li>
              <li>Passport Unlimited</li>
              <li>Soro Software</li>
            </ul>
            </div>
        </div>

        <div style={{ paddingBottom: "4rem" }}>
          <div className="prose">
            <p className="reveal">
              Hey there, I&apos;m Dave Gillett, a senior product designer in Seattle. I design
              platforms that take complex systems and turn them into intuitive, user-centric
              applications. I use AI hand in hand with my work to improve the process, not to
              replace the experience behind great product design.
            </p>
            <p className="reveal" style={{ "--d": ".04s" } as React.CSSProperties}>
              Most recently I designed a construction-tech platform where I owned UI and UX
              across eight modules and twenty-six-plus releases, directing a team of nine.
            </p>
            <p className="reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
              Before that I designed benefits software reaching over 500,000 employees across 80+
              enterprise clients, and a sales CRM for a startup that was acquired
              within about a year of leaving beta.
            </p>
            <p className="reveal" style={{ "--d": ".24s" } as React.CSSProperties}>
              <a
                href="mailto:designerdavegillett@gmail.com"
                className="underline-link"
              >
                designerdavegillett@gmail.com <span className="arrow">→</span>
              </a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
