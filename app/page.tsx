import { caseStudies, selectedWork } from "@/content/case-studies";
import WorkCard from "@/components/WorkCard";
import ScrollCue from "@/components/ScrollCue";
import { splitWords } from "@/lib/type";
import { SITE_URL } from "@/lib/site";

const HERO =
  "I've spent sixteen years designing the systems people work inside — building teams from the ground up, most recently shipping *twenty-six releases* across eight modules, and now using AI to move faster without moving anyone out of the room.";

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

      {/* HERO */}
      <div className="hero" id="top">
        <div className="hero-inner">
          <h1 className="display d-xl">{splitWords(HERO)}</h1>
          <div className="hero-foot reveal" style={{ "--d": ".9s" } as React.CSSProperties}>
            <span className="label">Senior Product Designer · Seattle</span>
            <span className="label">Product · UX · Design Systems</span>
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
      <section className="section" id="more">
        <div className="rail">
          <h2 className="label reveal">Also</h2>
        </div>
        <div style={{ paddingBottom: "5rem" }}>
          <div className="lines">
            {selectedWork.map((item, i) => {
              const inner = (
                <>
                  <span className="display d-md">{item.name}:</span>
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
    </>
  );
}
