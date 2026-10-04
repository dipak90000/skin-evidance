"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";

/** Auto-rotating announcement strip, matching the reference's top bar. */
export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const items = SITE.announcements;

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative z-50 h-9 overflow-hidden bg-[#1c1c1c] text-white">
      <div className="u-container flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="u-label text-[11px] text-center"
          >
            {items[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
