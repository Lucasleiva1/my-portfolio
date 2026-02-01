"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function HeroParticles({ gravityValue, isMobile }: { gravityValue: number; isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 6000;

  const [positions, velocities, masses] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const mass = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 10 + Math.random() * 10;

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      mass[i] = 0.5 + Math.random() * 1.5; 
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel, mass];
  }, []);

  useFrame((state) => {
    if (!ref.current || !ref.current.geometry.attributes.position) return;

    const positionAttribute = ref.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      velocities[iy] += gravityValue * 0.005 * masses[i];
      velocities[iy] *= 0.98;

      positionAttribute.array[i * 3] += velocities[i * 3];
      positionAttribute.array[iy] += velocities[iy];
      positionAttribute.array[i * 3 + 2] += velocities[i * 3 + 2];

      const limit = 25; 
      if (Math.abs(positionAttribute.array[iy]) > limit) {
         const offset = Math.random() * 10;
         positionAttribute.array[iy] = gravityValue > 0 ? -limit - offset : limit + offset;
         velocities[iy] = 0; 
      }
    }
    positionAttribute.needsUpdate = true;
    
    // Rotation is now OFF as per user request ("vista de frente nada más")
    // if (!isMobile) {
    //   ref.current.rotation.y += 0.001;
    // }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        alphaTest={0.01}
        color="#a3e635"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
