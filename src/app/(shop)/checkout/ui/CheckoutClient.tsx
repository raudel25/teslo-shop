"use client";

import { createOrder } from "@/actions/order/createOrder";
import { DeliveryAddressSummary, OrderSummary } from "@/components";
import { Country } from "@/interfaces";
import { addressStore, cartStore } from "@/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  countries: Country[];
}

export const CheckoutClient = ({ countries }: Props) => {
  const router = useRouter();
  const { address } = addressStore();
  const { products, clearCart } = cartStore();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const session = useSession({ required: true });

  const submitOrder = async () => {
    setError("");
    setLoading(true);
    const response = await createOrder(
      session.data?.user.id!,
      address,
      products.map((p) => ({
        ...p,
        productId: p.id,
      }))
    );
    setLoading(false);
    if (!response.ok) {
      setError(response.message!);
      return;
    }
    clearCart();
    router.replace(`/orders/${response.value?.id}`);
  };
  return (
    <>
      <DeliveryAddressSummary countries={countries} address={address} />
      <div className="h-0.5 w-full rounded bg-gray-200 mb-10"></div>
      <OrderSummary products={products} />

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-5 mb-2 w-full">
        <button
          disabled={loading}
          className="flex btn-primary justify-center"
          onClick={submitOrder}
        >
          Submit order
        </button>
      </div>
    </>
  );
};
