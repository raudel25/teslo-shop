"use client";

import { ProductInOrder } from "@/components";
import { cartStore } from "@/store";

export const ProductsInCheckout = () => {
  const { products } = cartStore();
  return (
    <>
      {products.map((p, idx) => (
        <ProductInOrder key={idx} p={p} />
      ))}
    </>
  );
};
