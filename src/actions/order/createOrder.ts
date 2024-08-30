"use server";

import { Address, ApiResponse, Order, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductOrderAction {
  productId: string;
  quantity: number;
  size: Size;
}

export async function createOrder(
  userId: string,
  deliveryAddress: Address,
  orderProducts: ProductOrderAction[]
): Promise<ApiResponse<Order>> {
  const tax = 15;

  try {
    await Promise.all(
      orderProducts.map(async (p) => {
        const product = await prisma.product.findUnique({
          where: { id: p.productId },
        });

        if (!product) throw new Error("Not found product");
        if (product.inStock < p.quantity) throw new Error("Invalid quantity");

        return product;
      })
    );

    const order = await prisma.$transaction(async (tx) => {
      orderProducts.forEach(async (p) => {
        if (p.quantity <= 0) throw new Error("Invalid quantity");

        await tx.product.update({
          where: { id: p.productId },
          data: { inStock: { decrement: p.quantity } },
        });
      });

      const products = await Promise.all(
        orderProducts.map(async (p) => {
          const product = (await tx.product.findUnique({
            where: { id: p.productId },
          }))!;

          if (product.inStock < 0) throw new Error("Not found product");

          return product;
        })
      );

      const order = await tx.order.create({
        data: {
          userId: userId,
          tax: tax,
          deliveryAddress: { ...deliveryAddress },
        },
      });

      await tx.orderProduct.createMany({
        data: orderProducts.map((p) => {
          const product = products.find((q) => q.id === p.productId)!;
          return {
            quantity: p.quantity,
            size: p.size,
            price: product.price,
            productId: product.id,
            orderId: order.id,
          };
        }),
      });

      return order;
    });

    return {
      ok: true,
      value: { ...order, deliveryAddress: order.deliveryAddress as any },
    };
  } catch (error: any) {
    return { ok: false, message: error?.message };
  }
}
