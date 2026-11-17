"use client";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

// Types yahin define hain; ProductsManager (aur baaki pages) yahin se import karte hain.
export type ProductStatus = "active" | "draft";

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  mrp: number; // 0 = koi discount nahi
  stock: number;
  status: ProductStatus;
  description: string;
};

// Naye product me id nahi hoti
export type ProductDraft = Omit<Product, "id"> & { id?: number };

// Form me number wale fields tab tak string rehte hain jab tak save na ho
type Draft = {
  id?: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  mrp: string;
  stock: string;
  status: ProductStatus;
  description: string;
};
type TextKey = "name" | "sku" | "category" | "price" | "mrp" | "stock" | "description";

type Props = {
  product?: Partial<Product>; // {} = naya product, poora product = edit
  onSave: (product: ProductDraft) => void;
  onClose: () => void;
};

// TODO: baad me ye list Categories page ke data se banao
export const CATEGORIES = ["Casual belts", "Western belts", "Bags", "Other"];

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export default function ProductForm({ product, onSave, onClose }: Props) {
  const isEdit = product?.id !== undefined;
  const [f, setF] = useState<Draft>(() => ({
    id: product?.id,
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    category: product?.category ?? CATEGORIES[0],
    price: product?.price !== undefined ? String(product.price) : "",
    mrp: product?.mrp ? String(product.mrp) : "",
    stock: product?.stock !== undefined ? String(product.stock) : "",
    status: product?.status ?? "active",
    description: product?.description ?? "",
  }));
  const [error, setError] = useState("");

  const set = (k: TextKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = f.name.trim();
    const price = Number(f.price);
    const mrp = Number(f.mrp || 0);
    const stock = Number(f.stock || 0);
    if (!name) return setError("Product ka naam likho.");
    if (!(price > 0)) return setError("Price 0 se zyada honi chahiye.");
    if (mrp && mrp < price) return setError("MRP, price se kam nahi ho sakta.");
    if (stock < 0) return setError("Stock negative nahi ho sakta.");
    onSave({ id: f.id, name, sku: f.sku.trim(), category: f.category, price, mrp, stock, status: f.status, description: f.description });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit product" : "Add product"}
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">{isEdit ? "Edit product" : "Add product"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
            <IconX size={20} />
          </button>
        </div>

        <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
          <Field label="Product name" className="sm:col-span-2">
            <input className={input} value={f.name} onChange={set("name")} autoFocus />
          </Field>
          <Field label="SKU">
            <input className={input} value={f.sku} onChange={set("sku")} />
          </Field>
          <Field label="Category">
            <select className={input} value={f.category} onChange={set("category")}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Price (₹)">
            <input className={input} type="number" min="0" inputMode="numeric" value={f.price} onChange={set("price")} />
          </Field>
          <Field label="MRP (₹) — optional">
            <input className={input} type="number" min="0" inputMode="numeric" value={f.mrp} onChange={set("mrp")} />
          </Field>
          <Field label="Stock">
            <input className={input} type="number" min="0" inputMode="numeric" value={f.stock} onChange={set("stock")} />
          </Field>
          <Field label="Status">
            <select className={input} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as ProductStatus })}>
              <option value="active">Active</option>
              <option value="draft">Draft (store par nahi dikhega)</option>
            </select>
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea className={input} rows={4} value={f.description} onChange={set("description")} />
          </Field>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <span className="min-w-0 flex-1 text-sm text-red-600" role="alert">{error}</span>
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">
            Save product
          </button>
        </div>
      </form>
    </div>
  );
}