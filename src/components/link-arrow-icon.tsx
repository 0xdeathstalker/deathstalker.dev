import { ArrowUpRight } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function LinkArrowIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("size-4 grid place-items-center overflow-hidden", className)}>
      <ArrowUpRight className="size-4 text-foreground link-svg" />
      <ArrowUpRight className="size-4 text-foreground link-svg" />
    </div>
  );
}

export { LinkArrowIcon };
