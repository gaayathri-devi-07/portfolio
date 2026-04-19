'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGSAPPlugins } from '@/lib/gsap'

export default function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const baseContentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    registerGSAPPlugins()
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Base About Me Content Entrance
      gsap.fromTo(
        baseContentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      // 2. The Pop-Up Slide Card (Parallax)
      if (cardRef.current) {
        // Pin the section so we can scroll "within" it
        gsap.to(cardRef.current, {
          y: '-15%', // Slides up to cover the bottom part
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            end: '+=100%',
            pin: true,
            scrub: 1,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* THE BASE PAGE: ABOUT ME */}
      <div 
        ref={baseContentRef}
        className="container mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-48 lg:pt-40 lg:pb-64"
      >
        <span
          className="font-mono text-[10px] tracking-[0.35em] uppercase block mb-4"
          style={{ color: 'var(--accent)' }}
        >
          About Me
        </span>
        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8"
          style={{ color: 'var(--fg)' }}
        >
          Engineering the <br /> 
          <span style={{ color: 'var(--muted)' }}>intersection of design & logic.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-7">
            <p className="text-lg sm:text-xl leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              I am a Staff-Level UI/UX Frontend Architect and Full-Stack Engineer with a relentless focus on creating immersive, high-performance web experiences. 
              My expertise lies in blending robust system architecture with pixel-perfect, cinematic frontends.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
              From distributed cloud backend systems to beautiful, 60fps WebGL interfaces, I believe in shipping products that don't just function correctly, but feel alive.
            </p>
          </div>
          <div className="md:col-span-5 flex items-start">
            {/* Minimalist Profile/Photo Placeholder */}
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden glass relative flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Photo</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 dark:from-white/5 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* THE POP-UP SLIDE CARD (Projects & Internship) */}
      <div 
        ref={cardRef}
        className="absolute bottom-0 left-0 right-0 w-full z-20 translate-y-[100%] scale-[0.95]"
        style={{ willChange: 'transform' }}
      >
        <div className="container mx-auto px-4 md:px-12 lg:px-20 pb-12">
          <div className="bg-neutral-900/5 dark:bg-white/5 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient Inner Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px] opacity-10 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              
              {/* Left Side: AI Interview Project */}
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--muted)' }}>
                  Featured Project
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
                  AI Interview App
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  A sophisticated platform orchestrating an adaptive LLM interviewer. It scales dynamic questioning and difficulty based on real-time candidate transcript analysis.
                </p>
                <div className="space-y-4">
                  <div className="glass p-4 rounded-xl border border-neutral-200 dark:border-white/5">
                    <h4 className="font-display text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>Firebase Architecture</h4>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Complex session states & multi-provider auth flows ensuring zero data loss during active interviews.</p>
                  </div>
                  <div className="glass p-4 rounded-xl border border-neutral-200 dark:border-white/5">
                    <h4 className="font-display text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>AI Transcript Pipeline</h4>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Real-time stream processing mapping conversational velocity to strict FAANG evaluation vectors.</p>
                  </div>
                </div>
              </div>

              {/* Right Side: MMsr Internship */}
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--muted)' }}>
                  Experience & Achievement
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
                  Mmsr Internship
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Executed critical development iterations on a core enterprise product, optimizing database queries and deploying highly resilient microservices.
                </p>
                <div className="glass p-6 rounded-2xl border border-[var(--accent)]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h4 className="font-display text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                    Best Performer Award
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Officially recognized for exceptional architectural velocity and delivering a massive refactor that reduced CI/CD deployment times by 40%.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
