import apiClient from "@/lib/api/client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AdminLoginResponse {
  user: AdminUser;
  accessToken: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: AdminLoginResponse;
}

export const adminLogin = async (
  email: string,
  password: string
): Promise<AdminLoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      {
        email,
        password,
      }
    );

    const { user, accessToken } = response.data.data;

    // Customer ko admin panel mein login nahi karne dena.
    if (user.role !== "admin") {
      throw new Error("You are not authorized as an admin.");
    }

    if (!user.isActive) {
      throw new Error("Your admin account is inactive.");
    }

    return { user, accessToken };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("You are not")) {
      throw error;
    }

    const message =
      (
        error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        }
      ).response?.data?.message || "Admin login failed.";

    throw new Error(message);
  }
};