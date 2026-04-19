'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAudio } from '@/components/providers/AudioProvider'
import { gsap } from '@/lib/gsap'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isPlaying, toggleAudio } = useAudio()
  const navRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
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
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight"
          style={{ color: 'var(--fg)' }}
          data-cursor-hover
        >
          <span className="text-gradient">GD</span>
          <span className="hidden sm:inline ml-2 text-sm font-normal" style={{ color: 'var(--muted)' }}>
            / Gaayathri Devi
          </span>
        </a>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
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

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            data-cursor-hover
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'var(--surface)',
              color: 'var(--fg)',
            }}
            aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Toggle theme'}
          >
            {mounted && theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : mounted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : null}
          </button>
        </div>
      </div>
    </nav>
  )
}
