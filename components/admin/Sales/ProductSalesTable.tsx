"use client";
import { JSX, useMemo, useState } from "react";
import { IconDownload, IconArrowDown } from "@tabler/icons-react";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

// rows = [{ name, category, price, units }]
export default function ProductSalesTable({ rows }: { rows: any[] }) {
  const [sortBy, setSortBy] = useState("revenue"); // revenue | units
  const data = useMemo(() => {
    const withRev = rows.map((r) => ({ ...r, revenue: r.units * r.price }));
    const total = withRev.reduce((s, r) => s + r.revenue, 0) || 1;
    return withRev
      .map((r) => ({ ...r, share: (r.revenue / total) * 100 }))
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [rows, sortBy]);

  const exportCsv = () => {
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [["Product", "Category", "Price", "Units sold", "Revenue"].join(",")]
      .concat(data.map((r) => [esc(r.name), esc(r.category), r.price, r.units, r.revenue].join(",")));
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "product-sales.csv" });
    a.click();
    URL.revokeObjectURL(url);
  };

  const th = (key: string, label: string): JSX.Element => (
    <th className="px-4 py-3 font-medium">
      <button onClick={() => setSortBy(key)} className={`inline-flex items-center gap-1 ${sortBy === key ? "text-[#0F7A5C]" : ""}`} aria-label={`${label} ke hisab se sort karo`}>
        {label} {sortBy === key && <IconArrowDown size={13} />}
      </button>
    </th>
  );

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Product-wise sales</h2>
          <p className="text-xs text-gray-400">Pichle 30 din</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg bg-[#E3F8F1] px-3 py-2 text-xs font-semibold text-[#0F7A5C] hover:bg-[#5FE0BC] hover:text-gray-900">
          <IconDownload size={16} /> Download CSV
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="px-4 py-3 font-medium">Product</th>
              {th("units", "Units")}
              {th("revenue", "Revenue")}
              <th className="px-4 py-3 font-medium">Share</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-gray-400">Abhi koi sale nahi hui.</td></tr>}
            {data.map((r) => (
              <tr key={r.name} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3"><p className="font-semibold text-gray-900">{r.name}</p><p className="text-xs text-gray-400">{r.category}</p></td>
                <td className="px-4 py-3 text-gray-700">{r.units}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{inr(r.revenue)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-gray-100"><div className="h-full rounded-full bg-[#5FE0BC]" style={{ width: `${r.share}%` }} /></div>
                    <span className="text-xs text-gray-500">{r.share.toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}