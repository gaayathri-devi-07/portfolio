"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = splineWrapperRef.current;
    if (!el) return;
    const preventZoom = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", preventZoom, { capture: true, passive: false });
    return () => el.removeEventListener("wheel", preventZoom);
  }, []);

  return (
    <>
      {/* ROGUE LOADER PURGED: Unified loading is now handled exclusively by HeroSection.tsx */}
      <AnimatePresence>
        {!isReady && (
          <div className="hidden" /> 
        )}
      </AnimatePresence>

      <section
        className="relative z-10 w-full min-h-screen bg-[#000000] py-24 md:py-32 flex flex-col justify-center overflow-hidden transform-gpu will-change-transform contain-paint"
        style={{ fontFamily: CANELA }}
      >
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center px-6 lg:px-12 !overflow-visible">
          
          <div className="flex flex-col text-center lg:text-left order-1 lg:order-1 w-full max-w-full gpu-accelerated !pl-[4vw]">
            <div className="max-w-[600px] mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
              <div className="relative h-[2px] w-48 md:w-64 bg-white/10 overflow-hidden mb-6">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-loading-h" />
              </div>
              <div className="w-full">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 break-words leading-tight">
                  <span className="text-pink-200">Welcome</span> <br />
                  to my space.
                </h2>
              </div>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 break-words text-center lg:text-left">
                An AI-Enabled Full-Stack Engineer. I build enterprise-grade applications that connect immersive 3D frontends with scalable Python/FastAPI backends.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center w-full order-2 lg:order-2 pointer-events-none !overflow-visible relative">
            <div 
              ref={splineWrapperRef} 
              className="relative w-full max-w-[450px] h-[350px] md:h-[450px] lg:h-[550px] bg-[#000000] overflow-hidden flex items-center justify-center z-10 pointer-events-none mx-auto"
            >
              <div className="w-full h-full scale-[1.15] translate-y-6 translate-x-4">
                  <SplineScene
                    className="w-full h-full"
                    scene="https://prod.spline.design/2KPdIlgyxocYUnwu/scene.splinecode"
                    onLoad={() => setIsReady(true)}
                  />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-center lg:text-left order-3 lg:order-3 w-full max-w-full gpu-accelerated">
              <div className="relative h-[2px] w-48 md:w-64 bg-white/10 overflow-hidden mb-6 mx-auto lg:mx-0">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-loading-h" />
              </div>
             <div className="max-w-md mx-auto lg:mx-0">
                <p className="text-gray-400 text-base md:text-lg leading-relaxed break-words">
                  Engineering intelligent, seamless applications that solve real problems. I build digital products that feel alive.
                </p>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
