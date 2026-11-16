"use client";
import { useEffect, useMemo, useState } from "react";
import { IconBuildingStore, IconTruckDelivery, IconWorld, IconBrandInstagram, IconBell, IconLock } from "@tabler/icons-react";
import { Field, Toggle, input } from "./FormBits";

// type: text | email | tel | number | url | textarea | toggle
const SECTIONS = [
  { key: "store", label: "Store details", icon: IconBuildingStore, fields: [
    { k: "storeName", label: "Store name", type: "text", required: true },
    { k: "supportEmail", label: "Support email", type: "email", required: true, hint: "Customers is email par aapse baat karenge." },
    { k: "phone", label: "Phone number", type: "tel", hint: "10 digit, bina +91 ke" },
    { k: "whatsapp", label: "WhatsApp number", type: "tel", hint: "Khali chhodo to website par WhatsApp button nahi dikhega" },
    { k: "address", label: "Factory / store address", type: "textarea" },
    { k: "hours", label: "Business hours", type: "text" },
  ] },
  { key: "shipping", label: "Shipping & payment", icon: IconTruckDelivery, fields: [
    { k: "freeShippingAbove", label: "Free shipping above (₹)", type: "number" },
    { k: "shippingFee", label: "Shipping fee below that (₹)", type: "number" },
    { k: "deliveryDays", label: "Delivery time", type: "text", hint: "Jaise: 4-7 working days" },
    { k: "codEnabled", label: "Cash on delivery (COD)", type: "toggle", hint: "Band karne par checkout par COD nahi dikhega" },
    { k: "codFee", label: "COD extra charge (₹)", type: "number", hint: "0 = koi extra charge nahi" },
  ] },
  { key: "website", label: "Website text", icon: IconWorld, fields: [
    { k: "announcement", label: "Announcement bar", type: "text", hint: "Website ke sabse upar wali line" },
    { k: "heroTitle", label: "Homepage heading", type: "text" },
    { k: "heroSubtitle", label: "Homepage subheading", type: "textarea" },
    { k: "newsletterText", label: "Newsletter text", type: "text", hint: "Footer me email box ke upar" },
  ] },
  { key: "social", label: "Social links", icon: IconBrandInstagram, fields: [
    { k: "instagram", label: "Instagram", type: "url" },
    { k: "facebook", label: "Facebook", type: "url" },
    { k: "youtube", label: "YouTube", type: "url" },
    { k: "x", label: "X (Twitter)", type: "url", hint: "Sirf apne asli account ka link daalo. Khali chhodo to footer me icon nahi dikhega." },
  ] },
  { key: "alerts", label: "Notifications", icon: IconBell, fields: [
    { k: "emailNewOrder", label: "Naye order par email", type: "toggle" },
    { k: "emailNewReview", label: "Naye review par email", type: "toggle" },
    { k: "emailLowStock", label: "Low stock par email", type: "toggle" },
    { k: "lowStockLevel", label: "Low stock tab maano jab stock itna ho", type: "number" },
  ] },
];
const SECURITY = { key: "security", label: "Security", icon: IconLock };

const norm = (o) => JSON.stringify(Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === "boolean" ? v : String(v)])));

function validate(values) {
  const errors = {};
  SECTIONS.forEach((s) => s.fields.forEach((f) => {
    const v = String(values[f.k] ?? "").trim();
    if (f.required && !v) errors[f.k] = "Ye zaroori hai.";
    else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors[f.k] = "Sahi email likho.";
    else if (v && f.type === "tel" && !/^\d{10}$/.test(v)) errors[f.k] = "10 digit ka number likho.";
    else if (v && f.type === "url" && !/^https:\/\/\S+\.\S+/.test(v)) errors[f.k] = "https:// se shuru hone wala poora link likho.";
    else if (v && f.type === "number" && !(Number(v) >= 0)) errors[f.k] = "0 ya usse zyada number likho.";
  }));
  return errors;
}

export default function SettingsManager({ initial, cheapestPrice }) {
  const [saved, setSaved] = useState(initial);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [tab, setTab] = useState("store");
  const [msg, setMsg] = useState("");
  const [pin, setPin] = useState({ current: "", next: "", confirm: "" });
  const [pinMsg, setPinMsg] = useState({ ok: false, text: "" });

  const dirty = useMemo(() => norm(values) !== norm(saved), [values, saved]);
  useEffect(() => {
    const warn = (e) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (k, v) => { setValues({ ...values, [k]: v }); setMsg(""); setErrors({ ...errors, [k]: undefined }); };

  // TODO: yahan API call lagao (PUT /api/settings) — abhi sirf page ki memory me save hota hai
  const save = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const bad = SECTIONS.find((s) => s.fields.some((f) => errs[f.k]));
    if (bad) { setTab(bad.key); return setMsg("Kuch fields theek karni hain."); }
    const clean = { ...values };
    SECTIONS.forEach((s) => s.fields.forEach((f) => { if (f.type === "number") clean[f.k] = Number(values[f.k] || 0); else if (typeof clean[f.k] === "string") clean[f.k] = clean[f.k].trim(); }));
    setSaved(clean); setValues(clean); setMsg("Settings save ho gayi.");
  };
  const reset = () => { setValues(saved); setErrors({}); setMsg(""); };

  // TODO: yahan server par purana PIN verify karke naya set karo (POST /api/change-pin)
  const changePin = (e) => {
    e.preventDefault();
    const six = (s) => /^\d{6}$/.test(s);
    const fail = (text) => setPinMsg({ ok: false, text });
    if (!six(pin.current)) return fail("Abhi ka PIN 6 digit ka hona chahiye.");
    if (!six(pin.next)) return fail("Naya PIN sirf 6 digit (number) ka ho.");
    if (pin.next === pin.current) return fail("Naya PIN purane se alag rakho.");
    if (pin.next !== pin.confirm) return fail("Naya PIN dono jagah same likho.");
    setPin({ current: "", next: "", confirm: "" });
    setPinMsg({ ok: true, text: "PIN badal gaya (demo: server par abhi save nahi hota)." });
  };

  const section = SECTIONS.find((s) => s.key === tab);
  const tabs = [...SECTIONS, SECURITY];
  const freeAlways = Number(values.freeShippingAbove) > 0 && Number(values.freeShippingAbove) <= cheapestPrice;

  const renderField = (f) => {
    const err = errors[f.k];
    if (f.type === "toggle") return <Toggle key={f.k} on={!!values[f.k]} onChange={() => set(f.k, !values[f.k])} label={f.label} hint={f.hint} />;
    const common = { value: values[f.k] ?? "", onChange: (e) => set(f.k, e.target.value), className: `${input} ${err ? "border-red-300" : "border-gray-200 focus:border-[#5FE0BC]"}`, "aria-invalid": !!err };
    return (
      <Field key={f.k} label={f.label} hint={f.hint} error={err}>
        {f.type === "textarea" ? <textarea rows={3} {...common} /> : <input type={f.type === "number" ? "number" : f.type} min={f.type === "number" ? 0 : undefined} inputMode={f.type === "tel" || f.type === "number" ? "numeric" : undefined} {...common} />}
      </Field>
    );
  };

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <div role="tablist" aria-label="Settings sections" className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}
            className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm font-medium ${tab === key ? "bg-[#5FE0BC] text-gray-900 shadow-md shadow-[#5FE0BC]/40" : "text-gray-600 hover:bg-white"}`}>
            <Icon size={18} stroke={1.7} /> {label}
            {SECTIONS.find((s) => s.key === key)?.fields.some((f) => errors[f.k]) && <span className="h-2 w-2 rounded-full bg-red-500" aria-label="Error hai" />}
          </button>
        ))}
      </div>

      {tab === "security" ? (
        <form onSubmit={changePin} className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4"><h2 className="text-lg font-bold text-gray-900">Admin PIN badlo</h2><p className="text-sm text-gray-500">Login ke liye 6 digit ka PIN.</p></div>
          <div className="grid max-w-sm gap-4 px-5 py-5">
            {[["current", "Abhi ka PIN"], ["next", "Naya PIN"], ["confirm", "Naya PIN dobara"]].map(([k, l]) => (
              <Field key={k} label={l}>
                <input type="password" inputMode="numeric" maxLength={6} autoComplete="off" value={pin[k]} onChange={(e) => { setPin({ ...pin, [k]: e.target.value.replace(/\D/g, "") }); setPinMsg({ ok: false, text: "" }); }} className={`${input} border-gray-200 tracking-[0.4em] focus:border-[#5FE0BC]`} />
              </Field>
            ))}
          </div>
          <div className="flex items-center gap-3 border-t border-gray-100 px-5 py-4">
            <button type="submit" className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae]">Change PIN</button>
            <span className={`text-sm ${pinMsg.ok ? "text-emerald-700" : "text-red-600"}`} role="status">{pinMsg.text}</span>
          </div>
        </form>
      ) : (
        <form onSubmit={save} className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4"><h2 className="text-lg font-bold text-gray-900">{section.label}</h2></div>
          <div className="grid gap-5 px-5 py-5 sm:grid-cols-2">
            {section.fields.map((f) => (
              <div key={f.k} className={f.type === "textarea" || f.type === "toggle" ? "sm:col-span-2" : ""}>{renderField(f)}</div>
            ))}
            {tab === "shipping" && freeAlways && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 sm:col-span-2">
                Aapka sabse sasta product ₹{cheapestPrice.toLocaleString("en-IN")} ka hai, to ₹{Number(values.freeShippingAbove).toLocaleString("en-IN")} par free shipping lagbhag <strong>har order par</strong> lagegi aur shipping fee kabhi nahi lagegi. Agar ye aapka iraada nahi hai, to limit badhao.
              </p>
            )}
          </div>
          <div className="sticky bottom-0 flex flex-wrap items-center gap-3 rounded-b-xl border-t border-gray-100 bg-white px-5 py-4">
            <span className={`min-w-0 flex-1 text-sm ${Object.values(errors).some(Boolean) ? "text-red-600" : dirty ? "text-amber-700" : "text-emerald-700"}`} role="status">
              {msg || (dirty ? "Unsaved changes hain." : "")}
            </span>
            <button type="button" onClick={reset} disabled={!dirty} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40">Reset</button>
            <button type="submit" disabled={!dirty} className="rounded-lg bg-[#5FE0BC] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#4fd3ae] disabled:opacity-40">Save changes</button>
          </div>
        </form>
      )}
    </div>
  );
}