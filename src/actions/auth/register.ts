"use server";

import { ApiResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function register(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<{}>> {
  const oldUser = await prisma.user.findUnique({ where: { email: email } });

  if (oldUser) return { ok: false, message: "The user already exists" };

  await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: bcryptjs.hashSync(password),
      verifiedEmail: false,
    },
  });

  return { ok: true };
}
