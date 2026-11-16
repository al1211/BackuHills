// Ise apne app/reviews/page.jsx me rakho. StatCard dashboard wala hi use hota hai.
// Sidebar MENU me: { label: "Reviews", href: "/reviews", icon: IconStar }  (IconStar import karo)
import ReviewsManager from "@/components/admin/Reiview/ReviewManger";

// ---- Dummy data: baad me Products aur Reviews database se lao ----
const products = [
  "Casual Belt - Black", "Casual Belt - Rich Brown", "Casual Belt - Elegant Tan",
  "Casual Belt - Royal Blue", "Western Tooled Belt - Black", "Western Tooled Belt - Brown",
];
const r = (id, product, customer, rating, title, body, date, status, verified = true, reply = "") =>
  ({ id, product, customer, rating, title, body, date, status, verified, reply });

const reviews = [
  r(1, "Western Tooled Belt - Black", "Aman Verma", 5, "Bahut shaandaar quality", "Leather asli hai aur buckle ka kaam bahut badhiya hai. Paise vasool.", "2026-11-14", "pending"),
  r(2, "Casual Belt - Black", "Rohit Sharma", 2, "Size thoda chhota", "Belt achhi hai par 36 order kiya aur fit 34 jaisa laga.", "2026-11-13", "pending"),
  r(3, "Casual Belt - Rich Brown", "Suresh Gupta", 5, "Mast belt", "Colour photo jaisa hi hai. Roz office me pehanta hoon.", "2026-11-10", "approved", true, "Shukriya Suresh ji! Aapka feedback humare liye bahut keemti hai."),
  r(4, "Casual Belt - Black", "Imran Khan", 4, "", "Achhi belt hai, delivery 4 din me mili.", "2026-11-05", "approved"),
  r(5, "Casual Belt - Elegant Tan", "Pooja Mishra", 5, "Gift ke liye perfect", "Bhai ko gift kiya, usko bahut pasand aayi.", "2026-10-28", "approved"),
  r(6, "Western Tooled Belt - Black", "Neha Singh", 4, "Design sundar hai", "Engraving bahut sundar hai, thodi bhaari lagti hai.", "2026-10-21", "approved", false),
  r(7, "Casual Belt - Black", "Anonymous", 1, "Fake", "Spam link: buy cheap watches now", "2026-10-15", "hidden", false),
];

export default function ReviewsPage() {
  return (
    <div className="min-h-full bg-[#F7F9F8] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
      <ReviewsManager initial={reviews} products={products} />
    </div>
  );
}