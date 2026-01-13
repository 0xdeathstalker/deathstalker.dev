import { Line } from "./line";

function PatternSeparator() {
  return (
    <div className="h-10 w-full relative">
      <Line
        orientation="horizontal"
        variant="contained"
        position="top"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
        className="max-w-[650px]"
      />

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
      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        className="max-w-[650px]"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
    </div>
  );
}

export { PatternSeparator };
