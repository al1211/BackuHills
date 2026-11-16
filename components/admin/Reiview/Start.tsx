import { IconStarFilled } from "@tabler/icons-react";

// rating: 0-5 (decimal bhi chalega). Sirf dikhane ke liye.
export default function Stars({ rating, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStarFilled key={n} size={size} className={rating >= n - 0.25 ? "text-amber-400" : "text-gray-200"} />
      ))}
    </span>
  );
}