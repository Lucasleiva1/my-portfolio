"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030303] pt-24 pb-12 overflow-hidden">
      {/* Elemento Decorativo: Un gradiente radial en la esquina inferior */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lime-500/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Texto de Cierre */}
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                ¿Tienes una idea? <br />
                <span className="text-lime-400">Hagámosla real.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Estoy disponible para proyectos freelance y colaboraciones estratégicas. 
                Hablemos sobre cómo puedo aportar valor a tu próximo gran paso.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:tuemail@ejemplo.com" 
                  className="flex items-center gap-2 px-8 py-4 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300"
                >
                  <Mail size={20} />
                  Enviame un mail
                </a>
              </div>
            </div>

            {/* Links Sociales Estilizados */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "LinkedIn", icon: <Linkedin />, link: "#", color: "hover:text-lime-400" },
                { name: "GitHub", icon: <Github />, link: "#", color: "hover:text-gray-300" },
                { name: "WhatsApp", icon: <MessageSquare />, link: "#", color: "hover:text-green-400" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="group p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div className={`text-gray-400 ${social.color} transition-colors`}>
                    {social.icon}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white font-medium">{social.name}</span>
                    <ArrowUpRight size={16} className="text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} — Desarrollado con precisión quirúrgica.
          </p>
          <div className="flex gap-8 text-xs font-mono text-gray-600 uppercase tracking-widest">
            <span>Next.js 15</span>
            <span>Tailwind CSS</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
