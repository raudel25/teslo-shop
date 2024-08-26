export const revalidate = 60;

import { getPaginatedProducts } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { isNumber } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;

  const response = await getPaginatedProducts({ page: page }, {});
  if (!response.ok || response.value!.data.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Store" subTitle="All products" />
      <ProductGrid products={response.value!.data} />
      <Pagination totalPages={response.value!.total} />
    </div>
  );
}
