"use client";

import { useEffect, useMemo, useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

import ProductForm, {
  type Product,
  type ProductDraft,
  type ProductStatus,
} from "./ProductForm";

import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type ApiProduct,
  type CreateProductData,
} from "@/services/product.service";

import { getAdminCategories } from "@/services/category.service";
import { useAdminAuthStore } from "@/store/admin.auth.store";

type Filter = "all" | ProductStatus | "low";

const inr = (n: number) =>
  "₹" + Number(n).toLocaleString("en-IN");

function StockBadge({ stock }: { stock: number }) {
  const [cls, text] =
    stock === 0
      ? ["bg-red-50 text-red-600", "Out of stock"]
      : stock <= 5
        ? ["bg-amber-50 text-amber-700", `Low: ${stock} left`]
        : ["bg-emerald-50 text-emerald-700", `${stock} in stock`];

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      {text}
    </span>
  );
}

const StatusBadge = ({ status }: { status: ProductStatus }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
      status === "active"
        ? "bg-[#E3F8F1] text-[#0F7A5C]"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {status === "active" ? "Active" : "Draft"}
  </span>
);

const Thumb = ({ name }: { name: string }) => (
  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#E3F8F1] text-sm font-bold text-[#0F7A5C]">
    {name.charAt(0)}
  </span>
);

// API product ko frontend product mein convert karna
function mapApiProduct(
  product: ApiProduct,
  categoryMap: Map<string, string>
): Product {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku ?? "",
    category:
      categoryMap.get(product.categoryId) ?? "Uncategorized",
    categoryId: product.categoryId,
    price: product.pricePaise / 100,
    mrp: product.compareAtPricePaise / 100,
    stock: product.stock,
    status: product.status,
    description: product.description ?? "",
    lowStockThreshold: product.lowStockThreshold,
  };
}

// Product name se URL slug banana
function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Frontend product ko backend payload mein convert karna
function mapProductPayload(
  product: ProductDraft,
  lowStockThreshold = 10
): CreateProductData {
  return {
    name: product.name,
    slug: createSlug(product.name),
    sku: product.sku,
    description: product.description,
    categoryId: product.categoryId,

    // Rupees ko paise mein convert karna
    pricePaise: Math.round(product.price * 100),
    compareAtPricePaise: Math.round(product.mrp * 100),

    stock: product.stock,
    lowStockThreshold,
    status: product.status,
  };
}

export default function ProductsManager({
  initial,
}: {
  initial: Product[];
}) {
  const accessToken = useAdminAuthStore(
    (state) => state.accessToken
  );

  const [items, setItems] = useState<Product[]>(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<Partial<Product> | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Products aur categories backend se fetch karna
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      if (!accessToken) {
        setError("Admin login required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [productsResponse, categories] = await Promise.all([
          getAdminProducts(accessToken),
          getAdminCategories(accessToken),
        ]);

        if (!isMounted) return;

        const categoryMap = new Map(
          categories.map((category) => [
            category.id,
            category.name,
          ])
        );

        const formattedProducts = productsResponse.products.map(
          (product) => mapApiProduct(product, categoryMap)
        );

        setItems(formattedProducts);
      } catch (err) {
        console.error("Products fetch error:", err);

        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Products load nahi ho paaye."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  // Search aur filters
  const shown = useMemo(
    () =>
      items.filter((p) => {
        const hit = `${p.name} ${p.sku}`
          .toLowerCase()
          .includes(q.trim().toLowerCase());

        const ok =
          filter === "all" ||
          (filter === "low"
            ? p.stock <= 5
            : p.status === filter);

        return hit && ok;
      }),
    [items, q, filter]
  );

  // Add aur Edit API
  const save = async (p: ProductDraft) => {
    if (!accessToken) {
      alert("Admin login required.");
      return;
    }

    try {
      setError("");

      if (p.id) {
        // Existing product ka low stock threshold preserve karna
        const existingProduct = items.find(
          (item) => item.id === p.id
        );

        const payload = mapProductPayload(
          p,
          existingProduct?.lowStockThreshold ?? 10
        );

        await updateProduct(p.id, payload, accessToken);
      } else {
        const payload = mapProductPayload(p);

        await createProduct(payload, accessToken);
      }

      // Save ke baad latest products fetch karna
      const [productsResponse, categories] = await Promise.all([
        getAdminProducts(accessToken),
        getAdminCategories(accessToken),
      ]);

      const categoryMap = new Map(
        categories.map((category) => [
          category.id,
          category.name,
        ])
      );

      setItems(
        productsResponse.products.map((product) =>
          mapApiProduct(product, categoryMap)
        )
      );

      setEditing(null);
    } catch (err) {
      console.error("Product save error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Product save nahi ho paaya."
      );
    }
  };

  // Delete API
  const remove = async (p: Product) => {
    if (!accessToken) {
      alert("Admin login required.");
      return;
    }

    if (!confirm(`"${p.name}" delete karna hai?`)) {
      return;
    }

    try {
      await deleteProduct(p.id, accessToken);

      setItems((prev) =>
        prev.filter((item) => item.id !== p.id)
      );
    } catch (err) {
      console.error("Product delete error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Product delete nahi ho paaya."
      );
    }
  };

  const Actions = ({ p }: { p: Product }) => (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setEditing(p)}
        aria-label={`Edit ${p.name}`}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      >
        <IconPencil size={18} />
      </button>

      <button
        onClick={() => remove(p)}
        aria-label={`Delete ${p.name}`}
        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
      >
        <IconTrash size={18} />
      </button>
    </div>
  );

  return (
    <>
      {/* Toolbar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 focus-within:border-[#5FE0BC]">
          <IconSearch size={18} />

          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Naam ya SKU se dhundo"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </label>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as Filter)
          }
          aria-label="Filter"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#5FE0BC] focus:outline-none"
        >
          <option value="all">Sab products</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="low">Low stock</option>
        </select>

        <button
          onClick={() => setEditing({})}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 hover:bg-[#4fd3ae]"
        >
          <IconPlus size={18} /> Add product
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {shown.length} of {items.length} products
      </p>

      {loading ? (
        <div className="mt-3 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">
          Loading products...
        </div>
      ) : error ? (
        <div className="mt-3 rounded-xl border border-red-100 bg-white p-10 text-center text-sm text-red-600">
          {error}
        </div>
      ) : shown.length === 0 ? (
        <div className="mt-3 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">
          Koi product nahi mila.
        </div>
      ) : (
        <>
          {/* Desktop / tablet: table */}
          <div className="mt-3 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-180 text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400">
                  <th className="px-4 py-3 font-medium">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Price
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Stock
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>

              <tbody>
                {shown.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb name={p.name} />

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">
                            {p.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {p.sku || "No SKU"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {p.category}
                    </td>

                    <td className="px-4 py-3 text-gray-900">
                      {inr(p.price)}

                      {p.mrp > p.price && (
                        <span className="ml-1.5 text-xs text-gray-400 line-through">
                          {inr(p.mrp)}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <StockBadge stock={p.stock} />
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>

                    <td className="px-4 py-3">
                      <Actions p={p} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <ul className="mt-3 flex flex-col gap-3 md:hidden">
            {shown.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Thumb name={p.name} />

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">
                      {p.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {p.sku || "No SKU"} · {p.category}
                    </p>
                  </div>

                  <StatusBadge status={p.status} />
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {inr(p.price)}

                      {p.mrp > p.price && (
                        <span className="ml-1.5 text-xs font-normal text-gray-400 line-through">
                          {inr(p.mrp)}
                        </span>
                      )}
                    </p>

                    <div className="mt-1">
                      <StockBadge stock={p.stock} />
                    </div>
                  </div>

                  <Actions p={p} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {editing && (
        <ProductForm
          product={editing}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}