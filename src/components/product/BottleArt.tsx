/* eslint-disable @next/next/no-img-element --
   Two fixed-size WebP bottles, already optimised and dimensioned. */

import type { ProductForm } from "@/lib/products";

/**
 * A brand bottle with an arbitrary name on the label.
 *
 * ProductImage does this for catalogue entries; this takes a plain name, so
 * roadmap items that have no product record yet can still be shown on the
 * right bottle.
 */
export const BOTTLES = {
  dropper: {
    src: "/products/serum.webp",
    w: 728,
    h: 1200,
    nameStrip: { x: 23, y: 67.5, w: 57, h: 18 },
    tilt: -1.5,
  },
  tall: {
    src: "/products/bottle.webp",
    w: 686,
    h: 1200,
    nameStrip: { x: 9, y: 66, w: 68, h: 18 },
    tilt: 1,
  },
} as const;

/** Sampled from the photographed label so the cover strip disappears into it. */
export const LABEL_INK = "#cdcecd";

/** Droppers for serums and gels, the tall bottle for everything else. */
export const bottleFor = (form: ProductForm) =>
  form === "dropper" ? BOTTLES.dropper : BOTTLES.tall;

export default function BottleArt({
  form,
  name,
  sub,
  className = "",
  showLabel = true,
}: {
  form: ProductForm;
  name: string;
  sub?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const bottle = bottleFor(form);
  const s = bottle.nameStrip;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* The overlay is positioned in percentages of the bottle, so the box it
          sits in has to be the bottle's own aspect ratio. Letting the image
          letterbox inside a differently-shaped container would slide the label
          off the glass. */}
      <div
        className="relative h-full"
        style={{ aspectRatio: `${bottle.w} / ${bottle.h}`, maxWidth: "100%" }}
      >
        <img
          src={bottle.src}
          alt={`${name} bottle`}
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />

        {showLabel && (
          <div
            className="pointer-events-none absolute flex flex-col items-center justify-center overflow-hidden text-center"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.w}%`,
              height: `${s.h}%`,
              backgroundColor: LABEL_INK,
              transform: `rotate(${bottle.tilt}deg)`,
              containerType: "inline-size",
            }}
          >
            <span
              className="block w-full px-[6%] font-medium uppercase leading-[1.15] text-[#1d1a16]"
              style={{ fontSize: "clamp(5px, 10cqw, 16px)", letterSpacing: "0.02em" }}
            >
              {name}
            </span>
            {sub && (
              <span
                className="mt-[0.3em] block w-full uppercase leading-none text-[#55504a]"
                style={{ fontSize: "clamp(3px, 6cqw, 10px)", letterSpacing: "0.12em" }}
              >
                {sub}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
