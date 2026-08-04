'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticTextProps {
  children: ReactNode
  className?: string
  /** Strength of the magnetic pull (pixels) */
  strength?: number
  /** Whether to apply a slight rotation on hover */
  rotate?: boolean
}

export default function MagneticText({
  children,
  className = '',
  strength = 25,
  rotate = false,
}: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)
  const quickRotate = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    quickX.current = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    quickY.current = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    if (rotate) {
      quickRotate.current = gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3.out' })
    }

    // ─── Cached rect — eliminates getBoundingClientRect() from the hot path ───
    // Calling getBoundingClientRect inside mousemove triggers a synchronous
    // layout reflow on every event. We cache it once and refresh on resize.
    let cachedRect = el.getBoundingClientRect()
    const resizeObserver = new ResizeObserver(() => {
      cachedRect = el.getBoundingClientRect()
    })
    resizeObserver.observe(el)

    // ─── rAF-gated mousemove — prevents event accumulation ────────────────────
    let rafId: number | null = null
    let latestClientX = 0
    let latestClientY = 0

    const applyMagnetic = () => {
      rafId = null
      const deltaX = (latestClientX - (cachedRect.left + cachedRect.width / 2)) / cachedRect.width
      const deltaY = (latestClientY - (cachedRect.top + cachedRect.height / 2)) / cachedRect.height

      quickX.current?.(deltaX * strength)
      quickY.current?.(deltaY * strength)
      if (rotate) {
        quickRotate.current?.(deltaX * 5)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      latestClientX = e.clientX
      latestClientY = e.clientY
      if (rafId === null) {
        rafId = requestAnimationFrame(applyMagnetic)
      }
    }

    const handleMouseLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      quickX.current?.(0)
      quickY.current?.(0)
      if (rotate) {
        quickRotate.current?.(0)
      }
    }

    // passive: true — guaranteed no scroll blocking
    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [strength, rotate])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
