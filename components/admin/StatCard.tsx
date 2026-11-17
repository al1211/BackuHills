import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

// change: number (jaise 11 ya -4). Poore-time numbers ke liye change mat do.
export default function StatCard({ title, value, period = "Last 30 days", change, icon: Icon }: { title: string | number; value: string | number; period?: string; change?: number; icon: React.ComponentType<{ size?: number; stroke?: number }> }) {
  const up = change! >= 0;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-700">{title}</p>
          <p className="text-xs text-gray-400">{period}</p>
        </div>
        {Icon && (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E3F8F1] text-[#0F7A5C]">
            <Icon size={22} stroke={1.7} />
          </span>
        )}
      </div>
      <div className="mt-5 flex items-end justify-between">
        <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
            {up ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}