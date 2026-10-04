"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import ProductImage from "@/components/product/ProductImage";
import CircleButton from "@/components/ui/CircleButton";
import { gsap } from "@/lib/gsap";
import { SHOP_ALL } from "@/lib/products";

/**
 * "Upcoming Products" — a rail that travels right to left continuously, on its
 * own, and that you can grab and throw.
 *
 * The product set is repeated enough times to overflow the viewport, and the
 * offset wraps on the width of a single set, so the loop is seamless and there
 * is no snap at the end. Dragging adds to the same offset; on release the
 * drift carries on from wherever you left it, keeping any throw velocity.
 */
const REPEATS = 8;

export default function ProductRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const setWidth = useRef(0);
  const velocity = useRef(0);
  const drag = useRef({ active: false, lastX: 0, moved: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const paint = () => {
      const w = setWidth.current;
      if (w) track.style.transform = `translate3d(${offset.current - w}px, 0, 0)`;
    };
    const measure = () => {
      setWidth.current = set.offsetWidth;
      paint();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(set);

    const SPEED = 42; // px per second, right to left

    const tick = (_t: number, delta: number) => {
      const w = setWidth.current;
      if (!w) return;

      if (!drag.current.active) {
        // Constant drift, plus whatever throw velocity is still decaying.
        offset.current -= (SPEED * delta) / 1000;
        offset.current += velocity.current * (delta / 1000);
        velocity.current *= 0.94;
        if (Math.abs(velocity.current) < 1) velocity.current = 0;
      }

      // Wrap on one set width so the loop never reaches an edge.
      offset.current = ((offset.current % w) + w) % w;
      track.style.transform = `translate3d(${offset.current - w}px, 0, 0)`;
    };

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return () => ro.disconnect();
    }

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [prefersReduced]);

  /* ---------------------------------------------------------------- drag */

  const onPointerDown = (e: React.PointerEvent) => {
    if (prefersReduced) return;
    drag.current = { active: true, lastX: e.clientX, moved: 0 };
    velocity.current = 0;
    setGrabbing(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.lastX;
    d.lastX = e.clientX;
    d.moved += Math.abs(dx);
    offset.current += dx;
    // Remember the throw so releasing carries momentum.
    velocity.current = dx * 55;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setGrabbing(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const sets = Array.from({ length: REPEATS });

  return (
    <section className="overflow-hidden bg-rose py-16 lg:py-24">
      <h2 className="pointer-events-none select-none text-center font-serif text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-tight text-ink">
        Upcoming Products
      </h2>

      <div
        className={`mt-12 touch-pan-y ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {sets.map((_, s) => (
            <div
              key={s}
              ref={s === 0 ? setRef : undefined}
              className="flex gap-4 pr-4"
              aria-hidden={s > 0}
            >
              {SHOP_ALL.map((p) => (
                <Link
                  key={`${s}-${p.handle}`}
                  href={`/products/${p.handle}`}
                  draggable={false}
                  tabIndex={s > 0 ? -1 : undefined}
                  onClick={(e) => {
                    // A grab that travelled is a drag, not a click.
                    if (drag.current.moved > 6) e.preventDefault();
                  }}
                  className="group block w-[240px] shrink-0 select-none rounded-t-full bg-paper pb-7 pt-10 transition-colors hover:bg-white sm:w-[280px]"
                >
                  <ProductImage
                    product={p}
                    className="mx-auto h-60 w-full px-10 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                  />
                  <div className="px-6 pt-5 text-center">
                    <p className="text-[14px] font-medium">{p.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                      Coming soon
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <CircleButton href="/collections/all" label="View all" />
      </div>
    </section>
  );
}
