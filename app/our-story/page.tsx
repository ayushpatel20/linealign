"use client";

import { Sparkles, Calendar, TrendingUp, Users, Award, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2013",
    title: "We Were Founded",
    description: "LINEALIGN was established in Vadodara by a team of visionary orthodontists and software engineers who set out to make clear aligner treatments more accessible and precise."
  },
  {
    year: "2014",
    title: "First Seed Investment",
    description: "Secured our initial funding round from leading healthcare venture capitalists, allowing us to build our advanced 3D scanning and simulation rendering pipeline."
  },
  {
    year: "2015",
    title: "Launched First Version",
    description: "Released the LINEALIGN clear aligner manufacturing lines and practitioner portal, enabling regional doctors to manage treatments digitally."
  },
  {
    year: "2020",
    title: "Won Best Enterprise Product",
    description: "Recognized internationally for our orthodontic workflow software, providing full aligner practice tracking, marketing modules, and clinical support."
  }
];

export default function OurStory() {
  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-20 overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[20%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
            Our Journey
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark font-poppins">
            Transforming Smiles, Together
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            At LINEALIGN, we stand at the intersection of material science engineering and orthodontic clinical expertise to deliver the perfect invisible alignment solutions.
          </p>
        </div>

        {/* Company Overview Copy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-dark font-poppins flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" /> Who We Are
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We are a dedicated collective of dental technology creators, manufacturing engineers, and support specialists. Our mission is to make intraoral orthodontic scanning, 3D simulation, and aligner tray shipping a completely smooth and efficient workflow for practices globally.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              By combining high-retention orthodontic polymers with state-of-the-art software rendering, we deliver custom-fit aligner products that patients wear with ultimate confidence.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-dark font-poppins flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" /> Why We Are Different
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Unlike generic aligner providers, LINEALIGN partners directly with practices to provide full-cycle marketing kits, immediate 10-minute cost estimations, and 24-hour treatment planning simulation setups. We stand by our doctors with free refinements and re-submissions.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We believe aligner care should be clear, comfortable, and confident. That is our promise to clinical practitioners and patient smiles alike.
            </p>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-dark font-poppins text-center mb-16">
            This Is How We Started
          </h2>
          
          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto pl-8 sm:pl-12 space-y-12">
            {timelineEvents.map((evt, index) => (
              <div key={evt.year} className="relative">
                {/* Year Marker Bullet */}
                <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                
                {/* Timeline Content */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:border-primary/20 transition-all space-y-3">
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {evt.year}
                  </span>
                  <h3 className="text-lg font-bold text-dark font-poppins mt-2">{evt.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINEALIGN in Numbers */}
        <div className="bg-dark text-slate-300 rounded-[2rem] p-8 sm:p-12 mb-24 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-30" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-bold font-poppins">
              LINEALIGN in Numbers
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Our growth statistics across international regions and support staff.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">250</div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Employees</p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold text-secondary font-poppins">100+</div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Major Customers</p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">50</div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Platforms Supported</p>
            </div>

            <div className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold text-primary font-poppins">1M</div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Daily Active Users</p>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-8 sm:p-12 text-center text-white shadow-lg shadow-primary/10 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins mb-3">
            Ready to Kickstart Your Journey?
          </h2>
          <p className="text-white/80 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Register your clinical practice today and get access to the aligner ordering portal and free simulations.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-white text-primary hover:bg-slate-50 shadow-md hover:shadow-lg transition-all"
          >
            Try for Free
          </Link>
        </div>

      </div>
    </div>
  );
}
