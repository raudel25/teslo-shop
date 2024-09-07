"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export const Searcher = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("query") ?? "");
  const router = useRouter();

  const pathname = usePathname();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search.length !== 0) params.set("query", search);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 relative">
      <button onClick={handleSearch}>
        <IoSearchOutline className="absolute top-2 left-2" size={20} />
      </button>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500 "
      />
    </div>
  );
};
