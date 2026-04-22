"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import SplineScene from "@/components/3d/SplineScene";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";

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

  const { scrollY } = useScroll();
  
  // ELITE PERFORMANCE: Dampen raw scroll updates for buttery smooth faints/shifts
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Fades out between 0px and 800px of scroll depth
  const sectionOpacity = useTransform(smoothY, [0, 800], [1, 0]);
  // Adds a slight downward parallax shift
  const sectionY = useTransform(smoothY, [0, 800], [0, 150]); 

  // SEQUENCE ORCHESTRATION
  useEffect(() => {
    if (!isRobotLoaded) return;

    // Start Sequence
    setPhase("entering");

    const timer1 = setTimeout(() => {
      setPhase("japanese");
    }, 500);

    const timer2 = setTimeout(() => {
      setPhase("paused");
    }, 1000);

    const timer3 = setTimeout(() => {
      setPhase("translating");
    }, 2200);

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
    <>
      {/* 1. THE CINEMATIC OVERLAY - MOVED OUTSIDE OF SECTION TO ESCAPE TRANSFORM BUBBLE */}
      <AnimatePresence>
        {!isRobotLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            // 'fixed' NOW WORKS CORRECTLY because it's not inside a transformed parent
            className="fixed inset-0 z-[9999] bg-[#000000]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-full">
              <span className="text-sm md:text-lg font-mono tracking-[0.5em] text-[#FFB6C1]/80 uppercase animate-pulse">
                Syncing Neural Engine
              </span>
              {/* Perfect Straight Line Loader - Pastel Pink */}
              <div className="w-48 md:w-64 h-[1px] bg-[#FFB6C1]/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#FFB6C1] w-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
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
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: phase === "loading" ? 0 : 1,
                transition: { duration: 0.5, delay: 0.5 }
              }}
              className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none px-4 gpu-accelerated"
          >
              <h2 
                  suppressHydrationWarning
                  className="text-xl md:text-2xl lg:text-3xl tracking-[0.4em] text-[#ffffff]/40 mb-4 md:mb-6 font-medium"
                  style={{ fontFamily: CANELA }}
              >
                  {helloText}
              </h2>
              <h1 
                  suppressHydrationWarning
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold text-[#ffffff] whitespace-nowrap tracking-tight text-center w-full px-4 transition-colors duration-500"
                  style={{ fontFamily: CANELA }}
              >
                  {nameText}
              </h1>
          </motion.div>

          {/* LAYER 2: 3D MODEL CORRIDOR (LIGHTNING SPRING ENTRANCE) */}
          <motion.div 
              initial={{ y: "20vh", opacity: 0, scale: 0.95 }}
              animate={isRobotLoaded ? { y: 0, opacity: 1, scale: 1 } : { y: "20vh", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
              className="absolute inset-0 w-full h-screen flex items-center justify-center z-0 pointer-events-auto gpu-accelerated"
          >
              <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center pointer-events-auto overflow-hidden">
                  <Suspense fallback={null}>
                    <SplineScene 
                        scene="https://prod.spline.design/IYhNPPRr0afNe8vH/scene.splinecode" 
                        className="w-full h-full" 
                        onLoad={() => setIsRobotLoaded(true)}
                    />
                  </Suspense>
                  
                  {/* OBLITERATION MASK */}
                  <div className="absolute bottom-0 right-0 w-[250px] h-[120px] bg-[#000000] z-[9999] pointer-events-none" />
              </div>
          </motion.div>

          {/* Cinematic Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "completed" ? 0.4 : 0 }}
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