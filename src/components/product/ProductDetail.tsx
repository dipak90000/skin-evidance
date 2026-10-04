"use client";

import { useState } from "react";
import Link from "next/link";
import ProductArt from "./ProductArt";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

/**
 * Product detail, following the reference PDP: media rail on the left, sticky
 * buy column on the right, variant cards, then long-form detail below.
 *
 * This is a design build — "Add to cart" holds local state only, there is no
 * checkout behind it.
 */
export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(0);
  const [tab, setTab] = useState<"ingredients" | "how" | "details">(
    "ingredients",
  );

  const active = product.variants[variant];
  const angles = [0, -8, 8, -4];

  return (
    <main className="flex-1">
      <div className="u-container py-10">
        <nav className="mb-8 text-[12px] text-ink-muted">
          <Link href="/collections/all" className="hover:text-ink">
            Shop All
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/collections/${product.collection}`}
            className="hover:text-ink"
          >
            {product.collection.replace(/-/g, " ")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Media */}
          <div>
            <div
              className="grid aspect-square place-items-center"
              style={{ backgroundColor: `${product.tint}14` }}
            >
              <ProductArt
                form={product.form}
                tint={product.tint}
                sub={active.size}
                className="h-[78%] w-[78%]"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {angles.map((a, i) => (
                <div
                  key={i}
                  className="grid aspect-square place-items-center border border-line bg-paper-alt"
                >
                  <ProductArt
                    form={product.form}
                    tint={product.tint}
                    label=""
                    className="h-[70%] w-[70%]"
                    key={a}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buy column */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-[clamp(1.7rem,3vw,2.3rem)] font-light tracking-tight">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-[13px] text-ink-muted">
              <span className="text-accent" aria-hidden="true">
                ★★★★★
              </span>
              <span>{product.reviews} reviews</span>
            </div>

            <p className="mt-4 text-[15px] text-ink-muted">{product.tagline}</p>

            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-[26px] font-medium text-sale">
                ${active.price}
              </span>
              {product.compareAt && variant === 0 && (
                <span className="text-[16px] text-ink-faint line-through">
                  ${product.compareAt}
                </span>
              )}
            </p>

            {/* Variants */}
            <fieldset className="mt-7">
              <legend className="u-label text-[11px] text-ink-muted">
                Size
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setVariant(i)}
                    aria-pressed={i === variant}
                    className={`border p-4 text-left transition-colors ${
                      i === variant
                        ? "border-ink bg-paper-alt"
                        : "border-line hover:border-ink-faint"
                    }`}
                  >
                    <span className="u-label block text-[10px]">{v.label}</span>
                    <span className="mt-1 block text-[12px] text-ink-muted">
                      {v.size}
                    </span>
                    <span className="mt-2 block text-[14px]">${v.price}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Quantity */}
            <div className="mt-7 flex items-center gap-4">
              <div className="flex items-center border border-line">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-[14px]">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="h-11 w-11 text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-[12px] text-ink-muted">
                ({added} in cart)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setAdded((n) => n + qty)}
              className="u-label mt-6 flex w-full items-center justify-between bg-ink px-7 py-5 text-[11px] text-white transition-colors hover:bg-accent"
            >
              <span>Add To Cart</span>
              <span>${active.price * qty}</span>
            </button>

            <p className="mt-3 text-center text-[11px] text-ink-faint">
              Design preview — no checkout is connected.
            </p>

            <dl className="mt-8 space-y-3 border-t border-line pt-6 text-[13px]">
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-ink-muted">Skin Type</dt>
                <dd>{product.skinType}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-ink-muted">Concerns</dt>
                <dd>{product.concerns.join(", ")}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 shrink-0 text-ink-muted">Size</dt>
                <dd>{active.size}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Long-form detail */}
      <section className="mt-8 border-y border-line bg-paper-alt py-16">
        <div className="u-container">
          <div className="flex gap-8 border-b border-line">
            {(
              [
                ["ingredients", "Key Ingredients"],
                ["how", "How To Use"],
                ["details", "Description"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`u-label -mb-px border-b-2 pb-4 text-[11px] transition-colors ${
                  tab === key
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {tab === "ingredients" && (
              <ul className="grid gap-5 md:grid-cols-3">
                {product.keyIngredients.map((ing) => (
                  <li key={ing.name} className="border-l-2 border-accent pl-4">
                    <p className="text-[15px]">{ing.name}</p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {ing.role}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {tab === "how" && (
              <ol className="max-w-xl space-y-3">
                {product.howToUse.map((step, i) => (
                  <li key={step} className="flex gap-4 text-[14px]">
                    <span className="u-label text-[11px] text-ink-faint">
                      0{i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {tab === "details" && (
              <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16">
          <div className="u-container">
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-light tracking-tight">
              Complete the <span className="font-serif italic">routine</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
