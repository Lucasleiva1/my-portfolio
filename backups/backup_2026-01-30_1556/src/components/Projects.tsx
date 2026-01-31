"use client";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Bajo Flow",
    description: "Portfolio profesional para filmmaker & editor de video. Diseño cinematográfico con color grading y enfoque en narrativa visual.",
    tags: ["Video Editing", "Web Design", "DaVinci Resolve"],
    url: "https://bajo-flow.netlify.app/",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Bachata Runin",
    description: "Sitio web para academia de baile con +500 alumnos. Experiencia inmersiva con integración de videos y sistema de inscripción.",
    tags: ["Web Design", "Video Integration", "WhatsApp API"],
    url: "https://bachatarunin.netlify.app/",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export default function Projects() {
  return (
    <section className="py-24 bg-[#030303] text-white">
      <div className="container mx-auto px-6">
        
        {/* Encabezado de Sección */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            Proyectos <span className="text-gray-500">Destacados</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Una selección de trabajos que demuestran experiencia en diseño, desarrollo y estrategia digital.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              {/* Gradiente de fondo */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 p-8 md:p-10">
                {/* Header con icono de link */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <ExternalLink className="text-lime-400" size={20} />
                  </div>
                  <ArrowUpRight 
                    size={24} 
                    className="text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white transition-all duration-300" 
                  />
                </div>

                {/* Contenido */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Borde animado en hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          ))}
        </div>

        {/* CTA opcional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Más proyectos próximamente...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
