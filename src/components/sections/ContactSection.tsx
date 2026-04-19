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
    gsap.to(words, {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: "0%", opacity: 1, rotationZ: 0,
      duration: 1.2, ease: "expo.out", stagger: 0.05,
    });
  }, []);
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-4 gap-y-1 overflow-hidden ${className ?? ""}`} style={{ fontFamily: SERIF }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block" style={{ transform: "translateY(100%) rotateZ(5deg)", opacity: 0 }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8 md:px-16 lg:px-24 overflow-hidden bg-[var(--bg)] border-t border-[var(--glass-border)] transition-colors duration-500">
      <SpiderReveal text="LET'S TALK." className="text-5xl md:text-8xl font-medium text-[var(--fg)] mb-20" />

      <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-start" style={{ fontFamily: SERIF }}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-6xl font-light text-[var(--fg)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300 origin-left"
        >
          GITHUB →
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-6xl font-light text-[var(--fg)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300 origin-left"
        >
          LINKEDIN →
        </a>
        <a
          href="mailto:gaayathridevi@example.com"
          className="text-4xl md:text-6xl font-light text-[var(--fg)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300 origin-left"
        >
          EMAIL →
        </a>
      </div>

      <div className="mt-32 pt-8 border-t border-[var(--glass-border)] flex justify-between items-center text-[var(--muted)] font-mono text-xs tracking-widest uppercase">
        <span>© 2026 Gaayathri Devi</span>
        <span>Full-Stack · AI · 3D Web</span>
      </div>
    </section>
  );
}
