import type * as React from "react";
import { cn } from "@/lib/utils";
import { CornerDiamondShapes } from "./corner-shapes";
import { Line } from "./line";

function SectionHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <div className="relative">
      <Line
        orientation="horizontal"
        variant="contained"
        position="top"
        color="text-mauve-500/65 dark:text-muted-foreground/20"
      />

      <h1
        className={cn(
          "font-pixel-square tracking-tight sm:tracking-wide text-3xl py-4 text-mauve-700 font-semibold group w-fit",
          className,
        )}
        {...props}
      />

      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        color="text-mauve-500/65 dark:text-muted-foreground/20"
      />

      <CornerDiamondShapes />
    </div>
  );
}

export { SectionHeading };
