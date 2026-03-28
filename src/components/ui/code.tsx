import { cn } from "@/lib/utils";
import type * as React from "react";

function Code({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn("font-mono bg-mauve-100 border py-px px-1 rounded-md text-xs", className)}
      {...props}
    />
  );
}

export { Code };
