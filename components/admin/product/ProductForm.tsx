"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { IconX } from "@tabler/icons-react";


import { useAdminAuthStore } from "@/store/admin.auth.store";
import { AdminAuthState } from "@/app/types";
import {
  getAdminCategories,
  type Category,
} from "@/services/category.service";
// Product types
export type ProductStatus = "active" | "draft";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryId: string;
  price: number;
  mrp: number;
  stock: number;
  status: ProductStatus;
  description: string;
  lowStockThreshold?: number;
};

// New product ke liye ID optional hai
export type ProductDraft = Omit<Product, "id"> & {
  id?: string;
};

// Form state
type Draft = {
  id?: string;
  name: string;
  sku: string;
  categoryId: string;
  price: string;
  mrp: string;
  stock: string;
  status: ProductStatus;
  description: string;
};

type TextKey =
  | "name"
  | "sku"
  | "categoryId"
  | "price"
  | "mrp"
  | "stock"
  | "description";

type Props = {
  product?: Partial<Product>;
  onSave: (product: ProductDraft) => void;
  onClose: () => void;
};

const input =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

// Reusable Field component
function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export default function ProductForm({
  product,
  onSave,
  onClose,
}: Props) {
  const isEdit = product?.id !== undefined;

  // Admin token
  const accessToken = useAdminAuthStore(
    (state: AdminAuthState) => state.accessToken
  );

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  // Form state
  const [f, setF] = useState<Draft>(() => ({
    id: product?.id,
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    categoryId: product?.categoryId ?? "",
    price:
      product?.price !== undefined
        ? String(product.price)
        : "",
    mrp:
      product?.mrp !== undefined
        ? String(product.mrp)
        : "",
    stock:
      product?.stock !== undefined
        ? String(product.stock)
        : "",
    status: product?.status ?? "active",
    description: product?.description ?? "",
  }));

  const [error, setError] = useState("");

  // Categories API se fetch karna
  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      if (!accessToken) {
        setCategoryError("Admin login required.");
        setCategoriesLoading(false);
        return;
      }

      try {
        setCategoriesLoading(true);
        setCategoryError("");

        const data : Category[] = await getAdminCategories(accessToken);

        if (!isMounted) return;

        setCategories(data);

        // New product ke liye first category select karna
        if (!product?.categoryId && data.length > 0) {
          setF((prev) => ({
            ...prev,
            categoryId: data[0].id,
          }));
        }
      } catch (err) {
        if (!isMounted) return;

        console.error("Categories fetch error:", err);
        setCategoryError("Categories load nahi ho paayi.");
      } finally {
        if (isMounted) {
          setCategoriesLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [accessToken, product?.categoryId]);

  // Input fields update karna
  const set = (key: TextKey) => (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value = e.target.value;

    setF((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError("");
  };

  // Escape key se modal close karna
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Form submit
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const name = f.name.trim();
    const sku = f.sku.trim();

    const price = Number(f.price);
    const mrp = Number(f.mrp || 0);
    const stock = Number(f.stock || 0);

    // Validation
    if (!name) {
      return setError("Product ka naam likho.");
    }

    if (!f.price || !Number.isFinite(price) || price <= 0) {
      return setError("Price 0 se zyada honi chahiye.");
    }

    if (!Number.isFinite(mrp) || mrp < 0) {
      return setError("Valid MRP enter karo.");
    }

    if (mrp > 0 && mrp < price) {
      return setError("MRP, price se kam nahi ho sakta.");
    }

    if (
      !Number.isInteger(stock) ||
      !Number.isFinite(stock) ||
      stock < 0
    ) {
      return setError("Valid stock quantity enter karo.");
    }

    if (!f.categoryId) {
      return setError("Category select karo.");
    }

    const selectedCategory = categories.find(
      (category) => category.id === f.categoryId
    );

    if (!selectedCategory) {
      return setError("Valid category select karo.");
    }

    // Parent component ko product data bhejna
    onSave({
      id: f.id,
      name,
      sku,
      category: selectedCategory.name,
      categoryId: f.categoryId,
      price,
      mrp,
      stock,
      status: f.status,
      description: f.description.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit product" : "Add product"}
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {isEdit ? "Edit product" : "Add product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form fields */}
        <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
          <Field
            label="Product name"
            className="sm:col-span-2"
          >
            <input
              className={input}
              value={f.name}
              onChange={set("name")}
              placeholder="Enter product name"
              required
              autoFocus
            />
          </Field>

          <Field label="SKU">
            <input
              className={input}
              value={f.sku}
              onChange={set("sku")}
              placeholder="Enter SKU"
            />
          </Field>

          {/* Dynamic categories */}
          <Field label="Category">
            <select
              className={input}
              value={f.categoryId}
              onChange={set("categoryId")}
              disabled={categoriesLoading || categories.length === 0}
              required
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select category"}
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {categoryError && (
              <span className="text-xs text-red-600">
                {categoryError}
              </span>
            )}

            {!categoriesLoading &&
              !categoryError &&
              categories.length === 0 && (
                <span className="text-xs text-red-600">
                  Pehle Categories page par category create karo.
                </span>
              )}
          </Field>

          <Field label="Price (₹)">
            <input
              className={input}
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={f.price}
              onChange={set("price")}
              placeholder="Enter price"
              required
            />
          </Field>

          <Field label="MRP (₹) — optional">
            <input
              className={input}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={f.mrp}
              onChange={set("mrp")}
              placeholder="Enter MRP"
            />
          </Field>

          <Field label="Stock">
            <input
              className={input}
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={f.stock}
              onChange={set("stock")}
              placeholder="Enter stock quantity"
            />
          </Field>

          <Field label="Status">
            <select
              className={input}
              value={f.status}
              onChange={(e) =>
                setF((prev) => ({
                  ...prev,
                  status: e.target.value as ProductStatus,
                }))
              }
            >
              <option value="active">Active</option>
              <option value="draft">
                Draft (store par nahi dikhega)
              </option>
            </select>
          </Field>

          <Field
            label="Description"
            className="sm:col-span-2"
          >
            <textarea
              className={input}
              rows={4}
              value={f.description}
              onChange={set("description")}
              placeholder="Enter product description"
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <span
            className="min-w-0 flex-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={categoriesLoading || categories.length === 0}
            className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? "Update product" : "Save product"}
          </button>
        </div>
      </form>
    </div>
  );
}