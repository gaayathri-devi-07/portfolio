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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      quickX.current?.(deltaX * strength)
      quickY.current?.(deltaY * strength)
      if (rotate) {
        quickRotate.current?.(deltaX * 5)
      }
    }

    const handleMouseLeave = () => {
      quickX.current?.(0)
      quickY.current?.(0)
      if (rotate) {
        quickRotate.current?.(0)
      }
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, rotate])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
