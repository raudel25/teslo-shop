"use client";

import { ProductImage } from "@/components";
import { Product } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images.at(0)?.url);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images.at(1)?.url)}
          onMouseLeave={() => setDisplayImage(product.images.at(0)?.url)}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold">{currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};
