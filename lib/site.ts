/**
 * One place the canonical origin is written down.
 *
 * It used to live in five files — metadataBase, robots, sitemap, and the JSON-LD
 * blocks on the home and case-study pages — and moving from nifli.design to
 * portfolio.nifli.design meant finding fifteen string literals. Import this
 * instead; changing the domain is now a one-line edit.
 *
 * No trailing slash: everything below concatenates onto it.
 */
export const SITE_URL = "https://portfolio.nifli.design";

/** Absolute URL for a site-relative path. `url("/work")` → https://…/work */
export const url = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
