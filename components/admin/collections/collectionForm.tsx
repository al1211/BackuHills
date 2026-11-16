"use client";
import { useEffect, useMemo, useState } from "react";
import { IconX, IconSearch } from "@tabler/icons-react";
import { slugify, RULES, resolveProducts } from "./CollectionUtils";

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

export default function CollectionForm({ collection, products, existing, onSave, onClose }) {
  const isNew = !collection?.id;
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const [f, setF] = useState({
    name: "", slug: "", description: "", type: "manual", productIds: [], published: true, onHomepage: false,
    rule: { field: "category", value: categories[0] || "" }, ...collection,
  });
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rule = RULES.find((r) => r.key === f.rule.field);
  const matches = useMemo(() => resolveProducts(f, products), [f, products]);
  const pickList = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())), [products, q]);

  const onName = (e) => setF({ ...f, name: e.target.value, slug: slugTouched ? f.slug : slugify(e.target.value) });
  const toggleProduct = (id) => setF({ ...f, productIds: f.productIds.includes(id) ? f.productIds.filter((x) => x !== id) : [...f.productIds, id] });
  const setRule = (patch) => setF({ ...f, rule: { ...f.rule, ...patch } });
  const changeField = (field) => {
    const r = RULES.find((x) => x.key === field);
    setRule({ field, value: r.input === "category" ? categories[0] || "" : "" });
  };

  const submit = (e) => {
    e.preventDefault();
    const name = f.name.trim(), slug = slugify(f.slug);
    if (!name) return setError("Collection ka naam likho.");
    if (!slug) return setError("URL slug khali nahi ho sakta.");
    const others = existing.filter((c) => c.id !== f.id);
    if (others.some((c) => c.name.toLowerCase() === name.toLowerCase())) return setError("Is naam ki collection pehle se hai.");
    if (others.some((c) => c.slug === slug)) return setError("Ye slug pehle se use ho raha hai.");
    if (f.type === "auto" && rule.input && !String(f.rule.value).trim()) return setError("Rule ki value likho.");
    onSave({ ...f, name, slug });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-label={isNew ? "Add collection" : "Edit collection"}
        className="flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">{isNew ? "Add collection" : "Edit collection"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"><IconX size={20} /></button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input className={input} value={f.name} onChange={onName} autoFocus placeholder="Jaise: Best Sellers" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">URL slug</span>
            <input className={input} value={f.slug} onChange={(e) => { setSlugTouched(true); setF({ ...f, slug: e.target.value }); }} />
            <span className="text-xs text-gray-400">/collections/{slugify(f.slug) || "..."}</span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <textarea className={input} rows={2} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700">Products kaise judenge?</legend>
            {[["manual", "Manual", "Aap khud products chunte ho"], ["auto", "Automatic", "Rule se apne aap judte hain (naye products bhi)"]].map(([v, t, d]) => (
              <label key={v} className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 ${f.type === v ? "border-[#5FE0BC] bg-[#E3F8F1]/50" : "border-gray-200"}`}>
                <input type="radio" name="type" checked={f.type === v} onChange={() => setF({ ...f, type: v })} className="mt-0.5 accent-[#2FCB9F]" />
                <span><span className="block text-sm font-semibold text-gray-900">{t}</span><span className="text-xs text-gray-500">{d}</span></span>
              </label>
            ))}
          </fieldset>

          {f.type === "manual" ? (
            <div>
              <div className="flex items-center justify-between text-sm"><span className="font-medium text-gray-700">Products chuno</span><span className="text-gray-500">{f.productIds.length} selected</span></div>
              <label className="mt-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-gray-500 focus-within:border-[#5FE0BC]">
                <IconSearch size={16} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Product dhundo" className="w-full bg-transparent text-sm text-gray-900 focus:outline-none" />
              </label>
              <ul className="mt-2 max-h-48 divide-y divide-gray-50 overflow-y-auto rounded-lg border border-gray-100">
                {pickList.length === 0 && <li className="p-3 text-sm text-gray-400">Koi product nahi mila.</li>}
                {pickList.map((p) => (
                  <li key={p.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm hover:bg-[#F7F9F8]">
                      <input type="checkbox" checked={f.productIds.includes(p.id)} onChange={() => toggleProduct(p.id)} className="h-4 w-4 accent-[#2FCB9F]" />
                      <span className="flex-1 text-gray-800">{p.name}</span><span className="text-xs text-gray-400">{p.category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">Rule</span>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select className={input} value={f.rule.field} onChange={(e) => changeField(e.target.value)} aria-label="Rule">{RULES.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}</select>
                {rule.input === "category" && <select className={input} value={f.rule.value} onChange={(e) => setRule({ value: e.target.value })} aria-label="Category">{categories.map((c) => <option key={c}>{c}</option>)}</select>}
                {rule.input === "number" && <input className={input} type="number" min="0" inputMode="numeric" value={f.rule.value} onChange={(e) => setRule({ value: e.target.value })} aria-label="Value" />}
              </div>
              <p className="rounded-lg bg-[#E3F8F1] px-3 py-2 text-sm text-[#0F7A5C]">
                Is rule se <strong>{matches.length}</strong> products judenge{matches.length > 0 && `: ${matches.slice(0, 3).map((p) => p.name).join(", ")}${matches.length > 3 ? "..." : ""}`}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex items-center gap-2.5"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} className="h-4 w-4 accent-[#2FCB9F]" /> Published (store par dikhao)</label>
            <label className="flex items-center gap-2.5"><input type="checkbox" checked={f.onHomepage} onChange={(e) => setF({ ...f, onHomepage: e.target.checked })} className="h-4 w-4 accent-[#2FCB9F]" /> Homepage par dikhao</label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <span className="min-w-0 flex-1 text-sm text-red-600" role="alert">{error}</span>
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">Save collection</button>
        </div>
      </form>
    </div>
  );
}