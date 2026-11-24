// Ise apne app/products/page.jsx me rakho.
import ProductsManager from "@/components/admin/product/ProductManger";
import type { Product } from "@/components/admin/product/ProductForm";
// ---- Dummy data: baad me yahan database / API se products lao ----
const products: Product[] = [
  { id: "1", name: "Casual Plain Belt - Black", sku: "BH-CAS-BLK", category: "Casual belts", categoryId: "1", price: 1999, mrp: 3599, stock: 50, status: "active", description: "100% genuine leather casual belt." },
  { id: "2", name: "Casual Plain Belt - Rich Brown", sku: "BH-CAS-BRN", category: "Casual belts", categoryId: "1", price: 1999, mrp: 3599, stock: 34, status: "active", description: "" },
  { id: "3", name: "Casual Plain Belt - Elegant Tan", sku: "BH-CAS-TAN", category: "Casual belts", categoryId: "1", price: 1999, mrp: 3599, stock: 9, status: "active", description: "" },
  { id: "4", name: "Casual Plain Belt - Royal Blue", sku: "BH-CAS-BLU", category: "Casual belts", categoryId: "1", price: 1999, mrp: 3599, stock: 5, status: "active", description: "" },
  { id: "5", name: "Western Tooled Belt - Black", sku: "BH-WST-BLK", category: "Western belts", categoryId: "2", price: 2499, mrp : 0, stock: 12, status: "active", description: "" },
  { id: "6", name: "Western Tooled Belt - Brown", sku: "BH-WST-BRN", category: "Western belts", categoryId: "2", price: 2499, mrp : 0, stock: 0, status: "draft", description: "" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Products</h1>
      <ProductsManager initial={products} />
    </div>
  );
}