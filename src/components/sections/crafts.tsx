import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { type Craft, crafts } from "@/lib/config/site-data";
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
      <div className="relative px-4">
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
        <span className="absolute bottom-1 left-5 bg-background px-1 font-mono text-[10px] tracking-tight">
          {craft.title}
        </span>
      </div>

      {isLast ? <PatternSeparator /> : null}
    </React.Fragment>
  );
}

export { Crafts };
