"use client";

export default function GrainOverlay() {
  return (
    <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.04] mix-blend-soft-light">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <style jsx>{`
        div {
          background-size: 100px 100px;
          animation: noise 0.2s infinite;
        }

        @keyframes noise {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-1px, -1px) }
          20% { transform: translate(-2px, 1px) }
          30% { transform: translate(1px, -2px) }
          40% { transform: translate(-1px, 2px) }
          50% { transform: translate(-2px, -1px) }
          60% { transform: translate(2px, 1px) }
          70% { transform: translate(1px, 1px) }
          80% { transform: translate(-1px, -2px) }
          90% { transform: translate(2px, -2px) }
        }
      `}</style>
    </div>
  );
}
