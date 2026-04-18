"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ViewAllButton() {
  const { trigger } = useWebHaptics();

  return (
    <Link
      href="/labs"
      onClick={() => trigger()}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-10 w-full bg-mauve-200 hover:bg-mauve-300 border-mauve-400 hover:border-mauve-500",
      )}
      // className="h-10 w-full px-4 inline-flex items-center justify-center gap-1 bg-mauve-600 text-background rounded-md hover:bg-mauve-700 transition-colors ease-out"
    >
      <span>view all</span>
      <ArrowRight className="size-4" />
    </Link>
  );
}

export { ViewAllButton };
