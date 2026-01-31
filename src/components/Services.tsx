"use client";
import { motion } from "framer-motion";
import { Share2, Smartphone, Globe, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  
  return (
    <section id="servicios" className="relative min-h-[60vh] py-20 bg-[#030303] overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent font-[family-name:var(--font-bungee)]">
              {t.services.title}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 font-light">
              {t.services.description}{" "}
              <span className="text-lime-400 font-semibold">{t.services.highlight}</span> {t.services.continuation}
            </p>

            <motion.div 
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-2xl md:text-3xl text-white font-bold tracking-wide">
                {t.services.tagline} <br/>
                <span className="inline-block mt-2 bg-lime-500 text-black px-4 py-1 rounded-full transform -rotate-1 shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                  {t.services.taglineHighlight}
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Feature Icons Grid - Frontend Developer Touch */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { icon: Share2, title: t.services.centralTitle, desc: t.services.centralDesc },
              { icon: Smartphone, title: t.services.responsiveTitle, desc: t.services.responsiveDesc },
              { icon: Globe, title: t.services.visibilityTitle, desc: t.services.visibilityDesc }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4">
                <div className="p-4 rounded-full bg-lime-400/10 text-lime-400 mb-2">
                  <item.icon size={24} />
                </div>
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
