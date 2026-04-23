"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, 
  SiThreedotjs, SiFramer, SiGreensock, SiPython, 
  SiFastapi, SiMysql, SiFirebase, 
  SiEslint, SiRadixui, SiGooglegemini 
} from "react-icons/si";

const CHRONIC = "Canela, Playfair Display, Georgia, serif";

const skillCategories = [
  {
    title: "Frontend",
    description: "Building scalable, high-performance web architectures.",
    techs: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    title: "Motion & UI",
    description: "Crafting fluid animations and 3D web experiences.",
    techs: [
      { name: "Three.js", icon: SiThreedotjs },
      { name: "Framer Motion", icon: SiFramer },
      { name: "GSAP", icon: SiGreensock },
      { name: "Spline", icon: SiThreedotjs }, // Using Three.js icon as proxy
      { name: "Lenis", icon: SiReact }, // Using React icon as proxy
    ],
  },
  {
    title: "Backend & AI",
    description: "Architecting robust servers and intelligent systems.",
    techs: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Gemini AI", icon: SiGooglegemini },
    ],
  },
  {
    title: "Database & Auth",
    description: "Ensuring secure data management and authentication.",
    techs: [
      { name: "SQL", icon: SiMysql }, 
      { name: "Firebase", icon: SiFirebase },
    ],
  }
];

function SpiderReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".sr-word");
    gsap.from(words, {
      scrollTrigger: { 
        trigger: ref.current, 
        start: "top 95%",
        toggleActions: "play reverse play reverse"
      },
      y: "100%", rotate: 15, opacity: 0,
      duration: 1.5, ease: "expo.out", stagger: 0.1,
    });
  }, []);
  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-x-4 gap-y-1 ${className ?? ""}`} style={{ fontFamily: CHRONIC }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block">{w}</span>
        </span>
      ))}
    </div>
  );
}

export default function TechStackSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillCategories.length);
    }, 1000); // Rapid, high-speed motor
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* THE INVISIBLE WALL: Reduced spacing to pull section higher */}
      <div className="w-full h-[20vh] pointer-events-none" />

      <section
        id="skills"
        ref={sectionRef}
        className="relative z-40 w-full min-h-[130vh] flex flex-col items-center pt-0 pb-[80vh] transition-colors duration-500 overflow-hidden bg-[#000000] transform-gpu will-change-transform"
      >
        {/* 2. The Title Wrapper - Brute force negative margin for absolute peak placement */}
        <div className="relative z-50 text-center w-full mb-40 md:mb-52 -mt-56">
          <SpiderReveal
            text="SKILLS"
            className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center text-[#ffffff] opacity-90"
          />
        </div>

        {/* 3. The 3D Rotating Stack: Calibrated height lift */}
        <div className="relative w-full max-w-[1400px] mx-auto flex-1 flex justify-center items-center px-4 transform-gpu translate-y-32 z-10 [perspective:1200px]">
            {/* HYBRID STAGE: Dark backdrop to preserve 3D lighting in Light Mode */}
            <div className="absolute inset-x-[-10vw] inset-y-[-5vh] bg-black/10 dark:bg-transparent rounded-full blur-3xl pointer-events-none" />
            
            {/* THE ROTATING SLIDER (Coverflow) */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {skillCategories.map((category, index) => {
                const isActive = index === activeIndex;
                
                // THE 360 ORBIT MATH
                const totalCards = skillCategories.length;
                let offset = index - activeIndex;
                if (offset < -Math.floor(totalCards / 2)) offset += totalCards;
                if (offset > Math.floor(totalCards / 2)) offset -= totalCards;

                const radius = 400; // Increased distance for a more pronounced circle
                const angle = offset * (360 / totalCards); // Angle in degrees
                const angleRad = angle * (Math.PI / 180); // Convert to radians
                
                // Calculate X and Z positions on the circle
                const x = Math.sin(angleRad) * radius;
                const z = Math.cos(angleRad) * radius - radius;

                return (
                  <motion.div
                    key={category.title}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      x: x,
                      z: z,
                      rotateY: angle,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.7, // All cards visible during rotation
                      zIndex: isActive ? 30 : 10,
                    }}
                    transition={{ 
                      type: "tween", 
                      ease: [0.25, 0.1, 0.25, 1], // Premium custom bezier curve for ultra-smooth gliding
                      duration: 0.8 
                    }}
                    className="absolute w-[300px] md:w-[350px] h-[480px] bg-[#0a0a0a]/80 backdrop-blur-3xl border-[2px] border-white/5 rounded-[2rem] p-8 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    style={{
                      fontFamily: CHRONIC,
                    }}
                  >
                    {/* TOP SECTION: Pastel Title & Definition */}
                    <div className="flex flex-col items-center gap-3 mb-6">
                      <h3 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-pink-200 to-purple-300 text-center uppercase">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-[11px] md:text-xs text-center font-mono leading-relaxed px-2">
                        {category.description}
                      </p>
                      {/* Subtle divider line */}
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-300/50 to-transparent mt-2" />
                    </div>
                    
                    {/* MIDDLE/BOTTOM SECTION: Perfectly Centered Logos Filling the Void */}
                    <div className="flex-grow flex items-center justify-center w-full">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 w-full place-items-center">
                        {category.techs.map((tech) => (
                          <div 
                            key={tech.name} 
                            className="flex flex-col items-center gap-3 w-full group"
                          >
                            {/* Glass Icon Container */}
                            <div 
                              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-purple-500/20 group-hover:border-pink-300/50 transition-all duration-300"
                              data-cursor-hover
                            >
                              <tech.icon className="text-4xl text-pink-200 drop-shadow-[0_0_12px_rgba(251,207,232,0.4)] group-hover:text-purple-300 transition-all duration-300" />
                            </div>
                            <span className="text-[10px] text-pink-100/70 font-mono text-center tracking-widest uppercase group-hover:text-purple-200 transition-colors duration-300">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
        </div>

        {/* Global Ambient Depth Overlay */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(251,207,232,0.1) 0%, transparent 70%)",
            opacity: 0.1,
          }}
        />

        {/* THE HARD SPACER: This guarantees a massive gap before the Contact page starts */}
        <div className="w-full h-[15vh] md:h-[25vh] lg:h-[30vh] shrink-0 pointer-events-none" aria-hidden="true" />
      </section>
    </>
  );
}
