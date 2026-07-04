"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Line } from "@/components/ui/line";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { portfolio } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/lib/config/site";
import { SOCIAL_ICONS } from "@/lib/config/social-icons";

function SocialIconButtons() {
  return (
    <div className="relative inline-flex items-center gap-2 py-6 px-4">
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-7 font-normal"
          >
            <Link href={portfolio.resume}>
              <FileText />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-sans">Resume</TooltipContent>
      </Tooltip>

      {Object.entries(SOCIALS).map(([key, value]) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="size-7"
            >
              <Link
                href={value.href}
                target="_blank"
              >
                {SOCIAL_ICONS[key]}
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="font-sans">{key.charAt(0).toUpperCase() + key.slice(1)}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLargeButtons() {
  const { trigger } = useWebHaptics();

  return (
    <div className="relative grid grid-cols-3 gap-2.5 p-2 sm:p-4">
      {Object.entries(SOCIALS).map(([key, value]) => (
        <Link
          key={key}
          href={value.href}
          onClick={() => trigger()}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "group border-taupe-300 shadow-none rounded-sm h-12 grow transition-colors ease-out",
          )}
        >
          {SOCIAL_ICONS[key]} {value.title}
        </Link>
      ))}
    </div>
  );
}

function SocialOutlineButtons() {
  return (
    <div className="relative grid grid-cols-2 sm:grid-cols-4">
      <Button
        asChild
        variant={null}
        size={null}
        className="relative inline-flex items-center justify-center gap-2 grow text-sm py-5 px-4 hover:bg-accent/50 transition-colors ease-out"
      >
        <Link href={portfolio.resume}>
          <FileText className="size-3.5" /> resume
          <Line
            orientation="vertical"
            position="right"
            color="text-mauve-500/65"
            variant="contained"
          />
        </Link>
      </Button>

      {Object.entries(SOCIALS).map(([key, value], idx) => {
        return (
          <Button
            key={key}
            asChild
            variant={null}
            size={null}
            className="relative inline-flex items-center justify-center gap-2 grow text-sm py-5 px-4 hover:bg-accent/50 transition-colors ease-out"
          >
            <Link
              href={value.href}
              target="_blank"
            >
              <Line
                orientation="vertical"
                position="right"
                color="text-mauve-500/65"
                variant="contained"
                className={cn(idx === 0 ? "hidden sm:block" : idx === 2 ? "hidden" : "absolute")}
              />
              <Line
                orientation="horizontal"
                position="top"
                color="text-mauve-500/65"
                variant="contained"
                className={cn(idx === 0 ? "hidden" : "sm:hidden")}
              />
              {SOCIAL_ICONS[key]} {value.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

export { SocialIconButtons, SocialLargeButtons, SocialOutlineButtons };
