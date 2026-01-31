import { Clock } from "@/components/clock";
import { Line } from "@/components/ui/line";

function QuoteTime() {
  return (
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
  );
}

export { QuoteTime };
