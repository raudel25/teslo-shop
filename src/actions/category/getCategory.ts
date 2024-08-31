"use server";

import { ApiResponse, Category } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getCategoryBySlug(
  slug: string
): Promise<ApiResponse<Category>> {
  const category = await prisma.category.findUnique({ where: { slug: slug } });

  if (!category) return { ok: false, message: "Not found category" };

  return { ok: true, value: category! };
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  const category = await prisma.category.findMany({});

  return { ok: true, value: category };
}
