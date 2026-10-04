import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import SegmentList from "@/components/sections/SegmentList";
import {
  COLLECTIONS,
  SHOP_ALL,
  getCollection,
  productsIn,
} from "@/lib/products";

export function generateStaticParams() {
  return [
    { handle: "all" },
    { handle: "best-sellers" },
    ...COLLECTIONS.map((c) => ({ handle: c.handle })),
  ];
}

export async function generateMetadata({ params }: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const c = getCollection(handle);
  const title =
    handle === "all"
      ? "Shop All"
      : handle === "best-sellers"
        ? "Best Sellers"
        : (c?.title ?? "Collection");
  return { title: `${title} — Skin Evidance` };
}

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[handle]">) {
  const { handle } = await params;

  const special =
    handle === "all"
      ? { title: "Shop All", concern: "Every product, in stock now" }
      : handle === "best-sellers"
        ? { title: "Best Sellers", concern: "What our customers reorder most" }
        : null;

  const collection = getCollection(handle);
  if (!special && !collection) notFound();

  const products =
    handle === "all"
      ? SHOP_ALL
      : handle === "best-sellers"
        ? SHOP_ALL.filter((p) => p.badge === "BEST" || p.reviews > 200)
        : productsIn(handle);

  const title = special?.title ?? collection!.title;
  const concern = special?.concern ?? collection!.concern;

  return (
    <main className="flex-1">
      <header
        className="py-16 lg:py-20"
        style={{ backgroundColor: collection?.wash ?? "#f6f6f6" }}
      >
        <div className="u-container">
          <p className="u-label text-[11px] text-ink-muted">{concern}</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-light tracking-tight">
            {title}
          </h1>
          {collection && (
            <p className="mt-4 max-w-md text-[14px] text-ink-muted">
              {collection.blurb}
            </p>
          )}
        </div>
      </header>

      <section className="py-12 lg:py-16">
        <div className="u-container">
          {products.length > 0 && (
            <p className="u-label mb-8 text-[11px] text-ink-muted">
              {products.length} product{products.length === 1 ? "" : "s"}
            </p>
          )}

          {collection && collection.segments.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-6 text-[clamp(1.2rem,2.6vw,1.8rem)] font-light tracking-tight">
                Browse <span className="font-serif italic">{title}</span>
              </h2>
              <SegmentList
                segments={collection.segments}
                tint={collection.tint}
              />
            </div>
          )}

          {products.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-muted">
              No products in this range yet — open a category above to be
              notified first.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
