import { getProductBySlug } from "@/actions";
import {
  MobileSlideshow,
  QuantitySelector,
  SizeSelector,
  Slideshow,
} from "@/components";
import { titleFont } from "@/conf/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
import { currencyFormat } from "@/utils";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const response = await getProductBySlug(params.slug);

  return {
    title: response.value?.title ?? "Product not found",
    description: response.value?.description ?? "",
    openGraph: {
      title: response.value?.title ?? "Product not found",
      description: response.value?.description ?? "",
      images: [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const response = await getProductBySlug(slug);

  if (!response.ok) notFound();

  const product = response.value!;

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <Slideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
        <MobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {product.inStock}
        </h1>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
