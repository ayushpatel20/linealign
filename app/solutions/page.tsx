"use client";

import { useState } from "react";
import { Layers, HelpCircle, Sparkles, Sliders, Play, Settings, Smile } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    id: "arch",
    title: "Arch Expansion",
    icon: Sliders,
    summary: "Create lateral spacing and expand dental arches comfortably using specialized aligner mechanics.",
    description: "Arch expansion is possible by special aligners with arch expansion screws. This orthodontic technique widens the maxilla or mandible to create space for crowded teeth or correct crossbites without extraction. The expansion screws are adjusted sequentially in micrometer steps to apply gentle, continuous pressure.",
    badge: "Biomechanics"
  },
  {
    id: "elastics",
    title: "Inter Maxillary Elastics",
    icon: Play,
    summary: "Correct bite discrepancies (Angle Class II & III) with integrated cutout slots.",
    description: "Cut-outs in clear aligners allow correction of mild Angle Class II and III cases. Slits enable the insertion of intermaxillary elastics (rubber bands) directly onto the aligner trays or bonding buttons, anchoring upper and lower arches together to adjust jaw alignment dynamically while preserving invisible aesthetics.",
    badge: "Bite Correction"
  },
  {
    id: "attachments",
    title: "Precision Attachments",
    icon: Settings,
    summary: "Provide grip points for complex tooth rotations and molar tilting movement.",
    description: "Canines are hard to rotate. Molars are hard to tilt. So we take help of attachments for precision movements. These small, tooth-colored composite shapes are bonded to specific teeth, giving the clear aligners an engineered anchor point to apply direct, multi-directional force vectors.",
    badge: "Rotation Control"
  },
  {
    id: "missing",
    title: "Missing Teeth Replacement",
    icon: Smile,
    summary: "Maintain patient aesthetic confidence during alignment using customized pontics.",
    description: "When space is larger than 3 mm, an artificial tooth (pontic) space is created that fills the gap in the aligner tray. All you have to do is apply paint in color-matched composite inside the tray cup and cure. This creates a perfect visual illusion of a full smile during orthodontic shifting.",
    badge: "Aesthetics First"
  }
];

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState(solutions[0]);

  return (
    <div className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute top-[45%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20">
            <Sparkles className="w-3.5 h-3.5" /> Orthodontic Innovations
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark font-poppins">
            Much More Than Just Invisible
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Discover the state-of-the-art biological engineering that powers LINEALIGN orthodontic treatments.
          </p>
        </div>

        {/* Dynamic Solutions Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Tabs Menu Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              const isSelected = selectedSolution.id === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol)}
                  className={`w-full flex items-start gap-4 p-6 rounded-3xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-slate-50 border-primary/30 shadow-xs ring-1 ring-primary/10"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark font-poppins text-sm sm:text-base">{sol.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{sol.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Display Column (7 cols) */}
          <motion.div
            key={selectedSolution.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 sm:p-12 shadow-xs space-y-6 self-stretch flex flex-col justify-center"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-white border border-slate-200/50 rounded-full text-xs font-semibold text-primary uppercase tracking-wider">
                {selectedSolution.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark font-poppins">
                {selectedSolution.title}
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {selectedSolution.description}
            </p>

            <div className="border-t border-slate-200/60 pt-6 flex items-center gap-3 text-slate-500 text-xs">
              <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
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
