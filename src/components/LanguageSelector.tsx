"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es' as Language, label: 'ES', flag: '🇪🇸', name: 'Español' },
    { code: 'en' as Language, label: 'EN', flag: '🇺🇸', name: 'English' },
    { code: 'pt' as Language, label: 'PT', flag: '🇧🇷', name: 'Português' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-lime-400 hover:bg-white/10 transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar al hacer clic fuera */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(163,230,53,0.2)] min-w-[140px]"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "rgba(163, 230, 53, 0.1)" }}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    language === lang.code 
                      ? 'bg-lime-500/20 text-lime-400' 
                      : 'text-gray-300 hover:text-lime-400'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-lime-400"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
