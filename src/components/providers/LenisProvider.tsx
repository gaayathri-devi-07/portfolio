"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

/**
 * Lenis smooth-scroll provider tuned for lightweight fast feel.
 *
 * - lerp: 0.04  → highly responsive, virtually no input-to-scroll lag.
 *                  Lower than 0.1 stock but still retains a subtle
 *                  ease so sections don't snap abruptly.
 * - duration: 0.6 → shorter acceleration curve makes the scroll feel
 *                   quick and nimble instead of sluggish.
 * - wheelMultiplier: 0.7 → dampens trackpad overshoot. Users won't
 *                         "fly past" sections.
 * - touchMultiplier: 1.0 → neutral touch — no artificial speed-up.
 *
 * All listeners are { passive: true } internally and never block the
 * compositor thread.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.04,
        duration: 0.6,
        smoothWheel: true,
        wheelMultiplier: 0.7,
        touchMultiplier: 1.0,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
