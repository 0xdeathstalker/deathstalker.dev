import { cn } from "@/lib/utils";
import { Line } from "./line";
import type * as React from "react";

function SectionHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <div className="relative">
      <h1
        className={cn("text-3xl py-4 text-shadow-sm dark:shadow-black/65 font-medium group w-fit", className)}
        {...props}
      />

      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
        className="max-w-[650px]"
      />
    </div>
  );
}

export { SectionHeading };
