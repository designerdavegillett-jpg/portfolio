import { caseStudies } from "@/content/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import Thumb from "@/components/Thumb";
import RailIndex from "@/components/RailIndex";
import Clip from "@/components/Clip";
import { splitWords } from "@/lib/type";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import CaptureAnatomy from "@/components/CaptureAnatomy";
import ComplianceStates from "@/components/ComplianceStates";

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
      title: `${study.title} · Dave Gillett`,
      description,
      url: `/work/${study.slug}`,
      /* Falls back to the site-wide app/opengraph-image.png when a study has
         no thumbnail of its own. */
      ...(image ? { images: [{ url: image, alt: study.image!.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} · Dave Gillett`,
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
        "@id": `${SITE_URL}/work/${study.slug}#article`,
        headline: study.title,
        description: study.seoDescription ?? study.summary,
        about: study.tags,
        articleSection: study.sections.map((s) => s.heading),
        inLanguage: "en-US",
        ...(study.updated ? { dateModified: study.updated } : {}),
        ...(study.image
          ? { image: [`${SITE_URL}${study.image.src}`] }
          : {}),
        author: {
          "@type": "Person",
          name: "Dave Gillett",
          jobTitle: "Senior Product Designer",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Dave Gillett",
          url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/work/${study.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `${SITE_URL}/work/${study.slug}`,
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

      <div className="page">
        <Link href="/work" className="label underline-link">
          ← Work
        </Link>

        {/* The project name is the h1. `headline` is a card device (its own type
            comment calls it "Card headline") and every headline now opens with
            the project name, so running it here printed the name twice in a row:
            once as a label, once at the head of the h1 under it. The name alone
            is also the stronger on-page signal, and the summary directly below
            does the explaining the headline used to do. */}
        <h1 className="display d-xl" style={{ maxWidth: "42rem", marginTop: "var(--s6)" }}>
          {splitWords(study.title)}
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

      {/* One rail for the whole document, carrying the section index, rather
          than a rail column repeated empty beside every section. */}
      <div className="cs-body">
        <aside className="rail">
          <RailIndex
            label="Contents"
            items={study.sections.map((section) => ({
              id: headingId(section.heading),
              name: section.heading,
            }))}
          />
        </aside>

        <div className="cs-sections">
          {study.sections.map((section) => (
            <section
              className="cs-section"
              id={headingId(section.heading)}
              data-layout={section.layout ?? "default"}
              key={section.heading}
            >
              {/* A real heading at a real size. This used to be a `.label`,
                  which made every section title the same weight as a caption
                  and left the page without internal hierarchy. */}
              <h2 className="display d-sm cs-h reveal">{section.heading}</h2>

              <div className="prose reveal" style={{ "--d": ".08s" } as React.CSSProperties}>
                {section.interactive === "capture-anatomy" && <CaptureAnatomy />}
                {section.interactive === "compliance-states" && <ComplianceStates />}
                {section.figures && section.figures.length > 0 && (
                  <div className="figures">
                    {section.figures.map((fig) => (
                      <figure
                        key={fig.src}
                        className={fig.size === "text" ? "figure text" : "figure"}
                        data-transparent={fig.transparent ? "true" : undefined}
                      >
                        {fig.clip ? (
                          <Clip src={fig.clip} poster={fig.src} alt={fig.alt} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={fig.src}
                            alt={fig.alt}
                            width={fig.width}
                            height={fig.height}
                            loading="lazy"
                            decoding="async"
                          />
                        )}

                {section.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                        {fig.caption && <figcaption>{fig.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="cs-section">
            {/* A colophon, not a section: it is not in the rail index, so it should
                not carry a section heading's size either. */}
            <h2 className="label reveal">Tags</h2>
            <div
              className="reveal"
              style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap" }}
            >
              {study.tags.map((tag) => (
                <span key={tag} className="meta">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
