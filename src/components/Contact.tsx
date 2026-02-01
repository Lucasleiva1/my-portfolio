"use client";
import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Ícono personalizado de TikTok
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    { name: t.nav.home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: t.nav.specialties, action: () => scrollToSection('especialidades') },
    { name: t.nav.projects, action: () => scrollToSection('proyectos') },
    { name: t.nav.contact, action: () => scrollToSection('contacto') }
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      label: "Instagram",
      url: "https://www.instagram.com/flow.gravity/",
      gradient: "from-pink-500 to-purple-600",
      shadow: "shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]"
    },
    { 
      icon: TikTokIcon, 
      label: "TikTok",
      url: "https://www.tiktok.com/@flowgravity",
      gradient: "from-gray-800 to-gray-700",
      shadow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/10"
    },
    { 
      icon: MessageCircle, 
      label: t.contact.whatsapp,
      url: "https://wa.me/5491150540281?text=hola%20FlowGravity%20necesito%20un%20presupuesto%20para%20hacer%20una%20pagina%20web.",
      gradient: "from-green-500 to-emerald-600",
      shadow: "shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
    },
    { 
      icon: Facebook, 
      label: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61587202942672",
      gradient: "from-blue-600 to-blue-700",
      shadow: "shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
    }
  ];

  return (
    <footer className="relative bg-[#030303] pt-24 pb-8 overflow-hidden border-t border-white/5">
      {/* Glow de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMNA 1: Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent tracking-wider">
              FLOWGRAVITY
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Creando experiencias web interactivas que desafían la física y destacan en un mundo saturado.
            </p>
          </motion.div>

          {/* COLUMNA 2: Accesos Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-6">
              {t.contact.links}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-lime-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMNA 3: Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-6">
              {t.contact.socialTitle}
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isTikTok = social.label === "TikTok";
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-full bg-gradient-to-br ${social.gradient} ${social.shadow}`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isTikTok ? (
                      <div className="text-white">
                        <TikTokIcon />
                      </div>
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-600 text-xs font-mono tracking-widest uppercase">
            © {currentYear} {t.contact.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}
