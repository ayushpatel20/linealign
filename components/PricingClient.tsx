"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PlanItem {
  id: string;
  name: string;
  description: string;
  priceUsd: string;
  priceInr: string;
  details: string;
  featuresJson: string; // JSON Array
  popular: boolean;
}

export default function PricingClient({ plans }: { plans: PlanItem[] }) {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");

  const activePlans = plans && plans.length > 0
    ? plans
    : [
        {
          id: "simple",
          name: "Simple Case",
          description: "Ideal for minor alignment corrections.",
          priceUsd: "300",
          priceInr: "30000",
          details: "Less than 15 Tray sets",
          featuresJson: "[\"Less than 15 Tray sets\", \"Retainers included\"]",
          popular: false
        }
      ];

  return (
    <div
      className="relative min-h-screen bg-slate-50 pb-20 overflow-hidden"
      style={{ paddingTop: "calc(var(--header-height, 144px) + 2rem)" }}
    >
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-10%] glow-spot-blue" />
      <div className="absolute top-[50%] right-[-10%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Fair & Transparent
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-dark font-poppins">
            Flexible Aligner Pricing Plans
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose the plan that suits your patient case complexity. Simple pricing with no hidden refinement fees.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-full shadow-sm select-none">
            <button
              onClick={() => setCurrency("usd")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currency === "usd"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("inr")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
          {activePlans.map((plan) => {
            const features = plan.featuresJson ? JSON.parse(plan.featuresJson) : [];
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border transition-all duration-300 ${
                  plan.popular
                    ? "border-primary shadow-lg ring-1 ring-primary/25"
                    : "border-slate-200/60 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    Popular Choice
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-dark font-poppins">{plan.name}</h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline text-dark border-b border-slate-100 pb-6">
                    <span className="text-2xl font-black font-poppins text-primary">
                      {currency === "usd" ? "$" : "₹"}
                    </span>
                    <span className="text-5xl font-black tracking-tight font-poppins ml-1">
                      {currency === "usd" ? plan.priceUsd : plan.priceInr}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-2.5">
                      per plan
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Key Specifications
                    </p>
                    <ul className="space-y-3.5">
                      {features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-slate-650 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/pricing/payment/${plan.id}`}
                    className={`w-full inline-flex items-center justify-center gap-1.5 px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
            );
          })}
        </div>

        {/* FAQs info link */}
        <div className="text-center mt-12 text-slate-500 text-xs font-semibold flex justify-center items-center gap-1.5">
          <HelpCircle className="w-4.5 h-4.5 text-primary" />
          <span>Need customized plans for large clinical networks?</span>
          <Link href="/faq" className="text-primary hover:underline font-bold">Contact sales support</Link>
        </div>

      </div>
    </div>
  );
}
