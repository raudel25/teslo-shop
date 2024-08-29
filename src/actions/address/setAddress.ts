"use server";

import type { Address, ApiResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function setAddress(
  address: Address,
  userId: string
): Promise<ApiResponse<Address>> {
  const newAddress = await createOrReplaceAddress(address, userId);

  return {
    ok: true,
    value: { ...newAddress, address2: newAddress.address2 ?? undefined },
  };
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  const storedAddress = await prisma.address.findUnique({
    where: { userId },
  });

  const addressToSave = {
    userId: userId,
    address: address.address,
    address2: address.address2,
    countryId: address.countryId,
    city: address.city,
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone,
    postalCode: address.postalCode,
  };

  if (!storedAddress) {
    const newAddress = await prisma.address.create({
      data: addressToSave,
    });

    return newAddress;
  }

  const updatedAddress = await prisma.address.update({
    where: { userId },
    data: addressToSave,
  });

  return updatedAddress;
};
