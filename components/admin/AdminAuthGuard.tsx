"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin.auth.store";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const admin = useAdminAuthStore((state) => state.admin);
  const accessToken = useAdminAuthStore(
    (state) => state.accessToken
  );
  const clearAdminAuth = useAdminAuthStore(
    (state) => state.clearAdminAuth
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isValidAdmin =
    !!accessToken &&
    !!admin &&
    admin.role === "admin" &&
    admin.isActive;

  useEffect(() => {
    if (!hydrated) return;

    if (!isValidAdmin) {
      clearAdminAuth();
      router.replace("/login");
    }
  }, [
    hydrated,
    isValidAdmin,
    clearAdminAuth,
    router,
  ]);

  if (!hydrated || !isValidAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F7F9F8]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#2FCB9F]" />
      </div>
    );
  }

  return <>{children}</>;
}