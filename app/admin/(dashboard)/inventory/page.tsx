// Ise apne app/inventory/page.jsx me rakho. StatCard dashboard wala hi use hota hai.
import InventoryManager from "@/components/admin/inventryManger/InventryManager";

// ---- Dummy data: baad me yahan database / API se lao (Products wala hi stock field) ----
const products = [
  { id: 1, name: "Casual Plain Belt - Black", sku: "BH-CAS-BLK", price: 1999, stock: 50, reorderAt: 10 },
  { id: 2, name: "Casual Plain Belt - Rich Brown", sku: "BH-CAS-BRN", price: 1999, stock: 34, reorderAt: 10 },
  { id: 3, name: "Casual Plain Belt - Elegant Tan", sku: "BH-CAS-TAN", price: 1999, stock: 9, reorderAt: 10 },
  { id: 4, name: "Casual Plain Belt - Royal Blue", sku: "BH-CAS-BLU", price: 1999, stock: 5, reorderAt: 10 },
  { id: 5, name: "Western Tooled Belt - Black", sku: "BH-WST-BLK", price: 2499, stock: 2, reorderAt: 5 },
  { id: 6, name: "Leather Duffel Bag", sku: "", price: 6499, stock: 0, reorderAt: 3 },
];

export default function InventoryPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
      <InventoryManager initial={products} />
    </div>
  );
}