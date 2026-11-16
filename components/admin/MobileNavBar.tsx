"use client";
import { createContext, useContext, useState } from "react";

// Header ka button aur SideBar, dono is ek state se jude hain.
const Ctx = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export const useMobileNav = () => useContext(Ctx);

export default function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}