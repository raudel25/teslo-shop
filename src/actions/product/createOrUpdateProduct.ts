"use server";

import { ApiResponse, Product, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(1)
    .transform((val) => Number(val.toFixed(2))),
  description: z.string(),
  categoryId: z.string().uuid(),
  sizes: z.coerce
    .string()
    .min(1)
    .transform((val) => val.split(",")),
});

export async function createOrUpdateProduct(
  formData: FormData
): Promise<ApiResponse<Product>> {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) return { ok: false, message: "Invalid form" };

  const responseImages = await uploadImages(
    formData.getAll("images") as File[]
  );

  if (!responseImages.ok) return { ok: false, message: responseImages.message };
  const images = responseImages.value!;

  const { id, ...product } = productParsed.data;
  product.slug = product.slug.toLocaleLowerCase().replace("/ /g", "-").trim();

  try {
    const p = await prisma.$transaction(async (tx) => {
      let p;

      if (
        await tx.product.findFirst({
          where: { slug: product.slug, NOT: id ? { id: id } : undefined },
        })
      )
        throw new Error("There is a product with the same slug");

      if (id) {
        p = await tx.product.update({
          where: { id },
          data: {
            ...product,
            sizes: product.sizes as Size[],
            images: { create: images.map((img) => ({ url: img })) },
          },
          include: {
            images: { select: { url: true, id: true } },
            category: { select: { label: true } },
          },
        });
      } else {
        p = await tx.product.create({
          data: {
            ...product,
            sizes: product.sizes as Size[],
            images: { create: images.map((img) => ({ url: img })) },
          },
          include: {
            images: { select: { url: true, id: true } },
            category: { select: { label: true } },
          },
        });
      }

      return p;
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return { ok: true, value: { ...p, category: p.category.label } };
  } catch (error: any) {
    return { ok: false, message: error?.message };
  }
}

export async function deleteProductImage(id: string): Promise<ApiResponse<{}>> {
  const image = await prisma.image.delete({
    where: { id },
    include: { products: { select: { slug: true } } },
  });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/product/${image.products[0].slug}`);
  revalidatePath(`/products/${image.products[0].slug}`);
  return { ok: true };
}

const uploadImages = async (images: File[]): Promise<ApiResponse<string[]>> => {
  const uploadPromises = images.map(async (image) => {
    try {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64Image}`)
        .then((r) => r.secure_url);
    } catch (error) {
      return null;
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  if (uploadedImages.filter((img) => img == null).length != 0)
    return {
      ok: false,
      message: "An error occurred while uploading the images",
    };

  return { ok: true, value: uploadedImages as string[] };
};
