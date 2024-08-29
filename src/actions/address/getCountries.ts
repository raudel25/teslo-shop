"use server";

import { ApiResponse, Country } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getCountries(): Promise<ApiResponse<Country[]>> {
  return { ok: true, value: await prisma.country.findMany() };
}
