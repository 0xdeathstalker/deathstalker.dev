import { ScrollGradients } from "@/components/ui/scroll-gradients";
import { Footer } from "@/components/sections/footer";
import { Line } from "@/components/ui/line";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <ScrollGradients />

      <VerticalLines />

      <div className="mx-auto max-w-[650px] max-[690px]:mx-4">{children}</div>

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
        color="text-mauve-500/65"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-mauve-500/65"
      />
    </div>
  );
}
