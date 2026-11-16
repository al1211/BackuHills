"use client";
import { useEffect, useState } from "react";
import { IconX, IconBrandWhatsapp, IconPhone, IconMail, IconFlag } from "@tabler/icons-react";
import { StatusBadge, inr, fmtDate } from "../orderManger/OrderDetail"; // Orders page wale exports

export const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
export const Avatar = ({ name, size = "h-10 w-10 text-sm" }) => (
  <span className={`grid shrink-0 place-items-center rounded-full bg-[#E3F8F1] font-bold text-[#0F7A5C] ${size}`}>{initials(name)}</span>
);

export default function CustomerDetail({ customer: c, stats, onUpdate, onClose }) {
  const [notes, setNotes] = useState(c.notes || "");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const box = "rounded-lg bg-[#F7F9F8] px-3 py-2.5";
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={c.name} className="flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={c.name} size="h-12 w-12 text-base" />
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold text-gray-900">
                {c.name}
                {c.flagged && <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">Flagged</span>}
              </h2>
              <p className="text-sm text-gray-500">{c.city} · Joined {fmtDate(c.joined)}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"><IconX size={20} /></button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5 text-sm">
          <div className="flex flex-wrap gap-2">
            <a href={`tel:+91${c.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-50"><IconPhone size={16} /> {c.phone}</a>
            <a href={`https://wa.me/91${c.phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#E3F8F1] px-3 py-2 font-semibold text-[#0F7A5C] hover:bg-[#5FE0BC] hover:text-gray-900"><IconBrandWhatsapp size={16} /> WhatsApp</a>
            {c.email && <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-50"><IconMail size={16} /> {c.email}</a>}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={box}><p className="text-xs text-gray-400">Orders</p><p className="text-lg font-bold text-gray-900">{stats.count}</p></div>
            <div className={box}><p className="text-xs text-gray-400">Total spent</p><p className="text-lg font-bold text-gray-900">{inr(stats.spent)}</p></div>
            <div className={box}><p className="text-xs text-gray-400">Avg order</p><p className="text-lg font-bold text-gray-900">{stats.count ? inr(stats.spent / stats.count) : "—"}</p></div>
          </div>

          <section>
            <h3 className="font-semibold text-gray-900">Orders</h3>
            <ul className="mt-1 divide-y divide-gray-50">
              {c.orders.length === 0 && <li className="py-3 text-gray-400">Abhi koi order nahi.</li>}
              {c.orders.map((o) => (
                <li key={o.id} className="flex items-center gap-3 py-2.5">
                  <span className="font-semibold text-gray-900">#{o.id}</span>
                  <span className="flex-1 text-gray-500">{fmtDate(o.date)}</span>
                  <span className="text-gray-900">{inr(o.amount)}</span>
                  <StatusBadge status={o.status} />
                </li>
              ))}
            </ul>
          </section>

          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-gray-900">Notes</span>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Jaise: size 36 pasand hai, COD par call karke confirm karna"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30" />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
          <button onClick={() => onUpdate({ flagged: !c.flagged })}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${c.flagged ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <IconFlag size={16} /> {c.flagged ? "Flag hatao" : "Risky customer flag karo"}
          </button>
          <button onClick={() => onUpdate({ notes: notes.trim() })} className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">Save notes</button>
        </div>
      </div>
    </div>
  );
}