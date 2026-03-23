import { Content } from "@/components/content";
import { ScrollGradients } from "@/components/scroll-gradients";
import { Footer } from "@/components/sections/footer";
import { Line } from "@/components/ui/line";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <ScrollGradients />

      <VerticalLines />

      <Content />

      <Footer />
    </main>
  );
}

function VerticalLines() {
  return (
    <div className="absolute inset-0 max-w-[650px] max-[690px]:mx-4 mx-auto pointer-events-none">
      <Line
        orientation="vertical"
        position="left"
        color="text-mauve-500/65 dark:text-muted-foreground/20"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-mauve-500/65 dark:text-muted-foreground/20"
      />
    </div>
  );
}
