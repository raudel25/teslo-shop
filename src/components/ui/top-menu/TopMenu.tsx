"use client";

import { titleFont } from "@/conf/fonts";
import { cartStore, uiStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const { openSideMenu } = uiStore();
  const { products } = cartStore();
  const getTotalItems = () =>
    products.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <Link href={"/"}>
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span> | Shop</span>
      </Link>

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >
          Men
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kid"
        >
          Kids
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={getTotalItems() === 0 ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {getTotalItems() !== 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {getTotalItems()}
              </span>
            )}
            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>
        <button
          className="p-2 m-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openSideMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
