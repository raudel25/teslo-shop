import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../conf/fonts";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: { template: "%s - Teslo | Shop", default: "Home" },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
