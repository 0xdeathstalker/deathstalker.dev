import { Blogs } from "@/components/sections/blogs";
import { Certifications } from "@/components/sections/certifications";
import { Hero } from "@/components/sections/hero";
import { Labs } from "@/components/sections/labs";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";

export default function Home() {
  return (
    <div className="relative pt-28">
      <Hero />
      <PatternSeparator />

      <Work />
      <PatternSeparator />

      <Projects />
      <PatternSeparator />

      <Labs />
      <PatternSeparator />

      <Certifications />
      <PatternSeparator />

      <Blogs />
      <PatternSeparator />

      <QuoteTime />
    </div>
  );
}
