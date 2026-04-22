"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function GlobalScrollTracker() {
  const { scrollYProgress } = useScroll();
  
  // High-end spring physics for smooth, buttery progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map the very end of the scroll (95% to 100%) to reward visibility
  const rewardOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const rewardScale = useTransform(scrollYProgress, [0.95, 1], [0.8, 1]);

  return (
    <>
      {/* GLOBAL SCROLL PROGRESS BAR (Fixed Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* THE SCROLL REWARD ELEMENT (Visible only at footer) */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-4 pointer-events-none"
        style={{ opacity: rewardOpacity, scale: rewardScale }}
      >
        {/* Glowing Diamond - MINIMALIST SCALE */}
        <div className="w-7 h-7 rotate-45 bg-gradient-to-br from-white via-pink-100 to-purple-200 shadow-[0_0_30px_rgba(251,207,232,0.6)] flex items-center justify-center animate-pulse">
          <div className="w-2.5 h-2.5 bg-white rotate-45 shadow-[0_0_12px_white]" />
        </div>

        {/* Journey Complete - MINIMALIST SCALE */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm md:text-base font-black tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 animate-loading-h drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
            Journey Complete
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-loading-h opacity-50" />
        </div>
      </motion.div>
    </>
  );
}
