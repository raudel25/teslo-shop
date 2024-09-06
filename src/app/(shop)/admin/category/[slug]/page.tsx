import { Title } from "@/components";
import { redirect } from "next/navigation";
import { getCategoryBySlug } from "@/actions/category/getCategory";
import { CategoryForm } from "./ui/CategoryForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function AdminCategoryPage({ params }: Props) {
  const { slug } = params;

  const response = await getCategoryBySlug(slug);

  if (!response.ok && slug !== "new") {
    redirect("/admin/categories");
  }

  const title = slug === "new" ? "New category" : "Edit category";

  return (
    <>
      <Title title={title} />

      <CategoryForm category={response.value ?? {}} />
    </>
  );
}
