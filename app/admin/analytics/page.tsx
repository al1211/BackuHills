// Ise apne app/analytics/page.jsx me rakho.
// StatCard aur SalesChart wahi hain jo dashboard me use kiye the.
import { IconEye, IconPercentage, IconReceipt2, IconRepeat } from "@tabler/icons-react";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import DonutChart from "@/components/admin/analytics/DountChart";
import BarList from "@/components/admin/analytics/Barlist";

// ---- Dummy data: baad me yahan API / database ka data lagao ----


const mk = (labels: string[], base: number) => labels.map((label, i) => ({
  label, income: base + ((i * 7919) % 5000) + (i % 3) * 1800, orders: 8 + ((i * 13) % 17),
}));
const sales = {
  "7 days": mk(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 9000),
  "30 days": mk(Array.from({ length: 30 }, (_, i) => String(i + 1)), 7000),
  "12 months": mk(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 90000),
};

const categories = [
  { label: "Casual belts", value: 52, color: "#5FE0BC" },
  { label: "Western belts", value: 28, color: "#2FCB9F" },
  { label: "Bags", value: 12, color: "#0F7A5C" },
  { label: "Other", value: 8, color: "#C9D3CF" },
];
const topProducts = [
  { label: "Casual Belt - Black", value: 412 },
  { label: "Casual Belt - Rich Brown", value: 318 },
  { label: "Western Tooled Belt - Black", value: 254 },
  { label: "Casual Belt - Elegant Tan", value: 197 },
  { label: "Casual Belt - Royal Blue", value: 126 },
];
const traffic = [
  { label: "Instagram", value: 4200 },
  { label: "Google search", value: 3100 },
  { label: "Direct", value: 1800 },
  { label: "WhatsApp", value: 950 },
  { label: "Facebook", value: 420 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Pichle 30 din ka performance</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Visitors" value="10,470" change={14} icon={IconEye} />
        <StatCard title="Conversion rate" value="3.2%" change={0.6} icon={IconPercentage} />
        <StatCard title="Avg. order value" value="₹2,140" change={-3} icon={IconReceipt2} />
        <StatCard title="Repeat customers" value="28%" change={5} icon={IconRepeat} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><SalesChart data={sales} /></div>
        <DonutChart title="Sales by category" items={categories} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BarList title="Top selling products" note="Units sold" items={topProducts} format={(v) => `${v} pcs`} />
        <BarList title="Traffic sources" note="Visitors" items={traffic} />
      </div>
    </div>
  );
}