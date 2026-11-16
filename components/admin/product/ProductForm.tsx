"use client";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

export const CATEGORIES = ["Casual belts", "Western belts", "Bags", "Other"];
const EMPTY = { name: "", sku: "", category: CATEGORIES[0], price: "", mrp: "", stock: "", status: "active", description: "" };

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

// product = {} naya product, ya existing product edit karne ke liye
export default function ProductForm({ product, onSave, onClose }) {
  const [f, setF] = useState({ ...EMPTY, ...product });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    const price = Number(f.price), mrp = Number(f.mrp || 0), stock = Number(f.stock || 0);
    if (!f.name.trim()) return setError("Product ka naam likho.");
    if (!(price > 0)) return setError("Price 0 se zyada honi chahiye.");
    if (mrp && mrp < price) return setError("MRP, price se kam nahi ho sakta.");
    if (stock < 0) return setError("Stock negative nahi ho sakta.");
    onSave({ ...f, name: f.name.trim(), price, mrp, stock });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-label={product?.id ? "Edit product" : "Add product"}
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">{product?.id ? "Edit product" : "Add product"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"><IconX size={20} /></button>
        </div>

        <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
          <Field label="Product name" className="sm:col-span-2">
            <input className={input} value={f.name} onChange={set("name")} autoFocus />
          </Field>
          <Field label="SKU"><input className={input} value={f.sku} onChange={set("sku")} /></Field>
          <Field label="Category">
            <select className={input} value={f.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)"><input className={input} type="number" min="0" inputMode="numeric" value={f.price} onChange={set("price")} /></Field>
          <Field label="MRP (₹) — optional"><input className={input} type="number" min="0" inputMode="numeric" value={f.mrp} onChange={set("mrp")} /></Field>
          <Field label="Stock"><input className={input} type="number" min="0" inputMode="numeric" value={f.stock} onChange={set("stock")} /></Field>
          <Field label="Status">
            <select className={input} value={f.status} onChange={set("status")}>
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
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">Save product</button>
        </div>
      </form>
    </div>
  );
}