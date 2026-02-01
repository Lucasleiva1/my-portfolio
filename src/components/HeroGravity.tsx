"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Ícono personalizado de TikTok
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// --- COMPONENTE PRINCIPAL DEL HERO ---
export default function HeroGravity() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full bg-[#030303] overflow-hidden z-0" style={{ touchAction: 'pan-y' }}>
      
      {/* BACKGROUND EFFECTS - Estáticos y ligeros */}
      <div className="absolute inset-0 z-0">
        {/* Resplandor central para profundidad */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/10 blur-[120px] rounded-full opacity-50" />
        
        {/* Grid Decorativo (Efecto Blueprint) */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* CAPA DE UI */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Título Principal */}
        <div className="text-center mb-12 px-6">
           <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="block text-4xl md:text-6xl font-bold bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent tracking-[0.2em] mb-4 drop-shadow-lg font-[family-name:var(--font-bungee)]"
           >
              {t.hero.brand}
           </motion.span>
           
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl"
           >
            {t.hero.title}
          </motion.h1>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
           >
             {t.hero.subtitle}
           </motion.p>

           {/* Iconos de Redes Sociales */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex items-center justify-center gap-6"
           >
             <motion.a 
               href="https://www.instagram.com/flow.gravity/"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 transition-all duration-300 shadow-xl"
               whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
               whileTap={{ scale: 0.95 }}
             >
               <Instagram className="w-7 h-7 text-lime-400" />
               <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.a>

             <motion.a 
               href="https://www.tiktok.com/@flowgravity"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 transition-all duration-300 shadow-xl"
               whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
               whileTap={{ scale: 0.95 }}
             >
               <div className="text-lime-400">
                 <TikTokIcon />
               </div>
               <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.a>

             <motion.a 
               href="https://www.facebook.com/profile.php?id=61587202942672"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative p-5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 transition-all duration-300 shadow-xl"
               whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
               whileTap={{ scale: 0.95 }}
             >
               <Facebook className="w-7 h-7 text-lime-400" />
               <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.a>
           </motion.div>
         </div>
      </div>

      {/* Indicador de Desplazamiento (Opcional pero ayuda a la UX) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 uppercase tracking-[0.3em] text-[10px]"
      >
        <span>Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-lime-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
