export const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Automatic collection ke rules (abhi ek rule; baad me kai rules jod sakte ho)
export const RULES = [
  { key: "category", label: "Category is", input: "category" },
  { key: "priceBelow", label: "Price is below (₹)", input: "number" },
  { key: "priceAbove", label: "Price is above (₹)", input: "number" },
  { key: "onSale", label: "Product discount par hai (MRP > price)", input: null },
];

// Ek collection me kaun se products aayenge
export function resolveProducts(c, products) {
  if (c.type === "manual") return products.filter((p) => c.productIds.includes(p.id));
  const { field, value } = c.rule || {};
  return products.filter((p) =>
    field === "category" ? p.category === value
    : field === "priceBelow" ? p.price < Number(value)
    : field === "priceAbove" ? p.price > Number(value)
    : field === "onSale" ? p.mrp > p.price
    : false);
}