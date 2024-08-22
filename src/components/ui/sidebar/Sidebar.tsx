import Link from "next/link";
import { ReactNode } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface MenuItem {
  link: string;
  icon: ReactNode;
  text: string;
}

export const Sidebar = () => {
  const getMenuItem = (item: MenuItem, idx: number) => (
    <Link
      key={idx}
      href={item.link}
      className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {item.icon}
      <span className="ml-3 text-sm">{item.text}</span>
    </Link>
  );

  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30"></div>

      <div className="fixed top-0 left-0 h-screen w-screen z-10 backdrop-filter backdrop-blur-sm"></div>

      <nav className="fixed p-5 top-0 right-0 h-screen w-[400px] bg-white z-20 shadow-2xl transform transition-all duration-300">
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
        />
        <div className="relative mt-14">
          <IoSearchOutline className="absolute top-2 left-2" size={15} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-10">
          {[
            { link: "/", text: "Profile", icon: <IoPersonOutline size={20} /> },
            { link: "/", text: "Orders", icon: <IoTicketOutline size={20} /> },
            {
              link: "/auth/login",
              text: "Login",
              icon: <IoLogInOutline size={20} />,
            },
            {
              link: "/",
              text: "Logout",
              icon: <IoLogOutOutline size={20} />,
            },
          ].map(getMenuItem)}
        </div>

        <div className="w-full h-px bg-gray-200 my-10" />

        {[
          { link: "/", text: "Products", icon: <IoShirtOutline size={20} /> },
          { link: "/", text: "Orders", icon: <IoTicketOutline size={20} /> },
          {
            link: "/auth/login",
            text: "Users",
            icon: <IoPeopleOutline size={20} />,
          },
        ].map(getMenuItem)}
      </nav>
    </div>
  );
};
