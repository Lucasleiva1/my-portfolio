"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t.nav.home, action: () => scrollToSection("inicio") },
    { name: t.nav.specialties, action: () => scrollToSection("especialidades") },
    { name: t.nav.projects, action: () => scrollToSection("proyectos") },
    { name: t.nav.services, action: () => scrollToSection("servicios") },
    { name: t.nav.contact, action: () => scrollToSection("contacto") },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 hidden md:block ${
        scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection("inicio")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] transition-all duration-300">
            <Rocket className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-white tracking-tighter">
              FLOWGRAVITY
            </span>
            <span className="text-[10px] text-lime-400 font-mono tracking-widest uppercase opacity-70">
              {t.nav.subtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={link.action}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-lime-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2" />
          <LanguageSelector />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
