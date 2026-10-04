import BottleArt from "./BottleArt";
import type { Product } from "@/lib/products";

/**
 * Product shot for a catalogue entry.
 *
 * Every SKU is one of the two real brand bottles. The photographed label
 * already carries SKIN EVIDANCE; beneath it sits placeholder text from the
 * original render, which BottleArt covers with the product's own name — brand
 * above, product below, as real packaging does.
 */
export default function ProductImage({
  product,
  className = "",
  showLabel = true,
}: {
  product: Product;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <BottleArt
      form={product.form}
      name={product.name}
      sub={product.size}
      showLabel={showLabel}
      className={className}
    />
  );
}
