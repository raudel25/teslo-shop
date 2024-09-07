"use server";

import { ApiResponse, User } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function changeUserRole(
  currentUserId: string,
  userId: string,
  role: string
): Promise<ApiResponse<User>> {
  if (userId === currentUserId)
    return { ok: false, message: "Cannot change the role of the current user" };
  const newRole = role === "admin" ? "admin" : "user";

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: newRole,
    },
  });

  revalidatePath("/admin/users");

  return {
    ok: true,
    value: user,
  };
}
