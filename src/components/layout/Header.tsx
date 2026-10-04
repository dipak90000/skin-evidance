"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 place-items-center transition-opacity hover:opacity-60 sm:h-10 sm:w-10"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px] sm:h-5 sm:w-5"
      >
        <path d={d} />
      </svg>
    </button>
  );
}

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
        <div className="ml-auto flex shrink-0 items-center lg:ml-0">
          <Icon label="Search" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />
          <Icon
            label="Cart"
            d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6ZM3 6h18M16 10a4 4 0 0 1-8 0"
          />
          <Icon
            label="Account"
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          />
        </div>
      </div>
    </motion.header>
  );
}
