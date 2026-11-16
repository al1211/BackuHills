"use client";
import { usePathname } from "next/navigation";
import { IconBell, IconSearch } from "@tabler/icons-react";
import MenuButton from "./MenuButton";

// /dashboard -> "Dashboard", /products -> "Products"
const titleFrom = (path: string) => {
  const seg = path.split("/").filter(Boolean)[0] || "dashboard";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
};

export default function Header() {
  const title = titleFrom(usePathname());

  return (
    <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile par hi dikhta hai */}
      <MenuButton />

      <h1 className="truncate text-lg font-bold text-gray-900">{title}</h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Search: tablet/desktop par input, mobile par sirf icon */}
        <label className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-[#F7F9F8] px-3 py-2 text-sm text-gray-500 focus-within:border-[#5FE0BC] sm:flex">
          <IconSearch size={18} />
          <input
            type="search"
            placeholder="Search..."
            className="w-40 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none lg:w-64"
          />
        </label>
        <button type="button" aria-label="Search" className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden">
          <IconSearch size={22} />
        </button>

        <button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <IconBell size={22} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#2FCB9F]" />
        </button>

        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#5FE0BC] text-sm font-bold text-gray-900">A</span>
          <span className="hidden text-sm font-semibold text-gray-800 lg:block">Admin</span>
        </div>
      </div>
    </header>
  );
}