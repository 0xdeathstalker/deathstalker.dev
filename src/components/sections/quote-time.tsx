import { RandomQuotes } from "@/components/random-quotes";
import { Line } from "@/components/ui/line";

function QuoteTime() {
  return (
    <div className="relative h-18 px-4 max-[690px]:px-8 flex items-center justify-between">
      <Line
        orientation="horizontal"
        position="top"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />

      <RandomQuotes />
      {/* <Clock /> */}
      <span className="font-mono text-[13px] text-neutral-500 tabular-nums">2026</span>

      <Line
        orientation="horizontal"
        position="bottom"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
    </div>
  );
}

export { QuoteTime };
