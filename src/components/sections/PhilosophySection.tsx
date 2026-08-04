"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SplineScene from "@/components/3d/SplineScene";
import RevealText from "@/components/ui/RevealText";

gsap.registerPlugin(ScrollTrigger);

const CANELA = "Canela, Playfair Display, Georgia, serif";

const BEDROOM_SCENE_URL = "https://prod.spline.design/2KPdIlgyxocYUnwu/scene.splinecode";

export default function PhilosophySection() {
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const splineAppRef = useRef<unknown>(null);

  // Permanently mount the Spline canvas. Use IntersectionObserver to
  // toggle rendering (stop/play) and CSS visibility so the WebGL context
  // stays alive while consuming zero GPU resources when off-screen.
  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = splineWrapperRef.current;
    if (!section || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const app = splineAppRef.current as Record<string, unknown> | null;
        if (entry.isIntersecting) {
          wrapper.style.opacity = "1";
          wrapper.style.visibility = "visible";
          wrapper.style.pointerEvents = "auto";
          (app?.play as () => void)?.();
        } else {
          wrapper.style.opacity = "0";
          wrapper.style.visibility = "hidden";
          wrapper.style.pointerEvents = "none";
          (app?.stop as () => void)?.();
        }
        ScrollTrigger.refresh();
      },
      {
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Passive wheel handler ensures Spline canvas never blocks page scroll.
  // pointer-events: none on the Spline container handles the rest.
  useEffect(() => {
    const el = splineWrapperRef.current;
    if (!el) return;
    const passWheel = (e: WheelEvent) => {
      if (e.cancelable) e.preventDefault();
    };
    el.addEventListener("wheel", passWheel as EventListener, { passive: false });
    return () => el.removeEventListener("wheel", passWheel as EventListener, { passive: false } as AddEventListenerOptions);
  }, []);

  // Disconnect Spline's internal scroll reading so the model's camera
  // distance/zoom/scale are driven solely by the Spline scene timeline,
  // not by the page's scroll offset. Rotation animations are preserved.
  const handleSplineLoad = useCallback((splineApp: unknown) => {
    const app = splineApp as Record<string, unknown>;
    // stopScroll is available on Spline v3+ to unpin scroll-driven events
    (app?.stopScroll as (() => void) | undefined)?.();
    // If the scene exposed variables for zoom/scale, lock them to defaults.
    // Suppress console warnings for variables that may not exist in the file.
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const msg = args.map(String).join(' ');
      if (msg.includes('No variable named')) return;
      originalWarn.apply(console, args as Parameters<typeof console.warn>);
    };
    try {
      (app?.setVariable as ((name: string, val: number) => void) | undefined)?.('zoom', 1);
      (app?.setVariable as ((name: string, val: number) => void) | undefined)?.('cameraDistance', 1);
    } catch {
      // Variable locking is best-effort
    } finally {
      console.warn = originalWarn;
    }
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-screen min-h-dvh h-dvh bg-[#000000] py-24 md:py-32 flex flex-col justify-center overflow-visible gpu-accelerated contain-paint px-6 md:px-12 lg:px-16"
      style={{ fontFamily: CANELA }}
    >
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.6fr_1.2fr] gap-16 lg:gap-8 items-center !overflow-visible">

        <div className="flex flex-col text-center lg:text-left order-1 lg:order-1 w-full max-w-full gpu-accelerated !pl-[6vw]">
          <div className="max-w-[600px] mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
            <div className="relative h-[2px] w-48 md:w-64 bg-white/10 overflow-hidden mb-6">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-loading-h" />
            </div>
            <div className="w-full">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="text-pink-200">Welcome</span> <br />
                to my space.
              </h2>
            </div>
            <RevealText as="p" className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 break-words text-center lg:text-left">
              An AI-Enabled Full-Stack Engineer. I build enterprise-grade applications that connect immersive 3D frontends with scalable Python/FastAPI backends.
            </RevealText>
          </div>
        </div>

        <div className="flex justify-center items-center w-full order-2 lg:order-2 !overflow-visible relative pointer-events-auto">
          <div
            ref={splineWrapperRef}
            className="relative w-full max-w-[450px] h-[350px] md:h-[450px] lg:h-[550px] bg-[#000000] overflow-hidden flex items-center justify-center z-10 mx-auto"
          >
            <div className="w-full h-full scale-[1.15] translate-y-6">
              <SplineScene
                className="w-full h-full"
                scene={BEDROOM_SCENE_URL}
                renderOnDemand={true}
                appRef={splineAppRef}
                onLoad={handleSplineLoad}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col text-center order-3 lg:order-3 w-full max-w-full gpu-accelerated !pl-[2vw] lg:!pl-[4vw]">
          <div className="relative h-[2px] w-48 md:w-64 bg-white/10 overflow-hidden mb-6 mx-auto lg:mx-0">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-loading-h" />
          </div>
          <div className="max-w-md mx-auto">
            <RevealText as="p" className="text-gray-400 text-base md:text-lg leading-relaxed break-words text-center">
              Engineering intelligent, seamless applications that solve real problems. I build digital products that feel alive.
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
