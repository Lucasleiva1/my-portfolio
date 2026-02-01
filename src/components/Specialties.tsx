"use client";
import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, BrainCircuit, Zap } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Specialties() {
  const { t } = useLanguage();
  
  // Envolviendo Image de Next.js para animaciones
  const MotionImage = motion(Image);
  
  const specialties = [
    {
      title: t.specialties.coreTitle,
      skills: t.specialties.coreSkills,
      description: t.specialties.coreDesc,
      video: "/videos/coding-bg.mp4",
      icon: <Code2 className="text-yellow-400" />,
      image: "/html.png",
      className: "md:col-span-2 md:row-span-1",
    },
    {
      title: t.specialties.frameworksTitle,
      skills: t.specialties.frameworksSkills,
      description: t.specialties.frameworksDesc,
      video: "/videos/react-flow.mp4",
      icon: <Zap className="text-blue-400" />,
      image: "/next.png",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: t.specialties.responsiveTitle,
      skills: t.specialties.responsiveSkills,
      description: t.specialties.responsiveDesc,
      video: "/videos/responsive-design.mp4",
      icon: <MonitorSmartphone className="text-emerald-400" />,
      image: "/res.png",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: t.specialties.aiTitle,
      skills: t.specialties.aiSkills,
      description: t.specialties.aiDesc,
      video: "/videos/ai-neural.mp4",
      icon: <BrainCircuit className="text-purple-400" />,
      image: "/ia.png",
      className: "md:col-span-2 md:row-span-1",
    },
  ];
  
  return (
    <section className="py-24 bg-[#030303] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            {t.specialties.title}
          </h2>
          <p className="text-gray-500 mt-4 font-mono uppercase tracking-[0.3em]">Dominio técnico avanzado</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${item.className} group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10`}
            >
              {/* VIDEO DE FONDO */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-900" /> 
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 relative z-10"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent z-20" />
              </div>

              {/* Imagen/Icono flotante si existe - AHORA ESTRUCTURA DE CAPAS: VIDEO (z-0) -> IMAGEN (z-10) -> TEXTO (z-30) */}
              {item.image && (
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
                  style={{
                    maskImage: "radial-gradient(circle, black 40%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 80%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.4, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <MotionImage 
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}

              {/* CONTENIDO */}
              <div className="relative z-30 p-8 h-full flex flex-col justify-end min-h-[300px]">
                
                <div className="mb-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-lime-500/20 transition-all">
                  {item.icon}
                </div>
                
                <h3 className="text-xs font-mono text-lime-400 uppercase tracking-widest mb-2">
                  {item.skills}
                </h3>
                <h4 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>

              {/* Borde animado al hacer hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-lime-500/30 rounded-[2rem] transition-all duration-500 z-40 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
