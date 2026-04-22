"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CERIF = "Canela, Playfair Display, Georgia, serif";

function SpiderReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".sr-word");
    gsap.from(words, {
      scrollTrigger: { 
        trigger: ref.current, 
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      },
      y: "100%",
      opacity: 0,
      rotate: 15,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.02,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center gap-x-4 gap-y-1 ${className ?? ""}`}
      style={{ fontFamily: CERIF }}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block">{w}</span>
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  // SCROLL-TRACKING 3D ROTATION
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // THE FIX: Forcibly clear hover state on scroll to prevent stuck previews
  useEffect(() => {
    const handleScroll = () => setIsHovered(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enters showing the back (-180), lays PERFECTLY FLAT to read in the center (0), flips to the back as it leaves (180). Total rotation = 360 degrees.
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, 180]);
  // Scales down slightly while flipping to add depth and prevent screen clipping, full size in the center
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <>
      <section 
        id="projects"
        ref={sectionRef}
        className="relative z-20 w-full min-h-screen bg-[#000000] pt-2 pb-24 md:pb-32 flex flex-col items-center overflow-hidden transform-gpu will-change-transform contain-paint px-12 md:px-24 lg:px-32" 
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          
          {/* TITLE WRAPPER — Spider Reveal with Massive Clearance */}
          <div className="relative z-20 text-center w-full mb-32 md:mb-48">
            <SpiderReveal
              text="MY PROJECTS"
              className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center relative z-20 w-full justify-center text-[#ffffff] opacity-80"
            />
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
                        
                        <p className="text-base md:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto mb-12">
                            While countless platforms teach coding, there is a massive gap in solutions that simulate the intense pressure of a real technical interview. Blackbox AI bridges this gap by providing an immersive, real-time mock interview environment tailored to specific target companies and difficulty levels. It is designed to give candidates firsthand experience, helping them conquer interview anxiety and perform with absolute confidence.
                        </p>
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
