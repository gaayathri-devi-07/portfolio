"use client";

import { useEffect, useState, useRef } from "react";
import SplineScene from "@/components/3d/SplineScene";
import gsap from "gsap";

const JAPANESE_CHARS = "私はガヤトリデヴィですハローワールドキクケコサシスセソタチツテト";

export default function HeroSection() {
  const [helloText, setHelloText] = useState("ハロー・ワールド");
  const [nameText, setNameText] = useState("私はガヤトリ・デヴィです");
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!splineContainerRef.current) return;
      gsap.from(splineContainerRef.current, {
        y: 100,
        scale: 0.85,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        delay: 0.2
      });
    });
    return () => ctx.revert(); // THIS PREVENTS THE REVERT BUG
  }, []);

  useEffect(() => {
    const scramble = (targetWord: string, setTarget: (val: string) => void, delay: number) => {
      setTimeout(() => {
        let iterations = 0;
        const interval = setInterval(() => {
          setTarget(targetWord.split("").map((letter, index) => {
            if (index < iterations) return targetWord[index];
            return JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
          }).join(""));
          if (iterations >= targetWord.length) clearInterval(interval);
          iterations += 1.5; 
        }, 15); 
      }, delay);
    };
    scramble("HELLO WORLD", setHelloText, 100); 
    scramble("I AM GAAYATHRI DEVI.", setNameText, 100); 
  }, []);

  // Prevent scroll hijacking while allowing mouse drag
  useEffect(() => {
    const wrapper = splineWrapperRef.current;
    if (!wrapper) return;
    const preventWheel = (e: WheelEvent) => e.stopPropagation();
    wrapper.addEventListener("wheel", preventWheel, { capture: true, passive: false });
    return () => wrapper.removeEventListener("wheel", preventWheel);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] bg-[var(--bg)] transition-colors duration-500 overflow-hidden">
      
      {/* LAYER 1: THE TEXT (Perfectly Centered) */}
      <div className="absolute inset-0 w-full h-[100dvh] flex flex-col items-center justify-center z-40 pointer-events-none px-4">
          <h2 
            suppressHydrationWarning
            className="text-2xl md:text-3xl lg:text-4xl tracking-[0.6em] text-neutral-600 dark:text-white/80 font-bebas mb-2 md:mb-4"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
              {helloText}
          </h2>
          <h1 
            suppressHydrationWarning
            className="text-[clamp(3.5rem,8vw,10rem)] leading-none text-neutral-900 dark:text-white font-bebas text-center"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
              {nameText}
          </h1>
      </div>

      {/* LAYER 2: THE 3D MODEL (In the middle, uncropped horizontally, organically large) */}
      <div className="absolute inset-0 w-full h-[100dvh] flex items-center justify-center z-10 pointer-events-auto">
        {/* Constraining maximum width to 1200px prevents ultra-wide monitors from squashing the scene, natively forcing the WebGL camera to pull out, thus revealing the shoulders and arms organically */}
        <div ref={splineContainerRef} className="relative w-full max-w-[1200px] h-[100vh] md:h-[110vh] flex items-center justify-center">
            {/* Hard blackout to ensure watermark doesn't ruin the dark/clear aesthetic */}
            <div className="absolute bottom-0 right-0 w-40 h-16 bg-[var(--bg)] transition-colors duration-500 z-50 pointer-events-none" />
            <SplineScene scene="https://prod.spline.design/IYhNPPRr0afNe8vH/scene.splinecode" className="w-full h-full" />
        </div>
      </div>

    </section>
  );
}