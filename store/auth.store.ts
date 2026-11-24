import apiClient from "@/lib/api/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  customer: Customer | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (customer: Customer, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (customer, accessToken) =>
        set({
          customer,
          accessToken,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          customer: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "backum-hills-auth",
    }
  )
);


export const changeCustomerPassword = async (
  currentPassword: string,
  newPassword: string,
  accessToken: string
) => {
  try {
    const response = await apiClient.patch(
      "/profile/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      (
        error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        }
      ).response?.data?.message || "Password change nahi ho paya.";

    throw new Error(message);
  }
};

export interface RefreshSessionResponse {
  user: Customer;
  accessToken: string;
}

export const refreshCustomerSession =
  async (): Promise<RefreshSessionResponse> => {
    try {
      const response = await apiClient.post("/auth/refresh");

      return response.data.data;
    } catch (error) {
      const message =
        (
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response?.data?.message || "Session refresh failed.";

      throw new Error(message);
    }
};


