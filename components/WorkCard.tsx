import Link from "next/link";
import Thumb from "./Thumb";
import { emphasize } from "@/lib/type";
import type { CaseStudy } from "@/content/case-studies";

export default function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link className="card" href={`/work/${study.slug}`}>
      <div className="card-text">
        <div className="card-head reveal">
          <h3 className="display d-lg">
            {emphasize(study.headline ?? study.title)}
            <span className="arrow">→</span>
          </h3>
        </div>

        <div className="card-body reveal" style={{ "--d": ".12s" } as React.CSSProperties}>
          <p>{study.summary}</p>
          <div className="card-facts">
            <span>{study.platform}</span>
            <span>{study.role}</span>
            <span>{study.year}</span>
          </div>
        </div>
      </div>

      <Thumb kind={study.visual} image={study.image} />
    </Link>
  );
}
