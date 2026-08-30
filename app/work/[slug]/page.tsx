import { caseStudies } from "@/content/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import Thumb from "@/components/Thumb";
import Spine from "@/components/Spine";
import { splitWords } from "@/lib/type";
import type { Metadata } from "next";

/**
 * Serialise structured data for a <script> tag. A "<" anywhere in a case
 * study's prose would otherwise be able to close the tag early and break the
 * page, so escape it at the boundary rather than trusting the content.
 */
function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Slugify a section heading into a stable anchor id. */
function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  /* Search engines cut the description around 155 characters. `summary` is
     written for the card, not for a SERP, so prefer an explicit short one. */
  const description = study.seoDescription ?? study.summary;
  const image = study.image?.src;

  return {
    title: study.title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} — Dave Gillett`,
      description,
      url: `/work/${study.slug}`,
      /* Falls back to the site-wide app/opengraph-image.png when a study has
         no thumbnail of its own. */
      ...(image ? { images: [{ url: image, alt: study.image!.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Dave Gillett`,
      description,
      ...(image ? { images: [image] } : {}),
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

  /* Structured data. This is what lets a search engine understand the page as
     a piece of authored work rather than a wall of text, and it drives the
     breadcrumb trail shown under the result. Rendered as a plain script tag
     because it must be in the static HTML, not injected after hydration. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://nifli.design/work/${study.slug}#article`,
        headline: study.title,
        description: study.seoDescription ?? study.summary,
        about: study.tags,
        articleSection: study.sections.map((s) => s.heading),
        inLanguage: "en-US",
        ...(study.updated ? { dateModified: study.updated } : {}),
        ...(study.image
          ? { image: [`https://nifli.design${study.image.src}`] }
          : {}),
        author: {
          "@type": "Person",
          name: "Dave Gillett",
          jobTitle: "Senior Product Designer",
          url: "https://nifli.design",
        },
        publisher: {
          "@type": "Person",
          name: "Dave Gillett",
          url: "https://nifli.design",
        },
        mainEntityOfPage: `https://nifli.design/work/${study.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://nifli.design" },
          { "@type": "ListItem", position: 2, name: "Work", item: "https://nifli.design/work" },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `https://nifli.design/work/${study.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <Spine
        items={study.sections.map((section) => ({
          id: headingId(section.heading),
          name: section.heading,
        }))}
      />

      <div className="page">
        <Link href="/work" className="label underline-link">
          ← Work
        </Link>

        {/* The project name. Without this the page never states what it is
            called anywhere in the body, which costs the entity its strongest
            on-page signal and makes the h1 read as a headline about nothing. */}
        <p className="label" style={{ marginTop: "2.4rem" }}>
          {study.title}
        </p>

        <h1 className="display d-xl" style={{ maxWidth: "42rem", marginTop: ".7rem" }}>
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
          {/* The largest above-the-fold element on this page, so it is the one
              image that loads eagerly. Everything below stays lazy. */}
          <Thumb kind={study.visual} image={study.image} priority />
        </div>
      </div>

      <div style={{ padding: "5rem var(--gutter) 0" }}>
        {study.sections.map((section) => (
          <div className="split" id={headingId(section.heading)} key={section.heading}>
            {/* A real h2, not a styled div. `.label` sets font-size and weight
                explicitly, so class beats the UA default and this renders
                pixel-identically to what it replaced. */}
            <h2 className="label reveal">{section.heading}</h2>
            <div className="prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
              {section.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {section.figures && section.figures.length > 0 && (
                <div className="figures">
                  {section.figures.map((fig) => (
                    <figure
                      key={fig.src}
                      className={fig.size === "text" ? "figure text" : "figure"}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fig.src}
                        alt={fig.alt}
                        width={fig.width}
                        height={fig.height}
                        loading="lazy"
                        decoding="async"
                      />
                      {fig.caption && <figcaption>{fig.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="split">
          <h2 className="label reveal">Tags</h2>
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
