"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 0.8, ease: "expo.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.8, ease: "expo.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Distance check
      const distance = Math.hypot(x, y);
      const limit = width * 1.5;

      if (distance < limit) {
        // Subtle magnetic pull (max ~15px-20px)
        xTo(x * 0.2);
        yTo(y * 0.2);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
