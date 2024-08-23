import { ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <div className="">
      <Title title="Store" subTitle="All products" />
      <ProductGrid products={products} />
    </div>
  );
}
