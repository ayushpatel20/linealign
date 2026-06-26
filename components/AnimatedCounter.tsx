"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Extract number and suffix (e.g. "4000+" -> number: 4000, suffix: "+")
  const numericString = value.replace(/[^0-9]/g, "");
  const target = parseInt(numericString) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let isMounted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isMounted) {
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function outQuad
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * target));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
