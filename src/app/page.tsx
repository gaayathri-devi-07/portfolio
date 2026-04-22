import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingNav from "@/components/layout/FloatingNav";

export default function Home() {
  return (
    <main className="relative w-full bg-[#e5e4df] dark:bg-black transition-colors duration-500">
      <FloatingNav />
      
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <PhilosophySection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="internships">
        <ExperiencesSection />
      </section>

      <section id="skills">
        <TechStackSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
