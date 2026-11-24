import apiClient from "@/lib/api/client";

// Category Type
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isInMenu: boolean;
  isComingSoon: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Create Category Data
export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isInMenu?: boolean;
  isComingSoon?: boolean;
  sortOrder?: number;
}

// Update Category Data
export type UpdateCategoryData = Partial<CreateCategoryData>;

// Error Handler
const getErrorMessage = (error: unknown, fallback: string) => {
  const err = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  return err.response?.data?.message || fallback;
};

// 1. Get Public Categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to fetch categories.")
    );
  }
};

// 2. Get All Categories (Admin)
export const getAdminCategories = async (
  accessToken: string
): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/admin/categories", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to fetch admin categories.")
    );
  }
};

// 3. Create Category (Admin)
export const createCategory = async (
  data: CreateCategoryData,
  accessToken: string
): Promise<Category> => {
  try {
    const response = await apiClient.post(
      "/admin/categories",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to create category.")
    );
  }
};

// 4. Update Category (Admin)
export const updateCategory = async (
  categoryId: string,
  data: UpdateCategoryData,
  accessToken: string
): Promise<Category> => {
  try {
    const response = await apiClient.patch(
      `/admin/categories/${categoryId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to update category.")
    );
  }
};

// 5. Toggle Category Menu Visibility (Admin)
export const toggleCategoryMenu = async (
  categoryId: string,
  isInMenu: boolean,
  accessToken: string
): Promise<Category> => {
  try {
    const response = await apiClient.patch(
      `/admin/categories/${categoryId}/menu`,
      { isInMenu },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to update menu visibility.")
    );
  }
};

// 6. Delete Category (Admin)
export const deleteCategory = async (
  categoryId: string,
  accessToken: string
) => {
  try {
    const response = await apiClient.delete(
      `/admin/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to delete category.")
    );
  }
};