import type * as React from "react";
import { cn } from "@/lib/utils";

type MaskScrollAreaProps = React.ComponentProps<"div"> & {
  orientation: "vertical" | "horizontal";
};

function MaskScrollArea({ orientation, className, ...props }: MaskScrollAreaProps) {
  const scrollareaClasses =
    orientation === "vertical" ? "masked-scrollarea-y overflow-y-scroll" : "masked-scrollarea-x overflow-x-scroll";

  return (
    <div
      className={cn(scrollareaClasses, className)}
      {...props}
    />
  );
}

export { MaskScrollArea };
