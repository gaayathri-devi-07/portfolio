'use client'

import dynamic from 'next/dynamic'
import { useRef, useCallback } from 'react'

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

// next/dynamic with ssr:false prevents Three.js from running server-side
// which was causing the render-blocking bottleneck
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineLoader />,
})

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (splineApp: unknown) => void
}

function SplineLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#000000]">
      <div className="w-16 h-16 rounded-full border-t-2 border-purple-500 animate-spin" />
      <span className="mt-4 text-xs font-mono text-purple-500/50 tracking-widest uppercase animate-pulse">
        Initializing 3D Environment...
      </span>
    </div>
  )
}

export default function SplineScene({ scene, className = '', onLoad }: SplineSceneProps) {
  const splineRef = useRef<unknown>(null)

  const handleLoad = useCallback(
    (splineApp: unknown) => {
      splineRef.current = splineApp
      onLoad?.(splineApp)
    },
    [onLoad]
  )

  return (
    <div 
      className={`spline-container relative w-full h-full ${className}`}
      style={{ position: 'relative' }}
    >
      <Spline scene={scene} onLoad={handleLoad} />
    </div>
  )
}
