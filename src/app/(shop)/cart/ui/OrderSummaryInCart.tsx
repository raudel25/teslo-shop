"use client";

import { OrderSummary } from "@/components";
import { cartStore } from "@/store";

export const OrderSummaryInCart = () => {
  const { products } = cartStore();
  return <OrderSummary products={products} />;
};
