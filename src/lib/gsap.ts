"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register client-side only. registerPlugin is idempotent, so importing this
// module anywhere in a client component is enough to make ScrollTrigger available.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
