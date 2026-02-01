"use client";

import dynamic from "next/dynamic";
import Specialties from "@/components/Specialties";
import Services from "@/components/Services";
import FloatingContactButton from "@/components/FloatingContactButton";
import Navbar from "@/components/Navbar";

// Componentes pesados cargados dinámicamente
const HeroGravity = dynamic(() => import("@/components/HeroGravity"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#030303] animate-pulse" />
});

const LiveProjectExplorer = dynamic(() => import("@/components/LiveProjectExplorer"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-[#030303] animate-pulse" />
});

const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false
});

export default function Home() {
  return (
    <main className="bg-[#030303]">
      <Navbar />
      
      {/* Wrappers con ID para navegación dinámica */}
      <section id="inicio">
        <HeroGravity />
      </section>

      <div id="especialidades">
        <Specialties />
      </div>

      <div id="proyectos">
        <LiveProjectExplorer />
      </div>

      <div id="servicios">
        <Services />
      </div>

      <div id="contacto">
        <Contact />
      </div>

      <FloatingContactButton />
    </main>
  );
}
