"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: "01",
    title: "AI Interview App",
    tags: ["Next.js", "API", "Typescript"]
  },
  {
    num: "02",
    title: "3D Portfolio Experience",
    tags: ["Next.js", "Spline", "GSAP"]
  },
  {
    num: "03",
    title: "Me Dashboard",
    tags: []
  },
  {
    num: "04",
    title: "Neural Style Transfer",
    tags: []
  }
];

export default function VaultSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.vault-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[var(--bg)] transition-colors duration-500 overflow-hidden flex flex-col items-center">
      
      <div className="w-full max-w-6xl mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20 space-y-6 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-[var(--fg)]">
            Vault
          </h2>
          <p className="text-[var(--muted)] max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            A collection of projects that define my craft — from platforms to immersive 3D experiences.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((col, i) => (
            <div key={i} className="vault-card group relative p-10 md:p-14 rounded-[2.5rem] bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[350px]">
              
              {/* Background Watermark */}
              <div className="absolute -bottom-10 -right-4 text-9xl font-sans font-bold text-neutral-200/50 dark:text-neutral-800/50 pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
                {col.num}
              </div>

              {/* Top Icons/Tags */}
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-wrap gap-2">
                  {col.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-black/50 text-[var(--muted)] text-xs font-mono tracking-widest uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] flex items-center justify-center transition-transform duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] text-[var(--fg)] group-hover:-translate-y-1 group-hover:translate-x-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              {/* Title Content */}
              <div className="relative z-10 mt-20">
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {col.title}
                </h3>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
