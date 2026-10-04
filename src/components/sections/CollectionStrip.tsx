import Link from "next/link";
import ProductArt from "@/components/product/ProductArt";
import { COLLECTIONS, productsIn } from "@/lib/products";

/**
 * Horizontal strip of shop entry points, mirroring the reference's icon rail —
 * but products and lines only. No Store Guide, Subscribe, How To Use, Device
 * or App entries.
 */
export default function CollectionStrip() {
  const items = [
    { href: "/collections/all", title: "Shop All", tint: "#15120e" },
    ...COLLECTIONS.map((c) => ({
      href: `/collections/${c.handle}`,
      title: c.title,
      tint: c.tint,
    })),
  ];

  return (
    <section className="border-b border-line bg-paper py-10">
      <div className="u-scroll-x">
        <ul className="mx-auto flex w-max gap-7 px-6 lg:px-10">
          {items.map((item, i) => {
            const sample = i === 0 ? null : productsIn(
              COLLECTIONS[i - 1].handle,
            )[0];
            return (
              <li key={item.href} className="w-[104px] shrink-0">
                <Link href={item.href} className="group block text-center">
                  <div className="grid h-[104px] w-[104px] place-items-center rounded-2xl bg-paper-alt transition-colors duration-300 group-hover:bg-[#ececec]">
                    {sample ? (
                      <ProductArt
                        form={sample.form}
                        tint={item.tint}
                        label=""
                        className="h-[82px] w-[82px] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                      />
                    ) : (
                      <span className="space-y-[6px]" aria-hidden="true">
                        <span className="block h-[2px] w-8 bg-ink" />
                        <span className="block h-[2px] w-8 bg-ink" />
                        <span className="block h-[2px] w-8 bg-ink" />
                      </span>
                    )}
                  </div>
                  <p className="u-label mt-3 text-[10px] leading-tight">
                    {item.title}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
