"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function Swarm({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

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
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshBasicMaterial color="#FAFAFA" transparent opacity={0.15} />
    </instancedMesh>
  );
}

export default function BackgroundParticles() {
  const { scrollYProgress } = useScroll();
  const [shouldRender, setShouldRender] = useState(false);

  // Only mount the Canvas once the user scrolls past the hero section.
  // This eliminates a ~60fps Three.js rAF loop competing with the Spline
  // canvases during the critical initial paint and hero scroll.
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.12) {
        setShouldRender(true);
        unsub();
      }
    });
    // Eager check in case the page loads mid-scroll
    if (scrollYProgress.get() > 0.12) {
      setShouldRender(true);
      unsub();
    }
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {shouldRender && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 100], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} />
          <Swarm count={200} />
        </Canvas>
      )}
    </div>
  );
}
