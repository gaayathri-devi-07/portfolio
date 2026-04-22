"use client";

import { motion } from "framer-motion";

const CHRONIC = "Canela, Playfair Display, Georgia, serif";

export default function ContactSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#000000] text-[#ffffff] flex items-center justify-center rounded-t-[4rem] z-50 -mt-10 overflow-hidden transition-colors duration-500 px-8 md:px-24 lg:px-32 pt-32 pb-32">

      {/* Vertical Animated Line remains here */}
      <div className="absolute top-0 left-12 md:left-24 lg:left-32 w-[2px] h-full z-20 bg-gradient-to-b from-transparent via-purple-300 to-transparent animate-loading-v" />

      {/* Changed to items-center to float the content in the middle of the screen */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-center relative z-10">

        {/* Left Column - FINAL OFFSET REFINEMENT */}
        <div className="flex flex-col items-start justify-center !pl-[8vw]">
          {/* FONT CHANGED TO CHRONIC DISPLAY - Downscaled & Shifted Right */}
          <h2 className="text-4xl md:text-[5rem] lg:text-[6rem] font-['Chronic_Display'] leading-[0.9] tracking-tighter mb-6 text-[#ffffff] transition-colors">
            Want to <br />
            <span className="italic font-light text-gray-400">start</span> a new <br />
            project?
          </h2>
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-gray-400 italic"
            style={{ marginTop: '70px', marginLeft: '5%' }}
          >
            Or just say hello.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start lg:items-end justify-center gap-20 lg:pl-20 w-full mt-10 lg:mt-0 [transform:translateZ(40px)]">

          {/* Email with MOVED Animated Glow Line underneath - Downscaled */}
          <div className="group relative w-full lg:w-auto text-right">
            <a href="mailto:gaayi.exe@gmail.com" className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight text-[#ffffff] transition-colors pb-4 block">
              gaayi.exe@gmail.com
            </a>
            {/* Horizontal Glow Line relocated here - Now more Pastel */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/50 to-transparent animate-loading-h" />
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 font-mono text-base md:text-lg uppercase tracking-widest text-gray-400">
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

          {/* Footer replacing Journey Complete */}
          <div className="w-full flex justify-between items-end border-t border-gray-400/30 pt-8 mt-12">
            <span className="text-lg font-black tracking-[0.2em] uppercase text-[#ffffff]">LET'S CONNECT</span>
            <span className="text-xs md:text-sm font-mono text-gray-500">© 2026 Gaayathri Devi</span>
          </div>
        </div>
      </div>

    </section>
  );
}
