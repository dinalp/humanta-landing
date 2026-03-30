"use client";

import { useState } from "react";

const employeeOptions = [
  "1-20",
  "21-50",
  "51-100",
  "101-250",
  "250+",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    employees: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", employees: "", notes: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 lg:p-10"
      style={{ backgroundColor: "#242424" }}
    >
      {/* Name + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] placeholder-[#666] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] placeholder-[#666] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30"
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="email"
            className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] placeholder-[#666] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+123456789"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] placeholder-[#666] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30"
          />
        </div>
      </div>

      {/* Employees row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="employees"
            className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
          >
            Employees{" "}
            <span className="text-[#666] font-normal">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30"
              style={{ color: formData.employees ? "#F5F5F0" : "#666" }}
            >
              <option value="" disabled>
                Select...
              </option>
              {employeeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label
          htmlFor="notes"
          className="block text-[14px] font-medium text-[#F5F5F0] mb-2"
        >
          Notes <span className="text-[#666] font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="I need..."
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl px-4 py-3 text-[15px] text-[#F5F5F0] placeholder-[#666] bg-[#1A1A1A] border border-[#333] outline-none transition-all duration-200 focus:border-[#F26B3A] focus:ring-1 focus:ring-[#F26B3A]/30 resize-y"
        />
      </div>

      {/* Submit button */}
      {status === "success" ? (
        <div className="w-full rounded-full py-4 text-center text-[16px] font-semibold text-[#00B890] bg-[#00B890]/10 border border-[#00B890]/20">
          Thanks! We&apos;ll be in touch shortly.
        </div>
      ) : (
        <>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group w-full relative flex items-center justify-center rounded-full py-4 text-[16px] font-semibold text-[#1A1A1A] bg-[#F5F5F0] hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending..." : "Submit form"}
            <span className="absolute right-2 w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F5F5F0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
          {status === "error" && (
            <p className="text-[#F26B3A] text-[14px] text-center mt-3">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </form>
  );
}
