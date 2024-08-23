import { ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const products = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { slug } = params;

  const category = initialData.categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <div className="">
      <Title title={category.title} subTitle={category.subTitle} />
      <ProductGrid products={products.filter((p) => p.category === slug)} />
    </div>
  );
}
