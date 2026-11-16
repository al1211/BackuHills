// items = [{ label, value }]; format = value ko dikhane ka tareeka
export default function BarList({ title, items, format = (v) => v.toLocaleString("en-IN"), note }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {note && <p className="text-xs text-gray-400">{note}</p>}
      <ul className="mt-4 flex flex-col gap-4">
        {items.length === 0 && <li className="text-sm text-gray-400">Abhi data nahi hai.</li>}
        {items.map((i) => (
          <li key={i.label}>
            <div className="flex justify-between gap-3 text-sm">
              <span className="truncate font-medium text-gray-800">{i.label}</span>
              <span className="shrink-0 text-gray-600">{format(i.value)}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-[#5FE0BC]" style={{ width: `${(i.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}