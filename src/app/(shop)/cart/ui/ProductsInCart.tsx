"use client";

import { QuantitySelector } from "@/components";
import { CartProduct } from "@/interfaces";
import { cartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const { products, updateProduct, removeProduct } = cartStore();
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  const updateProductQuantity = (quantity: number, product: CartProduct) =>
    updateProduct({ ...product, quantity: quantity });

  useEffect(() => {
    if (products.length === 0 && firstLoad) redirect("/empty");
    setFirstLoad(true);
  }, [products, firstLoad]);

  return (
    <>
      {products.map((p, idx) => (
        <div className="flex mb-5" key={idx}>
          <Image
            src={`/products/${p.image}`}
            alt={p.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <Link
              href={`/product/${p.slug}`}
              className="hover:underline cursor-pointer"
            >
              {p.size} - {p.title}
            </Link>
            <p className="mb-1">${p.price}</p>
            <QuantitySelector
              quantity={p.quantity}
              maxQuantity={p.inStock}
              onChange={(quantity: number) => {
                updateProductQuantity(quantity, p);
              }}
            />
            <button
              className="mt-3 underline"
              onClick={() => removeProduct(p.id, p.size)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
