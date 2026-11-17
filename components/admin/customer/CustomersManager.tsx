"use client";
import { useMemo, useState } from "react";
import { IconUsers, IconUserPlus, IconRepeat, IconCurrencyRupee, IconSearch } from "@tabler/icons-react";
import StatCard from "../StatCard";
import CustomerDetail, { Avatar } from "./CustomerDetails";
import { inr, fmtDate } from "../orderManger/OrderDetail";

// Cancelled orders ginti me nahi aate
const statsOf = (c: any) => {
  const done = c.orders.filter((o: any) => o.status !== "Cancelled");
  return { count: done.length, spent: done.reduce((s: number, o: any) => s + o.amount, 0), last: done.map((o: any   ) => o.date).sort().at(-1) || "" };
};
const FILTERS = [["all", "Sab"], ["repeat", "Repeat (2+ orders)"], ["new", "New (1 order)"], ["flagged", "Flagged"]];
const SORTS = [["recent", "Latest order"], ["spent", "Sabse zyada kharch"], ["orders", "Sabse zyada orders"], ["name", "Naam (A-Z)"]];

export default function CustomersManager({ initial }: { initial: any [] }) {
  const [customers, setCustomers] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [openId, setOpenId] = useState(null);

  const rows = useMemo(() => customers.map((c) => ({ c, s: statsOf(c) })), [customers]);

  const summary = useMemo(() => {
    const buyers = rows.filter((r) => r.s.count > 0);
    const since = typeof window !== "undefined" ? Date.now() - 30 * 864e5 : 0;
    return {
      total: rows.length,
      fresh: rows.filter((r) => new Date(r.c.joined).getTime() >= since).length,
      repeat: rows.length ? Math.round((rows.filter((r) => r.s.count >= 2).length / rows.length) * 100) : 0,
      ltv: buyers.length ? buyers.reduce((s, r) => s + r.s.spent, 0) / buyers.length : 0,
    };
  }, [rows]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows
      .filter(({ c, s: st }) =>
        (!s || `${c.name} ${c.phone} ${c.email} ${c.city}`.toLowerCase().includes(s)) &&
        (filter === "all" || (filter === "repeat" && st.count >= 2) || (filter === "new" && st.count === 1) || (filter === "flagged" && c.flagged)))
      .sort((a, b) =>
        sort === "spent" ? b.s.spent - a.s.spent
        : sort === "orders" ? b.s.count - a.s.count
        : sort === "name" ? a.c.name.localeCompare(b.c.name)
        : b.s.last.localeCompare(a.s.last));
  }, [rows, q, filter, sort]);

  // TODO: yahan API call lagao (PATCH /api/customers/:id) — abhi sirf page ki memory me badalta hai
  const update = (id: string, patch: any): void => setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const open = rows.find((r) => r.c.id === openId);

  const sel = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#5FE0BC] focus:outline-none";

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total customers" period="All time" value={summary.total} icon={IconUsers} />
        <StatCard title="New customers" period="Last 30 days" value={summary.fresh} icon={IconUserPlus} />
        <StatCard title="Repeat customers" period="2+ orders" value={`${summary.repeat}%`} icon={IconRepeat} />
        <StatCard title="Avg. lifetime value" period="Har customer ka kharch" value={inr(summary.ltv)} icon={IconCurrencyRupee} />
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 focus-within:border-[#5FE0BC]">
          <IconSearch size={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Naam, phone, email ya city se dhundo"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
        </label>
        <div className="flex gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter" className={`${sel} flex-1`}>{FILTERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className={`${sel} flex-1`}>{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Koi customer nahi mila.</div>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400">
                  <th className="px-4 py-3 font-medium">Customer</th><th className="px-4 py-3 font-medium">City</th>
                  <th className="px-4 py-3 font-medium">Orders</th><th className="px-4 py-3 font-medium">Total spent</th>
                  <th className="px-4 py-3 font-medium">Last order</th>
                </tr>
              </thead>
              <tbody>
                {shown.map(({ c, s }) => (
                  <tr key={c.id} onClick={() => setOpenId(c.id)} className="cursor-pointer border-b border-gray-50 last:border-0 hover:bg-[#F7F9F8]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} />
                        <div className="min-w-0">
                          <button className="flex items-center gap-2 font-semibold text-gray-900 hover:underline focus-visible:outline-2 focus-visible:outline-[#5FE0BC]">
                            {c.name}{c.flagged && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">Flagged</span>}
                          </button>
                          <p className="text-xs text-gray-400">{c.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.city}</td>
                    <td className="px-4 py-3 text-gray-900">{s.count}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{inr(s.spent)}</td>
                    <td className="px-4 py-3 text-gray-500">{s.last ? fmtDate(s.last) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-3 md:hidden">
            {shown.map(({ c, s }) => (
              <li key={c.id}>
                <button onClick={() => setOpenId(c.id)} className="w-full rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 font-semibold text-gray-900">{c.name}{c.flagged && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">Flagged</span>}</p>
                      <p className="text-xs text-gray-400">{c.city} · {c.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">{s.count} order{s.count !== 1 && "s"}</span>
                    <span className="font-semibold text-gray-900">{inr(s.spent)}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {open && <CustomerDetail key={open.c.id} customer={open.c} stats={open.s} onUpdate={(patch: any) => update(open.c.id, patch)} onClose={() => setOpenId(null)} />}
    </>
  );
}