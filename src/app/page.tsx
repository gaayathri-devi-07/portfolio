import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main suppressHydrationWarning className="min-h-screen overflow-x-hidden flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500">
      <HeroSection />
      <PhilosophySection />
      <ProjectsSection />
      <ExperiencesSection />
      <TechStackSection />
      <ContactSection />
    </main>
  );
}