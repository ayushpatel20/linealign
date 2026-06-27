"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, Clock, MapPin, Mail, Phone, Smile } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Our Story", href: "/our-story" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/faq" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 text-[11px] sm:text-xs font-semibold shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span>🦷</span> 24/7 Working Lab
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span>👨‍⚕️</span> Full-Time Orthodontists Available
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span>📍</span> Kasaragod, Kerala
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <a href="mailto:linealign23@gmail.com" className="flex items-center gap-1.5 hover:underline">
              <span>📧</span> linealign23@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Floating Glass Navigation Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "top-11 md:top-8" : "top-14 md:top-10"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-300 ${
            isScrolled
              ? "bg-white/40 backdrop-blur-sm border border-white/20 py-2.5 px-6 sm:px-8 shadow-lg shadow-primary/5"
              : "bg-white/20 backdrop-blur-sm border border-white/10 py-4 px-6 sm:px-8 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.jpeg"
                  alt="LINEALIGN DENTAL LAB"
                  width={360}
                  height={180}
                  className="h-[70px] md:h-[84px] w-auto object-contain rounded-lg hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8 items-center justify-center flex-1 max-w-2xl mx-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-sm font-bold tracking-wide transition-all py-1.5 px-1 cursor-pointer font-sans ${
                      isActive
                        ? "text-primary font-extrabold"
                        : "text-slate-700 hover:text-primary"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all cursor-pointer"
              >
                Book Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Hamburger Menu - Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-primary hover:bg-primary/5 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 animate-in fade-in zoom-in duration-200" />
                ) : (
                  <Menu className="w-5 h-5 animate-in fade-in zoom-in duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu (Inside Header container for float consistency) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-[2rem] bg-white/95 backdrop-blur-lg border border-white/50 shadow-2xl py-6 px-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-bold px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary pl-5"
                        : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/10"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
