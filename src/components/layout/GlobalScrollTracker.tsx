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

  return (
    <>
      {/* GLOBAL SCROLL PROGRESS BAR (Fixed Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 origin-left z-[9999]"
        style={{ scaleX }}
      />
    </>
  );
}
