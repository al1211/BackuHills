"use client";
import { useState ,useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginCustomer, getAuthenticatedUser } from "@/services/auth.services";
import { IconAlertCircle, IconEye, IconEyeOff, IconLock, IconMail, IconMapPin, IconTruckDelivery, IconBolt } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth.store";


const SHOW_DEMO = process.env.NODE_ENV !== "production";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function login(
  email: string,
  password: string
) {
  try {
    // Step 1: Login API
    const result = await loginCustomer({
      email,
      password,
    });

    // Step 2: Access token
    const accessToken = result.accessToken;

    // Step 3: Customer details
    const customer = await getAuthenticatedUser(accessToken);

    // Step 4: Return customer and token
    return {
      ok: true as const,
      customer,
      accessToken,
    };
  } catch (error) {
    return {
      ok: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Email ya password galat hai. Dobara try karo.",
    };
  }
}


const PERKS = [
  { icon: IconTruckDelivery, title: "Order track karo", text: "Har order ki delivery ka status ek jagah." },
  { icon: IconMapPin, title: "Address save rakho", text: "Dobara order par address nahi bharna padega." },
  { icon: IconBolt, title: "Tez checkout", text: "Kam steps me order, aur pichle orders ka record." },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [show, setShow] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const set = (k: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setFormError("");
  };

   useEffect(() => {
  setCurrentYear(new Date().getFullYear());
}, []);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const errs: typeof errors = {};
    if (!EMAIL_RE.test(form.email.trim())) errs.email = "Sahi email likho, jaise name@example.com";
    if (!form.password) errs.password = "Password likho.";
    setErrors(errs);
    const first = errs.email ? "email" : errs.password ? "password" : "";
    if (first) return document.getElementById(first)?.focus();

    setLoading(true);
    try {
      const res = await login(form.email.trim(), form.password);

      if (res.ok) {
        // Zustand store update
        setAuth(res.customer, res.accessToken);

        const next = new URLSearchParams(window.location.search).get("next") ?? "";

        router.push(
          next.startsWith("/") && !next.startsWith("//")
            ? next
            : "/account"
        );

        return;
      }
      setFormError(res.error ?? "Login nahi ho paya.");
      setForm((f) => ({ ...f, password: "" }));
      document.getElementById("password")?.focus();
    } catch {
      setFormError("Server tak pahunch nahi paye. Internet check karke dobara try karo.");
    }
    setLoading(false);
  };

  const field = (err?: string) =>
    `h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-4 ${err ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 hover:border-gray-300 focus:border-[#2FCB9F] focus:ring-[#5FE0BC]/25"
    }`;

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <aside className="relative hidden overflow-hidden bg-[#0E2B24] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#5FE0BC]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#2FCB9F]/15 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#5FE0BC] text-xl font-extrabold text-[#0E2B24]">B</div>
          <span className="text-lg font-bold">Backum Hills</span>
        </div>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Asli leather, Kanpur se seedha aap tak.</h2>
          <ul className="mt-10 flex flex-col gap-6">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-[#5FE0BC]"><Icon size={20} stroke={1.7} /></span>
                <div><p className="font-semibold">{title}</p><p className="text-sm text-emerald-50/60">{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-emerald-50/50">
  © {currentYear ?? "2026"} Backum Hills · Kanpur
</p>
      </aside>

      <section className="flex items-center justify-center bg-[#F7F9F8] px-5 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#5FE0BC] text-lg font-extrabold text-gray-900">B</div>
            <span className="font-bold text-gray-900">Backum Hills</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Apne account me login karo.</p>

          <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-5">
            {formError && (
              <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <IconAlertCircle size={18} className="mt-0.5 shrink-0" /> <span>{formError}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <IconMail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="email" type="email" inputMode="email" autoComplete="email" autoFocus value={form.email} onChange={set("email")}
                  placeholder="name@example.com" aria-invalid={!!errors.email} className={field(errors.email)} />
              </div>
              {errors.email && <p className="text-xs text-red-600" role="alert">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Link href="/account/forgot-password" className="text-xs font-medium text-[#0F7A5C] hover:underline">Password bhool gaye?</Link>
              </div>
              <div className="relative">
                <IconLock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="password" type={show ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={set("password")}
                  onKeyUp={(e) => setCapsOn(e.getModifierState("CapsLock"))} onBlur={() => setCapsOn(false)}
                  placeholder="Apna password" aria-invalid={!!errors.password} className={`${field(errors.password)} pr-12`} />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Password chhupao" : "Password dikhao"} aria-pressed={show}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600" role="alert">{errors.password}</p>}
              {capsOn && !errors.password && <p className="flex items-center gap-1.5 text-xs text-amber-700" role="status"><IconAlertCircle size={14} /> Caps Lock on hai.</p>}
            </div>

            <button type="submit" disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5FE0BC] text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 transition hover:bg-[#4fd3ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2FCB9F] disabled:cursor-not-allowed disabled:opacity-70">
              {loading && (
                <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {loading ? "Login ho raha hai..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New Customers? <Link href="/" className="font-semibold text-[#0F7A5C] hover:underline">Account banao</Link>
          </p>


        </div>
      </section>
    </main>
  );
}