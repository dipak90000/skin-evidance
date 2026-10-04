/* eslint-disable @next/next/no-img-element --
   Two fixed-size WebP bottles reused across the catalogue. next/image's
   wrapper would fight the absolute label overlay and add nothing: the assets
   are already optimised and dimensioned. */

import type { Product } from "@/lib/products";

/**
 * Product shot.
 *
 * Every SKU is one of the two real brand bottles — the dropper and the tall
 * bottle. The photographed label already carries SKIN EVIDANCE; beneath it sits
 * a block of placeholder text from the original render, so we cover that strip
 * and set the product's own name there instead. The result reads as real
 * packaging: brand above, product below.
 *
 * `nameStrip` is measured from the extracted artwork as a percentage of the
 * image, so the overlay tracks the bottle at any size. `labelInk` is sampled
 * from the label itself so the cover blends.
 */
const BOTTLES = {
  dropper: {
    src: "/products/serum.webp",
    nameStrip: { x: 23, y: 67.5, w: 57, h: 18 },
    tilt: -1.5,
  },
  tall: {
    src: "/products/bottle.webp",
    nameStrip: { x: 9, y: 66, w: 68, h: 18 },
    tilt: 1,
  },
} as const;

/** Sampled from the photographed label so the cover strip disappears into it. */
const LABEL_INK = "#cdcecd";

/** Droppers for serums and ampoules, the tall bottle for everything else. */
export const bottleFor = (form: Product["form"]) =>
  form === "dropper" ? BOTTLES.dropper : BOTTLES.tall;

export default function ProductImage({
  product,
  className = "",
  showLabel = true,
}: {
  product: Product;
  className?: string;
  showLabel?: boolean;
}) {
  const bottle = bottleFor(product.form);
  const s = bottle.nameStrip;

  return (
    <div
      className={`relative ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <img
        src={bottle.src}
        alt={`${product.name} bottle`}
        className="h-full w-full object-contain"
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
          }}
        >
          <span
            className="block w-full px-[6%] font-medium uppercase leading-[1.2] text-[#1d1a16]"
            style={{
              fontSize: "clamp(4px, 2.6cqw, 15px)",
              letterSpacing: "0.03em",
            }}
          >
            {product.name}
          </span>
          <span
            className="mt-[0.3em] block w-full uppercase leading-none text-[#55504a]"
            style={{
              fontSize: "clamp(3px, 1.5cqw, 9px)",
              letterSpacing: "0.14em",
            }}
          >
            {product.size}
          </span>
        </div>
      )}
    </div>
  );
}
