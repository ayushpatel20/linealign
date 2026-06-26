"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "simple",
    name: "Simple Case",
    description: "Ideal for minor spacing, crowding, or orthodontic alignment corrections.",
    priceUsd: "300",
    priceInr: "300",
    details: "Less than 15 Tray sets",
    features: [
      "Less than 15 Tray sets",
      "Retainers included",
      "Splints included",
      "Aligner Carrying Box",
      "Free Re-Submission (Refinements)",
      "Treatment Tracking integration"
    ]
  },
  {
    id: "complex",
    name: "Complex Case",
    description: "Designed for advanced misalignment and full-arch restorative rotation.",
    priceUsd: "750",
    priceInr: "600",
    details: "More than 15 Tray Sets",
    features: [
      "More than 15 Tray Sets",
      "Unlimited Trays for Single Case",
      "Retainers included",
      "Splints included",
      "Aligner Carrying Box",
      "Free Re-Submission (Refinements)",
      "Treatment Tracking integration"
    ],
    popular: true
  },
  {
    id: "triple",
    name: "3 Complex Cases",
    description: "Best value bundle for clinical practices handling multiple cases simultaneously.",
    priceUsd: "1850",
    priceInr: "1,500",
    details: "3 Cases with all Benefits",
    features: [
      "3 Cases with all Benefits",
      "1 Year valid duration",
      "Priority clinical support",
      "Retainers, Splints & Cases",
      "Free Re-Submissions included",
      "Treatment Tracking dashboard"
    ]
  }
];

export default function Pricing() {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-20 overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-10%] glow-spot-blue" />
      <div className="absolute top-[50%] right-[-10%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
            Fair & Transparent
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark font-poppins">
            Flexible Aligner Pricing Plans
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Choose the plan that suits your patient case complexity. Simple pricing with no hidden refinement fees.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <button
              onClick={() => setCurrency("usd")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                currency === "usd"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("inr")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                currency === "inr"
                  ? "bg-secondary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl bg-white border transition-all ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary/20"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular Choice
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-dark font-poppins">{plan.name}</h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline text-dark">
                  <span className="text-2xl font-bold font-poppins">
                    {currency === "usd" ? "$" : "₹"}
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight font-poppins ml-1">
                    {currency === "usd" ? plan.priceUsd : plan.priceInr}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-2">
                    per plan
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Key Specifications
                  </p>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-600 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/pricing/payment/${plan.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:brightness-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  Select Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs info link */}
        <div className="text-center mt-12 text-slate-500 text-xs flex justify-center items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>Need customized plans for large clinical networks?</span>
          <Link href="/faq" className="text-primary hover:underline font-semibold">Contact sales support</Link>
        </div>

      </div>
    </div>
  );
}
