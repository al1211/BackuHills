// Ise apne app/dashboard/page.jsx me rakho. Components ka path apne project ke hisab se badlo.
import { IconBox, IconShoppingBag, IconCurrencyRupee, IconUsers } from "@tabler/icons-react";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import RecentOrders from "@/components/admin/RecentOrder";
import LowStock from "@/components/admin/LowStock";

// ---- Dummy data: baad me yahan API / database ka data lagao ----
const stats = { products: 48, orders: 1645, revenue: 826500, customers: 932 };

const mk = (labels, base) => labels.map((label, i) => ({
  label, income: base + ((i * 7919) % 5000) + (i % 3) * 1800, orders: 8 + ((i * 13) % 17),
}));
const sales = {
  "7 days": mk(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 9000),
  "30 days": mk(Array.from({ length: 30 }, (_, i) => String(i + 1)), 7000),
  "12 months": mk(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 90000),
};

const orders = [
  { id: 1045, customer: "Rohit Sharma", date: "14 Nov", amount: 1999, status: "Pending" },
  { id: 1044, customer: "Aman Verma", date: "14 Nov", amount: 2499, status: "Shipped" },
  { id: 1043, customer: "Suresh Gupta", date: "13 Nov", amount: 3998, status: "Delivered" },
  { id: 1042, customer: "Imran Khan", date: "13 Nov", amount: 1999, status: "Delivered" },
  { id: 1041, customer: "Neha Singh", date: "12 Nov", amount: 2499, status: "Cancelled" },
];
const lowStock = [
  { name: "Western Tooled Belt - Black", stock: 2, max: 20 },
  { name: "Casual Belt - Royal Blue", stock: 5, max: 50 },
  { name: "Casual Belt - Elegant Tan", stock: 9, max: 50 },
];

export default function DashboardPage() {
  const fmt = (n) => n.toLocaleString("en-IN");
  return (
    <div className="min-h-full bg-[#F7F9F8] p-6">
      <h1 className="text-2xl font-bold text-gray-900">Overview</h1>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" period="All time" value={fmt(stats.products)} icon={IconBox} />
        <StatCard title="Total Orders" value={fmt(stats.orders)} change={11} icon={IconShoppingBag} />
        <StatCard title="Total Revenue" value={`₹${fmt(stats.revenue)}`} change={8} icon={IconCurrencyRupee} />
        <StatCard title="Total Customers" period="All time" value={fmt(stats.customers)} icon={IconUsers} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><SalesChart data={sales} /></div>
        <LowStock items={lowStock} />
      </div>

      <div className="mt-4"><RecentOrders orders={orders} /></div>
    </div>
  );
}