import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const protectedPages = [
        { url: "/checkout", roles: ["user"] },
        { url: "/orders", roles: ["user"] },
        { url: "/admin", roles: ["admin"] },
      ];

      const page = protectedPages.find((p) =>
        nextUrl.pathname.startsWith(p.url)
      );

      if (!page) return true;

      return page.roles.find((r) => r === auth?.user.role) != null;
    },
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
