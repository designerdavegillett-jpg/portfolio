import { splitWords } from "@/lib/type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dave Gillett — Senior Product Designer in Seattle. Sixteen years designing the systems people work inside.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="page">
        <h1 className="display d-xl" style={{ maxWidth: "48rem" }}>
          {splitWords(
            "I came to product design from street work and corporate marketing — obsessed with why people behave *predictably* in some contexts and surprise you in others.",
          )}
        </h1>
      </div>

      <section className="section" style={{ marginTop: "5rem" }}>
        <div className="rail">
          <div className="label reveal">About</div>
        </div>

        <div className="about-grid" style={{ paddingBottom: "4rem" }}>
          <div className="prose">
            <p className="reveal">
              I&apos;m a Senior Product Designer in Seattle. Sixteen years designing the
              systems people work inside — most recently a construction-tech platform
              where I owned UI and UX across eight modules and twenty-six-plus releases,
              directing a team of nine.
            </p>
            <p className="reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
              Before that, benefits software reaching over 500,000 employees across 80+
              enterprise clients, and a retail CRM that was adopted across Seattle-area
              locations before the company was acquired.
            </p>
            <p className="reveal" style={{ "--d": ".16s" } as React.CSSProperties}>
              I&apos;m most useful where the problem is structural — where the interface is
              fine but the model underneath it isn&apos;t, and someone has to decide what the
              product should stop doing.
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

          <div className="sidelist reveal" style={{ "--d": ".14s" } as React.CSSProperties}>
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
              <li>Efficiently, 2020–2026</li>
              <li>Passport Unlimited</li>
              <li>Soro Software</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
