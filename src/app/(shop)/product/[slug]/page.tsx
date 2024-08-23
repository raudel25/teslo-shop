import {
  MobileSlideshow,
  QuantitySelector,
  SizeSelector,
  Slideshow,
} from "@/components";
import { titleFont } from "@/conf/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((p) => p.slug === slug);

  if (!product) notFound();

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
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />

        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Add to car</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
