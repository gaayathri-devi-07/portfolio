"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAPPlugins } from "@/lib/gsap";

registerGSAPPlugins();

const CHRONIC = "Canela, Playfair Display, Georgia, serif";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Scroll-triggered CSS slide animations for contact heading
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const heading = el.querySelector('.contact-heading');
    if (!heading) return;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.35
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heading.classList.add('animate-reveal');
        }
      },
      observerOptions
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ─── Premium Typewriter Effect ───
      const para = typewriterRef.current;
      const cursor = cursorRef.current;
      if (para && cursor) {
        const fullText = "Or just say hello.";

        gsap.to(para, {
          text: {
            value: fullText,
            delimiter: "",
          },
          duration: fullText.length * 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.3,
              delay: 1,
              onComplete: () => {
                cursor.style.display = "none";
              },
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-full min-h-screen bg-[#000000] text-[#ffffff] flex items-center justify-center rounded-t-[4rem] z-50 -mt-10 overflow-hidden transition-colors duration-500 px-6 md:px-12 pt-40 pb-40"
    >
      <div className="absolute top-0 left-12 md:left-24 lg:left-32 w-[2px] h-full z-20 bg-gradient-to-b from-transparent via-purple-300 to-transparent animate-loading-v" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-center relative z-10">
        {/* Left Column */}
        <div className="flex flex-col items-start justify-center pl-10 sm:pl-16 md:pl-24 lg:pl-32 pr-6 w-full">
          <h2 className="contact-heading text-3xl md:text-[3.5rem] lg:text-[4.5rem] leading-[0.9] tracking-tighter mb-6 text-[#ffffff] transition-colors">
            <div className="slide-left">&nbsp;&nbsp;Want to</div>
            <div className="slide-right italic font-light text-gray-400">&nbsp;&nbsp;&nbsp;start a new</div>
            <div className="slide-left">&nbsp;&nbsp;project?</div>
          </h2>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-serif tracking-tight text-gray-400 italic"
            style={{ marginTop: '50px' }}
          >
            <span ref={typewriterRef} />
            <span ref={cursorRef} className="typewriter-cursor">|</span>
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start lg:items-end justify-center gap-16 w-full mt-10 lg:mt-0 px-4 sm:px-8 lg:px-0 [transform:translateZ(40px)]">
          <div className="group relative w-full lg:w-auto text-right">
            <a href="mailto:gaayi.exe@gmail.com &nbsp;" className="text-xl md:text-2xl lg:text-3xl font-serif tracking-tight text-[#ffffff] transition-colors pb-4 block">
              gaayi.exe@gmail.com
            </a>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/50 to-transparent animate-loading-h" />
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 font-mono text-xs md:text-sm uppercase tracking-widest text-gray-400">
            <a href="https://www.linkedin.com/in/gaayathri-devi-g-038b54330/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="text-xl">↗</span> LinkedIn
            </a>
            <a href="https://github.com/gaayathri-devi-07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="text-xl">↗</span> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="text-xl">↗</span> Resume
            </a>
          </div>

          <div className="w-full flex justify-between items-end border-t border-gray-400/30 pt-6 mt-8">
            <span className="text-sm font-black tracking-[0.2em] uppercase text-[#ffffff]">LET&apos;S CONNECT</span>
            <span className="text-xs font-mono text-gray-500">&copy; 2026 Gaayathri Devi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
