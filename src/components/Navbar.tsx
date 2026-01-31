"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { name: t.nav.home, action: (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
    },
    { name: t.nav.specialties, action: () => scrollToSection('especialidades') },
    { name: t.nav.projects, action: () => scrollToSection('proyectos') },
    { name: t.nav.services, action: () => scrollToSection('servicios') },
    { name: t.nav.contact, action: () => scrollToSection('contacto') }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-lime-500/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Icon (Circular) */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-lime-500/30 shadow-[0_0_15px_rgba(132,204,22,0.2)] group"
          >
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.img
                  key="brand-image"
                  src="/final-fg1.jpg"
                  alt="Brand Icon"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.div
                  key="brand-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/final-fg.mp4" type="video/mp4" />
                  </video>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Overlay glow on hover */}
            <div className="absolute inset-0 bg-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={(e) => link.action(e)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-gray-300 hover:text-lime-400 transition-colors duration-300 text-sm font-medium uppercase tracking-wider group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-lime-400 rounded-full origin-center" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-lime-400 rounded-full" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-lime-400 rounded-full origin-center" 
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      link.action(e);
                      setIsOpen(false);
                    }}
                    className="text-left text-lg font-medium text-gray-300 hover:text-lime-400 transition-colors uppercase tracking-widest flex items-center justify-between group"
                  >
                    {link.name}
                    <div className="w-2 h-2 rounded-full bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#84cc16]" />
                  </motion.button>
                ))}
                
                <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">
                  <span>Status: Online</span>
                  <span className="text-lime-500/50">●</span>
                  <span>2024 Portfolio</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
