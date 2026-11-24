import apiClient from "@/lib/api/client";

export type ProductStatus = "active" | "draft";

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  pricePaise: number;
  compareAtPricePaise: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  colorName: string;
  colorHex: string;
  groupKey: string;
  sizes: string[];
  badgeText: string;
  ratingAvg: string;
  ratingCount: number;
  soldCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductsResponse {
  products: ApiProduct[];
  meta: {
    total: number;
    totalPages: number | null;
  };
}

export interface CreateProductData {
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  pricePaise: number;
  compareAtPricePaise: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  colorName?: string;
  colorHex?: string;
  groupKey?: string;
  sizes?: string[];
  badgeText?: string;
}

export type UpdateProductData = Partial<CreateProductData>;

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

// GET all products
export const getAdminProducts = async (
  accessToken: string
): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get("/admin/products", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      products: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to fetch products.")
    );
  }
};

// GET single product
export const getAdminProduct = async (
  productId: string,
  accessToken: string
): Promise<ApiProduct> => {
  try {
    const response = await apiClient.get(
      `/admin/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to fetch product details.")
    );
  }
};

// POST create product
export const createProduct = async (
  data: CreateProductData,
  accessToken: string
): Promise<ApiProduct> => {
  try {
    const response = await apiClient.post(
      "/admin/products",
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
      getErrorMessage(error, "Unable to create product.")
    );
  }
};

// PATCH update product
export const updateProduct = async (
  productId: string,
  data: UpdateProductData,
  accessToken: string
): Promise<ApiProduct> => {
  try {
    const response = await apiClient.patch(
      `/admin/products/${productId}`,
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
      getErrorMessage(error, "Unable to update product.")
    );
  }
};

// DELETE product
export const deleteProduct = async (
  productId: string,
  accessToken: string
) => {
  try {
    const response = await apiClient.delete(
      `/admin/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Unable to delete product.")
    );
  }
};