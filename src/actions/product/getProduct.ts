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

export async function getPaginatedProducts(
  { take = 12, page = 1 }: PaginatedRequest,
  { category }: FilterProps
): Promise<ApiResponse<PaginatedResponse<Product>>> {
  const products = await prisma.product.findMany({
    take: take,
    skip: (page - 1) * take,
    include: {
      images: { select: { url: true, id: true } },
      category: { select: { label: true } },
    },
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
        category: p.category.label,
        images: p.images,
      })),
    },
  };
}

export async function getProductBySlug(
  slug: string
): Promise<ApiResponse<Product>> {
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      images: { select: { url: true, id: true } },
      category: { select: { label: true } },
    },
  });

  if (!product) return { ok: false, message: "Not found product" };

  return {
    ok: true,
    value: {
      ...product,
      category: product.category.label,
      images: product.images,
    },
  };
}

export async function searchProducts(
  query: string,
  { page = 1, take = 12 }: PaginatedRequest
): Promise<ApiResponse<PaginatedResponse<Product>>> {
  const products = await prisma.$queryRaw<Product[]>`
    SELECT *
    FROM "Product"
    WHERE levenshtein(title, ${query}) < 5 OR levenshtein(slug, ${query}) < 5
          OR (title ILIKE ${query + "%"} OR slug ILIKE ${query + "%"})
    ORDER BY LEAST(levenshtein(title, ${query}), levenshtein(slug, ${query}))
    LIMIT ${take} OFFSET ${(page - 1) * take};
  `;

  const count = await prisma.$queryRaw<{ count: BigInt }[]>`
    SELECT COUNT(*) AS count
    FROM "Product"
    WHERE levenshtein(title, ${query}) < 5 OR levenshtein(slug, ${query}) < 5
          OR (title ILIKE ${query + "%"} OR slug ILIKE ${query + "%"})
  `;

  const totalProducts = Number(count[0].count);
  const totalPages = Math.ceil(totalProducts / take);

  const productIds = products.map((product) => product.id);

  const productsWithRelations = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: {
      images: { select: { url: true, id: true } },
      category: { select: { label: true } },
    },
  });

  return {
    ok: true,
    value: {
      current: page,
      total: totalPages,
      data: productsWithRelations.map((p) => ({
        ...p,
        category: p.category.label,
        images: p.images,
      })),
    },
  };
}
