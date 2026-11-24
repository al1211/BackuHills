"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
} from "@tabler/icons-react";

import { changeCustomerPassword } from "@/services/auth.services";
import { useAuthStore } from "@/store/auth.store";

export default function ChangePasswordPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setFormError("");
    setSuccess(false);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const newErrors: typeof errors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password likho.";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password likho.";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword =
        "Password kam se kam 8 characters ka hona chahiye.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password likho.";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords match nahi kar rahe.";
    }

    if (
      form.currentPassword &&
      form.newPassword &&
      form.currentPassword === form.newPassword
    ) {
      newErrors.newPassword =
        "New password current password se alag hona chahiye.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!accessToken) {
      setFormError("Session expire ho gaya hai. Dobara login karo.");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      await changeCustomerPassword(
        form.currentPassword,
        form.newPassword,
        accessToken
      );

      setSuccess(true);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Password change nahi ho paya. Dobara try karo."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error?: string) =>
    `h-12 w-full rounded-xl border bg-white pl-11 pr-12 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-4 ${
      error
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 hover:border-gray-300 focus:border-[#2FCB9F] focus:ring-[#5FE0BC]/25"
    }`;

  return (
    <main className="min-h-dvh bg-[#F7F9F8] px-4 py-10">
      <div className="mx-auto w-full max-w-md">

        {/* Brand */}
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2.5"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#5FE0BC] text-lg font-extrabold text-gray-900">
            B
          </span>

          <span className="font-bold text-gray-900">
            Backum Hills
          </span>
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Change Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Apne account ko secure rakhne ke liye password update karo.
          </p>

          {/* Success Message */}
          {success && (
            <div
              role="status"
              className="mt-6 flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-700"
            >
              <IconCheck size={19} className="mt-0.5 shrink-0" />

              <span>
                Password successfully change ho gaya hai.
              </span>
            </div>
          )}

          {/* Error Message */}
          {formError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
            >
              <IconAlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{formError}</span>
            </div>
          )}

          <form
            onSubmit={submit}
            noValidate
            className="mt-7 flex flex-col gap-5"
          >

            {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-700"
              >
                Current Password
              </label>

              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="currentPassword"
                  type={show.current ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Current password"
                  value={form.currentPassword}
                  onChange={(e) =>
                    updateField("currentPassword", e.target.value)
                  }
                  aria-invalid={!!errors.currentPassword}
                  className={inputClass(errors.currentPassword)}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Toggle current password visibility"
                >
                  {show.current ? (
                    <IconEyeOff size={19} />
                  ) : (
                    <IconEye size={19} />
                  )}
                </button>
              </div>

              {errors.currentPassword && (
                <p className="text-xs text-red-600" role="alert">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>

              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="newPassword"
                  type={show.new ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  value={form.newPassword}
                  onChange={(e) =>
                    updateField("newPassword", e.target.value)
                  }
                  aria-invalid={!!errors.newPassword}
                  className={inputClass(errors.newPassword)}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Toggle new password visibility"
                >
                  {show.new ? (
                    <IconEyeOff size={19} />
                  ) : (
                    <IconEye size={19} />
                  )}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-xs text-red-600" role="alert">
                  {errors.newPassword}
                </p>
              )}

              <p className="text-xs text-gray-400">
                Minimum 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={show.confirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  aria-invalid={!!errors.confirmPassword}
                  className={inputClass(errors.confirmPassword)}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Toggle confirm password visibility"
                >
                  {show.confirm ? (
                    <IconEyeOff size={19} />
                  ) : (
                    <IconEye size={19} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-600" role="alert">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5FE0BC] text-sm font-semibold text-gray-900 shadow-md shadow-[#5FE0BC]/40 transition hover:bg-[#4fd3ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2FCB9F] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    strokeWidth="3"
                  />

                  <path
                    d="M22 12a10 10 0 0 0-10-10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <Link
          href="/account"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <IconArrowLeft size={16} />
          Back to Account
        </Link>

      </div>
    </main>
  );
}