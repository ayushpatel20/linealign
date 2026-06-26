"use client";

import { useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100 select-none">
      {/* Before Image (Crooked) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/teeth_before.png"
          alt="Crooked Teeth Before Aligner Treatment"
          fill
          sizes="(max-w-xl) 100vw, 800px"
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Before
        </div>
      </div>

      {/* After Image (Aligned) */}
      <div
        className="absolute inset-y-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-[calc(100%*100/var(--position))] min-w-[768px] aspect-[4/3] h-full" style={{ width: `768px` }}>
          {/* Note: Fixed width image inside wrapper to prevent squeeze */}
          <Image
            src="/teeth_after.png"
            alt="Straight Teeth After Aligner Treatment"
            width={768}
            height={576}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
        </div>
        <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap z-10">
          After
        </div>
      </div>

      {/* Split Bar */}
      <div
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-primary flex items-center justify-center select-none pointer-events-none">
          <div className="flex items-center gap-1 text-primary">
            <span className="text-sm font-bold">&larr;</span>
            <span className="text-sm font-bold">&rarr;</span>
          </div>
        </div>
      </div>

      {/* Invisible range input for drag interaction */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
}
