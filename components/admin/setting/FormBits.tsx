export const input = "w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5FE0BC]/30";

export function Field({ label, hint, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600" role="alert">{error}</span> : hint && <span className="text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

export function Toggle({ on, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-sm font-medium text-gray-700">{label}</p>{hint && <p className="text-xs text-gray-400">{hint}</p>}</div>
      <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#2FCB9F]" : "bg-gray-300"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}