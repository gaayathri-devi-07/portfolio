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
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: rewardOpacity, scale: rewardScale }}
      >
        {/* Glowing Diamond */}
        <div className="w-6 h-6 rotate-45 bg-gradient-to-br from-pink-200 to-purple-200 shadow-[0_0_20px_#fbcfe8] flex items-center justify-center">
          <div className="w-2 h-2 bg-white rotate-45 shadow-[0_0_10px_white]" />
        </div>
        <span className="text-pink-200 font-mono text-[10px] tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(251,207,232,0.8)]">
          Journey Complete
        </span>
      </motion.div>
    </>
  );
}
