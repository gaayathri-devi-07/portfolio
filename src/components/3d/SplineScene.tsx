'use client'

import dynamic from 'next/dynamic'
import { useRef, useCallback, useEffect, type ComponentProps } from 'react'

if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    // Join all arguments to properly evaluate in case ThreeJS splits the WebGL log across multiple args
    const msg = args.map(arg => String(arg)).join(' '); 
    if (msg.includes('THREE.WebGLProgram') || msg.includes('forcing loop to unroll') || msg.includes('X3557')) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// next/dynamic with ssr:false prevents Three.js from running server-side
// which was causing the render-blocking bottleneck
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineLoader />,
})

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (splineApp: any) => void
}

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Minimal concentric ring spinner */}
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border border-transparent"
            style={{
              borderTopColor: 'var(--accent)',
              animation: 'spline-spin 1.2s cubic-bezier(0.5,0,0.5,1) infinite',
            }}
          />
          <div
            className="absolute inset-[4px] rounded-full border border-transparent"
            style={{
              borderTopColor: 'var(--muted)',
              opacity: 0.4,
              animation: 'spline-spin 1.8s cubic-bezier(0.5,0,0.5,1) infinite reverse',
            }}
          />
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--muted)', opacity: 0.6 }}
        >
          Initialising
        </span>
      </div>
      <style>{`
        @keyframes spline-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function SplineScene({ scene, className = '', onLoad }: SplineSceneProps) {
  const splineRef = useRef<any>(null)

  const handleLoad = useCallback(
    (splineApp: any) => {
      splineRef.current = splineApp
      onLoad?.(splineApp)
    },
    [onLoad]
  )

  return (
    <div className={`spline-container w-full h-full ${className}`}>
      <Spline scene={scene} onLoad={handleLoad} />
    </div>
  )
}
