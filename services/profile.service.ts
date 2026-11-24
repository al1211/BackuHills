import apiClient from "@/lib/api/client";

export interface CustomerProfile {
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

// GET /profile
export const getCustomerProfile = async (
  accessToken: string
): Promise<CustomerProfile> => {
  try {
    const response = await apiClient.get("/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data.user;
  } catch (error) {
    const message =
      (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message || "Unable to fetch profile.";

    throw new Error(message);
  }
};

// PATCH /profile
export const updateCustomerProfile = async (
  data: {
    name: string;
    phone: string;
  },
  accessToken: string
): Promise<CustomerProfile> => {
  try {
    const response = await apiClient.patch("/profile", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data.user;
  } catch (error) {
    const message =
      (error as { response?: { data?: { message?: string } } }).response
        ?.data?.message || "Unable to update profile.";

    throw new Error(message);
  }
};