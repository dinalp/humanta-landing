"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your email service (Resend/n8n workflow)
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/logo-white.png"
            alt="Humanta"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
          <a
            href="#contact"
            className="bg-humanta-orange text-white px-6 py-2.5 rounded-full font-medium hover:bg-humanta-red-orange transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient orbs in background */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-humanta-orange/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-humanta-mint/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-humanta-teal/20 rounded-full blur-[128px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 text-white">
            Where human connection becomes{" "}
            <span className="gradient-text">company policy</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto text-gray-300">
            Curated dinner experiences that turn employee benefits into
            meaningful moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="gradient-bg px-8 py-4 rounded-full font-semibold text-lg text-white hover:opacity-90 transition-opacity"
            >
              Learn More
            </a>
            <a
              href="#how-it-works"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-humanta-orange/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Your team deserves more than another gift card
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Traditional employee perks feel transactional. Gym memberships go
              unused. Vouchers get forgotten in inboxes. Meanwhile, your people
              are craving something real—genuine connection with the humans
              they work alongside every day.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-humanta-orange/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-orange">
                  <svg
                    className="w-8 h-8 text-humanta-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Wasted Benefits
                </h3>
                <p className="text-gray-500 text-sm">
                  70% of employee perks go unused or undervalued
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-humanta-mint/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-mint">
                  <svg
                    className="w-8 h-8 text-humanta-mint"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Disconnected Teams
                </h3>
                <p className="text-gray-500 text-sm">
                  Remote & hybrid work has eroded organic connection
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-humanta-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-humanta-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Impersonal Perks
                </h3>
                <p className="text-gray-500 text-sm">
                  One-size-fits-all benefits miss the mark
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-humanta-mint/10 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-humanta-orange font-medium text-sm uppercase tracking-wider">
                Introducing
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 mb-6">
                Humanta Nights
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                We curate unforgettable dinner experiences for your employees
                and their partners. Premium restaurants. Thoughtfully designed
                evenings. Real conversations over great food.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                It&apos;s an employee benefit that actually gets used—and
                remembered.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-humanta-mint flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Hand-picked restaurant experiences in Sydney
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-humanta-mint flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Partners welcome—extend the benefit to loved ones
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-humanta-mint flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Zero admin burden for HR teams
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 gradient-bg-static opacity-20 rounded-3xl blur-xl" />
              <div className="relative bg-[#111111] rounded-3xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    $350 AUD
                  </h3>
                  <p className="text-gray-500 mb-6">per couple, per experience</p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        className="w-5 h-5 text-humanta-mint"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Multi-course dinner</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        className="w-5 h-5 text-humanta-mint"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Premium venue</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        className="w-5 h-5 text-humanta-mint"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>All-inclusive experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-humanta-orange/10 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              How Humanta Works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Simple for HR. Memorable for employees. Zero hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 gradient-bg text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">
                Set Your Budget
              </h3>
              <p className="text-gray-500 text-sm">
                Fund a quarterly pool of experiences for your team
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 gradient-bg text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">
                Nominate Employees
              </h3>
              <p className="text-gray-500 text-sm">
                Reward top performers, celebrate milestones, or treat the whole
                team
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 gradient-bg text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">We Handle It</h3>
              <p className="text-gray-500 text-sm">
                We coordinate directly with your employees to book their perfect
                night
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 gradient-bg text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                4
              </div>
              <h3 className="font-semibold text-white mb-2">They Connect</h3>
              <p className="text-gray-500 text-sm">
                Your people enjoy an unforgettable evening with their partner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Companies */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-humanta-teal/10 rounded-full blur-[200px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Why Companies Choose Humanta
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Benefits that HR teams love and employees actually use
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-orange/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-orange/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                100% Utilization
              </h3>
              <p className="text-gray-500 text-sm">
                No more unused vouchers or forgotten perks. Employees are
                excited to redeem their Humanta Night.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-mint/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-mint/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-mint"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Zero Admin Work
              </h3>
              <p className="text-gray-500 text-sm">
                We handle all coordination, bookings, and communication. Your HR
                team just approves nominations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-yellow/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-yellow/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-yellow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Partner-Inclusive
              </h3>
              <p className="text-gray-500 text-sm">
                Recognise the whole person. When partners are included, the
                benefit feels more meaningful.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-orange/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-orange/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Predictable Costs
              </h3>
              <p className="text-gray-500 text-sm">
                Quarterly funding pools mean no surprise liabilities or rollover
                headaches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-mint/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-mint/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-mint"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Culture Builder
              </h3>
              <p className="text-gray-500 text-sm">
                Create talking points and shared memories that strengthen your
                company culture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-humanta-yellow/50 transition-colors">
              <div className="w-12 h-12 bg-humanta-yellow/20 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-humanta-yellow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">
                Premium Experience
              </h3>
              <p className="text-gray-500 text-sm">
                Curated restaurants and seamless service reflect well on your
                company&apos;s standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-humanta-orange/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-humanta-mint/20 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to transform your employee benefits?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Get in touch to learn how Humanta can work for your team
          </p>

          {submitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <svg
                className="w-16 h-16 text-humanta-mint mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-2">Thank you!</h3>
              <p className="text-gray-300">
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-humanta-mint transition-colors"
                />
                <button
                  type="submit"
                  className="gradient-bg px-8 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Get in Touch
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-500">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@humanta.co"
                  className="text-humanta-mint hover:underline"
                >
                  hello@humanta.co
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Image
                src="/logo-white.png"
                alt="Humanta"
                width={120}
                height={35}
                className="h-7 w-auto mb-2"
              />
              <p className="text-gray-500 text-sm">
                Where human connection becomes company policy
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Sydney, Australia</span>
              <a
                href="mailto:hello@humanta.co"
                className="hover:text-humanta-mint transition-colors"
              >
                hello@humanta.co
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Humanta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
