"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${stuck ? " stuck" : ""}`}>
      <Link href="/" className="wordmark">
        Dave Gillett
      </Link>

      <nav className="site-nav">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} data-active={pathname.startsWith(href)}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-right">
        <a href="mailto:designerdavegillett@gmail.com">Email</a>
        <a
          href="https://www.linkedin.com/in/david-gillett-847507135/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
