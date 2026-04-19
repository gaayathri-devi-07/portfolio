"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "Playfair Display, Georgia, serif";

const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS",
  "GSAP",
  "Spline 3D",
  "Three.js",
  "Python",
  "FastAPI",
  "GCP",
  "Google Gemini",
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Spiderman cinematic word reveal for heading
  useEffect(() => {
    if (!headerRef.current) return;
    const words = headerRef.current.querySelectorAll(".sr-word");
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

  // Endless 3D cylinder rotation
  useEffect(() => {
    if (!sliderRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(sliderRef.current, {
        rotateY: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  const totalItems = TECH_STACK.length;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 bg-[var(--bg)] transition-colors duration-500"
    >
      {/* HEADER — Spiderman Reveal */}
      <h2
        ref={headerRef}
        className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-5xl md:text-6xl lg:text-8xl font-medium text-[var(--fg)] mb-24 z-50"
        style={{ fontFamily: SERIF }}
      >
        {"TECH STACK".split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
            <span className="sr-word inline-block">{w}</span>
          </span>
        ))}
      </h2>

      {/* 3D SCENE CONTAINER */}
      <div
        className="relative w-full h-[400px] flex justify-center items-center"
        style={{ perspective: "1000px" }}
      >
        {/* THE ROTATING SLIDER */}
        <div
          ref={sliderRef}
          className="relative w-[200px] h-[250px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {TECH_STACK.map((tech, index) => {
            const angle = index * (360 / totalItems);
            return (
              <div
                key={tech}
                className="absolute inset-0 flex items-center justify-center bg-neutral-100/80 dark:bg-white/5 backdrop-blur-md border border-neutral-300 dark:border-white/10 rounded-xl shadow-lg"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                }}
              >
                <span className="font-medium text-lg text-neutral-900 dark:text-white text-center px-4">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ambient glow behind cylinder */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.06,
        }}
      />
    </section>
  );
}
