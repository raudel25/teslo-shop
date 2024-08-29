export const revalidate = 60;

import { getCategoryBySlug } from "@/actions/category/getCategory";
import { getPaginatedProducts } from "@/actions/product/getProduct";
import { Pagination, ProductGrid, Title } from "@/components";
import { isNumber } from "@/utils";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
  searchParams: { page?: string };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = params;
  const page = isNumber(searchParams.page) ? parseInt(searchParams.page!) : 1;

  const responseCategory = await getCategoryBySlug(slug);
  if (!responseCategory.ok) notFound();

  const responseProducts = await getPaginatedProducts(
    { page: page },
    { category: slug }
  );
  if (!responseProducts.ok || responseProducts.value!.data.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title
        title={responseCategory.value!.title}
        subTitle={responseCategory.value!.subTitle ?? undefined}
      />
      <ProductGrid products={responseProducts.value!.data} />
      <Pagination totalPages={responseProducts.value!.total} />
    </div>
  );
}
