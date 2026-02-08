import { Blogs } from "@/components/sections/blogs";
import { Crafts } from "@/components/sections/labs";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";

function Content() {
  return (
    <div className="relative pt-28 mx-auto max-w-[650px] max-[690px]:mx-4">
      <Hero />
      <PatternSeparator bottomBorder={false} />

      <Work />
      <PatternSeparator bottomBorder={false} />

      <Projects />
      <PatternSeparator bottomBorder={false} />

      <Crafts />
      <PatternSeparator bottomBorder={false} />

      <Blogs />
      <PatternSeparator bottomBorder={false} />

      <QuoteTime />
    </div>
  );
}

export { Content };
