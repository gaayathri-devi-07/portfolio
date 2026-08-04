"use client";

import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointer-tracker";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);
  const rafUnsub = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const ring = ringRef.current;
    if (!container || !ring) return;

    // ─── Visibility helpers ─────────────────────────────────────────────────────
    const hide = () => { container.style.opacity = "0"; };
    const show = () => { if (hasMoved.current) container.style.opacity = "1"; };

    // ─── Hover state via pointerover/pointerout (no work on move) ────────────────
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, .magnetic-item, [data-cursor-hover], [onclick]")) {
        ring.classList.add("cursor-hovered");
      }
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, .magnetic-item, [data-cursor-hover], [onclick]")) {
        const rt = e.relatedTarget as HTMLElement | null;
        if (!rt?.closest("a, button, .magnetic-item, [data-cursor-hover], [onclick]")) {
          ring.classList.remove("cursor-hovered");
        }
      }
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerleave", hide, { passive: true });
    document.addEventListener("pointerenter", show, { passive: true });
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);

    // ─── Single unified rAF loop via shared pointer-tracker ──────────────────────
    // lerp 0.25 from the tracker + direct style.transform mutation =
    // zero React renders, zero layout thrash, sub-frame cursor response.
    rafUnsub.current = subscribePointer((x, y) => {
      hasMoved.current = true;
      container.style.opacity = "1";
      ring.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
    });

    return () => {
      rafUnsub.current?.();
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .custom-cursor-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #fbcfe8;
          background-color: rgba(251, 207, 232, 0.04);
          box-shadow: 0 0 10px rgba(251, 207, 232, 0.15);
          pointer-events: none;
          will-change: transform, scale, background-color, box-shadow;
          transition:
            scale 0.3s cubic-bezier(0.25, 1, 0.5, 1),
            background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          transform: translate3d(-100px, -100px, 0);
        }
        .custom-cursor-ring.cursor-hovered {
          scale: 1.8;
          background-color: rgba(251, 207, 232, 0.18);
          box-shadow: 0 0 25px rgba(251, 207, 232, 0.55), inset 0 0 10px rgba(251, 207, 232, 0.25);
        }
        @media (max-width: 768px) {
          .custom-cursor-container { display: none !important; }
        }
      `}</style>
      <div ref={containerRef} className="custom-cursor-container" id="custom-cursor">
        <div ref={ringRef} className="custom-cursor-ring" />
      </div>
    </>
  );
}
