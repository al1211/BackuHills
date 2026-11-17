// items = [{ label, value, color }]  — pure SVG, koi library nahi
const R = 15.9155; // circumference = 100, isliye value seedha % ban jaati hai

export default function DonutChart({ title, items }: { title: string; items: { label: string; value: number; color: string }[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  let offset = 25; // 12 baje se shuru
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row lg:flex-col xl:flex-row">
        <svg viewBox="0 0 42 42" className="h-40 w-40 shrink-0" role="img" aria-label={title}>
          <circle cx="21" cy="21" r={R} fill="none" stroke="#EEF1F0" strokeWidth="5" />
          {items.map((i) => {
            const pct = (i.value / total) * 100;
            const el = (
              <circle key={i.label} cx="21" cy="21" r={R} fill="none" stroke={i.color} strokeWidth="5"
                strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={offset} />
            );
            offset -= pct;
            return el;
          })}
        </svg>
        <ul className="w-full space-y-2.5 text-sm">
          {items.map((i) => (
            <li key={i.label} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: i.color }} />
              <span className="flex-1 text-gray-700">{i.label}</span>
              <span className="font-semibold text-gray-900">{Math.round((i.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}