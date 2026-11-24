import apiClient from "@/lib/api/client";

export interface CustomerRegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const registerCustomer = async (
  data: CustomerRegisterData
) => {
  try {
    const response = await apiClient.post(
      "/auth/register",
      data
    );

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Registration failed";

    throw new Error(message);
  }
};

export interface CustomerLoginData {
  email: string;
  password: string;
}

export const loginCustomer = async (
 {email,password}: CustomerLoginData
) => {
  try {
    const response = await apiClient.post(
      "/auth/login",
      {email,password}
    );

    return response.data.data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed. Please try again.";

    throw new Error(message);
  }
};

export interface Customer {
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

export const getAuthenticatedUser = async (
  accessToken: string
): Promise<Customer> => {
  try {
     
       if (!accessToken) {
      throw new Error("Access token missing.");
    }
    const response = await apiClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data.user;
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
      ).response?.data?.message || "Unable to fetch authenticated user";

    throw new Error(message);
  }
};

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



export const logoutCustomer = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
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
      ).response?.data?.message || "Logout failed. Please try again.";

    throw new Error(message);
  }
};


export const logoutAllDevices = async (accessToken: string) => {
  try {
    const response = await apiClient.post(
      "/auth/logout-all",
      {},
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
      ).response?.data?.message || "Unable to logout from all devices.";

    throw new Error(message);
  }
};