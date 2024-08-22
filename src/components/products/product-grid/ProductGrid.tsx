import { Product } from "@/interfaces";
import ProductGridItem from "./ProductGridItem";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((p) => (
        <ProductGridItem product={p} key={p.slug} />
      ))}
    </div>
  );
};

export default ProductGrid;
