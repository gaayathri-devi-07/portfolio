"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT = "I'm Gaayathri Devi, a 2nd-year Artificial Intelligence and Data Science student at RMKCET. My tech journey began with a fascination for crafting visually striking, heavily animated websites, which naturally evolved into full-stack development. I specialize in Next.js, Python, and API integrations—most recently applying these to build a comprehensive AI Interview Application. When I step away from the keyboard, I channel my creativity into painting or stay active playing shuttle.";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current) return;

    const words = textContainerRef.current.querySelectorAll('.word-reveal');

    gsap.to(words, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
      y: '0%',
      rotationZ: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.05
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-8 md:px-16 lg:px-24 bg-[var(--bg)] min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl mx-auto" style={{ fontFamily: 'Playfair Display, serif' }}>
         <div ref={textContainerRef} className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-4 justify-center text-center">
            {ABOUT_TEXT.split(" ").map((word, index) => (
               <span key={index} className="inline-block overflow-hidden py-1">
                  <span 
                    className="inline-block word-reveal origin-bottom-left text-2xl md:text-5xl lg:text-6xl text-[var(--fg)] font-medium tracking-tight"
                    style={{ transform: 'translateY(100%) rotateZ(3deg)', opacity: 0 }}
                  >
                     {word}
                  </span>
               </span>
            ))}
         </div>
      </div>
    </section>
  );
}
