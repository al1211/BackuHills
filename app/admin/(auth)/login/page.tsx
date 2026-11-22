"use client";
// Ise app/login/page.tsx (ya app/(auth)/login/page.tsx) me rakho.
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Icon } from "@tabler/icons-react";
import {
  IconAlertCircle,
  IconArchive,
  IconChartBar,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconShieldCheck,
  IconShoppingBag,
} from "@tabler/icons-react";

// DEMO login: ye details code me dikhti hain, to asli use ke liye hata dena.
// Neeche submit() me TODO wali jagah par apna API call lagao.
const DEMO = { email: "admin@backumhills.com", password: "admin123" };
const SHOW_DEMO = process.env.NODE_ENV !== "production"; // demo hint sirf development me dikhta hai
const REMEMBER_KEY = "bh_admin_email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: string; password?: string };

const FEATURES: { icon: Icon; title: string; text: string }[] = [
  { icon: IconShoppingBag, title: "Orders", text: "Naye orders dekho, ship karo aur deliver mark karo." },
  { icon: IconArchive, title: "Inventory", text: "Stock kam hote hi alert, aur har badlav ka record." },
  { icon: IconChartBar, title: "Sales", text: "Kya bik raha hai aur kahan se, ek nazar me." },
];

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [show, setShow] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pichli baar yaad rakha hua email bhar do, aur sahi box par cursor rakho
  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(REMEMBER_KEY) ?? "";
    } catch {
      /* private mode me storage band ho sakta hai */
    }
    if (saved) {
      setForm((f) => ({ ...f, email: saved }));
      passwordRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError("");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const errs: Errors = {};
    if (!EMAIL_RE.test(form.email.trim())) errs.email = "Sahi email likho, jaise name@example.com";
    if (!form.password) errs.password = "Password likho.";
    setErrors(errs);
    if (errs.email) return emailRef.current?.focus();
    if (errs.password) return passwordRef.current?.focus();

    setLoading(true);
    setFormError("");
    try {
      // TODO: yahan asli login lagao, jaise:
      // const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      // if (res.ok) { router.push("/dashboard"); return; }
      await new Promise((r) => setTimeout(r, 700)); // demo ke liye thoda wait
      const ok = form.email.trim().toLowerCase() === DEMO.email && form.password === DEMO.password;
      if (ok) {
        try {
          if (remember) localStorage.setItem(REMEMBER_KEY, form.email.trim());
          else localStorage.removeItem(REMEMBER_KEY);
        } catch {
          /* storage band ho to chhod do */
        }
        router.push("/dashboard");
        return; // loading true rehne do taaki dobara click na ho
      }
      setFormError("Email ya password galat hai. Dobara check karke try karo.");
      setForm((f) => ({ ...f, password: "" }));
      passwordRef.current?.focus();
    } catch {
      setFormError("Server tak pahunch nahi paye. Internet check karke dobara try karo.");
    }
    setLoading(false);
  };

  const fieldClass = (err?: string) =>
    `h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-4 ${
      err ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 hover:border-gray-300 focus:border-[#2FCB9F] focus:ring-[#5FE0BC]/25"
    }`;

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Left: brand panel (sirf bade screen par) */}
      <aside className="relative hidden overflow-hidden bg-[#0E2B24] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#5FE0BC]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#2FCB9F]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-12 top-1/3 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-24 top-1/3 mt-12 h-72 w-72 rounded-full border border-white/5" />

        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#5FE0BC] text-xl font-extrabold text-[#0E2B24]">B</div>
          <span className="text-lg font-bold tracking-tight">Backum Hills</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Poora store, ek hi jagah se.</h2>
          <p className="mt-4 text-base leading-relaxed text-emerald-50/70">
            Genuine leather ka kaam Kanpur se, aur uska hisaab-kitaab yahan se. Roz ke kaam ek screen par.
          </p>
          <ul className="mt-10 flex flex-col gap-6">
            {FEATURES.map(({ icon: FeatureIcon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-[#5FE0BC]">
                  <FeatureIcon size={20} stroke={1.7} />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-emerald-50/60">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-emerald-50/50">© {new Date().getFullYear()} Backum Hills · Kanpur, Uttar Pradesh</p>
      </aside>

      {/* Right: login form */}
      <section className="flex items-center justify-center bg-[#F7F9F8] px-5 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          {/* Chhote screen par logo yahan dikhta hai */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#5FE0BC] text-lg font-extrabold text-gray-900">B</div>
            <span className="font-bold text-gray-900">Backum Hills</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Apne admin account me login karo.</p>

          <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-5">
            {formError && (
              <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <IconMail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass(errors.email)}
                />
              </div>
              {errors.email && <p id="email-error" className="text-xs text-red-600" role="alert">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <IconLock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={passwordRef}
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={set("password")}
                  onKeyUp={(e) => setCapsOn(e.getModifierState("CapsLock"))}
                  onBlur={() => setCapsOn(false)}
                  placeholder="Apna password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`${fieldClass(errors.password)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Password chhupao" : "Password dikhao"}
                  aria-pressed={show}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-[#2FCB9F]"
                >
                  {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-xs text-red-600" role="alert">{errors.password}</p>}
              {capsOn && !errors.password && (
                <p className="flex items-center gap-1.5 text-xs text-amber-700" role="status">
                  <IconAlertCircle size={14} /> Caps Lock on hai.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#2FCB9F]"
                />
                Email yaad rakho
              </label>
              <span className="text-xs text-gray-400">Password bhool gaye? Owner se poochho.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5FE0BC] text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 transition hover:bg-[#4fd3ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2FCB9F] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <Spinner />}
              {loading ? "Login ho raha hai..." : "Log in"}
            </button>
          </form>

          {SHOW_DEMO && (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-xs text-gray-500">
              <p className="font-medium text-gray-600">Demo login (sirf development me dikhta hai)</p>
              <p className="mt-1">{DEMO.email} · {DEMO.password}</p>
              <button
                type="button"
                onClick={() => {
                  setForm(DEMO);
                  setErrors({});
                  setFormError("");
                }}
                className="mt-2 font-semibold text-[#0F7A5C] hover:underline"
              >
                Bhar do
              </button>
            </div>
          )}

          <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <IconShieldCheck size={14} /> Sirf authorised staff ke liye
          </p>
        </div>
      </section>
    </main>
  );
}