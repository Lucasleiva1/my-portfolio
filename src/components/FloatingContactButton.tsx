"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingContactButton() {
  const { t } = useLanguage();
  
  return (
    <motion.a
      href="https://wa.me/5491150540281?text=hola%20FlowGravity%20necesito%20un%20presupuesto%20para%20hacer%20una%20pagina%20web."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 40px rgba(163, 230, 53, 0.6)"
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 group block"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-lime-500/20 blur-2xl rounded-2xl group-hover:bg-lime-500/40 transition-all duration-300" />
        
        {/* Button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-br from-lime-400 to-green-500 text-black font-bold px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] transition-all duration-300 border border-lime-300/50">
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm md:text-base tracking-wider uppercase">{t.floating.whatsapp}</span>
        </div>

        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
        </span>
      </div>
    </motion.a>
  );
}
