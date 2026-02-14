import Hero from "@/components/sections/Hero";
import About from "@/components/sections/CodingProfiles";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/expereinces";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contacts";
export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
