"use client";

import { useEffect, useState, memo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor-expand")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2 : 1,
          borderWidth: isHovering ? "1px" : "2px",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full h-full border-white rounded-full mix-blend-difference"
      />
    </motion.div>
  );
});

CustomCursor.displayName = "CustomCursor";

export default CustomCursor;
