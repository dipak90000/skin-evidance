"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Segment } from "@/lib/products";

/**
 * The sub-categories inside a range.
 *
 * Opening one slides its panel down; none of them have stock yet, so the panel
 * says so plainly rather than dropping the visitor onto an empty grid. The
 * disc-and-arrow motion matches the site's other actions.
 */
export default function SegmentList({
  segments,
  tint,
}: {
  segments: Segment[];
  tint: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="border-t border-line">
      {segments.map((seg, i) => {
        const isOpen = open === seg.slug;
        return (
          <motion.li
            key={seg.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-b border-line"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : seg.slug)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className="font-serif text-[13px] text-ink-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(1.1rem,2.4vw,1.7rem)] font-light tracking-tight transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2">
                  {seg.title}
                </span>
              </span>

              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-ink">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-0"
                  style={{ backgroundColor: tint }}
                />
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-4 w-4 text-paper transition-colors duration-500 group-hover:text-ink"
                >
                  <path d="M12 5v14M5 12h14" />
                </motion.svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-10 pr-4">
                    <p className="font-serif text-[clamp(1.2rem,3vw,1.9rem)] italic">
                      Products will come soon.
                    </p>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
                      {seg.title} formulas are in development. Tell us what you
                      need and we will let you know the week they land.
                    </p>
                    <a
                      href="/contact"
                      className="u-label mt-6 inline-block border-b border-ink pb-1 text-[11px] transition-colors hover:border-accent hover:text-accent"
                    >
                      Get notified
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
