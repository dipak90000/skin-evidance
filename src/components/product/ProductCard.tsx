import Link from "next/link";
import ProductImage from "./ProductImage";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative overflow-hidden bg-paper-alt">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
            {product.badge}
          </span>
        )}
        <ProductImage
          product={product}
          className="h-72 w-full p-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
        />
      </div>

      <div className="pt-4">
        <h3 className="text-[15px] font-medium">{product.name}</h3>
        <p className="mt-1 text-[13px] text-ink-muted">{product.tagline}</p>

        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-muted">
          <span aria-hidden="true" className="text-accent">
            ★★★★★
          </span>
          <span>({product.reviews})</span>
        </div>

        <p className="mt-2 flex items-baseline gap-2 text-[15px]">
          <span className={product.compareAt ? "text-sale font-medium" : ""}>
            ${product.price}
          </span>
          {product.compareAt && (
            <span className="text-[13px] text-ink-faint line-through">
              ${product.compareAt}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
