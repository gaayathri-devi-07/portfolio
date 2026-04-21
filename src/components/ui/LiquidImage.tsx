"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useId } from "react";

interface LiquidImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LiquidImage({ src, alt, className }: LiquidImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });
  
  const filterId = useId();
  const id = filterId.replace(/:/g, "-"); // Ensure ID is safe for CSS selectors if needed

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const scale = useTransform(mouseX, [-0.5, 0.5], [1.05, 1]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        perspective: 1000,
      }}
    >
      <svg className="hidden">
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={isHovered ? "0.015" : "0"}
            numOctaves="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values={isHovered ? "0.015;0.02;0.015" : "0;0;0"}
              dur="3s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={isHovered ? "30" : "0"}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          filter: `url(#${id})`,
          rotateX,
          rotateY,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.33, 1, 0.68, 1] 
        }}
      />
      
      {/* Decorative inner glow/vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </motion.div>
  );
}
