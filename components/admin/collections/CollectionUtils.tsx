// Collections ke saare types aur helpers yahin hain. Baaki files yahin se import karti hain.

export type CollectionType = "manual" | "auto";
export type RuleField = "category" | "priceBelow" | "priceAbove" | "onSale";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number; // 0 = koi discount nahi
};

export type Rule = { field: RuleField; value: string };

export type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: CollectionType;
  productIds: number[]; // sirf "manual" me use hota hai
  rule: Rule; // sirf "auto" me use hota hai
  published: boolean;
  onHomepage: boolean;
};

// Naye collection me id nahi hoti, isliye form ka data Partial hota hai
export type CollectionDraft = Partial<Collection>;

export type RuleDef = { key: RuleField; label: string; input: "category" | "number" | null };

export const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Automatic collection ke rules (abhi ek rule; baad me kai rules jod sakte ho)
export const RULES: RuleDef[] = [
  { key: "category", label: "Category is", input: "category" },
  { key: "priceBelow", label: "Price is below (₹)", input: "number" },
  { key: "priceAbove", label: "Price is above (₹)", input: "number" },
  { key: "onSale", label: "Product discount par hai (MRP > price)", input: null },
];

// Ek collection me kaun se products aayenge
export function resolveProducts(c: Pick<Collection, "type" | "productIds" | "rule">, products: Product[]): Product[] {
  if (c.type === "manual") return products.filter((p) => c.productIds.includes(p.id));
  const { field, value } = c.rule;
  return products.filter((p) => {
    switch (field) {
      case "category": return p.category === value;
      case "priceBelow": return p.price < Number(value);
      case "priceAbove": return p.price > Number(value);
      case "onSale": return p.mrp > p.price;
      default: return false;
    }
  });
}