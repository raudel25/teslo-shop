import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  console.log("Seeding database");

  await Promise.all([
    prisma.product.deleteMany(),
    prisma.image.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  await prisma.category.createMany({ data: initialData.categories });

  initialData.products.forEach(async (p) => {
    const category = await prisma.category.findUnique({
      where: { slug: p.category },
    });
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        inStock: p.inStock,
        price: p.price,
        categoryId: category!.id,
        slug: p.slug,
        images: { create: p.images.map((img) => ({ url: img })) },
      },
    });
  });
}
(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
