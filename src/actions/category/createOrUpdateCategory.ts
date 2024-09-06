"use server";

import { ApiResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  subTitle: z.string().min(3).max(255).optional().nullable(),
  label: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  isMain: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase() === "true";
    }
    return val;
  }, z.boolean()),
});

export async function createOrUpdateCategory(
  formData: FormData
): Promise<ApiResponse<Category>> {
  const data = Object.fromEntries(formData);
  console.log(data);

  const categoryParsed = categorySchema.safeParse(data);

  if (!categoryParsed.success)
    return { ok: false, message: "Invalid form data" };

  const { id, ...category } = categoryParsed.data;

  console.log(category);

  try {
    const c = await prisma.$transaction(async (tx) => {
      let c;
      if (
        await tx.category.findFirst({
          where: { slug: category.slug, NOT: id ? { id: id } : undefined },
        })
      )
        throw new Error("There is a category with the same slug");

      if (id)
        c = await tx.category.update({
          where: { id },
          data: { ...category, subTitle: category.subTitle ?? null },
        });
      else
        c = await tx.category.create({
          data: { ...category, subTitle: category.subTitle ?? null },
        });

      revalidatePath("/admin/categories");
      revalidatePath(`/admin/category/${c.slug}`);
      revalidatePath("/admin/products");

      return c;
    });
    return { ok: true, value: c };
  } catch (error: any) {
    return { ok: false, message: error?.message };
  }
}
