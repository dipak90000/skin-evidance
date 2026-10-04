import SkincareScrollExperience from "@/components/hero/SkincareScrollExperience";
import CollectionStrip from "@/components/sections/CollectionStrip";
import CollectionCards from "@/components/sections/CollectionCards";
import ProductRail from "@/components/sections/ProductRail";
import Reviews from "@/components/sections/Reviews";
import ProductCard from "@/components/product/ProductCard";
import { SHOP_ALL } from "@/lib/products";

export default function Home() {
  const trending = SHOP_ALL;

  return (
    <main className="flex-1">
      <SkincareScrollExperience />
      <CollectionStrip />

      <section className="py-16 lg:py-24">
        <div className="u-container">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight">
              Launching first:
              <br />
              <span className="font-serif italic">Evidence-led</span> skincare
            </h2>
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:max-w-3xl">
            {trending.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CollectionCards />
      <Reviews />
      <ProductRail />
    </main>
  );
}
