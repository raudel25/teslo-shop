"use server";

import { PaginatedRequest, PaginatedResponse, Product } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getPaginatedProducts = async ({
  take = 12,
  page = 1,
}: PaginatedRequest): Promise<PaginatedResponse<Product>> => {
  const products = await prisma.product.findMany({
    take: take,
    skip: (page - 1) * take,
    include: { images: { select: { url: true } } },
  });

  const totalProducts = await prisma.product.count({});
  const totalPages = Math.ceil(totalProducts / take);

  return {
    current: page,
    total: totalPages,
    data: products.map((p) => ({
      ...p,
      images: p.images.map((img) => img.url),
    })),
  };
};
