'use client'

import { useEffect, useRef } from 'react'

const STRINGS = [
  "A FULL-STACK ARCHITECT",
  "BUILDING INTELLIGENT SYSTEMS",
  "AI x FULL-STACK DEVELOPER",
]

const TYPE_MS = 45
const HOLD_MS = 1800
const ERASE_MS = 25

export default function TypewriterSubheading() {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!textRef.current) return

    let index = 0
    let charIndex = 0
    let erasing = false

    function tick() {
      const node = textRef.current
      if (!node) return
      const str = STRINGS[index]

      if (!erasing) {
        charIndex++
        node.textContent = str.substring(0, charIndex)
        if (charIndex === str.length) {
          erasing = true
          rafRef.current = setTimeout(tick, HOLD_MS)
          return
        }
        rafRef.current = setTimeout(tick, TYPE_MS)
      } else {
        charIndex--
        node.textContent = str.substring(0, charIndex)
        if (charIndex === 0) {
          erasing = false
          index = (index + 1) % STRINGS.length
        }
        rafRef.current = setTimeout(tick, ERASE_MS)
      }
    }

    rafRef.current = setTimeout(tick, 600)

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current)
    }
  }, [])

  return (
    <span className="inline-flex items-baseline gap-0">
      <span ref={textRef} />
      <span
        ref={cursorRef}
        className="inline-block font-light text-[#ffffff]/70"
        style={{ animation: 'blink-cursor 500ms step-end infinite' }}
      >
        |
      </span>
    </span>
  )
}
