"use client";

export default function EngineeringSection() {
  return (
    <section className="relative w-full pt-10 md:pt-16 pb-32 px-12 md:px-24 lg:px-32 bg-[#000000] transition-colors duration-500 overflow-hidden transform-gpu will-change-transform contain-paint">
      
      {/* Sleek Dark Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 z-10 flex flex-col items-center text-center">
        <div className="mb-20 space-y-6">
          <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-blue-400 tracking-[0.2em] uppercase shadow-sm">
            Systems Engineering
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#ffffff]">
            Technical Horsepower.
          </h2>
          <p className="text-gray-400 max-w-2xl text-xl font-light leading-relaxed mx-auto">
            Built for scale, engineered for FAANG standards. Demonstrating end-to-end command over modern architectures and heavy computational logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group shadow-2xl">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#ffffff] mb-4">High-Performance WebGL</h3>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Architectured the <strong className="text-[#ffffff] font-medium">&quot;Lucid Void&quot;</strong> project, pushing browser limits to render over <strong className="text-[#ffffff]">60,000+ physics particles</strong> flawlessly at a stable 60fps.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group shadow-2xl">
            <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#ffffff] mb-4">Product Architecture</h3>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Led system design and full-stack implementation for the <strong className="text-[#ffffff] font-medium">&quot;AI Study Planner&quot;</strong>. Organized complex relational databases and optimized API routing for seamless UX.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group shadow-2xl">
             <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2-2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#ffffff] mb-4">Algorithmic Efficiency</h3>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              Deep expertise in core data structures and complex algorithm optimization. Reducing computational complexity and memory allocation overhead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
