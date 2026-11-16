// Ise apne app/collections/page.jsx me rakho. StatCard dashboard wala hi use hota hai.
// Sidebar MENU me: { label: "Collections", href: "/collections", icon: IconLayoutGrid }  (IconLayoutGrid import karo)
import CollectionsManager from "@/components/admin/collections/CollectionManeger";

// ---- Dummy data: baad me Products aur Collections database se lao ----
const products = [
  { id: 1, name: "Casual Belt - Black", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 2, name: "Casual Belt - Rich Brown", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 3, name: "Casual Belt - Elegant Tan", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 4, name: "Casual Belt - Royal Blue", category: "Casual belts", price: 1999, mrp: 3599 },
  { id: 5, name: "Western Tooled Belt - Black", category: "Western belts", price: 2499, mrp: 0 },
  { id: 6, name: "Western Tooled Belt - Brown", category: "Western belts", price: 2499, mrp: 0 },
];
const collections = [
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