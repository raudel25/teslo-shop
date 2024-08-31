import { ProductImage } from "@/components";
import { CartProduct } from "@/interfaces";
import Image from "next/image";

interface Props {
  p: CartProduct;
}

export const ProductInOrder = ({ p }: Props) => {
  return (
    <div className="flex mb-5">
      <ProductImage
        src={p.image}
        alt={p.title}
        width={100}
        height={100}
        className="mr-5 rounded"
        style={{ width: "100px", height: "100px" }}
      />
      <div>
        <span>
          {p.size} - {p.title}
        </span>
        <p>
          ${p.price} x {p.quantity}
        </p>
        <p className="font-bold">Subtotal: ${p.quantity * p.price}</p>
      </div>
    </div>
  );
};
