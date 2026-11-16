// Ise apne app/sales/page.jsx me rakho.
// StatCard, SalesChart, DonutChart, BarList pehle wale pages ke hi components hain.
import { IconCurrencyRupee, IconWallet, IconPackage, IconReceiptRefund } from "@tabler/icons-react";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import DonutChart from "@/components/admin/analytics/DountChart";
import BarList from "@/components/admin/analytics/Barlist";
import ProductSalesTable from "@/components/admin/Sales/ProductSalesTable";

// ---- Dummy data: baad me yahan database / API se lao ----
const mk = (labels, base) => labels.map((label, i) => ({
  label, income: base + ((i * 7919) % 5000) + (i % 3) * 1800, orders: 8 + ((i * 13) % 17),
}));
const trend = {
  "7 days": mk(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 9000),
  "30 days": mk(Array.from({ length: 30 }, (_, i) => String(i + 1)), 7000),
  "12 months": mk(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 90000),
};

const products = [
  { name: "Casual Belt - Black", category: "Casual belts", price: 1999, units: 140 },
  { name: "Casual Belt - Rich Brown", category: "Casual belts", price: 1999, units: 118 },
  { name: "Casual Belt - Elegant Tan", category: "Casual belts", price: 1999, units: 76 },
  { name: "Casual Belt - Royal Blue", category: "Casual belts", price: 1999, units: 52 },
  { name: "Western Tooled Belt - Black", category: "Western belts", price: 2499, units: 98 },
  { name: "Western Tooled Belt - Brown", category: "Western belts", price: 2499, units: 71 },
];
const payments = [
  { label: "COD", value: 58, color: "#2FCB9F" },
  { label: "Prepaid (UPI / card)", value: 42, color: "#0F7A5C" },
];
const cities = [
  { label: "Delhi NCR", value: 214500 },
  { label: "Lucknow", value: 128000 },
  { label: "Kanpur", value: 96400 },
  { label: "Meerut", value: 71200 },
  { label: "Mumbai", value: 48900 },
];
const refunds = 9996;

export default function SalesPage() {
  const gross = products.reduce((s, p) => s + p.units * p.price, 0);
  const units = products.reduce((s, p) => s + p.units, 0);
  const inr = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <p className="text-sm text-gray-500">Pichle 30 din</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Gross sales" value={inr(gross)} change={8} icon={IconCurrencyRupee} />
        <StatCard title="Net sales" period="Refund ke baad" value={inr(gross - refunds)} change={7} icon={IconWallet} />
        <StatCard title="Units sold" value={units.toLocaleString("en-IN")} change={11} icon={IconPackage} />
        <StatCard title="Refunds" value={inr(refunds)} change={-2} icon={IconReceiptRefund} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><SalesChart data={trend} /></div>
        <DonutChart title="Payment method" items={payments} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2"><ProductSalesTable rows={products} /></div>
        <BarList title="Sales by city" note="Revenue" items={cities} format={inr} />
      </div>
    </div>
  );
}