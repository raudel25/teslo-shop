import Title from "@/components/ui/title/Title";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <div className="">
      <Title title="Hola" subTitle="Mundo" />
      <ProductGrid products={products} />
    </div>
  );
}
