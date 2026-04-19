'use client'

import { useRef, useState, useCallback } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  color: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  tags,
  color,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: y * -15, y: x * 15 })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card group relative rounded-2xl overflow-hidden"
      style={{
        perspective: '1000px',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <div
        className="relative p-8 sm:p-10 rounded-2xl transition-all duration-500 ease-out h-full"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          border: `1px solid ${color}20`,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          boxShadow: isHovered
            ? `0 20px 60px ${color}20, 0 0 0 1px ${color}30`
            : `0 4px 20px rgba(0,0,0,0.05)`,
          transition: 'transform 0.3s ease-out, box-shadow 0.5s ease',
        }}
      >
        {/* Card number */}
        <span
          className="absolute top-6 right-8 font-mono text-6xl sm:text-7xl font-bold transition-opacity duration-500"
          style={{
            color: color,
            opacity: isHovered ? 0.15 : 0.06,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full min-h-[280px] justify-between">
          <div>
            <h3
              className="font-display text-2xl sm:text-3xl font-bold mb-4 transition-transform duration-500 group-hover:translate-x-2"
              style={{ color: 'var(--fg)' }}
            >
              {title}
            </h3>
            <p
              className="text-base leading-relaxed max-w-md transition-transform duration-500 group-hover:translate-x-1"
              style={{ color: 'var(--muted)' }}
            >
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300"
                style={{
                  background: `${color}12`,
                  color: color,
                  border: `1px solid ${color}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          <div
            className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: `${color}15`,
              transform: isHovered ? 'translateX(4px) scale(1.1)' : 'translateX(0) scale(1)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ color }}
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Hover shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${color}08 50%, transparent 60%)`,
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.8s ease, opacity 0.7s ease',
          }}
        />
      </div>
    </div>
  )
}
