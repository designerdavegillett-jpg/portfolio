import { caseStudies } from "@/content/case-studies";
import WorkCard from "@/components/WorkCard";
import { splitWords } from "@/lib/type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product design work — interaction models, design systems, and the judgment calls behind them.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <div className="page">
        <h1 className="display d-xl" style={{ maxWidth: "44rem" }}>
          {splitWords("Sixteen years of product design, *end to end*.")}
        </h1>
      </div>

      <section className="section" style={{ marginTop: "5rem" }}>
        <div className="rail">
          <h2 className="label reveal">All Work</h2>
        </div>
        <div className="cards">
          {caseStudies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </>
  );
}
