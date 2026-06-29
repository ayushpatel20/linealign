"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden font-sans">
      {/* Background Decorative glow spots */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-radial-gradient from-primary/20 to-transparent filter blur-3xl rounded-full" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] bg-radial-gradient from-secondary/20 to-transparent filter blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl mx-4 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex bg-white/95 p-3 rounded-2xl shadow-md mb-2">
            <Image
              src="/logo.jpeg"
              alt="LINEALIGN Logo"
              width={140}
              height={70}
              className="h-10 w-auto object-contain rounded"
            />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1.5 font-poppins">
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            Admin Control Center
          </h2>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Enter Credentials to Access Dashboard
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-200 text-xs font-semibold"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
              <Lock className="w-4 h-4" />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/20 transition-all cursor-pointer mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Log In to Control Panel"
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
            Default credentials: admin@linealign.com / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
