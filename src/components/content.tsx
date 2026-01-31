import { Blogs } from "@/components/sections/blogs";
import { Crafts } from "@/components/sections/crafts";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";

function Content() {
  return (
    <div className="relative pt-28 mx-auto max-w-[650px]">
      <Hero />
      <PatternSeparator />

      <Work />
      <PatternSeparator />

      <Projects />
      <PatternSeparator />

      <Crafts />
      <PatternSeparator />

      <Blogs />
      <PatternSeparator bottomBorder={false} />

      <QuoteTime />
    </div>
  );
}

export { Content };
