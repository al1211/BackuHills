// Ise apne app/settings/page.jsx me rakho (sidebar ka link /settings hai).
import SettingsManager from "@/components/admin/setting/SettingManger";

// ---- Dummy data: baad me yahan database se settings lao ----
const settings = {
  storeName: "Backum Hills",
  supportEmail: "",                       // audit: email missing tha
  phone: "7524854640",
  whatsapp: "",
  address: "1016/1017 Wajidpur, Jajmau, Kanpur, Uttar Pradesh",
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",
  freeShippingAbove: 550,
  shippingFee: 150,
  deliveryDays: "4-7 working days",
  codEnabled: true,
  codFee: 0,
  announcement: "Free shipping on all orders above ₹550",
  heroTitle: "Crafted In Genuine Leather",
  heroSubtitle: "Timeless belts and leather essentials from Kanpur.",
  newsletterText: "Get launch updates and offers.",
  instagram: "https://instagram.com/backumhills",
  facebook: "",
  youtube: "",
  x: "",
  emailNewOrder: true,
  emailNewReview: true,
  emailLowStock: true,
  lowStockLevel: 5,
};

// Products me sabse kam price (free shipping wali chetavni ke liye). Asli me Products se nikalo.
const cheapestPrice = 1999;

export default function SettingsPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <SettingsManager initial={settings} cheapestPrice={cheapestPrice} />
    </div>
  );
}