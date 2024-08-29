"use server";

import { Address, ApiResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getAddress(
  userId: string
): Promise<ApiResponse<Address>> {
  const address = await prisma.address.findUnique({
    where: { userId: userId },
  });

  if (!address) return { ok: false, message: "Not found address" };

  return {
    ok: true,
    value: { ...address, address2: address.address2 ?? undefined },
  };
}
