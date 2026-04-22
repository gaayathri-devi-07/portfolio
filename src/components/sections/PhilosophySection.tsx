"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SplineScene from "@/components/3d/SplineScene";

gsap.registerPlugin(ScrollTrigger);

const CANELA = "Canela, Playfair Display, Georgia, serif";

function SpiderReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".sr-word");
    gsap.from(words, {
      scrollTrigger: { 
        trigger: ref.current, 
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      },
      y: "100%",
      rotate: 15,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-x-2 gap-y-1 ${className ?? ""}`}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block">{w}</span>
        </span>
      ))}
    </div>
  );
}

export default function PhilosophySection() {
  const splineWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = splineWrapperRef.current;
    if (!el) return;
    const preventZoom = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", preventZoom, { capture: true, passive: false });
    return () => el.removeEventListener("wheel", preventZoom);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center bg-[var(--bg)] transition-colors duration-500 gpu-accelerated"
      style={{ fontFamily: CANELA }}
    >
      {/* GLOBAL CONTAINER LOCK: Protected horizontal padding to prevent edge bleeding */}
      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 gpu-accelerated !overflow-visible">
        
        {/* Left Column (Shifted Upward) */}
        <div className="flex flex-col justify-center -mt-12 md:-mt-20 gpu-accelerated">
          <div className="max-w-[600px] flex flex-col items-start text-left">
            
            {/* Extended Animated Pink Trace Line (Adaptive) */}
            <div className="relative h-[2px] w-48 md:w-64 bg-black/10 dark:bg-white/10 overflow-hidden mb-6">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300/80 dark:via-pink-300 to-transparent animate-loading-h" />
            </div>
            
            <div className="w-full">
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter w-full leading-none md:leading-tight mb-8 text-neutral-900 dark:text-white gpu-accelerated">
                <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-200 dark:to-rose-200">Welcome to</span> <br />
                <span className="whitespace-nowrap">my <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-200 dark:to-pink-200">space.</span></span>
              </h2>
            </div>
            
            <p className="text-base md:text-lg leading-snug md:leading-snug text-gray-700 dark:text-gray-400 max-w-xl gpu-accelerated">
              An AI-Enabled Full-Stack Engineer. I build enterprise-grade applications that connect immersive 3D frontends with scalable Python/FastAPI backends.
            </p>
          </div>
        </div>

        {/* Center Column: The 3D Centerpiece (Expanded proportional share) */}
        <div className="flex lg:w-1/2 justify-center pointer-events-auto !overflow-visible">
          <div 
            ref={splineWrapperRef} 
            className="w-full aspect-square max-w-[800px] mx-auto relative z-10 pointer-events-auto gpu-accelerated !overflow-visible"
            style={{ transform: 'scale(1.2)' }}
          >
            <div className="absolute bottom-0 right-0 w-40 h-16 bg-[var(--bg)] transition-colors duration-500 z-50 pointer-events-none" />
            <SplineScene
              className="w-full h-full"
              scene="https://prod.spline.design/2KPdIlgyxocYUnwu/scene.splinecode"
            />
          </div>
        </div>

        {/* Right Column - DE-CLUTTERED */}
        <div className="flex flex-col justify-center text-left gpu-accelerated">
            {/* Extended Animated Pink Trace Line (Adaptive) */}
            <div className="relative h-[2px] w-48 md:w-64 bg-black/10 dark:bg-white/10 overflow-hidden mb-6">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300/80 dark:via-pink-300 to-transparent animate-loading-h" />
            </div>
           <div className="max-w-md">
              <p className="text-base md:text-lg leading-snug md:leading-snug text-gray-700 dark:text-gray-400 gpu-accelerated">
                Engineering intelligent, seamless applications that solve real problems. I build digital products that feel alive.
              </p>
           </div>
        </div>

      </div>
    </section>
  );

}
