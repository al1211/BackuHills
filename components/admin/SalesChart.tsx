"use client";
import { useState } from "react";

const W = 600, H = 220, PAD = 16;

// Bina kisi library ke smooth area chart (pure SVG).
function smooth(pts: [number, number][]): string {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

// data = { "7 days": [{label, income, orders}], "30 days": [...], ... }
export default function SalesChart({ data }: { data: Record<string, { label: string; income: number; orders: number }[]> }) {
  const ranges = Object.keys(data);
  const [range, setRange] = useState(ranges[0]);
  const rows = data[range];

  const income = rows.reduce((s, r) => s + r.income, 0);
  const orders = rows.reduce((s, r) => s + r.orders, 0);
  const max = Math.max(...rows.map((r) => r.income)) * 1.15 || 1;
  const pts = rows.map((r, i) => [
    PAD + (i * (W - PAD * 2)) / Math.max(rows.length - 1, 1),
    H - PAD - (r.income / max) * (H - PAD * 2),
  ]);
  const line = smooth(pts as [number, number][]);
  const area = `${line} L${pts.at(-1)![0]!},${H} L${pts[0][0]},${H} Z`;
  const step = Math.ceil(rows.length / 8);

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">Sales Analytics</h2>
        <label className="flex items-center gap-2 text-xs text-gray-500">
          Sort by
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FE0BC]"
          >
            {ranges.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex gap-8">
        <div>
          <p className="text-xs text-gray-400">Income</p>
          <p className="text-xl font-bold text-gray-900">{inr(income)}</p>
        </div>
        <div className="border-l border-gray-100 pl-8">
          <p className="text-xs text-gray-400">Orders</p>
          <p className="text-xl font-bold text-gray-900">{orders.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-52 w-full" role="img" aria-label={`Income chart, ${range}`}>
          <defs>
            <linearGradient id="mint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5FE0BC" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5FE0BC" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#EEF1F0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill="url(#mint)" />
          <path d={line} fill="none" stroke="#2FCB9F" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="mt-1 flex justify-between text-[11px] text-gray-400">
          {rows.map((r, i) => (i % step === 0 ? <span key={i}>{r.label}</span> : <span key={i} />))}
        </div>
      </div>
    </section>
  );
}