import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { type Craft, crafts } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";
import * as React from "react";

function Crafts() {
  return (
    <section id="crafts">
      <SectionHeading className="px-4 max-[690px]:px-8">craft</SectionHeading>

      <div className="relative space-y-4 py-4">
        {crafts.map((craft, idx) => {
          const isLast = idx !== crafts.length - 1;
          return (
            <CraftItem
              key={`${craft.title}-${idx}`}
              craft={craft}
              isLast={isLast}
            />
          );
        })}
      </div>

      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        className="max-w-[650px]"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
    </section>
  );
}

function CraftItem({ craft, isLast }: { craft: Craft; isLast: boolean }) {
  return (
    <React.Fragment>
      <div className="relative px-4 group overflow-hidden">
        <video
          src={craft.video}
          poster={craft.coverImg}
          playsInline
          autoPlay
          loop
          muted
          preload="auto"
        >
          <track
            kind="captions"
            srcLang="en"
            label="English"
          />
        </video>
        <span
          className={cn(
            "absolute bottom-1 left-5 py-0.5 px-1.5 translate-y-[200%] font-mono text-xs tracking-tight",
            "bg-background border border-muted-foreground/25 border-dashed",
            "group-hover:translate-0 transition-transform duration-500 ease-[cubic-bezier(0.19,_1,_0.22,_1)]",
          )}
        >
          {craft.title}
        </span>
      </div>

      {isLast ? <PatternSeparator /> : null}
    </React.Fragment>
  );
}

export { Crafts };
