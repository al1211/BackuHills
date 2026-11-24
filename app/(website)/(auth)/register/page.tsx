"use client";
// Ek hi file me poora customer register. Ise app/account/register/page.tsx me rakho.
import { useState } from "react";
import { registerCustomer } from "@/services/auth.services";
import Link from "next/link";
import { IconAlertCircle, IconCircleCheck, IconEye, IconEyeOff, IconLock, IconMail, IconPhone, IconUser, IconMapPin, IconTruckDelivery, IconBolt } from "@tabler/icons-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/; // Indian mobile: 10 digit, 6-9 se shuru

type Payload = { name: string; email: string; phone: string; password: string;};

async function register(
  p: Payload
): Promise<{ ok: boolean; field?: "email"; error?: string }> {
  try {
    await registerCustomer({
      name: p.name,
      email: p.email,
      phone: p.phone,
      password: p.password,
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
}

type Form = { name: string; email: string; phone: string; password: string;  terms: boolean; newsletter: boolean };
type Field = "name" | "email" | "phone" | "password" | "confirm" | "terms";
type Errors = Partial<Record<Field, string>>;
const ORDER: Field[] = ["name", "email", "phone", "password", "confirm", "terms"];

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Apna poora naam likho.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Sahi email likho, jaise name@example.com";
  if (!PHONE_RE.test(f.phone)) e.phone = "10 digit ka mobile number likho (6, 7, 8 ya 9 se shuru).";
  if (f.password.length < 8) e.password = "Password kam se kam 8 characters ka ho.";
  else if (!/[A-Za-z]/.test(f.password) || !/\d/.test(f.password)) e.password = "Password me letter aur number dono hone chahiye.";

  if (!f.terms) e.terms = "Aage badhne ke liye shartein maanna zaroori hai.";
  return e;
}

function score(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) s++;
  return pw ? s : 0;
}
const LABELS = ["", "Kamzor", "Theek hai", "Accha", "Bahut accha"];
const COLORS = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];

const PERKS = [
  { icon: IconTruckDelivery, title: "Order track karo", text: "Har order ki delivery ka status ek jagah." },
  { icon: IconMapPin, title: "Address save rakho", text: "Dobara order par address nahi bharna padega." },
  { icon: IconBolt, title: "Tez checkout", text: "Kam steps me order, aur pichle orders ka record." },
];

const field = (err?: string, left = "pl-11") =>
  `h-12 w-full rounded-xl border bg-white ${left} pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-4 ${
    err ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 hover:border-gray-300 focus:border-[#2FCB9F] focus:ring-[#5FE0BC]/25"
  }`;

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", password: "", terms: false, newsletter: false });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setFormError("");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const errs = validate(form);
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) return document.getElementById(first)?.focus();

    setLoading(true);
    try {
      const res = await register({ name: form.name.trim(), email: form.email.trim(), phone: form.phone, password: form.password });
      if (res.ok) return setDone(true);
      if (res.field) {
        setErrors({ [res.field]: res.error });
        document.getElementById(res.field)?.focus();
      } else setFormError(res.error ?? "Account nahi ban paya.");
    } catch {
      setFormError("Server tak pahunch nahi paye. Internet check karke dobara try karo.");
    }
    setLoading(false);
  };

  const s = score(form.password);
  const Err = ({ id }: { id: Field }) => (errors[id] ? <p id={`${id}-error`} className="text-xs text-red-600" role="alert">{errors[id]}</p> : null);
  const Icon = ({ i: I }: { i: typeof IconMail }) => <I size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />;

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
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Account banao, order karna aasaan.</h2>
          <ul className="mt-10 flex flex-col gap-6">
            {PERKS.map(({ icon: I, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-[#5FE0BC]"><I size={20} stroke={1.7} /></span>
                <div><p className="font-semibold">{title}</p><p className="text-sm text-emerald-50/60">{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-emerald-50/50">© {new Date().getFullYear()} Backum Hills · Kanpur</p>
      </aside>

      <section className="flex items-center justify-center bg-[#F7F9F8] px-5 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#5FE0BC] text-lg font-extrabold text-gray-900">B</div>
            <span className="font-bold text-gray-900">Backum Hills</span>
          </div>

          {done ? (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#E3F8F1] text-[#0F7A5C]"><IconCircleCheck size={32} /></span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Account ban gaya!</h1>
                <p className="mt-1 text-sm text-gray-500">{form.name.trim().split(" ")[0]}, Backum Hills me aapka swagat hai.</p>
              </div>
              <Link href="/account/login" className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5FE0BC] text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 hover:bg-[#4fd3ae]">Login karo</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Account banao</h1>
              <p className="mt-2 text-sm text-gray-500">Kuch hi seconds me account ready.</p>

              <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-5">
                {formError && (
                  <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                    <IconAlertCircle size={18} className="mt-0.5 shrink-0" /> <span>{formError}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Poora naam</label>
                  <div className="relative"><Icon i={IconUser} />
                    <input id="name" autoFocus autoComplete="name" placeholder="Rohit Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} className={field(errors.name)} />
                  </div><Err id="name" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative"><Icon i={IconMail} />
                    <input id="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={field(errors.email)} />
                  </div><Err id="email" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile number</label>
                  <div className="relative"><Icon i={IconPhone} />
                    <span className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm text-gray-500">+91</span>
                    <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="98765 43210" value={form.phone}
                      onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={!!errors.phone} className={field(errors.phone, "pl-18")} />
                  </div>
                  {errors.phone ? <Err id="phone" /> : <p className="text-xs text-gray-400">Delivery ke liye zaroori hai.</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative"><Icon i={IconLock} />
                    <input id="password" type={show ? "text" : "password"} autoComplete="new-password" placeholder="Kam se kam 8 characters" value={form.password}
                      onChange={(e) => set("password", e.target.value)} aria-invalid={!!errors.password} className={`${field(errors.password)} pr-12`} />
                    <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Password chhupao" : "Password dikhao"} aria-pressed={show}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                      {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </button>
                  </div>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors ${s >= n ? COLORS[s] : "bg-gray-200"}`} />)}
                  </div>
                  {errors.password ? <Err id="password" /> : <p className="text-xs text-gray-500" aria-live="polite">{form.password ? `Password: ${LABELS[s]}` : "Letter aur number dono rakho."}</p>}
                </div>

               
                <div className="flex flex-col gap-3 text-sm text-gray-600">
                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input id="terms" type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} aria-invalid={!!errors.terms} className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#2FCB9F]" />
                      <span>Main <Link href="/terms" className="font-medium text-[#0F7A5C] hover:underline">Terms & Conditions</Link> aur <Link href="/privacy" className="font-medium text-[#0F7A5C] hover:underline">Privacy Policy</Link> se sehmat hoon.</span>
                    </label>
                    {errors.terms && <p className="mt-1 text-xs text-red-600" role="alert">{errors.terms}</p>}
                  </div>
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input type="checkbox" checked={form.newsletter} onChange={(e) => set("newsletter", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#2FCB9F]" />
                    <span>Mujhe naye products aur offers ki email bhejo (optional).</span>
                  </label>
                </div>

                <button type="submit" disabled={loading}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5FE0BC] text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 transition hover:bg-[#4fd3ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2FCB9F] disabled:cursor-not-allowed disabled:opacity-70">
                  {loading && (
                    <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  {loading ? "Account ban raha hai..." : "Account banao"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Pehle se account hai? <Link href="/login" className="font-semibold text-[#0F7A5C] hover:underline">Login karo</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}