import { caseStudies } from "@/content/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import Thumb from "@/components/Thumb";
import { splitWords } from "@/lib/type";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} — Dave Gillett`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <div className="page">
        <Link href="/work" className="label underline-link">
          ← Work
        </Link>

        <h1 className="display d-xl" style={{ maxWidth: "42rem", marginTop: "2.4rem" }}>
          {splitWords(study.headline ?? study.title)}
        </h1>

        <div
          className="reveal"
          style={{ "--d": ".5s", marginTop: "2.4rem", maxWidth: "36rem" } as React.CSSProperties}
        >
          <p className="body-lg">{study.summary}</p>
        </div>

        <div
          className="card-facts reveal"
          style={{ "--d": ".6s", marginTop: "2rem" } as React.CSSProperties}
        >
          <span>{study.role}</span>
          <span>{study.team}</span>
          <span>{study.platform}</span>
          <span>{study.year}</span>
        </div>

        <div style={{ marginTop: "3rem", maxWidth: "52rem" }}>
          <Thumb kind={study.visual} tag={study.status} />
        </div>
      </div>

      <div style={{ padding: "5rem var(--gutter) 0" }}>
        {study.sections.map((section) => (
          <div className="split" key={section.heading}>
            <div className="label reveal">{section.heading}</div>
            <div className="prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
              {section.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="split">
          <div className="label reveal">Tags</div>
          <div
            className="reveal"
            style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}
          >
            {study.tags.map((tag) => (
              <span key={tag} className="meta">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
