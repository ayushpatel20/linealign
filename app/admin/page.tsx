"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  Layers,
  HelpCircle,
  BookOpen,
  FolderOpen,
  Settings,
  Sliders,
  TrendingUp,
  FileText,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import {
  getFounders,
  getServices,
  getFAQs,
  getPricingPlans,
  getBlogPosts,
  getMediaItems,
  getPageSections
} from "@/app/actions/cms-actions";

export default function AdminOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    founders: 0,
    services: 0,
    faqs: 0,
    plans: 0,
    blogs: 0,
    media: 0,
    sections: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [founders, services, faqs, plans, blogs, media, sections] = await Promise.all([
          getFounders(),
          getServices(),
          getFAQs(),
          getPricingPlans(),
          getBlogPosts(),
          getMediaItems(),
          getPageSections(),
        ]);

        setStats({
          founders: founders.length,
          services: services.length,
          faqs: faqs.length,
          plans: plans.length,
          blogs: blogs.length,
          media: media.length,
          sections: sections.length,
        });
      } catch (error) {
        console.error("Failed to load dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800/50 animate-pulse rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  const user = session?.user as any;

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white font-poppins tracking-tight">
          Welcome back, {user?.name || "Admin"}
        </h1>
        <p className="text-slate-400 text-sm">
          Here is a summary of your website contents and dynamic CMS data parameters.
        </p>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Services count */}
        <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-2xl font-black font-poppins text-white">{stats.services}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Services</p>
          </div>
        </div>

        {/* Pricing Tiers count */}
        <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-2xl font-black font-poppins text-white">{stats.plans}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Pricing Tiers</p>
          </div>
        </div>

        {/* Blog articles count */}
        <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-2xl font-black font-poppins text-white">{stats.blogs}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Blog Articles</p>
          </div>
        </div>

        {/* Media count */}
        <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-2xl font-black font-poppins text-white">{stats.media}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Media Uploads</p>
          </div>
        </div>
      </div>

      {/* Quick Links section & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Quick actions Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-8 rounded-[2rem] shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-white font-poppins border-b border-white/5 pb-4">
            CMS Action Shortcuts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/page-builder"
              className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-950 border border-white/5 rounded-2xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-slate-300">Arrange Pages Builder</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-950 border border-white/5 rounded-2xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold text-slate-300">Configure General Details</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-950 border border-white/5 rounded-2xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-300">Write Blog Article</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-950 border border-white/5 rounded-2xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold text-slate-300">Upload Media Assets</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        {/* System Info Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-8 rounded-[2rem] shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-white font-poppins border-b border-white/5 pb-4">
            System Configuration
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Database Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active (SQLite)
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Authentication</span>
              <span className="font-bold text-slate-300">NextAuth API Session v4</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Active Modules</span>
              <span className="font-bold text-slate-300">12 Modules Integrated</span>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-white/5 pt-4">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Live Site</span>
              <Link href="/" target="_blank" className="text-primary hover:underline font-bold flex items-center gap-1">
                View Frontpage <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
