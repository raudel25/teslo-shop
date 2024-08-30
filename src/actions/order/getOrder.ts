"use server";

import { ApiResponse, CartProduct, Order } from "@/interfaces";
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
  userId: string
): Promise<ApiResponse<Order[]>> {
  const orders = await prisma.order.findMany({
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

  return {
    ok: true,
    value: orders.map((order) => ({
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
  };
}
