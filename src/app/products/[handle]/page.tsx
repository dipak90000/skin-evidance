import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { PRODUCTS, SHOP_ALL, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const p = getProduct(handle);
  return {
    title: p ? `${p.name} — Skin Evidance` : "Product — Skin Evidance",
    description: p?.tagline,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = SHOP_ALL.filter(
    (p) => p.handle !== product.handle && p.collection === product.collection,
  )
    .concat(SHOP_ALL.filter((p) => p.collection !== product.collection))
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
