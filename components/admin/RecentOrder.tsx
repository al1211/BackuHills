import Link from "next/link";

// Status ki strict types define ki hain taaki koi mismatch na ho
export type OrderStatus = "Delivered" | "Shipped" | "Pending" | "Cancelled";

export type Order = {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: OrderStatus;
};

interface RecentOrdersProps {
  orders: Order[];
}

const STATUS_CLASSES: Record<OrderStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-sky-50 text-sky-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-600",
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        <Link
          href="/orders"
          className="rounded-md bg-[#E3F8F1] px-3 py-1.5 text-xs font-semibold text-[#0F7A5C] hover:bg-[#5FE0BC] hover:text-gray-900"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="py-2 font-medium">Order</th>
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Amount</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  Abhi koi order nahi hai.
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 font-semibold text-gray-900">#{o.id}</td>
                <td className="py-3 text-gray-700">{o.customer}</td>
                <td className="py-3 text-gray-500">{o.date}</td>
                <td className="py-3 text-gray-900">₹{o.amount.toLocaleString("en-IN")}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      STATUS_CLASSES[o.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}