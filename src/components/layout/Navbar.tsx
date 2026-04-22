'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAudio } from '@/components/providers/AudioProvider'
import { gsap } from '@/lib/gsap'
import Magnetic from '@/components/ui/Magnetic'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isPlaying, toggleAudio } = useAudio()
  const navRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100
      // Always show if at top, otherwise follow the 'hidden' state from mousemove
      if (isTop) {
        setHidden(false)
      } else {
        // If we just scrolled down past 100px and were not hovering, hide it
        setHidden(true)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const isTop = window.scrollY < 100
      // If we are at the top, we don't need hover logic to show it
      if (isTop) {
        setHidden(false)
        return
      }

      // Reveal if mouse is near top (within 80px) after scrolling
      if (e.clientY < 80) {
        setHidden(false)
      } else if (e.clientY > 140) { // Hide if mouse moves away significantly
        setHidden(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: hidden ? -120 : 0, 
        opacity: hidden ? 0 : 1,
        duration: 0.5,
        ease: 'expo.out',
      })
    }
  }, [hidden])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* INVISIBLE TRIGGER ZONE */}
      <div 
        className="fixed top-0 left-0 right-0 h-4 z-[101]"
        onMouseEnter={() => setHidden(false)}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] bg-[#000000]/90 backdrop-blur-xl border-b border-white/5 transition-all shadow-2xl flex items-center justify-between px-8 md:px-12 py-4"
      >
        {/* Logo / Name — Fixed Left */}
        <div className="flex-1 flex justify-start z-10">
          <Magnetic>
            <a
              href="#"
              className="font-display text-lg font-bold tracking-tight inline-block"
              style={{ color: 'var(--fg)' }}
              data-cursor-hover
            >
              <span className="text-pink-200">GD</span>
              <span className="hidden sm:inline ml-2 text-sm font-normal" style={{ color: 'var(--muted)' }}>
                / Gaayathri Devi
              </span>
            </a>
          </Magnetic>
        </div>

        {/* NAV LINKS — Absolute Center */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Magnetic>
                  <a 
                    href={link.href}
                    className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 hover:text-pink-200 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        {/* SOUND OPTION — Fixed Right */}
        <div className="flex-1 flex justify-end z-10">
          <Magnetic>
            <button
              onClick={toggleAudio}
              data-cursor-hover
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--surface)',
                color: 'var(--fg)',
              }}
              aria-label={isPlaying ? 'Mute audio' : 'Play ambient audio'}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>
          </Magnetic>
        </div>
      </nav>
    </>
  )
}

