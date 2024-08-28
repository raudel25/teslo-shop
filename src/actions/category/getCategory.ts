"use server";

import { ApiResponse, Category } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getCategoryBySlug = async (
  slug: string
): Promise<ApiResponse<Category>> => {
  const category = await prisma.category.findUnique({ where: { slug: slug } });

  if (!category) return { ok: false, message: "Not found category" };

  return { ok: true, value: category! };
};
