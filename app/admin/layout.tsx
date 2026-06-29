"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  BookOpen,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  UserCheck,
  CreditCard,
  Layers,
  LogOut,
  FolderOpen,
  Sliders,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Page Builder", href: "/admin/page-builder", icon: Sliders },
  { name: "Site & Navbar Settings", href: "/admin/settings", icon: Settings },
  { name: "Founders", href: "/admin/founders", icon: UserCheck },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Why Choose Us", href: "/admin/why-choose-us", icon: ShieldCheck },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Pricing Plans", href: "/admin/pricing", icon: CreditCard },
  { name: "Blogs CMS", href: "/admin/blogs", icon: BookOpen },
  { name: "Media Manager", href: "/admin/media", icon: FolderOpen },
];

import { SessionProvider } from "next-auth/react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, router, pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Checking credentials...</span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5 z-30">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="Logo" width={90} height={45} className="h-7 w-auto object-contain rounded brightness-0 invert" />
          <span className="text-[10px] bg-primary/20 text-primary font-bold px-2.5 py-0.5 rounded-full uppercase">
            {user.role}
          </span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-white/5 flex flex-col justify-between p-6 transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8 flex flex-col overflow-y-auto">
          {/* Logo Brand area */}
          <div className="flex flex-col gap-1.5 select-none">
            <Link href="/" className="inline-flex bg-white/95 p-2.5 rounded-2xl shadow-sm w-fit">
              <Image src="/logo.jpeg" alt="Logo" width={110} height={55} className="h-8 w-auto object-contain rounded" />
            </Link>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs font-black text-slate-300 tracking-wider">CMS DASHBOARD</span>
              <span className="text-[9px] bg-gradient-to-r from-primary to-secondary text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                {user.role}
              </span>
            </div>
          </div>

          {/* Links list */}
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="border-t border-white/5 pt-4 mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white uppercase text-sm shadow-sm">
              {user.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-white leading-tight truncate">{user.name}</h4>
              <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/15 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main dashboard viewport area */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-slate-950 p-6 md:p-10 relative">
        {/* Background light glow inside dashboard */}
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-radial-gradient from-primary/5 to-transparent filter blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
