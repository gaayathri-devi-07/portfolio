"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const INTERNSHIPS = [
  {
    company: "MMSR",
    role: "Technical Intern",
    duration: "2024",
    award: "🏆 Best Student Award",
    description:
      "Built full-stack features and contributed to scalable internal tooling. Received the Best Student Award for outstanding performance and initiative.",
    cert: "#",
    accentColor: "rgba(212,165,116,0.12)",
    borderColor: "rgba(212,165,116,0.3)",
  },
  {
    company: "ResPro Labs",
    role: "Frontend Developer Intern",
    duration: "2024",
    award: null,
    description:
      "Developed responsive UI components and collaborated on production-grade feature releases using React and Next.js.",
    cert: "#",
    accentColor: "rgba(99,179,237,0.08)",
    borderColor: "rgba(99,179,237,0.2)",
  },
];

export default function ExperiencesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".exp-card");

    // 360° Y-axis rotation from background → foreground
    gsap.from(cards, {
      z: -500,
      rotationY: -360,
      opacity: 0,
      stagger: 0.3,
      ease: "power3.out",
      duration: 1.5,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8 md:px-16 lg:px-24 overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      {/* Stars background */}
      <div className="star-field absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-16">

        {/* Section heading */}
        <SpiderReveal
          text="MY EXPERIENCES"
          className="text-5xl md:text-8xl font-medium text-[var(--fg)] w-full justify-center text-center"
        />

        {/* Two experience cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full"
          style={{ perspective: "1200px" }}
        >
          {INTERNSHIPS.map((intern) => (
            <div
              key={intern.company}
              className="exp-card flex flex-col gap-6 p-10 rounded-3xl"
              style={{
                background: intern.accentColor,
                border: `1px solid ${intern.borderColor}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transformStyle: "preserve-3d",
                fontFamily: SERIF,
              }}
            >
              {/* Header */}
              <div>
                <p className="text-xs font-mono tracking-widest text-[var(--accent)] uppercase mb-2">
                  {intern.duration}
                </p>
                <h3 className="text-3xl md:text-4xl font-medium text-[var(--fg)]">{intern.company}</h3>
                <p className="text-[var(--muted)] text-lg mt-1">{intern.role}</p>
                {intern.award && (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full text-[var(--accent)] text-sm font-mono tracking-wide"
                    style={{ background: "rgba(212,165,116,0.12)", border: "1px solid rgba(212,165,116,0.3)" }}>
                    {intern.award}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[var(--muted)] leading-relaxed">{intern.description}</p>

              {/* Certificate placeholder → opens PDF in new tab on click */}
              <a
                href={intern.cert}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  height: "160px",
                  background: "var(--glass)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                {/* Certificate inner content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {/* Certificate icon */}
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="w-10 h-10 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "var(--accent)" }}
                  >
                    <rect x="8" y="4" width="32" height="40" rx="3" />
                    <path d="M16 14h16M16 20h16M16 26h8" />
                    <circle cx="32" cy="34" r="6" />
                    <path d="M30 34l1.5 1.5L35 31" />
                  </svg>
                  <span className="text-[var(--muted)] font-mono text-xs tracking-widest group-hover:text-[var(--accent)] transition-colors duration-300 uppercase">
                    View Certificate PDF →
                  </span>
                </div>

                {/* Hover glow border */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px rgba(212,165,116,0.08)" }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
