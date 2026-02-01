"use client";
import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Proyectos Reales del Usuario
const projects = [
  {
    id: 1,
    title: "Bajo Flow",
    url: "https://bajo-flow.netlify.app/",
    description: "Experiencia web inmersiva con estilo urbano y diseño fluido.",
    tech: ["Web Design", "Netlify", "Responsive"],
    color: "text-lime-400",
    borderColor: "border-lime-500/30",
    shadowColor: "shadow-[0_0_30px_rgba(163,230,53,0.1)]"
  },
  {
    id: 2,
    title: "Bachata Runin",
    url: "https://bachatarunin.netlify.app/",
    description: "Plataforma dinámica optimizada para eventos y contenido multimedia.",
    tech: ["UI/UX", "Animation", "Modern Web"],
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    shadowColor: "shadow-[0_0_30px_rgba(192,132,252,0.1)]"
  }
];

export default function LiveProjectExplorer() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-[#030303] min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header de la Sección */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
            {t.projects.title}
          </h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Stack Vertical de Proyectos */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative group"
            >
              {/* VISTA PARA MÓVIL: Tarjetas sencillas y rápidas */}
              <div className="md:hidden space-y-4">
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-8 rounded-3xl bg-neutral-900/50 border ${project.borderColor} ${project.shadowColor} active:scale-95 transition-all`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-bold ${project.color}`}>
                      {project.title}
                    </h3>
                    <ExternalLink size={20} className="text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </div>

              {/* VISTA PARA DESKTOP: Navegador interactivo (Hidden on mobile) */}
              <div className="hidden md:block">
                <div className={`relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all duration-500 group-hover:border-opacity-50 ${project.shadowColor} group-hover:${project.borderColor}`}>
                  
                  {/* Enlace que cubre toda la ventana del navegador */}
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-50 cursor-pointer"
                    title={`Visitar ${project.title}`}
                  >
                    <span className="sr-only">Visitar {project.title}</span>
                  </a>

                  {/* Barra de Navegación Falsa */}
                  <div className="bg-[#151515] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-2 opacity-50">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    <div className="flex-1 mx-8 max-w-2xl">
                      <div className="bg-black/50 rounded-lg px-4 py-2 flex items-center gap-3 text-xs md:text-sm font-mono text-gray-500 border border-white/5 group-hover:border-white/10 transition-colors">
                        <Globe size={14} className={project.id === 1 ? "text-lime-500" : "text-purple-500"} />
                        <span className="truncate opacity-70 w-full">{project.url}</span>
                      </div>
                    </div>

                    <div className="p-2 bg-white/5 rounded-lg text-gray-400 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="hidden md:block">Abrir Site</span>
                      <ExternalLink size={16} />
                    </div>
                  </div>

                  {/* IFRAME AREA: Solo para preview visual mejorado */}
                  <div className="relative w-full h-[700px] bg-[#050505] pointer-events-none overflow-hidden group/iframe"> 
                    <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-mono text-xs z-0">
                      Cargando vista previa...
                    </div>
                    
                    <div className="w-[125%] h-[125%] origin-top-left scale-[0.8] transition-all duration-700">
                      <iframe 
                        src={project.url}
                        className="w-full h-full border-none grayscale-[60%] group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                        title={project.title}
                        tabIndex={-1}
                      />
                    </div>

                    {/* Overlay sutil para mejorar contraste */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
                  </div>
                </div>
              </div>

              {/* Decoración de fondo */}
              <div className={`absolute -inset-1 rounded-[3rem] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 -z-10 bg-gradient-to-r ${project.id === 1 ? 'from-lime-500 to-transparent' : 'from-purple-500 to-transparent'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
