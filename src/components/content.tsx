import { Blogs } from "@/components/sections/blogs";
import { Crafts } from "@/components/sections/crafts";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { Line } from "@/components/ui/line";
import { Clock } from "./clock";

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

      <div className="relative h-18 px-4 max-[690px]:px-8 flex items-center justify-between">
        <Line
          orientation="horizontal"
          position="top"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
        />

        <span className="text-sm text-neutral-500">Find Flow.</span>
        <Clock />

        <Line
          orientation="horizontal"
          position="bottom"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
        />
      </div>
    </div>
  );
}

export { Content };
