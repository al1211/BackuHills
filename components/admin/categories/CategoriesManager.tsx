"use client";
import { useMemo, useState } from "react";
import { IconCategory, IconEye, IconAlertTriangle, IconBox, IconPlus, IconPencil, IconTrash, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import StatCard from "../StatCard";
import CategoryForm, { type Category, type CategoryDraft } from "./CategoryForm";

// visible hai par products 0 = customer ko khali page milega
const isEmptyVisible = (c: Category) => c.visible && c.products === 0;

function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#2FCB9F]" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function CategoriesManager({ initial }: { initial: Category[] }) {
  const [items, setItems] = useState<Category[]>(initial);
  const [editing, setEditing] = useState<CategoryDraft | null>(null); // null = band, {} = naya, category = edit

  const totals = useMemo(
    () => ({
      all: items.length,
      visible: items.filter((c) => c.visible).length,
      empty: items.filter(isEmptyVisible).length,
      products: items.reduce((s, c) => s + c.products, 0),
    }),
    [items]
  );

  // TODO: yahan API call lagao (POST/PUT/DELETE /api/categories) — abhi sirf page ki memory me chalta hai
  const save = (c: CategoryDraft) => {
    setItems((prev) =>
      c.id !== undefined
        ? prev.map((x) => (x.id === c.id ? ({ ...x, ...c } as Category) : x))
        : [...prev, { ...c, id: Date.now(), products: 0 } as Category]
    );
    setEditing(null);
  };
  const toggle = (id: number) => setItems((prev) => prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)));
  const move = (i: number, d: number) =>
    setItems((prev) => {
      const next = [...prev];
      const j = i + d;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const remove = (c: Category) => {
    if (c.products > 0) {
      alert(`"${c.name}" me ${c.products} products hain. Pehle unhe doosri category me daalo, phir delete karo.`);
      return;
    }
    if (confirm(`"${c.name}" delete karni hai?`)) setItems((prev) => prev.filter((x) => x.id !== c.id));
  };

  const ico = "rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent";

  const Actions = ({ c, i }: { c: Category; i: number }) => (
    <div className="flex items-center">
      <button onClick={() => move(i, -1)} disabled={i === 0} aria-label={`${c.name} upar karo`} className={ico}><IconArrowUp size={18} /></button>
      <button onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label={`${c.name} neeche karo`} className={ico}><IconArrowDown size={18} /></button>
      <button onClick={() => setEditing(c)} aria-label={`${c.name} edit karo`} className={ico}><IconPencil size={18} /></button>
      <button onClick={() => remove(c)} aria-label={`${c.name} delete karo`} className={`${ico} hover:!bg-red-50 hover:!text-red-600`}><IconTrash size={18} /></button>
    </div>
  );

  const Warn = ({ c }: { c: Category }) =>
    isEmptyVisible(c) ? (
      <p className="mt-0.5 text-xs font-medium text-amber-700">Khali hai par menu me dikh rahi hai. Products jodo ya hide karo.</p>
    ) : null;

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Categories" period="All time" value={totals.all} icon={IconCategory} />
        <StatCard title="Menu me visible" period="Customer ko dikhti hain" value={totals.visible} icon={IconEye} />
        <StatCard title="Khali but visible" period="Fix karni hain" value={totals.empty} icon={IconAlertTriangle} />
        <StatCard title="Products" period="Sab categories me" value={totals.products} icon={IconBox} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">Upar-neeche arrow se menu ka order badlo.</p>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-1.5 rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 hover:bg-[#4fd3ae]"
        >
          <IconPlus size={18} /> Add category
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Abhi koi category nahi hai.</div>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400">
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Products</th>
                  <th className="px-4 py-3 font-medium">In menu</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map((c, i) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400">/collections/{c.slug}</p>
                      <Warn c={c} />
                    </td>
                    <td className="px-4 py-3 text-gray-700">{c.products}</td>
                    <td className="px-4 py-3"><Switch on={c.visible} onChange={() => toggle(c.id)} label={`${c.name} menu me dikhao`} /></td>
                    <td className="px-4 py-3"><div className="flex justify-end"><Actions c={c} i={i} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-3 md:hidden">
            {items.map((c, i) => (
              <li key={c.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.products} products · /{c.slug}</p>
                    <Warn c={c} />
                  </div>
                  <Switch on={c.visible} onChange={() => toggle(c.id)} label={`${c.name} menu me dikhao`} />
                </div>
                <div className="mt-2 flex justify-end"><Actions c={c} i={i} /></div>
              </li>
            ))}
          </ul>
        </>
      )}

      {editing && <CategoryForm category={editing} existing={items} onSave={save} onClose={() => setEditing(null)} />}
    </>
  );
}