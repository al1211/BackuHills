"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  getCustomerProfile,
  updateCustomerProfile,
  CustomerProfile,
} from "@/services/profile.service";

export default function ProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        setError("Please login again to access your profile.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const user = await getCustomerProfile(accessToken);

        setCustomer(user);

        setForm({
          name: user.name || "",
          phone: user.phone || "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  // Handle Input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Update Profile
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      setError("Please login again.");
      return;
    }

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updatedUser = await updateCustomerProfile(
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
        },
        accessToken
      );

      setCustomer(updatedUser);

      setForm({
        name: updatedUser.name,
        phone: updatedUser.phone,
      });

      // Update Zustand Store
      setAuth(updatedUser, accessToken);

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      </div>
    );
  }

  // Error State
  if (!customer) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-600">
            {error || "Profile information could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7954]">
            My Account
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#25211d] sm:text-4xl">
            Personal Information
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Manage your personal details and account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-[#e9e4dc] bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-[#eee9e2] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eee8df] text-3xl font-semibold uppercase text-[#795b3c]">
                {customer.name?.charAt(0) || "U"}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#25211d]">
                  {customer.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {customer.email}
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    customer.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {customer.isActive ? "Active Account" : "Inactive Account"}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">

            <div className="mb-7">
              <h3 className="text-lg font-semibold text-[#25211d]">
                Edit Details
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update your personal information below.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#98734e] focus:ring-2 focus:ring-[#98734e]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={customer.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-[#e5e0d8] bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                />

                <p className="mt-1.5 text-xs text-gray-400">
                  Email address cannot be changed.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  className="w-full rounded-lg border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#98734e] focus:ring-2 focus:ring-[#98734e]/10"
                />
              </div>

              {/* Account Type */}
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Account Type
                </label>

                <input
                  id="role"
                  type="text"
                  value={customer.role}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-[#e5e0d8] bg-gray-50 px-4 py-3 text-sm capitalize text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#eee9e2] pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: customer.name,
                    phone: customer.phone,
                  });

                  setError("");
                  setSuccess("");
                }}
                className="rounded-lg border border-[#ded8cf] px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#29231d] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#493b2e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="mt-6 rounded-2xl border border-[#e9e4dc] bg-white p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[#25211d]">
            Account Information
          </h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Member Since
              </p>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Email Verification
              </p>

              <p className="mt-2 text-sm font-medium text-gray-700">
                {customer.emailVerifiedAt ? "Verified" : "Not Verified"}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}