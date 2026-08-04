import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

const BASE = "https://nifli.design";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/work`, priority: 0.8 },
    { url: `${BASE}/about`, priority: 0.6 },
    ...caseStudies.map((s) => ({
      url: `${BASE}/work/${s.slug}`,
      priority: 0.9,
    })),
  ];
}
