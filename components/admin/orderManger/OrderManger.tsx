"use client";
import { useMemo, useState } from "react";
import { IconShoppingBag, IconClock, IconCircleCheck, IconCurrencyRupee, IconSearch } from "@tabler/icons-react";
import StatCard from "../StatCard";
import OrderDetail, { StatusBadge, inr, orderTotal, fmtDate, type Order, type OrderPatch, type Payment } from "./OrderDetail";

const TABS = ["All", "Pending", "Shipped", "Delivered", "Cancelled"] as const;
type Tab = (typeof TABS)[number];
type PayFilter = "all" | Payment;

export default function OrdersManager({ initial }: { initial: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initial);
  const [tab, setTab] = useState<Tab>("All");
  const [pay, setPay] = useState<PayFilter>("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const c: Record<Tab, number> = { All: orders.length, Pending: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach((o) => {
      c[o.status] += 1;
    });
    return c;
  }, [orders]);
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + orderTotal(o), 0);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (tab === "All" || o.status === tab) &&
        (pay === "all" || o.payment === pay) &&
        (!s || `${o.id} ${o.customer} ${o.phone}`.toLowerCase().includes(s))
    );
  }, [orders, tab, pay, q]);

  // TODO: yahan API call lagao (PATCH /api/orders/:id) — abhi sirf page ki memory me badalta hai
  const update = (id: number, patch: OrderPatch) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const open = orders.find((o) => o.id === openId);

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total orders" period="Sab orders" value={counts.All} icon={IconShoppingBag} />
        <StatCard title="Pending" period="Ship karne baaki" value={counts.Pending} icon={IconClock} />
        <StatCard title="Delivered" period="Pahunch gaye" value={counts.Delivered} icon={IconCircleCheck} />
        <StatCard title="Revenue" period="Cancelled chhodke" value={inr(revenue)} icon={IconCurrencyRupee} />
      </div>

      <div role="tablist" aria-label="Order status" className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${tab === t ? "bg-[#5FE0BC] text-gray-900 shadow-md shadow-[#5FE0BC]/40" : "bg-white text-gray-600 hover:bg-gray-100"}`}
          >
            {t} <span className="text-xs opacity-70">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 focus-within:border-[#5FE0BC]">
          <IconSearch size={18} />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Order ID, naam ya phone se dhundo"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </label>
        <select
          value={pay}
          onChange={(e) => setPay(e.target.value as PayFilter)}
          aria-label="Payment filter"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#5FE0BC] focus:outline-none"
        >
          <option value="all">COD + Prepaid</option>
          <option value="COD">Sirf COD</option>
          <option value="Prepaid">Sirf Prepaid</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Koi order nahi mila.</div>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((o) => (
                  <tr key={o.id} onClick={() => setOpenId(o.id)} className="cursor-pointer border-b border-gray-50 last:border-0 hover:bg-[#F7F9F8]">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      <button className="font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#5FE0BC]">#{o.id}</button>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{o.customer}</p>
                      <p className="text-xs text-gray-400">{o.city}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{fmtDate(o.date)}</td>
                    <td className="px-4 py-3 text-gray-600">{o.payment}</td>
                    <td className="px-4 py-3 text-gray-900">{inr(orderTotal(o))}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-3 md:hidden">
            {shown.map((o) => (
              <li key={o.id}>
                <button onClick={() => setOpenId(o.id)} className="w-full rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">#{o.id} · {o.customer}</p>
                      <p className="text-xs text-gray-400">{o.city} · {fmtDate(o.date)}</p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">{o.payment}</span>
                    <span className="font-semibold text-gray-900">{inr(orderTotal(o))}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {open && <OrderDetail key={open.id} order={open} onUpdate={(patch) => update(open.id, patch)} onClose={() => setOpenId(null)} />}
    </>
  );
}