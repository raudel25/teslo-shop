"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product } from "@/interfaces";
import { cartStore } from "@/store";
import { Size } from "@prisma/client";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const { addProduct } = cartStore();

  const addProductFunc = () => {
    addProduct({
      id: product.id,
      slug: product.slug,
      quantity: quantity,
      size: size,
      price: product.price,
      title: product.title,
      image: product.images[0],
    });
    setSize(product.sizes[0]);
    setQuantity(1);
  };

  return (
    <>
      <SizeSelector
        onChange={(size: Size) => setSize(size)}
        availableSizes={product.sizes}
        selectedSize={size}
      />

      <QuantitySelector
        quantity={quantity}
        maxQuantity={product.inStock}
        onChange={(quantity: number) => setQuantity(quantity)}
      />

      <button className="btn-primary my-5" onClick={addProductFunc}>
        Add to car
      </button>
    </>
  );
};
