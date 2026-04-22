"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, motion, useTransform } from "framer-motion";
import * as THREE from "three";

/**
 * High-performance abstract particle system using InstancedMesh.
 * Renders hundreds of pixel-like glowing data points.
 */
function Swarm({ count = 150 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate randomized drift paths for each particle
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 60;
      const speed = 0.001 + Math.random() / 1000;
      const xFactor = -40 + Math.random() * 80;
      const yFactor = -40 + Math.random() * 80;
      const zFactor = -40 + Math.random() * 80;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      
      const s = Math.cos(t);
      const x = (xFactor + Math.cos(t / 10) * factor) + (Math.sin(t * 1) * factor) / 40;
      const y = (yFactor + Math.sin(t / 10) * factor) + (Math.cos(t * 2) * factor) / 40;
      const z = (zFactor + Math.cos(t / 10) * factor) + (Math.sin(t * 3) * factor) / 40;

      dummy.position.set(x, y, z);
      dummy.rotation.set(t * 2, t * 2, t * 2);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Pixelated geometric nodes */}
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshBasicMaterial 
        color="#FAFAFA" 
        transparent 
        opacity={0.15} 
      />
    </instancedMesh>
  );
}

export default function BackgroundParticles() {
  const { scrollYProgress } = useScroll();
  
  /**
   * CRITICAL DIRECTIVE: Zero opacity on Hero section (0 to 0.2 progress).
   * Fades in globally from About section onwards.
   */
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.2], 
    [0, 0, 1]
  );

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-1000"
    >
      <Canvas 
        camera={{ position: [0, 0, 100], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Swarm count={200} />
      </Canvas>
    </motion.div>
  );
}
