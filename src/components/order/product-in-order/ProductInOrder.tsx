import { Product } from "@/interfaces";
import Image from "next/image";

interface Props {
  p: Product;
}

export const ProductInOrder = ({ p }: Props) => {
  return (
    <div className="flex mb-5">
      <Image
        src={`/products/${p.images[0]}`}
        alt={p.title}
        width={100}
        height={100}
        className="mr-5 rounded"
        style={{ width: "100px", height: "100px" }}
      />
      <div>
        <p>{p.title}</p>
        <p>${p.price} x 3</p>
        <p className="font-bold">Subtotal: ${3 * p.price}</p>
      </div>
    </div>
  );
};
