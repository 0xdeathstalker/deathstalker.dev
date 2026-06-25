"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const MarqueeContext = React.createContext<{ vertical: boolean }>({
  vertical: false,
});

type MarqueeProps = {
  vertical?: boolean;
  duration?: `${string}s`;
  gap?: string;
} & React.ComponentProps<"div">;

function Marquee({ className, children, vertical = false, duration, gap, style, ...props }: MarqueeProps) {
  return (
    <MarqueeContext.Provider value={{ vertical }}>
      <div
        {...props}
        style={
          {
            ...(duration && { "--duration": duration }),
            ...(gap && { "--gap": gap }),
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "relative group flex overflow-hidden [--duration:40s] [--gap:32px] gap-(--gap)",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className,
        )}
      >
        {children}
      </div>
    </MarqueeContext.Provider>
  );
}

type MarqueeContentProps = {
  repeat?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
} & React.ComponentProps<"div">;

function MarqueeContent({
  className,
  children,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
}: MarqueeContentProps) {
  const { vertical } = React.useContext(MarqueeContext);

  return (
    <React.Fragment>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={`item-${i + 1}`}
            className={cn("flex gap-(--gap) justify-around shrink-0", {
              "flex-col": vertical,
              "flex-row animate-marquee": !vertical,
              "group-hover:paused": pauseOnHover,
              "direction-reverse": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </React.Fragment>
  );
}

function MarqueeItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

type MarqueeFadeProps = {
  align: "left" | "right" | "top" | "bottom";
  color?: string;
} & React.ComponentProps<"div">;

const sideClasses = {
  left: "bg-linear-to-r inset-y-0 left-0 w-18 md:w-24",
  right: "bg-linear-to-l inset-y-0 right-0 w-18 md:w-24",
  top: "bg-linear-to-b inset-x-0 top-0 h-1/6",
  bottom: "bg-linear-to-t inset-x-0 bottom-0 h-1/6",
};

function MarqueeFade({ color, align, style, className, ...props }: MarqueeFadeProps) {
  return (
    <div
      style={{
        ...(color && ({ "--fade-from": color } as React.CSSProperties)),
        ...style,
      }}
      className={cn(
        "absolute z-10 [--fade-from:var(--background)] from-(--fade-from) to-transparent pointer-events-none",
        sideClasses[align],
        className,
      )}
      {...props}
    />
  );
}

export { Marquee, MarqueeContent, MarqueeItem, MarqueeFade };
