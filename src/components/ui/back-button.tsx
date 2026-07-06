"use client";

import Link from "next/link";
import type * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWebHaptics } from "web-haptics/react";

function BackButton({ href, target = "_self", children, className, ...props }: React.ComponentProps<typeof Link>) {
  const { trigger } = useWebHaptics();

  return (
    <Link
      href={href}
      target={target}
      onClick={() => trigger()}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-7 has-[>svg]:pl-2 gap-1 text-xs text-mauve-500 hover:text-mauve-600",
        className,
      )}
    >
      <BackIcon />
      {children}
    </Link>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3.5 shrink-0 select-none"
    >
      <path
        d="M10.2069 4H12.4828C13.3203 4 14 4.67972 14 5.51724V10.4483C14 11.2858 13.3203 11.9655 12.4828 11.9655H3M3 11.9655L6.03448 8.93103M3 11.9655L6.03448 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}

export { BackButton };
