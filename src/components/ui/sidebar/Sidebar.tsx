"use client";

import { logout } from "@/actions/auth/logout";
import { uiStore } from "@/store";
import { Category } from "@prisma/client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  IoCloseOutline,
  IoGiftOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface MenuItem {
  link?: string;
  onClick?: () => void;
  icon: ReactNode;
  text: string;
}

interface Props {
  categories: Category[];
}

export const Sidebar = ({ categories }: Props) => {
  const { isSideMenu, closeSideMenu } = uiStore();
  const { data, update } = useSession();
  const [session, setSession] = useState(data);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    update().then((currentSession) => setSession(currentSession));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSideMenu]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search.length !== 0) params.set("query", search);
    closeSideMenu();
    router.push(`/search?${params.toString()}`);
  };

  const getMenuItem = (item: MenuItem, idx: number) =>
    item.onClick ? (
      <button
        key={idx}
        onClick={() => {
          closeSideMenu();
          item.onClick!();
        }}
        className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
      >
        {item.icon}
        <span className="ml-3 text-sm">{item.text}</span>
      </button>
    ) : (
      <Link
        key={idx}
        href={item.link!}
        className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={() => closeSideMenu()}
      >
        {item.icon}
        <span className="ml-3 text-sm">{item.text}</span>
      </Link>
    );

  return (
    <div>
      {isSideMenu && (
        <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30"></div>
      )}

      {isSideMenu && (
        <div
          onClick={closeSideMenu}
          className="fixed top-0 left-0 h-screen w-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}

      <nav
        className={clsx(
          "fixed p-5 top-0 right-0 h-screen w-[400px] bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenu,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />
        <div className="relative mt-14">
          <button onClick={handleSearch}>
            <IoSearchOutline className="absolute top-2 left-2" size={15} />
          </button>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-10">
          {[
            ...(session?.user?.role === "user"
              ? [
                  {
                    link: "/",
                    text: "Profile",
                    icon: <IoPersonOutline size={20} />,
                  },
                  {
                    link: "/orders",
                    text: "Orders",
                    icon: <IoTicketOutline size={20} />,
                  },
                ]
              : []),
            session?.user
              ? {
                  onClick: async () => {
                    await logout();
                  },
                  text: "Logout",
                  icon: <IoLogOutOutline size={20} />,
                }
              : {
                  link: "/auth/login",
                  text: "Login",
                  icon: <IoLogInOutline size={20} />,
                },
          ].map(getMenuItem)}
        </div>
        {session?.user?.role === "admin" && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />

            {[
              {
                link: "/admin/products",
                text: "Products",
                icon: <IoShirtOutline size={20} />,
              },
              {
                link: "/admin/orders",
                text: "Orders",
                icon: <IoTicketOutline size={20} />,
              },
              {
                link: "/admin/categories",
                text: "Categories",
                icon: <IoGiftOutline size={20} />,
              },
              {
                link: "/admin/users",
                text: "Users",
                icon: <IoPeopleOutline size={20} />,
              },
            ].map(getMenuItem)}
          </>
        )}
        <div className="w-full h-px bg-gray-200 my-10" />

        <div className="grid grid-cols-3">
          {categories
            .sort((a, b) => Number(b.isMain) - Number(a.isMain))
            .map((c, idx) => (
              <Link
                key={idx}
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-center"
                href={`/category/${c.slug}`}
                onClick={() => closeSideMenu()}
              >
                {c.label}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
};
