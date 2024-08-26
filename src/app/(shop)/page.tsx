import { getPaginatedProducts } from "@/actions/product/getPaginatedProducts";
import { Pagination, ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { isNumber } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;

  const products = await getPaginatedProducts({ page: page });
  if (products.data.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Store" subTitle="All products" />
      <ProductGrid products={products.data} />
      <Pagination totalPages={products.total} />
    </div>
  );
}
