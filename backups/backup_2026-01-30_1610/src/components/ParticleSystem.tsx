"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface ParticleProps {
  gravity: number;
}

function Particles({ gravity }: ParticleProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  
  // Crear 1000 partículas con posiciones aleatorias
  const particleCount = 1000;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Posiciones aleatorias en un cubo
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = Math.random() * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Colores verde neón con variación
      colors[i3] = 0.7 + Math.random() * 0.3;     // R
      colors[i3 + 1] = 1.0;                        // G (verde completo)
      colors[i3 + 2] = 0.2 + Math.random() * 0.3;  // B
    }
    
    return { positions, colors };
  }, []);
  
  // Inicializar velocidades
  if (!velocitiesRef.current) {
    velocitiesRef.current = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      velocitiesRef.current[i] = (Math.random() - 0.5) * 0.02;
    }
  }
  
  // Animar partículas en cada frame
  useFrame((state, delta) => {
    if (!particlesRef.current || !velocitiesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Aplicar gravedad
      velocities[i3 + 1] -= gravity * delta;
      
      // Actualizar posiciones
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Reiniciar partículas que caen demasiado
      if (positions[i3 + 1] < -5) {
        positions[i3 + 1] = 10;
        velocities[i3 + 1] = 0;
      }
      
      // Rebote en los bordes laterales
      if (Math.abs(positions[i3]) > 5) {
        velocities[i3] *= -0.8;
      }
      if (Math.abs(positions[i3 + 2]) > 5) {
        velocities[i3 + 2] *= -0.8;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotación suave del sistema completo
    particlesRef.current.rotation.y += delta * 0.05;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleSystem() {
  const [gravity, setGravity] = useState(2.0);
  
  return (
    <div className="relative w-full h-full">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.5} />
        <Particles gravity={gravity} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      
      {/* Control de Gravedad */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 min-w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-medium uppercase tracking-wider">
            Gravedad
          </span>
          <span className="text-lime-400 text-lg font-bold tabular-nums">
            {gravity.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={gravity}
          onChange={(e) => setGravity(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-4 
                     [&::-webkit-slider-thumb]:h-4 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-lime-400
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(163,230,53,0.5)]
                     [&::-moz-range-thumb]:w-4 
                     [&::-moz-range-thumb]:h-4 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-lime-400
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Sin gravedad</span>
          <span>Máxima</span>
        </div>
      </div>
    </div>
  );
}
