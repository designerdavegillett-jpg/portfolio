export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

const BASE = "https://nifli.design";

export default function sitemap(): MetadataRoute.Sitemap {
  /* Build date is the honest answer for pages whose content is generated from
     the case study files at build time. Individual studies override it with
     their own `updated` date when they carry one. */
  const built = new Date();

  return [
    { url: BASE, priority: 1, lastModified: built, changeFrequency: "monthly" as const },
    { url: `${BASE}/work`, priority: 0.8, lastModified: built, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`, priority: 0.6, lastModified: built, changeFrequency: "yearly" as const },
    { url: `${BASE}/resume`, priority: 0.7, lastModified: built, changeFrequency: "monthly" as const },
    ...caseStudies.map((s) => ({
      url: `${BASE}/work/${s.slug}`,
      priority: 0.9,
      lastModified: s.updated ? new Date(s.updated) : built,
      changeFrequency: "yearly" as const,
    })),
  ];
}
