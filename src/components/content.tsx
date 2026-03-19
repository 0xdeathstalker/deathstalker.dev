import { Blogs } from "@/components/sections/blogs";
import { Hero } from "@/components/sections/hero";
import { Crafts } from "@/components/sections/labs";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";

function Content() {
  return (
    <div className="relative pt-28 mx-auto max-w-[650px] max-[690px]:mx-4">
      <Hero />
      <PatternSeparator />

      <Work />
      <PatternSeparator />

      <Projects />
      <PatternSeparator />

      <Crafts />
      <PatternSeparator />

      <Blogs />
      <PatternSeparator />

      <QuoteTime />
    </div>
  );
}

export { Content };
