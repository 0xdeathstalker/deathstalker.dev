import { cn } from "@/lib/utils";
import { Line } from "./line";
import type * as React from "react";
import { CornerBorder } from "./corner-border";

function SectionHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <div className="relative">
      <Line
        orientation="horizontal"
        variant="contained"
        position="top"
        color="text-[oklch(71.4%_0.014_41.2)]/86 dark:text-muted-foreground/20"
        className="max-w-[650px]"
      />

      <h1
        className={cn("text-3xl py-4 text-shadow-sm dark:shadow-black/65 font-medium group w-fit", className)}
        {...props}
      />

      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        color="text-[oklch(71.4%_0.014_41.2)]/86 dark:text-muted-foreground/20"
        className="max-w-[650px]"
      />

      <CornerBorder />
    </div>
  );
}

export { SectionHeading };
