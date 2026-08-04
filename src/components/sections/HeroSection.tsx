"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";
import TypewriterSubheading from "@/components/ui/TypewriterSubheading";

const CANELA = "Canela, Playfair Display, Georgia, serif";

export default function HeroSection() {
  const [showLanding, setShowLanding] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  
  // ELITE PERFORMANCE: Dampen raw scroll updates for buttery smooth faints/shifts
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Fades out between 0px and 800px of scroll depth
  const sectionOpacity = useTransform(smoothY, [0, 800], [1, 0]);
  // Adds a slight downward parallax shift
  const sectionY = useTransform(smoothY, [0, 800], [0, 150]);

  // Auto-dismiss loading overlay after assets are ready
  useEffect(() => {
    const t = window.setTimeout(() => setShowLanding(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {/* 1. THE CINEMATIC OVERLAY */}
      <AnimatePresence>
        {!showLanding && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
          >
            <span className="mb-4 text-xs sm:text-sm font-mono text-[#FFB6C1]/80 tracking-[0.3em] uppercase animate-pulse">
              Syncing Neural Engine
            </span>
            <div className="w-48 h-[1px] bg-[#FFB6C1]/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#FFB6C1]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        ref={containerRef}
        className="relative w-full min-h-screen h-[150vh] bg-[#000000] transition-colors duration-500 overflow-visible transform-gpu will-change-transform contain-paint"
      >
        {/* Hero Wrapper */}
        <motion.div 
          style={{ opacity: sectionOpacity, y: sectionY }}
          className="sticky top-0 w-full h-screen overflow-hidden gpu-accelerated"
        >
          
          {/* CINEMATIC TEXT LAYER */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: showLanding ? 1 : 0,
              y: showLanding ? 0 : 8,
              transition: { duration: 0.4, ease: "easeOut", delay: 0.05 },
            }}
            className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none pl-10 sm:pl-16 md:pl-24 lg:pl-32 pr-6 gpu-accelerated"
          >
            <h2
              suppressHydrationWarning
              className="text-xl md:text-2xl lg:text-3xl tracking-[0.4em] text-[#ffffff]/40 mb-4 md:mb-6 font-medium pointer-events-auto cursor-none"
              style={{ fontFamily: CANELA }}
              data-cursor-hover
            >
              <ScrambleText
                fromText="ハロー・ワールド"
                toText="HELLO WORLD"
                trigger={showLanding}
                cyclesPerChar={5}
              />
            </h2>
            <h1
              suppressHydrationWarning
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold text-[#ffffff] whitespace-nowrap tracking-tight text-center w-full px-4 transition-colors duration-500 pointer-events-auto cursor-none"
              style={{ fontFamily: CANELA }}
              data-cursor-hover
            >
              <ScrambleText
                fromText="私はガヤトリ・デヴィです"
                toText="I AM GAAYATHRI DEVI"
                trigger={showLanding}
                cyclesPerChar={5}
              />
            </h1>
            <p
              className="text-[11px] md:text-[12px] font-mono tracking-[0.15em] text-[#ffffff]/50 uppercase mt-6 pointer-events-auto"
            >
              I AM{" "}
              <TypewriterSubheading />
            </p>
          </motion.div>



          {/* Cinematic Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showLanding ? 0.4 : 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-gray-400">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}