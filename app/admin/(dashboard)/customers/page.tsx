// Ise apne app/customer/page.jsx me rakho (sidebar ka link /customer hai).
// StatCard dashboard se, aur OrderDetail (StatusBadge, inr, fmtDate) Orders page se aate hain.
import CustomersManager from "@/components/admin/customer/CustomersManager";

// ---- Dummy data: baad me yahan database / API se customers lao ----
const o = (id: number, date: string, amount: number, status = "Delivered") => ({ id, date, amount, status });
const customers = [
  { id: 1, name: "Rohit Sharma", phone: "9876500011", email: "rohit@example.com", city: "Meerut", joined: "2026-11-14", notes: "", flagged: false, orders: [o(1045, "2026-11-14", 1999, "Pending")] },
  { id: 2, name: "Aman Verma", phone: "9876500022", email: "", city: "Lucknow", joined: "2026-08-02", notes: "Western belts pasand hain.", flagged: false, orders: [o(1044, "2026-11-14", 2499, "Shipped"), o(912, "2026-08-02", 2499)] },
  { id: 3, name: "Suresh Gupta", phone: "9876500033", email: "suresh@example.com", city: "Kanpur", joined: "2026-03-18", notes: "Size 38.", flagged: false, orders: [o(1043, "2026-11-13", 3998), o(701, "2026-06-20", 1999), o(455, "2026-03-18", 1999)] },
  { id: 4, name: "Imran Khan", phone: "9876500044", email: "", city: "Delhi", joined: "2026-11-05", notes: "", flagged: false, orders: [o(1042, "2026-11-13", 1999)] },
  { id: 5, name: "Neha Singh", phone: "9876500055", email: "neha@example.com", city: "Noida", joined: "2026-11-10", notes: "", flagged: false, orders: [o(1041, "2026-11-12", 2499, "Cancelled")] },
  { id: 6, name: "Vikas Tyagi", phone: "9876500066", email: "", city: "Meerut", joined: "2026-05-11", notes: "Pichli baar COD return kiya tha.", flagged: true, orders: [o(1040, "2026-11-12", 549, "Pending"), o(603, "2026-05-11", 1999, "Cancelled")] },
  { id: 7, name: "Pooja Mishra", phone: "9876500077", email: "pooja@example.com", city: "Lucknow", joined: "2026-09-21", notes: "", flagged: false, orders: [o(988, "2026-09-21", 1999)] },
];

export default function CustomerPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      <CustomersManager initial={customers} />
    </div>
  );
}