"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";

export type CartLine = {
  /** handle + variant label, so two sizes of one product stay separate */
  id: string;
  handle: string;
  name: string;
  form: Product["form"];
  variant: string;
  size: string;
  price: number;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: Product, variantIndex: number, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

/**
 * Cart state for the preview build.
 *
 * Kept in memory only — there is no checkout behind it, and persisting a bag
 * that can never be ordered would be misleading rather than helpful.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback(
    (product: Product, variantIndex: number, qty: number) => {
      const v = product.variants[variantIndex] ?? product.variants[0];
      const id = `${product.handle}::${v.label}`;
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) {
          return prev.map((l) =>
            l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l,
          );
        }
        return [
          ...prev,
          {
            id,
            handle: product.handle,
            name: product.name,
            form: product.form,
            variant: v.label,
            size: v.size,
            price: v.price,
            qty,
          },
        ];
      });
    },
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
