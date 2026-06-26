"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
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
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="LINEALIGN"
                width={160}
                height={53}
                className="h-10 w-auto object-contain"
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
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 group ${
                    isActive
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
              ) : (
                <Menu className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top duration-300 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl absolute top-full left-0 right-0 py-6 px-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-slate-50 text-primary border-l-4 border-primary"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 px-4">
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-md"
              >
                Get Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
