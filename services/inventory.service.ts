import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const INVENTORY_URL = `${API_BASE_URL}/admin/inventory`;

const getHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }

  return "Something went wrong";
};

// Types

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type InventoryProduct = {
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
  status: "active" | "draft";
  colorName: string;
  colorHex: string;
  groupKey: string;
  sizes: string[];
  badgeText: string | null;
  ratingAvg: string;
  ratingCount: number;
  soldCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type InventoryItem = {
  productId: string;
  name: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  stockStatus: StockStatus;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type InventoryListResponse = {
  items: InventoryProduct[];
  meta: PaginationMeta;
};

export type StockMovement = {
  id: string;
  productId: string;
  type: "IN" | "OUT";
  reason: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  note: string | null;
  createdAt: string;
};

export type AdjustStockData = {
  type: "IN" | "OUT";
  quantity: number;
  reason: string;
  note?: string;
};

// 1. Get All Inventory

export const getAdminInventory = async (
  accessToken: string,
  page = 1,
  limit = 20,
  stockStatus?: StockStatus
): Promise<InventoryListResponse> => {
  try {
    const response = await axios.get(`${INVENTORY_URL}`, {
      headers: getHeaders(accessToken),
      params: {
        page,
        limit,
        ...(stockStatus && { stockStatus }),
      },
    });

    return {
      items: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 2. Get Low Stock Products

export const getLowStockInventory = async (
  accessToken: string
): Promise<InventoryProduct[]> => {
  try {
    const response = await axios.get(`${INVENTORY_URL}/low-stock`, {
      headers: getHeaders(accessToken),
    });

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 3. Get Out Of Stock Products

export const getOutOfStockInventory = async (
  accessToken: string
): Promise<InventoryProduct[]> => {
  try {
    const response = await axios.get(`${INVENTORY_URL}/out-of-stock`, {
      headers: getHeaders(accessToken),
    });

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 4. Get Single Product Inventory

export const getProductInventory = async (
  productId: string,
  accessToken: string
): Promise<InventoryItem> => {
  try {
    const response = await axios.get(
      `${INVENTORY_URL}/${productId}`,
      {
        headers: getHeaders(accessToken),
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 5. Update Low Stock Threshold

export const updateLowStockThreshold = async (
  productId: string,
  lowStockThreshold: number,
  accessToken: string
): Promise<InventoryProduct> => {
  try {
    const response = await axios.patch(
      `${INVENTORY_URL}/${productId}`,
      { lowStockThreshold },
      {
        headers: getHeaders(accessToken),
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 6. Increase / Decrease Stock

export const adjustInventoryStock = async (
  productId: string,
  data: AdjustStockData,
  accessToken: string
) => {
  try {
    const response = await axios.post(
      `${INVENTORY_URL}/${productId}/adjust`,
      data,
      {
        headers: getHeaders(accessToken),
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// 7. Get Stock Movement History

export const getStockMovements = async (
  productId: string,
  accessToken: string,
  page = 1,
  limit = 20
): Promise<{
  movements: StockMovement[];
  meta: PaginationMeta;
}> => {
  try {
    const response = await axios.get(
      `${INVENTORY_URL}/${productId}/movements`,
      {
        headers: getHeaders(accessToken),
        params: {
          page,
          limit,
        },
      }
    );

    return {
      movements: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};