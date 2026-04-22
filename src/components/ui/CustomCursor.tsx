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
      mouseX.set(e.clientX - 8); // -8 centers a 16px cursor (w-4 h-4)
      mouseY.set(e.clientY - 8);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.magnetic-item')) {
        setIsHovered(true);
      }
    };
    const handleHoverEnd = () => setIsHovered(false);

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
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovered ? 4 : 1,
        backgroundColor: isHovered ? "rgba(168, 85, 247, 0.2)" : "white",
        border: isHovered ? "1px solid #a855f7" : "none"
      }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
    />
  );
}
