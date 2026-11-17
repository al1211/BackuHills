"use client";
import { useMemo, useState } from "react";
import { IconBox, IconStack2, IconAlertTriangle, IconCurrencyRupee, IconSearch, IconMinus, IconPlus } from "@tabler/icons-react";
import StatCard from "../StatCard";
import StockModal, { type InventoryItem, type StockUpdate } from "./StockModal";

type StockStatus = "out" | "low" | "ok";
type StatusFilter = "all" | StockStatus;
type LogEntry = { key: number; name: string; change: number; reason: string; time: string };

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const statusOf = (p: InventoryItem): StockStatus => (p.stock === 0 ? "out" : p.stock <= p.reorderAt ? "low" : "ok");

const BADGE: Record<StockStatus, [string, string]> = {
  out: ["bg-red-50 text-red-600", "Out of stock"],
  low: ["bg-amber-50 text-amber-700", "Low stock"],
  ok: ["bg-emerald-50 text-emerald-700", "In stock"],
};

const Badge = ({ p }: { p: InventoryItem }) => {
  const [cls, text] = BADGE[statusOf(p)];
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{text}</span>;
};

export default function InventoryManager({ initial }: { initial: InventoryItem[] }) {
  const [items, setItems] = useState<InventoryItem[]>(initial);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [adjusting, setAdjusting] = useState<InventoryItem | null>(null);

  const totals = useMemo(
    () => ({
      skus: items.length,
      units: items.reduce((s, p) => s + p.stock, 0),
      attention: items.filter((p) => statusOf(p) !== "ok").length,
      value: items.reduce((s, p) => s + p.stock * p.price, 0),
    }),
    [items]
  );

  const shown = useMemo(
    () =>
      items.filter((p) => {
        const hit = `${p.name} ${p.sku}`.toLowerCase().includes(q.trim().toLowerCase());
        return hit && (filter === "all" || statusOf(p) === filter);
      }),
    [items, q, filter]
  );

  // TODO: yahan API call lagao (PUT /api/inventory/:id) — abhi sirf page ki memory me badalta hai
  const apply = ({ product, newStock, reason, reorderAt }: StockUpdate) => {
    const change = newStock - product.stock;
    setItems((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: newStock, reorderAt: reorderAt ?? p.reorderAt } : p)));
    if (change !== 0) {
      const time = new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
      setLog((prev) => [{ key: Date.now(), name: product.name, change, reason, time }, ...prev].slice(0, 8));
    }
    setAdjusting(null);
  };
  const quick = (p: InventoryItem, d: number) => {
    if (p.stock + d >= 0) apply({ product: p, newStock: p.stock + d, reason: "Quick adjust" });
  };

  const Stepper = ({ p }: { p: InventoryItem }) => (
    <div className="inline-flex items-center rounded-lg border border-gray-200">
      <button onClick={() => quick(p, -1)} disabled={p.stock === 0} aria-label={`${p.name} stock kam karo`} className="p-1.5 text-gray-500 hover:bg-gray-50 disabled:opacity-30"><IconMinus size={16} /></button>
      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-gray-900">{p.stock}</span>
      <button onClick={() => quick(p, 1)} aria-label={`${p.name} stock badhao`} className="p-1.5 text-gray-500 hover:bg-gray-50"><IconPlus size={16} /></button>
    </div>
  );
  const UpdateBtn = ({ p }: { p: InventoryItem }) => (
    <button onClick={() => setAdjusting(p)} className="rounded-lg bg-[#E3F8F1] px-3 py-1.5 text-xs font-semibold text-[#0F7A5C] hover:bg-[#5FE0BC] hover:text-gray-900">
      Update
    </button>
  );

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total products" period="SKUs" value={totals.skus} icon={IconBox} />
        <StatCard title="Total units" period="Sab products ka stock" value={totals.units.toLocaleString("en-IN")} icon={IconStack2} />
        <StatCard title="Needs restock" period="Low + out of stock" value={totals.attention} icon={IconAlertTriangle} />
        <StatCard title="Stock value" period="Selling price par" value={inr(totals.value)} icon={IconCurrencyRupee} />
      </div>

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
          onChange={(e) => setFilter(e.target.value as StatusFilter)}
          aria-label="Filter"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#5FE0BC] focus:outline-none"
        >
          <option value="all">Sab</option>
          <option value="ok">In stock</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Koi product nahi mila.</div>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Alert at</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {shown.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.sku || "No SKU"}</p>
                    </td>
                    <td className="px-4 py-3"><Stepper p={p} /></td>
                    <td className="px-4 py-3 text-gray-600">{p.reorderAt}</td>
                    <td className="px-4 py-3"><Badge p={p} /></td>
                    <td className="px-4 py-3 text-gray-900">{inr(p.stock * p.price)}</td>
                    <td className="px-4 py-3 text-right"><UpdateBtn p={p} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-3 md:hidden">
            {shown.map((p) => (
              <li key={p.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sku || "No SKU"} · Alert at {p.reorderAt}</p>
                  </div>
                  <Badge p={p} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Stepper p={p} />
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{inr(p.stock * p.price)}</span>
                    <UpdateBtn p={p} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <section className="mt-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Recent stock changes</h2>
        <ul className="mt-3 divide-y divide-gray-50">
          {log.length === 0 && <li className="py-3 text-sm text-gray-400">Abhi koi badlav nahi hua.</li>}
          {log.map((l) => (
            <li key={l.key} className="flex items-center gap-3 py-2.5 text-sm">
              <span className={`w-12 shrink-0 font-bold ${l.change > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {l.change > 0 ? "+" : ""}{l.change}
              </span>
              <span className="min-w-0 flex-1 truncate text-gray-800">
                {l.name}
                <span className="text-gray-400"> · {l.reason}</span>
              </span>
              <span className="shrink-0 text-xs text-gray-400">{l.time}</span>
            </li>
          ))}
        </ul>
      </section>

      {adjusting && <StockModal product={adjusting} onSave={apply} onClose={() => setAdjusting(null)} />}
    </>
  );
}