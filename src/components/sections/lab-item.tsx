"use client";

import * as React from "react";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import type { Craft } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import Link from "next/link";

function LabItem({ craft, isLast }: { craft: Craft; isLast: boolean }) {
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
      <Link href={`/labs/${craft.title}`}>
        <div
          ref={wrapperRef}
          className="relative px-4 group overflow-hidden mb-4"
        >
          <video
            ref={videoRef}
            src={craft.video}
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
              "absolute bottom-1 left-6 py-0.5 px-1.5 font-mono text-[10px] sm:text-xs tracking-tight",
              "bg-background border border-muted-foreground/25 border-dashed",
              "translate-y-0 sm:translate-y-[200%] group-hover:translate-0 transition-transform duration-500 ease-[cubic-bezier(0.19,_1,_0.22,_1)]",
            )}
          >
            {craft.title}
          </span>
          <span
            className={cn(
              "absolute bottom-2 right-6 py-0.5 px-1.5 font-mono text-[10px] sm:text-xs tracking-tight",
              "bg-background border border-muted-foreground/25 border-dashed",
              "translate-y-0 sm:translate-y-[200%] group-hover:translate-0 transition-transform duration-500 ease-[cubic-bezier(0.19,_1,_0.22,_1)]",
            )}
          >
            {craft.tech}
          </span>

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

      {isLast ? <PatternSeparator /> : null}
    </React.Fragment>
  );
}

export { LabItem };
