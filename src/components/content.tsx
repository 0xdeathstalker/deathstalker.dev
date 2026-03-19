import { Blogs } from "@/components/sections/blogs";
import { Crafts } from "@/components/sections/labs";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { cn } from "@/lib/utils";

function Content() {
  return (
    <div className="relative pt-28 mx-auto max-w-[650px] max-[690px]:mx-4">
      <Hero />
      <PatternSeparator bottomBorder={false} />
      {/* <div className="absolute inset-0 right-2 rounded-xl bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5" /> */}

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
