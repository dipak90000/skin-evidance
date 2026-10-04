"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { HERO_FRAMES, SITE } from "@/lib/site";
import { gsap } from "@/lib/gsap";

/**
 * Scroll-driven hero.
 *
 * The brand animation plays back as a decoded frame sequence painted to a
 * canvas, with the frame index bound directly to scroll progress. Scrolling up
 * reverses it exactly and the composition is deterministic at any offset.
 * Frames are drawn from refs inside rAF, so scrolling never re-renders React.
 *
 * The source frames are 16:9. On desktop the canvas fills the viewport. On
 * phones it gets its own band in the upper half — cover-fitting 16:9 into a
 * full-height portrait viewport would crop away most of the composition — and
 * the copy sits underneath it.
 */
export default function SkincareScrollExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrame = useRef(0);
  const paintRef = useRef<((i: number) => void) | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value a little so frame stepping never stutters.
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    mass: 0.4,
    restDelta: 0.0005,
  });

  /* ---------------------------------------------------------------- load */

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const src = isMobile ? HERO_FRAMES.mobile : HERO_FRAMES.desktop;
    const total = HERO_FRAMES.count;
    const images: HTMLImageElement[] = new Array(total);
    let done = 0;
    let cancelled = false;

    const settle = (index: number) => {
      if (cancelled) return;
      done += 1;
      setLoaded(done);
      // Repaint if the frame that just arrived is the one we want on screen.
      if (index === currentFrame.current) paintRef.current?.(index);
      if (done === 1) setReady(true);
    };

    for (let i = 0; i < total; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = src(i);
      img.onload = () => settle(i);
      img.onerror = () => settle(i);
      images[i] = img;
    }

    framesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------------------------------------- paint */

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const decoded = (i: number) => {
      const f = framesRef.current[i];
      return f && f.complete && f.naturalWidth > 0 ? f : null;
    };

    /** Nearest decoded frame, so a still-loading index never stalls the scene. */
    const nearest = (index: number) => {
      const total = framesRef.current.length;
      for (let d = 0; d < total; d += 1) {
        const hit = decoded(index - d) ?? decoded(index + d);
        if (hit) return hit;
      }
      return null;
    };

    const paint = (index: number) => {
      const img = decoded(index) ?? nearest(index);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover fit, centred on a focal point expressed in image space. On
      // narrow boxes we centre on the bottles, which sit right of middle in
      // the source composition, then clamp so no empty edge is ever exposed.
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const focalX = cw / ch < 1.2 ? 0.62 : 0.5;

      const dx = Math.min(0, Math.max(cw - dw, cw / 2 - focalX * dw));
      const dy = Math.min(0, Math.max(ch - dh, (ch - dh) / 2));

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      if (w === 0 || h === 0) return;
      sizeRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      paint(currentFrame.current);
    };

    const request = (index: number) => {
      currentFrame.current = index;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        paint(currentFrame.current);
      });
    };

    paintRef.current = request;
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      paintRef.current = null;
    };
  }, [ready]);

  useMotionValueEvent(progress, "change", (v) => {
    const total = HERO_FRAMES.count;
    const index = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    paintRef.current?.(index);
  });

  // Reduced motion: hold the final composition, no scrubbing.
  useEffect(() => {
    if (prefersReduced && ready) paintRef.current?.(HERO_FRAMES.count - 1);
  }, [prefersReduced, ready]);

  /* ---------------------------------------------------------- idle float */

  /**
   * A very gentle drift so the scene never sits dead still. Runs on GSAP's
   * ticker independently of scroll and only touches a CSS transform, so it
   * costs no repaints and never fights the frame scrubbing.
   *
   * Set FLOAT to 0 for a completely static scene.
   */
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const FLOAT = 1;

    const tick = (time: number) => {
      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const ampX = w * 0.0022 * FLOAT;
      const ampY = h * 0.006 * FLOAT;

      const x =
        Math.sin(time * 0.45) * ampX + Math.sin(time * 0.19) * ampX * 0.4;
      const y =
        Math.cos(time * 0.37) * ampY + Math.sin(time * 0.14) * ampY * 0.3;
      const rot = Math.sin(time * 0.26) * 0.12 * FLOAT;

      // The overscale lives in CSS `scale`, a separate property, so pausing
      // the ticker (hidden tab) can never collapse the frame back to 1x.
      canvas.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
        2,
      )}px, 0) rotate(${rot.toFixed(3)}deg)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      canvas.style.transform = "";
    };
  }, [prefersReduced]);

  /* -------------------------------------------------------------- overlay */

  const copyOpacity = useTransform(scrollYProgress, [0, 0.42, 0.62], [1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.62], [0, -70]);
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.75],
    [0.45, 0.32, 0.1],
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const pct = Math.round((loaded / HERO_FRAMES.count) * 100);

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-[#1b1510]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1b1510] md:bg-[#cdc3b4]">
        {/* Scene: a band on phones, the full viewport from md up */}
        <div className="absolute inset-x-0 top-0 h-[48vh] overflow-hidden md:inset-0 md:h-full">
          <canvas
            ref={canvasRef}
            className="block h-full w-full scale-[1.07] will-change-transform"
            aria-hidden="true"
          />
        </div>

        {/* Readability scrim — bottom-up on phones, left-to-right on desktop */}
        <motion.div
          style={{ opacity: scrimOpacity }}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#17120d] via-[#17120d]/10 to-transparent md:bg-gradient-to-r md:via-[#17120d]/20"
        />

        {/* Loading state */}
        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-[#1b1510] md:bg-[#cdc3b4]">
            <p className="u-label text-[11px] text-white/60 md:text-[#5a5046]">
              {SITE.name} — {pct}%
            </p>
          </div>
        )}

        {/* Hero copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[48vh] flex items-center md:inset-0 md:top-0"
        >
          <div className="u-container">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="u-label text-[11px] text-white/70"
              >
                {SITE.tagline}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.96] tracking-[-0.03em] text-white"
              >
                Skin Evidance
                <span className="mt-2 block font-serif italic font-normal">
                  proof, not promises.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75"
              >
                Clinically tested serums and body care, formulated around
                actives that earn their place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto mt-8"
              >
                <Link
                  href="/collections/all"
                  className="u-label inline-flex items-center gap-3 bg-white px-8 py-4 text-[11px] text-ink transition-colors hover:bg-accent hover:text-white"
                >
                  Shop Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="u-label text-[9px] text-white/60">Scroll</span>
            <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
