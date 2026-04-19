'use client'

import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { registerGSAPPlugins, ScrollTrigger, gsap } from '@/lib/gsap'

/**
 * Bridges Lenis's RAF loop with GSAP ScrollTrigger using gsap.ticker
 * so they share a single requestAnimationFrame — preventing the two
 * scroll systems from fighting each other and causing frame drops.
 */
function ScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    registerGSAPPlugins()
    if (!lenis) return

    // Tell GSAP ScrollTrigger to use Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both share ONE rAF loop
    const rafHandler = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(rafHandler)
    }
  }, [lenis])

  return null
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      autoRaf={false} // GSAP ticker drives the raf — disabling autoRaf prevents double-tick
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      }}
    >
      <ScrollTriggerBridge />
      {children as any}
    </ReactLenis>
  )
}
