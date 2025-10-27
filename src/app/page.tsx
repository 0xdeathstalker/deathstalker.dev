import Blogs from "@/components/sections/blogs";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Work from "@/components/sections/work";

export default function Home() {
  return (
    <main className="relative pt-20 min-h-screen w-full font-sans px-4 mx-auto max-w-[60ch]">
      <Hero />

      <Work />

      <Blogs />

      <Projects />
    </main>
  );
}
