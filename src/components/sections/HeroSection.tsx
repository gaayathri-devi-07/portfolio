"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import SplineScene from "@/components/3d/SplineScene";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const CANELA = "Canela, Playfair Display, Georgia, serif";
const JAPANESE_CHARS = "ハローワールド私はガヤトリデヴィですケコサシスセソタチツテト";

type SequencePhase = "loading" | "entering" | "japanese" | "paused" | "translating" | "completed";

export default function HeroSection() {
  const [isRobotLoaded, setIsRobotLoaded] = useState(false);
  const [phase, setPhase] = useState<SequencePhase>("loading");
  
  // Text states for the transition
  const [helloText, setHelloText] = useState("ハロー・ワールド");
  const [nameText, setNameText] = useState("私はガヤトリ・デヴィです");
  
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  // SEQUENCE ORCHESTRATION
  useEffect(() => {
    if (!isRobotLoaded) return;

    // Start Sequence
    setPhase("entering");

    // Sequence Step 1: Robot fades in (handled by motion.div below)
    const timer1 = setTimeout(() => {
      setPhase("japanese");
    }, 500); // 0.5s delay for robot entrance

    // Sequence Step 2: Japanese text visible for 1.2s
    const timer2 = setTimeout(() => {
      setPhase("paused");
    }, 1000); // Entering (0.5) + Japanese Fade (0.5)

    // Sequence Step 3: Trigger Translation
    const timer3 = setTimeout(() => {
      setPhase("translating");
    }, 2200); // Previous + 1.2s pause

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isRobotLoaded]);

  // SCRAMBLE LOGIC
  useEffect(() => {
    if (phase !== "translating") return;

    const scramble = (targetWord: string, setTarget: (val: string) => void, duration: number) => {
      let iterations = 0;
      const interval = setInterval(() => {
        setTarget(
          targetWord.split("").map((letter, index) => {
            if (index < iterations) return targetWord[index];
            return JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
          }).join("")
        );
        
        if (iterations >= targetWord.length) {
          clearInterval(interval);
          setPhase("completed");
        }
        iterations += 1;
      }, duration / targetWord.length);
    };

    scramble("HELLO WORLD", setHelloText, 800);
    scramble("I AM GAAYATHRI DEVI", setNameText, 1000);
  }, [phase]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen h-[150vh] bg-[var(--bg)] transition-colors duration-500 overflow-visible"
    >
      {/* PERFORMANCE INITIALIZER MASK */}
      <AnimatePresence>
        {!isRobotLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed inset-0 z-[9999] bg-[#e5e4df] dark:bg-black flex items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.h1 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gray-900 dark:text-white text-[10px] tracking-[0.8em] font-mono uppercase"
              >
                Syncing Neural Engine
              </motion.h1>
              <div className="w-48 h-[1px] bg-black/10 dark:bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-black/40 dark:bg-white/40"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Wrapper */}
      <motion.div 
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="sticky top-0 w-full h-screen overflow-hidden gpu-accelerated"
      >
        
        {/* CINEMATIC TEXT LAYER (Lower z-index for 3D depth) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: phase === "loading" ? 0 : 1,
              transition: { duration: 0.5, delay: 0.5 }
            }}
            className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-0 pointer-events-none px-4 gpu-accelerated"
        >
            <h2 
                suppressHydrationWarning
                className="text-xl md:text-2xl lg:text-3xl tracking-[0.4em] text-gray-700 dark:text-white/40 mb-4 md:mb-6 font-medium"
                style={{ fontFamily: CANELA }}
            >
                {helloText}
            </h2>
            <h1 
                suppressHydrationWarning
                className="text-[clamp(2.5rem,7vw,8.5rem)] leading-[1.1] text-gray-900 dark:text-white font-medium text-center"
                style={{ fontFamily: CANELA }}
            >
                {nameText}
            </h1>
        </motion.div>

        {/* LAYER 2: 3D MODEL CORRIDOR (INTERACTION RESTORED) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isRobotLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-screen flex items-center justify-center z-10 pointer-events-auto gpu-accelerated"
        >
            <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center pointer-events-auto">
                <Suspense fallback={null}>
                  <SplineScene 
                      scene="https://prod.spline.design/IYhNPPRr0afNe8vH/scene.splinecode" 
                      className="w-full h-full" 
                      onLoad={() => setIsRobotLoaded(true)}
                  />
                </Suspense>
            </div>
        </motion.div>

        {/* LAYER 3: THE SUPER-MASK (Aggressive Logo Coverage - Enlarged) */}
        {/* LAYER 3: THE SUPER-MASK (Aggressive Logo Coverage - Enlarged) */}
        <div className="absolute bottom-0 right-0 z-[999] flex items-center justify-end pr-4 pb-4 w-96 h-32 bg-gradient-to-tl from-white/40 via-white/20 to-transparent dark:from-[#050505] dark:via-[#050505]/95 dark:to-transparent pointer-events-none">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/40 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-gray-900/70 dark:text-white/70 font-mono text-[10px] uppercase tracking-[0.3em]">
                  System: Initialized
                </span>
            </div>
        </div>


        {/* Cinematic Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "completed" ? 0.4 : 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-gray-500 dark:text-neutral-500">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent dark:from-neutral-500 dark:to-transparent" />
        </motion.div>

      </motion.div>
    </section>
  );
}