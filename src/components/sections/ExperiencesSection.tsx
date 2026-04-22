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
      className={`flex flex-wrap gap-x-2 gap-y-1 ${className ?? ""}`}
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
    certificateUrl: "/certificates/Respro.pdf",
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
      {/* Hover Wrapper (Moves slightly on hover) */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10%" }}
        className="relative w-[90vw] max-w-6xl mx-auto rounded-3xl p-[3px] group transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.01] shadow-[0_0_40px_rgba(219,39,119,0.3)] dark:shadow-[0_0_40px_rgba(251,207,232,0.15)]"
      >
        
        {/* The True Pastel Persistent Outer Glow (Softened & Adaptive) */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-400/40 via-transparent to-purple-400/40 dark:from-pink-200/40 dark:to-purple-200/40 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* The Sharp Pastel Gradient Border (Adaptive) */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-400/30 dark:from-pink-200/30 dark:to-purple-200/30 rounded-3xl z-0" />

        {/* The Solid Inner Card (Full Beige / White Glass) */}
        <div className="relative z-10 w-full min-h-[70vh] bg-white/60 dark:bg-black/95 backdrop-blur-xl rounded-[calc(1.5rem-3px)] flex flex-col px-8 md:px-16 lg:px-24 py-16 justify-center items-center text-center shadow-xl transition-colors duration-500">
            
            {/* Company Title (Adaptive) */}
            <h3 className="w-full text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 text-gray-900 dark:text-white">
              {exp.company}
            </h3>
            
            {/* Role (Adaptive Saturated Pastels) */}
            <p className="text-pink-600 dark:text-pink-100 font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-8">
              {exp.role}
            </p>

            {/* Description (Editorial Reduced) */}
            <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-10">
              {exp.desc}
            </p>

            {/* Verification Link */}
            {exp.certificateUrl && (
               <div className="mt-auto pt-8 flex justify-center w-full">
                  <a 
                    href={exp.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-pink-600 dark:text-pink-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
                  >
                    View {exp.company} Certificate 
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </a>
               </div>
            )}
        </div>

      </motion.div>
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
    <section ref={containerRef} className="relative w-full bg-[var(--bg)] pt-[25vh] pb-[100vh]" style={{ fontFamily: CERIF }}>
      
      {/* STICKY TIMELINE (Scoped to section) */}
      <div className="absolute left-4 md:left-12 top-0 h-full w-[2px] z-[100] hidden md:flex flex-col items-center">
        <div className="sticky top-1/2 -translate-y-1/2 h-[60vh] w-full bg-black/5 dark:bg-white/5 flex flex-col items-center">
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
                  className="text-gray-900 dark:text-white font-mono text-[10px] whitespace-nowrap tracking-widest uppercase"
                >
                  {exp.date}
                </motion.div>
              ))}
            </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        
        {/* SECTION TITLE — Global Title Uniformity */}
        <SpiderReveal 
          text="MY EXPERIENCES"
          className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-[15vh] text-center text-gray-900 dark:text-white opacity-80"
        />

        {/* CARD CONTAINER — Perfectly Centered 90% Width */}
        <div className="relative flex flex-col w-full mx-auto">
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
    </section>
  );
}



