// Ise apne app/categories/page.jsx me rakho. StatCard dashboard wala hi use hota hai.
// Sidebar me link jodne ke liye SideBar.jsx ke MENU me ye line daalo:
//   { label: "Categories", href: "/categories", icon: IconCategory },   // IconCategory @tabler/icons-react se import karo
import CategoriesManager from "@/components/admin/categories/CategoriesManager";

// ---- Dummy data: baad me database se lao. "products" asli me Products table se ginna chahiye ----
const categories = [
  { id: 1, name: "Casual belts", slug: "casual-belts", description: "Roz ke kaam ke liye genuine leather belts.", metaDescription: "Premium genuine leather casual belts for men, made in Kanpur.", visible: true, products: 6 },
  { id: 2, name: "Western belts", slug: "western-belts", description: "Tooled aur engraved buckle wali western belts.", metaDescription: "", visible: true, products: 4 },
  { id: 3, name: "Leather bags", slug: "leather-bags", description: "", metaDescription: "", visible: true, products: 0 },
  { id: 4, name: "Travel & utility", slug: "travel-utility", description: "", metaDescription: "", visible: false, products: 0 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
      <CategoriesManager initial={categories} />
    </div>
  );
}