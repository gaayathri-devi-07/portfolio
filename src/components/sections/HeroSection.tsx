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
      {/* Full-Screen Curtain Loader */}
      <div 
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#e5e4df] dark:bg-[#000000] transition-opacity duration-1000 ease-in-out ${
          isRobotLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <span className="text-xs md:text-sm font-mono tracking-[0.5em] text-gray-900 dark:text-white uppercase">
            Syncing Neural Engine
          </span>
          {/* Animated Loading Bar */}
          <div className="w-48 md:w-64 h-[1px] bg-gray-300 dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-pink-300 w-full animate-[loading_2s_ease-in-out_infinite] origin-left" />
          </div>
        </div>
      </div>

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
                className="text-xl md:text-2xl lg:text-3xl tracking-[0.4em] text-gray-800 dark:text-gray-300/40 mb-4 md:mb-6 font-medium"
                style={{ fontFamily: CANELA }}
            >
                {helloText}
            </h2>
            <h1 
                suppressHydrationWarning
                className="text-[clamp(2.5rem,7vw,8.5rem)] leading-[1.1] text-gray-900 dark:text-white font-medium text-center transition-colors duration-500"
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

        {/* LAYER 3: THE SEAMLESS CAMOUFLAGE MASK (Watermark Smasher) */}
        <div className="absolute bottom-0 right-0 w-80 md:w-96 h-20 bg-[#e5e4df] dark:bg-black z-[60] flex items-center justify-end pr-8 border-t border-l border-black/10 dark:border-none pointer-events-none transition-colors duration-500">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-black dark:text-white text-xs font-mono tracking-widest uppercase">
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