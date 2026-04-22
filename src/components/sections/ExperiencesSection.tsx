"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      },
      y: "100%",
      rotate: 15,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className ?? ""}`}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <span className="sr-word inline-block">{w}</span>
        </span>
      ))}
    </div>
  );
}

const experiences = [
  {
    company: "ResPro Labs",
    role: "Frontend Developer Intern",
    date: "2025",
    desc: "Engineered scalable relational database structures and optimized SQL query performance for internal platforms. Designed efficient table relationships to streamline data management, significantly improving retrieval latency and ensuring robust backend data integrity.",
    award: null,
    certificateUrl: "/certificates/respro.pdf",
  },
  {
    company: "Missile Man Scientific & Research Publications (MMSR)",
    role: "Data Analyst Intern",
    date: "DEC 2025 - JAN 2026",
    desc: "Spearheaded the end-to-end creation and curation of foundational company datasets, driving complex parsing workflows to deliver critical analytical intelligence. Designed robust reporting frameworks, resulting in being exclusively awarded the 'Best Performer Award' for exceptional analytical accuracy and operational dedication.",
    award: "Best Performer Award",
    certificateUrl: "/certificates/mmsr.pdf",
  },
  {
    company: "Skillentrix Technologies Pvt Ltd",
    role: "Python & Machine Learning Intern",
    date: "MAR 2026 - JUN 2026",
    desc: "Architecting and deploying production-ready Machine Learning models using Python. Developing scalable, industry-standard AI solutions focused on practical real-world applications, bridging the gap between theoretical algorithms and high-impact enterprise software.",
    award: null,
    certificateUrl: "/certificates/skillentrix.pdf",
  },
];

function ExperienceCard({ exp, index, setActiveDate }: { exp: any, index: number, setActiveDate: (date: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 }); // Highlighting when card is 50% visible

  useEffect(() => {
    if (isInView) {
      setActiveDate(exp.date);
    }
  }, [isInView, exp.date, setActiveDate]);

  return (
    <motion.div 
      ref={ref} 
      className="sticky w-full flex justify-center items-center mb-[20vh] z-10"
      style={{ top: `calc(15vh + ${index * 40}px)` }}
    >
      {/* THE REDIRECT WRAPPER */}
      <a 
        href={exp.certificateUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full no-underline cursor-pointer"
      >
        {/* Hover Wrapper (Moves slightly on hover) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.03, 
            y: -5,
            transition: { type: "spring", stiffness: 400, damping: 10 } 
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          className="relative w-full mx-auto rounded-3xl p-[3px] group shadow-[0_0_40px_rgba(251,207,232,0.15)]"
        >
          
          {/* The True Pastel Persistent Outer Glow (Softened & Static) */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-200/40 to-purple-200/40 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* The Sharp Pastel Gradient Border (Static) */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-200/30 to-purple-200/30 rounded-3xl z-0" />

          {/* The Solid Inner Card (Permanently Midnight) */}
          <div className="relative z-10 w-full min-h-[70vh] bg-[#050505] backdrop-blur-xl rounded-[calc(1.5rem-3px)] flex flex-col px-8 md:px-16 lg:px-24 py-16 justify-center items-center text-center shadow-xl border border-white/5 transition-all duration-500">
              
              {/* Link Icon Overlay */}
              <div className="absolute top-8 right-8 text-pink-200 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Company Title (Hardcoded White) */}
              <h3 className="w-full text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 text-[#ffffff] group-hover:text-pink-300 transition-colors">
                {exp.company}
              </h3>
              
              {/* Role (Hardcoded Pastel) */}
              <p className="text-pink-100 font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-8">
                {exp.role}
              </p>

              {/* Description (Hardcoded Muted) */}
              <p className="text-sm md:text-base leading-relaxed text-gray-400 max-w-4xl mx-auto mb-10">
                {exp.desc}
              </p>

              {/* Verification Label */}
              <span className="mt-6 inline-block text-[10px] font-bold text-pink-300 uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                Click anywhere to view certificate →
              </span>
          </div>

        </motion.div>
      </a>
    </motion.div>
  );
}

export default function ExperiencesSection() {
  const [activeDate, setActiveDate] = useState(experiences[0].date);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative z-30 w-full bg-[#000000] pt-2 pb-24 px-12 md:px-24 lg:px-32 transition-colors duration-500 transform-gpu will-change-transform contain-paint" style={{ fontFamily: CERIF, clipPath: 'inset(0)' }}>
      
      {/* THE UNIFIED MASTER CONTAINER: Centered and responsive */}
      <div className="relative w-full max-w-[1400px] mx-auto flex gap-4 md:gap-12">
        
        {/* COLUMN 1: STICKY TIMELINE (Now integrated into the grid for stability) */}
        <div className="relative w-8 md:w-16 shrink-0 hidden md:block">
          <div className="absolute left-4 md:left-8 top-0 h-full w-[2px] z-[100] flex flex-col items-center">
            <div className="sticky top-1/2 -translate-y-1/2 h-[60vh] w-full bg-white/5 flex flex-col items-center">
                {/* Fill Line */}
                <motion.div 
                  style={{ height: scrollHeight }}
                  className="absolute top-0 w-full bg-pink-200 shadow-[0_0_15px_rgba(251,207,232,0.5)]"
                />
                
                {/* Date Labels */}
                <div className="absolute top-0 left-6 h-full flex flex-col justify-between py-4">
                  {experiences.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ 
                        opacity: activeDate === exp.date ? 1 : 0.3,
                        x: activeDate === exp.date ? 10 : 0
                      }}
                      className="text-[#ffffff] font-mono text-[10px] whitespace-nowrap tracking-widest uppercase"
                    >
                      {exp.date}
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: SECTION CONTENT (Centered relative to the timeline unit) */}
        <div className="flex-1 flex flex-col items-center">
          {/* TITLE WRAPPER — Spider Reveal with Massive Clearance */}
          <div className="relative z-20 text-center w-full mb-32 md:mb-48">
            <SpiderReveal 
              text="MY EXPERIENCES"
              className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center text-[#ffffff] opacity-80"
            />
          </div>

          {/* CARD CONTAINER — Perfectly centered within its flex column */}
          <div className="relative flex flex-col w-full max-w-[1100px] gap-16">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={index} 
                exp={exp} 
                index={index} 
                setActiveDate={setActiveDate} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



