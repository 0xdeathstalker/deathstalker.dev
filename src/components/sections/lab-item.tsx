"use client";

import * as React from "react";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Loader } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import Link from "next/link";
import type { Lab } from "@/lib/types";

function LabItem({ lab, isLast }: { lab: Lab; isLast: boolean }) {
  const { ref: wrapperRef, inView } = useInView({ threshold: 0.3 });

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const hasLoadedRef = React.useRef(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      if (!hasLoadedRef.current) {
        video.preload = "auto";
        video.load();
        hasLoadedRef.current = true;
      }
      video.play();
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <React.Fragment>
      <Link href={`/labs/${lab.slug}`}>
        <div
          ref={wrapperRef}
          className="relative px-4 group overflow-hidden mb-4"
        >
          <video
            ref={videoRef}
            src={lab.video}
            playsInline
            loop
            muted
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            className={cn(
              "w-full h-[clamp(14rem,55vw,22rem)] sm:h-[350px] object-cover transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          >
            <track
              kind="captions"
              srcLang="en"
              label="English"
            />
          </video>
          <span
            className={cn(
              "absolute bottom-1 left-6 py-0.5 px-1.5 font-pixel-square font-semibold text-xs tracking-wider",
              "bg-background border border-muted-foreground/25",
              "translate-y-0 sm:translate-y-[200%] group-hover:translate-0 transition-transform duration-500 ease-expo-out",
            )}
          >
            {lab.title}
          </span>
          {/* <span
            className={cn(
              "absolute bottom-1 right-6 py-0.5 px-1.5 font-pixel-square font-semibold text-xs tracking-wider",
              "bg-background border border-muted-foreground/25",
              "translate-y-0 sm:translate-y-[200%] group-hover:translate-0 transition-transform duration-500 ease-expo-out",
            )}
          >
            {lab.tech}
          </span> */}

          <div
            className={cn(
              "absolute bottom-1 right-6 py-0.5 px-1.5 flex items-center gap-1 font-pixel-square font-semibold text-xs tracking-wider",
              "bg-background border border-muted-foreground/25",
              "translate-y-0 sm:translate-y-[200%] group-hover:translate-0 transition-transform duration-500 ease-expo-out",
            )}
          >
            view live
            <ArrowUpRight className="size-3" />
          </div>

          {/* <div className="absolute top-2 right-6 p-1 border rounded-md bg-background">
            <ArrowUpRight className="size-3" />
          </div> */}

          {/* LOADER */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              !isLoaded ? "blur-none opacity-100 scale-100" : "blur-md opacity-0 scale-0",
            )}
          >
            <Loader className="animate-spin size-5 text-muted-foreground/60" />
          </div>
        </div>
      </Link>

      {isLast ? <PatternSeparator bottomBorder /> : null}
    </React.Fragment>
  );
}

export { LabItem };
