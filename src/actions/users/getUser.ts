"use server";

import {
  ApiResponse,
  PaginatedRequest,
  PaginatedResponse,
  User,
} from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getPaginatedUsers({
  take = 12,
  page = 1,
}: PaginatedRequest): Promise<ApiResponse<PaginatedResponse<User>>> {
  const users = await prisma.user.findMany({
    take: take,
    skip: (page - 1) * take,
  });

  const totalUsers = await prisma.user.count({});
  const totalPages = Math.ceil(totalUsers / take);

  return {
    ok: true,
    value: {
      current: page,
      total: totalPages,
      data: users.map((u) => ({
        ...u,
      })),
    },
  };
}
