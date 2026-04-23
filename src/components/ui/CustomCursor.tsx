"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // 1. Bypass React State for raw coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Aggressive spring physics for zero-lag tracking (Elite Calibration)
  const springConfig = { damping: 28, stiffness: 1000, mass: 0.01 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 3. Update motion values directly (DOES NOT trigger a React re-render)
    const moveCursor = (e: MouseEvent) => {
      // Centering a 24px cursor (w-6 h-6)
      mouseX.set(e.clientX - 12); 
      mouseY.set(e.clientY - 12);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, .magnetic-item, [data-cursor-hover]');
      
      if (hoverable) {
        setIsHovered(true);
        hoverable.classList.add('force-hover');
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      setIsHovered(false);
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, .magnetic-item, [data-cursor-hover]');
      if (hoverable) {
        hoverable.classList.remove('force-hover');
      }
      // Failsafe: remove from all if mouse leaves window or similar
      document.querySelectorAll('.force-hover').forEach(el => el.classList.remove('force-hover'));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        pointerEvents: "none",
      }}
      animate={{
        scale: isHovered ? 1.8 : 1,
        backgroundColor: isHovered ? "rgba(251, 207, 232, 0.2)" : "rgba(251, 207, 232, 0.05)",
        border: "1px solid #fbcfe8",
        boxShadow: isHovered 
          ? "0 0 25px rgba(251, 207, 232, 0.6), inset 0 0 10px rgba(251, 207, 232, 0.3)" 
          : "0 0 10px rgba(251, 207, 232, 0.2)"
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 400, damping: 25 },
        boxShadow: { duration: 0.3 }
      }}
    />
  );
}
