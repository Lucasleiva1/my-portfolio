"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// Importar ParticleSystem solo en el cliente (evita errores de SSR con Three.js)
const ParticleSystem = dynamic(() => import("./ParticleSystem"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* 3D Particle System Background */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem />
      </div>
      
      {/* Background Effect: Un resplandor sutil para dar profundidad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/20 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge: Indica que estás disponible o tu especialidad */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={14} className="text-lime-400" />
            <span className="text-xs font-medium text-lime-100 uppercase tracking-widest">
              Disponible para proyectos de alto impacto
            </span>
          </motion.div>

          {/* Main Title con gradiente y tipografía pesada */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6"
          >
            Ingeniería de software <br />
            <span className="bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              sin gravedad.
            </span>
          </motion.h1>

          {/* Descripción Técnica / Comercial */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Desarrollo aplicaciones full-stack que combinan una arquitectura impecable 
            con experiencias de usuario que parecen magia.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group px-8 py-4 bg-lime-400 text-black font-bold rounded-full flex items-center gap-2 hover:bg-lime-500 hover:text-black transition-all duration-300">
              Ver proyectos
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-transparent text-white font-semibold border border-white/10 rounded-full hover:bg-white/5 transition-all">
              Hablemos de tu idea
            </button>
          </motion.div>
        </div>
      </div>

      {/* Grid Decorativo de fondo (Efecto Blueprint) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
}
