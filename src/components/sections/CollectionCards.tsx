import Link from "next/link";
import ProductArt from "@/components/product/ProductArt";
import { COLLECTIONS, productsIn } from "@/lib/products";

/**
 * The reference's collection row: a lead card carrying the claim and a VIEW ALL
 * button, followed by one card per line showing that line's products grouped on
 * a tinted shelf.
 */
export default function CollectionCards() {
  const cards = COLLECTIONS.slice(0, 3);

  return (
    <section className="bg-paper py-16 lg:py-24">
      <div className="u-container">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Lead card */}
          <div className="flex min-h-[420px] flex-col justify-between bg-gradient-to-br from-[#f3dfe4] to-[#e7cdd4] p-8">
            <h2 className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-light leading-[1.18] tracking-tight">
              All our <span className="font-serif italic">skincare</span> is
              <br />
              100% dermatologist
              <br />
              tested.
            </h2>
            <Link
              href="/collections/all"
              className="u-label mt-8 block bg-ink py-4 text-center text-[11px] text-white transition-colors hover:bg-accent"
            >
              View All
            </Link>
          </div>

          {/* One card per line */}
          {cards.map((c) => {
            const items = productsIn(c.handle).slice(0, 3);
            return (
              <div
                key={c.handle}
                className="flex min-h-[420px] flex-col border border-line bg-paper-alt"
              >
                <div className="px-6 pt-7">
                  <p className="text-[12px] text-ink-muted">{c.concern}</p>
                  <h3 className="mt-1 text-[22px] font-medium tracking-tight">
                    {c.title}
                  </h3>
                </div>

                <div
                  className="relative mt-4 flex flex-1 items-end justify-center gap-1 px-4 pb-4"
                  style={{ backgroundColor: c.wash }}
                >
                  {items.map((p, i) => (
                    <ProductArt
                      key={p.handle}
                      form={p.form}
                      tint={p.tint}
                      label=""
                      className={`w-1/3 ${
                        i === 1 ? "h-44" : "h-36"
                      } drop-shadow-sm`}
                    />
                  ))}
                </div>

                <div className="p-4">
                  <Link
                    href={`/collections/${c.handle}`}
                    className="u-label block py-3.5 text-center text-[11px] transition-colors"
                    style={{ backgroundColor: c.wash }}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
