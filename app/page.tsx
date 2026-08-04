import { caseStudies, selectedWork } from "@/content/case-studies";
import WorkCard from "@/components/WorkCard";
import Spine from "@/components/Spine";
import { splitWords } from "@/lib/type";

const HERO =
  "Dave Gillett spent sixteen years designing the systems people work inside — *eight modules*, twenty-six releases, and one honest lesson about the limits of adding more.";

export default function Home() {
  return (
    <>
      <Spine
        items={[
          { id: "top", name: "Intro" },
          { id: "work", name: "Work" },
          { id: "more", name: "Selected" },
        ]}
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
        <div className="scroll-cue reveal" style={{ "--d": "1.2s" } as React.CSSProperties}>
          Scroll <i />
        </div>
      </div>

      {/* WORK */}
      <section className="section" id="work">
        <div className="rail">
          <div className="label reveal">Selected Work</div>
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
          <div className="label reveal">Also</div>
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
