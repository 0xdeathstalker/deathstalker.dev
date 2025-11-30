import { Content } from "@/components/content";
import { Line } from "@/components/ui/line";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <div className="bg-gradient-to-b from-background to-transparent fixed top-0 left-0 h-10 w-full z-50 pointer-events-none" />

      <VerticalLines />
      <Content />

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
