"use server";

import {
  ApiResponse,
  PaginatedRequest,
  PaginatedResponse,
  Product,
} from "@/interfaces";
import prisma from "@/lib/prisma";

interface FilterProps {
  category?: string;
}

export const getPaginatedProducts = async (
  { take = 12, page = 1 }: PaginatedRequest,
  { category }: FilterProps
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  const products = await prisma.product.findMany({
    take: take,
    skip: (page - 1) * take,
    include: { images: { select: { url: true } } },
    where: { category: { slug: category } },
  });

  const totalProducts = await prisma.product.count({
    where: { category: { slug: category } },
  });
  const totalPages = Math.ceil(totalProducts / take);

  return {
    ok: true,
    value: {
      current: page,
      total: totalPages,
      data: products.map((p) => ({
        ...p,
        images: p.images.map((img) => img.url),
      })),
    },
  };
};
