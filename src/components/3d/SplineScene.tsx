"use client";

import dynamic from 'next/dynamic'
import { useEffect, useRef, useCallback, type MutableRefObject } from 'react'

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = args.map(arg => String(arg)).join(' '); 
    if (
      msg.includes('THREE.WebGLProgram') || 
      msg.includes('forcing loop to unroll') || 
      msg.includes('X3557') || 
      msg.includes('non-static position') ||
      msg.includes('scroll offset') ||
      msg.includes('THREE.Clock: This module has been deprecated') ||
      msg.includes('Multiple instances of Three.js being imported')
    ) {
      return;
    }
    originalWarn.apply(console, args as unknown[]);
  };
}

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

interface SplineSceneProps {
  scene: string
  className?: string
  renderOnDemand?: boolean
  onLoad?: (splineApp: unknown) => void
  appRef?: MutableRefObject<unknown | null>
}

export default function SplineScene({ scene, className = '', renderOnDemand = true, onLoad, appRef }: SplineSceneProps) {
  const splineRef = useRef<unknown>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // MutationObserver that nukes any Spline watermark elements the second
  // they appear in the DOM. Runs once and self-disconnects.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const killWatermark = () => {
      const selectors = [
        'a[href*="spline.design"]',
        '#logo',
        '.spline-watermark',
        '[class*="spline-watermark"]',
        'div:has(> a[href*="spline.design"])',
      ]
      selectors.forEach((sel) => {
        try {
          container.querySelectorAll(sel).forEach((el) => {
            const parent = el.parentElement
            if (parent && parent !== container) {
              parent.style.display = 'none'
              parent.style.opacity = '0'
              parent.style.visibility = 'hidden'
              parent.style.pointerEvents = 'none'
            }
            if (el instanceof HTMLElement) {
              el.style.display = 'none'
              el.style.opacity = '0'
              el.style.visibility = 'hidden'
              el.style.pointerEvents = 'none'
            }
          })
        } catch {
          // best-effort
        }
      })
    }

    killWatermark()

    const observer = new MutationObserver(() => {
      killWatermark()
    })

    observer.observe(container, { childList: true, subtree: true })

    // Also watch document.body for stray watermarks
    const docObserver = new MutationObserver(() => {
      killWatermark()
    })
    docObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      docObserver.disconnect()
    }
  }, [])

  const handleLoad = useCallback(
    (splineApp: unknown) => {
      splineRef.current = splineApp
      if (appRef) appRef.current = splineApp

      try {
        const renderer = (splineApp as Record<string, unknown>)?.renderer as
          | { setPixelRatio?: (r: number) => void }
          | undefined
        renderer?.setPixelRatio?.(Math.min(window.devicePixelRatio, 1.2))
      } catch {
        // Swallow
      }

      onLoad?.(splineApp)
    },
    [onLoad, appRef]
  )

  return (
    <div
      ref={containerRef}
      className={`spline-container relative w-full h-full ${className}`}
      style={{ position: 'relative', pointerEvents: 'none', touchAction: 'pan-y' }}
    >
      <Spline scene={scene} onLoad={handleLoad} renderOnDemand={renderOnDemand} />

      {/* Spline logo watermark mask — pitch-black overlay with !important
          dimensions that physically covers the built-in watermark at the
          bottom-right corner on every screen size. */}
      <div
        aria-hidden="true"
        className="spline-logo-mask"
      />
    </div>
  )
}
