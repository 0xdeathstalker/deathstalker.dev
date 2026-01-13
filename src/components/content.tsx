import { Blogs } from "@/components/sections/blogs";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { Crafts } from "./sections/crafts";

function Content() {
  return (
    <div className="relative py-28 mx-auto max-w-[650px]">
      <Hero />
      <PatternSeparator />

      <Work />
      <PatternSeparator />

      <Projects />
      <PatternSeparator />

      <Crafts />
      <PatternSeparator />

      <Blogs />

      <div className="bg-gradient-to-t from-background to-background/50 absolute bottom-0 left-0 h-20 w-full z-50 pointer-events-none" />
    </div>
  );
}

export { Content };
