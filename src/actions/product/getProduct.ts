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

export const getProductBySlug = async (
  slug: string
): Promise<ApiResponse<Product>> => {
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { images: { select: { url: true } } },
  });

  if (!product) return { ok: false, message: "Not found product" };

  return {
    ok: true,
    value: { ...product, images: product.images.map((img) => img.url) },
  };
};
