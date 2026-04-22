"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for that high-end, magnetic smoothness
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10); // 10 is half the width/height (w-5) to center it
      mouseY.set(e.clientY - 10);
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
      id="custom-cursor"
      animate={{
        scale: isHovered ? 2.5 : 1, // Subtle expansion
        backgroundColor: isHovered ? "rgba(251, 207, 232, 0.15)" : "rgba(251, 207, 232, 0)", // Fixed animatable color
        borderColor: isHovered ? "#fbcfe8" : "#f9a8d4", // Pink-200 to Pink-300
        borderWidth: isHovered ? "1px" : "2px", // Thinner on hover
        boxShadow: isHovered ? "0 0 20px rgba(251, 207, 232, 0.6)" : "0 0 0px rgba(251, 207, 232, 0)", // Fixed animatable glow
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{ x: cursorX, y: cursorY }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]"
    />
  );
}
