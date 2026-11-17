"use client";

import { useMemo, useState } from "react";
import { IconStar, IconMessage2, IconClock, IconShieldCheck, IconSearch, IconTrash } from "@tabler/icons-react";
import StatCard from "../StatCard";
import Stars from "./Start";

// Types yahin define hain; page.tsx yahin se import kare.
export type ReviewStatus = "pending" | "approved" | "hidden";
type ReviewTab = ReviewStatus | "all";

export type Review = {
  id: number;
  product: string;
  customer: string;
  rating: number; // 1-5
  title: string; // khali ho sakta hai
  body: string;
  date: string; // "2026-11-14"
  status: ReviewStatus;
  verified: boolean;
  reply: string; // khali = jawab nahi diya
};

interface ReviewsManagerProps {
  initial: Review[];
  products: string[];
}

const TABS: [ReviewTab, string][] = [
  ["pending", "Pending"],
  ["approved", "Approved"],
  ["hidden", "Hidden"],
  ["all", "All"],
];

const fmt = (d: string): string =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const avgOf = (list: { rating: number }[]): number =>
  list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;

const STATUS_STYLE: Record<ReviewStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  hidden: "bg-gray-100 text-gray-600",
};

export default function ReviewsManager({ initial, products }: ReviewsManagerProps) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [tab, setTab] = useState<ReviewTab>("pending");
  const [rating, setRating] = useState<string>("all"); // "all" ya "1".."5"
  const [product, setProduct] = useState<string>("all");
  const [q, setQ] = useState<string>("");
  const [replyId, setReplyId] = useState<number | null>(null);
  const [draft, setDraft] = useState<string>("");

  // Store par sirf approved reviews ginti me aate hain
  const approved = useMemo(() => reviews.filter((r) => r.status === "approved"), [reviews]);

  const counts = useMemo<Record<ReviewTab, number>>(
    () => ({
      pending: reviews.filter((r) => r.status === "pending").length,
      approved: approved.length,
      hidden: reviews.filter((r) => r.status === "hidden").length,
      all: reviews.length,
    }),
    [reviews, approved]
  );

  const dist = [5, 4, 3, 2, 1].map((n) => ({
    n,
    c: approved.filter((r) => r.rating === n).length,
  }));

  const byProduct = useMemo(
    () =>
      products
        .map((name) => {
          const list = approved.filter((r) => r.product === name);
          return { name, count: list.length, avg: avgOf(list) };
        })
        .sort((a, b) => b.count - a.count),
    [products, approved]
  );

  const verifiedPct = approved.length
    ? Math.round((approved.filter((r) => r.verified).length / approved.length) * 100)
    : 0;

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return reviews
      .filter(
        (r) =>
          (tab === "all" || r.status === tab) &&
          (rating === "all" || r.rating === Number(rating)) &&
          (product === "all" || r.product === product) &&
          (!s || `${r.customer} ${r.title} ${r.body}`.toLowerCase().includes(s))
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [reviews, tab, rating, product, q]);

  // TODO: yahan API call lagao (PATCH/DELETE /api/reviews/:id) — abhi sirf page ki memory me chalta hai
  const patch = (id: number, p: Partial<Review>): void =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...p } : r)));

  const remove = (r: Review): void => {
    if (confirm(`${r.customer} ka review delete karna hai? Ye wapas nahi aayega.`)) {
      setReviews((prev) => prev.filter((x) => x.id !== r.id));
    }
  };

  const openReply = (r: Review): void => {
    setReplyId(r.id);
    setDraft(r.reply);
  };

  const saveReply = (id: number): void => {
    patch(id, { reply: draft.trim() });
    setReplyId(null);
  };

  const btn = "rounded-lg px-3 py-1.5 text-xs font-semibold";
  const sel = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#5FE0BC] focus:outline-none";

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Average rating" period="Approved reviews" value={approved.length ? avgOf(approved).toFixed(2) : "—"} icon={IconStar} />
        <StatCard title="Approved reviews" period="Store par dikh rahe hain" value={counts.approved} icon={IconMessage2} />
        <StatCard title="Pending approval" period="Aapke dekhne baaki" value={counts.pending} icon={IconClock} />
        <StatCard title="Verified purchase" period="Approved me se" value={`${verifiedPct}%`} icon={IconShieldCheck} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Rating breakdown</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {dist.map(({ n, c }) => (
              <li key={n} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-gray-600">{n} star</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${approved.length ? (c / approved.length) * 100 : 0}%` }} />
                </div>
                <span className="w-6 text-right text-gray-500">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Rating by product</h2>
          <p className="text-xs text-gray-400">Har product ki apni rating, store-wide nahi</p>
          <ul className="mt-3 flex max-h-44 flex-col gap-2.5 overflow-y-auto">
            {byProduct.map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-gray-800">{p.name}</span>
                {p.count === 0 ? (
                  <span className="shrink-0 text-xs text-gray-400">No reviews yet</span>
                ) : (
                  <span className="flex shrink-0 items-center gap-2">
                    <Stars rating={p.avg} size={14} />
                    <span className="text-gray-600">{p.avg.toFixed(1)} ({p.count})</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div role="tablist" aria-label="Review status" className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {TABS.map(([k, l]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === k ? "bg-[#5FE0BC] text-gray-900 shadow-md shadow-[#5FE0BC]/40" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {l} <span className="text-xs opacity-70">{counts[k]}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-3 lg:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 focus-within:border-[#5FE0BC]">
          <IconSearch size={18} />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Customer ya review me dhundo"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </label>
        <div className="flex gap-3">
          <select value={rating} onChange={(e) => setRating(e.target.value)} aria-label="Rating filter" className={`${sel} flex-1`}>
            <option value="all">Sab ratings</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star
              </option>
            ))}
          </select>
          <select value={product} onChange={(e) => setProduct(e.target.value)} aria-label="Product filter" className={`${sel} flex-1`}>
            <option value="all">Sab products</option>
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {shown.length === 0 && (
          <li className="rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Koi review nahi mila.</li>
        )}
        {shown.map((r) => (
          <li key={r.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars rating={r.rating} />
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[r.status]}`}>{r.status}</span>
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0F7A5C]">
                  <IconShieldCheck size={14} /> Verified purchase
                </span>
              )}
              {r.status === "pending" && r.rating <= 2 && (
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">Low rating</span>
              )}
            </div>
            {r.title && <h3 className="mt-2 font-semibold text-gray-900">{r.title}</h3>}
            <p className="mt-1 text-sm text-gray-700">{r.body}</p>
            <p className="mt-2 text-xs text-gray-400">
              {r.customer} · {r.product} · {fmt(r.date)}
            </p>

            {r.reply && replyId !== r.id && (
              <div className="mt-3 rounded-lg bg-[#F7F9F8] px-3 py-2.5 text-sm">
                <p className="text-xs font-semibold text-[#0F7A5C]">Store ka jawab</p>
                <p className="text-gray-700">{r.reply}</p>
              </div>
            )}
            {replyId === r.id && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  aria-label="Jawab likho"
                  placeholder="Customer ko jawab likho (store par public dikhega)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveReply(r.id)} className={`${btn} bg-[#5FE0BC] text-gray-900 hover:bg-[#4fd3ae]`}>
                    Save reply
                  </button>
                  <button onClick={() => setReplyId(null)} className={`${btn} border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {r.status !== "approved" && (
                <button
                  onClick={() => patch(r.id, { status: "approved" })}
                  className={`${btn} bg-[#E3F8F1] text-[#0F7A5C] hover:bg-[#5FE0BC] hover:text-gray-900`}
                >
                  Approve
                </button>
              )}
              {r.status !== "hidden" && (
                <button onClick={() => patch(r.id, { status: "hidden" })} className={`${btn} border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                  Hide
                </button>
              )}
              {replyId !== r.id && (
                <button onClick={() => openReply(r)} className={`${btn} border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                  {r.reply ? "Edit reply" : "Reply"}
                </button>
              )}
              <button
                onClick={() => remove(r)}
                aria-label={`${r.customer} ka review delete karo`}
                className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <IconTrash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}