// Ise app/(admin)/collections/page.tsx me rakho (ya jahan aapka collections page hai).
// Sidebar MENU me: { label: "Collections", href: "/collections", icon: IconLayoutGrid }
import CollectionsManager from "@/components/admin/collections/CollectionManeger";
import type { Collection, Product } from "@/components/admin/collections/CollectionUtils";

// ---- Dummy data: baad me Products aur Collections database se lao ----
// Types likhna zaroori hai: iske bina TypeScript "manual" ko sirf string samajhta hai
// aur "manual" | "auto" wale type se mel nahi khaata.
const products: Product[] = [
  { id: 1, name: "Casual Belt - Black", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 2, name: "Casual Belt - Rich Brown", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 3, name: "Casual Belt - Elegant Tan", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 4, name: "Casual Belt - Royal Blue", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 5, name: "Western Tooled Belt - Black", category: "Western belts", price: 2499, mrp: 0 },
  { id: 6, name: "Western Tooled Belt - Brown", category: "Western belts", price: 2499, mrp: 0 },
];

const collections: Collection[] = [
  { id: 1, name: "Best Sellers", slug: "bestseller", description: "Sabse zyada bikne wali belts.", type: "manual", productIds: [1, 2, 5], rule: { field: "category", value: "Casual belts" }, published: true, onHomepage: true },
  { id: 2, name: "Western Collection", slug: "western-collection", description: "", type: "auto", productIds: [], rule: { field: "category", value: "Western belts" }, published: true, onHomepage: false },
  { id: 3, name: "Festival Sale", slug: "festival-sale", description: "Discount wale products.", type: "auto", productIds: [], rule: { field: "onSale", value: "" }, published: false, onHomepage: false },
  { id: 4, name: "New Arrivals", slug: "new-arrivals", description: "", type: "manual", productIds: [], rule: { field: "category", value: "Casual belts" }, published: true, onHomepage: false },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
      <CollectionsManager products={products} initial={collections} />
    </div>
  );
}