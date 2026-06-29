import { Sparkles, TrendingUp, Users, Award, ShieldCheck, Heart, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAboutConfig } from "@/app/actions/cms-actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Story & Journey | LINEALIGN DENTAL LAB",
  description: "Learn about the leading clear aligner laboratory in Kasaragod, Kerala. Stand at the intersection of orthodontics and material science.",
};

export default async function OurStoryPage() {
  const about = await getAboutConfig();
  
  // Parse stats list
  const statsList = about.statsJson
    ? JSON.parse(about.statsJson)
    : [
        { value: "250", label: "Employees" },
        { value: "100+", label: "Major Customers" },
        { value: "50", label: "Platforms Supported" },
        { value: "1M", label: "Daily Active Users" }
      ];

  return (
    <div
      className="relative min-h-screen bg-slate-50 pb-20 overflow-hidden"
      style={{ paddingTop: "calc(var(--header-height, 144px) + 2rem)" }}
    >
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[20%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Our Journey
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-dark font-poppins">
            Transforming Smiles, Together
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At LINEALIGN, we stand at the intersection of material science engineering and orthodontic clinical expertise to deliver the perfect invisible alignment solutions.
          </p>
        </div>

        {/* Company Overview Copy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-150/50 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-dark font-poppins flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-100" /> Who We Are
            </h3>
            <p className="text-slate-605 text-sm leading-relaxed">
              We are a dedicated collective of dental technology creators, manufacturing engineers, and support specialists. Our mission is to make intraoral orthodontic scanning, 3D simulation, and aligner tray shipping a completely smooth and efficient workflow for practices globally.
            </p>
            <p className="text-slate-605 text-sm leading-relaxed">
              By combining high-retention orthodontic polymers with state-of-the-art software rendering, we deliver custom-fit aligner products that patients wear with ultimate confidence.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-150/50 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-dark font-poppins flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" /> Why We Are Different
            </h3>
            <p className="text-slate-655 text-sm leading-relaxed">
              Unlike generic aligner providers, LINEALIGN partners directly with practices to provide full-cycle marketing kits, immediate 10-minute cost estimations, and 24-hour treatment planning simulation setups. We stand by our doctors with free refinements and re-submissions.
            </p>
            <p className="text-slate-655 text-sm leading-relaxed">
              We believe aligner care should be Clear, Comfort and Confident. That is our promise to clinical practitioners and patient smiles alike.
            </p>
          </div>
        </div>

        {/* LINEALIGN in Numbers */}
        <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] text-slate-300 rounded-[2.5rem] p-8 sm:p-12 mb-24 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-30 pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-white text-3xl font-bold font-poppins">
              LINEALIGN in Numbers
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-semibold">
              Our growth statistics across international regions and support staff.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statsList.map((stat: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-black text-white font-poppins">{stat.value}</div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] p-8 sm:p-12 text-center text-white shadow-lg shadow-primary/10 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black font-poppins mb-3">
            Ready to Kickstart Your Journey?
          </h2>
          <p className="text-white/80 text-sm max-w-md mx-auto mb-8 leading-relaxed font-semibold">
            Register your clinical practice today and get access to the aligner ordering portal and free simulations.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 px-8 py-3.5 rounded-full text-sm font-bold bg-white text-primary hover:bg-slate-50 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Try for Free
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>

      </div>
    </div>
  );
}
