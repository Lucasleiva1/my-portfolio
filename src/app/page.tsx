import HeroGravity from "@/components/HeroGravity";
import Specialties from "@/components/Specialties";
import LiveProjectExplorer from "@/components/LiveProjectExplorer";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FloatingContactButton from "@/components/FloatingContactButton";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroGravity />
      <Specialties />
      <LiveProjectExplorer />
      <Services />
      <Contact />
      <FloatingContactButton />
    </main>
  );
}

