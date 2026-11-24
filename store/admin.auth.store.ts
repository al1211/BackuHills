
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminUser } from "@/lib/auth/admin-auth";

interface AdminAuthState {
  admin: AdminUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAdminAuth: (admin: AdminUser, accessToken: string) => void;
  clearAdminAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      accessToken: null,
      isAuthenticated: false,

      setAdminAuth: (admin, accessToken) =>
        set({
          admin,
          accessToken,
          isAuthenticated: true,
        }),

      clearAdminAuth: () =>
        set({
          admin: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "backum-hills-admin-auth",
    }
  )
);
