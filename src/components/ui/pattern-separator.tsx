import { cn } from "@/lib/utils";
import { Line } from "./line";

function PatternSeparator({ topBorder = true, bottomBorder = false }: { topBorder?: boolean; bottomBorder?: boolean }) {
  return (
    <div className="h-10 w-full relative bg-mauve-100/40">
      {topBorder && (
        <Line
          orientation="horizontal"
          variant="contained"
          position="top"
          color="text-mauve-500/65"
          className="max-w-[650px] z-50"
        />
      )}

      <div
        className={cn(
          "screen-line-after h-10",
          "before:absolute before:left-0 before:z-20 before:h-10 before:w-full before:max-w-[650px]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:oklch(86.5%_0.012_325.68)]",
        )}
      />

      {bottomBorder && (
        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          className="max-w-[650px]"
          color="text-mauve-500/65"
        />
      )}
    </div>
  );
}

export { PatternSeparator };
