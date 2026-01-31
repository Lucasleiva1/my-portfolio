"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User } from "lucide-react";

export default function Contact() {
  const [senderEmail, setSenderEmail] = useState("");
  // IMPORTANTE: Mantenemos el mensaje por defecto que pidió el usuario explicitamente
  const [message, setMessage] = useState("Hola lucas, quiero consultar por un presupuesto para una hacer una pagina web/app.");
  
  const myEmail = "jaelleiva@gmail.com";
  const currentYear = new Date().getFullYear();

  const handleOpenMail = () => {
    // 1. Validación simple (alerta nativa como pidió el código de ejemplo)
    if (!senderEmail) {
      alert("Por favor, introduce tu email para que pueda contactarte de vuelta.");
      return;
    }

    // 2. Preparamos el Asunto y el Cuerpo del mensaje
    const subject = encodeURIComponent("Consulta de Proyecto - Web Inmersiva");
    
    // Incluimos su mail dentro del texto para que no se pierda nada
    const fullBody = `De: ${senderEmail}\n\nMensaje:\n${message}`;
    const encodedBody = encodeURIComponent(fullBody);

    // 3. Disparamos el comando al sistema operativo
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${encodedBody}`;
  };

  return (
    <footer className="relative bg-[#030303] pt-32 pb-12 overflow-hidden flex flex-col items-center justify-center">
      {/* Glow Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        
        {/* Encabezado Principal */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4"
        >
          ¿Tienes una visión? <br />
          <span className="text-[#A3E635]">Hagámosla realidad.</span>
        </motion.h2>

        <p className="text-gray-400 text-lg mb-12">
          Sin formularios largos. Prepara tu mensaje y abre tu correo al instante.
        </p>

        <div className="max-w-xl mx-auto space-y-5 text-left">
          
          {/* Campo: Email del Cliente */}
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#A3E635] transition-colors">
              <User size={18} />
            </div>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-[#A3E635]/50 outline-none transition-all font-light placeholder:text-gray-600"
            />
          </div>

          {/* Campo: Mensaje Personalizable */}
          <div className="relative group">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg focus:border-[#A3E635]/50 outline-none transition-all resize-none min-h-[160px] font-light placeholder:text-gray-600"
            />
            <div className="absolute top-4 right-4 text-[#A3E635]/20 group-focus-within:text-[#A3E635]/50 transition-colors">
              <Send size={20} />
            </div>
          </div>

          {/* Botón Lime Green (CTA Final) */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(163,230,53,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenMail}
            className="w-full bg-[#A3E635] text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all text-xl cursor-pointer"
          >
            <Mail size={24} />
            Abrir Correo y Enviar
          </motion.button>

          <p className="text-center text-[10px] text-gray-600 font-mono mt-4 uppercase tracking-widest">
            *Esto abrirá tu aplicación de correo predeterminada con el borrador listo.
          </p>
        </div>

      </div>

      <div className="absolute bottom-6 w-full text-center">
        <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
          © {currentYear} Jaelleiva
        </p>
      </div>
    </footer>
  );
}
