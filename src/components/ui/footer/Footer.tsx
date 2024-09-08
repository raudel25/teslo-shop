import { titleFont } from "@/conf/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full text-xs justify-center my-3">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span>| shop </span>
        <span> {new Date().getFullYear()}</span>
      </Link>
    </div>
  );
};
