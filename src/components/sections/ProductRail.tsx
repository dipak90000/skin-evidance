"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ProductArt from "@/components/product/ProductArt";
import { SHOP_ALL } from "@/lib/products";

/**
 * "Our Products" — a horizontal rail of arch cards that travels right to left
 * as you scroll past the section, and that you can also grab and drag
 * sideways.
 *
 * Both inputs feed one offset: scroll progress maps to a base translation, and
 * dragging adds to it. The sum runs through a spring so a flick settles
 * smoothly instead of stopping dead, and so scroll and drag never fight.
 */
export default function ProductRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const prefersReduced = useReducedMotion();

  const drag = useMotionValue(0);
  const dragState = useRef({ active: false, startX: 0, startValue: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll drives the base sweep; the spring keeps drag and scroll blended.
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -1]);
  const combined = useMotionValue(0);
  const x = useSpring(combined, {
    stiffness: 140,
    damping: 26,
    mass: 0.5,
    restDelta: 0.2,
  });

  const recompute = () => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    // How far the track must move for its last card to reach the left edge.
    setTravel(Math.max(0, track.scrollWidth - section.clientWidth + 48));
  };

  useEffect(() => {
    recompute();
    const ro = new ResizeObserver(recompute);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  const sync = () => {
    const base = scrollX.get() * travel;
    const next = base + drag.get();
    // Never let the rail pull past either end.
    combined.set(Math.min(0, Math.max(-travel, next)));
  };

  useMotionValueEvent(scrollX, "change", sync);
  useMotionValueEvent(drag, "change", sync);
  useEffect(sync, [travel]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------------------------------------------------------------- drag */

  const onPointerDown = (e: React.PointerEvent) => {
    if (prefersReduced) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      startValue: drag.get(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s.active) return;
    drag.set(s.startValue + (e.clientX - s.startX) * 1.15);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    // Clamp the stored drag so it cannot accumulate beyond the usable range.
    const base = scrollX.get() * travel;
    drag.set(Math.min(-base, Math.max(-travel - base, drag.get())));
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] bg-[#e8cfc9]"
      aria-label="Our products"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 className="pointer-events-none select-none text-center font-serif text-[clamp(2.6rem,8vw,6rem)] font-normal leading-none tracking-tight text-ink">
          Our Products
        </h2>

        <div
          className="mt-8 cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 px-6 will-change-transform"
          >
            {SHOP_ALL.map((p) => (
              <Link
                key={p.handle}
                href={`/products/${p.handle}`}
                draggable={false}
                onClick={(e) => {
                  // A drag that moved should not also open the product.
                  if (dragState.current.active) e.preventDefault();
                }}
                className="group block w-[230px] shrink-0 select-none rounded-t-full bg-[#fdfaf4] pb-6 pt-10 transition-colors hover:bg-white sm:w-[270px]"
              >
                <ProductArt
                  form={p.form}
                  tint={p.tint}
                  sub={p.size}
                  className="mx-auto h-56 w-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <div className="px-6 pt-4 text-center">
                  <p className="text-[13px] font-medium">{p.name}</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">
                    ${p.price}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/collections/all"
            className="group inline-flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="text-[15px]">View all</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
