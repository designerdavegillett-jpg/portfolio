import { caseStudies, selectedWork } from "@/content/case-studies";
import WorkCard from "@/components/WorkCard";
import ScrollCue from "@/components/ScrollCue";
import LogoStrip from "@/components/LogoStrip";
import { splitWords } from "@/lib/type";
import { SITE_URL } from "@/lib/site";

/* The intro, split so the role can carry the emphasis. */
const HERO_LEAD = "Hey there, I'm a ";
const HERO_ROLE = "senior product designer";
const HERO_REST =
  ". I design platforms that take complex systems and turn them into intuitive, user-centric applications. I use AI hand in hand with my work to improve the process, not to replace the experience behind great product design.";

/* The identity of the site, in the form a search engine can resolve. This is
   what ties "Dave Gillett" the string to a person with a role and a body of
   work, and it is the anchor every case study's author field points back to. */
const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Dave Gillett",
      jobTitle: "Senior Product Designer",
      url: SITE_URL,
      email: "mailto:designerdavegillett@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      knowsAbout: [
        "Product Design",
        "User Experience Design",
        "Design Systems",
        "Interaction Design",
        "Information Architecture",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dave Gillett",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD).replace(/</g, "\\u003c") }}
      />

      {/* HERO: status and past companies on top, name and intro below. */}
      <div className="hero hero2" id="top">
        <div className="hero2-top">
          <div className="hero2-status reveal">
            <div className="hero2-h">
              Open to work <i className="hero2-dot" aria-hidden="true" />
            </div>
            <p>Senior product design roles and consulting, remote or in Seattle.</p>
            <a href="#contact" data-contact-open className="underline-link">
              Get in touch <span className="arrow">↗</span>
            </a>
          </div>
          <div className="hero2-past reveal" style={{ "--d": ".15s" } as React.CSSProperties}>
            <div className="hero2-h">Previous Work</div>
            <LogoStrip />
          </div>
        </div>

        <div className="hero2-main">
          <h1 className="display hero2-name">{splitWords("Dave Gillett")}</h1>
          <div className="hero2-intro reveal" style={{ "--d": ".5s" } as React.CSSProperties}>
            <p>{HERO_LEAD}<strong>{HERO_ROLE}</strong>{HERO_REST}</p>
          </div>
        </div>
        <ScrollCue />
      </div>

      {/* WORK */}
      <section className="section" id="work">
        <div className="rail">
          <h2 className="label reveal">Selected Work</h2>
        </div>
        <div className="cards">
          {caseStudies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* ALSO */}
      {selectedWork.length > 0 && (
      <section className="section" id="more">
        <div className="rail">
          <h2 className="label reveal">Also</h2>
        </div>
        <div style={{ paddingBottom: "5rem" }}>
          <div className="lines">
            {selectedWork.map((item, i) => {
              const inner = (
                <>
                  <span className="display d-sm">{item.name}:</span>
                  <span className="body-lg">{item.note}</span>
                  {item.href ? <span className="arrow">→</span> : <span className="soon">In progress</span>}
                </>
              );
              const style = { "--d": `${i * 0.08}s` } as React.CSSProperties;
              return item.href ? (
                <a key={item.name} href={item.href} className="reveal" style={style}>
                  {inner}
                </a>
              ) : (
                <div key={item.name} className="reveal" style={style}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
