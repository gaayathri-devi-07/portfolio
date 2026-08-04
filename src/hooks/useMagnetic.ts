"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Magnetic pull hook — rAF-throttled, passive listener, zero layout thrashing.
 *
 * Optimization: The window-level 'mousemove' listener is attached ONLY when the
 * mouse enters the element and detached immediately when the mouse leaves.
 * This prevents dozens of window-level listeners from running simultaneously on scroll or movement.
 */
export function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // GSAP quickTo handles all the easing internally — no per-frame math needed
    const xTo = gsap.quickTo(element, "x", { duration: 0.8, ease: "expo.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.8, ease: "expo.out" });

    // ─── Cached rect — read ONCE, not on every mousemove ──────────────────────
    // Caching layout metrics prevents synchronous reflow/thrashing on mousemove.
    let cachedRect = element.getBoundingClientRect();

    const refreshRect = () => {
      cachedRect = element.getBoundingClientRect();
    };

    const resizeObserver = new ResizeObserver(refreshRect);
    resizeObserver.observe(element);
    window.addEventListener("scroll", refreshRect, { passive: true });

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;
    let isListening = false;

    const applyMagnetic = () => {
      rafId = null;
      const x = latestX - (cachedRect.left + cachedRect.width / 2);
      const y = latestY - (cachedRect.top + cachedRect.height / 2);

      const distance = Math.hypot(x, y);
      const limit = cachedRect.width * 1.5;

      if (distance < limit) {
        xTo(x * 0.2);
        yTo(y * 0.2);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyMagnetic);
      }
    };

    const handleMouseEnter = () => {
      if (!isListening) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        isListening = true;
      }
    };

    const handleMouseLeave = () => {
      if (isListening) {
        window.removeEventListener("mousemove", handleMouseMove);
        isListening = false;
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", refreshRect);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
