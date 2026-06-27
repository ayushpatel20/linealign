"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  const isSlash = value.includes("/");
  let target = 0;
  let target2 = 0;
  let suffix = "";

  if (isSlash) {
    const parts = value.split("/");
    target = parseInt(parts[0].replace(/[^0-9]/g, "")) || 0;
    target2 = parseInt(parts[1].replace(/[^0-9]/g, "")) || 0;
  } else {
    const numericString = value.replace(/[^0-9]/g, "");
    target = parseInt(numericString) || 0;
    suffix = value.replace(/[0-9]/g, "");
  }

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
            if (isSlash) {
              setCount2(Math.floor(easeProgress * target2));
            }
            
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
  }, [target, target2, isSlash, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {isSlash ? (
        <>{count}/{count2}</>
      ) : (
        <>{count.toLocaleString()}{suffix}</>
      )}
    </span>
  );
}
