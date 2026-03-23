import { RandomQuotes } from "@/components/random-quotes";
import { Line } from "@/components/ui/line";

function QuoteTime() {
  return (
    <div className="relative h-18 px-4 flex items-center justify-between before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-px before:bg-mauve-400/65">
      <Line
        orientation="horizontal"
        position="top"
        color="text-mauve-500/65"
      />

      <RandomQuotes />

      <span className="font-mono text-[13px] text-neutral-500 tabular-nums">2026</span>
    </div>
  );
}

export { QuoteTime };
