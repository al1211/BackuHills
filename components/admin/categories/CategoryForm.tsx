"use client";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";
export const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const META_MAX = 155;

export default function CategoryForm({ category, existing, onSave, onClose }) {
  const isNew = !category?.id;
  const [f, setF] = useState({ name: "", slug: "", description: "", metaDescription: "", visible: true, ...category });
  const [slugTouched, setSlugTouched] = useState(!isNew); // edit me slug apne aap nahi badlega
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onName = (e) => setF({ ...f, name: e.target.value, slug: slugTouched ? f.slug : slugify(e.target.value) });

  const submit = (e) => {
    e.preventDefault();
    const name = f.name.trim(), slug = slugify(f.slug);
    if (!name) return setError("Category ka naam likho.");
    if (!slug) return setError("URL slug khali nahi ho sakta.");
    const others = existing.filter((c) => c.id !== f.id);
    if (others.some((c) => c.name.toLowerCase() === name.toLowerCase())) return setError("Is naam ki category pehle se hai.");
    if (others.some((c) => c.slug === slug)) return setError("Ye slug pehle se use ho raha hai.");
    onSave({ ...f, name, slug });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-label={isNew ? "Add category" : "Edit category"}
        className="flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">{isNew ? "Add category" : "Edit category"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"><IconX size={20} /></button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input className={input} value={f.name} onChange={onName} autoFocus />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">URL slug</span>
            <input className={input} value={f.slug} onChange={(e) => { setSlugTouched(true); setF({ ...f, slug: e.target.value }); }} />
            <span className="text-xs text-gray-400">/collections/{slugify(f.slug) || "..."}</span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <textarea className={input} rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex justify-between text-sm font-medium text-gray-700">
              Meta description (Google ke liye)
              <span className={f.metaDescription.length > META_MAX ? "text-red-600" : "text-gray-400"}>{f.metaDescription.length}/{META_MAX}</span>
            </span>
            <textarea className={input} rows={2} value={f.metaDescription} onChange={(e) => setF({ ...f, metaDescription: e.target.value })} />
          </label>
          <label className="flex items-center gap-2.5 text-sm text-gray-700">
            <input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} className="h-4 w-4 accent-[#2FCB9F]" />
            Store ke menu me dikhao
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <span className="min-w-0 flex-1 text-sm text-red-600" role="alert">{error}</span>
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">Save category</button>
        </div>
      </form>
    </div>
  );
}