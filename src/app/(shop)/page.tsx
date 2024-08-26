import { getPaginatedProducts } from "@/actions/product/getPaginatedProducts";
import { ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page ?? "1");

  const products = await getPaginatedProducts({ page: page });
  if (products.data.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Store" subTitle="All products" />
      <ProductGrid products={products.data} />
    </div>
  );
}
