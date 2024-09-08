export const revalidate = 60;

import { getCategoryBySlug } from "@/actions/category/getCategory";
import { searchProducts } from "@/actions/product/getProduct";
import { Pagination, ProductGrid, Spinner, Title } from "@/components";
import { isNumber } from "@/utils";
import { redirect } from "next/navigation";
import { Searcher } from "./ui/Searcher";
import { Suspense } from "react";

interface Props {
  searchParams: { query?: string; page?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;
  const query = searchParams.query ?? "";

  const response = await searchProducts(query, { page: page });
  if (!response.ok) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <Title title="Search" subTitle="Find what you need" />
        <Suspense fallback={<Spinner />}>
          <Searcher />
        </Suspense>
      </div>
      <ProductGrid products={response.value!.data} />
      <Pagination totalPages={response.value!.total} />
    </div>
  );
}
