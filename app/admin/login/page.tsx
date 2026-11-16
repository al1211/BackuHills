"use client";
// Ek hi file me poora login page. Ise app/login/page.jsx me rakho.
// Sirf Tailwind aur @tabler/icons-react chahiye (jo aapke project me pehle se hain).
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

// DEMO login: ye details code me dikhti hain, to asli use ke liye mat rakhna.
// Neeche submit() me TODO wali jagah par apna API call lagao.
const DEMO = { email: "admin@backumhills.com", password: "admin123" };

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setErrors({ ...errors, [key]: "" });
    setFormError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Sahi email likho.";
    if (!form.password) errs.password = "Password likho.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setFormError("");
    try {
      // TODO: yahan asli login lagao, jaise:
      // const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      // if (res.ok) { router.push("/dashboard"); return; }
      await new Promise((r) => setTimeout(r, 600)); // demo ke liye thoda wait
      if (form.email.trim().toLowerCase() === DEMO.email && form.password === DEMO.password) {
        router.push("/dashboard");
        return; // loading true rehne do taaki dobara click na ho
      }
      setFormError("Email ya password galat hai.");
    } catch {
      setFormError("Server tak pahunch nahi paye. Dobara try karo.");
    }
    setLoading(false);
  };

  const field = (err) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 ${
      err ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:border-[#5FE0BC] focus:ring-[#5FE0BC]/25"
    }`;

  return (
    <main className="grid min-h-dvh place-items-center bg-gradient-to-br from-[#D5F7EB] via-[#97ECD3] to-[#5FE0BC] p-4">
      <section className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#5FE0BC] text-2xl font-extrabold text-gray-900">B</div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Backum Hills Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Apne account me login karo</p>
        </div>

        <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" autoComplete="email" autoFocus value={form.email} onChange={set("email")}
              placeholder="admin@backumhills.com" aria-invalid={!!errors.email} className={field(errors.email)} />
            {errors.email && <p className="text-xs text-red-600" role="alert">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} autoComplete="current-password" value={form.password}
                onChange={set("password")} placeholder="Apna password" aria-invalid={!!errors.password}
                className={`${field(errors.password)} pr-12`} />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Password chhupao" : "Password dikhao"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600" role="alert">{errors.password}</p>}
          </div>

          <p className="min-h-5 text-center text-sm text-red-600" role="alert" aria-live="polite">{formError}</p>

          <button type="submit" disabled={loading}
            className="rounded-xl bg-[#5FE0BC] px-4 py-3 text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 hover:bg-[#4fd3ae] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Login ho raha hai..." : "Log in"}
          </button>
        </form>
      </section>
    </main>
  );
}