"use client";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

// Types yahin define hain; InventoryManager yahin se import karta hai.
export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  reorderAt: number; // itne ya kam bache to "Low stock"
};

export type StockUpdate = {
  product: InventoryItem;
  newStock: number;
  reason: string;
  reorderAt?: number;
};

type Mode = "add" | "remove" | "set";

type Props = {
  product: InventoryItem;
  onSave: (update: StockUpdate) => void;
  onClose: () => void;
};

const REASONS = ["Restock (naya maal aaya)", "Offline sale", "Damaged / kharab", "Customer return", "Stock count correction"];
const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

export default function StockModal({ product, onSave, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("add");
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [reorderAt, setReorderAt] = useState(String(product.reorderAt));
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const n = Number(qty);
  const next = mode === "add" ? product.stock + n : mode === "remove" ? product.stock - n : n;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (qty === "" || !Number.isInteger(n) || n < 0) return setError("Quantity sahi number me likho.");
    if (next < 0) return setError(`Itna stock nahi hai. Abhi sirf ${product.stock} bache hain.`);
    onSave({ product, newStock: next, reason, reorderAt: Number(reorderAt) || 0 });
  };

  const tab = (m: Mode, label: string) => (
    <button
      type="button"
      onClick={() => {
        setMode(m);
        setError("");
      }}
      aria-pressed={mode === m}
      className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${mode === m ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
    >
      {label}
    </button>
  );

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
        aria-label="Update stock"
        className="flex max-h-[92dvh] w-full max-w-md flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Update stock</h2>
            <p className="text-sm text-gray-500">{product.name} · abhi {product.stock} bache hain</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-5">
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {tab("add", "Add")}
            {tab("remove", "Remove")}
            {tab("set", "Set exact")}
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">{mode === "set" ? "Naya stock" : "Quantity"}</span>
            <input className={input} type="number" min="0" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} autoFocus />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Wajah</span>
            <select className={input} value={reason} onChange={(e) => setReason(e.target.value)}>
              {REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Low-stock alert tab aaye jab stock itna ho jaaye</span>
            <input className={input} type="number" min="0" inputMode="numeric" value={reorderAt} onChange={(e) => setReorderAt(e.target.value)} />
          </label>
          {qty !== "" && next >= 0 && (
            <p className="rounded-lg bg-[#E3F8F1] px-3 py-2 text-sm text-[#0F7A5C]">
              Update ke baad stock: <strong>{next}</strong>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <span className="min-w-0 flex-1 text-sm text-red-600" role="alert">{error}</span>
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}