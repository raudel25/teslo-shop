"use server";

import {
  ApiResponse,
  CartProduct,
  Order,
  PaginatedRequest,
  PaginatedResponse,
} from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getOrder(
  userId: string,
  orderId: string
): Promise<ApiResponse<Order>> {
  const order = await prisma.order.findUnique({
    where: { id: orderId, userId: userId },
    include: {
      orderProducts: {
        include: {
          product: {
            include: { images: { select: { url: true } } },
          },
        },
      },
    },
  });

  if (!order) return { ok: false, message: "Not found order" };

  return {
    ok: true,
    value: {
      ...order,
      deliveryAddress: order.deliveryAddress as any,
      orderProducts: order.orderProducts.map(
        (p): CartProduct => ({
          id: p.productId,
          slug: p.product.slug,
          quantity: p.quantity,
          size: p.size,
          price: p.price,
          title: p.product.title,
          image: p.product.images[0].url,
          inStock: 0,
        })
      ),
    },
  };
}

export async function getOrdersByUser(
  { take = 12, page = 1 }: PaginatedRequest,
  userId: string
): Promise<ApiResponse<PaginatedResponse<Order>>> {
  const orders = await prisma.order.findMany({
    take: take,
    skip: (page - 1) * take,
    orderBy: { createdAt: "desc" },
    where: { userId: userId },
    include: {
      orderProducts: {
        include: {
          product: {
            include: { images: { select: { url: true } } },
          },
        },
      },
    },
  });

  const totalOrders = await prisma.order.count({
    where: { userId: userId },
  });
  const totalPages = Math.ceil(totalOrders / take);

  return {
    ok: true,
    value: {
      total: totalPages,
      current: page,
      data: orders.map((order) => ({
        ...order,
        deliveryAddress: order.deliveryAddress as any,
        orderProducts: order.orderProducts.map(
          (p): CartProduct => ({
            id: p.productId,
            slug: p.product.slug,
            quantity: p.quantity,
            size: p.size,
            price: p.price,
            title: p.product.title,
            image: p.product.images[0].url,
            inStock: 0,
          })
        ),
      })),
    },
  };
}

export async function getOrders({
  take = 12,
  page = 1,
}: PaginatedRequest): Promise<ApiResponse<PaginatedResponse<Order>>> {
  const orders = await prisma.order.findMany({
    take: take,
    skip: (page - 1) * take,
    orderBy: { createdAt: "desc" },
    include: {
      orderProducts: {
        include: {
          product: {
            include: { images: { select: { url: true } } },
          },
        },
      },
    },
  });

  const totalOrders = await prisma.order.count({});
  const totalPages = Math.ceil(totalOrders / take);

  return {
    ok: true,
    value: {
      total: totalPages,
      current: page,
      data: orders.map((order) => ({
        ...order,
        deliveryAddress: order.deliveryAddress as any,
        orderProducts: order.orderProducts.map(
          (p): CartProduct => ({
            id: p.productId,
            slug: p.product.slug,
            quantity: p.quantity,
            size: p.size,
            price: p.price,
            title: p.product.title,
            image: p.product.images[0].url,
            inStock: 0,
          })
        ),
      })),
    },
  };
}
