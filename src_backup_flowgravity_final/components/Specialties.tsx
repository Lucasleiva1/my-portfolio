"use client";
import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, BrainCircuit, Zap } from "lucide-react";

const specialties = [
  {
    title: "Core Development",
    skills: "HTML5 / CSS3 / JavaScript",
    description: "Cimientos sólidos para aplicaciones web de alto rendimiento y semántica perfecta.",
    video: "/videos/coding-bg.mp4", // Ruta a tu video
    icon: <Code2 className="text-yellow-400" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Frameworks Modernos",
    skills: "React / Next.js",
    description: "Arquitecturas escalables con renderizado en el servidor y optimización máxima.",
    video: "/videos/react-flow.mp4",
    icon: <Zap className="text-blue-400" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Inteligencia Artificial",
    skills: "Integración de IA / Modelos",
    description: "Implementación de agentes inteligentes y automatización avanzada para el futuro.",
    video: "/videos/ai-neural.mp4",
    icon: <BrainCircuit className="text-purple-400" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Diseño Responsivo",
    skills: "Mobile First / UI UX",
    description: "Interfaces que se adaptan como líquido a cualquier resolución de pantalla.",
    video: "/videos/responsive-design.mp4",
    icon: <MonitorSmartphone className="text-emerald-400" />,
    className: "md:col-span-2 md:row-span-1",
  },
];

export default function Specialties() {
  return (
    <section className="py-24 bg-[#030303] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Stack <span className="text-lime-500">&</span> Especialidades
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
                {/* VIDEO PLACEHOLDER - Se mostrará un gradiente si el video falla (o hasta que el usuario lo suba) */}
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
                {/* Overlay para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent z-20" />
              </div>

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
