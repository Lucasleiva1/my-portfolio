"use client";

import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Función auxiliar para crear textura circular suave
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// --- COMPONENTE DEL SISTEMA DE PARTÍCULAS ---
// Este componente vive dentro del Canvas 3D
function ParticleSystem({ gravityValue }: { gravityValue: number }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 6000; // Aumentamos a 6000 para más densidad

  // Creamos posiciones, velocidades y una nueva variable: "masa" (fricción)
  const [positions, velocities, masses] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const mass = new Float32Array(count); // Cada partícula tiene su propia "física"

    for (let i = 0; i < count; i++) {
      // 1. DISTRIBUCIÓN ESFÉRICA (Para evitar la forma de caja)
      // Algoritmo de distribución uniforme en esfera
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 10 + Math.random() * 10; // Radio variable (10 a 20)

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);     // x
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi); // y
      pos[i * 3 + 2] = radius * Math.cos(phi);                   // z

      // 2. VARIACIÓN DE MASA (Evita que se junten en líneas)
      // Unas partículas son más pesadas y reaccionan más rápido que otras
      mass[i] = 0.5 + Math.random() * 1.5; 

      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel, mass];
  }, []);

  // Usamos la textura circular
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // El bucle de animación (corre a 60fps en la GPU)
  useFrame((state) => {
    if (!ref.current || !ref.current.geometry.attributes.position) return;

    const positionAttribute = ref.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      
      // APLICAR FÍSICA: La velocidad vertical cambia según el slider de gravedad
      // Aplicar gravedad multiplicada por la masa individual
      // Esto hace que unas caigan más lento que otras, rompiendo el "cuadrado"
      velocities[iy] += gravityValue * 0.005 * masses[i];
      
      // Aplicar una pequeña resistencia al aire (drag) para que no sea lineal
      velocities[iy] *= 0.98;

      // Actualizar posiciones (X y Z también para movimiento sutil si tuvieran velocidad)
      positionAttribute.array[i * 3] += velocities[i * 3];
      positionAttribute.array[iy] += velocities[iy];
      positionAttribute.array[i * 3 + 2] += velocities[i * 3 + 2];

      // 3. RESET ORGÁNICO
      // Límite más amplio para dar espacio
      const limit = 25; 
      
      if (Math.abs(positionAttribute.array[iy]) > limit) {
         // Si sale por arriba o abajo, la mandamos al lado opuesto
         // pero con un "offset" aleatorio considerable para evitar líneas horizontales
         const offset = Math.random() * 10;
         positionAttribute.array[iy] = gravityValue > 0 ? -limit - offset : limit + offset;
         
         // Resetear velocidad pero mantener inercia aleatoria pequeña
         velocities[iy] = 0; 
         
         // Opcional: Reasignar posición X/Z aleatoria al resetear para más variedad
         // const phi = Math.random() * Math.PI * 2;
         // const r = 10 + Math.random() * 10;
         // positionAttribute.array[i * 3] = r * Math.cos(phi);
         // positionAttribute.array[i * 3 + 2] = r * Math.sin(phi);
      }
    }
    // Decirle a Three.js que las posiciones han cambiado y necesita redibujar
    positionAttribute.needsUpdate = true;
    
    // Rotación lenta de toda la nube para más profundidad
    ref.current.rotation.y += 0.001;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        // map={circleTexture} // Comentado si da problemas de carga, pero recomendado
        alphaTest={0.01}
        color="#a3e635" // Verde neón lime-400
        size={0.15} // Tamaño ajustado para textura suave
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending} // Hace que brillen al superponerse
      />
    </Points>
  );
}

// --- COMPONENTE PRINCIPAL DEL HERO ---
export default function HeroGravity() {
  // Estado del slider: -1 (Caída máxima), 0 (Neutro), 1 (Elevación máxima)
  const [gravity, setGravity] = useState(0.2); // Empezamos con una ligera elevación "antigravedad"

  return (
    <section className="relative h-screen w-full bg-[#030303] overflow-hidden">
      
      {/* CAPA 3D (El Canvas de React Three Fiber) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={['#030303']} />
          <ambientLight intensity={0.5} />
          {/* Pasamos el estado de la gravedad al sistema 3D */}
          <ParticleSystem gravityValue={gravity} />
          {/* OrbitControls opcional: permite al usuario rotar la escena con el mouse */}
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* CAPA DE UI (HTML sobre el 3D) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        {/* Título Principal */}
        <div className="text-center mb-12 pointer-events-auto">
           <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent tracking-[0.2em] mb-2 drop-shadow-lg font-[family-name:var(--font-bungee)]">
              FLOWGRAVITY
           </span>
           <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 drop-shadow-2xl">
            Ingeniero de Software
          </h1>
          <p className="text-gray-400 text-lg">
            Experiencias web interactivas que desafían la física.
          </p>
        </div>

        {/* CONTROLADOR DE GRAVEDAD (Slider Personalizado) */}
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col items-center w-80">
          <label htmlFor="gravity-slider" className="text-lime-400 font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
            Gravity Modulator
          </label>
          
          <div className="relative w-full flex items-center gap-4">
             <span className="text-xs text-gray-500 font-mono">FALL</span>
            <input
              id="gravity-slider"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-lime-500 outline-none
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-lime-400 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#030303] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(163,230,53,0.5)]"
            />
            <span className="text-xs text-lime-400 font-mono">RISE</span>
          </div>
           <div className="text-center text-white font-mono mt-2 text-xs">
              Value: {gravity.toFixed(2)}G
           </div>
        </div>
      </div>
    </section>
  );
}
