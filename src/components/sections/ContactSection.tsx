"use client";

import { motion } from "framer-motion";

const CHRONIC = "Canela, Playfair Display, Georgia, serif";

export default function ContactSection() {
  return (
    <section 
      className="relative w-full min-h-screen bg-[#e5e4df] dark:bg-[#050505] text-gray-900 dark:text-white flex flex-col items-center justify-center px-8 md:px-[60px] py-[80px] z-50 overflow-hidden transition-colors duration-500"
      style={{ fontFamily: CHRONIC }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-32">
        
        {/* LEFT COLUMN: Master Typography Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start justify-center"
        >
          {/* Stacked Heading - Locked to 60px on Desktop */}
          <h2 className="text-4xl md:text-5xl lg:text-[60px] font-light leading-[0.9] tracking-tighter mb-4 text-gray-900 dark:text-white">
            Want to <br/>
            <span className="italic font-light text-gray-400">start</span> <br/>
            a new <br/>
            project?
          </h2>
          {/* Subtext - Aligned midway with 80px offset */}
          <p className="text-xl md:text-2xl lg:text-3xl tracking-tight ml-[40px] md:ml-[80px] text-gray-700 dark:text-gray-400 italic mt-8">
            Or just say hello.
          </p>
        </motion.div>

        {/* CENTER ELEMENT: Journey Complete Status */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.5 }}
           transition={{ duration: 1.5, delay: 0.5 }}
           viewport={{ once: true }}
           className="hidden lg:flex flex-col items-center gap-4"
        >
           <div className="text-[16px] tracking-[0.4em] uppercase font-mono text-gray-500 dark:text-white/40">
              Journey Complete
           </div>
           <div className="w-8 h-[1px] bg-gray-400 dark:bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
        </motion.div>

        {/* RIGHT COLUMN: Contact & Action Links */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start lg:items-end justify-start gap-12 w-full lg:w-auto"
        >
          
          {/* Live Email Link - Locked to 24px */}
          <div className="group relative">
            <a href="mailto:gaayi.exe@gmail.com" className="text-[20px] md:text-[22px] lg:text-[24px] tracking-tight text-gray-900 dark:text-white transition-opacity hover:opacity-70">
              gaayi.exe@gmail.com
            </a>
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gray-900 dark:bg-white origin-left scale-x-100 transition-transform duration-500 ease-out group-hover:scale-x-0" />
          </div>

          {/* Action Links Grid - Locked to 18px */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-6 lg:items-end font-mono text-[18px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <a href="https://www.linkedin.com/in/gaayathri-devi-g-038b54330/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span> 
              LinkedIn
            </a>
            <a href="https://github.com/gaayathri-devi-07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span> 
              GitHub
            </a>
            <a href="#" className="flex items-center gap-2 group hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span> 
              Resume
            </a>
          </div>

          {/* Bottom Copyright - Locked to 14/15px */}
          <div className="mt-16 text-[14px] lg:text-[15px] opacity-40 uppercase tracking-[0.3em] text-center lg:text-right w-full font-mono text-gray-900 dark:text-white">
            © 2026 Gaayathri Devi • Built with Precision
          </div>
        </motion.div>
      </div>
    </section>
  );
}
