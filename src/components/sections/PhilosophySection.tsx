"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/components/3d/SplineScene";

gsap.registerPlugin(ScrollTrigger);

const CANELA = "Canela, Playfair Display, Georgia, serif";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);

  // Spiderman cinematic word reveal for heading
  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".sr-word");
    const ctx = gsap.context(() => {
      gsap.from(words, {
        y: '110%',
        opacity: 0,
        rotationZ: 5,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Apply subtle reveals for left/right columns
  useEffect(() => {
    if (leftRef.current) {
      gsap.fromTo(leftRef.current, 
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: leftRef.current, start: "top 85%" }, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
    if (rightRef.current) {
      gsap.fromTo(rightRef.current, 
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: rightRef.current, start: "top 85%" }, y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // Aggressive wheel capture to stop Spline from zooming while letting page scroll
  useEffect(() => {
    const el = splineWrapperRef.current;
    if (!el) return;
    const preventZoom = (e: WheelEvent) => {
      e.stopPropagation();
    };
    el.addEventListener("wheel", preventZoom, { capture: true, passive: false });
    return () => el.removeEventListener("wheel", preventZoom);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-32 overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center">
        
        {/* Left Column (Span 4): The Introduction */}
        <div ref={leftRef} className="col-span-1 lg:col-span-4 flex flex-col justify-center">
          <div className="w-12 h-[1px] bg-neutral-300 dark:bg-white/30 mb-6"></div>
          <h2 
            ref={headingRef}
            className="flex flex-wrap gap-x-3 gap-y-1 text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight" 
            style={{ fontFamily: CANELA }}
          >
            {"Welcome to my space.".split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <span className="sr-word inline-block">{w}</span>
              </span>
            ))}
          </h2>
          <p 
            className="text-neutral-600 dark:text-white/80 font-medium text-lg leading-relaxed" 
            style={{ fontFamily: CANELA }}
          >
            I like to code. My goal is to become a Full-Stack Developer and AI Intern.
          </p>
        </div>

        {/* Center Column (Span 4): The 3D Centerpiece */}
        <div className="col-span-1 lg:col-span-4 flex justify-center">
          <div 
            ref={splineWrapperRef} 
            className="w-full aspect-square max-w-[500px] mx-auto relative z-10 pointer-events-auto"
          >
            {/* Hides Spline logo overlay firmly */}
            <div className="absolute bottom-0 right-0 w-40 h-16 bg-[var(--bg)] transition-colors duration-500 z-50 pointer-events-none" />
            <SplineScene
              className="w-full h-full"
              scene="https://prod.spline.design/2KPdIlgyxocYUnwu/scene.splinecode"
            />
          </div>
        </div>

        {/* Right Column (Span 4): The Narrative */}
        <div ref={rightRef} className="col-span-1 lg:col-span-4 border-l border-neutral-200 dark:border-white/10 pl-8">
          <p 
            className="text-neutral-600 dark:text-white/70 font-light text-lg leading-relaxed" 
            style={{ fontFamily: CANELA }}
          >
            I'm Gaayathri Devi, a 2nd-year Artificial Intelligence and Data Science student at RMKCET. My tech journey began with a fascination for crafting visually striking, heavily animated websites. I specialize in Next.js, Python, and robust API integrations. When I step away from the keyboard, I channel my creativity into painting or stay active playing shuttle.
          </p>
        </div>

      </div>
    </section>
  );
}
