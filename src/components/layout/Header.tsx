"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeaderActions from "./HeaderActions";
import { NAV, SITE } from "@/lib/site";

/**
 * Sticky header that hides on scroll down and reveals on scroll up —
 * the behavior of the reference's `sticky-header` element.
 */
export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 8);
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        solid
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="u-container flex h-16 items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Mobile menu */}
        <button
          aria-label="Open menu"
          className="-ml-2 grid h-9 w-9 shrink-0 place-items-center lg:hidden"
        >
          <span className="space-y-[5px]">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </span>
        </button>

        {/* Wordmark */}
        <Link href="/" className="min-w-0 shrink-0 leading-none">
          <span className="block whitespace-nowrap text-[14px] font-extrabold tracking-[0.02em] sm:text-[17px]">
            {SITE.name}
          </span>
          <span className="mt-[3px] block whitespace-nowrap text-[7px] font-semibold tracking-[0.2em] text-ink-muted sm:text-[8px] sm:tracking-[0.34em]">
            {SITE.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`u-label relative text-[12px] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
                    item.accent ? "text-accent" : "text-ink hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Utility icons */}
        <HeaderActions />
      </div>
    </motion.header>
  );
}
