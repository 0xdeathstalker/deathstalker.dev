import { RandomQuotes } from "@/components/sections/random-quotes";
import { CornerDiamondShapes } from "@/components/ui/corner-shapes";
import { Line } from "@/components/ui/line";

function QuoteTime() {
  return (
    <div className="relative h-18 px-4 flex items-center justify-between ">
      <CornerDiamondShapes />

      <Line
        orientation="horizontal"
        position="top"
        color="text-mauve-500/65"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-mauve-500/65"
      />

      <RandomQuotes />

      <span className="font-mono text-[13px] text-mauve-400 tabular-nums">2026</span>
    </div>
  );
}

export { QuoteTime };
