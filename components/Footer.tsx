"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#111827] text-slate-300 pt-20 pb-10 border-t border-slate-800 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex bg-white p-2.5 rounded-2xl border border-white/50 shadow-md">
              <Image
                src="/logo.jpeg"
                alt="LINEALIGN DENTAL LAB"
                width={225}
                height={115}
                className="h-10 w-auto object-contain rounded"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>Your Smile, Our Precision.</strong> Reimagining orthodontic care with premium, invisible, and state-of-the-art clear aligners. Clear, Comfort and Confident from Kerala.
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:bg-primary transition-all duration-300 hover:text-white hover:-translate-y-0.5" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:bg-primary transition-all duration-300 hover:text-white hover:-translate-y-0.5" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:bg-primary transition-all duration-300 hover:text-white hover:-translate-y-0.5" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:bg-primary transition-all duration-300 hover:text-white hover:-translate-y-0.5" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-primary transition-colors text-sm flex items-center gap-1">Home</Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-primary transition-colors text-sm flex items-center gap-1">Solutions</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors text-sm flex items-center gap-1">Pricing Plans</Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-primary transition-colors text-sm flex items-center gap-1">Our Story</Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-primary transition-colors text-sm flex items-center gap-1">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-base font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  83, Pookkayam, Malakallu,<br />
                  Near Indian Oil Petrol Pump,<br />
                  Malakallu PO, PIN 671532,<br />
                  Kasaragod District, Kerala, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:8281778202" className="hover:text-white transition-colors text-sm">82817 78202</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:linealign23@gmail.com" className="hover:text-white transition-colors text-sm">linealign23@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white text-base font-semibold mb-6">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Subscribe to receive orthodontic care tips, product releases, and exclusive laboratory updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white transition-all cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-secondary text-xs mt-2 animate-pulse">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Map and Legal Bottom */}
        <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} LINEALIGN DENTAL LAB. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <a href="#" className="hover:text-slate-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
