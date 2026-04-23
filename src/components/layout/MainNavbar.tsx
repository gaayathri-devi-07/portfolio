'use client'

import { useAudio } from '@/components/providers/AudioProvider'

export default function MainNavbar() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <header className="fixed top-0 left-0 w-full z-[9990] pointer-events-none border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-[1920px] items-center justify-center px-2 sm:px-4">
        <div className="absolute left-0 pointer-events-auto flex items-center gap-0.5 font-display">
          <span className="text-[1.2rem] leading-none font-bold tracking-tight text-[#f9a8d4]">GD</span>
          <span className="text-[1.2rem] leading-none font-bold tracking-tight text-white">/</span>
          <span className="ml-1 text-[0.95rem] leading-none font-normal tracking-tight text-[#9ca3af]">Gaayathri Devi</span>
        </div>

        <nav className="pointer-events-auto hidden md:block">
          <ul className="m-0 flex items-center gap-10 p-0 lg:gap-14">
            {['Home', 'About', 'Projects', 'Internships', 'Skills', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  data-cursor-hover={true}
                  className="block px-3 py-2 font-mono text-[11px] tracking-[0.48em] uppercase text-[#d1d5db] transition-colors duration-300 hover:text-[#FFB6C1]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute right-0 pointer-events-auto flex items-center">
          <button
            onClick={toggleAudio}
            data-cursor-hover={true}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors hover:text-[#FFB6C1]"
            aria-label={isPlaying ? 'Mute audio' : 'Play ambient audio'}
          >
            {isPlaying ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
