"use client";

import { useState } from "react";
import { HelpCircle, Sparkles, Sliders, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <Sliders className={className} />;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  seoUrl: string;
}

export default function SolutionsClient({ services }: { services: ServiceItem[] }) {
  const activeServices = services && services.length > 0
    ? services
    : [
        {
          id: "arch",
          title: "Arch Expansion",
          icon: "Sliders",
          description: "Arch expansion widens the arches sequentially to correct dental spacing.",
          buttonText: "Biomechanics",
          seoUrl: "arch-expansion"
        }
      ];

  const [selectedSolution, setSelectedSolution] = useState(activeServices[0]);

  return (
    <div className="relative min-h-screen bg-slate-50 pt-36 pb-20 overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute top-[45%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> Orthodontic Innovations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-dark font-poppins">
            Much More Than Just Invisible
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover the state-of-the-art biological engineering that powers LINEALIGN orthodontic treatments.
          </p>
        </div>

        {/* Dynamic Solutions Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Tabs Menu Column */}
          <div className="lg:col-span-5 space-y-4 w-full">
            {activeServices.map((sol) => {
              const isSelected = selectedSolution.id === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol)}
                  className={`w-full flex items-start gap-4 p-6 rounded-3xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-white border-primary shadow-md ring-1 ring-primary/20"
                      : "bg-white/60 hover:bg-white border-slate-150/50 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-gradient-to-tr from-primary to-secondary text-white shadow-sm"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <DynamicIcon name={sol.icon || "Sliders"} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark font-poppins text-sm sm:text-base">{sol.title}</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed truncate max-w-xs">{sol.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Display Column */}
          <motion.div
            key={selectedSolution.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white border border-slate-150/50 rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-6 self-stretch flex flex-col justify-center min-h-[300px]"
          >
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                {selectedSolution.buttonText || "Biomechanics"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark font-poppins tracking-tight">
                {selectedSolution.title}
              </h2>
            </div>
            
            <p className="text-slate-655 text-sm sm:text-base leading-relaxed">
              {selectedSolution.description}
            </p>

            <div className="border-t border-slate-100 pt-6 flex items-center gap-3 text-slate-500 text-xs font-semibold leading-relaxed">
              <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
              <span>
                Want to configure attachments in your case? Specify requirements in the free treatment simulation request.
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
