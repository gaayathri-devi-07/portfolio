'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Pool of glyphs for the scramble effect — mix of Katakana, Latin, and symbols
 */
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const GLYPH_POOL = KATAKANA + LATIN + SYMBOLS

interface ScrambleTextProps {
  /** The initial text to display (e.g., Japanese characters) */
  fromText: string
  /** The final text to reveal (e.g., English translation) */
  toText: string
  /** Whether the scramble animation should trigger */
  trigger?: boolean
  /** Delay in seconds before the animation starts */
  delay?: number
  /** Total duration of the scramble in seconds */
  duration?: number
  /** Number of random cycles per character before locking */
  cyclesPerChar?: number
  /** Additional CSS class */
  className?: string
  /** Callback when scramble completes */
  onComplete?: () => void
}

export default function ScrambleText({
  fromText,
  toText,
  trigger = false,
  delay = 0,
  duration = 2.5,
  cyclesPerChar = 12,
  className = '',
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(fromText)
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const randomGlyph = useCallback(() => {
    return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)]
  }, [])

  useEffect(() => {
    if (!trigger || hasAnimated.current) return
    hasAnimated.current = true

    const maxLen = Math.max(fromText.length, toText.length)
    const progress = { value: 0 }

    gsap.to(progress, {
      value: 1,
      duration,
      delay,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = progress.value
        let result = ''

        for (let i = 0; i < maxLen; i++) {
          // Calculate if this character position has "locked in"
          const charProgress = (p * maxLen - i) / cyclesPerChar

          if (charProgress >= 1) {
            // Character is resolved — show final character
            result += toText[i] || ''
          } else if (charProgress > 0) {
            // Character is cycling through random glyphs
            result += randomGlyph()
          } else {
            // Character hasn't started yet — show original
            result += fromText[i] || randomGlyph()
          }
        }

        setDisplayText(result)
      },
      onComplete: () => {
        setDisplayText(toText)
        onComplete?.()
      },
    })
  }, [trigger, fromText, toText, duration, delay, cyclesPerChar, randomGlyph, onComplete])

  return (
    <span ref={containerRef} className={className} aria-label={toText}>
      {displayText}
    </span>
  )
}
