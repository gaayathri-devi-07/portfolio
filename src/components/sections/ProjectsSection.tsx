"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SERIF = "Playfair Display, Georgia, serif";

function SpiderReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".sr-word");
    gsap.from(words, {
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
      y: "110%", opacity: 0, rotationZ: 5,
      duration: 1.2, ease: "expo.out", stagger: 0.05,
    });
  }, []);
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-4 gap-y-1 ${className ?? ""}`} style={{ fontFamily: SERIF }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block">{w}</span>
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 100,
      ease: "back.out(1.7)",
      duration: 1,
      scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8 md:px-16 lg:px-24 overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      {/* Stars background */}
      <div className="star-field absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-16">

        {/* Section heading */}
        <SpiderReveal
          text="MY PROJECTS"
          className="text-5xl md:text-8xl font-medium text-[var(--fg)] w-full justify-center text-center"
        />

        {/* Single centered premium card */}
        <div ref={cardRef} className="w-full max-w-2xl" style={{ perspective: "1200px" }}>
          <Link href="https://blackbox-interview.vercel.app" target="_blank" className="block group">
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "var(--glass)",
                backdropFilter: "blur(24px) saturate(1.6)",
                WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                border: "1px solid var(--glass-border)",
                minHeight: "480px",
              }}
            >
              {/* Glow accent top edge */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
              />

              {/* Card content */}
              <div className="relative z-10 flex flex-col h-full justify-between p-10" style={{ fontFamily: SERIF, minHeight: "480px" }}>
                <div className="flex flex-col gap-6">
                  <span className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase">
                    Featured Project · 01
                  </span>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-medium text-[var(--fg)] leading-tight mb-4">
                      Black Box<br />AI Interview App
                    </h3>
                    <p className="text-[var(--muted)] text-base leading-relaxed max-w-md">
                      Full-stack AI-powered interview platform with real-time voice interaction,
                      intelligent feedback loops, and dynamic question generation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {["Next.js 16", "FastAPI", "Google Gemini", "Firebase", "Three.js"].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full font-mono text-xs tracking-wide border"
                      style={{
                        background: "rgba(212,165,116,0.08)",
                        borderColor: "rgba(212,165,116,0.25)",
                        color: "var(--accent)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 text-xs font-mono tracking-widest text-[var(--muted)] uppercase">
                  Hover to preview →
                </span>
              </div>

              {/* Hover overlay — slides up from bottom */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
              >
                <div
                  className="w-[75%] h-[55%] rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: "rgba(30,30,30,0.9)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: "0 0 60px rgba(212,165,116,0.15)",
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Animated loading bar */}
                    <div className="w-32 h-0.5 rounded-full overflow-hidden bg-neutral-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, var(--accent), var(--accent-hover))",
                          animation: "loading-bar 1.5s ease-in-out infinite",
                          width: "60%",
                        }}
                      />
                    </div>
                    <span className="text-white/60 font-mono text-xs tracking-widest uppercase">
                      Loading Preview...
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-white/40 font-mono text-xs tracking-widest">
                  Click to open project →
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
}
