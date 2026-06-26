"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck, Mail, Phone, Lock, User, AlertCircle, Sparkle } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ token: string }>;
}

const planDetailsMap: Record<string, { name: string; price: string; description: string }> = {
  simple: {
    name: "Simple Case Plan",
    price: "$300",
    description: "Less than 15 Tray sets, Retainers, Splints, Box"
  },
  complex: {
    name: "Complex Case Plan",
    price: "$750",
    description: "Unlimited Trays, Retainers, Splints, Box"
  },
  triple: {
    name: "3 Complex Cases Bundle",
    price: "$1850",
    description: "3 Cases with all Benefits, 1 Year duration"
  }
};

export default function PaymentPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token || "complex";
  const plan = planDetailsMap[token] || planDetailsMap.complex;

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin && !formData.firstName) newErrors.firstName = "First name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
      {/* Background glow spots */}
      <div className="absolute top-[15%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[10%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          
          {/* Back button */}
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Pricing
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark font-poppins">
              {isLogin ? "Welcome Back" : "Create Aligner Account"}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {isLogin
                ? "Access your doctor dashboard and order history."
                : "Register practice details to initiate simulations."}
            </p>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-slate-100 mb-8">
            <button
              onClick={() => { setIsLogin(false); setErrors({}); }}
              className={`pb-3 font-semibold text-sm transition-all border-b-2 px-4 ${
                !isLogin
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setIsLogin(true); setErrors({}); }}
              className={`pb-3 font-semibold text-sm transition-all border-b-2 px-4 ${
                isLogin
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Log In
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-50 border rounded-2xl py-3.5 pl-10 pr-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                      errors.firstName ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName}</span>}
                </div>

                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-slate-50 border rounded-2xl py-3.5 pl-10 pr-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                  errors.email ? "border-red-400" : "border-slate-200"
                    }`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-slate-50 border rounded-2xl py-3.5 pl-10 pr-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                  errors.password ? "border-red-400" : "border-slate-200"
                    }`}
              />
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
            </div>

            {/* Wix Template Disclaimer Warning Message (Static/In-form) */}
            <div className="flex gap-3 p-4 bg-amber-50/50 border border-amber-200/50 rounded-2xl text-amber-800 text-xs leading-relaxed">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Ordering Notice:</strong> Sorry, you can&apos;t order this plan online at the moment. Please contact us to complete your purchase.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLogin ? (
                "Log In & Access Plan"
              ) : (
                "Sign Up & Initiate Order"
              )}
            </button>
          </form>

        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="md:col-span-5 bg-dark text-slate-300 rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col justify-between self-stretch">
          
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold font-poppins border-b border-slate-800 pb-4">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">{plan.name}</h4>
                  <p className="text-slate-400 text-xs mt-1">{plan.description}</p>
                </div>
                <span className="text-white font-bold text-lg font-poppins">{plan.price}</span>
              </div>
            </div>

            {/* Aligner benefits badges */}
            <div className="border-t border-slate-800 pt-6 space-y-3.5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>FDA Cleared Material Science</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CreditCard className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>100% Secure Transaction Vault</span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-800/80 mt-12 flex justify-between items-center text-xs text-slate-500">
            <span>Powered by LINEALIGN Secure API</span>
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={45}
              className="h-9 w-auto brightness-0 invert object-contain opacity-50"
            />
          </div>

        </div>

      </div>

      {/* Offline ordering Pop-Up Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Sparkle className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-dark font-poppins mb-2">Registration Complete!</h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your account has been configured. However, online checkout is currently offline on our platform:
              <br />
              <strong className="text-amber-800 mt-2 block bg-amber-50 py-2.5 px-4 rounded-xl text-xs border border-amber-100">
                &ldquo;Sorry, you can&apos;t order this plan online at the moment. Please contact us to complete your purchase.&rdquo;
              </strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <a
                href="tel:8281778202"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call 82817 78202
              </a>
              <a
                href="mailto:linealign23@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider block mx-auto py-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
