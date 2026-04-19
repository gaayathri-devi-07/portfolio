'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Check for touch device
    if ('ontouchstart' in window) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    const quickDotX = gsap.quickTo(dot, 'left', { duration: 0.15, ease: 'power2.out' })
    const quickDotY = gsap.quickTo(dot, 'top', { duration: 0.15, ease: 'power2.out' })
    const quickRingX = gsap.quickTo(ring, 'left', { duration: 0.4, ease: 'power2.out' })
    const quickRingY = gsap.quickTo(ring, 'top', { duration: 0.4, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      quickDotX(e.clientX - 4)
      quickDotY(e.clientY - 4)
      quickRingX(e.clientX - 20)
      quickRingY(e.clientY - 20)
    }

    const handleMouseEnterHoverable = () => {
      dot.style.width = '0px'
      dot.style.height = '0px'
      ring.style.width = '80px'
      ring.style.height = '80px'
      ring.style.margin = '-20px 0 0 -20px'
      ring.style.opacity = '0.3'
      ring.style.borderWidth = '2px'
    }

    const handleMouseLeaveHoverable = () => {
      dot.style.width = '8px'
      dot.style.height = '8px'
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.margin = '0'
      ring.style.opacity = '0.5'
      ring.style.borderWidth = '1.5px'
    }

    document.addEventListener('mousemove', handleMouseMove)

    // Attach hover listeners to interactive elements
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterHoverable)
      el.addEventListener('mouseleave', handleMouseLeaveHoverable)
    })

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterHoverable)
        el.removeEventListener('mouseleave', handleMouseLeaveHoverable)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
