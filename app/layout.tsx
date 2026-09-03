import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteBanner from "@/components/SiteBanner";
import MotionLayer from "@/components/MotionLayer";
import LocalTime from "@/components/LocalTime";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

/* Display face. Fraunces is variable — no `weight`, so the whole axis is
   available and `font-optical-sizing: auto` handles the rest. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/* Résumé face. The résumé page is the one surface that has to match the PDF a
   recruiter downloads, so it keeps Geist rather than the site body face. */
const geist = Geist({ subsets: ["latin"], variable: "--font-resume", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-resume-mono", display: "swap" });

const interTight = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const DESCRIPTION =
  "Sixteen years designing the systems people work inside. Product design, UX, and design systems. Seattle, WA.";

export const metadata: Metadata = {
  /* Makes every relative URL below resolve against the live domain — including
     the auto-detected app/opengraph-image.png. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dave Gillett — Senior Product Designer",
    template: "%s — Dave Gillett",
  },
  description: DESCRIPTION,
  authors: [{ name: "Dave Gillett" }],
  creator: "Dave Gillett",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Dave Gillett",
    title: "Dave Gillett — Senior Product Designer",
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dave Gillett — Senior Product Designer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <SiteBanner />
        <SiteHeader />
        <MotionLayer />

        <main>{children}</main>

        <footer className="site-footer">
          <div className="label">Dave Gillett</div>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/work" className="meta">
              Work
            </Link>
            <Link href="/about" className="meta">
              About
            </Link>
            <Link href="/resume" className="meta">
              Résumé
            </Link>
            <a href="mailto:designerdavegillett@gmail.com" className="meta">
              Email
            </a>
          </nav>
          <div style={{ textAlign: "right" }}>
            <div className="meta">
              Seattle, WA · <LocalTime />
            </div>
            <div className="meta" style={{ marginTop: ".3rem" }}>
              © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
