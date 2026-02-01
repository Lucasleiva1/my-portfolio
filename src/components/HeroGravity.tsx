"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Instagram, Facebook, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Ícono personalizado de TikTok (lucide-react no lo tiene)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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

import HeroParticles from "./HeroParticles";

// --- COMPONENTE PRINCIPAL DEL HERO ---
export default function HeroGravity() {
  const { t } = useLanguage();
  // Estado del slider: -1 (Caída máxima), 0 (Neutro), 1 (Elevación máxima)
  const [gravity, setGravity] = useState(0.2); 
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef<number | null>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    
    // Detección de celular
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    // Animación inicial: Bajada suave de la gravedad para efecto cinemático
    let startTime: number;
    const duration = 2500; // Duración suavizada
    const startValue = 0.2;
    const endValue = -0.20;

    const animateGravity = (time: number) => {
      // Cancelar si el usuario interactuó
      if (userInteractedRef.current) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }
      
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;

      if (progress < 1) {
        // Easing function: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const newValue = startValue + (endValue - startValue) * ease;
        setGravity(newValue);
        animationRef.current = requestAnimationFrame(animateGravity);
      } else {
        setGravity(endValue);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animateGravity);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleGravityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userInteractedRef.current = true; // Marcar que el usuario tocó el slider
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setGravity(parseFloat(e.target.value));
  };



  return (
    <section className="relative h-screen w-full bg-[#030303] overflow-hidden z-0">
      
      {/* CAPA 3D (El Canvas de React Three Fiber) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={['#030303']} />
          <ambientLight intensity={0.5} />
          {/* Pasamos el estado de la gravedad al sistema 3D */}
          <HeroParticles gravityValue={gravity} isMobile={isMobile} />
          {/* OrbitControls opcional: permite al usuario rotar la escena con el mouse */}
          <OrbitControls 
            enableZoom={false} 
            autoRotate={!isMobile} 
            autoRotateSpeed={0.5}
            enableRotate={!isMobile} // También desactivamos rotación manual en celular
          />
        </Canvas>
      </div>

      {/* CAPA DE UI (HTML sobre el 3D) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        {/* Título Principal */}
        <div className="text-center mb-12 pointer-events-auto">
           <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent tracking-[0.2em] mb-2 drop-shadow-lg font-[family-name:var(--font-bungee)]">
              {t.hero.brand}
           </span>
           <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 drop-shadow-2xl">
            {t.hero.title}
          </h1>
           <p className="text-gray-400 text-lg mb-6">
             {t.hero.subtitle}
           </p>

           {/* Iconos de Redes Sociales */}
           <div className="flex items-center justify-center gap-4">
             <motion.a 
               href="https://www.instagram.com/flow.gravity/"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
             >
               <Instagram className="w-6 h-6 text-white" />
               <span className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </motion.a>

             <motion.a 
               href="https://www.tiktok.com/@flowgravity"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/10"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
             >
               <div className="text-white">
                 <TikTokIcon />
               </div>
               <span className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </motion.a>

             <motion.a 
               href="https://www.facebook.com/profile.php?id=61587202942672"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
             >
               <Facebook className="w-6 h-6 text-white" />
               <span className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </motion.a>
           </div>
         </div>

        {/* CONTROLADOR DE GRAVEDAD (Slider Personalizado) */}
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col items-center w-80">
          <label htmlFor="gravity-slider" className="text-lime-400 font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
            {t.hero.gravityModulator}
          </label>
          
          <div className="relative w-full flex items-center gap-4">
             <span className="text-xs text-gray-500 font-mono">{t.hero.fall}</span>
            <input
              id="gravity-slider"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={gravity}
              onChange={handleGravityChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-lime-500 outline-none
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-lime-400 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#030303] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(163,230,53,0.5)]"
            />
            <span className="text-xs text-lime-400 font-mono">{t.hero.rise}</span>
            
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: [0, 5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    x: { repeat: Infinity, duration: 1, ease: "easeInOut" }
                  }}
                  className="absolute -right-8 text-lime-400"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
           <div className="text-center text-white font-mono mt-2 text-xs">
              {t.hero.gravity}: {gravity.toFixed(2)}G
           </div>
        </div>
      </div>
    </section>
  );
}
