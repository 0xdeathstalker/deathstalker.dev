import { Line } from "@/components/ui/line";
import { crafts } from "@/lib/config/site-data";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import * as React from "react";

function Crafts() {
  return (
    <section id="crafts">
      <div className="relative">
        <Line
          orientation="horizontal"
          variant="contained"
          position="top"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
          className="max-w-[650px]"
        />

        <h1 className="text-3xl py-4 text-shadow-sm dark:shadow-black/65 font-medium group w-fit px-4 max-[690px]:px-8">
          craft
        </h1>

        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
          className="max-w-[650px]"
        />
      </div>

      <div className="relative space-y-4 py-4">
        {crafts.map((craft, idx) => {
          const isLast = idx !== crafts.length - 1;
          return (
            <React.Fragment>
              <div
                key={`${craft.title}-${idx}`}
                className="relative px-4"
              >
                <video
                  src={craft.video}
                  playsInline
                  autoPlay
                  loop
                  muted
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

export { Crafts };
