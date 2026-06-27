"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useWebHaptics } from "web-haptics/react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { TooltipGroup, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip-group";

interface LabNavigationProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function LabNavigation({ prevSlug, nextSlug }: LabNavigationProps) {
  const router = useRouter();
  const { trigger } = useWebHaptics();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevSlug) {
        router.push(`/labs/${prevSlug}`);
      } else if (e.key === "ArrowRight" && nextSlug) {
        router.push(`/labs/${nextSlug}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlug, nextSlug, router]);

  return (
    <TooltipGroup>
      <div className="flex items-center gap-2">
        <Tooltip id="previous-component">
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                prevSlug && router.push(`/labs/${prevSlug}`);
                trigger();
              }}
              disabled={!prevSlug}
              aria-label="Go to previous component"
              className="size-7"
            >
              <ArrowLeft className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-mauve-600 font-sans inline-flex items-center gap-2 py-2 px-2">
            <Kbd>
              <ArrowLeft />
            </Kbd>
            previous component
          </TooltipContent>
        </Tooltip>

        <Tooltip id="next-component">
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                nextSlug && router.push(`/labs/${nextSlug}`);
                trigger();
              }}
              disabled={!nextSlug}
              aria-label="Go to next component"
              className="h-7 w-7"
            >
              <ArrowRight className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-mauve-600 font-sans inline-flex items-center gap-2 py-2 px-2">
            next component
            <Kbd>
              <ArrowRight />
            </Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipGroup>
  );
}
