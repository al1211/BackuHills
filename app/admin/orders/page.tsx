// Ise app/(admin)/orders/page.tsx me rakho (ya jahan aapka orders page hai).
// StatCard dashboard wala hi use hota hai.
import OrdersManager from "@/components/admin/orderManger/OrderManger";
import type { Order } from "@/components/admin/orderManger/OrderDetail";

// ---- Dummy data: baad me yahan database / Shopify API se orders lao ----
// `Order[]` likhna zaroori hai: iske bina TypeScript "COD" aur "Pending" ko sirf string samajhta hai
// aur Payment / OrderStatus wale type se mel nahi khaata.
const orders: Order[] = [
  { id: 1045, customer: "Rohit Sharma", phone: "9876500011", city: "Meerut", address: "12, Shastri Nagar, Meerut, UP 250003", date: "2026-11-14", payment: "COD", status: "Pending", shipping: 0, items: [{ name: "Casual Belt - Black", qty: 1, price: 1999 }] },
  { id: 1044, customer: "Aman Verma", phone: "9876500022", city: "Lucknow", address: "45, Gomti Nagar, Lucknow, UP 226010", date: "2026-11-14", payment: "Prepaid", status: "Shipped", tracking: "SR48201934", shipping: 0, items: [{ name: "Western Tooled Belt - Black", qty: 1, price: 2499 }] },
  { id: 1043, customer: "Suresh Gupta", phone: "9876500033", city: "Kanpur", address: "7, Civil Lines, Kanpur, UP 208001", date: "2026-11-13", payment: "Prepaid", status: "Delivered", tracking: "SR48199120", shipping: 0, items: [{ name: "Casual Belt - Rich Brown", qty: 2, price: 1999 }] },
  { id: 1042, customer: "Imran Khan", phone: "9876500044", city: "Delhi", address: "B-21, Laxmi Nagar, Delhi 110092", date: "2026-11-13", payment: "COD", status: "Delivered", tracking: "SR48197755", shipping: 0, items: [{ name: "Casual Belt - Elegant Tan", qty: 1, price: 1999 }] },
  { id: 1041, customer: "Neha Singh", phone: "9876500055", city: "Noida", address: "Sector 62, Noida, UP 201301", date: "2026-11-12", payment: "Prepaid", status: "Cancelled", shipping: 0, items: [{ name: "Western Tooled Belt - Black", qty: 1, price: 2499 }] },
  { id: 1040, customer: "Vikas Tyagi", phone: "9876500066", city: "Meerut", address: "Abu Lane, Meerut, UP 250001", date: "2026-11-12", payment: "COD", status: "Pending", shipping: 150, items: [{ name: "Casual Belt - Royal Blue", qty: 1, price: 399 }] },
];

export default function OrdersPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      <OrdersManager initial={orders} />
    </div>
  );
}