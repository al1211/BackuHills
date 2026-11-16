"use client";
import { IconMenu2 } from "@tabler/icons-react";
import { useMobileNav } from "./MobileNavBar";

// Ise Header ke andar sabse left me lagao. Desktop par apne aap chhup jaata hai.
export default function MenuButton() {
  const { open, setOpen } = useMobileNav();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
      aria-expanded={open}
      aria-controls="sidebar"
      className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[#5FE0BC] md:hidden"
    >
      <IconMenu2 size={24} />
    </button>
  );
}