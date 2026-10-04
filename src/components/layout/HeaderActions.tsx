"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import BottleArt from "@/components/product/BottleArt";
import ProductImage from "@/components/product/ProductImage";
import { useCart } from "@/components/cart/CartProvider";
import { SHOP_ALL, UPCOMING, formatPrice } from "@/lib/products";

/**
 * Search, cart and account.
 *
 * This is a design build with no backend, so the cart holds items in local
 * state and the account panel explains that sign-in is not connected yet
 * rather than pretending to authenticate.
 */
type Panel = "search" | "cart" | "account" | null;

const ICONS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
  cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6ZM3 6h18M16 10a4 4 0 0 1-8 0",
  account: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
};

/** Declared at module scope: a component defined inside render is recreated
    on every pass, which resets anything it holds. */
function Icon({
  id,
  label,
  active,
  onClick,
}: {
  id: keyof typeof ICONS;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={active}
      onClick={onClick}
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
        <path d={ICONS[id]} />
      </svg>
    </button>
  );
}

export default function HeaderActions() {
  const [panel, setPanel] = useState<Panel>(null);
  const cart = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (panel === "search") inputRef.current?.focus();
  }, [panel]);

  const q = query.trim().toLowerCase();
  const hits = q
    ? SHOP_ALL.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.concerns.some((c) => c.toLowerCase().includes(q)),
      )
    : SHOP_ALL;
  const soonHits = q
    ? UPCOMING.filter((u) => u.name.toLowerCase().includes(q))
    : [];

  return (
    <>
      <div className="ml-auto flex shrink-0 items-center lg:ml-0">
        <Icon
          id="search"
          label="Search"
          active={panel === "search"}
          onClick={() => setPanel((p) => (p === "search" ? null : "search"))}
        />
        <span className="relative">
          <Icon
            id="cart"
            label="Cart"
            active={panel === "cart"}
            onClick={() => setPanel((p) => (p === "cart" ? null : "cart"))}
          />
          {cart.count > 0 && (
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold text-paper">
              {cart.count}
            </span>
          )}
        </span>
        <Icon
          id="account"
          label="Account"
          active={panel === "account"}
          onClick={() => setPanel((p) => (p === "account" ? null : "account"))}
        />
      </div>

      <AnimatePresence>
        {panel && (
          <>
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanel(null)}
              className="fixed inset-0 z-40 cursor-default bg-ink/40"
            />

            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-0 z-50 max-h-[85vh] overflow-y-auto border-b border-line bg-paper"
            >
              <div className="u-container py-8">
                <div className="mb-6 flex items-center justify-between">
                  <p className="u-label text-[11px]">
                    {panel === "search"
                      ? "Search"
                      : panel === "cart"
                        ? "Your bag"
                        : "Account"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPanel(null)}
                    className="u-label text-[11px] underline underline-offset-4"
                  >
                    Close
                  </button>
                </div>

                {panel === "search" && (
                  <div>
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products and concerns…"
                      className="w-full border-b border-ink bg-transparent pb-4 text-[clamp(1.2rem,3vw,1.8rem)] outline-none placeholder:text-ink-faint"
                    />

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {hits.map((p) => (
                        <Link
                          key={p.handle}
                          href={`/products/${p.handle}`}
                          onClick={() => setPanel(null)}
                          className="group flex items-center gap-4"
                        >
                          <ProductImage
                            product={p}
                            showLabel={false}
                            className="h-20 w-16 shrink-0 bg-paper-alt"
                          />
                          <span>
                            <span className="block text-[14px]">{p.name}</span>
                            <span className="block text-[12px] text-ink-muted">
                              {formatPrice(p.price)}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    {soonHits.length > 0 && (
                      <p className="mt-6 text-[13px] text-ink-muted">
                        Also in development:{" "}
                        {soonHits.map((u) => u.name).join(", ")}
                      </p>
                    )}

                    {hits.length === 0 && soonHits.length === 0 && (
                      <p className="mt-8 text-[14px] text-ink-muted">
                        Nothing matches “{query}”. Try a concern like “dark
                        spots”.
                      </p>
                    )}
                  </div>
                )}

                {panel === "cart" &&
                  (cart.lines.length === 0 ? (
                    <div className="py-6 text-center">
                      <p className="font-serif text-[1.8rem]">
                        Your bag is empty
                      </p>
                      <p className="mx-auto mt-3 max-w-sm text-[14px] text-ink-muted">
                        Add a product and it will show up here.
                      </p>
                      <Link
                        href="/collections/all"
                        onClick={() => setPanel(null)}
                        className="u-label mt-6 inline-block bg-ink px-8 py-4 text-[11px] text-paper transition-colors hover:bg-accent"
                      >
                        Browse products
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <ul className="divide-y divide-line">
                        {cart.lines.map((l) => (
                          <li key={l.id} className="flex items-center gap-5 py-5">
                            <BottleArt
                              form={l.form}
                              name={l.name}
                              showLabel={false}
                              className="h-20 w-14 shrink-0 bg-paper-alt"
                            />
                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/products/${l.handle}`}
                                onClick={() => setPanel(null)}
                                className="block text-[15px] hover:underline"
                              >
                                {l.name}
                              </Link>
                              <p className="mt-0.5 text-[12px] text-ink-muted">
                                {l.variant} · {l.size}
                              </p>
                              <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center border border-line">
                                  <button
                                    type="button"
                                    aria-label={`Decrease ${l.name}`}
                                    onClick={() => cart.setQty(l.id, l.qty - 1)}
                                    className="h-8 w-8"
                                  >
                                    −
                                  </button>
                                  <span className="w-7 text-center text-[13px]">
                                    {l.qty}
                                  </span>
                                  <button
                                    type="button"
                                    aria-label={`Increase ${l.name}`}
                                    onClick={() => cart.setQty(l.id, l.qty + 1)}
                                    className="h-8 w-8"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => cart.remove(l.id)}
                                  className="text-[12px] text-ink-muted underline underline-offset-4 hover:text-ink"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <p className="shrink-0 text-[15px]">
                              {formatPrice(l.price * l.qty)}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
                        <span className="u-label text-[11px]">Subtotal</span>
                        <span className="text-[20px]">
                          {formatPrice(cart.total)}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled
                        className="u-label mt-5 w-full bg-ink px-8 py-5 text-[11px] text-paper opacity-50"
                      >
                        Checkout unavailable in preview
                      </button>
                    </div>
                  ))}

                {panel === "account" && (
                  <div className="mx-auto max-w-sm py-6 text-center">
                    <p className="font-serif text-[1.8rem]">Please log in</p>
                    <p className="mt-3 text-[14px] text-ink-muted">
                      Accounts are not connected on this preview — signing in
                      will work once a backend is wired up.
                    </p>

                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="mt-6 space-y-3 text-left"
                    >
                      <input
                        type="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        className="w-full border border-line bg-paper-alt px-5 py-4 text-[14px] outline-none focus:border-ink"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        className="w-full border border-line bg-paper-alt px-5 py-4 text-[14px] outline-none focus:border-ink"
                      />
                      <button
                        type="submit"
                        disabled
                        className="u-label w-full bg-ink px-8 py-4 text-[11px] text-paper opacity-50"
                      >
                        Log in
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
