"use server";

import prisma from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {
  await prisma.address.delete({
    where: { userId },
  });
};
