"use client";
import { useEffect, useState } from "react";
import { IconX, IconBrandWhatsapp } from "@tabler/icons-react";

const STYLES = {
  Pending: "bg-amber-50 text-amber-700",
  Shipped: "bg-sky-50 text-sky-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
};
export const StatusBadge = ({ status }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>{status}</span>
);
export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const orderTotal = (o) => o.items.reduce((s, i) => s + i.qty * i.price, 0) + (o.shipping || 0);
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export default function OrderDetail({ order, onUpdate, onClose }) {
  const [tracking, setTracking] = useState(order.tracking || "");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cancel = () => confirm(`Order #${order.id} cancel karna hai?`) && onUpdate({ status: "Cancelled" });
  const btn = "rounded-lg px-4 py-2 text-sm font-semibold";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={`Order ${order.id}`} className="flex max-h-[92dvh] w-full max-w-xl flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">Order #{order.id} <StatusBadge status={order.status} /></h2>
            <p className="text-sm text-gray-500">{fmtDate(order.date)} · {order.payment}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"><IconX size={20} /></button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5 text-sm">
          <section>
            <h3 className="font-semibold text-gray-900">Customer</h3>
            <p className="mt-1 text-gray-700">{order.customer} · {order.phone}</p>
            <p className="text-gray-500">{order.address}</p>
            <a href={`https://wa.me/91${order.phone}`} target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F7A5C] hover:underline">
              <IconBrandWhatsapp size={16} /> WhatsApp par baat karo
            </a>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900">Items</h3>
            <ul className="mt-1 divide-y divide-gray-50">
              {order.items.map((i) => (
                <li key={i.name} className="flex justify-between gap-3 py-2">
                  <span className="text-gray-700">{i.name} <span className="text-gray-400">× {i.qty}</span></span>
                  <span className="text-gray-900">{inr(i.qty * i.price)}</span>
                </li>
              ))}
              <li className="flex justify-between py-2 text-gray-500"><span>Shipping</span><span>{order.shipping ? inr(order.shipping) : "Free"}</span></li>
              <li className="flex justify-between py-2 font-bold text-gray-900"><span>Total</span><span>{inr(orderTotal(order))}</span></li>
            </ul>
            {order.payment === "COD" && order.status !== "Cancelled" && order.status !== "Delivered" && (
              <p className="mt-1 text-xs text-amber-700">COD: delivery par {inr(orderTotal(order))} collect karna hai.</p>
            )}
          </section>

          {order.tracking && order.status !== "Pending" && (
            <p className="text-gray-600">Tracking ID: <span className="font-semibold text-gray-900">{order.tracking}</span></p>
          )}

          {order.status === "Pending" && (
            <label className="flex flex-col gap-1.5">
              <span className="font-medium text-gray-700">Tracking ID (optional)</span>
              <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Shiprocket / courier tracking number"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#5FE0BC] focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30" />
            </label>
          )}
        </div>

        {(order.status === "Pending" || order.status === "Shipped") && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 px-5 py-4">
            {order.status === "Pending" && (
              <>
                <button onClick={cancel} className={`${btn} border border-red-200 text-red-600 hover:bg-red-50`}>Cancel order</button>
                <button onClick={() => onUpdate({ status: "Shipped", tracking: tracking.trim() })} className={`${btn} bg-[#5FE0BC] text-gray-900 hover:bg-[#4fd3ae]`}>Mark as shipped</button>
              </>
            )}
            {order.status === "Shipped" && (
              <button onClick={() => onUpdate({ status: "Delivered" })} className={`${btn} bg-[#5FE0BC] text-gray-900 hover:bg-[#4fd3ae]`}>Mark as delivered</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}