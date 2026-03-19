import { RandomQuotes } from "@/components/random-quotes";
import { Line } from "@/components/ui/line";

function QuoteTime() {
  return (
    <div className="relative h-18 px-4 flex items-center justify-between">
      <Line
        orientation="horizontal"
        position="top"
        color="text-[oklch(71.4%_0.014_41.2)]/86"
      />

      <RandomQuotes />
      {/* <Clock /> */}
      <span className="font-mono text-[13px] text-neutral-500 tabular-nums">2026</span>

      <Line
        orientation="horizontal"
        position="bottom"
        color="text-[oklch(71.4%_0.014_41.2)]/86"
      />
    </div>
  );
}

export { QuoteTime };
