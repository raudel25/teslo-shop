import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getProductBySlug } from "@/actions/product/getProduct";
import { getCategories } from "@/actions/category/getCategory";

interface Props {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params;

  const responseProduct = await getProductBySlug(slug);
  const responseCategories = await getCategories();

  // Todo: new
  if (!responseProduct.ok && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "New product" : "Edit product";

  return (
    <>
      <Title title={title} />

      <ProductForm
        product={responseProduct.value ?? {}}
        categories={responseCategories.value ?? []}
      />
    </>
  );
}
