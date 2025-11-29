import Blogs from "@/components/sections/blogs";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Work from "@/components/sections/work";
import { Line } from "@/components/ui/line";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <div className="bg-gradient-to-b from-background to-transparent fixed top-0 left-0 h-10 w-full z-50 pointer-events-none" />

      <VerticalLines />

      <div className="relative py-28 mx-auto max-w-[650px]">
        <Hero />
        <Separator />

        <Work />
        <Separator />

        <Projects />
        <Separator />

        <Blogs />

        <div className="bg-gradient-to-t from-background to-background/50 absolute bottom-0 left-0 h-20 w-full z-50 pointer-events-none" />
      </div>

      <div className="bg-gradient-to-t from-background to-transparent fixed bottom-0 left-0 h-10 w-full z-50 pointer-events-none" />
    </main>
  );
}

function VerticalLines() {
  return (
    <div className="absolute inset-0 max-w-[650px] max-[690px]:mx-4 mx-auto pointer-events-none">
      <Line
        orientation="vertical"
        position="left"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
    </div>
  );
}

function Separator() {
  return (
    <div className="h-10 w-full relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.07) 2px, rgba(75, 85, 99, 0.07) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.06) 2px, rgba(107, 114, 128, 0.06) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.05) 2px, rgba(55, 65, 81, 0.05) 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.04) 2px, rgba(31, 41, 55, 0.04) 3px, transparent 3px, transparent 8px)
          `,
        }}
      />
    </div>
  );
}
