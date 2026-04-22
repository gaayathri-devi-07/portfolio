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
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: hidden ? -100 : 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [hidden])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] glass"
      style={{
        padding: '16px 32px',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
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

        {/* ISOLATED & PINNED SOUND BUTTON */}
        <div className="fixed top-2 right-4 md:top-4 md:right-8 z-[100] flex items-center justify-center">
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
      </div>
    </nav>
  )
}

