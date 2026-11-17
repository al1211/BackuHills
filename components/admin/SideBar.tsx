"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome, IconChartPie, IconBox, IconDiscount2, IconArchive, IconShoppingBag,
  IconChartBar, IconUser, IconMail, IconAdjustmentsHorizontal, IconChevronRight, IconX,
  IconCategory,
  IconStack2,
  IconMessage,
  IconLayoutDashboard,
  IconSettings,
} from "@tabler/icons-react";
import { useMobileNav } from "./MobileNavBar";

const MENU = [
  { label: "Dashboard", href: "/admin/dashboard", icon: IconHome },
  { label: "Analytics", href: "/admin/analytics", icon: IconChartPie },
  { label: "Products", href: "/admin/products", icon: IconBox },
  { label: "Categories", href: "/admin/categories", icon: IconCategory },
  { label: "Collections", href: "/admin/collections", icon: IconStack2 },
  { label: "Inventory", href: "/admin/inventory", icon: IconArchive },
  { label: "Orders", href: "/admin/orders", icon: IconShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: IconUser },
  { label: "Reviews", href: "/admin/reviews", icon: IconMessage },
   { label: "Sales", href: "/admin/sales", icon: IconChartBar },
  { label: "Settings", href: "/admin/settings", icon: IconSettings },
];

const SideBar = () => {
  const pathname = usePathname();
  const { open, setOpen } = useMobileNav();

  // Page badalne par drawer band
  useEffect(() => { setOpen(false); }, [pathname, setOpen]);

  // Esc se band + drawer khula ho to peeche ka scroll band
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, setOpen]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Mobile: left se slide hone wala drawer. Desktop (md+): grid ka normal sidebar */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-[#F3F5F4] transition-[transform,visibility] duration-200
          md:visible md:static md:row-span-full md:w-auto md:translate-x-0
          ${open ? "visible translate-x-0" : "invisible -translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#5FE0BC] text-lg font-extrabold text-gray-900">B</div>
            <span className="font-bold leading-tight text-gray-900">Backum<br />Hills</span>
          </div>
          <button
            type="button" onClick={() => setOpen(false)} aria-label="Close menu"
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-200 md:hidden"
          >
            <IconX size={22} />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1.5">
            {MENU.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#5FE0BC] text-gray-900 shadow-md shadow-[#5FE0BC]/40"
                        : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={20} stroke={1.7} />
                    <span className="flex-1">{label}</span>
                    {active && <IconChevronRight size={18} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;