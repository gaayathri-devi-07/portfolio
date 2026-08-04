"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/ui/RevealText";

gsap.registerPlugin(ScrollTrigger);

const CERIF = "Canela, Playfair Display, Georgia, serif";

export default function ProjectsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.15 });

  // SCROLL-TRACKING 3D ROTATION
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // THE FIX: Forcibly clear hover state on scroll to prevent stuck previews
  useEffect(() => {
    const handleScroll = () => setIsHovered(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    ScrollTrigger.refresh();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-triggered typewriter: animate when heading enters viewport
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-typewriter');
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Enters showing the back (-180), lays PERFECTLY FLAT to read in the center (0), flips to the back as it leaves (180). Total rotation = 360 degrees.
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-450, 0, 450]);
  // Scales down slightly while flipping to add depth and prevent screen clipping, full size in the center
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  function handleMouseMove(e: React.MouseEvent) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(cx + (e.clientX - cx) * 2.5);
    mouseY.set(cy + (e.clientY - cy) * 2.5);
  }

  return (
    <>
      <section 
        id="projects"
        ref={sectionRef}
        className="relative z-20 w-screen min-h-dvh bg-[#000000] pt-2 pb-24 md:pb-32 flex flex-col items-center overflow-visible transform-gpu will-change-transform contain-paint px-12 md:px-24 lg:px-32" 
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          
          <div
            className="relative z-30 text-center w-full py-16 md:py-20"
            style={{ fontFamily: CERIF }}
          >
            <span
              ref={headingRef}
              className="scroll-type-heading"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, color: '#FFFFFF' }}
            >
              MY PROJECT
            </span>
          </div>

          <motion.div 
            style={{ rotateX, scale, transformPerspective: 2000 }}
            className="relative w-full max-w-6xl mx-auto rounded-3xl p-[4px] overflow-hidden group shadow-[0_0_80px_rgba(232,121,249,0.4)]"
          >
              {/* THE TRACING LIGHT BEAM: Static Conic Glow */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_20%,#e879f9_35%,#f472b6_50%,#e879f9_65%,rgba(0,0,0,0)_80%,rgba(0,0,0,0)_100%)] opacity-100" />
              
              {/* THE INNER CARD: Permanently Midnight */}
              <a href="https://blackbox-interview.vercel.app" target="_blank" rel="noopener noreferrer" className="relative block h-full w-full z-10 cursor-none">
                <div 
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative w-full min-h-[80vh] bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-[calc(1.5rem-4px)] flex flex-col p-12 md:p-20 lg:p-24 text-center shadow-none transition-colors duration-500" 
                  style={{ fontFamily: CERIF }}
                >
                    {/* --- CONTENT WRAPPER --- */}
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <span className="text-sm tracking-[0.3em] uppercase text-gray-500 font-bold mb-6">
                            FEATURED PROJECT • 01
                        </span>
                        
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-[#ffffff]">
                            Black Box <br/> AI Interview App
                        </h3>
                        
                        <RevealText as="p" className="text-base md:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto mb-12">
                            While countless platforms teach coding, there is a massive gap in solutions that simulate the intense pressure of a real technical interview. Blackbox AI bridges this gap by providing an immersive, real-time mock interview environment tailored to specific target companies and difficulty levels. It is designed to give candidates firsthand experience, helping them conquer interview anxiety and perform with absolute confidence.
                        </RevealText>
                    </div>

                    {/* --- TECH STACK --- */}
                    <div className="mt-auto pt-10 border-t border-white/10 w-full flex flex-wrap justify-center gap-6 md:gap-12">
                        <div className="flex flex-col items-center">
                            <p className="text-[#d8b4fe] font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">Frontend</p>
                            <p className="text-sm text-[#ffffff] font-mono opacity-90">Next.js 16 • React 19 • TS</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[#d8b4fe] font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">Backend</p>
                            <p className="text-sm text-[#ffffff] font-mono opacity-90">Python • FastAPI • Uvicorn</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[#d8b4fe] font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">Database</p>
                            <p className="text-sm text-[#ffffff] font-mono opacity-90">Firebase</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[#d8b4fe] font-mono text-[10px] uppercase tracking-widest mb-2 font-bold">AI Engine</p>
                            <p className="text-sm text-[#ffffff] font-mono opacity-90">Gemini 2.5 Flash</p>
                        </div>
                    </div>
                </div>
              </a>
          </motion.div>
        </div>
      </section>

      {/* FLOATING PREVIEW — Strictly over card */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-52 rounded-2xl overflow-hidden pointer-events-none z-[100] shadow-2xl border border-gray-900/10 dark:border-white/20"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.5 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <video 
          src="/preview.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </>
  );
}
