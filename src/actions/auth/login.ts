"use server";

import { signIn } from "@/auth";
import { ApiResponse } from "@/interfaces";
import { AuthError, User } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<{}>> {
  try {
    await signIn("credentials", { email, password, redirect: false });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Invalid credentials" };
  }
}
