"use server";

import { ApiResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function setTransactionId(
  orderId: string,
  transactionId: string
): Promise<ApiResponse<{}>> {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { transactionId: transactionId },
  });

  if (!order) return { ok: false, message: "Not found order" };

  return { ok: true };
}
