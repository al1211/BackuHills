import Link from "next/link";

// items = [{ name, stock, max }]
export default function LowStock({ items }) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Low Stock</h2>
        <Link href="/inventory" className="text-xs font-semibold text-[#0F7A5C] hover:underline">Inventory</Link>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {items.length === 0 && <li className="text-sm text-gray-400">Sab products ka stock theek hai.</li>}
        {items.map((p) => {
          const pct = Math.min(100, Math.round((p.stock / p.max) * 100));
          return (
            <li key={p.name}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-800">{p.name}</span>
                <span className={p.stock <= 3 ? "font-semibold text-red-500" : "text-gray-500"}>{p.stock} left</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-gray-100">
                <div className={`h-full rounded-full ${p.stock <= 3 ? "bg-red-400" : "bg-[#5FE0BC]"}`} style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}