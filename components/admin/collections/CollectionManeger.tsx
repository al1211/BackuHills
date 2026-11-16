"use client";
import { useMemo, useState } from "react";
import { IconLayoutGrid, IconEye, IconHome, IconAlertTriangle, IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import StatCard from "../StatCard";
import CollectionForm from "./collectionForm";
import { resolveProducts } from "./CollectionUtils";

function Switch({ on, onChange, label }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#2FCB9F]" : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
const TypeBadge = ({ type }) => (
  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${type === "auto" ? "bg-sky-50 text-sky-700" : "bg-gray-100 text-gray-600"}`}>{type === "auto" ? "Automatic" : "Manual"}</span>
);

export default function CollectionsManager({ products, initial }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState(null); // null | {} | collection

  const rows = useMemo(() => items.map((c) => ({ c, count: resolveProducts(c, products).length })), [items, products]);
  const totals = {
    all: items.length,
    published: items.filter((c) => c.published).length,
    home: items.filter((c) => c.onHomepage && c.published).length,
    empty: rows.filter((r) => r.c.published && r.count === 0).length,
  };

  // TODO: yahan API call lagao (POST/PUT/DELETE /api/collections) — abhi sirf page ki memory me chalta hai
  const save = (c) => {
    setItems((prev) => (c.id ? prev.map((x) => (x.id === c.id ? c : x)) : [...prev, { ...c, id: Date.now() }]));
    setEditing(null);
  };
  const patch = (id, p) => setItems((prev) => prev.map((c) => (c.id === id ? { ...c, ...p } : c)));
  const remove = (c) => confirm(`"${c.name}" delete karni hai? Products delete nahi honge, sirf ye collection hatega.`) && setItems((prev) => prev.filter((x) => x.id !== c.id));

  const ico = "rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900";
  const Actions = ({ c }) => (
    <div className="flex items-center">
      <button onClick={() => setEditing(c)} aria-label={`${c.name} edit karo`} className={ico}><IconPencil size={18} /></button>
      <button onClick={() => remove(c)} aria-label={`${c.name} delete karo`} className={`${ico} hover:!bg-red-50 hover:!text-red-600`}><IconTrash size={18} /></button>
    </div>
  );
  const Warn = ({ c, count }) => c.published && count === 0 && <p className="mt-0.5 text-xs font-medium text-amber-700">Khali hai par published hai. Products jodo ya unpublish karo.</p>;

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Collections" period="All time" value={totals.all} icon={IconLayoutGrid} />
        <StatCard title="Published" period="Store par live" value={totals.published} icon={IconEye} />
        <StatCard title="On homepage" period="Homepage par dikhti hain" value={totals.home} icon={IconHome} />
        <StatCard title="Khali but published" period="Fix karni hain" value={totals.empty} icon={IconAlertTriangle} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">Collection = products ka group, jaise Best Sellers ya Festival Sale.</p>
        <button onClick={() => setEditing({})} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 hover:bg-[#4fd3ae]">
          <IconPlus size={18} /> Add collection
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-400">Abhi koi collection nahi hai.</div>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="px-4 py-3 font-medium">Collection</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Published</th><th className="px-4 py-3 font-medium">Homepage</th><th className="px-4 py-3" />
              </tr></thead>
              <tbody>
                {rows.map(({ c, count }) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3"><p className="font-semibold text-gray-900">{c.name}</p><p className="text-xs text-gray-400">/collections/{c.slug}</p><Warn c={c} count={count} /></td>
                    <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                    <td className="px-4 py-3 text-gray-700">{count}</td>
                    <td className="px-4 py-3"><Switch on={c.published} onChange={() => patch(c.id, { published: !c.published })} label={`${c.name} publish karo`} /></td>
                    <td className="px-4 py-3"><Switch on={c.onHomepage} onChange={() => patch(c.id, { onHomepage: !c.onHomepage })} label={`${c.name} homepage par dikhao`} /></td>
                    <td className="px-4 py-3"><div className="flex justify-end"><Actions c={c} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-3 md:hidden">
            {rows.map(({ c, count }) => (
              <li key={c.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0"><p className="font-semibold text-gray-900">{c.name}</p><p className="text-xs text-gray-400">{count} products · /{c.slug}</p><Warn c={c} count={count} /></div>
                  <TypeBadge type={c.type} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                  <label className="flex items-center gap-2">Published <Switch on={c.published} onChange={() => patch(c.id, { published: !c.published })} label={`${c.name} publish karo`} /></label>
                  <label className="flex items-center gap-2">Homepage <Switch on={c.onHomepage} onChange={() => patch(c.id, { onHomepage: !c.onHomepage })} label={`${c.name} homepage par dikhao`} /></label>
                  <span className="ml-auto"><Actions c={c} /></span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {editing && <CollectionForm collection={editing} products={products} existing={items} onSave={save} onClose={() => setEditing(null)} />}
    </>
  );
}